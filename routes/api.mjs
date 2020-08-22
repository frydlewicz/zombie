import express from 'express';

const router = express.Router();

router.get('/test', (_, res) => {
    res.json({
        key: 'value',
    });
});

export default router;
