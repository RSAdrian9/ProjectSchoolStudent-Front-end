<script setup lang="ts">
import type { School } from '../../types/indexType';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  schools: School[];
  selectedSchool: School | null;
}>();

const emit = defineEmits<{
  (e: 'select-school', school: School | null): void;
}>();

// Comprobar si un instituto está seleccionado
const isSelected = (school: School) => props.selectedSchool?.id === school.id;

// Emitir el instituto seleccionado o deseleccionar si es el mismo
const selectedSchool = (school: School) => {
  emit('select-school', isSelected(school) ? null : school);
};
</script>

<template>
  <div>
    <h3>Lista de Institutos</h3>

    <table class="school-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Ciudad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school in schools" :key="school.id" @click="selectedSchool(school)"
          :class="{ selected: isSelected(school) }">
          <td>{{ school.name }}</td>
          <td>{{ school.city }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.school-table {
  width: 100%;
  border-collapse: collapse;
}

.school-table th,
.school-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.school-table tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.selected {
  background-color: #d4edda;
  /* Verde suave */
}
</style>