<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

// Деструктурируем emit из setup
const emit = defineEmits(['loadMore']);

// Обработчик прокрутки
const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    emit('loadMore'); // Эмитим событие 'loadMore'
  }
};

// Добавляем обработчик прокрутки при монтировании компонента
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Удаляем обработчик прокрутки при размонтировании компонента
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div></div>
</template>

<style scoped>
/* Стили для компонента */
</style>
