document.addEventListener("DOMContentLoaded", () => {

    const destino = [41.655734, -0.910165];
    let map = L.map('mi_mapa', {
        attributionControl: false,
      }).setView(destino, 16);
    let ubicacionUsuario = null;
    const checkbox = document.getElementById("consentimiento");
    const botonRuta = document.getElementById("botonRuta");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(destino).addTo(map).bindPopup("Mundo Coche");
    //Funcion para obtener ubicacion del usuario
    checkbox.addEventListener("change", function () {
        if (this.checked && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              ubicacionUsuario = L.latLng(pos.coords.latitude, pos.coords.longitude);
              L.marker(ubicacionUsuario).addTo(map).bindPopup("Tu ubicación").openPopup();
              map.fitBounds([ubicacionUsuario, L.latLng(destino)]);
              botonRuta.disabled = false;
            },
            (err) => {
              alert("No se pudo obtener tu ubicación: " + err.message);
            }
          );
        } else {
          botonRuta.disabled = true;
          ubicacionUsuario = null;
        }
    });

    botonRuta.addEventListener("click", () => {
        if (!ubicacionUsuario) {
          alert("Primero acepta compartir tu ubicación.");
          return;
        }
        L.Routing.control({
            waypoints: [ubicacionUsuario, destino],  // Coordenadas de inicio y destino
            routeWhileDragging: true,  // Permitir arrastrar para ajustar la ruta
            instructions: false,
            createMarker: function() { return null; },  // No crear marcadores adicionales
            showAlternatives: false,  // No mostrar rutas alternativas
            instructions: false,  // Desactivar la visualización de instrucciones
          }).addTo(map);
        const leafletTopRight = document.querySelector('.leaflet-top.leaflet-right');
        if (leafletTopRight) {
        L.DomUtil.remove(leafletTopRight);
        }
    });
});