<template>
  <MyTable
      :headers="headers"
      :rows="rows"
      headerClass="my-custom-header-class"
      :headerStyle="{ backgroundColor: '#ecebeb', color: '#333' }"
      sortAscIcon="sort-asc"
      sortDescIcon="sort-desc"
      sortDefaultIcon="icon"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const headers = ref([
  { text: 'Name', value: 'name', searchValue: 'name', operator: 'equals' },
  { text: 'Age', value: 'age', searchValue: 'age', operator: 'equals' },
  { text: 'Agesdas', value: 'age2', searchValue: 'age', operator: 'equals' },
  { text: 'Age35rf', value: 'age4', searchValue: 'age', operator: 'equals' },
]);

const rows = ref([
  { name: 'John Doe', age: 30, age2: 'tesf', age4: 'test' },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
]);
</script>

<style scoped></style>
