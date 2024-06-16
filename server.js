const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

app.get('/api/commodities', async (req, res) => {
    try {
        const response = await axios.get('https://uexcorp.space/api/2.0/commodities', {
            headers: {
                'User-Agent': 'Galactic-Trader-App',
                'Accept': '*/*',
                'Authorization': `Bearer 912b63959ef6a31d2eec131d3e3b90ceb44d3a6a`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from remote API:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
