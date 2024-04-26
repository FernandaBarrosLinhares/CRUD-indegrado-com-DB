const {Router} = require('express');
const Professor = require('../models/Professor')
const { auth } = require('../middleware/auth');

const professorRoutes = new Router()



professorRoutes.post('/', async (req, res) => {

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

professorRoutes.get('/',auth, async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const professores = await Professor.findAll({
        where: params
    })

    res.json(professores)
})

professorRoutes.put('/:id', auth,async (req, res) => {
    const id = req.params.id

    const professor = await Professor.findByPk(id)

    if(!professor) {
        return res.status(404).json({mensagem: 'Professor não encontraddo'})
    }
    professor.update(req.body)

    await professor.save()

    res.json(professor)
})

professorRoutes.delete('/:id', auth,(req,res) => {
    const {id} =  req.params

    Professor.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})

module.exports = professorRoutes