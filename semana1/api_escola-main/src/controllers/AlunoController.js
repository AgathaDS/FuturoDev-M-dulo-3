const Aluno = require("../models/Aluno");
const bcrypt = require("bcrypt");

class AlunoController {
    
    async listar(req, res) {
        try {
            const alunos = await Aluno.findAll();
            res.json(alunos);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não foi possível listar os alunos' });
        }
    }

    async cadastrar(req, res) {
        try {
            const { email, password, nome, data_nascimento, celular } = req.body;

            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' });
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' });
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/)) {
                return res.status(400).json({ message: 'A data de nascimento não está no formato correto' });
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            const aluno = await Aluno.create({
                email: email,
                password: hashedPassword, // Usar a senha hasheada
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            });

            res.status(201).json(aluno);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o aluno' });
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params;

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            res.json(aluno);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                error: 'Não foi possível listar o aluno específico',
                cause: error.message
            });
        }
    }
}

module.exports = new AlunoController();
