import { useState } from "react";
import { IClient, IWork } from "../../@types/IClient";
import { ExpandMore, Transition, stringAvatar, stringToColor } from "../../utils/utils";
import { ExpandMore as ExpandMoreIcon, CloseRounded } from "@mui/icons-material";
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Collapse, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ICardComponentProps {
  work: IWork;
  client: IClient;
  handleDelete: (key: number) => Promise<void>;
  isExpanding: boolean;
}

export const CardComponent: React.FC<ICardComponentProps> = ({ work, handleDelete, client, isExpanding }) => {
  // const colors = ['#f0b93a', '#32a852', '#0eaab5', '#9b58d6'];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomColor = stringToColor(work.title);
  const color = 'white';
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpenClick = () => {
    setOpen(!open);
  };
  return (
     <Grid item xs={12} sm={6}>
      <Card sx={{ minWidth: 275, mt: 2, boxShadow: 3 }}>
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
              <IconButton aria-label="settings" onClick={handleOpenClick}>
                <CloseRounded style={{ color: color }} />
              </IconButton>
            </Grid>
          }
          title={<Typography variant="body1">{work.title}</Typography>}
          subheader={<Typography variant="caption">{work.sold ? 'Vendu' : 'En vente'}</Typography>}
          style={{ backgroundColor: randomColor, color: color }}
        /> 
        <Collapse in={isExpanding ? expanded : true} timeout="auto" unmountOnExit>
          <CardMedia
            component="img"
            image={work.picture}
            alt={work.title}
            sx={{ borderBottom: '1px solid #eaeaea' }}
          />
          <CardContent>
            <Typography variant="body2">
              {work.description}
            </Typography>
            <Typography variant="h4" fontSize={'bold'}>
              {work.price} €
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
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