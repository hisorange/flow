import { IContext } from '../../types/context.interface';
import { Handle } from '../handle';
import { AbstractNode } from './abstract.node';

export class InvokeNode extends AbstractNode {
  readonly id: 'invoke';

  protected handles: AbstractNode['handles'] = {
    input: [],
    output: [new Handle('trigger', this)],
  };

  async invoke(ctx: IContext): Promise<void> {
    ctx.setOutput('trigger', ctx.readRegister('trigger'));
  }
}
