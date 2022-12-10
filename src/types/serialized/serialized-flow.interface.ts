import { ISerializedEdge } from './serialized-edge.interface';
import { ISerializedNode } from './serialized-node.interface';

export interface ISerializedFlow {
  id: string;
  nodes: {
    [key: string]: ISerializedNode;
  };
  edges: {
    [key: string]: ISerializedEdge;
  };
}
