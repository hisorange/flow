import { IContext } from '../../types/context.interface';
import { INode } from '../../types/node.interface';

export class InvokeNode implements INode {
  readonly id: 'invoke';

  async invoke(ctx: IContext): Promise<void> {
    ctx.setOutput(ctx.readRegister('trigger'));
  }
}
