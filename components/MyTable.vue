<template>
  <div>
    <table>
      <thead :class="headerClass" :style="headerStyle">
      <tr>
        <th v-for="header in headers" :key="header.value" @click="sortTable(header.value)">
          {{ header.text }}
          <span :class="getSortIcon(header.value)"></span>
        </th>
        <th v-if="action">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in sortedRows" :key="rowIndex">
        <td v-for="header in headers" :key="header.value">{{ row[header.value] }}</td>
        <td v-if="action">
          <slot name="action" :row="row"></slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

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
    default: false
  }
});

const sortKey = ref('');
const sortOrder = ref(1);

const sortedRows = computed(() => {
  if (!sortKey.value) {
    return props.rows;
  }
  return [...props.rows].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) {
      return -1 * sortOrder.value;
    } else if (a[sortKey.value] > b[sortKey.value]) {
      return 1 * sortOrder.value;
    }
    return 0;
  });
});

const sortTable = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

const getSortIcon = (key: string) => {
  if (sortKey.value === key) {
    return sortOrder.value === 1 ? props.sortAscIcon : props.sortDescIcon;
  }
  return props.sortDefaultIcon;
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
  //background-color: #ffffff;
  //color: #333;
  font-weight: 600;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
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


</style>
