import { IExtension } from '../../types/extension.interface';
import { INode } from '../../types/node.interface';
import { EqualNode } from './nodes/equal.node';

export class LogicExtension implements IExtension {
  readonly id: 'logic';

  getNodes(): INode[] {
    return [new EqualNode()];
  }
}
