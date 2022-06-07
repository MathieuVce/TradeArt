import { useContext } from 'react';
// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import { AppBar } from '../utils/utils';
import { IResponse } from '../@types/IClient';
import { UserContext } from '../contexts/UserContext';
import { AlertContext } from '../contexts/AlertContext';
import { ClientContext } from '../contexts/ClientContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {  Menu, ExitToAppRounded } from '@mui/icons-material';
import { Toolbar, Typography, IconButton, Box, IconProps } from "@mui/material";

interface IAppBarComponentProps {
  open: boolean;
  handleToggleDrawer: () => void;
  pages: {[key: string]: {icon: IconProps, link: string}};
}

export const AppBarComponent: React.FC<IAppBarComponentProps> = ({ open, handleToggleDrawer, pages }) => {
  const { client, logout } = useContext(ClientContext);
  const { logoutU } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleLogout = async () => {
    const response: IResponse = client ? await logout() : await logoutU();
    Alerts[response.status]({message: response.message});
    navigate("/");
  };
  
  return (
    <AppBar position="fixed" open={open} color='inherit'>
      <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
            }}>
            <Menu />
        </IconButton>
        <Typography  justifySelf={'center'} variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {/* eslint-disable-next-line array-callback-return */}
          {Object.keys(pages).map((page, i) => {
            <Typography key={i} variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {location.pathname === pages[page].link ? page : ''}
            </Typography>
          }
          )}
        </Typography>
        <Box
          component='img'
          sx={{ maxHeight: 75, height: 75, py: 0.5, mr: 2 }}
          alt="logo"
          src={logo}
        />
        <IconButton
          color="inherit"
          aria-label="logout"
          onClick={handleLogout}
          edge="start"
        >
          <ExitToAppRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};