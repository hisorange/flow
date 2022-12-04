import { IBranch } from '../types/branch.interface';
import { ITrace } from '../types/trace.interface';

export class Branch implements IBranch {
  readonly trace: ITrace[] = [];
  readonly input: { [key: string]: any } = {};
  readonly output: { [key: string]: any } = {};
}
