import "./marsMap.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import rocketIconImg from "../../rocket.png"; // Import your local image
import { marsLandings, marsPOIs } from "./marsMapData";
import { Typography } from "@mui/material";

export default function MarsMap() {
  const rocketIcon = new Icon({
    iconUrl: rocketIconImg,
    iconSize: [60, 60], // Set the size of the icon
    iconAnchor: [30, 30], // Anchor the icon (center or bottom)
    popupAnchor: [0, -30], // Point where the popup should open relative to the icon
  });

  return (
    <div className="map-container">
      <Typography variant="h3">Explore Mars Landscape</Typography>
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
                <Typography variant="h5" className="title">
                  {landing.name} Mars Landing Site
                </Typography>
                <Typography variant="body2">
                  <strong>Landing Date:</strong> {landing.landing_date}
                </Typography>
                <Typography variant="body2">
                  {landing.mission_description}
                </Typography>
                <Typography variant="body2">
                  <strong>Mission Outcome:</strong> {landing.outcome}
                </Typography>
              </Popup>
            </Marker>
          ))}

          {marsPOIs.map((poi, index) => (
            <Marker
              key={index}
              position={[poi.coordinates.latitude, poi.coordinates.longitude]}
            >
              <Popup className="popup">
                <Typography variant="h4" className="title">
                  {poi.name} Point of Interest
                </Typography>
                <Typography variant="body2">{poi.description}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
