import { useState } from "react";
import { IWork } from "../../@types/IClient";
import { ExpandMore, Transition, stringAvatar, stringToColor } from "../../utils/utils";
import { ExpandMore as ExpandMoreIcon, AddShoppingCartRounded } from "@mui/icons-material";
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Collapse, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PaymentForm } from "./Paiement";

interface ICardComponentProps {
  work: IWork;
  handleBuy: (key: number) => Promise<void>;
  isExpanding: boolean;
}

export const CardComponent: React.FC<ICardComponentProps> = ({ work, handleBuy, isExpanding }) => {
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
            // <Avatar aria-label="art" {...stringAvatar(`${client.firstname} ${client.lastname}`)} src={client.photo === 'p' ? '' : client.photo}/>
            <>OK</>
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
                <AddShoppingCartRounded style={{ color: color }} />
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
            sx={{ borderBottom: '1px solid #eaeaea', opacity: work.sold ? 0.5 : 1 }}
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
        <DialogTitle>{"Procéder au paiement"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Entrez vos coordonées afin de procéder au paiement.
          </DialogContentText>
          <PaymentForm/>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleOpenClick}>Retour</Button>
          <Button variant='contained' color='primary' onClick={() => {
            handleOpenClick();
            handleBuy(work.work_id!);
          }}>Payer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};