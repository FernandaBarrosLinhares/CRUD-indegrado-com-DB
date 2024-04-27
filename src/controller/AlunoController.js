const Aluno = require("../models/Aluno")


class AlunoController{


    async cadastrar(req,res){
        try {
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const email = req.body.email
            const password = req.body.password
           
    
            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' })
            }
    
            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
            }
    
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
            }
    
            const aluno = await Aluno.create({
               
                nome: nome,
                data_nascimento: data_nascimento,
                email: email,
                password:password,
             
            })
    
            res.status(201).json(aluno)
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o aluno' })
        }
    }
}

module.exports = new AlunoController()