<template>
  <div :class="defaultCss ? 'table-card pb-20 pt-10 pl-10 pr-10' : ''">
    <div v-if="tableTitle" :class="defaultCss ? 'table-title text-2xl font-bold mb-6 text-gray-700' : ''">{{tableTitle}}</div>
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table :class="defaultCss ? 'table-auto min-w-full divide-y divide-gray-200' : ''">
        <thead class="bg-gray-50" :class="headerClass" :style="headerStyle">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" v-for="(header, index) in headers" :key="index">
            <div :class="defaultCss ? '' : 'sort-and-head-area'" @click="sortTable(header.value)">
              {{ header.text }}
              <span :class="getSortIcon(header.value)"></span>
            </div>

            <input v-if="columnSearch"
                   :class=" defaultCss ? 'mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500': ''"
                   type="text"
                   v-model="searchText[index]"
                   placeholder="ara"
                   @input="handleSearch(header.value, $event.target.value)">

          </th>
          <th v-if="action">Actions</th>
        </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="paginatedRows.length === 0">
          <td :colspan="headers.length + (action ? 1 : 0)">
            <slot name="undefined-result"></slot>
          </td>
        </tr>
        <tr class="hover:bg-gray-100 transition duration-150 ease-in-out" v-for="(row, rowIndex) in paginatedRows" :key="rowIndex" :style="getRowStyle(row)">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-for="(header, colIndex) in headers" :key="colIndex">
            <slot :name="`column-${header.value}`" :row="row" :value="row[header.value]">
              {{ row[header.value] }}
            </slot>
          </td>
          <td v-if="action">
            <slot name="action" :row="row"></slot>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center">
      <div class="info mr-auto py-4 whitespace-nowrap text-sm text-gray-500">Showing {{ paginatedRows.length }} records out of a total of {{ filteredRows.length }} records.</div>
      <div class="flex items-center">
        <Pagination :currentPage="currentPage" :totalPages="totalPages" :onPageChange="changePage" />
        <select v-model="perPage" @change="changePerPage" class="mt-4 ml-4 p-2 border rounded">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Pagination from './Pagination.vue';

const props = defineProps({
  tableTitle: {
    type: String,
    required: false
  },
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  coloredRows: {
    type: Array,
    required: false
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
  defaultCss: {
    type: Boolean,
    default: true,
    required: false,
  },
  perPage: {
    required: true,
    default: 5,
    type: Number
  }
});

const currentPage = ref(1);
const sortKey = ref('');
const sortOrder = ref(1);
const searchText = ref(Array(props.headers.length).fill(''));
const perPage = ref(props.perPage);

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
      const searchValue = searchText.value[index].toLowerCase(); // Tolocalelowercase
      return String(row[header.value]).toLowerCase().includes(searchValue);
    });
  });
});

// Sayfalama işlemi
const paginatedRows = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = startIndex + perPage.value;
  return filteredRows.value.slice(startIndex, endIndex);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(filteredRows.value.length / perPage.value);
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
const sortTable = (key: string) => {
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

// Satır rengi
const getRowStyle = (row) => {
  if (!props.coloredRows) return '';

  const matchedColorRule = props.coloredRows.find(colorRule => row[colorRule.key] == colorRule.value);
  return matchedColorRule ? { backgroundColor: matchedColorRule.color } : '';
};

// Sayfa numarası değiştikçe, filtrelenmiş ve sıralanmış veriler tekrar hesaplanır
watch([sortedRows, filteredRows, perPage], () => {
  currentPage.value = 1;
});

// Sayfa başına gösterilecek öğe sayısını değiştirme
const changePerPage = () => {
  currentPage.value = 1;
};
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
  font-size: 0.4em;
}

.sort-asc::after {
  content: '▲';
  font-size: 0.4em;
}

.sort-desc::after {
  content: '▼';
  font-size: 0.4em;
}
.sort-default::after {
  content: '⇅';
  font-size: 0.4em;
}
.icon::after {
  content: '⇅';
  font-size: 0.2em;
}

.table-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
