const submitBtn = document.querySelector(".submitBtn");
const input = document.querySelector("form input");
const tempUnits = document.querySelector(".tempUnits");
const tempSpan = document.querySelector(".temperature");
const conditionSpan = document.querySelector(".conditions");
const celsiusUnit = document.querySelector("#celsius");
const fahrenheitUnit = document.querySelector("#fahrenheit");
const error = document.querySelector(".error");
let place, weather;

async function getWeather(location) {
  try {
    const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/`+
      `rest/services/timeline/${location}%2C%20India?unitGroup=metric&key=4RLZKJNKPEC4UXGU6Z46Q683C`+
      `&contentType=json&include=current&elements=temp,conditions,icon`);
    if (weatherData.status != 200) {
      throw new Error(`${weatherData.status}`);
    } else {
      const weatherDataJSON = await weatherData.json();
      const currConditions = weatherDataJSON.currentConditions;
      return currConditions;
    }
  } catch(error) {
    error.innerText = error;
    return null;
  }
}

submitBtn.addEventListener("click", async () => {
  if (input.value) {
    tempSpan.innerText = '';
    conditionSpan.innerText = '';
    error.innerText = '';
    place = input.value;
    weather = await getWeather(place);
    if (weather != null) {
      if (fahrenheitUnit.checked) {
        weather["temp"] = CtoF(weather["temp"]);
      }
      displayTemperature(weather["temp"]);
      conditionSpan.innerText = `${weather["conditions"]}`;
    } else {
      error.innerText = 'Error: Could not fetch weather';
    }
  } else {
    error.innerText = 'Error: Please select a location';
  }
});

tempUnits.addEventListener("click", (e) => {
  let tempString = tempSpan.innerText;
  if (tempString.length > 0) {
    let tempArray = tempString.split("°");
    if (e.target.classList.contains("celsius")) {
      if (tempArray[1] === 'C') {
        displayTemperature(tempArray[0]);
      } else if (tempArray[1] === 'F') {
        displayTemperature(FtoC(tempArray[0]));
      }
    } else if (e.target.classList.contains("fahrenheit")) {
      if (tempArray[1] === 'C') {
        displayTemperature(CtoF(tempArray[0]));
      } else if (tempArray[1] === 'F') {
        displayTemperature(tempArray[0]);
      }
    }
  }
});

function displayTemperature(temp) {
  if (celsiusUnit.checked) {
    tempSpan.innerText = `${temp}°C`;
  } else {
    tempSpan.innerText = `${temp}°F`;
  }
  return;
}

function CtoF(tempInC) {
  return (Math.round(((tempInC * 9 / 5) + 32) * 10) / 10);
}

function FtoC(tempInF) {
  return (Math.round(((tempInF - 32) * 5 / 9) * 10) / 10);
}



// function getWeather(location) {
//   fetch(weatherURL, {mode:'cors'})
//   .then((response) => {
//     // return response.json();
//     throw new Error("oops something went wrong");
//   })
//   .catch((error) => {
//     return Promise.reject(error);
//   })
//   .then((response) => {
//     const currConditions = response.currentConditions;
//     console.log(currConditions);
//     return currConditions;
//   })
//   .catch((error) => {
//     console.log(error);
//     return error;
//   })
// }
