const { Router } = require('express');
const router = Router();
const {listUsers, findUser, removeUser, updateInfo} = require("../controllers/usuarioController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.get(
    '/listarUsuarios',
    listUsers
);

router.get(
    '/buscarUsuario',
    [
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    findUser
);

router.patch(
    '/actualizarInfo',
    [
            check('email', 'El email es obligatorio').isEmail(),
            check('telefono', 'El nombre es obligatorio').isEmpty(),
            check('distrito', 'El distrito es obligatorio').isEmpty(),
            check('rol', 'El rol es obligatorio').isEmpty(),
            validarCampos
    ],
    updateInfo
);

router.delete(
    '/eliminarUsuario',
    [
            check('email', 'El email es obligatorio').isEmail(),
            validarCampos
    ],
    removeUser
);

module.exports = router;