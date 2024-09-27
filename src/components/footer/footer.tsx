import "./footer.scss";
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
import IconButton from "@mui/material/IconButton";

export default function Footer() {
  return (
    <div className="footer-container">
      <Typography variant="body2">
        Developed by Terry D'Arcy for Bounce Insights
      </Typography>
    </div>
  );
}
