/**
 * @jest-environment jsdom
 */

 import  inputsControl  from '../main-page/inputsControl'
 import  clearInputsCP  from '../main-page/inputsControl'

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
    // it('clearInputsCP should clear inputs', function (e) {
    //     let input = document.createElement('input');
    //     document.body.append(input);
    //     input.value = 'lalala';
    //     input.classList.add('has-error');
    //     let phone = document.createElement('input');
    //     let email = document.createElement('input');
    //     let age = document.createElement('input');
    //     let city = document.createElement('input');
    //     clearInputsCP(e, input, phone, email, age, city);
    //     expect(input.value).toBe('');
    // })
})