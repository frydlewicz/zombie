const fetch = require('node-fetch');

const config = require('../config.json');

const { baseUrl } = config;

test('GET /api/test', async (done) => {
    try {
        const res = await fetch(`${baseUrl}/api/test`);
        const json = await res.json();

        expect(typeof json).toBe('object');
        expect(json.status).toBe('success');
        done();
    } catch (error) {
        done(error);
    }
});

test('POST /api/test', async (done) => {
    try {
        const res = await fetch(`${baseUrl}/api/test`, {
            method: 'post'
        });
        const json = await res.json();

        expect(typeof json).toBe('object');
        expect(json.status).toBe('success');
        done();
    } catch (error) {
        done(error);
    }
});
