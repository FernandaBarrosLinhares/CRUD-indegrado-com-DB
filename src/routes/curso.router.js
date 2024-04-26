const {Router} = require('express');
const Curso = require('../models/Curso')
const { auth } = require('../middleware/auth');

const cursoRoutes = new Router()


cursoRoutes.post('/', auth,async (req, res) => {
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

cursoRoutes.get('/', auth, async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const cursos = await Curso.findAll({
        where: params
    })

    res.json(cursos)
})

cursoRoutes.put('/:id', auth,async (req, res) => {
    const id = req.params.id

    const curso = await Curso.findByPk(id)

    if(!curso) {
        return res.status(404).json({mensagem: 'Curso não encontraddo'})
    }
    curso.update(req.body)

    await curso.save()

    res.json(curso)
})

cursoRoutes.delete('/:id',auth, (req,res) => {
    const {id} =  req.params

    Curso.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})

module.exports = cursoRoutes