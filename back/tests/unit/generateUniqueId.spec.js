const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('Should 1 + 1 to be 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('Should generate an unique ID', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
