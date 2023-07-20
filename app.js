const searchInp = document.getElementById("search_inp");
const search = document.getElementById("search");

const heatIcon = document.getElementById("heat");
const freezeIcon = document.getElementById("freeze");

const tempSpan = document.getElementById("temp");
const windSpan = document.getElementById("wind");
const humidSpan = document.getElementById("humid");
const weatherSpan = document.getElementById("weather");

const alertText = document.querySelector(".alert-text");
const alertWarning = document.querySelector(".alert-warning");

const cloudsI = document.getElementById("clouds");
const rainI = document.getElementById("rain");
const thunderI = document.getElementById("thunder");
const snowI = document.getElementById("snow");

search.addEventListener("click", () => {
  const APIKey = "";
  const city = searchInp.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        alertText.textContent = city + " is not defined";
        alertWarning.style.top = "0px";

        setTimeout(() => {
          alertWarning.style.top = "-75px";
        }, 1000);

        console.log(city + " is not defined");
      } else {
        const temp = Math.floor(json.main.temp);
        const windy =
          json.wind.speed < 1 ? json.wind.speed : Math.floor(json.wind.speed);
        const humid = json.main.humidity;
        const weather = json.weather[0].main;
        const weatherDesc = json.weather[0].description;

        if (temp > 0) {
          freezeIcon.style.display = "none";
          heatIcon.style.display = "block";
        } else {
          heatIcon.style.display = "none";
          freezeIcon.style.display = "block";
        }

        console.log(weather);

        switch (weather) {
          case "Clouds":
            thunderI.style.display = "none";
            rainI.style.display = "none";
            snowI.style.display = "none";
            cloudsI.style.display = "block";

            break;
          case "Rain":
            thunderI.style.display = "none";
            cloudsI.style.display = "none";
            snowI.style.display = "none";
            rainI.style.display = "block";

            break;

          case "Thunderstorm":
            cloudsI.style.display = "none";
            rainI.stylel.display = "none";
            snowI.style.display = "none";
            thunderI.style.display = "block";

            break;

          case "Snow":
            cloudsI.style.display = "none";
            rainI.style.display = "none";
            thunderI.style.display = "none";
            snowI.style.display = "block";

          default:
            rainI.style.display = "none";
            thunderI.style.display = "none";
            snowI.style.display = "none";
            cloudsI.style.display = "block";
        }

        tempSpan.textContent = temp + " C";
        windSpan.textContent = windy + " m/s";
        humidSpan.textContent = humid + "%";
        weatherSpan.textContent = weatherDesc;
      }
    });
});
