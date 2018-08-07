window.fireRestaurantes.initializeFirebase();
console.log("Sí jala")
const db = firebase.firestore();
console.log(db)
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

const btnFind = document.getElementById("btnLocation");

btnFind.addEventListener('click', findMe = () => {
    const print = document.getElementById('map');

    // Verificar geolocalización
    if (navigator.geolocation) {
        console.log("El navegador soporta Geolocalizacion");
    } else {
        console.log("El navegador no soporta Geolocalizacion");
    }

    //Latitud y longitud
    localization = (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const imgURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&size=375x300&markers=color:red%7C" + latitude + "," + longitude + "&key=AIzaSyBUaz17mTrasil6s3EjOP1NkpWqxRooDns&libraries=places";
        print.innerHTML = "<img src='" + imgURL + "'>";

    }

    error = () => {
        print.innerHTML = "<p>No fue posible obtener tu ubicación</p>";
    }
    navigator.geolocation.getCurrentPosition(localization, error);
});


//Buscar información de restaurantes en database 

let searchbar = document.getElementById('searchFood');
let searchBtn = document.getElementById('btnSearch');
let foodFind = document.getElementById('data-food');

db.collection("places").onSnapshot((querySnapshot) => {
    foodFind.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.data().address)
        foodFind.innerHTML += `<li class="restaurantes">${doc.data().name}`;
    });
});


//Buscador
var search = document.getElementById('searchFood'),
  restaurantes = document.getElementsByTagName('li'),
  forEach = Array.prototype.forEach;

search.addEventListener('keyup', function(result) {
  var choice = this.value;

  forEach.call(restaurantes, function(final) {
    if (final.innerHTML.toLowerCase().search(choice.toLowerCase()) === -1) {
      final.parentNode.style.display = 'none';
    } else {
      final.parentNode.style.display = '';
    }
  });
}, false);