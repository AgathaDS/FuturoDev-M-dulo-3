const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');
const { hash } = require('bcryptjs');

const Aluno = connection.define('alunos', {
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Adicionando restrição para que o email não seja nulo
        unique: true, // Garantindo que o email seja único
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Adicionando restrição para que a senha não seja nula
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false, // Adicionando restrição para que o nome não seja nulo
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false, // Adicionando restrição para que a data de nascimento não seja nula
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true, // Permitindo que o celular seja opcional
    }
});

// Hooks: Antes de salvar, faz o hash da senha
Aluno.beforeSave(async (user) => {
    if (user.changed('password')) { // Apenas aplica o hash se a senha for alterada
        user.password = await hash(user.password, 8);
    }
    return user;
});

module.exports = Aluno;
