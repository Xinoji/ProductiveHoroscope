const express = require('express');
const app = express();
const cors = require('cors');

const HoroscopesCount = 57;

app.use(cors());

function idHoroscope(id)
{
  let date = new Date;
  let dateseend = date.getDate() * date.getMonth() * date.getDay() * date.getMinutes() + id;
  return parseInt(dateseend % HoroscopesCount)
}

app.get('/zodiac/:signo', (req, res) => {
    const { signo } = req.params;
    const signosZodiaco = {
      0: 'Aries',
      1: 'Tauro',
      2: 'Géminis',
      3: 'Cáncer',
      4: 'Leo',
      5: 'Virgo',
      6: 'Piscis',
      7: 'Acuario',
      8: 'Capricornio',
      9: 'Sagitario',
      10: 'Escorpio',
      11: 'Libra',
    };
    
    const signoEncontrado = signosZodiaco[signo.toLowerCase()];
    console.log("signo: ", signo);
    if (signoEncontrado) {
          fetch('http://localhost:47300/data/' + idHoroscope(signo))
          .then(function(response) {
             return response.json();
          })
          .then(function(data) {
            res.json(data);
            console.log(data);
          })
          .catch(function(error) {
            console.log(error);
          });          
            

      } else {
        res.status(404).json({ error: 'Signo zodiacal no encontrado.' });
      }
    });
    
    // Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
//  En caso de ser Error Obtener desde aqui el error.