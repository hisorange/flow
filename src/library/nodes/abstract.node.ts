import { IContext, INode } from '../../types';
import { IHandle } from '../../types/handle.interface';

export abstract class AbstractNode implements INode {
  abstract readonly type: string;

  protected handles: {
    input: IHandle[];
    output: IHandle[];
  } = {
    input: [],
    output: [],
  };

  getOutputHandles(): IHandle[] {
    return this.handles.output;
  }

  getInputHandles(): IHandle[] {
    return this.handles.input;
  }

  abstract invoke(context: IContext): Promise<void>;
}
