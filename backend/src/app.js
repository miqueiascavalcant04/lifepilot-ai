const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const tarefaRoutes = require('./routes/tarefa.routes');

app.use('/auth', authRoutes);
app.use('/tarefas', tarefaRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'LifePilot AI rodando 🚀' });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});