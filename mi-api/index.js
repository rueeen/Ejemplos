
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


app.use(express.json()); // Para que express pueda interpretar JSON
app.use(cors()); // Para permitir peticiones desde cualquier origen

mongoose.connect('mongodb://localhost:27017/test', { // Conexión a la base de datos
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection; // Conexión a la base de datos
db.on('error', console.error.bind(console, 'connection error:')); // Manejo de errores
db.once('open', function() {
    console.log('Connected to database'); // Mensaje de conexión exitosa
});

const DataSchema = new mongoose.Schema({ // Definir esquema
    name: String,
    age: Number
});

const Data = mongoose.model('Data', DataSchema); // Crear modelo

app.get('/', (req, res) => { // Ruta GET
    res.send('Hello World!'); // Respuesta
});

app.get('/api/data', async (req, res) => { // Ruta GET
    const data = await Data.find(); // Obtener datos
    res.json(data); // Respuesta
});

app.post('/api/data', async (req, res) => { // Ruta POST
    const newData = new Data(req.body); // Crear nuevo dato
    await newData.save(); // Guardar dato
    res.status(201).json(newData); // Respuesta
});

app.delete('/api/data/:id', async (req, res) => {
    const id = req.params.id;
    await Data.findByIdAndDelete(id);
    res.status(200).json({ message: 'Data deleted successfully' });
  });

app.put('/api/data/:id', async (req, res) => { // Ruta PUT  
    const { id } = req.params; // Obtener ID
    const newData = req.body; // Obtener datos
    await Data
        .findById
        .AndUpdate(id, newData, { new: true }); // Actualizar dato
    res.status(204).send(); // Respuesta
});

app.listen(port, () => { // Iniciar servidor
    console.log(`Example app listening at http://localhost:${port}`); // Mensaje de inicio
});