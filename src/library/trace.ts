import { webcrypto } from 'crypto';
import { INode } from '../types';
import { ITrace } from '../types/trace.interface';

export class Trace implements ITrace {
  readonly id: string;
  readonly interval: number;
  readonly node: INode;

  readonly input: { [key: string]: any } = {};
  readonly output: { [key: string]: any } = {};

  constructor(node: INode, interval: number) {
    this.id = webcrypto.randomUUID();
    this.node = node;
    this.interval = interval;
  }
}
