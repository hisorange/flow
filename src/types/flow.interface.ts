import { IEdge } from './edge.interface';
import { IEngine } from './engine.interface';
import { IHandle } from './handle.interface';
import { INode } from './node.interface';

export interface IFlow {
  /**
   * UUID of the flow
   */
  readonly id: string;
  readonly engine: IEngine;

  nodes: {
    [id: string]: INode;
  };
  edges: {
    [id: string]: IEdge;
  };

  getInvokeNode(): INode;
  getReturnNode(): INode;

  createNode(
    id: string,
    config?: Partial<{
      meta: {
        [key: string]: any;
      };
      config: {
        [key: string]: any;
      };
    }>,
  ): INode;

  createEdge(from: IHandle, to: IHandle): IEdge;
}
