const { Schema, model } = require("mongoose");
const { UsuarioSchema } = require("./Usuario");
const { PublicacionSchema } = require("./Publicacion");

const HistorialSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: UsuarioSchema,
        require: true,
    },
    publicaciones: [{
        type: Schema.Types.ObjectId,
        ref: PublicacionSchema,
        require: true,
    }]
});

const Historial = model("Historial", HistorialSchema);

module.exports = { Historial, HistorialSchema };