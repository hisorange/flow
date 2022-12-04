import { ITrace } from './trace.interface';

export interface IBranch {
  readonly trace: ITrace[];

  readonly input: {
    [key: string]: any;
  };
  readonly output: {
    [key: string]: any;
  };
}
