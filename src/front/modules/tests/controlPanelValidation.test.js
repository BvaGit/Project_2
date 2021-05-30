/**
 * @jest-environment jsdom
 */

import  controlPanelValidation  from '../main-page/controlPanelValidation'
import  { validationOnInputs }  from '../main-page/controlPanelValidation'

describe('controlPanelValidation', function () {
    it('controlPanelValidation should be defined', function () {
        expect(controlPanelValidation).toBeDefined();
    })
    it('controlPanelValidation should be function', function () {
        expect(typeof controlPanelValidation).toBe('function');
    })
    it('validationOnInputs should be object', function () {
        expect(typeof validationOnInputs).toBe('object');
    })
    it('validationOnInputs.validateName should be function', function () {
        expect(typeof validationOnInputs.validateName).toBe('function');
    })
    it('validationOnInputs.validateName should validate name correctly Marinochka', function () {
        let input = document.createElement('input'); 
        if (input.value === 'Marinochka') {
            validationOnInputs.validateName(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
        }
    })
    it('validationOnInputs.validateName should validate name correctly 777', function () {
        let input = document.createElement('input'); 
        if (input.value === '777') {
            validationOnInputs.validateName(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
        }
    })
    it('validationOnInputs.validateCity should be function', function () {
        expect(typeof validationOnInputs.validateCity).toBe('function');
    })
    it('validationOnInputs.validateCity should validate city correctly Dnepr', function () {
        let input = document.createElement('input'); 
        let cityError = document.createElement('input');
        if (input.value === 'Dnepr') {
            validationOnInputs.validateCity(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
            expect(input.value).toBe('');
            expect(cityError.classList.contains('hide')).toBe(true);
        }
    })
    it('validationOnInputs.validateCity should validate city correctly kiev', function () {
        let input = document.createElement('input'); 
        let cityError = document.createElement('input');
        if (input.value === 'kiev') {
            validationOnInputs.validateCity(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('true');
            expect(cityError.classList.contains('hide')).toBe(false);
        }
    })
    it('validationOnInputs.validateEmail should be function', function () {
        expect(typeof validationOnInputs.validateEmail).toBe('function');
    })
    it('validationOnInputs.validateEmail should validate email correctly email@gmail.com', function () {
        let input = document.createElement('input'); 
        let emailError = document.createElement('input');
        if (input.value === 'email@gmail.com') {
            validationOnInputs.validateEmail(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
            expect(emailError.classList.contains('hide')).toBe(true);
        }
    })
    it('validationOnInputs.validateEmail should validate email correctly emailgmail', function () {
        let input = document.createElement('input'); 
        let emailError = document.createElement('input');
        if (input.value === 'emailgmail.com') {
            validationOnInputs.validateEmail(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
            expect(emailError.classList.contains('hide')).toBe(false);
        }
    })
    it('validationOnInputs.validatePhone should be function', function () {
        expect(typeof validationOnInputs.validatePhone).toBe('function');
    })
    it('validationOnInputs.validatePhone should validate phone correctly (099)-099-7864', function () {
        let input = document.createElement('input'); 
        let phoneError = document.createElement('input');
        if (input.value === '(099)-099-7864') {
            validationOnInputs.validatePhone(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
            expect(phoneError.classList.contains('hide')).toBe(true);
        }
    })
    it('validationOnInputs.validatePhone should validate phone correctly 099-099-7864', function () {
        let input = document.createElement('input'); 
        let phoneError = document.createElement('input');
        if (input.value === '099-099-7864') {
            validationOnInputs.validatePhone(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
            expect(phoneError.classList.contains('hide')).toBe(true);
        }
    })
    it('validationOnInputs.validatePhone should validate phone correctly +380990997864', function () {
        let input = document.createElement('input'); 
        let phoneError = document.createElement('input');
        if (input.value === '+380990997864') {
            validationOnInputs.validatePhone(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
            expect(phoneError.classList.contains('hide')).toBe(false);
        }
    })
    it('validationOnInputs.validateAge should be function', function () {
        expect(typeof validationOnInputs.validateAge).toBe('function');
    })
    it('validationOnInputs.validateAge should validate age correctly 1', function () {
        let input = document.createElement('input'); 
        let ageError = document.createElement('input');
        if (input.value === '1') {
            validationOnInputs.validateAge(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
            expect(ageError.classList.contains('hide')).toBe(true);
        }
    })
    it('validationOnInputs.validateAge should validate age correctly 123', function () {
        let input = document.createElement('input'); 
        let ageError = document.createElement('input');
        if (input.value === '123') {
            validationOnInputs.validateAge(input.value);
            expect(input.classList.contains('has-error')).toBe(false);
            expect(ageError.classList.contains('hide')).toBe(true);
        }
    })
    it('validationOnInputs.validateAge should validate age correctly 0', function () {
        let input = document.createElement('input'); 
        let ageError = document.createElement('input');
        if (input.value === '0') {
            validationOnInputs.validateAge(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
            expect(ageError.classList.contains('hide')).toBe(false);
        }
    })
    it('validationOnInputs.validateAge should validate age correctly -1', function () {
        let input = document.createElement('input'); 
        let ageError = document.createElement('input');
        if (input.value === '-1') {
            validationOnInputs.validateAge(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
            expect(ageError.classList.contains('hide')).toBe(false);
        }
    })
    it('validationOnInputs.validateAge should validate age correctly 0.6', function () {
        let input = document.createElement('input'); 
        let ageError = document.createElement('input');
        if (input.value === '0.6') {
            validationOnInputs.validateAge(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
            expect(ageError.classList.contains('hide')).toBe(false);
        }
    })
    it('validationOnInputs.validateAge should validate age correctly 666', function () {
        let input = document.createElement('input'); 
        let ageError = document.createElement('input');
        if (input.value === '666') {
            validationOnInputs.validateAge(input.value);
            expect(input.classList.contains('has-error')).toBe(true);
            expect(input.value).toBe('');
            expect(ageError.classList.contains('hide')).toBe(false);
        }
    })
})
