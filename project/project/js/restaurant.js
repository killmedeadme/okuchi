// レストラン検索クラス
class RestaurantSearch {
    constructor() {
        this.searchLinksContainer = document.getElementById('search-links');
        this.searchTip = document.getElementById('search-tip');
    }
    
    // 検索リンクを生成
    generateSearchLinks(country) {
        if (!country) {
            throw new Error('国が選択されていません。');
        }
        
        const searchQuery = this.generateSearchQuery(country);
        const searchEngines = [
            {
                name: 'Google',
                icon: 'assets/images/google-icon.svg',
                url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
            },
            {
                name: 'Yahoo!',
                icon: 'assets/images/yahoo-icon.svg',
                url: `https://search.yahoo.co.jp/search?p=${encodeURIComponent(searchQuery)}`
            },
            {
                name: 'Bing',
                icon: 'assets/images/bing-icon.svg',
                url: `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`
            }
        ];
        
        this.displaySearchLinks(searchEngines);
    }
    
    // 検索クエリを生成
    generateSearchQuery(country) {
        const queries = {
            '日本': `${country.capital} 観光 グルメ`,
            '韓国': `${country.capital} food restaurant`,
            '中国': `${country.capital} 美食 餐厅`,
            'タイ': `${country.capital} food restaurant`,
            'ベトナム': `${country.capital} food restaurant`,
            'インドネシア': `${country.capital} food restaurant`,
            'マレーシア': `${country.capital} food restaurant`,
            'シンガポール': `${country.capital} food restaurant`,
            'フィリピン': `${country.capital} food restaurant`,
            'アメリカ': `${country.capital} restaurants`,
            'カナダ': `${country.capital} restaurants`,
            'イギリス': `${country.capital} restaurants`,
            'フランス': `${country.capital} restaurants`,
            'イタリア': `${country.capital} ristoranti`,
            'スペイン': `${country.capital} restaurantes`,
            'ドイツ': `${country.capital} restaurants`,
            'オーストラリア': `${country.capital} restaurants`
        };
        
        return queries[country.country] || `${country.capital} restaurants`;
    }
    
    // 検索リンクを表示
    displaySearchLinks(searchEngines) {
        try {
            this.searchLinksContainer.innerHTML = searchEngines.map(engine => `
                <a href="${engine.url}" target="_blank" rel="noopener" class="search-link">
                    <img src="${engine.icon}" alt="${engine.name}" class="search-icon">
                    <span>${engine.name}で検索</span>
                </a>
            `).join('');
            
            this.searchTip.classList.remove('hidden');
        } catch (error) {
            console.error('検索リンクの表示に失敗しました:', error);
            this.searchLinksContainer.innerHTML = `
                <div class="error-message">
                    <p>検索リンクの表示に失敗しました。</p>
                    <button onclick="window.location.reload()">再試行</button>
                </div>
            `;
        }
    }
}

// グローバルインスタンスを作成
window.restaurantSearch = new RestaurantSearch();

// レストランを検索
async function searchRestaurants(latitude, longitude) {
    try {
        // 選択された国を取得
        const selectedCountry = window.selectedCountry;
        if (!selectedCountry) {
            throw new Error('国が選択されていません。');
        }
        
        // 検索リンクを生成
        window.restaurantSearch.generateSearchLinks(selectedCountry);
        
        // 検索結果セクションを表示
        const restaurantSection = document.getElementById('restaurant-section');
        restaurantSection.classList.remove('hidden');
        
    } catch (error) {
        console.error('レストラン検索に失敗しました:', error);
        alert('レストラン検索に失敗しました。もう一度お試しください。');
    }
} 