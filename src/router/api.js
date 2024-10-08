import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Универсальная функция для получения всех данных с нескольких страниц
const fetchAllData = async (endpoint) => {
  try {
    let results = [];
    let nextPage = `${BASE_URL}/${endpoint}`;

    while (nextPage) {
      const response = await axios.get(nextPage);
      results = results.concat(response.data.results);
      nextPage = response.data.info.next; // Устанавливаем ссылку на следующую страницу
    }

    return results;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Функция для получения всех персонажей
export const fetchAllCharacters = async () => {
  return fetchAllData('character');
};

// Функция для получения всех локаций
export const fetchAllLocations = async () => {
  return fetchAllData('location');
};

// Функция для получения информации о жителях (резидентам)
export const fetchResidents = async (residentUrls) => {
  try {
    const requests = residentUrls.map((url) => axios.get(url));
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error('Error fetching residents:', error);
    throw error;
  }
};
