// api.js
const API_KEY = 'live_kBH2gxfvfLNN7Q1I3ZhWtKvh5MnM4LgoJFgES871kQxk1oIN68CwyRYr6r6cNJNL'; // Replace with your actual API key

// Fetch cat breeds
export const fetchCatBreeds = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch cat breeds');
    return await response.json();
};

// Fetch dog breeds
export const fetchDogBreeds = async () => {
    const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
    if (!response.ok) throw new Error('Failed to fetch dog breeds');
    return await response.json();
};

// Fetch a random cat image
export const fetchRandomCat = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch random cat');
    return await response.json();
};

// Fetch a random dog image
export const fetchRandomDog = async () => {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
    if (!response.ok) throw new Error('Failed to fetch random dog');
    return await response.json();
};

// Search cats by breed
export const searchCats = async (breed) => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&api_key=${API_KEY}`);
    if

    (!response.ok) throw new Error('Failed to search cats');
    return await response.json();
}
// api.js

// Search dogs by breed
export const searchDogs = async (breed) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    if (!response.ok) throw new Error('Failed to search dogs');
    return await response.json();
};

// Fetch pet images with pagination and type
export const fetchPetImages = async (petType, pageSize = 10, page = 1) => {
    const baseUrl = petType === 'cat' 
        ? `https://api.thecatapi.com/v1/images/search` 
        : `https://dog.ceo/api/breeds/image/random`;

    const url = petType === 'cat' 
        ? `${baseUrl}?limit=${pageSize}&page=${page}&api_key=${API_KEY}`
        : `${baseUrl}?limit=${pageSize}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${petType} images`);
    return await response.json();
};

// Export other functions as needed
