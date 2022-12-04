import { webcrypto } from 'crypto';
import { INode } from '../types';
import { IEngine } from '../types/engine.interface';
import { IExtension } from '../types/extension.interface';
import { IFlow } from '../types/flow.interface';
import { Context } from './context';
import { Flow } from './flow';
import { Trace } from './trace';

export class Engine implements IEngine {
  readonly extensions = new Map<string, IExtension>();

  constructor() {}

  createFlow(): IFlow {
    return new Flow(webcrypto.randomUUID(), this);
  }

  createNode(type: string, config?: any): INode {
    const [extensionId, nodeId] = type.split('.');
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension "${extensionId}" not found`);
    }

    const node = extension.getNodes().find(node => node.id === nodeId);

    if (!node) {
      throw new Error(`Node "${extensionId}.${nodeId}" not found`);
    }

    return node;
  }

  extend(extension: IExtension): void {
    this.extensions.set(extension.id, extension);
  }

  async invoke<R = unknown, I = unknown>(
    flow: IFlow,
    triggerInput: I,
  ): Promise<R> {
    const ctx = new Context();
    ctx.setRegister('trigger', triggerInput);
    const branch = ctx.createBranch();

    const invokeNode = flow.getInvokeNode();
    const startedAt = Date.now();
    await invokeNode.invoke(ctx);
    const endedAt = Date.now();

    branch.trace.push(new Trace(invokeNode, endedAt - startedAt));

    // Do the iterations and execution branches here

    return ctx.readRegister('result');
  }
}
