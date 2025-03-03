<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { Student } from '../../types/indexType';

// Props: Recibe el estudiante seleccionado
const props = defineProps<{
  student: Student | null;
}>();

// Emitir eventos al componente padre
const emit = defineEmits<{
  (e: 'create-student', student: Partial<Student>): void;
  (e: 'update-student', student: Partial<Student>): void;
  (e: 'delete-student', id: number): void;
}>();

// Estado del formulario
const form = ref<Partial<Student>>({
  name: '',
  email: '',
  school_id: null,
});

// Rellenar el formulario al seleccionar un estudiante
watch(() => props.student, (newStudent) => {
  if (newStudent) {
    form.value = { ...newStudent };
  } else {
    form.value = { name: '', email: '', school_id: null };
  }
});

// Manejar creación o actualización
// Enviar creación o actualización
const submitForm = () => {
  console.log('🔄 Emitiendo actualización con:', form.value);
  if (props.student) {
    emit('update-student', form.value);
  } else {
    emit('create-student', form.value);
  }
};

// Limpiar los campos del formulario
const clearForm = () => {
  form.value = { name: '', email: '', school_id: null };
};


// Eliminar estudiante
const handleDelete = () => {
  if (!props.student?.id) {
    console.error('❌ ID inválido en StudentDetail.vue:', props.student?.id);
    return;
  }

  if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
    console.log('🗑️ Emitiendo eliminación con ID:', props.student.id);
    emit('delete-student', props.student.id);
  }
};


</script>

<template>
  <div>
    <h3>{{ student ? 'Editar Estudiante' : 'Crear Estudiante' }}</h3>

    <!-- Formulario -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="form.name" type="text" required placeholder="Nombre del estudiante" />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="form.email" type="email" required placeholder="Correo electrónico" />
      </div>

      <div class="form-group">
        <label>ID Instituto:</label>
        <input v-model="form.school_id" type="number" placeholder="ID del Instituto:" />
      </div>

      <!-- Botón de Crear o Actualizar -->
      <button type="submit" class="btn btn-primary">
        {{ student ? 'Actualizar' : 'Crear' }}
      </button>

      <!-- Botón de Eliminar (solo si hay estudiante seleccionado) -->
      <button v-if="student" type="button" @click="handleDelete" class="btn btn-danger ml-2">
        Eliminar
      </button>
      <!-- Botón de Limpiar Campos -->
      <button type="button" @click="clearForm" class="btn btn-secondary ml-2">
        Limpiar Campos
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
