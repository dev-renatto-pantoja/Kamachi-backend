const {Router} = require("express");
const router = Router();
const {updateInfo, publishService, deletePublication, listPublications, listPublicationsByService} = require("../controllers/publicacionController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.patch(
    '/actualizarPublicacion',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('nombre', 'El nombre del servicio es obligatorio').exists,
        check('costo', 'El costo es obligatorio').exists,
        validarCampos
    ],
    updateInfo
);

router.post(
    '/publicar',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('costo', 'El costo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    publishService
);

router.delete(
    '/eliminarPublicacion',
    [
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    deletePublication
);

router.get(
    '/listarPublicaciones',
    listPublications
);

router.get(
    '/listarPublicacionesPorServicio',
    [
        check('name', 'El nombre del servicio es obligatorio').exists,
        validarCampos
    ],
    listPublicationsByService
);

module.exports = router;