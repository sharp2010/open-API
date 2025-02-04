
// api key from the cat api
const apiKey = 'live_GOHQq1ThqJOgEMotKUIE78KMv5yI2VmGgNzeY4IsyLwsLpoudVDx4X7dlcaZxqhg';

// function to get a cat image
const getCatImage = async () => {
    const url = 'https://api.thecatapi.com/v1/images/search';
    try {
        //send GET request to cat api
        const response = await axios.get(url, {
            // header is need to authenticate the request
            headers: {'x-api-key': apiKey},
        });

        //get the image url from the response
        const catImageUrl = response.data[0].url;

        // update src attribute  of img element to show cat image
        const catImageElement = document.getElementById('catImage');

        // setting the image source to the fetched url
        catImageElement.src = catImageUrl;

        // log the image url to console
        console.log('Cat Image URL:', catImageUrl);
    } catch (error) {
        console.error('Error retrieving cat image:', error);
    }
};

// api url for getting cat breeds
const catBreedsApiUrl = 'https://api.thecatapi.com/v1/breeds';

//function to get and display cat breeds
const getCatBreeds = async () => {
    try {
        //send GET request to get cat breeds
        const response = await axios.get(catBreedsApiUrl, {
            // header is need to authenticate the request
            headers: {'x-api-key': apiKey},
        });

        const breeds = response.data;
        const breedslist = document.getElementById('breedsList');
        // clears any previous results
        breedslist.innerHTML = '';

// display the list of breeds
breeds.forEach(breed => {
    const breedElement = document.createElement('div');
    breedElement.classList.add('breed');
    breedElement.innerHTML =    `
    <h3>${breed.name}</h3>
    <p>${breed.description}</p>
    <img src="${breed.image?.url}" alt="${breed.name}" style="max-width: 200px; height: auto;" />
`;
breedslist.appendChild(breedElement);  
});

console.log('Breeds:', breeds);
    } catch (error) {
        console.error('Error retrieving cat breeds:', error);
    }
};

// function to search for user input for breeds
const searchBreed = async () => {
    const searchName = document.getElementById('breedSearch').value.toLowerCase();
    try {
        // GET request to retrieve all breeds
        const response = await axios.get(catGreedsApiUrl, {
            headers: {'x-api-key': apiKey}
        });
        const breeds = response.data;
        const filteredBreeds = breeds.filter(breed => breed.name.toLowerCase().includes(searchName));
        const breedsList = document.getElementById('breedsList');
        //clears previous results
        breedsList.innerHTML = '';

        if (filteredBreeds.length === 0) {
            breedsList.innerHTML = '<p>No breeds found.</p>';
        }  else {
            // makes a list of filtered breeds to show
            filteredBreeds.forEach(breed => {
                const breedElement = document.createElement('div');
                breedElement.classList.add('breed');
                breedElement.innerHTML =
                breedElement.innerHTML =    `
                <h3>${breed.name}</h3>
                <p>${breed.description}</p>
                <img src="${breed.image?.url}" alt="${breed.name}" style="max-width: 200px; height: auto;" />
            `;
            breedsList.appendChild(breedElement);
            });
        }
        console.log('Filtered Breeds:', filteredBreeds);
    } catch (error) {
        console.error('Error searching cat breeds:', error);
    }
};

// Event listeners for navigation links
document.getElementById('catLink').addEventListener('click', () => {
    document.getElementById('cat').style.display = 'block';
    document.getElementById('breeds').style.display = 'none';
    getCatImage(); // Fetch and display a random cat image
});

document.getElementById('breedsLink').addEventListener('click', () => {
    document.getElementById('cat').style.display = 'none';
    document.getElementById('breeds').style.display = 'block';
    getCatBreeds(); // Fetch and display all cat breeds
});

// Event listener for the breed search button
document.getElementById('searchBreedButton').addEventListener('click', searchBreed);

// Event listener to fetch another cat image when the button is clicked
document.getElementById('getCatImage').addEventListener('click', getCatImage);


// calling the function to get a cat image
getCatImage();

// event listener to button
const getCatButton = document.getElementById('getCatImage');
getCatButton.addEventListener('click', getCatImage);