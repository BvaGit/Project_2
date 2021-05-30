/**
 * @jest-environment jsdom
 */

import setTheme from '../main-page/themeHandler'
import themeHandler from '../main-page/themeHandler'

describe('setTheme', function () {
    it('should be defined', function () {
        expect(setTheme).toBeDefined();
    })
    it('setTheme should be function', function () {
        expect(typeof setTheme).toBe('function');
    })
    it('setTheme should set dark theme', function () {
        let div = document.createElement('div');
        let option = document.createElement('option');
        const darkThemeClass = 'theme-dark';
        if (option.value === 'theme-dark') {
            setTheme(div, option.value)
            expect(div.classList.contains(`general ${darkThemeClass}`)).toBe(true);
        } 
    })
    it('setTheme should set light theme', function () {
        let div = document.createElement('div');
        let option = document.createElement('option');
        const lightThemeClass = 'theme-light';
        if (option.value === 'theme-light') {
            setTheme(div, option.value)
            expect(div.classList.contains(`general ${lightThemeClass}`)).toBe(true);
        } 
    })
})
describe('themeHandler', function () {
    it('should be defined', function () {
        expect(themeHandler).toBeDefined();
    })
    it('setTheme should be function', function () {
        expect(typeof themeHandler).toBe('function');
    })
})
