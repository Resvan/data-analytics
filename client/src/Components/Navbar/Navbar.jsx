import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../../state";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  alignItems: "center",
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <AppBar sx={{ backgroundColor: "rgba(39, 11, 96, 0.5)" }} position="sticky">
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6">Data Analytics</Typography>
        </Link>
        <Icons>
          <DarkModeIcon onClick={() => dispatch(setMode())} color="white" />
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={user?.profilePic}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
