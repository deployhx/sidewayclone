import { Hidden, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: "2",
        justifyContent: "space-between",
        background: "rgba(0, 0, 0, 0.66)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10.6px)",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <Hidden smDown>
          <Typography fontWeight="bold" ml={1} sx={{ color: "white" }} display="flex" flexDirection="row">
            <Typography variant="h4" sx={{color: "#dddddd"}} >Sideway</Typography>
            <Typography variant="h4" sx={{ color: "#af0" }}>Clone </Typography>
          </Typography>
        </Hidden>
      </Link>
      <Stack direction="row" alignItems="center" spacing={2}>
        <SearchBar />
        <Button
          component={Link}
          to="/subscriptions"
          variant="contained"
          color="success"
          sx={{ ml: 2 }}
        >
          Subscriptions
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
