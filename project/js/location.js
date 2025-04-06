// 位置情報関連の機能
class LocationService {
    constructor() {
        this.currentPosition = null;
        this.watchId = null;
    }

    // 現在位置の取得
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('位置情報がサポートされていません。'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => {
                    this.currentPosition = position;
                    resolve(position);
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    // 位置情報の監視開始
    startWatching(callback) {
        if (!navigator.geolocation) {
            console.error('位置情報がサポートされていません。');
            return;
        }

        this.watchId = navigator.geolocation.watchPosition(
            position => {
                this.currentPosition = position;
                if (callback) callback(position);
            },
            error => {
                console.error('位置情報の取得に失敗しました:', error);
            }
        );
    }

    // 位置情報の監視停止
    stopWatching() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    // 2点間の距離を計算（Haversine formula）
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 地球の半径（km）
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // 度数をラジアンに変換
    toRad(degrees) {
        return degrees * (Math.PI/180);
    }
}

// グローバルな位置情報サービスインスタンスを作成
window.locationService = new LocationService();

// 位置情報取得と飲食店検索の開始
async function startLocationSearch() {
    try {
        const position = await window.locationService.getCurrentPosition();
        searchRestaurants(position.coords.latitude, position.coords.longitude);
    } catch (error) {
        console.error('位置情報の取得に失敗しました:', error);
        alert('位置情報の取得に失敗しました。位置情報の使用を許可してください。');
    }
} 