// 世界地図クラス
class WorldMap {
    constructor() {
        this.mapContainer = document.getElementById('world-map');
        this.svg = null;
        this.loadMap();
    }
    
    // 地図の読み込み
    async loadMap() {
        try {
            const response = await fetch('assets/images/world-map.svg');
            const svgText = await response.text();
            this.mapContainer.innerHTML = svgText;
            this.svg = this.mapContainer.querySelector('svg');
            this.initializeMap();
        } catch (error) {
            console.error('地図の読み込みに失敗しました:', error);
            this.mapContainer.innerHTML = '<p>地図の読み込みに失敗しました。</p>';
        }
    }
    
    // 地図の初期化
    initializeMap() {
        if (!this.svg) return;
        
        // SVGのサイズを調整
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.setAttribute('viewBox', '0 0 1000 500');
        
        // 国ごとのパスにイベントリスナーを追加
        const paths = this.svg.querySelectorAll('path[data-country]');
        paths.forEach(path => {
            path.addEventListener('mouseover', () => {
                path.style.fill = '#3498db';
                path.style.cursor = 'pointer';
            });
            
            path.addEventListener('mouseout', () => {
                if (!path.classList.contains('highlighted')) {
                    path.style.fill = '#e0e0e0';
                }
            });
        });
    }
    
    // 国をハイライト
    highlightCountry(countryName) {
        if (!this.svg) return;
        
        // すべてのハイライトをクリア
        this.clearHighlight();
        
        // 指定された国をハイライト
        const paths = this.svg.querySelectorAll('path[data-country]');
        paths.forEach(path => {
            if (path.getAttribute('data-country') === countryName) {
                path.classList.add('highlighted');
                path.classList.add('country-highlight');
            }
        });
    }
    
    // ハイライトをクリア
    clearHighlight() {
        if (!this.svg) return;
        
        const paths = this.svg.querySelectorAll('path[data-country]');
        paths.forEach(path => {
            path.classList.remove('highlighted');
            path.classList.remove('country-highlight');
            path.style.fill = '#e0e0e0';
        });
    }
}

// グローバルインスタンスを作成
window.worldMap = new WorldMap();

// 国情報表示関数をグローバルに公開
window.displayCountryInfo = function(country) {
    const countryInfo = document.getElementById('country-info');
    const resultSection = document.getElementById('result-section');
    
    // 国情報を表示
    countryInfo.innerHTML = `
        <h2>${country.country}</h2>
        <p>首都: ${country.capital}</p>
        <p>言語: ${country.language}</p>
    `;
    
    // 結果セクションを表示
    resultSection.classList.remove('hidden');
    
    // 地図上で国をハイライト
    if (window.worldMap) {
        window.worldMap.highlightCountry(country.country);
    }
}; 