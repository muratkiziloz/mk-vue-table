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
  { text: 'Agesdas', value: 'age2', searchValue: 'age', operator: 'equals' },
  { text: 'Age35rf', value: 'status', searchValue: 'age', operator: 'equals' },
]);

const rows = ref([
  { name: 'John Doe', age: 30, age2: 'tesf', status: '1' },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 26, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 26, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 27, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 24, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '0'  },
  { name: 'Hasan Smith', age: 25, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '0'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', status: '1'  },
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

<style scoped></style>
