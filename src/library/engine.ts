import { webcrypto } from 'crypto';
import { INode } from '../types';
import { IEngine } from '../types/engine.interface';
import { IExtension } from '../types/extension.interface';
import { IFlow } from '../types/flow.interface';
import { Flow } from './flow';

export class Engine implements IEngine {
  readonly extensions = new Map<string, IExtension>();

  constructor() {}

  createFlow(): IFlow {
    return new Flow(webcrypto.randomUUID(), this);
  }

  createNode(type: string, config?: any): INode {
    const [extensionId, nodeId] = type.split('.');
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension "${extensionId}" not found`);
    }

    const node = extension.getNodes().find(node => node.id === nodeId);

    if (!node) {
      throw new Error(`Node "${extensionId}.${nodeId}" not found`);
    }

    return node;
  }

  extend(extension: IExtension): void {
    this.extensions.set(extension.id, extension);
  }

  async execute(flow: IFlow): Promise<void> {}
}
