/* eslint-disable import/no-extraneous-dependencies */

import { expect, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';

import './selection-list.js';
import type { SelectionList, SelectItem } from './selection-list.js';

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

const attachedItems: SelectItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  attachedElement: gseControl,
  selected: gseControl.getAttribute('name') === 'gse4',
}));

describe('Custom List component SelectionList', () => {
  describe('with attached elements not given', () => {
    let list: SelectionList;

    beforeEach(async () => {
      list = await fixture(
        html`<selection-list .items=${itemsList}></selection-list>`
      );
    });

    it('return empty array', async () =>
      expect(list.selectedElements.length).to.equal(0));
  });

  describe('with attached elements given', () => {
    let list: SelectionList;

    beforeEach(async () => {
      list = await fixture(
        html`<selection-list .items=${attachedItems}></selection-list>`
      );
    });

    it('return non empty array', async () => {
      await sendMouse({ type: 'click', position: [360, 30] });

      expect(list.selectedElements.length).to.equal(2);
      expect(list.selectedElements[0].getAttribute('name')).to.equal('gse0');
      expect(list.selectedElements[1].getAttribute('name')).to.equal('gse4');
    });
  });
});
