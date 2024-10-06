import { useRef } from 'react';
import './home.scss';
import MarsMap from '../../components/marsMap/marsMap';
import APOD from '../../components/apod/apod';
import RoverImageExplorer from '../../components/rover-image-explorer/rover-image-explorer';

interface HomeProps {
  apodRef: React.RefObject<HTMLDivElement>;
  marsMapRef: React.RefObject<HTMLDivElement>;
  roverImageExplorerRef: React.RefObject<HTMLDivElement>;
}

export default function Home({ apodRef, marsMapRef, roverImageExplorerRef }: HomeProps) {
  return (
    <>
      <div ref={apodRef}>
        <APOD />
      </div>
      <div ref={marsMapRef}>
        <MarsMap />
      </div>
      <div ref={roverImageExplorerRef}>
        <RoverImageExplorer />
      </div>
    </>
  );
}
