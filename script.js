document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const tickerList = document.getElementById('ticker-list');

    // Function to fetch commodity data using JSONP
    function fetchCommoditiesJSONP() {
        const script = document.createElement('script');
        script.src = `https://uexcorp.space/api/2.0/commodities?callback=handleJSONPResponse`;

        // Define the callback function globally
        window.handleJSONPResponse = function(data) {
            console.log('JSONP Response:', data);
            // Process the JSONP data here
            updateTickerTape(data); // Call update function with JSONP data
            document.head.removeChild(script); // Clean up: remove script tag
        };

        // Add script tag to the document head to initiate JSONP request
        document.head.appendChild(script);
    }

    // Function to update ticker tape with commodity data
    function updateTickerTape(commodities) {
        // Clear existing ticker tape items
        tickerList.innerHTML = '';

        // Populate ticker tape with fetched data
        commodities.forEach(commodity => {
            const li = document.createElement('li');
            li.textContent = `${commodity.name} | Buy: ${commodity.price_buy} | Sell: ${commodity.price_sell}`;
            tickerList.appendChild(li);
        });
    }

    // Initial fetch of commodities using JSONP
    fetchCommoditiesJSONP();

    // Periodically update ticker tape (every 30 seconds, adjust as needed)
    setInterval(fetchCommoditiesJSONP, 30000);

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        header.classList.toggle('dark-mode');
        nav.classList.toggle('dark-mode');
        main.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');
    });
});
