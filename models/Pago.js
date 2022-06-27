const {Schema, model} = require("mongoose");

const PagoSchema = new Schema({
    costo: {
        type: Number,
        required: true
    },
    realizado: {
        type: Boolean,
        required: false
    }
});

const Pago = model("Pago", PagoSchema);

module.exports = {Pago, PagoSchema};