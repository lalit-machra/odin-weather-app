console.log("running");
const weatherURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Prayagraj%2C%20India?unitGroup=metric&key=8A3P3JHP5ZKWEJAGY6PFLX59G&contentType=json&include=current&elements=temp,conditions,icon';
const submitBtn = document.querySelector(".submitBtn");
const input = document.querySelector("form input");
let place;

// async function fetchWeather(location) {
//   console.log("getting weather....");
//   try {
//     console.log("inside");
//     const weatherData = await fetch(weatherURL);
//     const weatherDataJSON = await weatherData.json();
//     console.log(weatherDataJSON);
//     const currConditions = weatherDataJSON.currentConditions;
//     console.log(currConditions);
//   } catch(error) {
//     console.log(`Oops ${error}`);
//   }
//   console.log("done");
// }

function fetchWeather(location) {
  fetch(weatherURL, {mode:'cors'})
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    return Promise.reject(error);
  })
  .then((response) => {
    const currConditions = response.currentConditions;
    console.log(currConditions);
    return currConditions;
  })
  .catch((error) => {
    console.log(error);
  })
}

submitBtn.addEventListener("click", () => {
  if (input.value) {
    place = input.value;
    fetchWeather(place);
  } else {
    throw new Error("Please enter a place to continue");
  }
});