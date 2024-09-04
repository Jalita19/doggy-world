import { fetchCatBreeds, fetchDogBreeds, fetchRandomCat, fetchRandomDog, searchCats, searchDogs } from './api.js';
import { populateSelectElement, displayImage, addEventListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
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

    const catBreeds = await fetchCatBreeds();
    const dogBreeds = await fetchDogBreeds();

    populateSelectElement(catSelectElement, catBreeds);
    populateSelectElement(dogSelectElement, dogBreeds);

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
});
