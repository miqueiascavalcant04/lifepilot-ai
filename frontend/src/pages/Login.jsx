import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function fazerLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email,
                senha
            });

            localStorage.setItem(
                'token',
                response.data.token
            );

            alert('Login realizado!');

            navigate('/dashboard');

        } catch (error) {
            alert('Erro ao realizar login');
            console.error(error);
        }
    }

    return (
        <div style={{ padding: '50px' }}>
            <h1>LifePilot AI</h1>

            <form onSubmit={fazerLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}