import { css, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@material/web/checkbox/checkbox';
import '@material/web/icon/icon';
import '@material/web/list/list';
import '@material/web/list/list-item';
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

@customElement('selection-list')
/** List component to select from a set of options */
export class SelectionList extends FilterListBase {
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
      --md-outlined-text-field-container-shape: 32px;
    }

    .listitems {
      flex: auto;
    }

    .hidden {
      display: none;
    }
  `;
}
