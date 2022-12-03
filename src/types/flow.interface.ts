import { IEdge } from './edge.interface';
import { INode } from './node.interface';

export interface IFlow {
  /**
   * UUID of the flow
   */
  readonly id: string;

  nodes: INode[];
  edges: IEdge[];
}
