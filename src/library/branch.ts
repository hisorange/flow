import { IContext, IFlow, INode } from '../types';
import { IBranch } from '../types/branch.interface';
import { ITrace } from '../types/trace.interface';
import { Context } from './context';
import { Trace } from './trace';

export class Branch implements IBranch {
  readonly context: IContext = new Context();
  readonly trace: ITrace[] = [];
  readonly input: { [key: string]: any } = {};
  readonly output: { [key: string]: any } = {};

  constructor(readonly flow: IFlow, readonly parent: IBranch | null = null) {}

  fork(): IBranch {
    return new Branch(this.flow, this);
  }

  async trigger(input: unknown) {
    if (this.parent) {
      throw new Error('Branch already triggered');
    }

    this.context.setRegister('trigger', input);

    await this.invoke(this.flow.getInvokeNode());
  }

  async invoke(node: INode): Promise<void> {
    const startedAt = Date.now();
    await node.invoke(this.context);
    const elapsed = Date.now() - startedAt;

    const hasOutputs = this.output && Object.keys(this.output).length > 0;

    // Find the connected edges and execute them in parallel
    // If only one branch is connected, execute it on this branch
    // In case no output is defined, finish the execution

    this.trace.push(new Trace(node, elapsed, this.input, this.output));
  }
}
