const newsContainer = document.getElementById("news-container");

// Simulated API response (replace with a real API call in a production environment)
const fetchLatestNews = async () => {
    // Simulating an API call
    return [
        {
            title: "LPG Truck Explosion in Multan, Pakistan",
            description: "A gas-filled tanker exploded in Multan's Industrial Estate, resulting in multiple fatalities and injuries.",
            link: "https://english.mathrubhumi.com/amp/news/world/pakistan-multan-lpg-explosion-1.10287975"
        },
        {
            title: "LPG Cylinder Explosion Claims Woman's Life in Chennai",
            description: "A 26-year-old woman suffered fatal burns after an LPG cylinder exploded in her house.",
            link: "https://www.newindianexpress.com/states/tamil-nadu/2024/Oct/15/lpg-cylinder-explosion-claims-womans-life-in-chennai"
        },
        {
            title: "LPG Tanker Collision Causes Gas Leak in Kanpur",
            description: "An LPG tanker collided with a pickup truck, leading to a gas leak and causing a major traffic blockade.",
            link: "https://www.hindustantimes.com/india-news/kanpur-lpg-tanker-collision-with-pickup-truck-triggers-gas-leak-101736663785843.html"
        }
    ];
};

// Function to create news item HTML
function createNewsItem(news) {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `
        <h3>${news.title}</h3>
        <p>${news.description}</p>
        <a href="${news.link}" target="_blank">Read more</a>
    `;
    return newsItem;
}

// Function to update the news items in the container
function updateNewsContent(newsData) {
    // Clear existing content
    newsContainer.innerHTML = '';
    
    // Loop through the news data and append each news item to the container
    newsData.forEach(news => {
        newsContainer.appendChild(createNewsItem(news));
    });
}

// Fetch and update news every 10 seconds
async function autoUpdateNews() {
    const newsData = await fetchLatestNews();  // Simulating API call to fetch latest news
    updateNewsContent(newsData);
}

// Initial news load
autoUpdateNews();

// Set interval to update the news every 10 seconds (10000 milliseconds)
setInterval(autoUpdateNews, 10000);
