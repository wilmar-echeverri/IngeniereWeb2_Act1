const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String },
    url: { type: String, required: true, unique: true },
    imagen: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },
    añoEstreno: { type: Number },
    generoPrincipal: { type: mongoose.Schema.Types.ObjectId, ref: 'Género' },
    directorPrincipal: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
    productora: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora' },
    tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo' }
});

module.exports = mongoose.model('Media', MediaSchema);
