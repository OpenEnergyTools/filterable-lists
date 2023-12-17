/* eslint-disable import/no-extraneous-dependencies */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import './action-list.js';
import type { ActionItem, ActionList } from './action-list.js';

const factor = window.process && process.env.CI ? 5 : 3;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(4000 * factor);

document.body.style.width = '400px';

const gseControls = Array.from(
  new DOMParser()
    .parseFromString(
      `<SCL>
  <GSEControl name="gse0" desc="gseControl0"/>
  <GSEControl name="gse1" desc="gseControl1"/>
  <GSEControl name="gse2" desc="gseControl2"/>
  <GSEControl name="gse3" desc="gseControl3"/>
  <GSEControl name="gse4" desc="gseControl4"/>
  <GSEControl name="gse5" />
  <GSEControl name="gse6" desc="gseControl6"/>
  <GSEControl name="gse7" desc="gseControl7"/>
  <GSEControl name="gse8" />
  <GSEControl name="gse9" desc="gseControl9"/>
</SCL>`,
      'application/xml'
    )
    .querySelectorAll('GSEControl')
);

const itemsList: ActionItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  primaryAction: () => {},
}));

const oneActions: ActionItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  actions: [{ icon: 'edit', callback: () => {} }],
}));

const twoActions: ActionItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  actions: [
    { icon: 'edit', callback: () => {} },
    { icon: 'delete', callback: () => {} },
  ],
}));

const threeActions: ActionItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  actions: [
    { icon: 'edit', callback: () => {} },
    { icon: 'delete', callback: () => {} },
    { icon: 'add', callback: () => {} },
  ],
}));

const labelsActions: ActionItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  actions: [
    { icon: 'edit', callback: () => {} },
    { icon: 'delete', label: 'secondAction', callback: () => {} },
    { icon: 'add', label: 'thirdAction', callback: () => {} },
  ],
}));

describe('Custom List component ActionList', () => {
  describe('without actions', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list
          .items=${[
            {
              headline: 'item1',
              supportingText: 'secondLine1',
              startingIcon: 'edit',
            },
            {
              headline: 'item2',
              supportingText: 'secondLine2',
              endingIcon: 'add',
            },
          ]}
        ></action-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await timeout(200);
      await visualDiff(list, `action-list/no-actions`);
    });
  });

  describe('with primary action', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list .items=${itemsList}></action-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [30, 300] });

      await timeout(200);
      await visualDiff(list, `action-list/primary-action`);
    });
  });

  describe('one additional action', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list .items=${oneActions}></action-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [360, 300] });

      await timeout(200);
      await visualDiff(list, `action-list/one additional action`);
    });
  });

  describe('two additional actions', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list .items=${twoActions}></action-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [360, 300] });

      await timeout(200);
      await visualDiff(list, `action-list/two additional actions`);
    });
  });

  describe('three additional actions', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list .items=${threeActions}></action-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [360, 300] });

      await timeout(200);
      await visualDiff(list, `action-list/more vert without labels`);
    });
  });

  describe('mixed actions definition', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list
          .items=${[
            {
              headline: 'item0',
            },
            {
              headline: 'item1',
              actions: [{ icon: 'edit', callback: () => {} }],
            },
            {
              headline: 'item2',
              supportingText: 'line2',
              actions: [
                { icon: 'edit', callback: () => {} },
                { icon: 'delete', callback: () => {} },
                { icon: 'add', callback: () => {} },
              ],
            },
            {
              headline: 'item3',
              actions: [
                { icon: 'edit', callback: () => {} },
                { icon: 'delete', callback: () => {} },
              ],
            },
          ]}
        ></action-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [360, 300] });

      await timeout(200);
      await visualDiff(list, `action-list/mixed actions definition`);
    });
  });

  describe('labeled additional actions', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list .items=${labelsActions}></action-list>`
      );
      list.style.width = '300px';
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [360, 300] });

      await timeout(200);
      await visualDiff(list, `action-list/more vert with labels`);
    });
  });

  describe('allows to filter list items', () => {
    let list: ActionList;

    beforeEach(async () => {
      list = await fixture(
        html`<action-list .items=${labelsActions} filterable></action-list>`
      );
      list.style.width = '300px';
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('show filter textfield', async () => {
      await timeout(200);
      await visualDiff(list, `action-list/filterable`);
    });

    it('filter list items', async () => {
      await sendMouse({ type: 'click', position: [10, 10] });
      await sendKeys({ type: 'Control' });

      await timeout(200);
      await visualDiff(list, `action-list/filtered`);
    });
  });
});
