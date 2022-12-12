import { LogicExtension } from '../src/extensions/logic/logic.extension';
import { Engine } from '../src/library/engine';

describe.skip('Logic Flow', () => {
  test('should handle the "equal" condition', async () => {
    const engine = new Engine();
    engine.extend(new LogicExtension());

    const flow = engine.create();

    const invokeNode = flow.getInvokeNode();
    const returnNode = flow.getReturnNode();
    const equalNode = flow.createNode('logic.equal', {
      meta: {
        title: 'Equals with 1',
      },
      config: {
        right: 1,
      },
    });

    flow.createEdge(
      invokeNode.getOutputHandle()[0],
      equalNode.getInputHandle()[0],
    );
    flow.createEdge(
      equalNode.getOutputHandle()[0],
      returnNode.getInputHandle()[0],
    );

    const result_pass = await engine.invokeFlow(flow.id, 1);
    const result_fail = await engine.invokeFlow(flow.id, 2);

    expect(result_pass).toBe(true);
    expect(result_fail).toBe(false);
  }, 50);
});
