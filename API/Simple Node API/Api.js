const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require("node-fetch");

const HoroscopesCount = 57;
const errorsCount = 3; 
const port = 8080;
app.use(cors());

const Errors = [
  {
    "Topic": "ERROR CLIENTE",
    "Action": "Oh no, la pagina se ah caido pero si con F5 aun sigue cargando es recomendable conocer que es el cache y como recargar una pagina sin el",
    "ERRNO": 0
  },
 {
    "Topic": "ERROR API",
    "Action": "El astrologo tambien se cansa y parece que ahorita se esta tomando una siesta",
    "ERRNO": 1
  },
 {
    "Topic": "ERROR BD",
    "Action": "Hoy las estrellas estan de malas y no nos permiten saber cuales son las cosas que recomiendan",
    "ERRNO": 2
  }
]

function idHoroscope(id)
{
  let date = new Date;
  let dateseend = date.getFullYear() * date.getMonth() * date.getDate() + id;
  return parseInt(dateseend % HoroscopesCount)
}

app.get('/:signo', (req, res) => {
  const url = 'http://database-service:47300/'
    
  console.log(url);
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
      12: 'ERROR'
    };
    
    if(signo == 12)
    {
      errors(res);
      return;
    }

    const signoEncontrado = signosZodiaco[signo];
    console.log("signo: ", signosZodiaco[signo]);
    if (signoEncontrado) {
          fetch( url + idHoroscope(signo))
          .then(function(response) {
             return response.json();
          })
          .then(function(data) {
            console.log(data);
            res.json(data);
          })
          .catch(function(error) {
            res.json(Errors[2]);
          });          
            

      } else {
        res.status(404).json({ error: 'Signo zodiacal no encontrado.' });
      }
    });


function errors(res)
{
  //no encontre forma directa de tirar el contenedor o no almenos una que se refleje.
  let date = new Date;
  let dateseend = date.getFullYear() * date.getMonth() * date.getDay() * date.getMinutes();
  let error = parseInt(dateseend % errorsCount)

  res.json(Errors[error]);
  //hacer que el error suceda
  switch(error)
  {
    case 0:
      //throw k8s container
      break;
    case 1:
      throw "Adios API";
    case 2:
      fetch(url + "-1");
      break;
  }


  return Errors[error];
}

    // Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port);
});
