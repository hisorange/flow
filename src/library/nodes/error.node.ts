import { IContext } from '../../types/context.interface';
import { Handle } from '../handle';
import { AbstractNode } from './abstract.node';

export class ErrorNode extends AbstractNode {
  readonly type = 'error';

  protected handles: AbstractNode['handles'] = {
    input: [new Handle('err', this)],
    output: [],
  };

  async invoke(ctx: IContext): Promise<void> {
    const err = ctx.getInputHandle()[0];

    throw err;
  }
}
