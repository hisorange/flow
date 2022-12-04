import { webcrypto } from 'crypto';
import { IContext } from '../types';
import { IBranch } from '../types/branch.interface';
import { IHandle } from '../types/handle.interface';
import { Branch } from './branch';

export class Context implements IContext {
  readonly id: string;
  readonly branches: IBranch[] = [];
  readonly startedAt: number = Date.now();

  private readonly registers: Map<string, unknown> = new Map();

  constructor() {
    this.id = webcrypto.randomUUID();
  }

  createBranch(): IBranch {
    const branch = new Branch();
    this.branches.push(branch);

    return branch;
  }

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
