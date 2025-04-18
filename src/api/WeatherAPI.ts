///////////////////////
// Weather API Module
// Author: Montenjiku
// Data 25.04.04
///////////////////////
import { APIResponseForecast, APICurrentResponse } from '../utils/WeatherType';
/**
 * APIとの通信を担当
 * 現在の天気と予報データの取得メソッドを持つ
 */
class WeatherAPI{
    apikey: string;
    
    constructor(apikey: string) {
        /**
         * APIキー格納用
         * @type {string}
         */
        this.apikey = apikey;
    }

    /**
     * fetch APIで現在の天気データを取得
     * @param {string} url データ取得用URL
     * @returns 
     */
    async fetchData<T>(url: string): Promise<T | undefined>{
        try{
            const response = await fetch(url);
            // console.log(response);
            if(!response.ok){
                throw new Error('データの取得に失敗しました');
            }
            return await response.json() as T;
        } catch(e: unknown) {
            if (e instanceof Error) {
                console.log('エラー：' + e.message);
            } else {
                console.log('不明なエラーが発生しました');
            }
            return undefined;
        }
    }

    /**
     * 現在の天気情報を読み込む
     * @param {string} cityName 都市名（郵便番号でも可）
     * @returns 
     */
    async fetchCurrentWeatherInfo(cityName: string): Promise<APICurrentResponse | undefined>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${this.apikey}&lang=ja`; // API取得用URL
        const fetchData = await this.fetchData<APICurrentResponse>(url);
        return fetchData;
    }

    /**
     * 3時間ごとの天気予報データを読み込む
     * @param {string} cityName 都市名（郵便番号でも可）
     * @returns 
     */
    async fetchForecastWeatherInfo(cityName: string): Promise<APIResponseForecast | undefined>{
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${this.apikey}&lang=ja`; // API取得用URL
        const fetchData = await this.fetchData<APIResponseForecast>(url);
        return fetchData;
    }
}

export default WeatherAPI;