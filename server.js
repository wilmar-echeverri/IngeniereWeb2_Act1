const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./databases/db'); 

dotenv.config();

connectDB(); 

const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
