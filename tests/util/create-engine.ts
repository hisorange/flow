import { LogicExtension } from '../../src/extensions/logic/logic.extension';
import { Engine } from '../../src/library/engine';
import { IEngine } from '../../src/types';

export const createEngine = (): IEngine => {
  const engine = new Engine();

  // Register extensions
  engine.addExtension(new LogicExtension());

  return engine;
};
