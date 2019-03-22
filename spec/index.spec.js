const { forEach, limit } = require('../index');
const { expect } = require('chai');
const { spy } = require('sinon');


describe('forEach()', () => {
    it('returns a reference to the original passed array', () => {
        const inputArr = ['a', 'b', 'c'];
        expect(forEach(inputArr)).to.equal(inputArr);
    });
    it('invokes the iteratee as many times as array length', () => {
        let spiedIteratee = spy();
        let bears = ['yogi', 'rupert', 'paddington'];
        forEach(bears, spiedIteratee);
        expect(spiedIteratee.callCount).to.equal(bears.length);
        spiedIteratee = spy();
        alphabet = ['a', 'b', 'c', 'd', 'e'];
        forEach(alphabet, spiedIteratee);
        expect(spiedIteratee.callCount).to.equal(alphabet.length);
    });
    it('invokes the iteratee with item in array, index, and collection on each iteration', () => {
        let spiedIteratee = spy();
        let bears = ['yogi', 'rupert', 'paddington'];
        forEach(bears, spiedIteratee);
        expect(spiedIteratee.args[0]).to.eql(['yogi', 0, bears]);
        expect(spiedIteratee.args[1]).to.eql(['rupert', 1, bears]);
        expect(spiedIteratee.args[2]).to.eql(['paddington', 2, bears]);
    });
});

describe('limit', () => {
    it('returns a new function', () => {
        const inputFunc = function () { };
        expect(limit(inputFunc)).to.not.equal(inputFunc)
    });
    it('returns invocation of the original function', () => {
        let inputFunc = () => 'hello world';
        let limitedFunc = limit(inputFunc);
        expect(limitedFunc()).to.equal(inputFunc())
        inputFunc = () => 42;
        limitedFunc = limit(inputFunc);
        expect(limitedFunc()).to.equal(inputFunc())
    });
    it('returned function passes all its arguments to the original function', () => {
        let spyFunc = spy();
        let limitedFunc = limit(spyFunc);
        limitedFunc(10, 42, 'a', 'b');
        expect(spyFunc.args[0]).to.eql([10, 42, 'a', 'b']);
    });
    it('original function is not invoked when returned function is invoked beyond the limit', () => {
        let spyFunc = spy();
        let limitedFunc = limit(spyFunc, 3);
        limitedFunc(10, 32);
        limitedFunc(35, 8, 3);
        limitedFunc('a', 'b');
        limitedFunc('x', 42);
        limitedFunc(10, 32);
        limitedFunc(35, 8, 3);
        expect(spyFunc.callCount).to.equal(3);
    });
})