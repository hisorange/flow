import { INode } from './node.interface';

export interface IExtension {
  readonly id: string;

  getNodes(): INode[];
}
