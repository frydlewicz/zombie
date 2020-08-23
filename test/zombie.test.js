const {
    getZombies, getZombie,
    createZombie, updateZombie, deleteZombie,
    deleteAll,
} = require('../model/zombie.js');

test('operations on created zombie', async () => {
    const name = 'Zombiak';
    const items = [1, 3];
    const id = createZombie({ name, items });

    const zombies = getZombies();
    const zombie = await getZombie(id);

    expect(zombies.constructor).toBe(Array);
    expect(zombies.includes(id)).toBe(true);
    expect(zombies.includes(0)).toBe(false);

    expect(typeof zombie).toBe('object');
    expect(zombie.name).toBe(name);
    expect(zombie.items.constructor).toBe(Array);
    expect(zombie.items.length).toBe(items.length);
    expect(zombie.items[0].id).toBe(items[0]);
    expect(typeof zombie.values).toBe('object');
    expect(typeof zombie.values.PLN).toBe('number');
}, 10000);

test('operations on updated zombie', async () => {
    const name = 'Zombiak';
    const items = [1, 3];
    const id = createZombie({ name, items });

    const updatedName = 'Zombiaczek';
    const udpatedItems = [2];

    updateZombie(id, {
        name: updatedName,
        items: udpatedItems,
    });

    const zombie = await getZombie(id);

    expect(typeof zombie).toBe('object');
    expect(zombie.name).toBe(updatedName);
    expect(zombie.items.constructor).toBe(Array);
    expect(zombie.items.length).toBe(udpatedItems.length);
    expect(zombie.items[0].id).toBe(udpatedItems[0]);
}, 10000);

test('operations on deleted zombie', async (done) => {
    deleteAll();

    const name = 'Zombiak';
    const items = [1, 3];
    const id = createZombie({ name, items });

    deleteZombie(id);

    try {
        getZombies();
        done('expected throw error');
    } catch (_) { }

    try {
        await getZombie(id);
        done('expected throw error');
    } catch (_) { }

    try {
        updateZombie(id, {});
        done('expected throw error');
    } catch (_) { }

    try {
        deleteZombie(id);
        done('expected throw error');
    } catch (_) { }

    done();
}, 10000);
