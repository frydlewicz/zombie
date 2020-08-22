const fetch = require('node-fetch');

const config = require('../config.json');
const { getTimestampOfMidnight } = require('./helpers');

const cache = {
    timestamp: 0,
    items: [],
};

async function getItems() {
    if (cache.timestamp >= getTimestampOfMidnight()) {
        return cache.items;
    }

    try {
        const res = await fetch(config.itemsUrl);

        if (res.status !== 200) {
            throw new Error('Cannot fetch from Heroku!');
        }

        const json = await res.json();

        if (!json || !json.timestamp || !json.items) {
            throw new Error('Incorrect data types!');
        }

        cache.timestamp = json.timestamp;
        cache.items = json.items;
    } catch (error) {
        console.error(error);
    }

    return cache.items;
}

module.exports = { getItems };
