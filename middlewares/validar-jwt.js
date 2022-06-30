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

    const { uid, nombre, rol } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );
    console.log("uid: " + uid);
    console.log("nombre: " + nombre);
    console.log("rol: " + rol);
    req.uid = uid;
    req.nombre = nombre;
    req.rol = rol;

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