/* Updated App.vue */
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash';
import { fetchAllCharacters, fetchAllLocations } from './router/api';
import SearchBar from './components/SearchBar.vue';
import CharacterList from './components/CharacterList.vue';

const allCharacters = ref([]); // All characters
const allLocations = ref([]); // All locations
const filteredCharacters = ref([]); // Filtered characters based on search query
const displayedCharacters = ref([]); // Displayed characters
const searchQuery = ref({ name: '', location: '' }); // Search query for name and location
const errorMessage = ref(''); // Error message
const isLoading = ref(false); // Loading indicator
const page = ref(1); // Current page
const limit = 20; // Limit for characters per load

// Load initial data when component mounts
onMounted(async () => {
  await loadInitialData();
  applySearch(); // Apply initial search to load first set of characters
});

async function loadInitialData() {
  try {
    isLoading.value = true;

    // Load all characters and locations
    const [charactersData, locationsData] = await Promise.all([
      fetchAllCharacters(),
      fetchAllLocations(),
    ]);

    allCharacters.value = charactersData; // Save all characters
    allLocations.value = locationsData; // Save all locations

    isLoading.value = false;
  } catch (error) {
    errorMessage.value = 'Error loading initial data';
    isLoading.value = false;
  }
}

// Handle search with debounce
const handleSearch = debounce((query) => {
  // Clear previous errors
  errorMessage.value = '';

  // Update search query
  searchQuery.value = query;

  // Reset page and displayed characters
  page.value = 1;
  applySearch(); // Apply search to loaded data
}, 300);

// Apply search filters
function applySearch() {
  let tempCharacters = allCharacters.value;

  // Filter by name
  if (searchQuery.value.name) {
    tempCharacters = tempCharacters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.value.name.toLowerCase())
    );
  }

  // Filter by location
  if (searchQuery.value.location) {
    const location = allLocations.value.find(loc =>
      loc.name.toLowerCase().includes(searchQuery.value.location.toLowerCase())
    );

    if (location) {
      tempCharacters = tempCharacters.filter(character =>
        location.residents.includes(character.url)
      );
    } else {
      errorMessage.value = 'Location not found';
    }
  }

  // Update filtered characters
  filteredCharacters.value = tempCharacters;

  // Update displayed characters
  displayedCharacters.value = filteredCharacters.value.slice(0, limit); // Display only the first 20 results

  if (displayedCharacters.value.length === 0) {
    errorMessage.value = 'No characters found for the given criteria';
  }
}

// Handle scroll event
function handleScroll() {
  const bottomOffset = 100; // Distance from bottom to trigger loading
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - bottomOffset && !isLoading.value) {
    loadMoreCharacters(); // Load more characters
  }
}

// Load more characters
function loadMoreCharacters() {
  const startIndex = page.value * limit;
  const endIndex = startIndex + limit;

  if (startIndex < filteredCharacters.value.length) {
    displayedCharacters.value = displayedCharacters.value.concat(
      filteredCharacters.value.slice(startIndex, endIndex)
    );
    page.value++;
  }
}

// Add and remove scroll event listener
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