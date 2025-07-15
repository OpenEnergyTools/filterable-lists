# \<selection-list>

This is a specialized list allowing you to selected and filter XML elements.

# \<action-list>

This is a specialized list allowing you to defined various kinds of actions on list items. When more than 2 additional actions are defined the actions 2 and following are grouped in a menu item.

# Usage

This element was meant to be used only for plugins in this organization. If it still fills you bill please use or re-use it. But be aware that we will not react on feature wishes that do not contribute to the needs of plugin in this organization.


## `ActionList.ts`:

### class: `ActionList`, `action-list`

#### Superclass

| Name             | Module        | Package |
| ---------------- | ------------- | ------- |
| `FilterListBase` | /base-list.js |         |

#### Static Fields

| Name             | Privacy | Type     | Default                                                                                                                                                                                                                      | Description | Inherited From |
| ---------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------- |
| `scopedElements` |         | `object` | `{
    'md-outlined-text-field': MdOutlinedTextField,
    'md-icon': MdIcon,
    'md-list': MdList,
    'md-list-item': MdListItem,
    'md-divider': MdDivider,
    'md-menu': MdMenu,
    'md-menu-item': MdMenuItem,
  }` |             |                |

#### Fields

| Name           | Privacy | Type           | Default    | Description                                                               | Inherited From |
| -------------- | ------- | -------------- | ---------- | ------------------------------------------------------------------------- | -------------- |
| `items`        |         | `ActionItem[]` | `[]`       | ListItems and potential                                                   |                |
| `height`       |         | `number`       | `72`       | Height of each list item                                                  |                |
| `filterable`   |         | `boolean`      | `false`    | Whether list items can be filtered on \`headline\` and \`supportingText\` | FilterListBase |
| `searchhelper` |         | `string`       | `'search'` | Placeholder for search input field                                        | FilterListBase |
| `searchRegex`  |         | `RegExp`       | `/.*/i`    |                                                                           | FilterListBase |
| `searchValue`  |         | `string`       |            | Current search filter value. Updates search regex when changed.           | FilterListBase |

<details><summary>Private API</summary>

#### Fields

| Name           | Privacy   | Type                     | Default | Description | Inherited From |
| -------------- | --------- | ------------------------ | ------- | ----------- | -------------- |
| `searchInput`  | protected | `TextField \| undefined` |         |             | FilterListBase |
| `_searchValue` | protected | `string`                 | `''`    |             | FilterListBase |

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

| Kind | Name         | Declaration | Module        | Package |
| ---- | ------------ | ----------- | ------------- | ------- |
| `js` | `ActionList` | ActionList  | ActionList.ts |         |

## `SelectionList.ts`:

### class: `SelectionList`, `selection-list`

#### Superclass

| Name             | Module        | Package |
| ---------------- | ------------- | ------- |
| `FilterListBase` | /base-list.js |         |

#### Static Fields

| Name             | Privacy | Type     | Default                                                                                                                                                                 | Description | Inherited From |
| ---------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------- |
| `scopedElements` |         | `object` | `{
    'md-outlined-text-field': MdOutlinedTextField,
    'md-icon': MdIcon,
    'md-list': MdList,
    'md-list-item': MdListItem,
    'md-checkbox': MdCheckbox,
  }` |             |                |

#### Fields

| Name               | Privacy | Type           | Default    | Description                                                               | Inherited From |
| ------------------ | ------- | -------------- | ---------- | ------------------------------------------------------------------------- | -------------- |
| `items`            |         | `SelectItem[]` | `[]`       |                                                                           |                |
| `selectedElements` |         | `Element[]`    |            |                                                                           |                |
| `filterable`       |         | `boolean`      | `false`    | Whether list items can be filtered on \`headline\` and \`supportingText\` | FilterListBase |
| `searchhelper`     |         | `string`       | `'search'` | Placeholder for search input field                                        | FilterListBase |
| `searchRegex`      |         | `RegExp`       | `/.*/i`    |                                                                           | FilterListBase |
| `searchValue`      |         | `string`       |            | Current search filter value. Updates search regex when changed.           | FilterListBase |

<details><summary>Private API</summary>

#### Fields

| Name           | Privacy   | Type                     | Default | Description | Inherited From |
| -------------- | --------- | ------------------------ | ------- | ----------- | -------------- |
| `searchInput`  | protected | `TextField \| undefined` |         |             | FilterListBase |
| `_searchValue` | protected | `string`                 | `''`    |             | FilterListBase |

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

| Kind | Name            | Declaration   | Module           | Package |
| ---- | --------------- | ------------- | ---------------- | ------- |
| `js` | `SelectionList` | SelectionList | SelectionList.ts |         |

## `action-list.ts`:

### Exports

| Kind                        | Name          | Declaration | Module         | Package |
| --------------------------- | ------------- | ----------- | -------------- | ------- |
| `custom-element-definition` | `action-list` | ActionList  | /ActionList.js |         |

## `base-list.ts`:

### class: `FilterListBase`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Mixins

| Name                  | Module | Package                                 |
| --------------------- | ------ | --------------------------------------- |
| `ScopedElementsMixin` |        | @open-wc/scoped-elements/lit-element.js |

#### Fields

| Name           | Privacy | Type      | Default    | Description                                                               | Inherited From |
| -------------- | ------- | --------- | ---------- | ------------------------------------------------------------------------- | -------------- |
| `filterable`   |         | `boolean` | `false`    | Whether list items can be filtered on \`headline\` and \`supportingText\` |                |
| `searchhelper` |         | `string`  | `'search'` | Placeholder for search input field                                        |                |
| `searchRegex`  |         | `RegExp`  | `/.*/i`    |                                                                           |                |
| `searchValue`  |         | `string`  |            | Current search filter value. Updates search regex when changed.           |                |

<details><summary>Private API</summary>

#### Fields

| Name           | Privacy   | Type                     | Default | Description | Inherited From |
| -------------- | --------- | ------------------------ | ------- | ----------- | -------------- |
| `searchInput`  | protected | `TextField \| undefined` |         |             |                |
| `_searchValue` | protected | `string`                 | `''`    |             |                |

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

### Exports

| Kind                        | Name             | Declaration   | Module            | Package |
| --------------------------- | ---------------- | ------------- | ----------------- | ------- |
| `custom-element-definition` | `selection-list` | SelectionList | /SelectionList.js |         |


&copy; 2023 The Contributors
