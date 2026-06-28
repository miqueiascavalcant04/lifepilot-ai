const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const tarefaController = require('../controllers/tarefa.controller');

router.post(
    '/',
    authMiddleware,
    tarefaController.criarTarefa
);

router.get(
    '/',
    authMiddleware,
    tarefaController.listarTarefas
);

router.put(
    '/:id',
    authMiddleware,
    tarefaController.atualizarTarefa
);

router.delete(
    '/:id',
    authMiddleware,
    tarefaController.deletarTarefa
);

module.exports = router;