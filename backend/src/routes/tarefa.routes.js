const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/',
    authMiddleware,
    (req, res) => {

        res.json({
            mensagem: 'Usuário autenticado',
            usuario: req.usuario
        });

    }
);

module.exports = router;