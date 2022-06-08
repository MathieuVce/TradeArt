import { Modal } from "../Modal";
import { useState } from "react";
import { IClient, IWork } from "../../@types/IClient";
import { ExpandMore, Transition, stringAvatar } from "../../utils/utils";
import { ExpandMore as ExpandMoreIcon, CloseRounded } from "@mui/icons-material";
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, Typography, Collapse, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

interface ICardComponentProps {
  work: IWork;
  client: IClient;
  handleDelete: (key: number) => Promise<void>;
  isExpanding: boolean;
}

export const CardComponent: React.FC<ICardComponentProps> = ({ work, handleDelete, client, isExpanding }) => {
  const colors = ['#10c8d5', '#3399ff','#cc99ff', "#8585ad", "#b4b4e4", "#80d4ff"];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // const randomColor = stringToColor(work.title);
  const color = 'white';
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [popImg, setPopImg] = useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpenClick = () => {
    setOpen(!open);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="art" {...stringAvatar(`${client.firstname} ${client.lastname}`)} src={client.photo === 'p' ? '' : client.photo}/>
          }
          action={
            <Grid item>
              {isExpanding && (
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon style={{ color: color }} />
                </ExpandMore>
              )}
              {!work.sold && (
                <IconButton aria-label="settings" onClick={handleOpenClick}>
                  <CloseRounded style={{ color: color }} />
                </IconButton>
              )}
            </Grid>
          }
          title={<Typography variant="body1">{work.title}</Typography>}
          subheader={<Typography variant="caption">{work.sold ? 'Vendu' : 'En vente'}</Typography>}
          style={{ backgroundColor: work.sold ? 'grey' : (colors[work.work_id!%colors.length]), color: color }}
        /> 
        <Collapse in={isExpanding ? expanded : true} timeout="auto" unmountOnExit>
          <ImageListItem sx={{ maxHeight: 250, marginBottom: -1 }}>
            <CardMedia
              onClick={() => {setPopImg(true)}}
              component="img"
              image={work.picture}
              alt={work.title}
              sx={{ width: '100%', opacity: work.sold ? "0.1" : "1" }}
            />
            <ImageListItemBar
              color="secondary"
              title={work.title}
              subtitle={
              <>
                <Typography variant="h4" fontSize={'bold'}>
                  {work.price} €
                </Typography>
                <Typography variant="subtitle2" fontSize={'bold'} sx={{ color: 'grey', fontStyle: 'italic' }}>
                  {work.info ? 'Informations partagées' : 'Informations non partagées'}
                </Typography>
              </>
              }>
            </ImageListItemBar>
          </ImageListItem>
        </Collapse>
      </Card>
      <Modal info={true} buttonProps='OK' title={work.title} description={work.description} open={popImg} setOpen={setPopImg}>
        <CardMedia
          component="img"
          image={work.picture}
          alt={work.title}
        />
      </Modal>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOpenClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Supprimer définitivement ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Êtes-vous sûr de vouloir supprimer définitivement cette oeuvre ? <br></br>
            Cette action n'est pas réversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleOpenClick}>Retour</Button>
          <Button variant='contained' color='primary' onClick={() => {
            handleOpenClick();
            handleDelete(work.work_id!);
          }}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};