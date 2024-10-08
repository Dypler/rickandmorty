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
      <select v-model="searchType" >
        <option value="name">Поиск по имени</option>
        <option value="location">Поиск по локации</option>
      </select>
      <input 
        v-if="searchType === 'name'"
        v-model="name" 
        placeholder="Введите имя персонажа"  
      />
      <input 
        v-if="searchType === 'location'"
        v-model="location" 
        placeholder="Введите локацию персонажа" 
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
select {
  background-color: #97ce4c;
  color: #fff;
  border: 2px solid #3C3E44;
  border-radius: 10px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  height: 44px; 

  &:focus {
    outline: none;
    border-color: #ffcc00;
    box-shadow: 0 0 10px #ffcc00;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
}
input {
  height: 44px; 
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
  &::placeholder {
    color:#3C3E44;

  }
}
@media (max-width: 768px) {
  input, select {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
