import { Transition } from "../utils/utils";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";

interface IModalProps {
  open: boolean;
  title: string;
  description: string;
  info: boolean;
  buttonProps: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEvent?: () => Promise<void>;
}

export const Modal: React.FC<IModalProps> = ({ open, setOpen, title, description, info, buttonProps, handleEvent, children }) => {
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
      <DialogTitle color='primary'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        {!info && (
          <Button variant='outlined' onClick={handleClose}>{buttonProps.split('&')[0]}</Button>
        )}
        <Button variant='contained' color='primary'  onClick={info ? () => handleClose() : () => handleEvent!()}>{info ? buttonProps : buttonProps.split('&')[1]}</Button>
      </DialogActions>
    </Dialog>
  );
};