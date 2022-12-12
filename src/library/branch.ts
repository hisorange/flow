import { IContext, IFlow, INode } from '../types';
import { IBranch } from '../types/branch.interface';
import { ITrace } from '../types/trace.interface';
import { Context } from './context';
import { Trace } from './trace';

export class Branch implements IBranch {
  readonly context: IContext = new Context();
  readonly trace: ITrace[] = [];

  protected children: IBranch[] = [];

  constructor(readonly flow: IFlow, readonly parent: IBranch | null = null) {}

  fork(): IBranch {
    const children = new Branch(this.flow, this);
    this.children.push(children);

    return children;
  }

  async trigger(input: unknown) {
    // Cannot call a child branch with trigger, only the root branch can execute input triggers
    if (this.parent) {
      throw new Error('Branch already triggered');
    }

    this.context.setRegister('trigger', input);

    await this.invoke('start', this.flow.getStartNode());
  }

  async invoke(nodeId: string, node: INode): Promise<void> {
    // Prepare the context with the input and output

    // Start the execution of the node
    const started = Date.now();
    await node.invoke(this.context);
    const elapsed = Date.now() - started;

    // Check for triggered output handles
    const handles = node.getOutputHandles();

    for (const handle of handles) {
      // Skip if the output is not triggered
      if (!this.context.hasOutput(handle.id)) {
        continue;
      }

      // Output is triggered, get the output value
      const output = this.context.getOutput(handle.id);

      // Find nodes connected to the output handle
      const edges = this.flow.getEdgesByTarget(nodeId, handle.id);

      // If no edges are connected, finish the execution
      if (edges.length === 0) {
        this.context.setRegister('return', output);
        continue;
      }

      // If only one edge is connected, execute it on this branch
      if (edges.length === 1) {
        this.context.setInput(edges[0].targetHandle, output);

        await this.invoke(
          edges[0].targetNodeId,
          this.flow.getNodeById(edges[0].targetNodeId),
        );
      } else {
        const subprocesses: Promise<void>[] = [];

        // If multiple edges are connected, fork the branch
        for (const edge of edges) {
          const subprocess = this.fork();

          subprocess.context.setInput(edge.targetHandle, output);

          subprocesses.push(
            subprocess.invoke(
              edge.targetNodeId,
              this.flow.getNodeById(edge.targetNodeId),
            ),
          );
        }

        // Wait for all subprocesses to finish
        await Promise.all(subprocesses);
      }

      this.context.clearInput();
      this.context.clearOutput();
    }

    // Find the connected edges and execute them in parallel
    // If only one branch is connected, execute it on this branch
    // In case no output is defined, finish the execution

    this.trace.push(new Trace(node, elapsed, {}, {}));
  }
}
