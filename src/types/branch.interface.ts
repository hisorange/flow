import { IContext } from './context.interface';
import { INode } from './node.interface';
import { ITrace } from './trace.interface';

export interface IBranch {
  readonly trace: ITrace[];
  readonly context: IContext;

  fork(): IBranch;
  invoke(nodeId: string, node: INode): Promise<void>;
}
