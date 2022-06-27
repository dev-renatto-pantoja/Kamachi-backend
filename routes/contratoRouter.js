const { Router } = require('express');
const router = Router();
const {createContract} = require("../controllers/contratoController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.post(
    '/crearContrato',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createContract
);

module.exports = router;