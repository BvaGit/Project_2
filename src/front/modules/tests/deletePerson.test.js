/**
 * @jest-environment jsdom
 */

import  deletePerson  from '../main-page/deletePerson';
import  {clearInputs}  from '../main-page/deletePerson';

describe('deletePerson', function () {
    it('deletePerson should be defined', function () {
        expect(deletePerson).toBeDefined();
    })
    it('deletePerson should be function', function () {
        expect(typeof deletePerson).toBe('function');
    })
})
describe('clearInputs', function () {
    it('clearInputs should be defined', function () {
        expect(clearInputs).toBeDefined();
    })
    it('clearInputs should be function', function () {
        expect(typeof clearInputs).toBe('function');
    })
    it('clearInputs should clear inputs', function () {
        const params = {
            firstName: document.createElement('input'),
            lastName: document.createElement('input'),
            age: document.createElement('input'),
            city: document.createElement('input'),
            phoneNumber: document.createElement('input'),
            email: document.createElement('input'),
            companyName: document.createElement('input')
        }
        params.firstName.value = 'lalala';
        params.lastName.value = 'lalala';
        params.age.value = 'lalala';
        params.city.value = 'lalala';
        params.phoneNumber.value = 'lalala';
        params.email.value = 'lalala';
        params.companyName.value = 'lalala';
        clearInputs(params);
        expect(params.firstName.value).toBe('');
        expect(params.lastName.value).toBe('');
        expect(params.age.value).toBe('');
        expect(params.city.value).toBe('');
        expect(params.phoneNumber.value).toBe('');
        expect(params.email.value).toBe('');
        expect(params.companyName.value).toBe('');
    })
})
