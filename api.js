// api.js

const catApiKey = 'live_kBH2gxfvfLNN7Q1I3ZhWtKvh5MnM4LgoJFgES871kQxk1oIN68CwyRYr6r6cNJNL'; // Replace with your actual API key
const dogApiKey = 'live_NvKMkUFyFkfA2zmeSglz5LemZ8dc57GuWUA3cgCC786vWReJ0nAVpA6F9t3n2oYi'; // Replace with your actual API key
const catBaseUrl = 'https://api.thecatapi.com/v1/';
const dogBaseUrl = 'https://api.thedogapi.com/v1/';

export async function fetchCatBreeds() {
    const response = await fetch(`${catBaseUrl}breeds?api_key=${catApiKey}`);
    return response.json();
}

export async function fetchDogBreeds() {
    const response = await fetch(`${dogBaseUrl}breeds?api_key=${dogApiKey}`);
    return response.json();
}

export async function fetchRandomCat() {
    const response = await fetch(`${catBaseUrl}images/search?api_key=${catApiKey}`);
    return response.json();
}

export async function fetchRandomDog() {
    const response = await fetch(`${dogBaseUrl}images/search?api_key=${dogApiKey}`);
    return response.json();
}

export async function searchCats(query) {
    const response = await fetch(`${catBaseUrl}images/search?api_key=${catApiKey}&q=${query}`);
    return response.json();
}

export async function searchDogs(query) {
    const response = await fetch(`${dogBaseUrl}images/search?api_key=${dogApiKey}&q=${query}`);
    return response.json();
}
