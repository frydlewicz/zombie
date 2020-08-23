const fetch = require('node-fetch');

const config = require('../config.json');

const { baseUrl } = config;

test('GET /api/healthcheck', async done => {
    try {
        const res = await fetch(`${baseUrl}/api/healthcheck`);
        const json = await res.json();

        expect(typeof json).toBe('object');
        expect(json.status).toBe('success');
        done();
    } catch (error) {
        done(error);
    }
}, 10000);
