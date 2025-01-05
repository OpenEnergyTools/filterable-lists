import { html, TemplateResult } from 'lit';

import './action-list.js';
import './selection-list.js';
import type { ActionItem } from './ActionList.js';
import type { SelectItem } from './SelectionList.js';

export default {
  title: 'filtered-list-components',
  component: 'action-item',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface SelectedListArgTypes {
  listItems: SelectItem[];
  filterable: boolean;
}

interface ActionListArgTypes {
  listItems: ActionItem[];
  filterable: boolean;
}

const ActionListTemplate: Story<ActionListArgTypes> = ({
  listItems = [
    { headline: 'item1', supportingText: 'supText1' },
    {
      headline: 'item2',
      primaryAction: () => {
        window.alert('clicked');
      },
    },
    {
      headline: 'item3',
      actions: [
        {
          icon: 'edit',
          label: 'label',
          callback: () => {
            window.alert('prim clicked');
          },
        },
      ],
    },
    {
      headline: 'item4',
      actions: [
        {
          icon: 'edit',
          label: 'label',
          callback: () => {
            window.alert('prim clicked');
          },
        },
        {
          icon: 'delete',
          label: 'label',
          callback: () => {
            window.alert('sec clicked');
          },
        },
      ],
    },
  ],
  filterable = false,
}) =>
  html`
    <action-list .items="${listItems}" ?filterable=${filterable}> </action-list>
  `;

export const ActionLessList = ActionListTemplate.bind({});
ActionLessList.args = {
  listItems: [
    {
      headline: 'item1',
      supportingText:
        'a veeeeeeeery veeeeeeeery loooooooong suporting text with empty spaces',
      actions: [
        {
          icon: 'edit',
          callback: () => {
            window.alert('prim clicked');
          },
        },
        {
          icon: 'delete',
          callback: () => {
            window.alert('sec clicked');
          },
        },
        {
          icon: 'add',
          callback: () => {
            window.alert('tert clicked');
          },
        },
      ],
    },
    {
      headline: 'item2',
      primaryAction: () => {
        window.alert('clicked');
      },
    },
    {
      headline: 'item3',
      actions: [
        {
          icon: 'edit',
          label: 'label',
          callback: () => {
            window.alert('prim clicked');
          },
        },
      ],
    },
    {
      headline: 'item4',
      actions: [
        {
          icon: 'edit',
          label: 'label',
          callback: () => {
            window.alert('prim clicked');
          },
        },
        {
          icon: 'delete',
          label: 'label',
          callback: () => {
            window.alert('sec clicked');
          },
        },
      ],
    },
    {
      headline: 'item4',
      actions: [
        {
          icon: 'edit',
          label: 'label',
          callback: () => {
            window.alert('prim clicked');
          },
        },
        {
          icon: 'delete',
          label: 'label',
          callback: () => {
            window.alert('sec clicked');
          },
        },
        {
          icon: 'add',
          label: 'label',
          callback: () => {
            window.alert('ter clicked');
          },
        },
      ],
    },
  ],
  filterable: false,
};

const CheckedListTemplate: Story<SelectedListArgTypes> = ({
  listItems = [
    { headline: 'item1', supportingText: 'supText1' },
    {
      headline: 'item2',
    },
    {
      headline: 'item3',
    },
    {
      headline: 'item4',
    },
  ],
  filterable = false,
}) =>
  html`
    <selection-list
      .items="${listItems}"
      ?filterable=${filterable}
    ></selection-list>
  `;

export const CheckedList = CheckedListTemplate.bind({});
CheckedList.args = {
  listItems: [
    {
      headline: 'item1',
      supportingText: 'supText1',
      selected: true,
    },
    { headline: 'item2', selected: false },
    {
      headline: 'item3',
      supportingText: 'supText3',
      selected: true,
    },
    { headline: 'item4', selected: false },
  ],
  filterable: false,
};
