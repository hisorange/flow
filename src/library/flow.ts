import { webcrypto } from 'crypto';
import { IEdge, INode } from '../types';
import { IFlow } from '../types/flow.interface';
import { ErrorNode } from './nodes';
import { InvokeNode } from './nodes/invoke.node';
import { ReturnNode } from './nodes/return.node';

export class Flow implements IFlow {
  nodes: IFlow['nodes'] = {};
  edges: IFlow['edges'] = {};

  constructor(readonly id: string, readonly engine: IFlow['engine']) {
    this.nodes.invoke = new InvokeNode();
    this.nodes.return = new ReturnNode();
    this.nodes.error = new ErrorNode();
  }

  createNode(
    type: string,
    config?: Partial<{
      meta: { [key: string]: any };
      config: { [key: string]: any };
    }>,
  ): INode {
    const node = this.engine.createNode(type, config);

    this.nodes[webcrypto.randomUUID()] = node;

    return node;
  }

  getInvokeNode(): INode {
    return this.nodes.invoke;
  }

  getReturnNode(): INode {
    return this.nodes.return;
  }

  getNodeById(id: string): INode {
    return this.nodes[id];
  }

  createEdge(
    sourceNodeId: string,
    sourceHandle: string,
    targetNodeId: string,
    targetHandle: string,
  ): IEdge {
    const edge: IEdge = {
      sourceNodeId,
      sourceHandle,
      targetNodeId,
      targetHandle,
    };

    this.edges[webcrypto.randomUUID()] = edge;

    return edge;
  }
}
