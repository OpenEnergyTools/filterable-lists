import { css, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';

import { MdCheckbox } from '@scopedelement/material-web/checkbox/MdCheckbox.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { MdList } from '@scopedelement/material-web/list/MdList.js';
import { MdListItem } from '@scopedelement/material-web/list/MdListItem.js';
import { MdOutlinedTextField } from '@scopedelement/material-web/textfield/MdOutlinedTextField.js';

import { FilterListBase } from './base-list.js';

export type SelectItem = {
  /** The main information of the list item */
  headline: string;
  /** Supporting information rendered in a second line */
  supportingText?: string;
  /** An attached XML element */
  attachedElement?: Element;
  /** An icon rendered left to the list item content */
  startingIcon?: string;
  /** Whether an icon is selected */
  selected: boolean;
};

/** List component to select from a set of options */
export class SelectionList extends FilterListBase {
  static scopedElements = {
    'md-outlined-text-field': MdOutlinedTextField,
    'md-icon': MdIcon,
    'md-list': MdList,
    'md-list-item': MdListItem,
    'md-checkbox': MdCheckbox,
  };

  @property({ type: Array })
  items: SelectItem[] = [];

  @property({ type: Array })
  get selectedElements(): Element[] {
    const elements: Element[] = [];

    this.items.forEach(item => {
      if (item.selected && item.attachedElement)
        elements.push(item.attachedElement);
    });

    return elements;
  }

  private renderCheckboxListItem(item: SelectItem): TemplateResult {
    return html`<md-list-item
      class="${classMap({
        hidden: !this.searchRegex.test(
          `${item.headline} ${item.supportingText ?? ''}`
        ),
      })}"
    >
      <div slot="headline">${item.headline}</div>
      ${item.supportingText
        ? html`<div slot="headline">${item.supportingText}</div>`
        : html``}
      <md-checkbox
        slot="end"
        ?checked=${item.selected}
        @change="${() => {
          // eslint-disable-next-line no-param-reassign
          item.selected = !item.selected;
        }}"
      ></md-checkbox>
    </md-list-item>`;
  }

  private renderListItem(item: SelectItem): TemplateResult {
    return this.renderCheckboxListItem(item);
  }

  render(): TemplateResult {
    return html`<section>
      ${this.renderSearchField()}
      <div style="display: flex;">
        <md-list class="listitems">
          ${this.items.map(item => this.renderListItem(item))}</md-list
        >
      </div>
    </section>`;
  }

  static styles = css`
    section {
      display: flex;
      flex-direction: column;
    }

    md-outlined-text-field {
      background-color: var(--md-sys-color-surface, #fef7ff);
      --md-outlined-text-field-container-shape: 32px;
      padding: 8px;
    }

    .listitems {
      flex: auto;
    }

    .hidden {
      display: none;
    }
  `;
}
