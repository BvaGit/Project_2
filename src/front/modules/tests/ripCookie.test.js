/**
 * @jest-environment jsdom
 */

import checkCookie from '../main-page/ripCookie';
import { getCookie } from '../main-page/ripCookie';

describe('checkCookie', function () {
    it('checkCookie should be defined', function () {
        expect(checkCookie).toBeDefined();
    })
    it('checkCookie should be function', function () {
        expect(typeof checkCookie).toBe('function');
    })
})

describe('getCookie', function () {
    it('getCookie should be defined', function () {
        expect(getCookie).toBeDefined();
    })
    it('getCookie should be function', function () {
        expect(typeof getCookie).toBe('function');
    })
})
