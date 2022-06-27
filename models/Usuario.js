const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: true
  },
  apellido: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  telefono: {
    type: String,
    require: true
  },
  distrito: {
    type: String,
    require: true
  },
  rol: {
    type: String,
    require: true
  },
  calificacion: {
    type: Number,
    require: false,
    default: null
  }
});

const Usuario = model("Usuario", UsuarioSchema);

module.exports = { Usuario, UsuarioSchema }

