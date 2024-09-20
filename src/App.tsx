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

function App() {
  const [APODData, setAPODData] = useState<ApodResponse | null>(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const apiService = new ApiService();
    apiService.fetchApod().then((data) => {
      setAPODData(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>
          {APODData && (
            <div>
              <h2>Astronomy Picture of the Day</h2>
              <img className="aopd" src={APODData.hdurl} alt="Logo" />
              <h3>{APODData.title}</h3>
              <p>{APODData.explanation}</p>
              <p>Copyright @{APODData.copyright}</p>
            </div>
          )}
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
