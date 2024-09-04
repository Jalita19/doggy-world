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