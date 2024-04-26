const {Router} = require('express');

const Aluno = require('../models/Aluno')
const {sign} = require('jsonwebtoken');


const loginRoutes = new Router()



loginRoutes.post('/', async (req, res) => {
    try {
        const email= req.body.email
        const password = req.body.password
    
        if(!email){
            return res.status(400).json({messagem:'O email é obrigatório'})
        }
        if(!password){
            return res.status(400).json({messagem:'A senha é obrigatória'})   
        }

        const aluno = await Aluno.findOne({
            where:{email:email,password:password,password}
        })

        if(!aluno){
            return res.status(404).json({messagem:'nenhum aluno corresponde ao email e senha fornecido'})
        }
        
        const payload ={sub:aluno.id,email:aluno.email,nome:aluno.nome}

        console.log(process.env.SECRET_JWT)

        const token = sign(payload, process.env.SECRET_JWT)

        res.status(200).json({Token:token})



    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o aluno' })
    }       
})

module.exports = loginRoutes