import express from 'express';
import authRoutes from './routes/auth.routes.js';
import tarefaRoutes from './routes/tarefa.routes.js';
import iaRoutes from './routes/ia.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());
app.use('/auth', authRoutes);
app.use('/tarefas', tarefaRoutes);
app.use('/ia', iaRoutes);
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'LifePilot AI rodando 🚀'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});