// スクリプトが既に読み込まれているかチェック
if (typeof mainJsLoaded === 'undefined') {
    // このスクリプトがロードされたことをマーク
    window.mainJsLoaded = true;

    // 国データ（countryListという名前で作成し直し）
    const modalCountryList = [
        { country: "アメリカ", capital: "ワシントンD.C.", language: "英語" },
        { country: "アフガニスタン", capital: "カブール", language: "ダリー語" },
        { country: "アゼルバイジャン", capital: "バクー", language: "アゼルバイジャン語" },
        { country: "アラブ首長国連邦", capital: "アブダビ", language: "アラビア語" },
        { country: "アルメニア", capital: "エレバン", language: "アルメニア語" },
        { country: "イエメン", capital: "サナア", language: "アラビア語" },
        { country: "イスラエル", capital: "エルサレム", language: "ヘブライ語" },
        { country: "イラク", capital: "バグダッド", language: "アラビア語" },
        { country: "イラン", capital: "テヘラン", language: "ペルシャ語" },
        { country: "インド", capital: "ニューデリー", language: "ヒンディー語" },
        { country: "インドネシア", capital: "ジャカルタ", language: "インドネシア語" },
        { country: "ウズベキスタン", capital: "タシケント", language: "ウズベク語" },
        { country: "オマーン", capital: "マスカット", language: "アラビア語" },
        { country: "カザフスタン", capital: "アスタナ", language: "カザフ語" },
        { country: "カタール", capital: "ドーハ", language: "アラビア語" },
        { country: "カンボジア", capital: "プノンペン", language: "クメール語" },
        { country: "キプロス", capital: "ニコシア", language: "ギリシャ語" },
        { country: "キルギス", capital: "ビシュケク", language: "キルギス語" },
        { country: "クウェート", capital: "クウェートシティ", language: "アラビア語" },
        { country: "サウジアラビア", capital: "リヤド", language: "アラビア語" },
        { country: "シリア", capital: "ダマスカス", language: "アラビア語" },
        { country: "シンガポール", capital: "シンガポール", language: "英語" },
        { country: "スリランカ", capital: "スリジャヤワルダナプラコッテ", language: "シンハラ語" },
        { country: "タイ", capital: "バンコク", language: "タイ語" },
        { country: "タジキスタン", capital: "ドゥシャンベ", language: "タジク語" },
        { country: "日本", capital: "東京", language: "日本語" },
        { country: "ネパール", capital: "カトマンズ", language: "ネパール語" },
        { country: "バーレーン", capital: "マナーマ", language: "アラビア語" },
        { country: "パキスタン", capital: "イスラマバード", language: "ウルドゥー語" },
        { country: "バングラデシュ", capital: "ダッカ", language: "ベンガル語" },
        { country: "東ティモール", capital: "ディリ", language: "テトゥン語" },
        { country: "フィリピン", capital: "マニラ", language: "フィリピン語" },
        { country: "ブータン", capital: "ティンプー", language: "ゾンカ語" },
        { country: "ブルネイ", capital: "バンダルスリブガワン", language: "マレー語" },
        { country: "ベトナム", capital: "ハノイ", language: "ベトナム語" },
        { country: "マレーシア", capital: "クアラルンプール", language: "マレー語" },
        { country: "ミャンマー", capital: "ネーピードー", language: "ミャンマー語" },
        { country: "モルディブ", capital: "マレ", language: "ディベヒ語" },
        { country: "モンゴル", capital: "ウランバートル", language: "モンゴル語" },
        { country: "ヨルダン", capital: "アンマン", language: "アラビア語" },
        { country: "ラオス", capital: "ビエンチャン", language: "ラオス語" },
        { country: "レバノン", capital: "ベイルート", language: "アラビア語" },
        { country: "韓国", capital: "ソウル", language: "韓国語" },
        { country: "台湾", capital: "台北", language: "中国語" },
        { country: "アルジェリア", capital: "アルジェ", language: "アラビア語" },
        { country: "アンゴラ", capital: "ルアンダ", language: "ポルトガル語" },
        { country: "ウガンダ", capital: "カンパラ", language: "英語" },
        { country: "エジプト", capital: "カイロ", language: "アラビア語" },
        { country: "エスワティニ", capital: "ムババネ", language: "英語" },
        { country: "エチオピア", capital: "アディスアベバ", language: "アムハラ語" },
        { country: "エリトリア", capital: "アスマラ", language: "ティグリニャ語" },
        { country: "ガーナ", capital: "アクラ", language: "英語" },
        { country: "カーボベルデ", capital: "プライア", language: "ポルトガル語" },
        { country: "ガボン", capital: "リーブルビル", language: "フランス語" },
        { country: "カメルーン", capital: "ヤウンデ", language: "フランス語" },
        { country: "ガンビア", capital: "バンジュール", language: "英語" },
        { country: "ギニア", capital: "コナクリ", language: "フランス語" },
        { country: "ギニアビサウ", capital: "ビサウ", language: "ポルトガル語" },
        { country: "ケニア", capital: "ナイロビ", language: "スワヒリ語" },
        { country: "コートジボワール", capital: "ヤムスクロ", language: "フランス語" },
        { country: "コモロ", capital: "モロニ", language: "アラビア語" },
        { country: "コンゴ共和国", capital: "ブラザビル", language: "フランス語" },
        { country: "コンゴ民主共和国", capital: "キンシャサ", language: "フランス語" },
        { country: "サントメ・プリンシペ", capital: "サントメ", language: "ポルトガル語" },
        { country: "ザンビア", capital: "ルサカ", language: "英語" },
        { country: "シエラレオネ", capital: "フリータウン", language: "英語" },
        { country: "ジブチ", capital: "ジブチ", language: "アラビア語" },
        { country: "ジンバブエ", capital: "ハラレ", language: "英語" },
        { country: "スーダン", capital: "ハルツーム", language: "アラビア語" },
        { country: "南スーダン", capital: "ジュバ", language: "英語" },
        { country: "赤道ギニア", capital: "マラボ", language: "スペイン語" },
        { country: "セーシェル", capital: "ビクトリア", language: "フランス語" },
        { country: "セネガル", capital: "ダカール", language: "フランス語" },
        { country: "ソマリア", capital: "モガディシュ", language: "ソマリ語" },
        { country: "タンザニア", capital: "ドドマ", language: "スワヒリ語" },
        { country: "チャド", capital: "ンジャメナ", language: "アラビア語" },
        { country: "中央アフリカ", capital: "バンギ", language: "フランス語" },
        { country: "チュニジア", capital: "チュニス", language: "アラビア語" },
        { country: "トーゴ", capital: "ロメ", language: "フランス語" },
        { country: "ナイジェリア", capital: "アブジャ", language: "英語" },
        { country: "ナミビア", capital: "ウィンドフック", language: "英語" },
        { country: "ニジェール", capital: "ニアメ", language: "フランス語" },
        { country: "ブルキナファソ", capital: "ワガドゥグー", language: "フランス語" },
        { country: "ブルンジ", capital: "ギテガ", language: "キルンディ語" },
        { country: "ベナン", capital: "ポルトノボ", language: "フランス語" },
        { country: "ボツワナ", capital: "ハボローネ", language: "英語" },
        { country: "マダガスカル", capital: "アンタナナリボ", language: "マダガスカル語" },
        { country: "マラウイ", capital: "リロングウェ", language: "英語" },
        { country: "マリ", capital: "バマコ", language: "フランス語" },
        { country: "南アフリカ", capital: "プレトリア", language: "アフリカーンス語" },
        { country: "モーリシャス", capital: "ポートルイス", language: "英語" },
        { country: "モーリタニア", capital: "ヌアクショット", language: "アラビア語" },
        { country: "モザンビーク", capital: "マプト", language: "ポルトガル語" },
        { country: "モロッコ", capital: "ラバト", language: "アラビア語" },
        { country: "リビア", capital: "トリポリ", language: "アラビア語" },
        { country: "リベリア", capital: "モンロビア", language: "英語" },
        { country: "ルワンダ", capital: "キガリ", language: "キニアルワンダ語" },
        { country: "レソト", capital: "マセル", language: "英語" },
        { country: "アイスランド", capital: "レイキャビク", language: "アイスランド語" },
        { country: "アイルランド", capital: "ダブリン", language: "英語" },
        { country: "アルバニア", capital: "ティラナ", language: "アルバニア語" },
        { country: "アンドラ", capital: "アンドラ・ラ・ベリャ", language: "カタルーニャ語" },
        { country: "イギリス", capital: "ロンドン", language: "英語" },
        { country: "イタリア", capital: "ローマ", language: "イタリア語" },
        { country: "ウクライナ", capital: "キエフ", language: "ウクライナ語" },
        { country: "エストニア", capital: "タリン", language: "エストニア語" },
        { country: "オーストリア", capital: "ウィーン", language: "ドイツ語" },
        { country: "オランダ", capital: "アムステルダム", language: "オランダ語" },
        { country: "北マケドニア", capital: "スコピエ", language: "マケドニア語" },
        { country: "ギリシャ", capital: "アテネ", language: "ギリシャ語" },
        { country: "クロアチア", capital: "ザグレブ", language: "クロアチア語" },
        { country: "サンマリノ", capital: "サンマリノ", language: "イタリア語" },
        { country: "スイス", capital: "ベルン", language: "ドイツ語" },
        { country: "スウェーデン", capital: "ストックホルム", language: "スウェーデン語" },
        { country: "スペイン", capital: "マドリード", language: "スペイン語" },
        { country: "スロバキア", capital: "ブラチスラバ", language: "スロバキア語" },
        { country: "スロベニア", capital: "リュブリャナ", language: "スロベニア語" },
        { country: "セルビア", capital: "ベオグラード", language: "セルビア語" },
        { country: "チェコ", capital: "プラハ", language: "チェコ語" },
        { country: "デンマーク", capital: "コペンハーゲン", language: "デンマーク語" },
        { country: "ドイツ", capital: "ベルリン", language: "ドイツ語" },
        { country: "ノルウェー", capital: "オスロ", language: "ノルウェー語" },
        { country: "ハンガリー", capital: "ブダペスト", language: "ハンガリー語" },
        { country: "フィンランド", capital: "ヘルシンキ", language: "フィンランド語" },
        { country: "フランス", capital: "パリ", language: "フランス語" },
        { country: "ブルガリア", capital: "ソフィア", language: "ブルガリア語" },
        { country: "ベラルーシ", capital: "ミンスク", language: "ベラルーシ語" },
        { country: "ベルギー", capital: "ブリュッセル", language: "オランダ語" },
        { country: "ポーランド", capital: "ワルシャワ", language: "ポーランド語" },
        { country: "ボスニア・ヘルツェゴビナ", capital: "サラエボ", language: "ボスニア語" },
        { country: "ポルトガル", capital: "リスボン", language: "ポルトガル語" },
        { country: "マルタ", capital: "バレッタ", language: "マルタ語" },
        { country: "モナコ", capital: "モナコ", language: "フランス語" },
        { country: "モルドバ", capital: "キシナウ", language: "ルーマニア語" },
        { country: "モンテネグロ", capital: "ポドゴリツァ", language: "モンテネグロ語" },
        { country: "ラトビア", capital: "リガ", language: "ラトビア語" },
        { country: "リトアニア", capital: "ビリニュス", language: "リトアニア語" },
        { country: "リヒテンシュタイン", capital: "ファドゥーツ", language: "ドイツ語" },
        { country: "ルーマニア", capital: "ブカレスト", language: "ルーマニア語" },
        { country: "ルクセンブルク", capital: "ルクセンブルク", language: "フランス語" },
        { country: "ロシア", capital: "モスクワ", language: "ロシア語" },
        { country: "アンティグア・バーブーダ", capital: "セントジョンズ", language: "英語" },
        { country: "エルサルバドル", capital: "サンサルバドル", language: "スペイン語" },
        { country: "カナダ", capital: "オタワ", language: "英語" },
        { country: "キューバ", capital: "ハバナ", language: "スペイン語" },
        { country: "グアテマラ", capital: "グアテマラシティ", language: "スペイン語" },
        { country: "グレナダ", capital: "セントジョージズ", language: "英語" },
        { country: "コスタリカ", capital: "サンホセ", language: "スペイン語" },
        { country: "ジャマイカ", capital: "キングストン", language: "英語" },
        { country: "セントクリストファー・ネービス", capital: "バセテール", language: "英語" },
        { country: "セントビンセント・グレナディーン", capital: "キングスタウン", language: "英語" },
        { country: "セントルシア", capital: "カストリーズ", language: "英語" },
        { country: "ドミニカ共和国", capital: "サントドミンゴ", language: "スペイン語" },
        { country: "ドミニカ国", capital: "ロゾー", language: "英語" },
        { country: "トリニダード・トバゴ", capital: "ポートオブスペイン", language: "英語" },
        { country: "ニカラグア", capital: "マナグア", language: "スペイン語" },
        { country: "ハイチ", capital: "ポルトープランス", language: "ハイチ語" },
        { country: "パナマ", capital: "パナマシティ", language: "スペイン語" },
        { country: "バハマ", capital: "ナッソー", language: "英語" },
        { country: "バルバドス", capital: "ブリッジタウン", language: "英語" },
        { country: "ホンジュラス", capital: "テグシガルパ", language: "スペイン語" },
        { country: "メキシコ", capital: "メキシコシティ", language: "スペイン語" },
        { country: "アルゼンチン", capital: "ブエノスアイレス", language: "スペイン語" },
        { country: "ウルグアイ", capital: "モンテビデオ", language: "スペイン語" },
        { country: "エクアドル", capital: "キト", language: "スペイン語" },
        { country: "ガイアナ", capital: "ジョージタウン", language: "英語" },
        { country: "コロンビア", capital: "ボゴタ", language: "スペイン語" },
        { country: "スリナム", capital: "パラマリボ", language: "オランダ語" },
        { country: "チリ", capital: "サンティアゴ", language: "スペイン語" },
        { country: "パラグアイ", capital: "アスンシオン", language: "スペイン語" },
        { country: "ブラジル", capital: "ブラジリア", language: "ポルトガル語" },
        { country: "ベネズエラ", capital: "カラカス", language: "スペイン語" },
        { country: "ペルー", capital: "リマ", language: "スペイン語" },
        { country: "ボリビア", capital: "ラパス", language: "スペイン語" },
        { country: "オーストラリア", capital: "キャンベラ", language: "英語" },
        { country: "キリバス", capital: "タラワ", language: "キリバス語" },
        { country: "クック諸島", capital: "アバルア", language: "英語" },
        { country: "サモア", capital: "アピア", language: "サモア語" },
        { country: "ソロモン諸島", capital: "ホニアラ", language: "英語" },
        { country: "ツバル", capital: "フナフティ", language: "ツバル語" },
        { country: "トンガ", capital: "ヌクアロファ", language: "トンガ語" },
        { country: "ナウル", capital: "ヤレン", language: "ナウル語" },
        { country: "ニュージーランド", capital: "ウェリントン", language: "英語" },
        { country: "バヌアツ", capital: "ポートビラ", language: "英語" },
        { country: "パプアニューギニア", capital: "ポートモレスビー", language: "英語" },
        { country: "パラオ", capital: "ンゲルルムッド", language: "パラオ語" },
        { country: "フィジー", capital: "スバ", language: "英語" },
        { country: "マーシャル諸島", capital: "マジュロ", language: "マーシャル語" }
    ];

    // 選択された国
    let modalSelectedCountry = null;

    // モーダルを開く関数
    function openModal() {
        console.log('openModal関数が呼ばれました');
        const modal = document.getElementById('country-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            console.log('モーダルを表示しました');

            // 国名をリセット
            modalSelectedCountry = null;

            // 国リストの生成
            populateCountryList();

            // 保存されたデータを取得して表示
            const savedRecords = JSON.parse(localStorage.getItem('savedRecords'));
            if (savedRecords) {
                const visitDateInput = document.getElementById('visit-date');
                if (visitDateInput) { // 要素が存在するか確認
                    visitDateInput.value = savedRecords.date; // 保存された日付を設定
                }
            }

            // モーダル内の訪問国数と総国数を表示
            updateCountsSummary();
        } else {
            console.error('country-modalが見つかりません');
        }
    }

    // モーダルを閉じる関数
    function closeModal() {
        console.log('closeModal関数が呼ばれました');
        const modal = document.getElementById('country-modal');
        if (modal) {
            // hiddenクラスを追加
            modal.classList.add('hidden');
            
            // さらに確実にするため、スタイルも直接操作
            modal.style.display = 'none';
            
            console.log('モーダルを非表示にしました');
        } else {
            console.error('country-modalが見つかりません');
        }
    }
    
    // 国リストの生成
    function populateCountryList() {
        const countryListElement = document.getElementById('country-list');
        if (countryListElement) {
            let html = '';

            // ローカルストレージから保存された国を取得
            const savedRecords = JSON.parse(localStorage.getItem('savedRecords')) || {};

            // 国を五十音順にソート
            const sortedCountries = [...modalCountryList].sort((a, b) => 
                a.country.localeCompare(b.country, 'ja')
            );

            sortedCountries.forEach(country => {
                // 保存された日付を取得
                const visitDate = savedRecords[country.country] || '';

                // 日付が入力されている場合に赤い丸を表示
                const redCircle = visitDate ? '<span class="red-circle">●</span>' : '';

                html += `
                    <div class="country-item">
                        <label for="date-${country.country}">
                            ${redCircle} ${country.country}
                        </label>
                        <input type="date" id="date-${country.country}" name="date-${country.country}" value="${visitDate}" onchange="updateCountsSummary()">
                    </div>
                `;
            });

            countryListElement.innerHTML = html;
        }
    }

    // 訪問国数と総国数の表示を更新する関数
    function updateCountsSummary() {
        const countSummaryElement = document.getElementById('count-summary');
        if (!countSummaryElement) return;

        // 入力された日付の数をカウント
        let visitedCount = 0;
        modalCountryList.forEach(country => {
            const dateElement = document.getElementById(`date-${country.country}`);
            if (dateElement && dateElement.value) {
                visitedCount++;
            }
        });

        // 総国数
        const totalCountries = modalCountryList.length;
        
        // 表示内容を更新
        countSummaryElement.textContent = `訪問済み: ${visitedCount}国 / 総国数: ${totalCountries}国`;
    }

    // ページ読み込み完了時の処理
    document.addEventListener('DOMContentLoaded', function() {
        console.log('モーダルスクリプトが読み込まれました');
        
        // 要素の取得
        const rouletteButton = document.querySelector('#roulette-button');
        const acceptButton = document.querySelector('#accept-button');
        const rejectButton = document.querySelector('#reject-button');
        const resultSection = document.querySelector('#result-section');
        const mainElement = document.querySelector('main');
        
        // ルーレットボタンのクリックイベント
        if (rouletteButton) {
            rouletteButton.addEventListener('click', function() {
                // メインコンテンツを非表示にする
                if (mainElement) {
                    mainElement.classList.add('hidden');
                }

                // ルーレットの結果セクションを非表示にする
                resultSection.classList.add('hidden');

                // レストランとレシピのセクションを非表示にする
                document.querySelector('#restaurant-section').classList.add('hidden');
                document.querySelector('#recipe-section').classList.add('hidden');

                // ルーレットの回転アニメーションを追加
                const rouletteElement = document.querySelector('.roulette'); // ルーレットの要素を取得
                if (rouletteElement) {
                    rouletteElement.classList.add('spin'); // CSSクラスを追加して回転させる
                }

                // ランダムに国を選択
                const randomIndex = Math.floor(Math.random() * modalCountryList.length);
                modalSelectedCountry = modalCountryList[randomIndex];

                // 国の情報を表示
                const countryInfo = document.querySelector('#country-info');
                if (countryInfo) {
                    if (modalSelectedCountry) {
                        countryInfo.innerHTML = `
                            <h2>${modalSelectedCountry.country}</h2>
                            <p>首都: ${modalSelectedCountry.capital}</p>
                            <p>言語: ${modalSelectedCountry.language}</p>
                        `;
                        
                        // 結果を表示するための遅延
                        setTimeout(() => {
                            // メインコンテンツを再表示
                            if (mainElement) {
                                mainElement.classList.remove('hidden');
                            }

                            resultSection.classList.remove('hidden'); // 遅延後に結果を表示
                            if (rouletteElement) {
                                rouletteElement.classList.remove('spin'); // 回転アニメーションを解除
                            }
                        }, 3000); // 3秒後に表示
                    }
                }
            });

            // タッチイベントの追加
            rouletteButton.addEventListener('touchstart', function() {
                this.click(); // タッチイベントでもクリックイベントを発火させる
            }, { passive: true }); // パッシブオプションを追加
        }
        
        // 決定ボタンのクリックイベント
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                if (modalSelectedCountry) {
                    alert(`${modalSelectedCountry.country}に行きましょう！`);
                }
            });
        }
        
        // もう一度ボタンのクリックイベント
        if (rejectButton) {
            rejectButton.addEventListener('click', function() {
                // ボタンを無効化
                this.disabled = true; // ボタンを無効化

                // メインコンテンツを非表示にする
                if (mainElement) {
                    mainElement.classList.add('hidden');
                }

                // ルーレットの回転アニメーションを追加
                const rouletteElement = document.querySelector('.roulette'); // ルーレットの要素を取得
                if (rouletteElement) {
                    rouletteElement.classList.add('spin'); // CSSクラスを追加して回転させる
                }

                // ランダムに国を選択
                const randomIndex = Math.floor(Math.random() * modalCountryList.length);
                modalSelectedCountry = modalCountryList[randomIndex];

                // 国の情報を表示
                const countryInfo = document.querySelector('#country-info');
                if (countryInfo) {
                    if (modalSelectedCountry) {
                        countryInfo.innerHTML = `
                            <h2>${modalSelectedCountry.country}</h2>
                            <p>首都: ${modalSelectedCountry.capital}</p>
                            <p>言語: ${modalSelectedCountry.language}</p>
                        `;
                        
                        // 結果を表示するための遅延
                        setTimeout(() => {
                            resultSection.classList.remove('hidden'); // 遅延後に結果を表示
                            if (rouletteElement) {
                                rouletteElement.classList.remove('spin'); // 回転アニメーションを解除
                            }
                            this.disabled = false; // ボタンを再度有効化

                            // メインコンテンツを再表示
                            if (mainElement) {
                                mainElement.classList.remove('hidden');
                            }
                        }, 3000); // 3秒後に表示
                    }
                }
            });
        }
        
        // モーダルを開くボタンのイベントリスナー
        const openModalButton = document.getElementById('open-modal-button');
        if (openModalButton) {
            openModalButton.addEventListener('click', openModal);
            console.log('モーダルを開くボタンのイベントリスナーを設定しました');
        } else {
            console.error('open-modal-buttonが見つかりません');
        }
        
        // モーダルを閉じるボタンのイベントリスナー
        const closeButton = document.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
            console.log('モーダルを閉じるボタンのイベントリスナーを設定しました');
        } else {
            console.error('close-buttonが見つかりません');
        }
        
        // モーダルの外側をクリックした時に閉じる機能
        const modal = document.getElementById('country-modal');
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === this) {
                    closeModal();
                }
            });
        }
        
        // 保存ボタンのイベントリスナー
        const saveButton = document.getElementById('save-button');
        if (saveButton) {
            saveButton.addEventListener('click', function() {
                const savedRecords = {};

                modalCountryList.forEach(country => {
                    const dateElement = document.getElementById(`date-${country.country}`);
                    if (dateElement) {
                        const visitDate = dateElement.value; // 選択された訪問日を取得
                        if (visitDate) {
                            savedRecords[country.country] = visitDate; // 国名をキーにして日付を保存
                        }
                    }
                });

                if (Object.keys(savedRecords).length > 0) {
                    // ローカルストレージに保存
                    localStorage.setItem('savedRecords', JSON.stringify(savedRecords));
                    alert(`選択された国と訪問日が保存されました！`);
                } else {
                    alert('訪問日が選択されていません。');
                }

                closeModal(); // モーダルを閉じる
            });
        }
    });

    // グローバルスコープに関数を公開
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.updateCountsSummary = updateCountsSummary;
}
