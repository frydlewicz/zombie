const fetch = require('node-fetch');

const config = require('../config.json');
const { getTimestampOfMidnight } = require('./helpers');

const cache = {
    timestamp: 0,
    rates: [],
};

async function getRates() {
    if (cache.timestamp >= getTimestampOfMidnight()) {
        return cache.rates;
    }

    try {
        const res = await fetch(config.ratesUrl);

        if (res.status !== 200) {
            throw 'Cannot fetch from NBP!';
        }

        const json = await res.json();

        if (!json || !json[0] || !json[0].rates) {
            throw 'Incorrect data types!';
        }

        cache.timestamp = getTimestampOfMidnight();
        cache.rates = json[0].rates.filter(rate => config.currencies.includes(rate.code));
    } catch (error) {
        console.error(error);
    }

    return cache.rates;
}

module.exports = { getRates };
