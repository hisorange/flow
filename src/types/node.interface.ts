import { IContext } from './context.interface';
import { IHandle } from './handle.interface';

export interface INode {
  readonly id: string;

  getOutputHandle(): IHandle[];
  getInputHandle(): IHandle[];

  invoke(context: IContext): Promise<void>;
}
