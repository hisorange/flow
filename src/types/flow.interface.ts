import { IEdge } from './edge.interface';
import { IEngine } from './engine.interface';
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

  getStartNode(): INode;
  getTerminateNode(): INode;
  getNodeById(id: string): INode;

  createNode(
    id: string,
    config?: Partial<{
      [key: string]: any;
    }>,
  ): INode;

  createEdge(
    sourceNodeId: string,
    sourceNodeHandle: string,
    targetNodeId: string,
    targetNodeHandle: string,
  ): IEdge;

  getEdgesByTarget(targetNodeId: string, targetNodeHandle: string): IEdge[];
}
