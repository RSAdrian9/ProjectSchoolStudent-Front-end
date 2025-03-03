<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { School } from '../../types/indexType';

// Props: Recibe el instituto seleccionado
const props = defineProps<{
  school: School | null;
}>();

// Emitir eventos al componente padre
const emit = defineEmits<{
  (e: 'create-school', school: Partial<School>): void;
  (e: 'update-school', school: Partial<School>): void;
  (e: 'delete-school', id: number): void;
}>();

// Estado del formulario
const form = ref<Partial<School>>({
  name: '',
  city: '',
});

// Rellenar el formulario al seleccionar un instituto
watch(() => props.school, (newSchool) => {
  if (newSchool) {
    form.value = { ...newSchool };
  } else {
    form.value = { name: '', city: '' };
  }
});

// Manejar creación o actualización
// Enviar creación o actualización
const submitForm = () => {
  console.log('🔄 Emitiendo actualización con:', form.value);
  if (props.school) {
    emit('update-school', form.value);
  } else {
    emit('create-school', form.value);
  }
};

// Limpiar los campos del formulario
const clearForm = () => {
  form.value = { name: '', city: '' };
};


// Eliminar instituto
const handleDelete = () => {
  if (!props.school?.id) {
    console.error('❌ ID inválido en SchoolDetail.vue:', props.school?.id);
    return;
  }

  if (confirm('¿Seguro que quieres eliminar este instituto?')) {
    console.log('🗑️ Emitiendo eliminación con ID:', props.school.id);
    emit('delete-school', props.school.id);
  }
};


</script>

<template>
  <div>
    <h3>{{ school ? 'Editar Instituto' : 'Crear Instituto' }}</h3>

    <!-- Formulario -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="form.name" type="text" required placeholder="Nombre del instituto" />
      </div>

      <div class="form-group">
        <label>City:</label>
        <input v-model="form.city" type="text" required placeholder="Ciudad" />
      </div>

      <!-- Botón de Crear o Actualizar -->
      <button type="submit" class="btn btn-primary">
        {{ school ? 'Actualizar' : 'Crear' }}
      </button>

      <!-- Botón de Eliminar (solo si hay instituto seleccionado) -->
      <button v-if="school" type="button" @click="handleDelete" class="btn btn-danger ml-2">
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
