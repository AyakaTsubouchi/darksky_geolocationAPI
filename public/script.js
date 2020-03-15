//map (leaflet)
// let lat;
// let lon;
const map = L.map('map').setView([0, 0], 3);
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(map);
const myIcon = L.icon({
  iconUrl: './cute.png',

  iconSize: [50, 50] // size of the icon

  // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const marker = L.marker([0, 0], { icon: myIcon })
  .bindPopup('<b>Hello world!</b><br>I am here.')
  .openPopup()
  .addTo(map);

const getLoc = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const activity = document.getElementById('activity').value;
      marker.setLatLng([lat, lon]);
      map.setView([lat, lon], 13);
      document.getElementById('lat').innerHTML = lat;
      document.getElementById('lon').innerHTML = lon;

      const data = { lat, lon, activity };
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      };
      const response = await fetch('./api', option);
      const json = await response.json();
      console.log(json);
    });
  } else {
    console.log('geolocation IS NOT available');
  }
};

const activityLog = () => {
  const activityList = [];
  const data = fetch('../database.db');
  console.log(data);
};
const database =
  '/Users/ayaka/OneDrive/AyakaProgramming/WIL/2javascript/darkSky-geolocateAPI/database.db';
async function getdata() {
  const response = await fetch(database);
  const data = await response.json();
  console.log(data);
}

getLoc();
// getdata();
