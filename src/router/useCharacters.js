import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash';
import { fetchAllCharacters, fetchAllLocations } from './api';

export function useCharacters() {
  const allCharacters = ref([]);
  const allLocations = ref([]);
  const filteredCharacters = ref([]);
  const displayedCharacters = ref([]);
  const searchQuery = ref({ name: '', location: '' });
  const errorMessage = ref('');
  const isLoading = ref(false);
  const page = ref(1);
  const limit = 20;

  // Загружаем данные с API
  async function loadInitialData() {
    try {
      isLoading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Добавляем задержку

      const [charactersData, locationsData] = await Promise.all([fetchAllCharacters(), fetchAllLocations()]);
      allCharacters.value = charactersData;
      allLocations.value = locationsData;

      isLoading.value = false;

      // Выполняем поиск по умолчанию (без фильтров) после загрузки данных
      applySearch();
    } catch (error) {
      errorMessage.value = 'Error loading initial data';
      isLoading.value = false;
    }
  }

  // Обработчик поиска
  const handleSearch = debounce((query) => {
    searchQuery.value = query;
    page.value = 1;
    applySearch();
  }, 300);

  // Применение фильтрации по имени и локации
  function applySearch() {
    let tempCharacters = allCharacters.value;
  
    // Фильтрация по имени
    if (searchQuery.value.name) {
      tempCharacters = tempCharacters.filter(character =>
        character.name.toLowerCase().includes(searchQuery.value.name.toLowerCase())
      );
    }
  
    // Фильтрация по локации
    if (searchQuery.value.location) {
      const location = allLocations.value.find(loc =>
        loc.name.toLowerCase().includes(searchQuery.value.location.toLowerCase())
      );
  
      if (location) {
        tempCharacters = tempCharacters.filter(character =>
          location.residents.includes(character.url)
        );
      } else {
        // Если локация не найдена, выводим сообщение об ошибке и очищаем персонажей
        errorMessage.value = 'Таких локаций не существует';
        filteredCharacters.value = [];
        displayedCharacters.value = [];
        return; // Останавливаем дальнейшую фильтрацию, так как локация не найдена
      }
    }
  
    // Обновляем массив фильтрованных персонажей
    filteredCharacters.value = tempCharacters;
    displayedCharacters.value = filteredCharacters.value.slice(0, limit);
  
    // Если после фильтрации персонажей нет, выводим ошибку
    if (displayedCharacters.value.length === 0 && !isLoading.value) {
      errorMessage.value = 'Не найдены персонажи с такими данными';
    } else {
      errorMessage.value = ''; // Очищаем сообщение об ошибке, если данные есть
    }
  }
  

  // Обработка прокрутки для подгрузки персонажей
  function handleScroll() {
    const bottomOffset = 100;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - bottomOffset && !isLoading.value) {
      loadMoreCharacters();
    }
  }

  // Загрузка дополнительных персонажей при прокрутке
  function loadMoreCharacters() {
    const startIndex = page.value * limit;
    const endIndex = startIndex + limit;

    if (startIndex < filteredCharacters.value.length) {
      displayedCharacters.value = displayedCharacters.value.concat(filteredCharacters.value.slice(startIndex, endIndex));
      page.value++;
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    loadInitialData(); // Загружаем данные при монтировании
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    allCharacters,
    displayedCharacters,
    handleSearch,
    isLoading,
    errorMessage,
  };
}
