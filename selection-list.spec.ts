/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';

import { MdOutlinedTextField } from '@scopedelement/material-web/textfield/MdOutlinedTextField.js';

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

const attachedItems: SelectItem[] = gseControls.map(gseControl => ({
  headline: gseControl.getAttribute('name')!,
  supportingText: gseControl.getAttribute('desc') ?? undefined,
  attachedElement: gseControl,
  selected: gseControl.getAttribute('name') === 'gse4',
  disabled: gseControl.getAttribute('name') === 'gse1',
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
      await sendMouse({ type: 'click', position: [360, 90] });
      // await sendMouse({ type: 'click', position: [360, 30] });

      expect(list.selectedElements.length).to.equal(2);
      expect(list.selectedElements[0].getAttribute('name')).to.equal('gse0');
      expect(list.selectedElements[1].getAttribute('name')).to.equal('gse4');
    });
  });

  describe('controlled search functionality', () => {
    let list: SelectionList;
    let searchChangeEvent: CustomEvent<{ value: string }> | null = null;

    beforeEach(async () => {
      list = await fixture(
        html`<selection-list
          .items=${[
            { headline: 'Apple', supportingText: 'Red fruit', selected: true },
            {
              headline: 'Banana',
              supportingText: 'Yellow fruit',
              selected: false,
            },
            {
              headline: 'Cherry',
              supportingText: 'Small red fruit',
              selected: true,
            },
          ]}
          filterable
          searchValue="test"
          @search-change=${(e: CustomEvent<{ value: string }>) => {
            searchChangeEvent = e;
          }}
        ></selection-list>`
      );

      await timeout(200);
    });

    it('uses controlled searchValue when provided', async () => {
      const searchField = list.shadowRoot?.querySelector(
        'md-outlined-text-field'
      ) as MdOutlinedTextField;
      expect(searchField?.value).to.equal('test');
    });

    it('dispatches search-change event when search input changes', async () => {
      searchChangeEvent = null;
      const searchField = list.shadowRoot?.querySelector(
        'md-outlined-text-field'
      ) as MdOutlinedTextField;

      if (searchField) {
        searchField.value = 'apple';
        searchField.dispatchEvent(new Event('input'));

        await timeout(200); // Wait for debounced event

        expect(searchChangeEvent).to.not.be.null;
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
      ) as MdOutlinedTextField;
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

    it('preserves selection state during filtering', async () => {
      expect(list.items.filter(item => item.selected)).to.have.length(2);

      list.searchValue = 'red';
      await list.updateComplete;

      expect(list.items.filter(item => item.selected)).to.have.length(2);
      expect(list.items.find(item => item.headline === 'Apple')?.selected).to.be
        .true;
      expect(list.items.find(item => item.headline === 'Cherry')?.selected).to
        .be.true;
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
