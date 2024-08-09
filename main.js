// API
const api = '1d13e43fa82f27c52cc1b4d461e38505'; 
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;
  // accesing geolocation of user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // fetching data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // converting time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;

          // checks weather for background colour
          if (description.toLowerCase().includes("rain") || description.toLowerCase().includes("thunderstorm") || description.toLowerCase().includes("drizzle") || description.toLowerCase().includes("snow") || description.toLowerCase().includes("sleet") || description.toLowerCase().includes("overcast clouds")){
            document.body.classList.add('greybg')
          }
          else if (description.toLowerCase().includes('clear')) {
            document.body.classList.add('yellowbg');
          }
          else if (description.toLowerCase().includes('rairain')) {
            document.body.classList.add('bluebg');
          }
          else if (description.toLowerCase().includes('few clouds') ||description.toLowerCase().includes('scattered clouds')) {
            document.body.classList.add('greybluebg');
          }

    });
    });
  }
});