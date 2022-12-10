import { IContext } from '../../types/context.interface';
import { Handle } from '../handle';
import { AbstractNode } from './abstract.node';

export class ReturnNode extends AbstractNode {
  readonly type = 'invoke';

  protected handles: AbstractNode['handles'] = {
    input: [new Handle('result', this)],
    output: [],
  };

  async invoke(ctx: IContext): Promise<void> {
    ctx.setRegister('return', ctx.getInputHandle()[0]);
  }
}
