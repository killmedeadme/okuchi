// GASウェブアプリのURL (ステップ3でコピーしたURLに置き換えてください)
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwx7LOM6DuDUNA07TrBoxQmne-YVrysWt1lPQixjrDvfJ5mGmpobeg-ddQPZ6XhjVxL/exec'; // ★★★ 必ず書き換えてください ★★★

// 日付を yyyy-MM-dd 形式にフォーマットするヘルパー関数
function formatDateToYyyyMmDd(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.warn("Invalid date string received:", dateString);
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return '';
  }
}

document.addEventListener('DOMContentLoaded', async function() {
    // DOM要素の取得
    const countryGrid = document.querySelector('.country-grid');
    const visitedCountSpan = document.getElementById('visited-count');
    const searchInput = document.getElementById('country-search');
    const loadingModal = document.getElementById('loading-modal');

    let visitedDataFromGAS = {}; // GASから取得したデータを保持する変数 ([国名]: 日付 の形式)

    // GASから訪問記録を取得
    async function fetchVisitedCountriesFromGAS() {
        try {
            const response = await fetch(GAS_WEB_APP_URL);
            if (!response.ok) {
                // エラーレスポンスの内容も取得試行
                let errorBody = "詳細不明";
                try {
                    errorBody = await response.text();
                } catch(e) { /* ignore */ }
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
            }
            const data = await response.json(); // [[国名1, 日付1], [国名2, 日付2], ...] の形式

            // エラーがGASから返された場合
            if (data.error) {
                 console.error("Error fetching data from GAS:", data.error);
                 alert(`スプレッドシートからのデータ取得に失敗しました: ${data.error}`);
                 return {};
            }

            // {[国名]: 日付} の形式に変換
            const formattedData = {};
            if (Array.isArray(data)) {
                data.forEach(item => {
                    if (item.length >= 2 && item[0]) { // 国名があることを確認
                        formattedData[item[0]] = item[1] || ''; // 日付が空でも格納
                    }
                });
            }
            return formattedData;
        } catch (error) {
            console.error("Error fetching visited countries:", error);
            alert(`スプレッドシートとの通信中にエラーが発生しました: ${error.message}`);
            return {}; // エラー時は空のオブジェクトを返す
        }
    }

    // GASに訪問記録を保存/更新/削除
    async function saveVisitedCountryToGAS(country, date) {
        loadingModal.style.display = 'flex';
        try {
            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                // mode: 'no-cors', // 基本的に不要。CORSエラーが出る場合の最終手段だが、GAS側で対応推奨
                cache: 'no-cache', // キャッシュさせない
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // GASのdoPostはデフォルトでこの形式を想定しやすい
                },
                // bodyは URLSearchParams を使うか、JSON.stringifyして Content-Type を application/json にする
                // 今回はGAS側の JSON.parse(e.postData.contents) に合わせる
                 headers: {
                     'Content-Type': 'text/plain;charset=utf-8', // GASの JSON.parse(e.postData.contents) 用
                 },
                body: JSON.stringify({ country: country, date: date || '' }), // 日付がない場合は空文字

            });

            // レスポンスをJSONとしてパース (GASがJSONを返すため)
            const result = await response.json();

            if (!result || result.success === undefined) {
                // 想定外のレスポンス形式の場合
                 throw new Error('GASからの応答が不正です。');
            }

            if (!result.success) {
                 throw new Error(result.error || '不明なエラーが発生しました。');
            }

            console.log('Save result:', result.message); // 保存成功メッセージ
             // 保存成功したらローカルのデータも更新
            if (date) {
                visitedDataFromGAS[country] = date;
            } else {
                delete visitedDataFromGAS[country];
            }
            updateVisitedCount(); // 保存後にカウントを更新
            return true; // 成功したことを示す

        } catch (error) {
            console.error("Error saving visited country:", error);
            alert(`スプレッドシートへの保存中にエラーが発生しました: ${error.message}`);
            return false; // 失敗したことを示す
        } finally {
            loadingModal.style.display = 'none';
        }
    }

    // 訪問国数を更新
    function updateVisitedCount() {
        // 引数なしで、グローバル変数 visitedDataFromGAS を参照するように変更
        visitedCountSpan.textContent = Object.keys(visitedDataFromGAS).length;
    }

    // 国の検索機能
    function filterCountries(searchText) {
        const items = document.querySelectorAll('.country-item');
        items.forEach(item => {
            const countryNameElement = item.querySelector('.country-name');
            const capitalNameElement = item.querySelector('.country-capital');
            // 要素が存在するか確認
            const countryName = countryNameElement ? countryNameElement.textContent.toLowerCase() : '';
            const capitalName = capitalNameElement ? capitalNameElement.textContent.toLowerCase() : '';
            const searchLower = searchText.toLowerCase();

            if (countryName.includes(searchLower) || capitalName.includes(searchLower)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // 国リストを初期化 (GASから取得したデータを使うように変更)
    function initializeCountryList() {
        // 引数を削除し、グローバル変数 visitedDataFromGAS を参照

        // countries 変数がグローバルスコープまたはこのファイルのどこかで定義されていることを確認
        // もし js/countries.js で定義されているなら、その読み込みが完了している必要がある
        if (typeof countries === 'undefined') {
            console.error("国データ(countries)が読み込まれていません。");
            alert("国データの読み込みに失敗しました。ページを再読み込みしてください。");
            return;
        }

        // 国を五十音順にソート
        const sortedCountries = [...countries].sort((a, b) =>
            a.country.localeCompare(b.country, 'ja')
        );

        // 国リストをクリア
        countryGrid.innerHTML = '';

        // 各国のアイテムを作成
        sortedCountries.forEach(countryInfo => {
             if (!countryInfo || !countryInfo.country) return; // データ形式チェック

            const item = document.createElement('div');
            const countryName = countryInfo.country;
            item.className = 'country-item' + (visitedDataFromGAS[countryName] ? ' visited' : '');

            const rawVisitDate = visitedDataFromGAS[countryName] || ''; // 元の日付データを取得
            const visitDate = formatDateToYyyyMmDd(rawVisitDate); // yyyy-MM-dd形式にフォーマット

            item.innerHTML = `
                <span class="visited-mark">●</span>
                <div class="country-info">
                    <div class="country-name">${countryName}</div>
                    <div class="country-capital">${countryInfo.capital || ''}</div>
                </div>
                <input type="date" class="visit-date" value="${visitDate}"
                       ${visitDate ? 'data-original-date="' + visitDate + '"' : ''}>
            `;

            // 日付変更イベントを追加
            const dateInput = item.querySelector('.visit-date');

            // inputイベント: 値が変更されるたび (特にクリア操作を検知するため)
            dateInput.addEventListener('input', async function() {
                const currentDate = this.value;
                const originalDate = this.getAttribute('data-original-date') || '';

                // 値が空になり、元々は日付が入っていた場合 (クリア操作)
                if (currentDate === '' && originalDate !== '') {
                    console.log(`Input event: Date cleared for ${countryName}`); // ログ追加
                    const success = await saveVisitedCountryToGAS(countryName, null); // nullを渡して削除

                    if (success) {
                        item.remove(); // UIから項目を削除
                    } else {
                        // 保存失敗時: GAS側でalertが出るのでここでは何もしない
                        // 値を元に戻すと操作性が悪くなる可能性があるので、ここでは戻さない
                    }
                }
            });

            // changeイベント: 値の変更が確定したとき (主に日付が選択されたとき)
            dateInput.addEventListener('change', async function() {
                const newDate = this.value; // yyyy-MM-dd 形式のはず
                const originalDate = this.getAttribute('data-original-date') || '';

                // 値が空の場合はinputイベントで処理するので、ここでは何もしない
                if (!newDate) {
                    console.log(`Change event: Date is empty, handled by input event.`); // ログ追加
                    // もしinputイベントで拾いきれない場合を考慮し、ここでも削除処理を入れる選択肢もあるが、一旦inputに任せる
                    // if (originalDate !== '') { // 元々日付があった場合のみ
                    //     const success = await saveVisitedCountryToGAS(countryName, null);
                    //     if (success) item.remove();
                    // }
                    return;
                }

                // 値が変更された場合 (新規選択または日付変更)
                if (newDate !== originalDate) {
                    console.log(`Change event: Date changed for ${countryName} to ${newDate}`); // ログ追加
                    const success = await saveVisitedCountryToGAS(countryName, newDate);

                    if (success) {
                        // GASへの保存が成功した後にUIを更新
                        item.classList.add('visited');
                        this.setAttribute('data-original-date', newDate);
                    } else {
                        // 保存失敗時はUIを元に戻す
                        this.value = originalDate; // 値を入力前の状態に戻す
                        // alert は saveVisitedCountryToGAS 内で表示される
                    }
                } else {
                     console.log(`Change event: Date not changed for ${countryName}`); // ログ追加
                }
            });

            countryGrid.appendChild(item);
        });

        // updateVisitedCount は初期化の最後に呼ばれる (fetch後に移動)
    }

    // 検索イベントリスナーを追加 (変更なし)
    searchInput.addEventListener('input', function() {
        filterCountries(this.value);
    });

    // ----- 初期化処理 -----
    try {
        // 0. 国データ(countries.js)がロードされているか少し待つ (より堅牢な方法は別途検討)
        // 簡単な遅延を入れる (もしcountries.jsの読み込みが遅い場合)
        await new Promise(resolve => setTimeout(resolve, 100));

        // 1. GASからデータを非同期で取得
        visitedDataFromGAS = await fetchVisitedCountriesFromGAS();

        // 2. 取得したデータを使ってリストを初期化
        initializeCountryList(); // visitedDataFromGAS を内部で参照

        // 3. 取得したデータを使って訪問国数を更新
        updateVisitedCount(); // visitedDataFromGAS を内部で参照

    } catch (error) {
        // fetchVisitedCountriesFromGAS 内で alert を出すのでここでは追加の処理は不要かも
        console.error("Initialization failed:", error);
        // 必要であれば、ユーザーに追加のエラーメッセージを表示
        countryGrid.innerHTML = '<p style="color: red;">データの読み込みに失敗しました。時間をおいて再度お試しください。</p>';
    }
    // ---------------------

}); 