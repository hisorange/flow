import { IExtension } from './extension.interface';
import { IFlow } from './flow.interface';
import { INode } from './node.interface';

export interface IEngine {
  createFlow(): IFlow;
  createNode(type: string, config?: any): INode;

  extend(extension: IExtension): void;
  execute(flow: IFlow): Promise<void>;
}
