document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const tickerList = document.getElementById('ticker-list');

    // Function to fetch commodity data from API
    async function fetchCommodities() {
        try {
            const url = 'https://uexcorp.space/api/2.0/commodities';
            const headers = {
                'User-Agent': 'Galactic-Trader-App', // Your user-agent string
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
                // Add other headers as needed
            };

            const response = await fetch(url, {
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch commodities');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching commodities:', error);
            return null;
        }
    }

    // Function to update ticker tape with commodity data
    async function updateTickerTape() {
        const commodities = await fetchCommodities();
        if (!commodities) return;

        // Clear existing ticker tape items
        tickerList.innerHTML = '';

        // Populate ticker tape with fetched data
        commodities.forEach(commodity => {
            const li = document.createElement('li');
            li.textContent = `${commodity.name} | Buy: ${commodity.price_buy} | Sell: ${commodity.price_sell}`;
            tickerList.appendChild(li);
        });
    }

    // Initial update of ticker tape on page load
    updateTickerTape();

    // Periodically update ticker tape (every 30 seconds, adjust as needed)
    setInterval(updateTickerTape, 30000);

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        header.classList.toggle('dark-mode');
        nav.classList.toggle('dark-mode');
        main.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');
    });
});
