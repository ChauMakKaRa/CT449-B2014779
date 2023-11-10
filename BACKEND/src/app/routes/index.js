const express = require('express');

const webRouter = require('./webRouter');
const userRouter = require('./adminRouter');

const router = express.Router();

router.use('/api/', webRouter);
router.use('/api/', userRouter);

module.exports = router;