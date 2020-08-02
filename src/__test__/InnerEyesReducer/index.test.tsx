import { innerEyesReducer } from '../../context/reducer';


describe('Inner Eyes reducer', () => {
    it('should test the default case', () => {
        const initState = {};
        const result = innerEyesReducer(initState, { type: '', payload: { name: '' } });
        expect(result).toEqual(initState);
    });
});
