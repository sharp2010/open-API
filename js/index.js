// api key from the cat api
const apiKey = 'live_GOHQq1ThqJOgEMotKUIE78KMv5yI2VmGgNzeY4IsyLwsLpoudVDx4X7dlcaZxqhg';

// function to make GET request with headers
const fetchData= async (url) => {
    try {
        const response = await axios.get(url, {
            // header is need to authenticate the request
            headers: {'x-api-key': apiKey},
        });
        return response.data;
    }  catch (error) {
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
        breedElement.innerHTML = `
            <h3>${breed.name}</h3>
            <p>${breed.description}</p>
            <img src="${breed.image?.url}" alt="${breed.name}" style="max-width: 200px; height: auto;" />
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
};
       
//function to get cat breeds
const getCatBreeds = async () => {
const breeds = await fetchData('https://api.thecatapi.com/v1/breeds');
console.log(breeds);
    displayBreeds(breeds);
};

// function to search breeds
const searchBreed = async () => {
    const searchName = document.getElementById('breedSearch').value.toLowerCase();
    const breeds = await fetchData('https://api.thecatapi.com/v1/breeds');
    const filteredBreeds = breeds.filter(breed => breed.name.toLowerCase().includes(searchName));
    displayBreeds(filteredBreeds);
};
        
// Event listeners for navigation links
const catLink = document.getElementById('catLink');
const breedsLink = document.getElementById('breedsLink');
const catSection = document.getElementById('cat');
const breedsSection = document.getElementById('breeds');

catLink.addEventListener('click', () => {
    catSection.style.display = 'block';
  //  breedsSection.style.display = 'none';
    getCatImage();
});

breedsLink.addEventListener('click', () => {
    catSection.style.display = 'block';
  // breedsSection.style.display = 'none';
    getCatBreeds();
});

//event listener for breed search button
document.getElementById('searchBreedButton').addEventListener('click', searchBreed);