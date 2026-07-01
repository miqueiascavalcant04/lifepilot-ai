import express from 'express';

const router = express.Router();

router.post('/analisar', async (req, res) => {
    try {
        const { tarefas } = req.body;

        if (!tarefas || tarefas.length === 0) {
            return res.json({
                resposta: 'Você não possui tarefas cadastradas.'
            });
        }

        const altas = tarefas.filter(
            t => t.prioridade === 'ALTA'
        );

        const medias = tarefas.filter(
            t => t.prioridade === 'MEDIA'
        );

        const baixas = tarefas.filter(
            t => t.prioridade === 'BAIXA'
        );

        let resposta = 'Plano sugerido:\n\n';

        altas.forEach(t => {
            resposta += `🔴 Priorize: ${t.titulo}\n`;
        });

        medias.forEach(t => {
            resposta += `🟡 Organize: ${t.titulo}\n`;
        });

        baixas.forEach(t => {
            resposta += `🟢 Faça quando houver tempo: ${t.titulo}\n`;
        });

        res.json({ resposta });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro interno'
        });
    }
});

export default router;