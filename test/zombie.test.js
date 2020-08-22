const {
    getZombies, getZombie,
    createZombie, updateZombie, deleteZombie,
    deleteAll,
} = require('../model/zombie.js');

test('operations on non-existent zombie', async (done) => {
    deleteAll();

    try {
        getZombies();
        done('expected throw error');
    } catch (_) { }

    try {
        await getZombie(1);
        done('expected throw error');
    } catch (_) { }

    try {
        updateZombie(1, {});
        done('expected throw error');
    } catch (_) { }

    try {
        deleteZombie(1);
        done('expected throw error');
    } catch (_) { }

    done();
});

test('operations on just created zombie', async (done) => {
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

    done();
});
