const {Router} = require("express");
const router = Router();
const {updateInfo, publishService, deletePublication, listPublications, listPublicationsByService, findPublication, sendEmail} = require("../controllers/publicacionController");
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
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('img', 'La img es obligatoria').not().isEmpty(),
        validarCampos
    ],
    publishService
);

router.delete(
    '/eliminarPublicacion',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
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
        check('sector', 'El sector del servicio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    listPublicationsByService
);

router.post(
    '/buscarPublicacion',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    findPublication
);

router.post(
    '/enviarEmail',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('id', 'El id de la publicacion es obligatorio').not().isEmpty(),
        validarCampos
    ],
    sendEmail
);

module.exports = router;