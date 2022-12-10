import { IExtension } from './extension.interface';
import { IFlow } from './flow.interface';
import { INode } from './node.interface';
import { ISerializedFlow } from './serialized/serialized-flow.interface';

export interface IEngine {
  createFlow(id?: string): IFlow;

  createNode(type: string, config?: any): INode;

  getExtensionIDs(): string[];
  addExtension(extension: IExtension): void;

  unserializeFlow(serializedFlow: ISerializedFlow): IFlow;
  serializeFlow(flow: IFlow): ISerializedFlow;
  invokeFlow<R = unknown, I = unknown>(
    flowId: string,
    triggerInput: I,
  ): Promise<R>;
}
