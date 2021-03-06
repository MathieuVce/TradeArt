import { useTheme } from '@mui/material/styles';
import { Drawer, DrawerHeader } from '../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon , ListItemText, Typography, IconProps } from '@mui/material';

interface IDrawerComponentProps {
  open: boolean;
  title: string;
  handleToggleDrawer: () => void;
  pages: {[key: string]: {icon: IconProps, link: string}};
}

export const DrawerComponent: React.FC<IDrawerComponentProps> = ({ open, handleToggleDrawer, pages, title }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography variant="body1">{title}</Typography>
        <IconButton onClick={handleToggleDrawer}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ pt: .7 }} />
      <List>
        {Object.keys(pages).map((text, index) => index !== 0 && (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={location.pathname === pages[text].link}
              sx={{
                maxHeight: 38,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                m: 1,
                '&.Mui-selected': {
                  backgroundColor: '#002E82'
                },
                borderRadius: '20px',
              }}
              onClick={() => {navigate(pages[text].link)}}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === pages[text].link ? 'whitesmoke' : 'grey'
                }}
              >
                {pages[text].icon}
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0, color: location.pathname === pages[text].link ? 'whitesmoke' : 'grey' }}>
                {text}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};