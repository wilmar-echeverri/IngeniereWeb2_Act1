const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./databases/db');
const generoRoutes = require('./routes/generoRoutes');
const directorRoutes = require('./routes/directorRoutes');
const productoraRoutes = require('./routes/productoraRoutes');
const tipoRoutes = require('./routes/tipoRoutes');
const mediaRoutes = require('./routes/mediaRoutes'); 

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/genero', generoRoutes);
app.use('/api/director', directorRoutes);
app.use('/api/productora', productoraRoutes);
app.use('/api/tipo', tipoRoutes);
app.use('/api/media', mediaRoutes);

module.exports = app;