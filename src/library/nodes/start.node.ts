import { IContext } from '../../types/context.interface';
import { Handle } from '../handle';
import { AbstractNode } from './abstract.node';

export class StartNode extends AbstractNode {
  readonly type = 'start';

  protected handles: AbstractNode['handles'] = {
    input: [],
    output: [new Handle('trigger', this)],
  };

  async invoke(ctx: IContext): Promise<void> {
    ctx.setOutput('trigger', ctx.readRegister('trigger'));
  }
}
