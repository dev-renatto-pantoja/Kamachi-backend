const {Router} = require("express");
const router = Router();
const {updateInfo, publishService, deletePublication, listPublications, listPublicationsByService, findPublication} = require("../controllers/publicacionController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.patch(
    '/actualizarPublicacion',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('sector', 'El sector del servicio es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('monto', 'El monto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateInfo
);

router.post(
    '/publicar',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('monto', 'El monto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    publishService
);

router.delete(
    '/eliminarPublicacion',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
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
        check('name', 'El nombre del servicio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    listPublicationsByService
);

router.get(
    '/buscarPublicacion',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        validarCampos
    ],
    findPublication
);

module.exports = router;