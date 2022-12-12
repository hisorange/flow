export interface IContext {
  readonly id: string;
  readonly startedAt: number;

  readRegister<R = unknown>(key: string): R;
  setRegister<V = any>(key: string, value: V): void;

  hasConfig(key: string): boolean;
  getConfig<R = unknown>(key: string): R;

  setInput<V = any>(key: string, value: V): void;
  getInput<I = unknown>(handleId: string): I;
  hasInput(handleId: string): boolean;
  clearInput(): void;

  setOutput<V = any>(key: string, value: V): void;
  getOutput<O = unknown>(handleId: string): O;
  hasOutput(handleId: string): boolean;
  clearOutput(): void;
}
