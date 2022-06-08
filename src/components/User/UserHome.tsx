import { AppBarComponent } from '../AppBar';
import { DrawerComponent } from '../Drawer';
import { DrawerHeader } from '../../utils/utils';
import { useLocation, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, CssBaseline, IconProps } from '@mui/material';
import { CameraRounded, HomeRounded, AccountBoxRounded, MonetizationOnRounded } from '@mui/icons-material';



export const UserHome: React.FC = () => {
  const { user } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const pages: {[key: string]: {icon: IconProps, link: string}} = {
    'Menu Principal': {icon: <HomeRounded/>, link: '/home'},
    'Mon Profil': {icon: <AccountBoxRounded/>, link: '/home/user/profil'},
    'Les œuvres': {icon: <CameraRounded/>, link: '/home/user/works'},
    'Mes achats': {icon: <MonetizationOnRounded/>, link: '/home/user/cart'}};

  useEffect(() => {
    Alerts.info({message: `Bienvenue à TradeArt ${user?.firstname || ''} ${user?.lastname || ''} !`});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#e6f7ff', minWidth: '100%', height: '100%', minHeight: '100vh'}}>
      <CssBaseline />
      <AppBarComponent open={open} handleToggleDrawer={handleToggleDrawer} pages={pages}/>
      <DrawerComponent open={open} handleToggleDrawer={handleToggleDrawer} pages={pages} title={"Customer's Platform"}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {location.pathname === '/home' ? (
          <Typography variant="h4" color='primary' textAlign={'center'}>
            Bienvenue sur TradeArt {user?.firstname} {user?.lastname} !
          </Typography>
        ) : (
          <Outlet/>
        )}
      </Box>
    </Box>
  );
  
};