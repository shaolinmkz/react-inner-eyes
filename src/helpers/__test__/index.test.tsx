import { isExist, doNothingFunc } from '..';

describe('isExist', () => {
    const mockState = {
        ananymous: doNothingFunc,
        ananymous2: doNothingFunc,
    };

    it('should return a boolean true', () => {
        const result = isExist('ananymous', mockState);
        expect(result).toBe(true);
    });

    it('should return a boolean false', () => {
        const result = isExist('ananymous3', mockState);
        expect(result).toBe(false);
    });

    it('should do nothing, therefore returning undefined', () => {
        const result = doNothingFunc();
        expect(result).toEqual(undefined);
    });
})

