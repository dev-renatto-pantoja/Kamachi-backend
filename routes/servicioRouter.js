const { Router } = require('express');
const router = Router();
const {listServices, createService, findService, removeService, updateInfo} = require("../controllers/servicioController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.get(
  '/listarServicios',
    listServices
);

router.post(
    '/crearServicio',
    [
        check('sector', 'El sector es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createService()
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