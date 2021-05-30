/**
 * @jest-environment jsdom
 */

 import  settingsPopup  from '../main-page/settingsPopup'

 describe('settingsPopup', function () {
     it('settingsPopup should be defined', function () {
         expect(settingsPopup).toBeDefined();
     })
     it('supportMain should be function', function () {
         expect(typeof settingsPopup).toBe('function');
     })
 })