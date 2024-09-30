const Tipo = require('../models/tipo');

exports.getAllTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTipo = async (req, res) => {
    const { nombre, descripcion } = req.body;

    const tipo = new Tipo({
        nombre,
        descripcion
    });

    try {
        const nuevoTipo = await tipo.save();
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTipo = async (req, res) => {
    try {
        const tipo = await Tipo.findById(req.params.id);
        if (!tipo) return res.status(404).json({ message: 'Tipo no encontrado' });

        tipo.nombre = req.body.nombre || tipo.nombre;
        tipo.descripcion = req.body.descripcion || tipo.descripcion;
        tipo.fecha_actualizacion = Date.now();

        const tipoActualizado = await tipo.save();
        res.json(tipoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTipo = async (req, res) => {
    try {
        const tipo = await Tipo.findById(req.params.id);
        if (!tipo) return res.status(404).json({ message: 'Tipo no encontrado' });

        await tipo.remove();
        res.json({ message: 'Tipo eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
