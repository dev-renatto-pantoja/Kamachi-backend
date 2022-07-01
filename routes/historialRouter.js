const {Router} = require("express");
const router = Router();
const {addHistorical} = require("../controllers/historialController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.post(
    '/añadirHistorial',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('publicationId', 'El id de la publicacion es obligatorio').not().isEmpty(),
        validarCampos
    ],
    addHistorical
);

module.exports = router;

