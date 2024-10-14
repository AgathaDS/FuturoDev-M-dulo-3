const { Router } = require('express');
const { auth } = require('../middleware/auth');
const { param } = require('express-validator'); // Para validação
const AlunoController = require('../controllers/AlunoController');

const alunoRoutes = new Router();

// Rota para cadastrar um aluno
alunoRoutes.post('/', AlunoController.cadastrar);

// Rota para listar todos os alunos com autenticação
alunoRoutes.get('/', auth, AlunoController.listar);

// Rota para listar um aluno específico com autenticação e validação do ID
alunoRoutes.get('/:id', auth, 
    param('id').isInt().withMessage('O ID deve ser um número inteiro'), // Valida o parâmetro ID
    AlunoController.listarUm
);

module.exports = alunoRoutes;
