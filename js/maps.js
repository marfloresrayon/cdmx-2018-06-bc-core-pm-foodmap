window.fireRestaurantes.initializeFirebase();
console.log("Funcionando")
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
        foodFind.innerHTML += `<div class="row">
        <div class="col s10 offset-s1 m7">
          <div class="card">
            <div class="card-image">
              <img src="${doc.data().url}">
              <span class="card-title">${doc.data().name}</span>
            </div>
            <div class="card-content">
            <p>Tipo de comida: ${doc.data().type}</p>
                  <p>Ranking: ${doc.data().ranking}</p>
                  <p>Calificación promedio: ${doc.data().rate}</p>
                  <p>Rango de precios: ${doc.data().price}</p>
            </div>
            <div class="card-action">
            <!-- Modal Trigger -->
            <button data-target="modal1" class="btn modal-trigger">Más información</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Más información</h4>
          <p>Teléfono: ${doc.data().phone}</p>
          <p>Dirección: ${doc.data().address} </p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Listo</a>
        </div>
      </div>`;

    });
});



//Buscador
var search = document.getElementById('searchFood'),
    restaurantes = document.getElementsByTagName('li'),
    forEach = Array.prototype.forEach;

search.addEventListener('keyup', function (result) {
    var choice = this.value;

    forEach.call(restaurantes, function (final) {
        if (final.innerHTML.toLowerCase().search(choice.toLowerCase()) === -1) {
            final.parentNode.style.display = 'none';
        } else {
            final.parentNode.style.display = '';
        }
    });
}, false);