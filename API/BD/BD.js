import express from 'express';
import { JsonDB, Config } from 'node-json-db';
import cors from 'cors';

const db = new JsonDB(new Config('myDatabase', true, true, '/'));

console.log();
const app = express();
app.use(express.json())
app.use(cors());

await app.get('/:id', async(req, res) => {
  const { id } = req.params;  
  try {
    if(id < 0)
      throw "ERROR CONTROLADO";
    var data = await getValueByIndex(id);
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
    if(id < 0)
      throw "ERROR CONTROLADO";
  }
});

await app.get('/error/:id', async(req, res) => {
  try {
    const { id } = req.params;
    var data = await getValueByIndex(id);
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

const PORT = 47300;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

function appendValue(newValue) {
  try {
    // Obtener los datos existentes
    var existingData = db.getData('/data');

    // Agregar el nuevo valor al arreglo existente
    existingData.push(newValue);

    // Guardar los datos actualizados en la base de datos
    db.push('/data', existingData);

    console.log('Append exitoso.');
  } catch (error) {
    console.error('Error al realizar el append:', error);
  }
}

async function getValueByIndex(index) {
  try {
    // Obtener los datos existentes
    const existingData = await db.getData('/data');
    // Verificar si el índice es válido
    if (index >= 0 && index < existingData.length) {
      const value = existingData[index];
      console.log('Dato en el índice', index, ':', value);
      return value;
    } else {
      console.error('Índice inválido:', index);
    }
  } catch (error) {
    console.error('Error al obtener el dato:', error);
  }
}