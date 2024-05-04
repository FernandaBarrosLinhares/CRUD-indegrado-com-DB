const {Router} = require('express');
const Curso = require('../models/Curso')
const { auth } = require('../middleware/auth');
const CursoController= require('../controller//CursoController');

const cursoRoutes = new Router()


cursoRoutes.post('/', CursoController.cadastrar)

cursoRoutes.get('/', auth,CursoController.listarCurso) 

cursoRoutes.put('/:id', auth,CursoController.atualizarCurso)

cursoRoutes.delete('/:id',auth,CursoController.deletarCurso)

module.exports = cursoRoutes