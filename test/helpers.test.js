const { getTimestampOfMidnight } = require('../services/helpers.js');

test('getTimestampOfMidnight', () => {
    const midnight = getTimestampOfMidnight();
    const now = Date.now();

    expect(midnight).toBeLessThanOrEqual(now);
    expect(midnight).toBeGreaterThan(now - 1000 * 60 * 60 * 24);
});
