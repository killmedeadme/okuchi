document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const countryGrid = document.querySelector('.country-grid');
    const visitedCountSpan = document.getElementById('visited-count');
    const searchInput = document.getElementById('country-search');

    // LocalStorageのキー
    const STORAGE_KEY = 'visitedCountries';

    // 訪問記録を取得
    function getVisitedCountries() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }

    // 訪問記録を保存
    function saveVisitedCountry(country, date) {
        let visitedCountries = getVisitedCountries();
        if (date) {
            visitedCountries[country] = date;
        } else {
            delete visitedCountries[country];
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedCountries));
        updateVisitedCount();
    }

    // 訪問国数を更新
    function updateVisitedCount() {
        const visitedCountries = getVisitedCountries();
        visitedCountSpan.textContent = Object.keys(visitedCountries).length;
    }

    // 国の検索機能
    function filterCountries(searchText) {
        const items = document.querySelectorAll('.country-item');
        items.forEach(item => {
            const countryName = item.querySelector('.country-name').textContent.toLowerCase();
            const capitalName = item.querySelector('.country-capital').textContent.toLowerCase();
            const searchLower = searchText.toLowerCase();
            
            if (countryName.includes(searchLower) || capitalName.includes(searchLower)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // 国リストを初期化
    function initializeCountryList() {
        const visitedCountries = getVisitedCountries();
        
        // 国を五十音順にソート
        const sortedCountries = [...countries].sort((a, b) => 
            a.country.localeCompare(b.country, 'ja')
        );

        // 国リストをクリア
        countryGrid.innerHTML = '';
        
        // 各国のアイテムを作成
        sortedCountries.forEach(country => {
            const item = document.createElement('div');
            item.className = 'country-item' + (visitedCountries[country.country] ? ' visited' : '');
            
            item.innerHTML = `
                <span class="visited-mark">●</span>
                <div class="country-info">
                    <div class="country-name">${country.country}</div>
                    <div class="country-capital">${country.capital}</div>
                </div>
                <input type="date" class="visit-date" value="${visitedCountries[country.country] || ''}"
                       ${visitedCountries[country.country] ? 'data-original-date="' + visitedCountries[country.country] + '"' : ''}>
            `;

            // 日付変更イベントを追加
            const dateInput = item.querySelector('.visit-date');
            dateInput.addEventListener('change', function() {
                const newDate = this.value;
                if (newDate) {
                    saveVisitedCountry(country.country, newDate);
                    item.classList.add('visited');
                    this.setAttribute('data-original-date', newDate);
                } else {
                    saveVisitedCountry(country.country, null);
                    item.classList.remove('visited');
                    this.removeAttribute('data-original-date');
                }
            });

            countryGrid.appendChild(item);
        });

        updateVisitedCount();
    }

    // 検索イベントリスナーを追加
    searchInput.addEventListener('input', function() {
        filterCountries(this.value);
    });

    // 初期化
    initializeCountryList();
}); 