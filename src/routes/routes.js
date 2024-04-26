const {Router} = require('express');
const Professor = require('../models/Professor')
const Curso = require('../models/Curso')
const Aluno = require('../models/Aluno')
const {sign} = require('jsonwebtoken');
const { auth } = require('../middleware/auth');

const routes = new Router()

module.exports = routes;


routes.get('/bem_vindo', (req, res) => {
    res.json('Bem vindo');
    })


routes.post('/cursos', auth,async (req, res) => {
    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if(!nome) {
            return res.status(400).json({messagem: "O nome é obrigatório" })
        }

        if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({  messagem: "A duração do curso deve ser entre 40 e 200 horas"
            })
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        })

        res.status(201).json(curso)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o curso' })
    }

})

routes.get('/cursos', auth, async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const cursos = await Curso.findAll({
        where: params
    })

    res.json(cursos)
})

routes.put('/cursos/:id', auth,async (req, res) => {
    const id = req.params.id

    const curso = await Curso.findByPk(id)

    if(!curso) {
        return res.status(404).json({mensagem: 'Curso não encontraddo'})
    }
    curso.update(req.body)

    await curso.save()

    res.json(curso)
})

routes.delete('/cursos/:id',auth, (req,res) => {
    const {id} =  req.params

    Curso.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})


routes.post('/professores', async (req, res) => {

    try {
        const nome = req.body.nome;

        if(!nome) {
            return res.status(400).json({messagem: "O nome é obrigatório" })
        }

        const professor = await Professor.create({
            nome: nome
           
        })

        res.status(201).json(professor)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o professor' })
    }

})

routes.get('/professores',auth, async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const professores = await Professor.findAll({
        where: params
    })

    res.json(professores)
})

routes.put('/professores/:id', auth,async (req, res) => {
    const id = req.params.id

    const professor = await Professor.findByPk(id)

    if(!professor) {
        return res.status(404).json({mensagem: 'Professor não encontraddo'})
    }
    professor.update(req.body)

    await professor.save()

    res.json(professor)
})

routes.delete('/professores/:id', auth,(req,res) => {
    const {id} =  req.params

    Professor.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})


//Alunos


routes.post('/alunos', async (req, res) => {
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
)

routes.get('/alunos',auth, async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const alunos = await Aluno.findAll({
        where: params
    })

    res.json(alunos)
})

routes.put('/alunos/:id', auth,async (req, res) => {
    const id = req.params.id

    const aluno = await Aluno.findByPk(id)

    if(!aluno) {
        return res.status(404).json({mensagem: 'Curso não encontraddo'})
    }
    aluno.update(req.body)

    await aluno.save()

    res.json(aluno)
})

routes.delete('/alunos/:id',auth, (req,res) => {
    const {id} =  req.params

    Curso.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})

//rota login
routes.post('/login', async (req, res) => {
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





module.exports = routes
