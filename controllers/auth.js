const { response } = require('express');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo ya esta registrado'
      })
    }

    usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      token

    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Comunicarse con el administrador'
    })
  }
}

const loginUser = async (req, res = response) => {

  const { email, password } = req.body

  try {

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario o contraseña incorrecta'
      })
    }

    //Validacion de Password
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario o contraseña incorrecta'
      })
    }

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol);

    res.json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comunicarse con el administrador"
    })
  }
}

const revalidarToken = async (req, res = response) => {

  const { uid, nombre, rol } = req;

  //Generar JWT
  const token = await generarJWT(uid, nombre, rol);

  res.json({
    ok: true,
    uid,
    nombre,
    rol,
    msg: "ok",
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidarToken
};