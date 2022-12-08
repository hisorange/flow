import { webcrypto } from 'crypto';
import { INode } from '../types';
import { ITrace } from '../types/trace.interface';

export class Trace implements ITrace {
  readonly id: string = webcrypto.randomUUID();

  constructor(
    readonly node: INode,
    readonly interval: number,
    readonly input: { [key: string]: any } = {},
    readonly output: { [key: string]: any } = {},
  ) {}
}
