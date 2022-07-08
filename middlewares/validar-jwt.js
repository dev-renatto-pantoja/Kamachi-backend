const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

  const token = req.header('x-token');

  console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion'
    })
  }

  try {

    const { uid, nombre, rol, email } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );
    req.uid = uid;
    req.nombre = nombre;
    req.rol = rol;
    req.email= email;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido'
    })
  }


  next();
}

module.exports = {
  validarJWT
}