const { Router } = require('express');
const router = Router();
const {listServices, findService, removeService, updateInfo} = require("../controllers/servicioController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.get(
  '/listarServicios',
    listServices
);

router.get(
    '/buscarServicio',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    findService
);

router.patch(
    '/actualizarInfo',
    [
        check('sector', 'El sector es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateInfo
);

router.delete(
    '/eliminarServicio',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    removeService
);

module.exports = router;