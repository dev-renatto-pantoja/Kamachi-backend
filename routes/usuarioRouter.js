const { Router } = require('express');
const router = Router();
const {updateInfo} = require("../controllers/usuarioController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.patch(
    '/actualizarInfo',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('telefono', 'El nombre telefono es obligatorio').exists,
        check('distrito', 'El distrito es obligatorio').exists,
        check('rol', 'El rol es obligatorio').exists,
        validarCampos
    ],
    updateInfo
);

module.exports = router;