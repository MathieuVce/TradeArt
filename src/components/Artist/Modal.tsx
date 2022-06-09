import { useState } from "react";
import { IWork } from "../../@types/IClient";
import { checkIsNumber, create_blob } from "../../utils/utils";
import { EuroRounded } from '@mui/icons-material';
import { IconTextField } from "../IconTextField";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Box, Checkbox, FormControlLabel } from "@mui/material";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpload: (workValues: IWork) => Promise<void>;
}

export const Modal: React.FC<IModalProps> = ({ open, setOpen, handleUpload }) => {
  const [image, setImage] = useState<string>("");
  const [workValues, setCreateWork] = useState<IWork>({
    title: '',
    price: '',
    description: '',
    evaluation: '',
    picture: '',
    info: false,
  });

  const handleClose = () => {
    setOpen(false);
    setCreateWork({
      title: '',
      price: '',
      description: '',
      evaluation: '',
      picture: '',
      info: false
    });
    setImage('');
  };

  const handleChangeWork = (prop: keyof typeof workValues, value: string | number | boolean) => {
    setCreateWork({
        ...workValues,
        [prop]: value
    });
  };

  const handleDisabled = () => {
    return (workValues.title === '' || parseFloat(workValues.price) <= 0 || workValues.description === '' || workValues.picture === '');
  };

  const handleOnChange = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    create_blob(e.target.files[0], (blob) => {
      handleChangeWork('picture', blob);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color='primary'>Ajouter une œuvre</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ajouter un titre, une photo, une description et un prix puis l'oeuvre sera publiée aux yeux de tous !
        </DialogContentText>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <TextField
            required
            fullWidth
            type="text"
            id="title"
            label="Titre"
            name="title"
            onChange={(e) => handleChangeWork('title', e.target.value)}
            value={workValues.title}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            type="text"
            id="description"
            label="Courte description"
            name="description"
            multiline
            minRows={3}
            maxRows={4}
            onChange={(e) => handleChangeWork('description', e.target.value)}
            value={workValues.description}
          />
          <IconTextField
            variant='outlined'
            margin="normal"
            required
            fullWidth
            type='text'
            id="price"
            label="Prix"
            name="price"
            inputProps={{ maxLength: 10 }}
            onChange={(e) => handleChangeWork('price', e.target.value.replaceAll(' ','').replaceAll(',', '.'))}
            value={workValues.price}
            sx={{ mb: 2 }}
            iconEnd={<EuroRounded/>}
            error={workValues.price ? (parseFloat(workValues.price) <= 0 || !checkIsNumber(workValues.price)) : false}
            helperText={workValues.price ? ((parseFloat(workValues.price) <= 0 || !checkIsNumber(workValues.price)) ? 'Veuillez entrer un prix supérieur à 1' : '') : ''}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" onChange={() => {
              handleChangeWork("info", !workValues.info);
            }}/>}
            label={"Afficher mes infos ?"}
            value={workValues.info}
            checked={workValues.info}
          />
          {image && (
            <Box
              component="img"
              sx={{
                width: '100%',
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              border={.5}
              boxShadow={2}
              src={image}
            />
          )}
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 3 }}
          >
            {image ? 'Changer la photo' : 'Ajouter une photo'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleOnChange}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Retour</Button>
        <Button variant='contained' color='primary'  disabled={handleDisabled()} onClick={() => {
          handleUpload(workValues);
          handleClose();
        }}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};