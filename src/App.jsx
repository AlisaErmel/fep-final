import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TrainingsList from "./components/TrainingsList";
import CustomersList from "./components/CustomersList";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CalendarPage from './components/Calendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Statistics from './components/Statistics';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';;

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0.5 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Personal Trainer</Typography>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/customers" onClick={handleClose}>
                <AccountBoxIcon sx={{ mr: 1 }} />
                Customers
              </MenuItem>
              <MenuItem component={Link} to="/trainings" onClick={handleClose}>
                <DirectionsRunIcon sx={{ mr: 1 }} />
                Trainings
              </MenuItem>
              <MenuItem component={Link} to="/calendar" onClick={handleClose}>
                <CalendarMonthIcon sx={{ mr: 1 }} />
                Calendar
              </MenuItem>
              <MenuItem component={Link} to="/statistics" onClick={handleClose}>
                <InsertChartOutlinedIcon sx={{ mr: 1 }} />
                Statistics
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="" element={<CustomersList />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/trainings" element={<TrainingsList />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/statistic" element={<Statistics />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
