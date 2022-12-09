import { webcrypto } from 'crypto';
import { INode } from '../types';
import { IEngine } from '../types/engine.interface';
import { IExtension } from '../types/extension.interface';
import { IFlow } from '../types/flow.interface';
import { Branch } from './branch';
import { Flow } from './flow';

export class Engine implements IEngine {
  protected readonly flows = new Map<string, IFlow>();
  protected readonly _extensions = new Map<string, IExtension>();

  constructor() {}

  createFlow(): IFlow {
    const flow = new Flow(webcrypto.randomUUID(), this);
    this.flows.set(flow.id, flow);

    return flow;
  }

  createNode(type: string, config?: any): INode {
    const [extensionId, nodeId] = type.split('.');
    const extension = this._extensions.get(extensionId);

    if (!extension) {
      throw new Error(`Extension "${extensionId}" not found`);
    }

    const node = extension.getNodes().find(node => node.id === nodeId);

    if (!node) {
      throw new Error(`Node "${extensionId}.${nodeId}" not found`);
    }

    return node;
  }

  addExtension(extension: IExtension): void {
    this._extensions.set(extension.id, extension);
  }

  getExtensionIDs(): string[] {
    return Array.from(this._extensions.keys());
  }

  registerFlow(flow: IFlow): void {}

  async invokeFlow<R = unknown, I = unknown>(
    flowId: string,
    input: I,
  ): Promise<R> {
    const flow = this.flows.get(flowId);
    const branch = new Branch(flow);

    // Prepare the branch for the execution trigger
    await branch.trigger(input);

    // Print the trace
    for (const step of branch.trace) {
      console.log(
        step.id,
        step.node.id,
        step.input,
        step.output,
        step.interval,
      );
    }

    return branch.context.readRegister('return');
  }
}
