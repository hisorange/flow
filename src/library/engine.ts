import { webcrypto } from 'crypto';
import { INode } from '../types';
import { IEngine } from '../types/engine.interface';
import { IExtension } from '../types/extension.interface';
import { IFlow } from '../types/flow.interface';
import { ISerializedFlow } from '../types/serialized/serialized-flow.interface';
import { Branch } from './branch';
import { Flow } from './flow';

export class Engine implements IEngine {
  protected readonly flows = new Map<string, IFlow>();
  protected readonly _extensions = new Map<string, IExtension>();

  create(id?: string): IFlow {
    const flow = new Flow(id ?? webcrypto.randomUUID(), this);
    this.flows.set(flow.id, flow);

    return flow;
  }

  createNode(type: string, config?: any): INode {
    const [extensionId, nodeId] = type.split('.');
    const extension = this._extensions.get(extensionId);

    if (!extension) {
      throw new Error(`Extension "${extensionId}" not found`);
    }

    const node = extension.getNodes().find(node => node.type === nodeId);

    if (!node) {
      throw new Error(`Node "${extensionId}.${nodeId}" not found`);
    }

    return node;
  }

  extend(extension: IExtension): void {
    this._extensions.set(extension.id, extension);
  }

  extensions(): string[] {
    return Array.from(this._extensions.keys());
  }

  unserialize(serializedFlow: ISerializedFlow): IFlow {
    const flow = this.create();

    for (const nodeId in serializedFlow.nodes) {
      flow.createNode(serializedFlow.nodes[nodeId].type, {
        config: serializedFlow.nodes[nodeId].config,
      });
    }

    for (const edgeId in serializedFlow.edges) {
      flow.createEdge(
        serializedFlow.edges[edgeId].sourceNodeId,
        serializedFlow.edges[edgeId].sourceHandle,
        serializedFlow.edges[edgeId].targetNodeId,
        serializedFlow.edges[edgeId].targetHandle,
      );
    }

    return flow;
  }

  serialize(flow: IFlow): ISerializedFlow {
    const serializedFlow: ISerializedFlow = {
      id: flow.id,
      nodes: {},
      edges: {},
    };

    for (const nodeId in flow.nodes) {
      serializedFlow.nodes[nodeId] = {
        type: flow.nodes[nodeId].type,
        config: {},
      };
    }

    for (const edgeId in flow.edges) {
      serializedFlow.edges[edgeId] = flow.edges[edgeId];
    }

    return serializedFlow;
  }

  async execute<I = unknown, R = unknown>(
    flowId: string,
    input: I,
  ): Promise<R> {
    const flow = this.flows.get(flowId);
    const branch = new Branch(flow);

    // Prepare the branch for the execution trigger
    await branch.trigger(input);

    // Print the trace
    for (const step of branch.trace) {
      console.log(
        step.id,
        step.node.type,
        step.input,
        step.output,
        step.interval,
      );
    }

    return branch.context.readRegister('return');
  }
}
