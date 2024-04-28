const {Router} = require('express');
const Aluno = require('../models/Aluno')
const { auth } = require('../middleware/auth');

const AlunoController = require('../controller/AlunoController');

const alunoRoutes = new Router()

alunoRoutes.post('/', AlunoController.cadastrar)


alunoRoutes.get('/',auth, AlunoController.listarAluno)


alunoRoutes.get('/:id', auth, AlunoController.listarAlunoId)

alunoRoutes.put('/:id',auth, AlunoController.atualizarAluno)

alunoRoutes.delete('/:id',auth)



module.exports = alunoRoutes