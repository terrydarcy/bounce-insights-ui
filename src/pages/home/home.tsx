import React from "react";
import { Wind, Thermometer, Camera, Calendar, Rocket } from "lucide-react";
import "./home.scss";
import MarsMap from "../../components/marsMap/marsMap";
import APOD from "../../components/apod/apod";
import RoverImageExplorer from "../../components/rover-image-explorer/rover-image-explorer";

export default function Home() {
  return (
    <>
      <APOD />
      <MarsMap />
    </>
  );
}
