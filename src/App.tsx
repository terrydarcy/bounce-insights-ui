import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ApiService } from "./services/apiService";
import { ApodResponse } from "./interfaces/apiInterface";
import {
  MapContainer,
  TileLayer,
  useMap,
  CircleMarker,
  Marker,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import rocketIconImg from "./rocket.png"; // Import your local image

function App() {
  const [APODData, setAPODData] = useState<ApodResponse | null>(null);

  const rocketIcon = new Icon({
    iconUrl: rocketIconImg,
    iconSize: [60, 60], // Set the size of the icon
    iconAnchor: [30, 30], // Anchor the icon (center or bottom)
    popupAnchor: [0, -30], // Point where the popup should open relative to the icon
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const marsLandings = [
    {
      name: "Viking 1",
      mission_description:
        "Viking 1 was the first spacecraft to successfully land on Mars, conducting a variety of experiments to search for signs of life and to analyze the Martian surface.",
      outcome:
        "Mission successfully completed; provided the first high-resolution images of the Martian surface and important scientific data.",
      coordinates: {
        latitude: 22.456,
        longitude: -47.975,
      },
      landing_date: "1976-07-20",
    },
    {
      name: "Viking 2",
      mission_description:
        "Viking 2 continued the exploration of Mars initiated by Viking 1, providing additional data and images of the Martian surface.",
      outcome:
        "Mission successfully completed; helped map and analyze Martian geography and atmosphere.",
      coordinates: {
        latitude: 47.976,
        longitude: -134.21,
      },
      landing_date: "1976-09-03",
    },
    {
      name: "Mars Pathfinder (Sojourner)",
      mission_description:
        "Mars Pathfinder was a mission that included a lander and a small rover named Sojourner, designed to demonstrate the feasibility of low-cost landings on and exploration of Mars.",
      outcome:
        "Mission successfully completed; provided valuable data and images of the Martian surface and demonstrated rover technology.",
      coordinates: {
        latitude: 19.33,
        longitude: -33.55,
      },
      landing_date: "1997-07-04",
    },
    {
      name: "Spirit",
      mission_description:
        "Spirit was one of the two Mars Exploration Rovers that explored the surface of Mars, conducting extensive geological surveys.",
      outcome:
        "Mission successfully completed; discovered evidence of past water on Mars and provided detailed geological data.",
      coordinates: {
        latitude: -14.568,
        longitude: 175.472,
      },
      landing_date: "2004-01-04",
    },
    {
      name: "Opportunity",
      mission_description:
        "Opportunity was the second Mars Exploration Rover, designed to explore the Martian terrain and gather data about the planet's geology.",
      outcome:
        "Mission successfully completed; greatly exceeded its expected lifespan, discovering hematite and other minerals indicating past water presence.",
      coordinates: {
        latitude: -1.951,
        longitude: 354.475,
      },
      landing_date: "2004-01-25",
    },
    {
      name: "Curiosity",
      mission_description:
        "Curiosity is a car-sized rover designed to explore Mars and assess the planet's habitability, including its geological and environmental conditions.",
      outcome:
        "Mission ongoing; has discovered organic molecules and evidence of ancient water, continuing to send valuable data back to Earth.",
      coordinates: {
        latitude: -4.5895,
        longitude: 137.4417,
      },
      landing_date: "2012-08-06",
    },
    {
      name: "Phoenix Landing Site",
      mission_description:
        "The site where the Phoenix lander explored Martian ice and soil, particularly looking for water.",
      outcome:
        "Mission successfully completed; confirmed the presence of water ice on Mars and analyzed soil samples.",
      coordinates: {
        latitude: 68.22,
        longitude: -125.0,
      },
      landing_date: "2008-05-25",
    },
    {
      name: "Perseverance",
      mission_description:
        "Perseverance is a rover designed to seek signs of ancient life and collect rock and soil samples for potential return to Earth.",
      outcome:
        "Mission ongoing; has successfully landed and is conducting experiments in Jezero Crater, including the collection of samples.",
      coordinates: {
        latitude: 18.6582,
        longitude: 77.6044,
      },
      landing_date: "2021-02-18",
    },
  ];

  const marsPOIs = [
    {
      name: "Valles Marineris",
      description:
        "A vast canyon system that stretches over 4,000 km, it's one of the largest canyons in the solar system.",
      coordinates: {
        latitude: -14.5,
        longitude: 69.5,
      },
    },
    {
      name: "Olympus Mons",
      description:
        "The tallest volcano and the highest known mountain in the solar system, standing about 22 km high.",
      coordinates: {
        latitude: 18.65,
        longitude: 226.2,
      },
    },
    {
      name: "Gale Crater",
      description:
        "A large crater that hosts Mount Sharp, a central peak rising 5.5 km, where the Curiosity rover is exploring.",
      coordinates: {
        latitude: -5.4,
        longitude: 137.8,
      },
    },
    {
      name: "Noctis Labyrinthus",
      description:
        "A region characterized by a complex system of deep valleys and canyons, often referred to as the 'Labyrinth of Night.'",
      coordinates: {
        latitude: 6.0,
        longitude: 67.0,
      },
    },
    {
      name: "Hellas Planitia",
      description:
        "The largest visible impact crater on Mars, with a depth of 7,152 m, located in the southern hemisphere.",
      coordinates: {
        latitude: -42.0,
        longitude: 70.0,
      },
    },
    {
      name: "Meridiani Planum",
      description:
        "A flat region of Mars where the Opportunity rover landed, known for its hematite-rich rocks.",
      coordinates: {
        latitude: -2.0,
        longitude: 357.0,
      },
    },
    {
      name: "Tharsis Volcanic Region",
      description:
        "Home to several large volcanoes, including Olympus Mons, this region features vast lava flows.",
      coordinates: {
        latitude: 0.0,
        longitude: 100.0,
      },
    },
    {
      name: "Dahlia Crater",
      description:
        "A smaller crater known for its unique geological features and potential for ancient water presence.",
      coordinates: {
        latitude: -6.0,
        longitude: 134.0,
      },
    },
  ];

  useEffect(() => {
    // const apiService = new ApiService();
    // apiService.fetchApod().then((data) => {
    //   setAPODData(data);
    //   console.log(data);
    // });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>
          {/* {APODData && (
            <div>
              <h2>Astronomy Picture of the Day</h2>
              <img className="aopd" src={APODData.hdurl} alt="Logo" />
              <h3>{APODData.title}</h3>
              <p>{APODData.explanation}</p>
              <p>Copyright @{APODData.copyright}</p>
            </div>
          )} */}
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
                  position={[
                    poi.coordinates.latitude,
                    poi.coordinates.longitude,
                  ]}
                >
                  <Popup className="popup">
                    <h3>{poi.name} Point of Interest</h3>
                    <p>{poi.description}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
