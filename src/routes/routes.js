const {Router} = require('express');
const alunoRoutes = require("./aluno.router");
const cursoRoutes = require("./curso.router");
const loginRoutes = require('./login.routes');
const professorRoutes = require('./professor.route');




const routes = Router()

routes.use('/alunos', alunoRoutes)
routes.use('./curso', cursoRoutes)
routes.use('./professor', professorRoutes)
routes.use('./login',loginRoutes) 


module.exports = routes