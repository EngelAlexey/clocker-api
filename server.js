const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Configuración para Render (Usa variable de entorno PORT)
const port = process.env.PORT || 3001;

app.use(cors()); // Permitir conexiones externas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar rutas
const routes = require('./routes/appRoutes');
routes(app);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('Clocker API is running...');
});

app.listen(port, () => {
    console.log('Clocker API server started on port: ' + port);
});
