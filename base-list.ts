/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import '@material/web/textfield/outlined-text-field';
import { TextField } from '@material/web/textfield/internal/text-field';

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
export class FilterListBase extends LitElement {
  /** Whether list items can be filtered on `headline` and `supportingText` */
  @property({ type: Boolean })
  filterable = false;

  /** Placeholder for search input field */
  @property({ type: String })
  searchhelper = 'search';

  @state()
  protected searchRegex: RegExp = /.*/i;

  @query('md-outlined-text-field')
  protected searchInput?: TextField;

  protected onFilter(): void {
    this.searchRegex = searchRegex(this.searchInput?.value);
  }

  protected renderSearchField(): TemplateResult {
    return this.filterable
      ? html`<md-outlined-text-field
          placeholder="${this.searchhelper}"
          @input="${debounce(() => this.onFilter())}"
        >
          <md-icon slot="leading-icon">search</md-icon></md-outlined-text-field
        >`
      : html``;
  }
}
