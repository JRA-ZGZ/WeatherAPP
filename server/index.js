'use strict';

const express = require('express');

const router = new express.Router();

// routes
router.use('/weather', require('./routes/weather'));

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
