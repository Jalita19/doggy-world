document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.querySelector('#createPostForm');
    const updatePostForm = document.querySelector('#updatePostForm');
    const loadMoreButton = document.getElementById('load-more');
    const contentContainer = document.getElementById('content-container');
    let page = 1; // Assuming you want to load data in pages

    // Function to create a new post using async/await
    async function createPost(title, body) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Post created:', data);
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    }

    // Function to update an existing post using async/await
    async function updatePost(id, title, body) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Post updated:', data);
            alert('Post updated successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post. Please try again.');
        }
    }

    // Handle create post form submission
    createPostForm.addEventListener('submit', async event => {
        event.preventDefault();
        const title = document.querySelector('#postTitle').value.trim();
        const body = document.querySelector('#postBody').value.trim();
        if (title && body) {
            await createPost(title, body); // Await the result of createPost
        } else {
            alert('Title and Body are required.');
        }
    });

    // Handle update post form submission
    updatePostForm.addEventListener('submit', async event => {
        event.preventDefault();
        const id = document.querySelector('#postId').value.trim();
        const title = document.querySelector('#updateTitle').value.trim();
        const body = document.querySelector('#updateBody').value.trim();
        if (id && title && body) {
            await updatePost(id, title, body); // Await the result of updatePost
        } else {
            alert('Post ID, Title, and Body are required.');
        }
    });

    // Handle load more button click
    loadMoreButton.addEventListener('click', async () => {
        page++;

        // Fetch new data
        try {
            const response = await fetch(`"https://thecatapi.com/api/images/get?format=src&type=gif/300/200"`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.pets.length === 0) {
                alert('No more pets to load.');
                return;
            }

            // Process and display the new data
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