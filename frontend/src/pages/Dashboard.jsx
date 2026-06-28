import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
    const [tarefas, setTarefas] = useState([]);
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
                        <p>Prioridade: {tarefa.prioridade}</p>
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