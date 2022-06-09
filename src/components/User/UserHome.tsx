import { AppBarComponent } from '../AppBar';
import { DrawerComponent } from '../Drawer';
import { DrawerHeader } from '../../utils/utils';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';
import { Box, CssBaseline, IconProps } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CameraRounded, HomeRounded, AccountBoxRounded, MonetizationOnRounded } from '@mui/icons-material';



export const UserHome: React.FC = () => {
  const { user } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);
  const navigate = useNavigate();


  const [open, setOpen] = useState<boolean>(false);
  const pages: {[key: string]: {icon: IconProps, link: string}} = {
    'Menu Principal': {icon: <HomeRounded/>, link: '/home'},
    'Mon Profil': {icon: <AccountBoxRounded/>, link: '/home/user/profil'},
    'Les œuvres': {icon: <CameraRounded/>, link: '/home/user/works'},
    'Mes achats': {icon: <MonetizationOnRounded/>, link: '/home/user/cart'}};

  useEffect(() => {
    Alerts.info({message: `Bienvenue à TradeArt ${user?.firstname || ''} ${user?.lastname || ''} !`});
    navigate('/home/user/works');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', background: "linear-gradient(to right top, #1972f7, #19c2fa, #64ddf5,#88e1fc ,#88e1fc ,#8cecff,#8cecff, #e6f7ff, #e6f7ff)", minWidth: '100%', height: '100%', minHeight: '100vh'}}>
      <CssBaseline />
      <AppBarComponent open={open} handleToggleDrawer={handleToggleDrawer} pages={pages}/>
      <DrawerComponent open={open} handleToggleDrawer={handleToggleDrawer} pages={pages} title={"Customer's Platform"}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
          <Outlet/>
      </Box>
    </Box>
  );
  
};