// api.js
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';
const DOG_API_URL = 'https://api.thedogapi.com/v1/images/search';
const CAT_API_KEY = 'YOUR_CAT_API_KEY'; // Replace with your Cat API key
const DOG_API_KEY = 'YOUR_DOG_API_KEY'; // Replace with your Dog API key

export const fetchPetImages = async (petType, limit = 10, page = 0) => {
    const url = petType === 'cat' 
        ? `${CAT_API_URL}?limit=${limit}&page=${page}&api_key=${CAT_API_KEY}`
        : `${DOG_API_URL}?limit=${limit}&page=${page}&api_key=${DOG_API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch pet images:', error);
    }
};

