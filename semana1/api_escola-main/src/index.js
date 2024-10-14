const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection'); // Importando a conexão com o banco de dados

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Middlewares
        this.middlewares();

        // Rotas
        this.routes();

        // Inicializa o servidor
        this.start();
    }

    middlewares() {
        this.app.use(cors()); // Habilita CORS
        this.app.use(express.json()); // Para parsear o corpo das requisições em JSON
        this.app.use(express.urlencoded({ extended: true })); // Para parsear dados url-encoded
    }

    routes() {
        const alunoRoutes = require('./routes/alunoRoutes'); // Importe suas rotas aqui
        this.app.use('/api/alunos', alunoRoutes); // Define a base da rota para alunos
    }

    async start() {
        // Sincroniza o modelo com o banco de dados
        try {
            await connection.sync(); // Sincroniza todos os modelos
            console.log('Conexão com o banco de dados estabelecida com sucesso!');
        } catch (error) {
            console.error('Erro ao conectar com o banco de dados:', error);
        }

        // Inicia o servidor
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando na porta ${this.port}`);
        });
    }
}

// Instanciação da classe Server para executar o servidor
new Server();
