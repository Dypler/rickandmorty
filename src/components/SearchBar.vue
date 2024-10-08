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
      <select v-model="searchType" class="styled-select">
        <option value="name">Поиск по имени</option>
        <option value="location">Поиск по локации</option>
      </select>

      <!-- Поле для поиска по имени -->
      <input 
        v-if="searchType === 'name'"
        v-model="name" 
        placeholder="Введите имя персонажа"  
        class="styled-input"
      />

      <!-- Поле для поиска по локации -->
      <input 
        v-if="searchType === 'location'"
        v-model="location" 
        placeholder="Введите локацию персонажа" 
        class="styled-input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Переменные для цвета в стиле Рика и Морти */

/* Стили select */
.styled-select {
  background-color: #97ce4c;
  color: #fff;
  border: 2px solid #3C3E44;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffcc00;
    box-shadow: 0 0 10px #ffcc00;
  }
}

/* Стили input */
.styled-input {
  background-color: #00B5CC;
  color: #fff;
  border: 2px solid #3C3E44;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffcc00;
    box-shadow: 0 0 10px #ffcc00;
  }

  /* Изменение цвета текста placeholder */
  &::placeholder {
    color: lighten(#3C3E44, 30%);

  }
}

@media (max-width: 768px) {
  .styled-input, .styled-select {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
