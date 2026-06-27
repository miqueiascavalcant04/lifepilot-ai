const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Lista de tarefas funcionando' });
});

module.exports = router;