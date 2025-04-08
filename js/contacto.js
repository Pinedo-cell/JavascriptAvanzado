let map = L.map('mi_mapa').setView([41.655734, -0.910165], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([41.655734, -0.910165]).addTo(map).bindPopup("Mundo Coche");

map.on('click', onMapClick);

function onMapClick(e) {
    alert("Coordenadas del clic: " + e.latlng);
}