///////////////////////
// Weather API Setting
// Author: Montenjiku
// Data 25.03.23
///////////////////////

// 厳格モード
"use strict";

import WeatherAPI from './api/WeatherAPI';
import WeatherDataProcessor from './models/WeatherDataProcessor';
import { APICurrentResponse, APIResponseForecast } from './utils/WeatherType';
import WeatherUIRenderer from './views/WeatherUIRenderer';
import { config } from '@config';
/*--------------------------------
    Initial Setting
--------------------------------*/

/**
 * アプリ全体の表示エリア
 * @type {element}
 */
const elemApp = document.getElementById('app') as HTMLElement;

/**
 * 外部オブジェクトからAPIキーを格納
 * @type {string}
 */
const WEATHER_API_KEY: string = config.apikey;
console.log(WEATHER_API_KEY);

/**
 * WeatherAppクラス
 * メインのアプリケーションクラス
 * 他のクラスのインスタンスを保持し、連携を管理
 */
class WeatherApp{
    appElem:HTMLElement;
    weatherAPI: WeatherAPI;
    weatherDataProcessor: WeatherDataProcessor;
    weatherUIRenderer: WeatherUIRenderer;

    constructor(appElem: HTMLElement, apikey: string){
        /**
         * アプリを格納する要素
         * @type {element}
         */
        this.appElem = appElem;
        /**
         * APIからデータを取得するクラス
         * @type {object}
         */
        this.weatherAPI = new WeatherAPI(apikey);
        /**
         * 生のAPIデータを使いやすい形式に変換するクラス
         * @type {object}
         */
        this.weatherDataProcessor = new WeatherDataProcessor();
        /**
         * 各UI要素の生成と更新メソッドを持つクラス
         * @type {object}
         */
        this.weatherUIRenderer = new WeatherUIRenderer();
    }
    /**
     * 初期化
     */
    init(): void {
        this.weatherUIRenderer.removeParentChildElem(this.appElem);
        this.weatherUIRenderer.renderForm(this.appElem);
        this.weatherUIRenderer.renderBody(this.appElem);
        this.setupEventListener();
    }

    /**
     * イベントリスナー登録
     */
    setupEventListener(): void{
        const elemSearchInput = document.querySelector('.search-form') as HTMLFormElement;
        elemSearchInput.addEventListener('submit', (e) => {
            void  this.searchCity(e);
        });
        const elemForecastWeaherArea = document.querySelector('.forecast-weather-area')as HTMLElement;
        elemForecastWeaherArea.addEventListener(this.eventType(), (e: Event) => {
            const target = e.target as HTMLElement;
            if(target.classList.contains('tab-item')){
                this.changeTab(e);
            }
        });
    }
    /**
     * 入力フォームから取得した都市名で天気予報を表示
     * @param {object} e イベント
     */
    async searchCity(e: Event): Promise<void>{
        // console.log(`都市名は${name}です`);
        e.preventDefault();
        const iptCitySearch = document.getElementById('ipt-city-search') as HTMLInputElement;
        //console.log(iptCitySearch);
        const searchText = iptCitySearch.value;
        iptCitySearch.value = '';
        // console.log(`都市名は${searchText}です`);
        const elemCurrentWeaherArea = document.querySelector('.cur-weather-area') as HTMLElement;
        const elemForecastWeaherArea = document.querySelector('.forecast-weather-area') as HTMLElement;
        try{
            this.weatherUIRenderer.renderLoading(elemCurrentWeaherArea);
            const currentData = await this.weatherAPI.fetchCurrentWeatherInfo(searchText) as APICurrentResponse;
            const currentUseData = this.weatherDataProcessor.setCurrentWeatherInfo(currentData);
            this.weatherUIRenderer.renderCurrentWeather(elemCurrentWeaherArea, currentUseData);
        }
        catch {
            console.log('Current Data Error!');
            this.weatherUIRenderer.renderError(elemCurrentWeaherArea);
        }
        try{
            this.weatherUIRenderer.renderLoading(elemForecastWeaherArea);
            const forecastData = await this.weatherAPI.fetchForecastWeatherInfo(searchText) as APIResponseForecast;
            const forecastUseData = this.weatherDataProcessor.setDaysData(forecastData);
            this.weatherUIRenderer.renderForecastWrap(elemForecastWeaherArea, forecastUseData);
        }
        catch {
            console.log('Forecast Data Error!');
            this.weatherUIRenderer.renderError(elemForecastWeaherArea);
        }
        // console.log(forecastUseData);
    }

    /**
     * 日付タブの切替
     * @param {object} e イベント
     */
    changeTab(e: Event): void{
        // console.log(typeof(e));
        const elTabItems = document.querySelectorAll('.tab-item');
        const elTabContents = document.querySelectorAll('.tab-contents');
        const target = e.target as HTMLElement;
        const tabId = target.dataset.tabid as string;
        const thisEl = document.getElementById(tabId) as HTMLElement;
        // console.log(tabId);
        elTabContents.forEach((el) => {
            el.classList.remove('tab-contents--is-active');
        });
        elTabItems.forEach((el) => {
            el.classList.remove('tab-item--is-active');
        });
        target.classList.add('tab-item--is-active');
        thisEl.classList.add('tab-contents--is-active');
    }

    /**
     * タッチデバイス以外にundefinedを格納
     * @function
     */
    eventType(): ('click' | 'touchstart'){
        const _click = window.ontouchstart === undefined ? 'click' : 'touchstart';
        return _click;
    }
}

const weatherApp = new WeatherApp(elemApp, WEATHER_API_KEY);
weatherApp.init();