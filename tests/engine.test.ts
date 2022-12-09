import { Flow } from '../src/library/flow';
import { IEngine, IExtension } from '../src/types';
import { createEngine } from './util/create-engine';

describe('Engine', () => {
  let engine: IEngine;

  beforeEach(() => {
    engine = createEngine();
  });

  it('should create a flow', () => {
    const flow = engine.createFlow();

    expect(flow).toBeDefined();
    expect(flow).toBeInstanceOf(Flow);
  });

  it('should register an extension', () => {
    const _extension = class TestExtension implements IExtension {
      id = 'test';
      getNodes() {
        return [];
      }
    };

    expect(engine.getExtensionIDs()).not.toContain('test');
    engine.addExtension(new _extension());
    expect(engine.getExtensionIDs()).toContain('test');
  });
});
