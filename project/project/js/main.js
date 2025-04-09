// 国データ
const countries = [
    { country: "日本", capital: "東京", language: "日本語" },
    { country: "中国", capital: "北京", language: "中国語" },
    { country: "韓国", capital: "ソウル", language: "韓国語" },
    { country: "アメリカ", capital: "ワシントンD.C.", language: "英語" }
];

// 国旗のSVGデータ
const flagSVGs = {
    '日本': `<svg viewBox="0 0 900 600"><rect width="900" height="600" fill="white"/><circle cx="450" cy="300" r="180" fill="#bc002d"/></svg>`,
    '中国': `<svg viewBox="0 0 900 600"><rect width="900" height="600" fill="#de2910"/><g transform="translate(450,300)"><path d="M-95,-31L5,-31L5,13L-95,13Z" fill="#ffde00"/><path d="M45,-13L81,27L62,36L26,-4L45,-13Z" fill="#ffde00"/><path d="M71,-60L91,-20L68,-11L48,-51L71,-60Z" fill="#ffde00"/><path d="M71,60L91,20L68,11L48,51L71,60Z" fill="#ffde00"/><path d="M45,13L81,-27L62,-36L26,4L45,13Z" fill="#ffde00"/></g></svg>`,
    '韓国': `<svg viewBox="0 0 900 600"><rect width="900" height="600" fill="white"/><circle cx="450" cy="300" r="150" fill="#cd2e3a"/><path d="M450,150 C500,150 550,200 550,250 C550,300 500,350 450,350 C400,350 350,300 350,250 C350,200 400,150 450,150Z M450,450 C400,450 350,400 350,350 C350,300 400,250 450,250 C500,250 550,300 550,350 C550,400 500,450 450,450Z" fill="#0047a0"/></svg>`,
    'アメリカ': `<svg viewBox="0 0 900 600"><rect width="900" height="600" fill="white"/><g fill="#bf0a30"><rect width="900" height="46.15" y="0"/><rect width="900" height="46.15" y="92.3"/><rect width="900" height="46.15" y="184.6"/><rect width="900" height="46.15" y="276.9"/><rect width="900" height="46.15" y="369.2"/><rect width="900" height="46.15" y="461.5"/><rect width="900" height="46.15" y="553.8"/></g><rect width="346.15" height="323.1" fill="#002868"/><g fill="white" transform="translate(30,30)"><circle r="15" cx="40" cy="40"/><circle r="15" cx="120" cy="40"/><circle r="15" cx="200" cy="40"/><circle r="15" cx="280" cy="40"/><circle r="15" cx="80" cy="100"/><circle r="15" cx="160" cy="100"/><circle r="15" cx="240" cy="100"/></g></svg>`
};

// 選択された国
let selectedCountry = null;

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
    alert('スクリプトが読み込まれました');
    
    // 要素の取得
    const rouletteButton = document.querySelector('#roulette-button');
    const acceptButton = document.querySelector('#accept-button');
    const rejectButton = document.querySelector('#reject-button');
    const resultSection = document.querySelector('#result-section');
    
    // ルーレットボタンのクリックイベント
    rouletteButton.addEventListener('click', function() {
        // ランダムに国を選択
        const randomIndex = Math.floor(Math.random() * countries.length);
        selectedCountry = countries[randomIndex];
        
        // 国の情報を表示
        const countryInfo = document.querySelector('#country-info');
        countryInfo.innerHTML = `
            <h2>${selectedCountry.country}</h2>
            <div class="flag">${flagSVGs[selectedCountry.country]}</div>
            <p>首都: ${selectedCountry.capital}</p>
            <p>言語: ${selectedCountry.language}</p>
        `;
        
        // 結果を表示
        resultSection.classList.remove('hidden');
    });
    
    // 決定ボタンのクリックイベント
    acceptButton.addEventListener('click', function() {
        alert(`${selectedCountry.country}に行きましょう！`);
    });
    
    // もう一度ボタンのクリックイベント
    rejectButton.addEventListener('click', function() {
        resultSection.classList.add('hidden');
    });
}); 