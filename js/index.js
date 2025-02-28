// api key from the cat api
const apiKey = 'live_GOHQq1ThqJOgEMotKUIE78KMv5yI2VmGgNzeY4IsyLwsLpoudVDx4X7dlcaZxqhg';

// function to make GET request with headers
const fetchData = async (url) => {
    try {
        const response = await axios.get(url, {
            // header is need to authenticate the request
            headers: { 'x-api-key': apiKey },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting data:', error);
    }
};

// function to get breed list
const displayBreeds = (breeds) => {
    const breedsList = document.getElementById('breedsList');

    // will clear previous results
    breedsList.innerHTML = '';


    breeds.forEach(breed => {
        const breedElement = document.createElement('div');
        breedElement.classList.add('breed');

        // this will populate breed image or default image
        const breedImageUrl = breed.image?.url || 'assets/defaultCat.png';

        breedElement.innerHTML = `
            <img src="${breedImageUrl}" alt="${breed.name}"/>
            <div class="breed-description">
            <h3>${breed.name}</h3>
            <p>${breed.description}</p>
            </div> 
        `;

        breedsList.appendChild(breedElement);
    });
};

// function to get cat image
const getCatImage = async () => {
    const url = 'https://api.thecatapi.com/v1/images/search';
    const data = await fetchData(url);

    //get the image url from the response
    const catImageUrl = data[0].url;

    // update src of image element
    document.getElementById('catImage').src = catImageUrl;
    console.log('Cat Image URL:', catImageUrl);
    catSection.style.display = 'block';
};

//function to get cat breeds
const getCatBreeds = async () => {
    const breeds = await fetchData('https://api.thecatapi.com/v1/breeds');
    console.log(breeds);
    displayBreeds(breeds);
    breedsSection.style.display = 'block';
};

// function to search breeds
const searchBreed = async () => {
    const searchName = document.getElementById('breedSearch').value.toLowerCase();
    const breeds = await fetchData('https://api.thecatapi.com/v1/breeds');
    const filteredBreeds = breeds.filter(breed => breed.name.toLowerCase().includes(searchName));
    displayBreeds(filteredBreeds);

    // will clear the breed search input
    document.getElementById('breedSearch').value = '';
};

// Event listeners for navigation links
const catLink = document.getElementById('catLink');
const breedsLink = document.getElementById('breedsLink');
const catSection = document.getElementById('cat');
const breedsSection = document.getElementById('breeds');

catSection.style.display = 'none';
breedsSection.style.display = 'none';

catLink.addEventListener('click', () => {
    getCatImage();
});

breedsLink.addEventListener('click', () => {

    getCatBreeds();
});

// event listener for "get another cat image"
document.getElementById('getCatImage').addEventListener('click', getCatImage);

//event listener for breed search button
document.getElementById('searchBreedButton').addEventListener('click', searchBreed);