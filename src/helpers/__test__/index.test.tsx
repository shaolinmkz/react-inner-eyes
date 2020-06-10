import { isExist } from '..';

describe('isExist', () => {
    const mockState = {
        ananymous: () => {},
        ananymous2: () => {},
    };

    it('should return a boolean true', () => {
        const result = isExist('ananymous', mockState);
        expect(result).toBe(true);
    });

    it('should return a boolean false', () => {
        const result = isExist('ananymous3', mockState);
        expect(result).toBe(false);
    });
})

