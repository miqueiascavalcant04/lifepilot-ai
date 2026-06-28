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

const atualizarTarefa = async (req, res) => {
    try {
        const { id } = req.params;

        const tarefa = await prisma.tarefa.findUnique({
            where: { id }
        });

        if (!tarefa) {
            return res.status(404).json({
                erro: 'Tarefa não encontrada'
            });
        }

        if (tarefa.usuarioId !== req.usuario.id) {
            return res.status(403).json({
                erro: 'Acesso negado'
            });
        }

        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id },
            data: req.body
        });

        return res.json(tarefaAtualizada);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao atualizar tarefa'
        });
    }
};

const deletarTarefa = async (req, res) => {
    try {
        const { id } = req.params;

        const tarefa = await prisma.tarefa.findUnique({
            where: { id }
        });

        if (!tarefa) {
            return res.status(404).json({
                erro: 'Tarefa não encontrada'
            });
        }

        if (tarefa.usuarioId !== req.usuario.id) {
            return res.status(403).json({
                erro: 'Acesso negado'
            });
        }

        await prisma.tarefa.delete({
            where: { id }
        });

        return res.json({
            mensagem: 'Tarefa removida com sucesso'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'Erro ao remover tarefa'
        });
    }
};

module.exports = {
    criarTarefa,
    listarTarefas,
    atualizarTarefa,
    deletarTarefa
};