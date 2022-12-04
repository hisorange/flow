import { IEdge } from './edge.interface';

export interface IContext {
  readRegister<R = unknown>(key: string): R;
  setRegister<V = any>(key: string, value: V): void;

  getInputEdge(id: string): IEdge;
  getInputEdge(): IEdge[];

  getOutputEdge(id: string): IEdge;
  getOutputEdge(): IEdge[];

  hasConfig(key: string): boolean;
  getConfig<R = unknown>(key: string): R;

  setOutput<V = any>(value: V): void;
  setOutput<V = any>(key: string, value: V): void;
}
