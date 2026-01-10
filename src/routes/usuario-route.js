const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');


router.get('/', usuarioController.listarUsuarios);
router.post('/', usuarioController.cadastrarUsuarios);
router.put('/:id', usuarioController.atualizarUsuarios)
router.delete('/:id', usuarioController.deletarUsuarios)
router.get('/contarUsuarios', usuarioController.contarUsuarios)
router.get('/contarAdms', usuarioController.contarAdms)

module.exports = router;