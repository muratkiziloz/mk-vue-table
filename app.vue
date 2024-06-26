<script setup lang="ts">
import { ref } from 'vue';

const headers = ref([
  { text: 'Name', value: 'name', searchValue: 'name', operator: 'equals' },
  { text: 'Age', value: 'age', searchValue: 'age', operator: 'equals' },
]);

const rows = ref([
  { name: 'John Doe', age: 30 },
  { name: 'Jane Smith', age: 25 },
]);

</script>

<template>
  <MyTable
      :headers="headers"
      :rows="rows"
      headerClass="my-custom-header-class"
      :headerStyle="{ backgroundColor: 'blue', color: 'white' }"
  />
</template>

<style lang="css" scoped>
.my-custom-header-class {
  font-size: 40px;
  text-align: center;
  color: black;
}
</style>
