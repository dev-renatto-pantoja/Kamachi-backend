const {Router} = require("express");
const router = Router();
const {updateHistoricalByUser, findHistoricalByUser} = require("../controllers/historialController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.get(
    '/buscaHistorialPorUsuario',
    [
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    findHistoricalByUser
);

router.post(
    '/actualizarHistorialPorUsuario',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('publicationId', 'El id de la publicacion es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateHistoricalByUser
);

module.exports = router;