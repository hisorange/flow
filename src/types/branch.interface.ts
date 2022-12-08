import { IContext } from './context.interface';
import { ITrace } from './trace.interface';

export interface IBranch {
  readonly trace: ITrace[];
  readonly context: IContext;

  readonly input: {
    [key: string]: any;
  };
  readonly output: {
    [key: string]: any;
  };

  fork(): IBranch;
}
