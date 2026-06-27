const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.json({ message: 'Registro funcionando' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'Login funcionando' });
});

module.exports = router;