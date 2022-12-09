import { IExtension } from './extension.interface';
import { IFlow } from './flow.interface';
import { INode } from './node.interface';

export interface IEngine {
  createFlow(): IFlow;

  createNode(type: string, config?: any): INode;

  getExtensionIDs(): string[];
  addExtension(extension: IExtension): void;

  invokeFlow<R = unknown, I = unknown>(
    flowId: string,
    triggerInput: I,
  ): Promise<R>;
}
