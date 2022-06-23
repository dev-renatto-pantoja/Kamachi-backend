const {Schema, model} = require("mongoose");

const ServicioSchema = new Schema({
    sector: {
        type: String,
        require: true,
    },
    nombre: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = model("Servicio", ServicioSchema);