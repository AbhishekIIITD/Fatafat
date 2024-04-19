// pages/api/fetchPhoto.js

export default async function handler(req, res) {
    // Extract the query parameter from the request
    const { query } = req.query;
    const apikey="4j1sGOPXmBMS5PrT3qebpFQzwcxd1BD4Xfo0Tic0LXXmeRR3lZZN2N2u";

    try {
      // Make a GET request to the Pixel API endpoint with the query parameter
      console.log(`https://api.pexels.com/v1/search?query=${query}&page=1`)
      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=1`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,     //use the apikey you have generated
        },
      });
  
      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Parse the response body as JSON
        const data = await response.json();
        console.log(data)
        // Return the data as JSON
        res.status(200).json(data);
      } else {
        // If the request was not successful, return an error status code and message
        res.status(response.status).json({ error: 'Failed to fetch photos from Pixel API' });
      }
    } catch (error) {
      // If an error occurs during the request, return an error status code and message
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  