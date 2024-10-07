<script setup>
import { ref, onMounted, onUnmounted } from 'vue'; 
import { fetchAllCharacters, fetchAllLocations } from './router/api'; 
import SearchBar from './components/SearchBar.vue';  
import CharacterList from './components/CharacterList.vue';

const allCharacters = ref([]);  // Все персонажи
const allLocations = ref([]);    // Все локации
const displayedCharacters = ref([]);  // Отображаемые персонажи
const searchQuery = ref({ name: '', location: '' }); // Строка поиска для имени и локации
const errorMessage = ref('');   // Сообщение об ошибках
const isLoading = ref(false);   // Индикатор загрузки
const page = ref(1);            // Текущая страница
const limit = 20;               // Лимит на количество элементов на странице

// Загрузка всех данных при монтировании компонента
onMounted(async () => {
  await loadInitialData();
  displayedCharacters.value = allCharacters.value.slice(0, limit); // Загружаем первые 20 персонажей
});

async function loadInitialData() {
  try {
    isLoading.value = true;

    // Загрузка всех персонажей и локаций
    const [charactersData, locationsData] = await Promise.all([
      fetchAllCharacters(),
      fetchAllLocations(),
    ]);

    allCharacters.value = charactersData; // Сохраняем всех персонажей
    allLocations.value = locationsData;   // Сохраняем все локации

    isLoading.value = false;
  } catch (error) {
    errorMessage.value = 'Error loading initial data';
    isLoading.value = false;
  }
}

// Обработка поиска
function handleSearch(query) {
  // Очищаем ошибки перед новым поиском
  errorMessage.value = '';
  
  // Обновляем searchQuery
  searchQuery.value = query;

  // Сбрасываем страницу и отображаемые персонажи
  page.value = 1;
  applySearch(); // Применяем поиск к загруженным данным
}

// Применение поиска
function applySearch() {
  // Фильтрация по имени
  let filteredCharacters = allCharacters.value;

  if (searchQuery.value.name) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.value.name.toLowerCase())
    );
  }

  // Фильтрация по локации
  if (searchQuery.value.location) {
    const location = allLocations.value.find(loc =>
      loc.name.toLowerCase().includes(searchQuery.value.location.toLowerCase())
    );

    if (location) {
      filteredCharacters = filteredCharacters.filter(character =>
        location.residents.includes(character.url)
      );
    } else {
      errorMessage.value = 'Location not found';
    }
  }

  // Обновляем отображаемых персонажей
  displayedCharacters.value = filteredCharacters.slice(0, limit); // Отображаем только первые 20 результатов

  if (displayedCharacters.value.length === 0) {
    errorMessage.value = 'No characters found for the given criteria';
  }
}

// Обработчик скролла
function handleScroll() {
  const bottomOffset = 100; // Расстояние до конца страницы, при котором начинаем загрузку
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - bottomOffset && !isLoading.value) {
    loadMoreCharacters(); // Загружаем дополнительные персонажи
  }
}

// Загрузка дополнительных персонажей
function loadMoreCharacters() {
  const startIndex = page.value * limit; // Начальный индекс для загрузки
  const endIndex = startIndex + limit; // Конечный индекс для загрузки

  // Добавляем новые карточки к отображаемым
  displayedCharacters.value = displayedCharacters.value.concat(allCharacters.value.slice(startIndex, endIndex));

  // Увеличиваем страницу
  page.value++;
}

// Вешаем и убираем обработчик событий при монтировании и размонтировании
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="main">
    <div class="container">
      <SearchBar @search="handleSearch" />
      
      <p class="main__error" v-if="errorMessage">{{ errorMessage }}</p>

      <div v-if="isLoading" class="loading-spinner">Loading...</div>

      <CharacterList :characters="displayedCharacters" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  background: url('/public/bg.jpg') center center / cover no-repeat;
  background-attachment: fixed; 
  min-height: 100vh;
  height: auto;
  display: flex; 
  justify-content: center;
  align-items: center;
  padding-bottom: 200px;
  &__error {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
    color: red;
  }
}

.loading-spinner {
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
}
</style>
