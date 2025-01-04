import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { MdMenu, Menu } from '@scopedelement/material-web/menu/MdMenu.js';
import { Icon } from '@scopedelement/material-web/icon/internal/icon.js';
import { MdDivider } from '@scopedelement/material-web/divider/MdDevider.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { MdList } from '@scopedelement/material-web/list/MdList.js';
import { MdListItem } from '@scopedelement/material-web/list/MdListItem.js';
import { MdMenuItem } from '@scopedelement/material-web/menu/MdMenuItem.js';
import { MdOutlinedTextField } from '@scopedelement/material-web/textfield/MdOutlinedTextField.js';

import { FilterListBase } from './base-list.js';

type Action = {
  icon: string;
  label?: string;
  callback: () => void;
};

export type ActionItem = {
  /** The main information of the list item */
  headline: string;
  /** Supporting information rendered in a second line */
  supportingText?: string;
  /** An attached XML element */
  attachedElement?: Element;
  /** An icon rendered left to the list item content */
  startingIcon?: string;
  /** An icon rendered right to the list item content */
  endingIcon?: string;
  /** Whether to add a divider at the bottom of the item  */
  divider?: boolean;
  /** Specifies additional filter terms */
  filtergroup?: string[];
  /** The action to be performed when clicking the list item */
  primaryAction?: () => void;
  /** Additional actions for the item. The first rendered is visible */
  actions?: Action[];
};

function term(item: ActionItem): string {
  return `${item.headline} ${item.supportingText ?? ''}${
    item.filtergroup?.join(' ') ?? ''
  }`;
}

@customElement('action-list')
/** TextField designed to be used for SCL element */
export class ActionList extends FilterListBase {
  static scopedElements = {
    'md-outlined-text-field': MdOutlinedTextField,
    'md-icon': MdIcon,
    'md-list': MdList,
    'md-list-item': MdListItem,
    'md-divider': MdDivider,
    'md-menu': MdMenu,
    'md-menu-item': MdMenuItem,
  };

  /** ListItems and potential */
  @property({ type: Array })
  items: ActionItem[] = [];

  private renderMoreVertItem(item: ActionItem): TemplateResult {
    item.actions!.shift();
    const otherActions = item.actions!;

    return html`
      <span style="position: relative">
        <md-list-item
          id="more-vert-anchor"
          type="button"
          class="${classMap({
            twoline: !!item.supportingText,
            hidden: !this.searchRegex.test(term(item)),
          })}"
          @click=${(evt: Event) => {
            const menu =
              evt.target instanceof Icon
                ? ((evt.target.parentElement as Element)
                    .nextElementSibling as Menu)
                : ((evt.target as Element).nextElementSibling as Menu);

            menu.show();
          }}
        >
          <md-icon slot="start">more_vert</md-icon>
        </md-list-item>
        <md-menu id="more-vert-menu" anchor="more-vert-anchor">
          ${otherActions.map(
            action => html`<md-menu-item @click=${action.callback}>
              <div slot="headline">${action.label}</div>
              <md-icon slot="start">${action.icon}</md-icon>
            </md-menu-item>`
          )}
        </md-menu> </span
      >${item.divider
        ? html`<md-divider
            class="${classMap({ hidden: !this.searchRegex.test(term(item)) })}"
          ></md-divider>`
        : html``}
    `;
  }

  private renderActionItem(item: ActionItem, index = 0): TemplateResult {
    const action = item.actions ? item.actions[index] : null;

    if (!action)
      return html` <md-list-item
          class="${classMap({
            twoline: !!item.supportingText,
            hidden: !this.searchRegex.test(term(item)),
          })}"
        ></md-list-item
        >${item.divider
          ? html`<md-divider
              class="${classMap({
                hidden: !this.searchRegex.test(term(item)),
              })}"
            ></md-divider>`
          : html``}`;

    return html`<md-list-item
        type="button"
        class="${classMap({
          twoline: !!item.supportingText,
          hidden: !this.searchRegex.test(term(item)),
        })}"
        @click=${action.callback}
      >
        <md-icon slot="start">${action.icon}</md-icon> </md-list-item
      >${item.divider
        ? html`<md-divider
            class="${classMap({ hidden: !this.searchRegex.test(term(item)) })}"
          ></md-divider>`
        : html``}`;
  }

  private renderOtherActions(): TemplateResult {
    return html`<md-list>
      ${this.items.map(item =>
        item.actions && item.actions?.length > 2
          ? this.renderMoreVertItem(item)
          : this.renderActionItem(item, 1)
      )}</md-list
    >`;
  }

  private renderFirstAction(): TemplateResult {
    return html`<md-list>
      ${this.items.map(item => this.renderActionItem(item))}</md-list
    >`;
  }

  private renderActions(): TemplateResult {
    return html`
      ${this.items.some(item => item.actions && item.actions[0])
        ? this.renderFirstAction()
        : html``}
      ${this.items.some(item => item.actions && item.actions.length > 1)
        ? this.renderOtherActions()
        : html``}
    `;
  }

  private renderActionListItem(item: ActionItem): TemplateResult {
    return html`<md-list-item
        type="${item.primaryAction ? 'link' : 'text'}"
        class="${classMap({
          hidden: !this.searchRegex.test(term(item)),
        })}"
        @click="${item.primaryAction}"
      >
        <div slot="headline">${item.headline}</div>
        ${item.supportingText
          ? html`<div slot="headline">${item.supportingText}</div>`
          : html``}
        ${item.startingIcon
          ? html`<md-icon slot="start">${item.startingIcon}</md-icon>`
          : html``}
        ${item.endingIcon
          ? html`<md-icon slot="end">${item.endingIcon}</md-icon>`
          : html``} </md-list-item
      >${item.divider
        ? html`<md-divider
            class="${classMap({ hidden: !this.searchRegex.test(term(item)) })}"
          ></md-divider>`
        : html``}`;
  }

  private renderListItem(item: ActionItem): TemplateResult {
    return this.renderActionListItem(item);
  }

  render(): TemplateResult {
    return html`<section>
      ${this.renderSearchField()}
      <div style="display: flex;">
        <md-list class="listitems">
          ${this.items.map(item => this.renderListItem(item))}</md-list
        >
        ${this.renderActions()}
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

    md-list-item.twoline {
      height: 72px;
    }

    .listitems {
      flex: auto;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hidden {
      display: none;
    }
  `;
}
