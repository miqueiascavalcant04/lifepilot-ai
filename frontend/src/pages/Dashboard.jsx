import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('MEDIA');
    const [respostaIA, setRespostaIA] = useState('');

    const navigate = useNavigate();

    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = tarefas.filter(t => !t.concluida).length;

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

    async function concluirTarefa(tarefa) {
        try {
            const token = localStorage.getItem('token');

            await api.put(
                `/tarefas/${tarefa.id}`,
                {
                    concluida: !tarefa.concluida
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            carregarTarefas();

        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar tarefa');
        }
    }

    async function deletarTarefa(id) {
        try {
            const token = localStorage.getItem('token');

            await api.delete(`/tarefas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            carregarTarefas();

        } catch (error) {
            console.error(error);
            alert('Erro ao excluir tarefa');
        }
    }

    async function gerarPlanoIA() {
        try {
            const token = localStorage.getItem('token');

            const response = await api.post(
                '/ia/analisar',
                {
                    tarefas
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRespostaIA(response.data.resposta);

        } catch (error) {
            console.error(error);
            alert('Erro ao gerar plano');
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
        <div className="dashboard">

            <div className="header">
                <h1>🚀 LifePilot AI</h1>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Sair
                </button>
            </div>

            <div className="cards">

                <div className="card">
                    <h3>Total</h3>
                    <h1>{total}</h1>
                </div>

                <div className="card">
                    <h3>Concluídas</h3>
                    <h1>{concluidas}</h1>
                </div>

                <div className="card">
                    <h3>Pendentes</h3>
                    <h1>{pendentes}</h1>
                </div>

            </div>

            <button
                className="create-btn"
                onClick={gerarPlanoIA}
                style={{ marginBottom: '20px' }}
            >
                🤖 Gerar plano do dia
            </button>

            {respostaIA && (
                <div className="form-container">
                    <h2>🤖 Assistente LifePilot</h2>

                    <pre
                        style={{
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                        }}
                    >
                        {respostaIA}
                    </pre>
                </div>
            )}

            <div className="form-container">

                <h2>Nova tarefa</h2>

                <form onSubmit={criarTarefa}>

                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                    >
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Média</option>
                        <option value="BAIXA">Baixa</option>
                    </select>

                    <button
                        className="create-btn"
                        type="submit"
                    >
                        Criar tarefa
                    </button>

                </form>
            </div>

            <h2>Minhas tarefas</h2>

            {tarefas.length === 0 ? (
                <p>Nenhuma tarefa cadastrada.</p>
            ) : (
                tarefas.map((tarefa) => (
                    <div
                        key={tarefa.id}
                        className="tarefa"
                    >
                        <h3>{tarefa.titulo}</h3>

                        <p>{tarefa.descricao}</p>

                        <p>
                            <strong>Prioridade:</strong>

                            <span
                                className={`prioridade ${tarefa.prioridade.toLowerCase()}`}
                            >
                                {tarefa.prioridade}
                            </span>
                        </p>

                        <p>
                            <strong>Status:</strong>{' '}
                            {tarefa.concluida
                                ? '✅ Concluída'
                                : '⏳ Pendente'}
                        </p>

                        <div className="tarefa-buttons">

                            <button
                                onClick={() => concluirTarefa(tarefa)}
                            >
                                {tarefa.concluida
                                    ? '↩ Reabrir'
                                    : '✓ Concluir'}
                            </button>

                            <button
                                onClick={() => deletarTarefa(tarefa.id)}
                            >
                                🗑 Excluir
                            </button>

                        </div>
                    </div>
                ))
            )}

        </div>
    );
}