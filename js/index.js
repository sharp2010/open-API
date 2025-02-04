
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

// calling the function to get a cat image
getCatImage();

// event listener to button
const getCatButton = document.getElementById('getCatImage');
getCatButton.addEventListener('click', getCatImage);