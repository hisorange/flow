import { IContext } from './context.interface';

export interface INode {
  readonly id: string;

  invoke(context: IContext): Promise<void>;
}
