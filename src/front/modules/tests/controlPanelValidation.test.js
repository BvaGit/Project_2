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
    it('validationOnInputs.validateCity should be function', function () {
        expect(typeof validationOnInputs.validateCity).toBe('function');
    })
    it('validationOnInputs.validateEmail should be function', function () {
        expect(typeof validationOnInputs.validateEmail).toBe('function');
    })
    it('validationOnInputs.validatePhone should be function', function () {
        expect(typeof validationOnInputs.validatePhone).toBe('function');
    })
    it('validationOnInputs.validateAge should be function', function () {
        expect(typeof validationOnInputs.validateAge).toBe('function');
    })
})