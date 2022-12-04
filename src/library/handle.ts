import { INode } from '../types';
import { IHandle } from '../types/handle.interface';

export class Handle implements IHandle {
  constructor(readonly id: string, readonly node: INode) {}
}
