import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
    const [tarefas, setTarefas] = useState([]);

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('MEDIA');

    const navigate = useNavigate();

    async function carregarTarefas() {
        try {
            const token = localStorage.getItem('token');

            const response = await api.get('/tarefas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTarefas(response.data);

        } catch (error) {
            console.error(error);
            alert('Erro ao carregar tarefas');
        }
    }

    async function criarTarefa(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            await api.post(
                '/tarefas',
                {
                    titulo,
                    descricao,
                    prioridade
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTitulo('');
            setDescricao('');
            setPrioridade('MEDIA');

            carregarTarefas();

        } catch (error) {
            console.error(error);
            alert('Erro ao criar tarefa');
        }
    }

    function logout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        carregarTarefas();
    }, []);

    return (
        <div style={{ padding: '30px' }}>
            <h1>Dashboard LifePilot 🚀</h1>

            <button onClick={logout}>
                Sair
            </button>

            <hr />

            <h2>Nova tarefa</h2>

            <form onSubmit={criarTarefa}>
                <div>
                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                    >
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Média</option>
                        <option value="BAIXA">Baixa</option>
                    </select>
                </div>

                <br />

                <button type="submit">
                    Criar tarefa
                </button>
            </form>

            <hr />

            <h2>Minhas tarefas</h2>

            {tarefas.length === 0 ? (
                <p>Nenhuma tarefa cadastrada.</p>
            ) : (
                tarefas.map((tarefa) => (
                    <div
                        key={tarefa.id}
                        style={{
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <h3>{tarefa.titulo}</h3>

                        <p>{tarefa.descricao}</p>

                        <p>
                            Prioridade: {tarefa.prioridade}
                        </p>

                        <p>
                            Status:
                            {tarefa.concluida
                                ? ' ✅ Concluída'
                                : ' ⏳ Pendente'}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}