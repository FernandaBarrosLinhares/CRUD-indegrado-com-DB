const Aluno = require("../models/Aluno")


class AlunoController{


    async listarAluno(req,res){
        let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const alunos = await Aluno.findAll({
        where: params
    })

    res.json(alunos)
    }

    async listarAlunoId(req,res){
        try {
            const {id} =req.params
            const aluno = await Aluno.findByPk(id)
        
            if(!aluno){
                return res.status(404).json({message: "Aluno não encontrado"})
            }
            res.json(aluno)
        
           } catch (error) {
            res.status(500).json({
                error:'Não foi possível listar aluno específico',
                error:error
            })
           }

    }
    
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

    async atualizarAluno(req,res){
        const id = req.params.id

    const aluno = await Aluno.findByPk(id)

    if(!aluno) {
        return res.status(404).json({mensagem: 'Curso não encontraddo'})
    }
    aluno.update(req.body)

    await aluno.save()

    res.json(aluno)
    }

    async deletarAluno(req,res){
        const {id} =  req.params

        Curso.destroy({
            where: {
                id: id
            }
        })
      
        res.status(204).json({})
    }
}

module.exports = new AlunoController()