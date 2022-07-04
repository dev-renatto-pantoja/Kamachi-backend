const { Schema, model } = require("mongoose");
const { UsuarioSchema } = require("./Usuario");
const { PublicacionSchema } = require("./Publicacion");

const HistorialSchema = new Schema({
    usuario: {
        type: UsuarioSchema,
        require: true,
    },
    publicaciones: [{
        type: PublicacionSchema,
        require: true,
    }]
});

const Historial = model("Historial", HistorialSchema);

module.exports = { Historial, HistorialSchema };