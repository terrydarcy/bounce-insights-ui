import "./marsMap.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import rocketIconImg from "../../rocket.png"; // Import your local image
import { marsLandings, marsPOIs } from "./marsMapData";

export default function MarsMap() {
  const rocketIcon = new Icon({
    iconUrl: rocketIconImg,
    iconSize: [60, 60], // Set the size of the icon
    iconAnchor: [30, 30], // Anchor the icon (center or bottom)
    popupAnchor: [0, -30], // Point where the popup should open relative to the icon
  });

  return (
    <div className="map-container">
      <h3 className="map-title">Explore Mars Landscape</h3>
      <div className="map">
        <MapContainer
          center={[-4.5895, 137.4417]}
          zoom={2}
          scrollWheelZoom={true}
        >
          <TileLayer
            updateWhenIdle={true}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
          />
          {marsLandings.map((landing, index) => (
            <Marker
              key={index}
              icon={rocketIcon}
              position={[
                landing.coordinates.latitude,
                landing.coordinates.longitude,
              ]}
            >
              <Popup className="popup">
                <h3>{landing.name} Mars Landing Site</h3>
                <p>
                  <strong>Landing Date:</strong> {landing.landing_date}
                </p>
                <p>{landing.mission_description}</p>
                <p>
                  <strong>Outcome:</strong> {landing.outcome}
                </p>
              </Popup>
            </Marker>
          ))}

          {marsPOIs.map((poi, index) => (
            <Marker
              key={index}
              position={[poi.coordinates.latitude, poi.coordinates.longitude]}
            >
              <Popup className="popup">
                <h3>{poi.name} Point of Interest</h3>
                <p>{poi.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
