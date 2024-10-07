<script setup>
import { defineProps } from 'vue';

// Получаем данные персонажа через пропсы
const props = defineProps({
  character: Object
});
</script>

<template>
  <div class="card ">
    <img :src="props.character.image" :alt="props.character.name" />
    <h3>{{ props.character.name }}</h3>
    <p>{{ props.character.location.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;
  background: #3C3E44;
  border-radius: 0.5rem;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  h3 {
    color: white;
    font-size: 24px;
  }
  p {
    color: white;
    font-size: 18px;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    transform: translateY(-5px);
    transition: all 0.3s ease-in-out;
  }
}

</style>
