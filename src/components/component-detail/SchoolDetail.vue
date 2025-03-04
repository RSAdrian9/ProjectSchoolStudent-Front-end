<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { School } from '../../types/indexType';

// Props: Receives the selected school
const props = defineProps<{
  school: School | null;
}>();

// Emit events to the parent component
const emit = defineEmits<{
  (e: 'create-school', school: Partial<School>): void;
  (e: 'update-school', school: Partial<School>): void;
  (e: 'delete-school', id: number): void;
}>();

// Form state
const form = ref<Partial<School>>({
  name: '',
  city: '',
});

// Fill the form when a school is selected
watch(() => props.school, (newSchool) => {
  if (newSchool) {
    form.value = { ...newSchool };
  } else {
    form.value = { name: '', city: '' };
  }
});

// Handle creation or update
// Send creation or update
const submitForm = () => {
  console.log('🔄 Emitting update with:', form.value);
  if (props.school) {
    emit('update-school', form.value);
  } else {
    emit('create-school', form.value);
  }
};

// Clear form fields
const clearForm = () => {
  form.value = { name: '', city: '' };
};

// Delete school
const handleDelete = () => {
  if (!props.school?.id) {
    console.error('❌ Invalid ID in SchoolDetail.vue:', props.school?.id);
    return;
  }

  if (confirm('Are you sure you want to delete this school?')) {
    console.log('🗑️ Emitting deletion with ID:', props.school.id);
    emit('delete-school', props.school.id);
  }
};
</script>

<template>
  <div>
    <h3>{{ school ? 'Edit School' : 'Create School' }}</h3>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="form.name" type="text" required placeholder="School name" />
      </div>

      <div class="form-group">
        <label>City:</label>
        <input v-model="form.city" type="text" required placeholder="City" />
      </div>

      <!-- Create or Update Button -->
      <button type="submit" class="btn btn-primary">
        {{ school ? 'Update' : 'Create' }}
      </button>

      <!-- Delete Button (only if a school is selected) -->
      <button v-if="school" type="button" @click="handleDelete" class="btn btn-danger ml-2">
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
