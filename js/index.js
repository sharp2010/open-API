// needed to make a get request to the api
const axios = require('axios');

// api key from the cat api
const apiKey = 'live_GOHQq1ThqJOgEMotKUIE78KMv5yI2VmGgNzeY4IsyLwsLpoudVDx4X7dlcaZxqhg';

// function to get a cat image
const getCatImage = async () => {
    const url = 'https://api.thecatapi.com/v1/images/search';

    try {
        const response = await axios.get(url, {
            // header is need to quthenticate the request
            headers: {'x-api-key': apiKey},
        });

        // log the image url to console
        console.log('Cat Image URL:', response.data[0].url);
    } catch (error) {
        console.error('Error retrieving cat image:', error);
    }
};

// calling the function to get a cat image
getCatImage();