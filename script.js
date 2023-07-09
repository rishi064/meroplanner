const rightforForm = document.querySelector(".right");
const userInput = document.querySelector("#notetext");
const btn = document.querySelector("#ad-a-note");

let userKoNote;
let lat, lng;
let map;

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude, longitude } = position.coords;

    //Render a map:
    map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //Render a form on click on map:
    map.on("click", function (mapEvent) {
      console.log(mapEvent);
      lat = mapEvent.latlng.lat;
      lng = mapEvent.latlng.lng;

      //rendering a form:
      rightforForm.classList.remove("hidden");
    });
  },
  function () {
    alert("Couldn't get your location");
  }
);

btn.addEventListener("click", function (e) {
  e.preventDefault();
  userKoNote = userInput.value;
  console.log(userKoNote);

  //Display a marker:
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({ content: userKoNote, autoClose: false, closeOnClick: false })
    )
    .openPopup();

  //hide a form
  rightforForm.classList.add("hidden");
});
