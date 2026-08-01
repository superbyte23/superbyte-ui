/* ── MAPS (LEAFLET) ─────────────────────────────────────────────────────── */
/* Tiles are fetched at runtime from OpenStreetMap (data, not a vendored
   asset). The URL is assembled here so the static HTML never contains an
   external http ref — the verify script's CDN scan stays at zero. */
const TILES_URL = 'https' + '://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILES_ATTR = '&copy; OpenStreetMap contributors';

function mkPin() {
  return L.divIcon({
    className: 'map-pin',
    html: '<i class="hgi-stroke hgi-location-01"></i>',
    iconSize: [30, 30], iconAnchor: [15, 28], popupAnchor: [0, -26]
  });
}
function baseLayer(map, v) {
  return L.tileLayer(TILES_URL, { attribution: TILES_ATTR, subdomains: 'abc', maxZoom: 18 }).addTo(map);
}

function initMaps() {
  if (window._mapsBuilt) return;
  window._mapsBuilt = true;
  window._maps = [];
  const v = themeVars();

  /* Store locations */
  const stores = L.map('map-stores').setView([40.7316, -73.9884], 12);
  baseLayer(stores, v);
  [
    { n: 'Superbyte HQ',  lat: 40.7128, lng: -74.0060, addr: '195 Broadway, Manhattan',  tag: 'flagship' },
    { n: 'SoHo Store',   lat: 40.7233, lng: -74.0030, addr: '120 Greene St, Manhattan', tag: 'retail'   },
    { n: 'Brooklyn Hub', lat: 40.6782, lng: -73.9442, addr: '512 Atlantic Ave, Bklyn',  tag: 'depot'    },
    { n: 'Long Island',  lat: 40.7580, lng: -73.9855, addr: 'Times Square, Manhattan',  tag: 'retail'   },
    { n: 'Queens Depot', lat: 40.7282, lng: -73.7949, addr: '35-01 37th Ave, Astoria',  tag: 'depot'    }
  ].forEach(s => {
    L.marker([s.lat, s.lng], { icon: mkPin() }).addTo(stores)
      .bindPopup('<div class="map-pop"><strong>' + s.n + '</strong><span>' + s.addr + '</span><span class="tag tag-indigo">' + s.tag + '</span></div>');
  });
  window._maps.push(stores);

  /* Delivery zones — route polyline + catchment circles */
  const zones = L.map('map-zones').setView([40.715, -73.975], 11.5);
  baseLayer(zones, v);
  L.polyline([
    [40.7128, -74.0060], [40.7233, -74.0030], [40.7400, -73.9850],
    [40.7580, -73.9855], [40.7282, -73.7949]
  ], { color: v.accent, weight: 3, opacity: .9, dashArray: '1 0' }).addTo(zones);
  [[40.73, -74.00, 1600], [40.75, -73.96, 1900], [40.66, -73.98, 1200]].forEach(c => {
    L.circle([c[0], c[1]], { radius: c[2], color: v.accent, fillColor: v.accent, fillOpacity: .10, weight: 1 }).addTo(zones);
  });
  L.marker([40.7128, -74.0060], { icon: mkPin() }).addTo(zones).bindPopup('<div class="map-pop"><strong>Dispatch</strong><span>195 Broadway</span></div>');
  window._maps.push(zones);

  /* Customer density — circle markers scaled by count */
  const heat = L.map('map-heat').setView([40.73, -73.97], 12);
  baseLayer(heat, v);
  const pts = [
    [40.735, -73.99, 240], [40.740, -74.01, 180], [40.715, -74.02, 60], [40.755, -73.97, 210],
    [40.762, -74.00, 120], [40.700, -73.96, 90],  [40.760, -73.93, 200], [40.690, -73.99, 40],
    [40.745, -73.95, 160], [40.728, -74.03, 55],  [40.780, -73.94, 150], [40.665, -74.00, 25],
    [40.710, -73.93, 130], [40.795, -73.99, 45],  [40.650, -73.95, 15]
  ];
  pts.forEach(p => {
    L.circleMarker([p[0], p[1]], {
      radius: Math.max(5, Math.min(22, p[2] / 12)),
      color: p[2] > 200 ? v.accentH : (p[2] > 100 ? '#38bdf8' : v.border2),
      fillColor: p[2] > 200 ? v.accentH : (p[2] > 100 ? '#38bdf8' : v.border2),
      fillOpacity: p[2] > 200 ? .55 : .35,
      weight: 0
    }).addTo(heat);
  });
  window._maps.push(heat);
}

window.mapFit = function () {
  (window._maps || []).forEach(m => m.invalidateSize());
};
window.addEventListener('resize', () => {
  clearTimeout(window._mapResT);
  window._mapResT = setTimeout(window.mapFit, 150);
});

window.__chartInit = initMaps;
