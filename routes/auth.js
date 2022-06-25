/* 
  Rutas de usuarios /Auth
  host + /api/auth

  

*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, revalidarToken, loginUser } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
  '/registro',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    check('distrito','El distrito es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
  ],
  createUser
);

router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
  ],
  loginUser
);

router.get('/renew',validarJWT, revalidarToken);

module.exports = router;