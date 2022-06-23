const {Schema, model} = require("mongoose");
const {UsuarioSchema} = require("./Usuario");
const {ServicioSchema} = require("./Servicio");

const PublicacionSchema = new Schema({
    usuario: {
        type: UsuarioSchema,
        required: true
    },
    servicio: {
        type: ServicioSchema,
        required: true
    },

    fecha_publicacion: {
        type: Date,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
});

module.exports = model("Publicacion", PublicacionSchema);