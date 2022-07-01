const { Schema, model } = require("mongoose");
const { UsuarioSchema } = require("./Usuario");
const { ServicioSchema } = require("./Servicio");

const PublicacionSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: UsuarioSchema,
        required: true
    },
    servicio: {
        type: Schema.Types.ObjectId,
        ref: ServicioSchema,
        required: true
    },
    fecha_publicacion: {
        type: Date,
        required: true
    },
    monto: {
        type: Number,
        required: true
    }
});

const Publicacion = model("Publicacion", PublicacionSchema);

module.exports = {Publicacion, PublicacionSchema};