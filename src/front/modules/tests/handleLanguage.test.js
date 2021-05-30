/**
 * @jest-environment jsdom
 */

import  handleLanguage  from '../main-page/handleLanguage';
import  {setLanguage}  from '../main-page/handleLanguage';
import  {getTranslation}  from '../main-page/handleLanguage';

describe('handleLanguage', function () {
    it('handleLanguage should be defined', function () {
        expect(handleLanguage).toBeDefined();
    })
    it('handleLanguage should be function', function () {
        expect(typeof handleLanguage).toBe('function');
    })
})
describe('setLanguage', function () {
    it('setLanguage should be defined', function () {
        expect(setLanguage).toBeDefined();
    })
    it('setLanguage should be function', function () {
        expect(typeof setLanguage).toBe('function');
    })
})
describe('getTranslation', function () {
    it('getTranslation should be defined', function () {
        expect(getTranslation).toBeDefined();
    })
    it('getTranslation should be function', function () {
        expect(typeof getTranslation).toBe('function');
    })
    it('getTranslation should get translation ua', function () {
        const select = document.createElement('select');
        select.value = 'ua';
        const uaTranslations = 'uaTranslations';
        const enTranslations = 'enTranslations';
        if (select.value === 'ua') {
            expect(getTranslation(uaTranslations, enTranslations)).toBe(uaTranslations);
        }
    })
    it('getTranslation should get translation en', function () {
        const select = document.createElement('select');
        select.value = 'en';
        const uaTranslations = 'uaTranslations';
        const enTranslations = 'enTranslations';
        if (select.value === 'en') {
            expect(getTranslation(uaTranslations, enTranslations)).toBe(enTranslations);
        }
    })
})
