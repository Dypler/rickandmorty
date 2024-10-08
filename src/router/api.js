import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Fetch all characters by loading all pages
export const fetchAllCharacters = async () => {
  try {
    let characters = [];
    let nextPage = `${BASE_URL}/character`;

    // Load all pages
    while (nextPage) {
      const response = await axios.get(nextPage);
      characters = characters.concat(response.data.results);
      nextPage = response.data.info.next; // Get link to next page, if available
    }

    return characters;
  } catch (error) {
    console.error('Error fetching all characters:', error);
    throw error;
  }
};

// Fetch all locations by loading all pages
export const fetchAllLocations = async () => {
  try {
    let locations = [];
    let nextPage = `${BASE_URL}/location`;

    // Load all pages
    while (nextPage) {
      const response = await axios.get(nextPage);
      locations = locations.concat(response.data.results);
      nextPage = response.data.info.next; // Get link to next page, if available
    }

    return locations;
  } catch (error) {
    console.error('Error fetching all locations:', error);
    throw error;
  }
};

// Fetch characters by list of resident URLs
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