import { IContext } from '../types';
import { IHandle } from '../types/handle.interface';

export class Context implements IContext {
  private readonly registers: Map<string, unknown> = new Map();

  readRegister<R = unknown>(key: string): R {
    return this.registers.get(key) as R;
  }

  setRegister(key: string, value: unknown): void {
    this.registers.set(key, value);
  }

  getInputHandle(): IHandle[] {
    return [];
  }
  getOutputHandle(): IHandle[] {
    return [];
  }

  hasConfig(key: string): boolean {
    return false;
  }
  getConfig<R = unknown>(key: string): R {
    return undefined as R;
  }

  setOutput<V = any>(key: string, value: V): void {}
}
