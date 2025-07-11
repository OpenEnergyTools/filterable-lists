/* eslint-disable no-unused-expressions */

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

      expect(thirdActionSpy).to.have.been.calledOnce;
    });
  });

  describe('controlled search functionality', () => {
    let list: ActionList;
    let searchChangeEvent: CustomEvent<{ value: string }> | null = null;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list
          .items=${[
            { headline: 'Apple', supportingText: 'Red fruit' },
            { headline: 'Banana', supportingText: 'Yellow fruit' },
            { headline: 'Cherry', supportingText: 'Small red fruit' },
          ]}
          filterable
          searchValue="test"
          @search-change=${(e: CustomEvent<{ value: string }>) => {
            searchChangeEvent = e;
          }}
        ></action-list>`
      );

      await timeout(200);
    });

    it('uses controlled searchValue when provided', async () => {
      const searchField = list.shadowRoot?.querySelector(
        'md-outlined-text-field'
      ) as HTMLInputElement;
      expect(searchField?.value).to.equal('test');
    });

    it('dispatches search-change event when search input changes', async () => {
      searchChangeEvent = null;
      const searchField = list.shadowRoot?.querySelector(
        'md-outlined-text-field'
      ) as HTMLInputElement;

      if (searchField) {
        searchField.value = 'apple';
        searchField.dispatchEvent(new Event('input'));

        await timeout(200); // Wait for debounced event

        expect(searchChangeEvent).to.not.equal(null);
        if (searchChangeEvent) {
          const event = searchChangeEvent as CustomEvent<{ value: string }>;
          expect(event.detail?.value).to.equal('apple');
          expect(event.type).to.equal('search-change');
          expect(event.bubbles).to.be.true;
        }
      }
    });

    it('updates search field value when searchValue prop changes', async () => {
      list.searchValue = 'banana';
      await list.updateComplete;

      const searchField = list.shadowRoot?.querySelector(
        'md-outlined-text-field'
      ) as HTMLInputElement;
      expect(searchField?.value).to.equal('banana');
    });

    it('filters items based on controlled searchValue', async () => {
      list.searchValue = 'red';
      await list.updateComplete;

      const visibleItems = list.shadowRoot?.querySelectorAll(
        'md-list-item:not(.hidden)'
      );
      expect(visibleItems?.length).to.equal(2);
    });

    it('shows all items when searchValue is empty', async () => {
      list.searchValue = '';
      await list.updateComplete;

      const visibleItems = list.shadowRoot?.querySelectorAll(
        'md-list-item:not(.hidden)'
      );
      expect(visibleItems?.length).to.equal(3);
    });
  });
});
