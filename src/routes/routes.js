const {Router} = require('express');
const Professor = require('../models/Professor')
const Curso = require('../models/Curso')

const routes = new Router()

module.exports = routes;


routes.get('/bem_vindo', (req, res) => {
    res.json('Bem vindo');
    })


routes.post('/cursos', async (req, res) => {
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

routes.get('/cursos', async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const cursos = await Curso.findAll({
        where: params
    })

    res.json(cursos)
})

routes.put('/cursos/:id', async (req, res) => {
    const id = req.params.id

    const curso = await Curso.findByPk(id)

    if(!curso) {
        return res.status(404).json({mensagem: 'Curso não encontraddo'})
    }
    curso.update(req.body)

    await curso.save()

    res.json(curso)
})

routes.delete('/cursos/:id', (req,res) => {
    const {id} =  req.params

    Curso.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})

//falta testar

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

routes.get('/professores', async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const professores = await Professor.findAll({
        where: params
    })

    res.json(professores)
})

routes.put('/professores/:id', async (req, res) => {
    const id = req.params.id

    const professor = await Professor.findByPk(id)

    if(!professor) {
        return res.status(404).json({mensagem: 'Professor não encontraddo'})
    }
    professor.update(req.body)

    await professor.save()

    res.json(professor)
})

routes.delete('/professores/:id', (req,res) => {
    const {id} =  req.params

    Professor.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})




module.exports = routes
