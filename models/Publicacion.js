const { Schema, model } = require("mongoose");
const { Usuario } = require("./Usuario");
const { Servicio } = require("./Servicio");

const PublicacionSchema = new Schema({
    /* usuario: {
        type: Usuario,
        required: true
    },
    servicio: {
        type: Servicio,
        required: true
    }, */
    fecha_publicacion: {
        type: Date,
        required: true
    },
    costo: {
        type: Number,
        required: true
    }
});

module.exports = model("Publicacion", PublicacionSchema);