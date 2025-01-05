/* eslint-disable import/no-extraneous-dependencies */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import './selection-list.js';
import type { SelectionList, SelectItem } from './SelectionList.js';

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
  <GSEControl name="gse2" />
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

const itemsList: SelectItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  selected: !!gseControl.getAttribute('desc'),
}));

describe('Custom List component SelectionList', () => {
  describe('Allows to preselect items', () => {
    let list: SelectionList;

    beforeEach(async () => {
      list = await fixture(
        html`<selection-list .items=${itemsList}></selection-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await timeout(200);
      await visualDiff(list, `selection-list/pre-selection-list`);
    });
  });

  describe('Can filter when filterable', () => {
    let list: SelectionList;

    beforeEach(async () => {
      list = await fixture(
        html`<selection-list filterable .items=${itemsList}></selection-list>`
      );
      document.body.prepend(list);
    });

    afterEach(() => {
      if (list) list.remove();
    });

    it('looks like the last screenshot', async () => {
      await timeout(200);
      await visualDiff(list, `selection-list/filterable`);
    });

    it('looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [20, 20] });
      await sendKeys({ type: 'Control' });

      await timeout(200);
      await visualDiff(list, `selection-list/filtered`);
    });
  });
});
