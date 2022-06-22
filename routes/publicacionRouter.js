const {Router} = require("express");
const router = Router();
const {updateInfo} = require("../controllers/publicacionController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

router.patch(
    '/actualizarPublicacion',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('costo', 'El costo es obligatorio').exists,
        validarCampos
    ],
    updateInfo
);

module.exports = router;