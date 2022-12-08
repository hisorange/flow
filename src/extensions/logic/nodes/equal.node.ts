import { Handle } from '../../../library/handle';
import { AbstractNode } from '../../../library/nodes/abstract.node';
import { IContext } from '../../../types/context.interface';

export class EqualNode extends AbstractNode {
  readonly id = 'equal';

  constructor() {
    super();

    this.handles.input = [new Handle('left', this), new Handle('right', this)];
    this.handles.output = [new Handle('result', this)];
  }

  async invoke(ctx: IContext): Promise<void> {
    let left = ctx.getInputHandle()[0];
    let right = ctx.getInputHandle()[1];

    if (ctx.hasConfig('right')) {
      right = ctx.getConfig('right');
    }

    if (ctx.hasConfig('left')) {
      left = ctx.getConfig('left');
    }

    ctx.setOutput('result', left === right);
  }
}
