const form = document.querySelector("form");
const input = document.getElementById("ip-input");
const ipEl = document.querySelector(".ip-result");
const locationEl = document.querySelector(".location-result");
const timezoneEl = document.querySelector(".timezone-result");
const ispEl = document.querySelector(".isp-result");

const map = L.map("map").setView([51.505, -0.09], 13);
const tileUrl = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);
//   },
//   function () {
//     alert("Could not get your location");
//   }
// );
