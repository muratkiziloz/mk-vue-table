<!-- Pagination.vue -->
<template>
  <div class="pagination flex justify-center items-center space-x-2">
    <button @click="gotoPage(1)" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">First</button>
    <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
    <span class="px-4 py-2 text-gray-700">{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
    <button @click="gotoPage(totalPages)" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">Last</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  onPageChange: {
    type: Function,
    required: true
  }
});

const prevPage = () => {
  if (props.currentPage > 1) {
    props.onPageChange(props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    props.onPageChange(props.currentPage + 1);
  }
};

const gotoPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    props.onPageChange(page);
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  float: right;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
