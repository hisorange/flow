import { IExtension } from './extension.interface';
import { IFlow } from './flow.interface';
import { INode } from './node.interface';
import { ISerializedFlow } from './serialized/serialized-flow.interface';

export interface IEngine {
  create(id?: string): IFlow;
  createNode(type: string, config?: any): INode;

  extensions(): string[];
  extend(extension: IExtension): void;

  unserialize(serializedFlow: ISerializedFlow): IFlow;
  serialize(flow: IFlow): ISerializedFlow;
  execute<I = unknown, O = unknown>(flowId: string, input: I): Promise<O>;
}
