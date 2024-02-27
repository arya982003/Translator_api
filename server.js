const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());


app.post('/translate', async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ error: 'Text to translate is missing in the request body.' });
    }
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'en');
        encodedParams.set('target_language', 'fr');
        encodedParams.set('text', req.body.text);

        // Set up the request options
        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '5ba4966cc0msh2f64955a6a142dfp1d2206jsnaad9849d26c1', // Replace with your actual RapidAPI key
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };

        const response = await axios.request(options);
        // Send the translated text in the response
        res.json({ translation: response.data });
    } catch (error) {
        console.error('Translation error:', error.response.data);
        res.status(500).json({ error: 'Failed to translate the text.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

