import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './MapEmbed.css';

/* ----------------------------------------------------------------
   Leaflet's default marker icon breaks with Vite's asset pipeline
   because it resolves PNG paths at build time. We rebuild the icon
   manually pointing at the CDN copies to avoid bundler issues.
   ---------------------------------------------------------------- */
const defaultIcon = L.icon({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowSize:  [41, 41],
});

const SANRIO_HQ = {
  lat: 35.6413,
  lng: 139.6969,
  label: 'Sanrio Co., Ltd. — Tokyo HQ',
  address: '1-6-1 Osaki, Shinagawa-ku, Tokyo, Japan',
};

const MapEmbed = () => (
  <div className="map-embed" aria-label="Office location map">
    <MapContainer
      center={[SANRIO_HQ.lat, SANRIO_HQ.lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="map-embed__map"
      aria-label={SANRIO_HQ.label}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      />
      <Marker position={[SANRIO_HQ.lat, SANRIO_HQ.lng]} icon={defaultIcon}>
        <Popup>
          <strong>{SANRIO_HQ.label}</strong>
          <br />
          {SANRIO_HQ.address}
        </Popup>
      </Marker>
    </MapContainer>
  </div>
);

export default MapEmbed;
