import { expect, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';

import { spy } from 'sinon';

import './action-list.js';
import type { ActionList } from './ActionList.js';

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * 1);
  });
}
mocha.timeout(4000 * 1);

describe('Custom List component ActionList', () => {
  describe('allows to define primary action on list item', () => {
    let list: ActionList;

    const action = () => {};
    const primaryActionSpy = spy(action);
    const firstActionSpy = spy(action);
    const secondActionSpy = spy(action);
    const thirdActionSpy = spy(action);

    beforeEach(async () => {
      list = await fixture(
        html`<action-list
          .items=${[
            {
              headline: 'item',
              primaryAction: primaryActionSpy,
              actions: [
                { icon: 'edit', callback: firstActionSpy },
                {
                  icon: 'delete',
                  label: 'secondAction',
                  callback: secondActionSpy,
                },
                { icon: 'add', label: 'thirdAction', callback: thirdActionSpy },
              ],
            },
          ]}
        ></action-list>`
      );

      await timeout(200);
    });

    it('triggers primaryAction callback on list item click', async () => {
      primaryActionSpy.resetHistory();
      await sendMouse({ type: 'click', position: [30, 20] });

      // eslint-disable-next-line no-unused-expressions
      expect(primaryActionSpy).to.have.been.calledOnce;
    });

    it('triggers first actions callback callback on first actions icon click', async () => {
      firstActionSpy.resetHistory();
      await sendMouse({ type: 'click', position: [700, 20] });

      // eslint-disable-next-line no-unused-expressions
      expect(firstActionSpy).to.have.been.calledOnce;
    });

    it('triggers second actions callback on list menu item click', async () => {
      secondActionSpy.resetHistory();
      await sendMouse({ type: 'click', position: [740, 20] });
      await timeout(400);

      await sendMouse({ type: 'click', position: [700, 100] });

      // eslint-disable-next-line no-unused-expressions
      expect(secondActionSpy).to.have.been.calledOnce;
    });

    it('triggers second actions callback on list menu item click', async () => {
      thirdActionSpy.resetHistory();
      await sendMouse({ type: 'click', position: [740, 40] });
      await timeout(200);

      await sendMouse({ type: 'click', position: [700, 160] });

      // eslint-disable-next-line no-unused-expressions
      expect(thirdActionSpy).to.have.been.calledOnce;
    });
  });
});
