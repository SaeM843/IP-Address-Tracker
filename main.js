"use strict";

const form = document.querySelector("form");
const input = document.getElementById("ip-input");
const ipEl = document.querySelector(".ip-result");
const locationEl = document.querySelector(".location-result");
const timezoneEl = document.querySelector(".timezone-result");
const ispEl = document.querySelector(".isp-result");

let lat;
let lng;
let ipLocation;

//Map
let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch("https://ipapi.co/json/")
  .then((res) => res.json())
  .then((data) => renderResults(data))
  .catch((error) => console.log(error));

function renderResults(data) {
  if (data.error) {
    throw `${data.reason}`;
  }

  ipEl.textContent = ipLocation = data.ip;
  locationEl.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
  if (data.utc_offset !== null) {
    timezoneEl.textContent =
      "UTC: " + data.utc_offset.slice(0, 3) + ":" + data.utc_offset.slice(3);
  } else {
    timezoneEl.textContent = data.timezone;
  }
  ispEl.textContent = data.org;

  lat = data.latitude;
  lng = data.longitude;
  // console.log(lat, lng);

  mapLocation(lat, lng);
  input.value = "";
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

  L.marker([lat, lng], { icon: marker })
    .addTo(map)
    .bindPopup(`<b>${ipLocation}</b>`)
    .openPopup();
};

//Search by ip and validation

const validateIP = function (e) {
  e.preventDefault();

  const regex =
    "((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))";
  // /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

  if (input.value.match(regex)) {
    fetch(`https://ipapi.co/${input.value}/json/`)
      .then((res) => res.json())
      .then((data) => renderResults(data))
      .catch((error) => console.log(error));
  } else {
    alert("Invalid IP address!");
    input.value = "";
    return;
  }
};

form.addEventListener("submit", validateIP);
