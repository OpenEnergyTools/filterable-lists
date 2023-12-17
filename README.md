# \<selection-list>

This is a specialized list allowing you to selected and filter XML elements.

# \<action-list>

This is a specialized list allowing you to defined various kinds of actions on list items. When more than 2 additional actions are defined the actions 2 and following are grouped in a menu item.

# Usage

This element was meant to be used only for plugins in this organization. If it still fills you bill please use or re-use it. But be aware that we will not react on feature wishes that do not contribute to the needs of plugin in this organization.


## `action-list.ts`:

### class: `ActionList`

#### Superclass

| Name             | Module        | Package |
| ---------------- | ------------- | ------- |
| `FilterListBase` | /base-list.js |         |

#### Fields

| Name    | Privacy | Type           | Default | Description             | Inherited From |
| ------- | ------- | -------------- | ------- | ----------------------- | -------------- |
| `items` |         | `ActionItem[]` | `[]`    | ListItems and potential |                |

<details><summary>Private API</summary>

#### Fields

| Name          | Privacy   | Type                     | Default | Description                                                               | Inherited From |
| ------------- | --------- | ------------------------ | ------- | ------------------------------------------------------------------------- | -------------- |
| `filterable`  | protected | `boolean`                | `false` | Whether list items can be filtered on \`headline\` and \`supportingText\` | FilterListBase |
| `searchRegex` | protected | `RegExp`                 | `/.*/i` |                                                                           | FilterListBase |
| `searchInput` | protected | `TextField \| undefined` |         |                                                                           | FilterListBase |

#### Methods

| Name                   | Privacy   | Description | Parameters                | Return           | Inherited From |
| ---------------------- | --------- | ----------- | ------------------------- | ---------------- | -------------- |
| `renderMoreVertItem`   | private   |             | `item: ActionItem`        | `TemplateResult` |                |
| `renderActionItem`     | private   |             | `item: ActionItem, index` | `TemplateResult` |                |
| `renderOtherActions`   | private   |             |                           | `TemplateResult` |                |
| `renderFirstAction`    | private   |             |                           | `TemplateResult` |                |
| `renderActions`        | private   |             |                           | `TemplateResult` |                |
| `renderActionListItem` | private   |             | `item: ActionItem`        | `TemplateResult` |                |
| `renderListItem`       | private   |             | `item: ActionItem`        | `TemplateResult` |                |
| `onFilter`             | protected |             |                           | `void`           | FilterListBase |
| `renderSearchField`    | protected |             |                           | `TemplateResult` | FilterListBase |

</details>

<hr/>

### Exports

| Kind | Name         | Declaration | Module         | Package |
| ---- | ------------ | ----------- | -------------- | ------- |
| `js` | `ActionList` | ActionList  | action-list.ts |         |

## `base-list.ts`:

### class: `FilterListBase`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

<details><summary>Private API</summary>

#### Fields

| Name          | Privacy   | Type                     | Default | Description                                                               | Inherited From |
| ------------- | --------- | ------------------------ | ------- | ------------------------------------------------------------------------- | -------------- |
| `filterable`  | protected | `boolean`                | `false` | Whether list items can be filtered on \`headline\` and \`supportingText\` |                |
| `searchRegex` | protected | `RegExp`                 | `/.*/i` |                                                                           |                |
| `searchInput` | protected | `TextField \| undefined` |         |                                                                           |                |

#### Methods

| Name                | Privacy   | Description | Parameters | Return           | Inherited From |
| ------------------- | --------- | ----------- | ---------- | ---------------- | -------------- |
| `onFilter`          | protected |             |            | `void`           |                |
| `renderSearchField` | protected |             |            | `TemplateResult` |                |

</details>

<hr/>

### Exports

| Kind | Name             | Declaration    | Module       | Package |
| ---- | ---------------- | -------------- | ------------ | ------- |
| `js` | `FilterListBase` | FilterListBase | base-list.ts |         |

## `selection-list.ts`:

### class: `SelectionList`

#### Superclass

| Name             | Module        | Package |
| ---------------- | ------------- | ------- |
| `FilterListBase` | /base-list.js |         |

#### Fields

| Name               | Privacy | Type           | Default | Description | Inherited From |
| ------------------ | ------- | -------------- | ------- | ----------- | -------------- |
| `items`            |         | `SelectItem[]` | `[]`    |             |                |
| `selectedElements` |         | `Element[]`    |         |             |                |

<details><summary>Private API</summary>

#### Fields

| Name          | Privacy   | Type                     | Default | Description                                                               | Inherited From |
| ------------- | --------- | ------------------------ | ------- | ------------------------------------------------------------------------- | -------------- |
| `filterable`  | protected | `boolean`                | `false` | Whether list items can be filtered on \`headline\` and \`supportingText\` | FilterListBase |
| `searchRegex` | protected | `RegExp`                 | `/.*/i` |                                                                           | FilterListBase |
| `searchInput` | protected | `TextField \| undefined` |         |                                                                           | FilterListBase |

#### Methods

| Name                     | Privacy   | Description | Parameters         | Return           | Inherited From |
| ------------------------ | --------- | ----------- | ------------------ | ---------------- | -------------- |
| `renderCheckboxListItem` | private   |             | `item: SelectItem` | `TemplateResult` |                |
| `renderListItem`         | private   |             | `item: SelectItem` | `TemplateResult` |                |
| `onFilter`               | protected |             |                    | `void`           | FilterListBase |
| `renderSearchField`      | protected |             |                    | `TemplateResult` | FilterListBase |

</details>

<hr/>

### Exports

| Kind | Name            | Declaration   | Module            | Package |
| ---- | --------------- | ------------- | ----------------- | ------- |
| `js` | `SelectionList` | SelectionList | selection-list.ts |         |


&copy; 2023 The Contributors
