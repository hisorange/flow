import { IExtension } from './extension.interface';
import { IFlow } from './flow.interface';
import { INode } from './node.interface';

export interface IEngine {
  createFlow(): IFlow;
  createNode(type: string, config?: any): INode;

  extend(extension: IExtension): void;
  register(flow: IFlow): void;
  invoke<R = unknown, I = unknown>(flowId: string, triggerInput: I): Promise<R>;
}
