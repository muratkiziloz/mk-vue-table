<template>
  <div>
    <table>
      <thead :class="headerClass" :style="headerStyle">
      <tr>
        <th v-for="(header, index) in headers" :key="index" @click="sortTable(header.value)">
          {{ header.text }}
          <input v-if="columnSearch" class="search-input" type="text" v-model="searchText[index]" placeholder="ara" @input="handleSearch(header.value, $event.target.value)">
          <span :class="getSortIcon(header.value)"></span>
        </th>
        <th v-if="action">Actions</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
        <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header.value] }}</td>
        <td v-if="action">
          <slot name="action" :row="row"></slot>
        </td>
      </tr>
      </tbody>
    </table>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :onPageChange="changePage" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Pagination from './Pagination.vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  headerClass: {
    type: String,
    required: false
  },
  headerStyle: {
    type: Object,
    required: false
  },
  sortAscIcon: {
    type: String,
    required: true
  },
  sortDescIcon: {
    type: String,
    required: true
  },
  sortDefaultIcon: {
    type: String,
    required: true
  },
  action: {
    type: Boolean,
    required: false,
    default: false
  },
  columnSearch: {
    type: Boolean,
    required: false,
    default: true
  },
  perPage: {
    type: Number,
    default: 10
  }
});

const currentPage = ref(1);
const sortKey = ref('');
const sortOrder = ref(1);
const searchText = ref(Array(props.headers.length).fill(''));

// Sıralama işlemi
const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows;

  return [...props.rows].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (aValue < bValue) return sortOrder.value * -1;
    if (aValue > bValue) return sortOrder.value;
    return 0;
  });
});

// Filtreleme işlemi
const filteredRows = computed(() => {
  return sortedRows.value.filter(row => {
    return props.headers.every((header, index) => {
      const searchValue = searchText.value[index].toLowerCase();
      return String(row[header.value]).toLowerCase().includes(searchValue);
    });
  });
});

// Sayfalama işlemi
const paginatedRows = computed(() => {
  const startIndex = (currentPage.value - 1) * props.perPage;
  const endIndex = startIndex + props.perPage;
  return filteredRows.value.slice(startIndex, endIndex);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(filteredRows.value.length / props.perPage);
});

// Sayfa değişimi
const changePage = (page: number) => {
  currentPage.value = page;
};

// Arama işlemi
const handleSearch = (key, value) => {
  searchText.value[props.headers.findIndex(header => header.value === key)] = value;
};

// Sıralama işlemi
const sortTable = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

// Sıralama ikonu
const getSortIcon = (key: string) => {
  if (sortKey.value === key) {
    return sortOrder.value === 1 ? props.sortAscIcon : props.sortDescIcon;
  }
  return props.sortDefaultIcon;
};

// Sayfa numarası değiştikçe, filtrelenmiş ve sıralanmış veriler tekrar hesaplanır
watch([sortedRows, filteredRows], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
}

th {
  cursor: pointer;
  position: relative;
  font-weight: 600;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
}

th input[type="text"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

th:hover {
  background-color: #f1f1f1;
}

tbody tr {
  transition: background-color 0.3s ease;
}

tbody tr:nth-child(even) {
  background-color: #f7f7f7;
}

tbody tr:hover {
  background-color: #ececec;
}

.icon {
  display: inline-block;
  margin-left: 8px;
  font-size: 0.2em;
}

.sort-asc::after {
  content: '▲';
  font-size: 0.2em;
}

.sort-desc::after {
  content: '▼';
  font-size: 0.2em;
}

.icon::after {
  content: '⇅';
  font-size: 0.2em;
}

.search-input {
  margin-top: 10px;
}
</style>
