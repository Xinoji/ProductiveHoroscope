const express = require('express');
const cors = require('cors');

const path = require('path');

const app = express();
const PORT = 8000; // Puedes cambiar el puerto si es necesario

// Habilitar CORS
app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'));
  });
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});


// Servir archivos estáticos
