import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      h1: {
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 2.75,
      },
      h2: {
        fontWeight: 600,
        fontSize: '1.625rem',
        lineHeight: 2.125,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.375rem',
        lineHeight: 1.75,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.5,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.25,
      },
      h6: {
        fontWeight: 600,
        fontSize: '0.875rem',
        lineHeight: 1.25,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.25,
      },
    },
  });

  const apodRef = useRef<HTMLDivElement>(null);
  const marsMapRef = useRef<HTMLDivElement>(null);
  const roverImageExplorerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const offset = 64; // Adjust this value to set the desired offset for the header

    console.log('test');
    let element: HTMLElement | null = null;
    switch (section) {
      case 'apod':
        element = apodRef.current;
        break;
      case 'marsMap':
        element = marsMapRef.current;
        break;
      case 'roverImageExplorer':
        element = roverImageExplorerRef.current;
        break;
      default:
        break;
    }

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>
          <Header scrollToSection={scrollToSection} />
          <div className="container">
            <div className="stars-background"></div>
            <div className="mars-texture"></div>
            <div></div>
            <Home apodRef={apodRef} marsMapRef={marsMapRef} roverImageExplorerRef={roverImageExplorerRef} />
          </div>
          <Footer />
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
