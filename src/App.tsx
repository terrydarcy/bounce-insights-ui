import React, { useEffect, useState } from "react";
import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      h1: {
        fontWeight: 600,
        fontSize: "2.25rem",
        lineHeight: 2.75,
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.625rem",
        lineHeight: 2.125,
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.375rem",
        lineHeight: 1.75,
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.5,
      },
      h5: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: 1.25,
      },
      h6: {
        fontWeight: 600,
        fontSize: "0.875rem",
        lineHeight: 1.25,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.25,
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>
          <Header />
          <div className="container">
            <div className="stars-background"></div>
            <div className="mars-texture"></div>
            <div></div>
            <Home />
          </div>
          <Footer />
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
