const form = document.querySelector("form");
const input = document.getElementById("ip-input");
const ipEl = document.querySelector(".ip-result");
const locationEl = document.querySelector(".location-result");
const timezoneEl = document.querySelector(".timezone-result");
const ispEl = document.querySelector(".isp-result");
const API_Key = config.apikey;

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);

    const coords = [latitude, longitude];

    const map = L.map("map").setView(coords, 13);

    const tileUrl = L.tileLayer(
      "https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);

    const marker = L.marker(coords)
      .addTo(map)
      .bindPopup("<b>Hello world!</b><br>I am a popup.")
      .openPopup();
  },
  function () {
    alert("Could not get your location");
  }
);

const getIP = function (e) {
  e.preventDefault();

  fetch(API_Key + input.value)
    .then((res) => res.json())
    .then((data) => renderResults(data));
};

function renderResults(data) {
  if (data.error) {
    throw `${data.reason}`;
  }

  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.city}, ${data.region}, ${data.country}`;
  timezoneEl.textContent = `UTC: ${data.timezone}`;
  ispEl.textContent = data.isp;

  map.setView([data.latitude, data.longitude], 13);
  marker
    .marker([data.latitude, data.longitude])
    .addTo(map)
    .bindPopup(`<b>${data.ip}</b>`)
    .openPopup();
}

form.addEventListener("submit", getIP);
