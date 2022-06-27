const { Schema, model } = require("mongoose");
const { UsuarioSchema } = require("./Usuario");
const { ServicioSchema } = require("./Servicio");
const {PagoSchema} = require("./Pago");

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
    pago: {
        type: PagoSchema,
        required: true
    }
});

const Publicacion = model("Publicacion", PublicacionSchema);

module.exports = {Publicacion, PublicacionSchema};