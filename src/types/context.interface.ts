import { IHandle } from './handle.interface';

export interface IContext {
  readonly id: string;
  readonly startedAt: number;

  readRegister<R = unknown>(key: string): R;
  setRegister<V = any>(key: string, value: V): void;

  getInputHandle(): IHandle[];
  getOutputHandle(): IHandle[];

  hasConfig(key: string): boolean;
  getConfig<R = unknown>(key: string): R;

  setOutput<V = any>(key: string, value: V): void;
}
