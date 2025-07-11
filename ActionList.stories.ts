/* eslint-disable no-alert */
import { html } from 'lit';

import './action-list.js';
import type { ActionItem } from './ActionList.js';

interface ActionListArgTypes {
  items: ActionItem[];
  filterable: boolean;
  height?: number;
}

const meta = {
  title: 'Components/ActionList',
  component: 'action-list',
  parameters: {
    docs: {
      description: {
        component: `
A filterable list component for displaying items with actions. Items can have primary actions (clicking the item) and secondary actions (buttons/icons).

## Features

- **Primary Actions**: Click the entire item to trigger an action
- **Secondary Actions**: Up to 2 visible action buttons, additional actions in overflow menu
- **Filtering**: Built-in search functionality with controlled/uncontrolled modes
- **Icons**: Starting and ending icons for visual enhancement
- **Dividers**: Optional dividers between items

## Usage

\`\`\`typescript
import './action-list.js';

// Basic usage
<action-list .items="\${items}"></action-list>

// With filtering
<action-list .items="\${items}" filterable></action-list>

// Controlled search
<action-list 
  .items="\${items}" 
  filterable
  .searchValue="\${searchValue}"
  @search-change="\${handleSearchChange}">
</action-list>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of items to display in the list',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable search/filter functionality',
    },
    height: {
      control: { type: 'number', min: 40, max: 200, step: 8 },
      description: 'Height of each list item in pixels',
    },
  },
  render: ({
    items = [],
    filterable = false,
    height = 72,
  }: ActionListArgTypes) =>
    html`
      <action-list
        .items="${items}"
        ?filterable=${filterable}
        .height="${height}"
      >
      </action-list>
    `,
};

export default meta;

export const Default = {
  args: {
    items: [
      { headline: 'Document 1', supportingText: 'Created yesterday' },
      { headline: 'Document 2', supportingText: 'Created last week' },
      { headline: 'Document 3', supportingText: 'Created last month' },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default action list showing the basic component behavior. Items are display-only with no interactions, filtering, or actions enabled.',
      },
    },
  },
};

export const PrimaryActions = {
  args: {
    items: [
      {
        headline: 'Settings',
        supportingText: 'Configure application preferences',
        primaryAction: () => alert('Opening settings...'),
        startingIcon: 'settings',
      },
      {
        headline: 'Profile',
        supportingText: 'View and edit your profile',
        primaryAction: () => alert('Opening profile...'),
        startingIcon: 'person',
      },
      {
        headline: 'Help',
        supportingText: 'Get help and support',
        primaryAction: () => alert('Opening help...'),
        startingIcon: 'help',
      },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items with primary actions. Clicking anywhere on the item triggers the action.',
      },
    },
  },
};

export const SecondaryActions = {
  args: {
    items: [
      {
        headline: 'Project Alpha',
        supportingText: 'Last modified: 2 hours ago',
        startingIcon: 'folder',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            callback: () => alert('Editing project...'),
          },
        ],
      },
      {
        headline: 'Project Beta',
        supportingText: 'Last modified: 1 day ago',
        startingIcon: 'folder',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            callback: () => alert('Editing project...'),
          },
          {
            icon: 'delete',
            label: 'Delete',
            callback: () => alert('Deleting project...'),
          },
        ],
      },
      {
        headline: 'Project Gamma',
        supportingText: 'Last modified: 3 days ago',
        startingIcon: 'folder',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            callback: () => alert('Editing project...'),
          },
          {
            icon: 'delete',
            label: 'Delete',
            callback: () => alert('Deleting project...'),
          },
          {
            icon: 'share',
            label: 'Share',
            callback: () => alert('Sharing project...'),
          },
        ],
      },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items with secondary actions. First action is always visible, second action is visible if present, additional actions go into overflow menu (⋮).',
      },
    },
  },
};

export const Dividers = {
  args: {
    items: [
      {
        headline: 'Recent Files',
        supportingText: 'Files you worked on recently',
        startingIcon: 'history',
        divider: true,
      },
      {
        headline: 'Shared Files',
        supportingText: 'Files shared with you',
        startingIcon: 'share',
        divider: true,
      },
      {
        headline: 'Trash',
        supportingText: 'Deleted files',
        startingIcon: 'delete',
      },
    ],
    filterable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items with dividers to create visual separation between sections.',
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
        filtergroup: ['fruit', 'red', 'healty'],
      },
      {
        headline: 'Banana',
        supportingText: 'Yellow fruit',
        filtergroup: ['fruit', 'yellow'],
      },
      {
        headline: 'Cherry',
        supportingText: 'Small red fruit',
        filtergroup: ['fruit', 'red', 'small'],
      },
      {
        headline: 'Orange',
        supportingText: 'Orange citrus fruit',
        filtergroup: ['fruit', 'orange', 'citrus'],
      },
      {
        headline: 'Carrot',
        supportingText: 'Orange vegetable',
        filtergroup: ['vegetable', 'orange'],
      },
      {
        headline: 'Lettuce',
        supportingText: 'Green leafy vegetable',
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

**How Filtering Works:**
1. **Basic search** - Searches through headline and supportingText
2. **Filter groups (optional)** - Additional search terms via the \`filtergroup\` property

**Filter Groups (Optional):**
Each item can optionally include a \`filtergroup\` array for enhanced searching:

\`\`\`
const items = [
  {
    headline: 'Apple',
    supportingText: 'Red fruit',
    filtergroup: ['fruit', 'red', 'healthy'] // Optional search terms
  },
  {
    headline: 'Task Report',
    supportingText: 'Monthly summary',
    // No filtergroup - only searches headline and supportingText
  }
];
\`\`\`
        `,
      },
    },
  },
};

export const ControlledSearch = {
  args: {
    items: [
      { headline: 'Task 1', supportingText: 'High priority task' },
      { headline: 'Task 2', supportingText: 'Medium priority task' },
      { headline: 'Task 3', supportingText: 'Low priority task' },
      { headline: 'Meeting', supportingText: 'Weekly team meeting' },
      { headline: 'Review', supportingText: 'Code review session' },
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


\`\`\`typescript
// Parent component example
class MyComponent extends LitElement {
  searchValue = '';
  
  handleSearchChange(event: CustomEvent) {
    this.searchValue = event.detail.value;
  }
  
  render() {
    return html\`
      <action-list 
        .items="\${this.items}"
        .filterable="\${true}"
        .searchValue="\${this.searchValue}"
        @search-change="\${this.handleSearchChange}">
      </action-list>
    \`;
  }
}
\`\`\`
        `,
      },
    },
  },
};
