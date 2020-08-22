const express = require('express');

const { getItems } = require('../services/items');

const router = express.Router();

router.all('/test', (_, res) => {
    res.json({
        status: 'success',
    });
});

router.get('/items', async (_, res) => {
    const items = await getItems();

    res.json({
        timestamp: Date.now(),
        items,
    });
});

router.get('/zombies', (_, res) => {
    res.json({
        timestamp: Date.now(),
        zombies: [],
    });
});

router.get('/zombie/:id', (req, res) => {
    res.json({
        timestamp: Date.now(),
        zombie: {
            name: '',
            created_at: 0,
            items: [],
            value: {},
        }
    });
});

router.post('/zombie/:id', (req, res) => {
    res.json({
        status: 'success',
        id: 0,
    });
});

router.patch('/zombie/:id', (req, res) => {
    res.json({
        status: 'success',
    });
});

router.delete('/zombie/:id', (req, res) => {
    res.json({
        status: 'success',
    });
});

module.exports = router;
