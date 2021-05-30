import valid from "../valid"

describe('valid', function () {
    it('should be defined', function () {
        expect(valid).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof valid).toBe('function');
    })
    it('should return false if login and password are empty', function () {
        expect(valid("", "")).toBe(false);
        expect(valid("", "")).not.toBe(true);
    })
    it('should return false if login and password are not in required length', function () {
        var invalidLogin = "379156347819-56387810563486183"
        var invalidPass = "379156347819-56387810563486183"
        expect(valid(invalidLogin, invalidPass)).toBe(false);
        expect(valid(invalidLogin, invalidPass)).not.toBe(true);
    })
    it('should return false if login and password have rejected symbols', function () {
        expect(valid("/*-*/", "/*-*/*-")).toBe(false);
        expect(valid("/*-*/{}}{G]{s]ga", "/*-*/*-{}{}{}{}{S}G{P")).toBe(false);
    })
    it('should work with proper symbols', function () {
        expect(valid("Aboba", "Abiba")).toBe(true);
        expect(valid("Aboba", "Abiba")).not.toBe(false);
    })
})