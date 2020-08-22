import fetch from 'node-fetch';

import config from '../config.json';

const cache = {
    timestamp: 0,
    items: [],
};

function getTimestampOfMidnight() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    return Date.UTC(year, month, day);
}

export async function getItems() {
    if (cache.timestamp >= getTimestampOfMidnight()) {
        return cache.items;
    }

    const res = await fetch(config.itemsUrl);
    const json = await res.json();

    cache.timestamp = json.timestamp;
    cache.items = json.items;

    return cache.items;
}
