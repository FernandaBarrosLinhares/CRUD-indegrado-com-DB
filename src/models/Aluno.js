const {DataTypes} = require('sequelize')
const {connection} = require('../database/connection')
const { password } = require('../config/database.config')
//const {hash} = require('bcryptjs')

const Aluno = connection.define('alunos', {
  
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    nome: {
        type: DataTypes.STRING,
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    
})

//Criptografia
// Aluno.beforeSave(async(aluno) =>{
//     aluno.password = await hash(aluno.password, 8);
// })

module.exports = Aluno