import {getCookie} from "../request"
import {postRequest} from "../request"
import {putRequest} from "../request"
import {getRequest} from "../request"
import {deleteRequest} from "../request"

describe('getCookie', function () {
    it('should be defined', function () {
        expect(getCookie).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof getCookie).toBe('function');
    })
})
describe('postRequest', function () {
    var url = "URL"
    var obj = {}
    var getCookie = jest.fn()
    it('should be defined', function () {
        expect(postRequest).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof postRequest).toBe('function');
    })
})
describe('putRequest', function () {
    var url = "URL"
    var obj = {}
    var getCookie = jest.fn()
    it('should be defined', function () {
        expect(putRequest).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof putRequest).toBe('function');
    })
})
describe('getRequest', function () {
    var url = "URL"
    var obj = {}
    var getCookie = jest.fn()
    it('should be defined', function () {
        expect(getRequest).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof getRequest).toBe('function');
    })
})
describe('deleteRequest', function () {
    var url = "URL"
    var obj = {}
    var getCookie = jest.fn()
    it('should be defined', function () {
        expect(deleteRequest).toBeDefined();
    })
    it('should be function', function () {
        expect(typeof deleteRequest).toBe('function');
    })
})