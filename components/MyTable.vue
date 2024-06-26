<template>
  <div>
    <table>
      <thead :class="headerClass" :style="headerStyle">
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header.text }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(header, index) in headers" :key="index">{{ row[header.value] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item =>
          typeof item.text === 'string' &&
          typeof item.value === 'string' &&
          typeof item.searchValue === 'string' &&
          typeof item.operator === 'string'
      );
    }
  },
  rows: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => typeof item === 'object');
    }
  },
  headerClass: {
    type: String,
    default: ''
  },
  headerStyle: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

</style>
