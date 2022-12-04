import { IHandle } from './handle.interface';

export interface IEdge {
  readonly id: string;

  from: IHandle;
  to: IHandle;
}
