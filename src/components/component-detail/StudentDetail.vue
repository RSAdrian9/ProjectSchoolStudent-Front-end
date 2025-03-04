<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { Student } from '../../types/indexType';

// Props: Receives the selected student
const props = defineProps<{
  student: Student | null;
}>();

// Emit events to the parent component
const emit = defineEmits<{
  (e: 'create-student', student: Partial<Student>): void;
  (e: 'update-student', student: Partial<Student>): void;
  (e: 'delete-student', id: number): void;
}>();

// Form state
const form = ref<Partial<Student>>({
  name: '',
  email: '',
  school_id: null,
});

// Fill the form when a student is selected
watch(() => props.student, (newStudent) => {
  if (newStudent) {
    form.value = { ...newStudent };
  } else {
    form.value = { name: '', email: '', school_id: null };
  }
});

// Handle creation or update
// Send creation or update
const submitForm = () => {
  console.log('🔄 Emitting update with:', form.value);
  if (props.student) {
    emit('update-student', form.value);
  } else {
    emit('create-student', form.value);
  }
};

// Clear form fields
const clearForm = () => {
  form.value = { name: '', email: '', school_id: null };
};

// Delete student
const handleDelete = () => {
  if (!props.student?.id) {
    console.error('❌ Invalid ID in StudentDetail.vue:', props.student?.id);
    return;
  }

  if (confirm('Are you sure you want to delete this student?')) {
    console.log('🗑️ Emitting deletion with ID:', props.student.id);
    emit('delete-student', props.student.id);
  }
};

</script>

<template>
  <div>
    <h3>{{ student ? 'Edit Student' : 'Create Student' }}</h3>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="form.name" type="text" required placeholder="Student's name" />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="form.email" type="email" required placeholder="Email" />
      </div>

      <div class="form-group">
        <label>School ID:</label>
        <input v-model="form.school_id" type="number" placeholder="School ID" />
      </div>

      <!-- Create or Update Button -->
      <button type="submit" class="btn btn-primary">
        {{ student ? 'Update' : 'Create' }}
      </button>

      <!-- Delete Button (only if a student is selected) -->
      <button v-if="student" type="button" @click="handleDelete" class="btn btn-danger ml-2">
        Delete
      </button>
      <!-- Clear Fields Button -->
      <button type="button" @click="clearForm" class="btn btn-secondary ml-2">
        Clear Fields
      </button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  padding: 10px 15px;
  margin-top: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.ml-2 {
  margin-left: 1rem;
}
</style>
