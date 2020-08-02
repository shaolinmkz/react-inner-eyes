export const isExist = (name: string, state: {}) => !!Object.keys(state).find(val => val === name);

export const doNothingFunc = () => {};
