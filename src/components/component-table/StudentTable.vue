<script setup lang="ts">
import type { Student } from '../../types/indexType';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  students: Student[];
  selectedStudent: Student | null;
  //school: School | null;
}>();

const emit = defineEmits<{
  (e: 'select-student', student: Student | null): void;
}>();

// Check if a student is selected
const isSelected = (student: Student) => props.selectedStudent?.id === student.id;

// Emit the selected student or deselect if it is the same
const selectStudent = (student: Student) => {
  emit('select-student', isSelected(student) ? null : student);
};
</script>

<template>
  <div>
    <h3>Student List</h3>

    <table class="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>School</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" @click="selectStudent(student)"
          :class="{ selected: isSelected(student) }">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.school || 'No School' }}</td>
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
  /* Soft green */
}
</style>