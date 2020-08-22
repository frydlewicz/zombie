const express = require('express');

const {
    getZombies, getZombie,
    createZombie, updateZombie, deleteZombie,
} = require('../model/zombie');

const router = express.Router();

router.get('/healthcheck', (_, res) => {
    res.json({
        status: 'success',
    });
});

router.get('/zombies', (_, res) => {
    try {
        const zombies = getZombies();

        res.json({
            timestamp: Date.now(),
            zombies,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error,
        });
    }
});

router.get('/zombie/:id', async (req, res) => {
    try {
        const zombie = await getZombie(req.params.id);

        res.json({
            timestamp: Date.now(),
            zombie,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error,
        });
    }
});

router.post('/zombie', (req, res) => {
    try {
        id = createZombie({
            name: req.body.name,
            items: req.body.items,
        });

        res.json({
            status: 'success',
            id,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error,
        });
    }
});

router.patch('/zombie/:id', (req, res) => {
    try {
        updateZombie(req.params.id, {
            name: req.body.name,
            items: req.body.items,
        });

        res.json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error,
        });
    }
});

router.delete('/zombie/:id', (req, res) => {
    try {
        deleteZombie(req.params.id);

        res.json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error,
        });
    }
});

module.exports = router;
