const Productora = require('../models/productora');

exports.getAllProductoras = async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProductora = async (req, res) => {
    const { nombre, estado, slogan, descripcion } = req.body;

    const productora = new Productora({
        nombre,
        estado,
        slogan,
        descripcion
    });

    try {
        const nuevaProductora = await productora.save();
        res.status(201).json(nuevaProductora);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProductora = async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) return res.status(404).json({ message: 'Productora no encontrada' });

        productora.nombre = req.body.nombre || productora.nombre;
        productora.estado = req.body.estado || productora.estado;
        productora.slogan = req.body.slogan || productora.slogan;
        productora.descripcion = req.body.descripcion || productora.descripcion;
        productora.fecha_actualizacion = Date.now();

        const productoraActualizada = await productora.save();
        res.json(productoraActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProductora = async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) return res.status(404).json({ message: 'Productora no encontrada' });

        await productora.remove();
        res.json({ message: 'Productora eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
