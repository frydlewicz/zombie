import fetch from 'node-fetch';

import config from '../config.json';
import { getTimestampOfMidnight } from './helpers';

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

    try {
        const res = await fetch(config.itemsUrl);

        if (res.status !== 200) {
            throw new Error('Cannot fetch from heroku!');
        }

        const json = await res.json();

        if (typeof json.timestamp !== 'number'
            || typeof json.items !== 'object') {
            throw new Error('Incorrect data types!');
        }

        cache.timestamp = json.timestamp;
        cache.items = json.items;
    } catch (error) {
        console.error(error);
    }

    return cache.items;
}
