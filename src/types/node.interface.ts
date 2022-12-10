import { IContext } from './context.interface';
import { IHandle } from './handle.interface';

export interface INode {
  readonly type: string;

  getOutputHandles(): IHandle[];
  getInputHandles(): IHandle[];

  invoke(context: IContext): Promise<void>;
}
