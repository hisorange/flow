import { INode } from './node.interface';

export interface ITrace {
  readonly id: string;
  readonly interval: number;
  readonly node: INode;

  readonly input: {
    [key: string]: any;
  };
  readonly output: {
    [key: string]: any;
  };
}
