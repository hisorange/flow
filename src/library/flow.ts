import { webcrypto } from 'crypto';
import { INode } from '../types';
import { IFlow } from '../types/flow.interface';
import { InvokeNode } from './nodes/invoke.node';
import { ReturnNode } from './nodes/return.node';

export class Flow implements IFlow {
  nodes: IFlow['nodes'] = {};
  edges: IFlow['edges'] = {};

  constructor(readonly id: string, readonly engine: IFlow['engine']) {
    this.nodes.invoke = new InvokeNode();
    this.nodes.return = new ReturnNode();
  }

  createNode(
    type: string,
    config?: Partial<{
      meta: { [key: string]: any };
      config: { [key: string]: any };
    }>,
  ): INode {
    const id = webcrypto.randomUUID();
    const node = this.engine.createNode(type, config);

    this.nodes[id] = node;

    return node;
  }

  getInvokeNode(): INode {
    return this.nodes.invoke;
  }

  getReturnNode(): INode {
    return this.nodes.return;
  }
}
