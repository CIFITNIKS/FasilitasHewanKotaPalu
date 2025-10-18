// Inisialisasi peta di pusat Kota Palu
var map = L.map('map').setView([-0.8917, 119.8707], 12);

// Tambahkan basemap OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ---------------------------
// 1️⃣ Data Fasilitas Hewan
// ---------------------------
var fasilitas = [
  { nama: "Hope Pets Friend", lat: -0.915434, lng: 119.886062, kategori: "Petshop" },
  { nama: "Royal Petshop", lat: -0.92376, lng: 119.88479, kategori: "Petshop" },
  { nama: "Qithun Petshop", lat: -0.89254, lng: 119.88353, kategori: "Petshop" },
  { nama: "Qithun Petshop 2", lat: -0.89613, lng: 119.84756, kategori: "Petshop" },
  { nama: "Aulia Home Petshop", lat: -0.90692, lng: 119.87034, kategori: "Petshop" },
  { nama: "R2 Hobby Petshop", lat: -0.92310, lng: 119.89438, kategori: "Petshop" },
  { nama: "PAW Petshop", lat: -0.89903, lng: 119.87921, kategori: "Petshop" },
  { nama: "Wau Wau Petshop", lat: -0.91824, lng: 119.87647, kategori: "Petshop" },
  { nama: "Wau Wau Petshop 2", lat: -0.89775, lng: 119.85958, kategori: "Petshop" },
  { nama: "BABE Petshop", lat: -0.79746, lng: 119.87478, kategori: "Petshop" },
  { nama: "King Petshop & Grooming", lat: -0.88029, lng: 119.87247, kategori: "Petshop" },
  { nama: "Meong Pet Shop", lat: -0.89530, lng: 119.88069, kategori: "Petshop" },
  { nama: "AB-9 Petshop", lat: -0.93085, lng: 119.86168, kategori: "Petshop" },
  { nama: "Satellite Petshop", lat: -0.90647, lng: 119.87999, kategori: "Petshop" },
  { nama: "Meong Petshop", lat: -0.90743, lng: 119.85664, kategori: "Petshop" },
  { nama: "Balya Petshop", lat: -0.92227, lng: 119.85395, kategori: "Petshop" },
  { nama: "Queen Petshop", lat: -0.92648, lng: 119.85684, kategori: "Petshop" },
  { nama: "Petshop Tolambu", lat: -0.89892, lng: 119.84991, kategori: "Petshop" },
  { nama: "Pet Shop Palu", lat: -0.89893, lng: 119.85983, kategori: "Petshop" },
  { nama: "Snow Petshop Palu", lat: -0.92668, lng: 119.86137, kategori: "Petshop" },
  { nama: "PAW Petshop 2", lat: -0.84845, lng: 119.88695, kategori: "Petshop" },
  { nama: "Huntap 1 Petshop Palu", lat: -0.83211, lng: 119.90454, kategori: "Petshop" },
  { nama: "Wau Wau Petshop Untad", lat: -0.84334, lng: 119.89169, kategori: "Petshop" },
  { nama: "Dokter Hewan Ica – Finar Petshop & Clinic", lat: -0.92937, lng: 119.85966, kategori: "Klinik Hewan" },
  { nama: "Louis Vet & Petshop", lat: -0.92182, lng: 119.89383, kategori: "Klinik Hewan" },
  { nama: "Mini Petshop", lat: -0.89564, lng: 119.86209, kategori: "Petshop" },
  { nama: "GG Petshop", lat: -0.90952, lng: 119.84626, kategori: "Petshop" },
  { nama: "Chocopet Clinic", lat: -0.89149, lng: 119.86352, kategori: "Klinik Hewan" },
  { nama: "Griya Petshop", lat: -0.92718, lng: 119.90307, kategori: "Petshop" },
  { nama: "Adelia Petshop", lat: -0.90630, lng: 119.85666, kategori: "Petshop" }
];

    // ---------------------------
    // 2️⃣ Buat ikon khusus untuk Petshop & Klinik
    // ---------------------------
    var ikonPetshop = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
    });

    var ikonKlinik = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2358/2358540.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
    });

    // ---------------------------
    // 3️⃣ Tambahkan marker ke peta
    // ---------------------------
    fasilitas.forEach(function(f) {
    // Pilih ikon berdasarkan kategori
    var iconPilihan = (f.kategori === "Klinik Hewan") ? ikonKlinik : ikonPetshop;

    // Pastikan data tidak undefined
    var namaTempat = f.nama || "Nama tidak tersedia";
    var kategoriTempat = f.kategori || "Tidak diketahui";

    // Tambahkan marker ke peta
    L.marker([f.lat, f.lng], { icon: iconPilihan })
        .addTo(map)
        .bindPopup(`<b>${namaTempat}</b><br>Kategori: ${kategoriTempat}`);
    });


// ---------------------------
// 5️⃣ Tambahkan Fitur Pencarian
// ---------------------------

// Buat layer group baru untuk marker pencarian
var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);

// Tambahkan semua marker ke layer pencarian
fasilitas.forEach(function(f) {
  var iconPilihan = (f.kategori === "Klinik Hewan") ? ikonKlinik : ikonPetshop;
  var marker = L.marker([f.lat, f.lng], { icon: iconPilihan, title: f.nama }) // penting: tambahkan title
    .bindPopup(`<b>${f.nama}</b><br>Kategori: ${f.kategori}`);
  markersLayer.addLayer(marker);
});

// Buat kontrol pencarian Leaflet
var searchControl = new L.Control.Search({
  layer: markersLayer,
  propertyName: 'title', // cari berdasarkan nama tempat
  initial: false,
  zoom: 16,
  marker: false,
  textPlaceholder: '🔍 Cari Petshop / Klinik Hewan...'
});

map.addControl(searchControl);

var searchBtn = document.querySelector('.leaflet-control-search .search-button');
if (searchBtn) {
    searchBtn.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/622/622669.png')"; // ikon teleskop
    searchBtn.style.backgroundRepeat = "no-repeat";
    searchBtn.style.backgroundPosition = "center";
    searchBtn.style.backgroundSize = "20px 20px";
    searchBtn.innerHTML = ""; // hilangkan simbol default 🔍
}


// ---------------------------
// 4️⃣ Tambahkan legenda ke peta
// ---------------------------
var legend = L.control({ position: "bottomleft" }); // posisi di kiri bawah

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML += "<h4>Kategori Fasilitas</h4>";
  div.innerHTML += `
    <div style='display:flex;align-items:center;margin-bottom:6px;'>
      <img src='https://cdn-icons-png.flaticon.com/512/616/616430.png' width='25' height='25' style='margin-right:8px;'> Petshop
    </div>
    <div style='display:flex;align-items:center;'>
      <img src='https://cdn-icons-png.flaticon.com/512/2358/2358540.png' width='25' height='25' style='margin-right:8px;'> Klinik Hewan
    </div>
  `;
  return div;
};

// Tambahkan legenda ke peta
legend.addTo(map);


// ---------------------------
// 6️⃣ Tambahkan Fitur "Lokasi Saya"
// ---------------------------

// Buat ikon khusus untuk lokasi pengguna
var userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -25]
});

// Fungsi untuk menampilkan lokasi pengguna
function tampilkanLokasiSaya() {
  if (!navigator.geolocation) {
    alert("Browser kamu tidak mendukung fitur lokasi.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;

      // Tambahkan marker lokasi pengguna
      var marker = L.marker([lat, lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("📍 Lokasi Saya")
        .openPopup();

      map.setView([lat, lng], 15); // Zoom ke lokasi
    },
    function (err) {
      alert("Gagal mendeteksi lokasi. Pastikan GPS aktif dan izinkan akses lokasi.");
    }
  );
}

// Buat tombol custom di peta
L.Control.LokasiSaya = L.Control.extend({
  onAdd: function (map) {
    var btn = L.DomUtil.create("button", "lokasi-saya-btn");
    btn.innerHTML = "📍 Lokasi Saya";
    btn.onclick = tampilkanLokasiSaya;
    return btn;
  },
  onRemove: function (map) {}
});

// Tambahkan tombol ke pojok kanan bawah
L.control.lokasiSaya = function (opts) {
  return new L.Control.LokasiSaya(opts);
};
L.control.lokasiSaya({ position: "bottomright" }).addTo(map);