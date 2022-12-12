import { IContext } from '../../types/context.interface';
import { Handle } from '../handle';
import { AbstractNode } from './abstract.node';

export class TerminateNode extends AbstractNode {
  readonly type = 'terminate';

  protected handles: AbstractNode['handles'] = {
    input: [new Handle('result', this)],
    output: [],
  };

  async invoke(ctx: IContext): Promise<void> {
    ctx.setRegister('return', ctx.getInput()[0]);
  }
}
