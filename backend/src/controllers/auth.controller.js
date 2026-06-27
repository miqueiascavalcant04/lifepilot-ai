const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                erro: 'Usuário já existe'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash
            }
        });

        res.status(201).json({
            mensagem: 'Usuário criado com sucesso',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro interno'
        });
    }
};

module.exports = {
    register
};