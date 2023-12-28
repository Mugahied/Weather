import express from "express";
import ejs from "ejs";
import axios from "axios";
const result2 = {
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n",
    },
  ],
  base: "stations",
  main: {
    temp: 29.74,
    feels_like: 26.41,
    temp_min: 25.74,
    temp_max: 25.74,
    pressure: 1016,
    humidity: 78,
    sea_level: 1016,
    grnd_level: 1014,
  },
  visibility: 10000,
  wind: {
    speed: 4.56,
    deg: 342,
    gust: 3.52,
  },
  clouds: {
    all: 9,
  },
  dt: 1703704207,
  sys: {
    country: "SA",
    sunrise: 1703649542,
    sunset: 1703688525,
  },
  timezone: 10800,
  id: 105343,
  name: "Jeddah",
  cod: 200,
};

const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const app = express();
const PORT = 3000;
const cities = ["Jeddah", "Riyadh", "Jeddah2"];
const yourAPIKey = "5b417e0c307f964825d77a870d7564c1";
const citiesLocation = [
  {
    lon: 39.2002,
    lat: 21.4629,
  },
  {
    lon: 46.66600075849512,
    lat: 24.741335237120925,
  },
  {
    lon: 30.417374635427475,
    lat: 19.64185868240387,
  },
];
app.use(express.static("public"));

function getURL(position) {
  return (
    URL +
    "lat=" +
    citiesLocation[position].lat +
    "&lon=" +
    citiesLocation[position].lon +
    "&appid=" +
    yourAPIKey
  );
}

app.get("/", async (req, res) => {
  //make req to API with citiesLocation[0].lon and citiesLocation[0].lat
  try {
    const result = await axios.get(getURL(0));
    console.log(result);
    res.render("index.ejs", {
      temp: result.data.main.temp + " ْC",
      city: "Jeddah",
      feelLike: result.data.main.feels_like + " ْC",
      datetime: new Date(result.data.dt * 1000),
    });
  } catch (error) {
    console.log(error.response);
    res.status(500);
  }
});

app.get("/get-riyadh", async (req, res) => {
  //make req to API with citiesLocation[1].lon and citiesLocation[1].lat
  try {
    const result = await axios.get(getURL(1));
    console.log(result);
    res.render("index.ejs", {
      temp: result.data.main.temp + " ْC",
      city: "Riyadh",
      feelLike: result.data.main.feels_like + " ْC",
      datetime: new Date(result.data.dt * 1000),
    });
  } catch (error) {
    console.log(error.response);
    res.status(500);
  }
});

app.get("/get-karmah", async (req, res) => {
  //make req to API with citiesLocation[1].lon and citiesLocation[1].lat
  try {
    const result = await axios.get(getURL(2));
    console.log(result);
    res.render("index.ejs", {
      temp: result.data.main.temp + " ْC",
      city: "Karmah an Nuzul",
      feelLike: result.data.main.feels_like + " ْC",
      datetime: new Date(result.data.dt * 1000),
    });
  } catch (error) {
    console.log(error.response);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
