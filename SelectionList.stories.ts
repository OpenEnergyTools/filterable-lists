import { html } from 'lit';

import './selection-list.js';
import type { SelectItem } from './SelectionList.js';

interface SelectionListArgTypes {
  items: SelectItem[];
  filterable: boolean;
}

const meta = {
  title: 'Components/SelectionList',
  component: 'selection-list',
  parameters: {
    docs: {
      description: {
        component: `
A filterable list component. Each item has a checkbox for selecting/deselecting.

## Features

- **Multi-selection**: Checkboxes for selecting multiple items
- **Filtering**: Built-in search functionality with controlled/uncontrolled modes  
- **Disabled Items**: Items can be displayed but disabled from selection
- **Element References**: Items can reference DOM/XML elements for data binding
- **Selected Elements**: Access selected items' referenced elements via \`selectedElements\` property

## Usage

\`\`\`typescript
import './selection-list.js';

// Basic usage
<selection-list .items="\${items}"></selection-list>

// With filtering
<selection-list .items="\${items}" filterable></selection-list>

// Controlled search
<selection-list 
  .items="\${items}" 
  filterable
  .searchValue="\${searchValue}"
  @search-change="\${handleSearchChange}">
</selection-list>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of selectable items',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable search/filter functionality',
    },
  },
  render: ({ items = [], filterable = false }: SelectionListArgTypes) =>
    html`
      <selection-list .items="${items}" ?filterable=${filterable}>
      </selection-list>
    `,
};

export default meta;

export const Default = {
  args: {
    items: [
      { headline: 'Option 1', supportingText: 'First option', selected: false },
      { headline: 'Option 2', supportingText: 'Second option', selected: true },
      { headline: 'Option 3', supportingText: 'Third option', selected: false },
      { headline: 'Option 4', supportingText: 'Fourth option', selected: true },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default selection list with checkboxes. Click checkboxes to toggle selection state.',
      },
    },
  },
};

export const WithIcons = {
  args: {
    items: [
      {
        headline: 'Email Notifications',
        supportingText: 'Receive email updates',
        selected: true,
        startingIcon: 'email',
      },
      {
        headline: 'Push Notifications',
        supportingText: 'Receive push notifications',
        selected: false,
        startingIcon: 'notifications',
      },
      {
        headline: 'SMS Notifications',
        supportingText: 'Receive text messages',
        selected: true,
        startingIcon: 'sms',
      },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection list with icons for visual enhancement.',
      },
    },
  },
};

export const WithDisabledItems = {
  args: {
    items: [
      {
        headline: 'Option 1',
        supportingText: 'First option',
        selected: true,
        disabled: false,
      },
      {
        headline: 'Option 2',
        supportingText: 'Second option',
        selected: false,
        disabled: false,
      },
      {
        headline: 'Option 3',
        supportingText: 'Third option',
        selected: false,
        disabled: true,
      },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Selection list with some items disabled. Disabled items cannot be selected/deselected.',
      },
    },
  },
};

export const Filtering = {
  args: {
    items: [
      {
        headline: 'Apple',
        supportingText: 'Red fruit',
        selected: true,
        filtergroup: ['fruit', 'red', 'round'],
      },
      {
        headline: 'Banana',
        supportingText: 'Yellow fruit',
        selected: false,
        filtergroup: ['fruit', 'yellow'],
      },
      {
        headline: 'Cherry',
        supportingText: 'Small red fruit',
        selected: true,
        filtergroup: ['fruit', 'red', 'small'],
      },
      {
        headline: 'Orange',
        supportingText: 'Orange citrus fruit',
        selected: false,
        filtergroup: ['fruit', 'orange', 'citrus'],
      },
      {
        headline: 'Carrot',
        supportingText: 'Orange vegetable',
        selected: false,
        filtergroup: ['vegetable', 'orange'],
      },
      {
        headline: 'Lettuce',
        supportingText: 'Green leafy vegetable',
        selected: true,
        filtergroup: ['vegetable', 'green'],
      },
    ],
    filterable: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Filtering with Search**

This story demonstrates the search functionality that filters items based on their visible text and optional filter groups.
Selection state is preserved during filtering.

**Usage Example:**

\`\`\`
const items = [
  {
    headline: 'Apple',
    supportingText: 'Red fruit',
    selected: true,
    filtergroup: ['fruit', 'red', 'round'] // Optional search terms
  },
  {
    headline: 'Carrot',
    supportingText: 'Orange vegetable', 
    selected: false,
    filtergroup: ['vegetable', 'orange']
  }
];

// Get selected items' elements (if attachedElement is used)
const selectedElements = selectionList.selectedElements;
\`\`\`
        `,
      },
    },
  },
};

export const ControlledSearch = {
  args: {
    items: [
      {
        headline: 'Task 1',
        supportingText: 'High priority task',
        selected: true,
      },
      {
        headline: 'Task 2',
        supportingText: 'Medium priority task',
        selected: false,
      },
      {
        headline: 'Task 3',
        supportingText: 'Low priority task',
        selected: false,
      },
      {
        headline: 'Meeting',
        supportingText: 'Weekly team meeting',
        selected: true,
      },
      {
        headline: 'Review',
        supportingText: 'Code review session',
        selected: false,
      },
    ],
    filterable: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Controlled Search Example**

This story demonstrates external search control where the parent component manages the search state. 

In a real application, you would:
1. Store the search value in parent component state
2. Pass it via the \`searchValue\` property  
3. Handle updates via the \`search-change\` event

Selection state is preserved across search changes.

\`\`\`
// Parent component example
class MyComponent extends LitElement {
  searchValue = '';
  
  handleSearchChange(event: CustomEvent) {
    this.searchValue = event.detail.value;
    // Save to localStorage, update URL, etc.
  }
  
  render() {
    return html\`
      <selection-list 
        .items="\${this.items}"
        .filterable="\${true}"
        .searchValue="\${this.searchValue}"
        @search-change="\${this.handleSearchChange}">
      </selection-list>
    \`;
  }
}
\`\`\`
        `,
      },
    },
  },
};
