// ルーレットクラス
class Roulette {
    constructor() {
        this.isSpinning = false;
        this.lastSelectedIndex = -1;
        this.audio = new Audio('assets/sounds/roulette.mp3');
    }
    
    // ルーレットを回す
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        const button = document.getElementById('roulette-button');
        
        // 効果音を再生
        this.audio.currentTime = 0;
        this.audio.play().catch(error => {
            console.error('効果音の再生に失敗しました:', error);
        });
        
        // アニメーションを開始
        button.classList.add('roulette-spinning');
        
        // 1秒後に停止
        setTimeout(() => this.stop(), 1000);
    }
    
    // ルーレットを停止
    stop() {
        this.isSpinning = false;
        const button = document.getElementById('roulette-button');
        
        // アニメーションを停止
        button.classList.remove('roulette-spinning');
        
        // 効果音を停止
        this.audio.pause();
        
        // 新しい国を選択（前回と異なる国を選択）
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * window.countries.length);
        } while (newIndex === this.lastSelectedIndex && window.countries.length > 1);
        
        this.lastSelectedIndex = newIndex;
        const selectedCountry = window.countries[newIndex];
        
        // 国情報を表示
        if (window.displayCountryInfo) {
            window.displayCountryInfo(selectedCountry);
        }
    }
}

// グローバルインスタンスを作成
window.roulette = new Roulette();

// ルーレットボタンのイベントリスナー
document.getElementById('roulette-button').addEventListener('click', () => {
    window.roulette.spin();
}); 