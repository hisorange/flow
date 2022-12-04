import { IContext } from '../../../types/context.interface';
import { INode } from '../../../types/node.interface';

export class EqualNode implements INode {
  readonly id: 'equal';

  async invoke(ctx: IContext): Promise<void> {
    let left = ctx.getInputEdge('left');
    let right = ctx.getInputEdge('right');

    if (ctx.hasConfig('right')) {
      right = ctx.getConfig('right');
    }

    if (ctx.hasConfig('left')) {
      left = ctx.getConfig('left');
    }

    ctx.setOutput('result', left === right);
  }
}
