<script setup>
import { ref, watch } from 'vue';

// Деструктурируем emit из setup
const emit = defineEmits(['search']);

const searchType = ref('name'); // Выбор типа поиска: name или location
const name = ref('');
const location = ref('');

// Следим за изменениями и передаем выбранные данные в родительский компонент
watch([name, location, searchType], () => {
  const query = searchType.value === 'name' ? { name: name.value, location: '' } : { name: '', location: location.value };
  emit('search', query);
});
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-20 py-2 bg-[#3C3E44]">
    <div class="flex  md:flex-row  flex-col-reverse gap-3 container">
      <!-- Select для выбора метода поиска -->
      <select v-model="searchType" class="p-2 border rounded">
        <option value="name">Search by Name</option>
        <option value="location">Search by Location</option>
      </select>

      <!-- Поле для поиска по имени -->
      <input 
        v-if="searchType === 'name'"
        v-model="name" 
        placeholder="Search by name" 
        class="p-2 border rounded"
      />

      <!-- Поле для поиска по локации -->
      <input 
        v-if="searchType === 'location'"
        v-model="location" 
        placeholder="Search by location" 
        class="p-2 border rounded"
      />
    </div>
  </div>
</template>

<style scoped>
/* Адаптивные стили для поисковых полей и select */


select, input {
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
input {
  width: 100%;
}
</style>
