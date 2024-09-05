import { fetchPetImages } from './api.js';

const GALLERY_CONTAINER = document.getElementById('gallery');
const LOAD_MORE_BUTTON = document.getElementById('load-more');
const SEARCH_INPUT = document.getElementById('search');
const PET_TYPE_SELECT = document.getElementById('pet-type');

let currentPage = 0;
const PAGE_SIZE = 10;
let searchQuery = '';
let petType = 'cat';

const renderPhotos = (images) => {
    GALLERY_CONTAINER.innerHTML = ''; // Clear existing photos
    images.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.className = 'gallery-item';
        imageElement.innerHTML = `
            <img src="${image.url}" alt="${image.id}" style="width: 200px; height: auto;">
        `;
        GALLERY_CONTAINER.appendChild(imageElement);
    });
};

const loadPetImages = async () => {
    const images = await fetchPetImages(petType, PAGE_SIZE, currentPage);
    renderPhotos(images);
    currentPage++;
};

const handleSearch = async () => {
    searchQuery = SEARCH_INPUT.value;
    currentPage = 0; // Reset pagination
    await loadPetImages();
};

const handlePetTypeChange = () => {
    petType = PET_TYPE_SELECT.value;
    currentPage = 0; // Reset pagination
    loadPetImages();
};

SEARCH_INPUT.addEventListener('input', handleSearch);
LOAD_MORE_BUTTON.addEventListener('click', loadPetImages);
PET_TYPE_SELECT.addEventListener('change', handlePetTypeChange);

export { loadPetImages };
// gallery.js

/**
 * Populate a select element with options.
 * @param {HTMLElement} selectElement - The select element to populate.
 * @param {Array} options - The options to populate.
 */
export const populateSelectElement = (selectElement, options) => {
    selectElement.innerHTML = '<option value="">Select breed</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id; // Adjust according to API response
        optionElement.textContent = option.name; // Adjust according to API response
        selectElement.appendChild(optionElement);
    });
};

/**
 * Display an image in a container.
 * @param {HTMLElement} container - The container to display the image in.
 * @param {string} imageUrl - The URL of the image to display.
 */
export const displayImage = (container, imageUrl) => {
    container.innerHTML = `<img src="${imageUrl}" alt="Pet" style="width: 200px; height: auto;">`;
};

/**
 * Add event listeners to buttons and other elements.
 * @param {Object} elements - An object containing references to DOM elements and their event handlers.
 */
export const addEventListeners = (elements) => {
    const {
        randomCatBtn,
        breedSelectCat,
        catContainer,
        randomDogBtn,
        breedSelectDog,
        dogContainer,
        favoritesContainer,
        searchBtn,
        searchBar,
        catContainerSearch,
        prevPageBtn,
        nextPageBtn,
        pageInfo
    } = elements;

    randomCatBtn.addEventListener('click', async () => {
        const [cat] = await fetchRandomCat();
        displayImage(catContainer, cat.url);
    });

    breedSelectCat.addEventListener('change', async () => {
        const breedId = breedSelectCat.value;
        if (breedId) {
            const images = await searchCats(breedId);
            catContainer.innerHTML = ''; // Clear container
            images.forEach(img => displayImage(catContainer, img.url));
        }
    });

    randomDogBtn.addEventListener('click', async () => {
        const { message: dogImageUrl } = await fetchRandomDog();
        displayImage(dogContainer, dogImageUrl);
    });

    breedSelectDog.addEventListener('change', async () => {
        const breed = breedSelectDog.value;
        if (breed) {
            const { message: dogImages } = await searchDogs(breed);
            dogContainer.innerHTML = ''; // Clear container
            dogImages.forEach(imgUrl => displayImage(dogContainer, imgUrl));
        }
    });

    searchBtn.addEventListener('click', async () => {
        const query = searchBar.value;
        // Implement search functionality for cats and dogs if needed
    });

    prevPageBtn.addEventListener('click', () => {
        // Implement pagination logic for previous page
    });

    nextPageBtn.addEventListener('click', () => {
        // Implement pagination logic for next page
    });

    // Additional event listeners for favorites, etc., can be added here
};
