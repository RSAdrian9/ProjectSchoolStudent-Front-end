<script setup lang="ts">
import type { Student } from '../../types/indexType';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  students: Student[];
  selectedStudent: Student | null;
}>();

const emit = defineEmits<{
  (e: 'select-student', student: Student | null): void;
}>();

// Comprobar si un estudiante está seleccionado
const isSelected = (student: Student) => props.selectedStudent?.id === student.id;

// Emitir el estudiante seleccionado o deseleccionar si es el mismo
const selectStudent = (student: Student) => {
  emit('select-student', isSelected(student) ? null : student);
};
</script>

<template>
  <div>
    <h3>Lista de Estudiantes</h3>

    <table class="student-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Instituto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" @click="selectStudent(student)"
          :class="{ selected: isSelected(student) }">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.school?.name || 'Sin Instituto' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.student-table {
  width: 100%;
  border-collapse: collapse;
}

.student-table th,
.student-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.student-table tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.selected {
  background-color: #d4edda;
  /* Verde suave */
}
</style>