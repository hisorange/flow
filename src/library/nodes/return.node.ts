import { IContext } from '../../types/context.interface';
import { INode } from '../../types/node.interface';

export class ReturnNode implements INode {
  readonly id: 'invoke';

  async invoke(ctx: IContext): Promise<void> {
    ctx.setRegister('return', ctx.getInputEdge()[0]);
  }
}
