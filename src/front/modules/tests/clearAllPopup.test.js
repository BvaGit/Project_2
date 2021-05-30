/**
 * @jest-environment jsdom
 */

 import  clearAllPopup  from '../main-page/clearAllPopup';

 describe('clearAllPopup', function () {
     it('should be defined', function () {
         expect(clearAllPopup).toBeDefined();
     })
     it('clearAllPopup should be function', function () {
         expect(typeof clearAllPopup).toBe('function');
     })
})
