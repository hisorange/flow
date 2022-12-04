import { IContext, INode } from '../../types';
import { IHandle } from '../../types/handle.interface';

export abstract class AbstractNode implements INode {
  abstract readonly id: string;

  protected handles: {
    input: IHandle[];
    output: IHandle[];
  } = {
    input: [],
    output: [],
  };

  getOutputHandle(): IHandle[] {
    return this.handles.output;
  }

  getInputHandle(): IHandle[] {
    return this.handles.input;
  }

  abstract invoke(context: IContext): Promise<void>;
}
