import { webcrypto } from 'crypto';
import { IContext } from '../types';

export class Context implements IContext {
  readonly id: string;
  readonly startedAt: number = Date.now();
  protected _input: { [key: string]: any } = {};
  protected _output: { [key: string]: any } = {};

  private readonly registers: Map<string, unknown> = new Map();

  constructor() {
    this.id = webcrypto.randomUUID();
  }

  readRegister<R = unknown>(key: string): R {
    return this.registers.get(key) as R;
  }

  setRegister(key: string, value: unknown): void {
    this.registers.set(key, value);
  }

  setInput<V = any>(key: string, value: V): void {
    this._input[key] = value;
  }

  getInput<I = unknown>(handleId: string): I {
    if (!this.hasInput(handleId)) {
      throw new Error(`Input with handleId ${handleId} does not exist`);
    }

    return this._input[handleId] as I;
  }

  hasInput(handleId: string): boolean {
    return Object.keys(this._input).includes(handleId);
  }

  setOutput<V = any>(key: string, value: V): void {
    this._output[key] = value;
  }

  clearInput(): void {
    this._input = {};
  }

  getOutput<O = unknown>(handleId: string): O {
    if (!this.hasOutput(handleId)) {
      throw new Error(`Output with handleId ${handleId} does not exist`);
    }

    return this._output[handleId] as O;
  }

  hasOutput(handleId: string): boolean {
    return Object.keys(this._output).includes(handleId);
  }

  clearOutput(): void {
    this._output = {};
  }

  hasConfig(key: string): boolean {
    return false;
  }
  getConfig<R = unknown>(key: string): R {
    return undefined as R;
  }
}
