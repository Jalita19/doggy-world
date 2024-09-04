export function populateSelectElement(selectElement, breeds) {
    selectElement.innerHTML = '<option value="">Select Breed</option>';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
    });
}

export function displayImage(container, imageUrl, addToFavorites) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Image';
    img.addEventListener('click', () => addToFavorites(imageUrl));
    container.innerHTML = ''; // Clear previous image
    container.appendChild(img);
}

export function addEventListeners({ 
    randomCatBtn, breedSelectCat, catContainer, 
    randomDogBtn, breedSelectDog, dogContainer, 
    favoritesContainer, searchBtn, searchBar, 
    prevPageBtn, nextPageBtn, pageInfo
}) {
    // Example implementation for event listeners
    randomCatBtn.addEventListener('click', async () => {
        const data = await fetchRandomCat();
        displayImage(catContainer, data[0].url, url => saveToFavorites(url, favoritesContainer));
    });

    breedSelectCat.addEventListener('change', async (event) => {
        const breedId = event.target.value;
        const url = breedId ? `${catBaseUrl}images/search?api_key=${catApiKey}&breed_ids=${breedId}` : `${catBaseUrl}images/search?api_key=${catApiKey}`;
        const data = await fetch(url);
        displayImage(catContainer, data[0].url, url => saveToFavorites(url, favoritesContainer));
    });

    randomDogBtn.addEventListener('click', async () => {
        const data = await fetchRandomDog();
        displayImage(dogContainer, data[0].url, url => saveToFavorites(url, favoritesContainer));
    });

    breedSelectDog.addEventListener('change', async (event) => {
        const breedId = event.target.value;
        const url = breedId ? `${dogBaseUrl}images/search?api_key=${dogApiKey}&breed_ids=${breedId}` : `${dogBaseUrl}images/search?api_key=${dogApiKey}`;
        const data = await fetch(url);
        displayImage(dogContainer, data[0].url, url => saveToFavorites(url, favoritesContainer));
    });

    searchBtn.addEventListener('click', async () => {
        const query = searchBar.value;
        const dataCats = await searchCats(query);
        const dataDogs = await searchDogs(query);
        displayImage(catContainerSearch, dataCats[0].url, url => saveToFavorites(url, favoritesContainer));
        displayImage(dogContainerSearch, dataDogs[0].url, url => saveToFavorites(url, favoritesContainer));
    });

    prevPageBtn.addEventListener('click', () => {
        // Implement pagination functionality
    });

    nextPageBtn.addEventListener('click', () => {
        // Implement pagination functionality
    });
}

function saveToFavorites(imageUrl, favoritesContainer) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Favorite Image';
    img.addEventListener('click', () => img.remove());
    favoritesContainer.appendChild(img);
}
