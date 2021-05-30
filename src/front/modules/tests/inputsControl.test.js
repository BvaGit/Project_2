/**
 * @jest-environment jsdom
 */

import inputsControl from '../main-page/inputsControl';
import { clearInputsCP } from '../main-page/inputsControl';

describe('inputsControl', function () {
    it('inputsControl should be defined', function () {
        expect(inputsControl).toBeDefined();
    })
    it('inputsControl should be function', function () {
        expect(typeof inputsControl).toBe('function');
    })
})
describe('clearInputsCP', function () {
    it('clearInputsCP should be defined', function () {
        expect(clearInputsCP).toBeDefined();
    })
    it('clearInputsCP should be function', function () {
        expect(typeof clearInputsCP).toBe('function');
    })
    it('clearInputsCP should clear inputs', function () {
        const input = document.createElement('input');
        document.body.append(input);
        input.value = 'lalala';
        input.classList.add('has-error');
        const phone = document.createElement('input');
        const email = document.createElement('input');
        const age = document.createElement('input');
        const city = document.createElement('input');
        const event = {
            target: {
                blur: () => {}
            }
        };
        clearInputsCP(event, input, phone, email, age, city);
        expect(input.value).toBe('');
    })
    it('clearInputsCP should change classLists of inputs', function () {
        const input = document.createElement('input');
        document.body.append(input);
        input.value = 'lalala';
        input.classList.add('has-error');
        const phone = document.createElement('input');
        const email = document.createElement('input');
        const age = document.createElement('input');
        const city = document.createElement('input');
        const event = {
            target: {
                blur: () => {}
            }
        };
        clearInputsCP(event, input, phone, email, age, city);
        expect(phone.classList.contains('hide')).toBe(true);
        expect(email.classList.contains('hide')).toBe(true);
        expect(age.classList.contains('hide')).toBe(true);
        expect(city.classList.contains('hide')).toBe(true);
    })
})
