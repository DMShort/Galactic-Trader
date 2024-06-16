document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const tickerList = document.getElementById('ticker-list');

    // Function to fetch commodity data from the local API
    async function fetchCommodities() {
        try {
            const url = 'http://localhost:3000/api/commodities';
            console.log('Fetching commodities from URL:', url);

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors' // Ensure 'cors' mode for accessing response body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            return data;
        } catch (error) {
            console.error('Error fetching commodities:', error);
            throw error; // Re-throw the error to handle it further if needed
        }
    }

    // Function to update ticker tape with commodity data
    async function updateTickerTape() {
        try {
            const commodities = await fetchCommodities();
            if (!commodities || commodities.length === 0) {
                console.log('No commodities data to display.');
                return;
            }

            console.log('Updating ticker tape with commodities:', commodities);

            // Clear existing ticker tape items
            tickerList.innerHTML = '';

            // Populate ticker tape with fetched data
            commodities.forEach(commodity => {
                const li = document.createElement('li');
                li.textContent = `${commodity.name} | Buy: ${commodity.price_buy} | Sell: ${commodity.price_sell}`;
                tickerList.appendChild(li);
            });

            console.log('Ticker tape updated successfully.');
        } catch (error) {
            console.error('Error updating ticker tape:', error);
        }
    }

    // Initial update of ticker tape on page load
    updateTickerTape();

    // Periodically update ticker tape (every 30 seconds, adjust as needed)
    setInterval(updateTickerTape, 30000);

    themeToggle.addEventListener('change', () => {
        const isChecked = themeToggle.checked;
        console.log('Theme toggle changed:', isChecked);

        body.classList.toggle('dark-mode', isChecked);
        header.classList.toggle('dark-mode', isChecked);
        nav.classList.toggle('dark-mode', isChecked);
        main.classList.toggle('dark-mode', isChecked);
        footer.classList.toggle('dark-mode', isChecked);
    });
});
