/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import { TextField } from '@scopedelement/material-web/textfield/internal/text-field';

function searchRegex(filter?: string): RegExp {
  if (!filter) return /.*/i;

  const terms: string[] =
    filter
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .trim()
      .match(/(?:[^\s"']+|['"][^'"]*["'])+/g) ?? [];

  const expandedTerms = terms.map(term =>
    term.replace(/\*/g, '.*').replace(/\?/g, '.{1}').replace(/"|'/g, '')
  );

  const regexString = expandedTerms.map(term => `(?=.*${term})`);

  return new RegExp(`${regexString.join('')}.*`, 'i');
}

function debounce(callback: any, delay = 100) {
  let timeout: any;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

// Base class for all filterable list components
export class FilterListBase extends ScopedElementsMixin(LitElement) {
  /** Whether list items can be filtered on `headline` and `supportingText` */
  @property({ type: Boolean })
  filterable = false;

  /** Placeholder for search input field */
  @property({ type: String })
  searchhelper = 'search';

  /** Search/filter value. If set, component is controlled and emits 'search-change' on update. */
  @property({ type: String })
  searchValue?: string;

  @query('md-outlined-text-field')
  protected searchInput?: TextField;

  protected get searchRegex(): RegExp {
    const filterValue =
      this.searchValue !== undefined
        ? this.searchValue
        : this.searchInput?.value ?? '';
    return searchRegex(filterValue);
  }

  protected onFilter(): void {
    if (this.searchValue !== undefined) {
      const newValue = this.searchInput?.value ?? '';
      this.dispatchEvent(
        new CustomEvent('search-change', {
          detail: { value: newValue },
          bubbles: true,
        })
      );
    } else {
      this.requestUpdate();
    }
  }

  protected renderSearchField(): TemplateResult {
    return this.filterable
      ? html`<md-outlined-text-field
          placeholder="${this.searchhelper}"
          .value="${ifDefined(this.searchValue)}"
          @input="${debounce(() => this.onFilter())}"
        >
          <md-icon slot="leading-icon">search</md-icon></md-outlined-text-field
        >`
      : html``;
  }
}
