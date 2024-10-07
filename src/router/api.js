import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Загрузка персонажей по страницам (с учетом лимита)
export const fetchAllCharacters = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/character?page=${page}`);
    return response.data.results.slice(0, limit); // Возвращаем только заданное количество элементов
  } catch (error) {
    console.error('Ошибка при загрузке всех персонажей:', error);
    throw error;
  }
};

// Загрузка всех страниц локаций
export const fetchAllLocations = async () => {
  try {
    let locations = [];
    let nextPage = `${BASE_URL}/location`;

    // Цикл для загрузки всех страниц
    while (nextPage) {
      const response = await axios.get(nextPage);
      locations = locations.concat(response.data.results);
      nextPage = response.data.info.next; // Получаем ссылку на следующую страницу, если она есть
    }

    return locations;
  } catch (error) {
    console.error('Ошибка при загрузке всех локаций:', error);
    throw error;
  }
};

// Загрузка персонажей по списку резидентов (URL)
export const fetchResidents = async (residentUrls) => {
  try {
    const requests = residentUrls.map((url) => axios.get(url));
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error('Ошибка при загрузке резидентов:', error);
    throw error;
  }
};
