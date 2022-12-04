import { IEdge } from '../types';
import { IHandle } from '../types/handle.interface';

export class Edge implements IEdge {
  constructor(readonly id: string, public from: IHandle, public to: IHandle) {}
}
