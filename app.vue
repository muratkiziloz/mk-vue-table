<template>
  <MyTable
      tableTitle="Example Table"
      :headers="headers"
      :rows="rows"
      :sortAscIcon="'sort-asc'"
      :sortDescIcon="'sort-desc'"
      :sortDefaultIcon="'sort-default'"
      :action="true"
      :columnSearch="true"
      :perPage="5"
  >
    <template #action="{ row }">
      <button  class=" whitespace-nowrap text-sm text-gray-500" @click="handleAction(row)">Action</button>
    </template>
    <template #undefined-result="{row}">
      <div class="center test  absolute">
        There were no results.
      </div>
    </template>
<!--    <template #column-age="{ row, value }">-->
<!--      <span :style="{ fontWeight: value > 26 ? 'bold' : 'normal' }">{{ value }}</span>-->
<!--    </template>-->
    <template #column-status="{ row, value }">
      <span :style="{ backgroundColor: value === '1' ? 'green' : 'red', color:'#fff', padding: '10px', borderRadius: '50px' }">{{ value === '1' ? 'Active' : 'Passive' }}</span>
    </template>
  </MyTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const headers = ref([
  { text: 'Name', value: 'name', searchValue: 'name', operator: 'equals' },
  { text: 'Age', value: 'age', searchValue: 'age', operator: 'equals' },
  { text: 'Occupation', value: 'occupation', searchValue: 'occupation', operator: 'equals' },
  { text: 'Status', value: 'status', searchValue: 'status', operator: 'equals' },
]);

const rows = ref([
  { name: 'John Doe', age: 30, occupation: 'Engineer', status: '1' },
  { name: 'Jane Smith', age: 25, occupation: 'Designer', status: '1' },
  { name: 'Sam Green', age: 35, occupation: 'Developer', status: '0' },
  { name: 'Anna Blue', age: 26, occupation: 'Manager', status: '1' },
  { name: 'Mike Brown', age: 28, occupation: 'Developer', status: '0' },
  { name: 'Sarah White', age: 24, occupation: 'Designer', status: '1' },
  { name: 'David Black', age: 32, occupation: 'Engineer', status: '0' },
  { name: 'Emily Gray', age: 27, occupation: 'Manager', status: '1' },
  { name: 'Chris Red', age: 29, occupation: 'Developer', status: '1' },
  { name: 'Katie Pink', age: 23, occupation: 'Designer', status: '0' },
]);

const coloredRows = ref([
  {
    key: 'status',
    value: '1',
    color: 'green',
  },
  {
    key: 'status',
    value: '0',
    color: 'red',
  },

])

const handleAction = (row) => {
  alert(`Action clicked for ${row.name}`);
};
</script>

<style scoped>
.test {
  padding: 100px;
  text-align: center;
}
</style>
