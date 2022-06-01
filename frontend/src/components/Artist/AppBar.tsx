import { useContext } from 'react';
import logo from '../../assets/logo.svg';
import { AppBar } from '../../utils/utils';
import { IResponse } from '../../@types/IClient';
import { AlertContext } from '../../contexts/AlertContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClientContext } from '../../contexts/ClientContext';
import {  Menu, ExitToAppRounded } from '@mui/icons-material';
import { Toolbar, Typography, IconButton, Box, IconProps } from "@mui/material";

interface IAppBarComponentProps {
  open: boolean;
  handleToggleDrawer: () => void;
  pages: {[key: string]: {icon: IconProps, link: string}};
}

export const AppBarComponent: React.FC<IAppBarComponentProps> = ({ open, handleToggleDrawer, pages }) => {
  const { logout } = useContext(ClientContext);
  const { Alerts } = useContext(AlertContext);
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleLogout = async () => {
    const response: IResponse = await logout();
    Alerts[response.status]({message: response.message});
    navigate("/");
  };
  
  return (
    <AppBar position="fixed" open={open}>
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
          {Object.keys(pages).map((page, i) => {
            if (location.pathname === pages[page].link) {
              return <label key={i}>{page}</label>
            } else
              return <></>
          }
          )}
        </Typography>
        <Box
          component='img'
          sx={{ maxHeight: 80, height: 70, py: 0.5, mr: 2 }}
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