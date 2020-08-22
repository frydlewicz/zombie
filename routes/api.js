const express = require('express');

const router = express.Router();

router.all('/test', (_, res) => {
    res.json({
        status: 'success',
    });
});

module.exports = router;
