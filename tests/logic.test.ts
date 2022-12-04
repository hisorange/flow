import { LogicExtension } from '../src/extensions/logic/logic.extension';
import { Engine } from '../src/library/engine';

describe('Logic Flow', () => {
  test('should handle the "equal" condition', async () => {
    const engine = new Engine();
    engine.extend(new LogicExtension());

    const flow = engine.createFlow();

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
      invokeNode.getOutputEdge('input'),
      equalNode.getInputEdge('left'),
    );
    flow.createEdge(
      equalNode.getOutputEdge('result'),
      returnNode.getInputEdge('return'),
    );

    const result_pass = await engine.invoke(flow.id, 1);
    const result_fail = await engine.invoke(flow.id, 2);

    expect(result_pass).toBe(true);
    expect(result_fail).toBe(false);
  }, 50);
});
