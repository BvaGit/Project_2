import main from "../main";

describe('main', function () {
    it('should be defined', function () {
        expect(main).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof main).toBe('function');
    })
})
