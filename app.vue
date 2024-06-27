<template>
  <MyTable
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
      <button @click="handleAction(row)">Action</button>
    </template>
  </MyTable>
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
  { name: 'Jane Smith', age: 26, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 27, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 24, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Hasan Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
  { name: 'Jane Smith', age: 25, age2: 'tesf', age4: 'test2'  },
]);

const handleAction = (row) => {
  alert(`Action clicked for ${row.name}`);
};
</script>

<style scoped></style>
