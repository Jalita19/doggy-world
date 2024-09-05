import { 
    fetchCatBreeds, 
    fetchDogBreeds, 
    fetchRandomCat, 
    fetchRandomDog, 
    searchCats, 
    searchDogs,
    fetchPetImages 
} from './api.js';

// Assuming these functions are defined in ui.js
import { populateSelectElement, addEventListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Select DOM elements
    const catSelectElement = document.getElementById('breed-select-gallery');
    const dogSelectElement = document.getElementById('breed-select-dog');
    const catContainer = document.getElementById('cat-container-gallery');
    const dogContainer = document.getElementById('dog-container-gallery');
    const favoritesContainer = document.getElementById('favorites-container-gallery');
    const searchBtn = document.getElementById('search-btn');
    const searchBar = document.getElementById('search-bar');
    const catContainerSearch = document.getElementById('cat-container-search');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const loadMoreButton = document.getElementById('load-more');
    const contentContainer = document.getElementById('content-container');
    
    // Fetch and populate breed options
    const catBreeds = await fetchCatBreeds();
    const dogBreeds = await fetchDogBreeds();
    populateSelectElement(catSelectElement, catBreeds);
    populateSelectElement(dogSelectElement, dogBreeds);

    // Add event listeners
    addEventListeners({
        randomCatBtn: document.getElementById('random-cat-btn'),
        breedSelectCat: catSelectElement,
        catContainer: catContainer,
        randomDogBtn: document.getElementById('random-dog-btn'),
        breedSelectDog: dogSelectElement,
        dogContainer: dogContainer,
        favoritesContainer: favoritesContainer,
        searchBtn: searchBtn,
        searchBar: searchBar,
        catContainerSearch: catContainerSearch,
        prevPageBtn: prevPageBtn,
        nextPageBtn: nextPageBtn,
        pageInfo: pageInfo
    });

    // Handle load more button click
    let page = 1;
    loadMoreButton.addEventListener('click', async () => {
        page++;
        try {
            const data = await fetchPetImages(); // Fetch images
            if (!data.pets || data.pets.length === 0) {
                alert('No more pets to load.');
                return;
            }
            data.pets.forEach(pet => {
                const petElement = document.createElement('div');
                petElement.className = 'pet-card';
                petElement.innerHTML = `
                    <img src="${pet.imageUrl}" alt="${pet.name}">
                    <h3>${pet.name}</h3>
                    <p>${pet.description}</p>
                `;
                contentContainer.appendChild(petElement);
            });
        } catch (error) {
            console.error('Error loading more pets:', error);
            alert('Failed to load more pets. Please try again.');
        }
    });
});

