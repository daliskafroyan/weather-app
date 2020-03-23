const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.post('/', async (req, res) => {
  const apiKey = '137f0b8876ce53297526aa48ca2659a3';
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    let response = await axios.get(url);

    res.render('index', {
      error: null,
      weather: response.data.main.temp
    });
  } catch (error) {
    res.render('index', {
      error: 'error has occured, please try again',
      weather: null
    });
  }

  //   axios
  //     .get(url)
  //     .then(response => {
  //       // let weather = JSON.parse(response);

  //       res.render('index', {
  //         error: null,
  //         weather: response
  //       });

  //       //   console.log(message);
  //     })
  //     .catch(
  //       res.render('index', {
  //         error: 'error has occured, please try again',
  //         weather: null
  //       })
  //     );
});

app.listen(port, () => console.log(`server listening a ${port}`));
