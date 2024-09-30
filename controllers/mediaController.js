const Media = require('../models/media');

// Obtener todas las producciones (películas/series)
exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find()
            .populate('genero', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva producción (película/serie)
exports.createMedia = async (req, res) => {
    const { serial, titulo, sinopsis, url, portada, anio_estreno, genero, director, productora, tipo } = req.body;

    const media = new Media({
        serial,
        titulo,
        sinopsis,
        url,
        portada,
        anio_estreno,
        genero,
        director,
        productora,
        tipo
    });

    try {
        const nuevaMedia = await media.save();
        res.status(201).json(nuevaMedia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una producción
exports.updateMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).json({ message: 'Producción no encontrada' });

        media.serial = req.body.serial || media.serial;
        media.titulo = req.body.titulo || media.titulo;
        media.sinopsis = req.body.sinopsis || media.sinopsis;
        media.url = req.body.url || media.url;
        media.portada = req.body.portada || media.portada;
        media.anio_estreno = req.body.anio_estreno || media.anio_estreno;
        media.genero = req.body.genero || media.genero;
        media.director = req.body.director || media.director;
        media.productora = req.body.productora || media.productora;
        media.tipo = req.body.tipo || media.tipo;
        media.fecha_actualizacion = Date.now();

        const mediaActualizada = await media.save();
        res.json(mediaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una producción
exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).json({ message: 'Producción no encontrada' });

        await media.remove();
        res.json({ message: 'Producción eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
