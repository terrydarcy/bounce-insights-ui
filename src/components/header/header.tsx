import { useEffect, useState } from "react";
import "./header.scss";
import marsIcon from "../../mars3.png";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    function handleWindowSizeChange() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [isMobile]);

  return (
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
          {!isMobile ? (
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
          ) : (
            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls={open ? "menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>APOD</MenuItem>
                <MenuItem onClick={handleClose}>MAP</MenuItem>
                <MenuItem onClick={handleClose}>Rover Images</MenuItem>
                <MenuItem onClick={handleClose}>Weather</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
