document.addEventListener("DOMContentLoaded", async () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const address = mapDiv.dataset.location; // e.g. "Jaipur, India"

  // 1️⃣ Fetch coordinates
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=3f00aa854e6a457fbc310f39ad22172e`
  );

  const data = await response.json();

  // 2️⃣ Extract lat/lng
  const { lat, lng } = data.results[0].geometry;

  // 3️⃣ Create map
  const map = L.map("map").setView([lat, lng], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<h4>${address}</h4><p>Exact location provided after booking</p>`)
    .openPopup();
});
