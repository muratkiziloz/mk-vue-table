# MkVueTable

This component allows you to create a dynamically sortable table using Vue.js. The table headers, rows, and optionally action areas can be defined dynamically.

## Features

- **Dynamic Sorting**: Click on the table headers to sort the rows in ascending or descending order.
- **Custom Icons**: You can customize the sorting icons.
- **Action Area**: Optionally, add an action area to the far right of each row where you can insert custom content using a template slot.
- **Search Area**: Optionally, add search area to each column.
- **Pagination**: Easily paginate your data to control the number of rows displayed per page.
- **Conditional Row Coloring**: Change the background color of rows based on specific conditions.
- **Custom Column Slots**: Add custom content to specific columns using template slots.
- **No Results Message**: Customize the message shown when no search results are found using a template slot.


## Installation

### Dependencies

Ensure you have Vue 3 installed to use this component.

### Usage

Include the component in your project and use it as shown in the example below:

```vue
<template>
  <MyTableComponent
    :headers="headers"
    :rows="rows"
    :sortAscIcon="'sort-asc'"
    :sortDescIcon="'sort-desc'"
    :sortDefaultIcon="'sort-default'"
    :action="true"
    :columnSearch="true"
    :perPage="5"
    :coloredRows="coloredRows"
    :defaultCss="true"
  >
    <template #action="{ row }">
      <button @click="handleAction(row)">Action</button>
    </template>
    
    <template #column-age="{ row, value }">
      <span :style="{ fontWeight: value > 30 ? 'bold' : 'normal' }">{{ value }}</span>
    </template>
    
  </MyTableComponent>
</template>

<script setup lang="ts">
import MyTableComponent from './MyTableComponent.vue';

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Age', value: 'age' },
  { text: 'Country', value: 'country' }
];

const rows = [
  { name: 'John Doe', age: 30, country: 'USA' },
  { name: 'Jane Smith', age: 25, country: 'Canada' },
  { name: 'Sam Green', age: 35, country: 'UK' }
];

const handleAction = (row) => {
  alert(`Action clicked for ${row.name}`);
};
</script>
```
## Props
### headers (Array, Required)
Defines the table headers. Each header should be an object with text (header label) and value (key for table data) properties.

#### Example:

```js
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Age', value: 'age' },
  { text: 'Country', value: 'country' }
];
```

### rows (Array, Required)
Defines the table headers. Each header should be an object with text (header label) and value (key for table data) properties.

#### Example:

```js
const rows = [
    { name: 'John Doe', age: 30, country: 'USA' },
    { name: 'Jane Smith', age: 25, country: 'Canada' },
    { name: 'Sam Green', age: 35, country: 'UK' }
];
```
### headerClass (String, Optional)
Adds a CSS class to the table header row.

### headerStyle (Object, Optional)
Applies styles to the table header row.
#### Example:
```js
const headerStyle = {
    backgroundColor: '#f1f1f1',
    color: '#333'
};
```

### sortAscIcon (String, Required)
CSS class for the ascending sort icon.
#### Example:
```js
<span class="sort-asc"></span>
```
### sortDescIcon (String, Required)
CSS class for the descending sort icon.
#### Example:
```js
<span class="sort-desc"></span>
```

### sortDefaultIcon (String, Required)
CSS class for the default sort icon.
#### Example:
```js
<span class="sort-default"></span>
```
### action (Boolean, Optional)
If true, adds an action area to the far right of each row. Default is false.

### columnSearch (Boolean, Optional)
If true, there is a search field under each column.

### perPage (Number, Required)
Number of records to show on one page

### coloredRows (Array, Optional)
Defines conditions to color the rows based on specific key-value pairs. Each condition is an object with a key, value, and color property.
#### Example:
```js
const coloredRows = [
    { key: 'age', value: '30', color: 'lightblue' },
    { key: 'country', value: 'Canada', color: 'lightgreen' }
];
```

### defaultCss (Boolean, Optional)
If true, css works. If not the table works without css.

## Slots
### action
You can define custom content for the action area of each row using a template slot named action.

### Example: 
```vue
<template #action="{ row }">
  <button @click="handleAction(row)">Action</button>
</template>
```
### column-[header.value]
You can define custom content for a specific column using a slot named column-[header.value], where [header.value] is the value of the header.
### Example:
```vue
<template #column-age="{ row, value }">
  <span :style="{ fontWeight: value > 30 ? 'bold' : 'normal' }">{{ value }}</span>
</template>
```
### undefined-result
You can define custom content to be displayed when no search results are found using a slot named undefined-result.
### Example:
```vue
<template #undefined-result>
  <div>No results found</div>
</template>
```

##### Usage Notes:
- Custom Column Slots: To add custom content to a specific column, use a slot named column-[header.value], replacing [header.value] with the value of the column header. This allows you to insert custom elements or apply custom styling based on the data in that column.


## Methods
### handleAction
A method to handle actions for a specific row. You can define this method in your component and pass it to the table component.
#### Example:
```js
const handleAction = (row) => {
    alert(`Action clicked for ${row.name}`);
};
```
