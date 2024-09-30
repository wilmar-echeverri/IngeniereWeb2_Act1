const Director = require('../models/director');

exports.getAllDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDirector = async (req, res) => {
    const { nombres, estado } = req.body;

    const director = new Director({
        nombres,
        estado,
    });

    try {
        const nuevoDirector = await director.save();
        res.status(201).json(nuevoDirector);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateDirector = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ message: 'Director no encontrado' });

        director.nombres = req.body.nombres || director.nombres;
        director.estado = req.body.estado || director.estado;
        director.fecha_actualizacion = Date.now();

        const directorActualizado = await director.save();
        res.json(directorActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDirector = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ message: 'Director no encontrado' });

        await director.remove();
        res.json({ message: 'Director eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
