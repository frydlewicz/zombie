const { getItems } = require('../services/items');
const { getRates } = require('../services/rates');

const zombies = {};
let nextId = 1;

function getZombies() {
    if (Object.keys(zombies).length === 0) {
        throw 'No zombie has been created!';
    }

    return Object.keys(zombies).map(id => parseInt(id));
}

async function getZombie(id) {
    if (!zombies[id]) {
        throw `Zombie ${id} does not exist!`;
    }

    const items = await getItems();
    const rates = await getRates();
    const zombie = { ...zombies[id] };

    zombie.items = zombie.items.map(id => items.find(item => item.id === id));

    const value = zombie.items.reduce((acu, item) => acu + item.price, 0);

    zombie.values = {
        PLN: value,
    };
    rates.forEach(rate => zombie.values[rate.code] = Math.round(value / rate.bid));

    return zombie;
}

function createZombie({ name, items }) {
    if (typeof name !== 'string') {
        throw 'name is required string parameter!';
    }
    if (!items || items.constructor !== Array) {
        throw 'items is required array parameter!';
    }
    if (items.length > 5) {
        throw 'You can enter max 5 items!';
    }

    zombies[nextId] = {
        createdAt: Date.now(),
        name,
        items
    };

    return nextId++;
}

function updateZombie(id, { name, items }) {
    if (!zombies[id]) {
        throw `Zombie ${id} does not exist!`;
    }
    if (items && items.constructor !== Array) {
        throw 'items must be an array!';
    }
    if (items && items.length > 5) {
        throw 'You can enter max 5 items!';
    }

    if (name) {
        zombies[id].name = name;
    }
    if (items) {
        zombies[id].items = items;
    }
}

function deleteZombie(id) {
    if (!zombies[id]) {
        throw `Zombie ${id} does not exist!`;
    }

    delete zombies[id];
}

function deleteAll() {
    Object.keys(zombies).forEach(key => delete zombies[key]);
}

module.exports = {
    getZombies, getZombie,
    createZombie, updateZombie, deleteZombie,
    deleteAll,
};
