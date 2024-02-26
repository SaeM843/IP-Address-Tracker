"use strict";

const form = document.querySelector("form");
const input = document.getElementById("ip-input");
const ipEl = document.querySelector(".ip-result");
const locationEl = document.querySelector(".location-result");
const timezoneEl = document.querySelector(".timezone-result");
const ispEl = document.querySelector(".isp-result");
const API_Key = config.apikey;

let lat;
let lng;

//Get the current location//
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     // console.log(latitude, longitude);

//     const coords = [latitude, longitude];

//     const map = L.map("map").setView(coords, 13);

//     const tileUrl = L.tileLayer(
//       "https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
//       {
//         maxZoom: 19,
//         attribution:
//           '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       }
//     ).addTo(map);

//     const marker = L.marker(coords)
//       .addTo(map)
//       .bindPopup("<b>Hello world!</b><br>I am a popup.")
//       .openPopup();
//   },
//   function () {
//     alert("Could not get your location");
//   }
// );

// const getIP = function (e) {
//   e.preventDefault();

//   fetch(API_Key + input.value)
//     .then((res) => res.json())
//     .then((data) => renderResults(data));
// };

// function renderResults(data) {
//   if (data.error) {
//     throw `${data.reason}`;
//   }

//   ipEl.textContent = data.ip;
//   locationEl.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
//   timezoneEl.textContent = `UTC: ${data.location.timezone}`;
//   ispEl.textContent = data.isp;

//   map.setView([data.latitude, data.longitude], 13);
//   // map.setView([data.latitude, data.longitude], 13);
//   // marker
//   //   .marker([data.latitude, data.longitude])
//   //   .addTo(map)
//   //   .bindPopup(`<b>${data.ip}</b>`)
//   //   .openPopup();
// }

// form.addEventListener("submit", getIP);

//Map
let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch(API_Key + input.value)
  .then((res) => res.json())
  .then((data) => renderResults(data))
  .catch((error) => console.log(error));

function renderResults(data) {
  if (data.error) {
    throw `${data.reason}`;
  }

  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
  timezoneEl.textContent = `UTC: ${data.location.timezone}`;
  ispEl.textContent = data.isp;

  lat = data.location.lat;
  lng = data.location.lng;
  // console.log(lat, lng);

  mapLocation(lat, lng);
}

//Marker
const mapLocation = function (lat, lng) {
  const marker = L.icon({
    iconUrl: "./images/icon-location.svg",
  });
  map.setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: false,
  }).addTo(map);

  L.marker([lat, lng], { icon: marker }).addTo(map);
};

//Search by ip and validation

const validateIP = function (e) {
  e.preventDefault();

  const regex =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

  if (input.value.match(regex)) {
    fetch(API_Key + input.value)
      .then((res) => res.json())
      .then((data) => renderResults(data))
      .catch((error) => console.log(error));
  } else {
    alert("Invalid IP address!");
    return;
  }
};

form.addEventListener("submit", validateIP);
