const Genero = require('../models/genero');

exports.getAllGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGenero = async (req, res) => {
    const { nombre, estado, descripcion } = req.body;

    const genero = new Genero({
        nombre,
        estado,
        descripcion,
    });

    try {
        const nuevoGenero = await genero.save();
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateGenero = async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ message: 'Género no encontrado' });

        genero.nombre = req.body.nombre || genero.nombre;
        genero.estado = req.body.estado || genero.estado;
        genero.descripcion = req.body.descripcion || genero.descripcion;
        genero.fecha_actualizacion = Date.now();

        const generoActualizado = await genero.save();
        res.json(generoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGenero = async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ message: 'Género no encontrado' });

        await genero.remove();
        res.json({ message: 'Género eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
