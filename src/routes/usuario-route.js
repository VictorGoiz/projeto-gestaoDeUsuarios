const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');


router.get('/', usuarioController.listarUsuarios);
router.post('/', usuarioController.cadastrarUsuarios);
router.put('/:id', usuarioController.atualizarUsuarios)

module.exports = router;