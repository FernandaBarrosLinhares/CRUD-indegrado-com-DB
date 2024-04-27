const {Router} = require('express');
const Aluno = require('../models/Aluno')
const { auth } = require('../middleware/auth');

const AlunoController = require('../controller/AlunoController');

const alunoRoutes = new Router()

alunoRoutes.post('/', AlunoController.cadastrar)


alunoRoutes.get('/',auth, async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    const alunos = await Aluno.findAll({
        where: params
    })

    res.json(alunos)
})

alunoRoutes.put('/:id', auth,async (req, res) => {
    const id = req.params.id

    const aluno = await Aluno.findByPk(id)

    if(!aluno) {
        return res.status(404).json({mensagem: 'Curso não encontraddo'})
    }
    aluno.update(req.body)

    await aluno.save()

    res.json(aluno)
})

alunoRoutes.delete('/:id',auth, (req,res) => {
    const {id} =  req.params

    Curso.destroy({
        where: {
            id: id
        }
    })
  
    res.status(204).json({})
})

module.exports = alunoRoutes