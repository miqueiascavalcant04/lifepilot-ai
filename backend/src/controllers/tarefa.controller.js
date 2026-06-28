const prisma = require('../config/prisma');

const criarTarefa = async (req, res) => {
    try {
        const { titulo, descricao, prioridade } = req.body;

        const tarefa = await prisma.tarefa.create({
            data: {
                titulo,
                descricao,
                prioridade,
                usuarioId: req.usuario.id
            }
        });

        return res.status(201).json(tarefa);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao criar tarefa'
        });
    }
};

const listarTarefas = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany({
            where: {
                usuarioId: req.usuario.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.json(tarefas);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao listar tarefas'
        });
    }
};

module.exports = {
    criarTarefa,
    listarTarefas
};