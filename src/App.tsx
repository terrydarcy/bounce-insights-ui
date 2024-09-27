import React, { useEffect, useState } from "react";
import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Home from "./pages/home/home";
import marsIcon from "./mars3.png";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>
          {process.env.NODE_ENV}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ opacity: 0.8 }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <img src={marsIcon} alt="mars icon" style={{ width: 50 }} />
                </IconButton>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  Mars Explorer
                </Typography>
                <Divider />
                <List sx={{ display: "flex" }}>
                  <ListItem key={"apod"} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={"APOD"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={"map"} disablePadding>
                    <ListItemButton sx={{ textAlign: "center", marginLeft: 5 }}>
                      <ListItemText primary={"Map"} />
                    </ListItemButton>
                  </ListItem>{" "}
                  <ListItem key={"rover"} disablePadding>
                    <ListItemButton
                      sx={{
                        textAlign: "center",
                        textWrap: "nowrap",
                        marginLeft: 5,
                      }}
                    >
                      <ListItemText primary={"Rover Images"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={"weather"} disablePadding>
                    <ListItemButton sx={{ textAlign: "center", marginLeft: 5 }}>
                      <ListItemText primary={"Weather"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toolbar>
            </AppBar>
          </Box>
          <div className="container">
            <div className="stars-background"></div>
            <div className="mars-texture"></div>
            <div></div>
            <Home />
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
