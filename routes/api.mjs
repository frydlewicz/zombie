import express from 'express';

const router = express.Router();

router.all('/test', (_, res) => {
    res.json({
        status: 'success',
    });
});

export default router;
