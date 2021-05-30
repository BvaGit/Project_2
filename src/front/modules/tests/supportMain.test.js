/**
 * @jest-environment jsdom
 */

import  supportMain  from '../main-page/supportMain'

describe('supportMain', function () {
    it('should be defined', function () {
        expect(supportMain).toBeDefined();
    })
    it('supportMain should be function', function () {
        expect(typeof supportMain).toBe('object');
    })
    it('openPopup should be function', function () {
        expect(typeof supportMain.openPopup).toBe('function');
    })
    it('openPopup should open popup by removing class', function () {
        let element = document.createElement('span');
        element.classList.add('blue');
        supportMain.openPopup(element, 'blue')
        expect(element.classList.contains('blue')).toBe(false);
    })
    it('closePopup should be function', function () {
        expect(typeof supportMain.closePopup).toBe('function');
    })
    it('closePopup should close popup by adding class', function () {
        let element = document.createElement('span');
        supportMain.closePopup(element, 'blue')
        expect(element.classList.contains('blue')).toBe(true);
    })
    it('isEscapeKey should be function', function () {
        expect(typeof supportMain.isEscapeKey).toBe('function');
    })
    it('isEscapeKey should be escape key by click', function () {
        let event = new KeyboardEvent('keydown', {'keyCode': 27});
        document.dispatchEvent(event);
        expect(supportMain.isEscapeKey(event)).toBe(true);
    })
    it('exitOnEscape should be function', function () {
        let event = new KeyboardEvent('keydown', {'keyCode': 27});
        document.dispatchEvent(event);
        let element = document.createElement('span');
        supportMain.closePopup(element, 'blue')
        expect(element.classList.contains('blue')).toBe(true);
    })
    it('handlePopupClick should be function', function () {
        expect(typeof supportMain.handlePopupClick).toBe('function');
    })
    it('clearInputs should clear inputs', function () {
        expect(typeof supportMain.clearInputs).toBe('function');
    })
    it('clearInputs should be function', function () {
        let inputs = [document.createElement('input'), document.createElement('input')];
        expect(supportMain.clearInputs()).toBe(undefined);
        supportMain.clearInputs(inputs)
        expect(inputs[0].value).toBe('');
    })
    it('changeType should be function', function () {
        expect(typeof supportMain.changeType).toBe('function');
    })
    it('changeType should change types of inputs', function () {
        let inputs = [document.createElement('input'), document.createElement('input')];
        inputs[0].type = 'text';
        inputs[1].type = 'text';
        supportMain.changeType(inputs)
        expect(inputs[0].type).toBe('password');
        expect(inputs[1].type).toBe('password');
        supportMain.changeType(inputs)
        expect(inputs[0].type).toBe('text');
        expect(inputs[1].type).toBe('text');
    })
    it('resetPasswordType should be function', function () {
        expect(typeof supportMain.resetPasswordType).toBe('function');
    })
    it('resetPasswordType should change type on password', function () {
        let inputs = [document.createElement('input'), document.createElement('input')];
        inputs[0].type = 'text';
        inputs[1].type = 'text';
        supportMain.resetPasswordType(inputs)
        expect(inputs[0].type).toBe('password');
        expect(inputs[1].type).toBe('password');
        supportMain.resetPasswordType(inputs)
        expect(inputs[0].type).toBe('password');
        expect(inputs[1].type).toBe('password');
    })
})
