<script setup>
import { ref, onMounted } from 'vue';
import { useCharacters } from './router/useCharacters'; // Импортируем composable
import SearchBar from './components/SearchBar.vue';
import CharacterList from './components/CharacterList.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

// Используем composable для работы с персонажами и прокруткой
const { displayedCharacters, handleSearch, isLoading, errorMessage } = useCharacters();

onMounted(() => {
  // Начальный вызов фильтрации происходит в useCharacters, нет необходимости делать это снова
});
</script>

<template>
  <div class="main">
    <div class="container">
      <SearchBar @search="handleSearch" />

      <p class="main__error" v-if="errorMessage && !isLoading">{{ errorMessage }}</p>

      <LoadingSpinner v-if="isLoading" />

      <CharacterList v-else :characters="displayedCharacters" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding-top: 100px;
  position: relative;
  min-height: 100vh;
  background: #97ce4c;
  padding-bottom: 200px;

  &__error {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
    color: red;
  }
}
</style>
