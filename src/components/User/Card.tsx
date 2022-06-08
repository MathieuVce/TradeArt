import { useState } from "react";
import { Modal } from "../Modal";
import { PaymentForm } from "./Payment";
import { IPaymentValues } from "../../@types/IUser";
import { IClient, IWork } from "../../@types/IClient";
import { ExpandMore, Transition, stringAvatar, SmallAvatar } from "../../utils/utils";
import { ExpandMore as ExpandMoreIcon, AddShoppingCartRounded } from "@mui/icons-material";
import { Grid, Card, CardHeader, Avatar, IconButton, CardMedia, Typography, Collapse, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from "@mui/material";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';

interface ICardComponentProps {
  work: IWork;
  handleBuy: (work_id: number) => Promise<void>;
  isExpanding: boolean;
  client: IClient;
  paymentValues: IPaymentValues;
  setPaymentValues: React.Dispatch<React.SetStateAction<IPaymentValues>>;
}

export const CardComponent: React.FC<ICardComponentProps> = ({ work, handleBuy, isExpanding, paymentValues, setPaymentValues, client }) => {
  const colors = ['#10c8d5', '#cc99ff', "#8585ad", "#b4b4e4", "#80d4ff"];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  // const randomColor = stringToColor(work.title);
  const color = 'white';
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [pop, setPop] = useState(false);
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
            <Button variant="text" onClick={() => {setPop(true)}}>
              <Avatar aria-label="art" {...stringAvatar(`${client.firstname} ${client.lastname}`)} src={client.photo === 'p' ? '' : client.photo}/>
            </Button>
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
              {
                !work.sold && (
                  <IconButton aria-label="settings" onClick={() => {
                    handleOpenClick();
                    setPaymentValues({...paymentValues, amount: parseFloat(work.price)});
                  }}>
                    <AddShoppingCartRounded style={{ color: color }} />
                  </IconButton>
                )
              }
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
              { work.sold ? (
                <>
                  <Typography variant="h4">
                    ARTICLE VENDU
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2">
                    {work.description}
                  </Typography>
                  <Typography variant="h4" fontSize={'bold'}>
                    {work.price} €
                  </Typography>
                </>
              )}
                
              </>
              }
              actionIcon={
                <IconButton
                  onClick={() => {setPop(true)}}
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${work.artist?.firstname} ${work.artist?.lastname}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            >
            </ImageListItemBar>
          </ImageListItem>
        </Collapse>
      </Card>
      <Modal info={true} buttonProps='OK' title={`${client.firstname} ${client.lastname}`} description={client.description!} open={pop} setOpen={setPop}>
        <Box padding={2} paddingTop={3}>
          <Grid position={'absolute'} right={10} top={15}>
            <SmallAvatar aria-label="art" {...stringAvatar(`${client.firstname} ${client.lastname}`)} src={client.photo === 'p' ? '' : client.photo}/>
          </Grid>
          <Grid>
            <Typography fontSize={16}>Institution: </Typography>
            <Typography sx={{ pl: 1 }}><strong>{work.artist?.institution}</strong></Typography>
          </Grid>
          <Grid>
            <Typography fontSize={16}>Cursus: </Typography>
            <Typography sx={{ pl: 1 }}><strong>{work.artist?.cursus}</strong></Typography>
          </Grid>
          {work.artist?.info && (
            <>
              <Grid paddingTop={4}>
                <Typography fontSize={16}>Téléphone: </Typography>
                <Typography sx={{ pl: 1 }}><strong>{work.artist?.phonenumber}</strong></Typography>
              </Grid>
              <Grid>
                <Typography fontSize={16}>Email: </Typography>
                <Typography sx={{ pl: 1 }}><strong>{work.artist?.email}</strong></Typography>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
      <Modal info={true} buttonProps='OK' title={work.title} description={work.description} open={popImg} setOpen={setPopImg}>
        <CardMedia
          component="img"
          image={work.picture}
          alt={work.title}
          sx={{ opacity: work.sold ? "0.2" : "1" }}
        />
      </Modal>
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
          <PaymentForm work={work} paymentValues={paymentValues} setPaymentValues={setPaymentValues}/>
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