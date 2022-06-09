import { useState } from "react";
import { Modal } from "../Modal";
import { PaymentForm } from "./Payment";
import { IPaymentValues } from "../../@types/IUser";
import { IClient, IWork } from "../../@types/IClient";
import { ExpandMore, Transition, stringAvatar, SmallAvatar } from "../../utils/utils";
import { ExpandMore as ExpandMoreIcon, AddShoppingCartRounded, InfoRounded, FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material";
import { Grid, Card, CardHeader, Avatar, CircularProgress, IconButton, CardMedia, ImageListItem, ImageListItemBar, Typography, Collapse, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ICardComponentProps {
  work: IWork;
  client: IClient;
  isExpanding: boolean;
  paymentValues: IPaymentValues;
  handleBuy: (work_id: number) => Promise<void>;
  handleLike: (work_id: number) => Promise<void>;
  setPaymentValues: React.Dispatch<React.SetStateAction<IPaymentValues>>;
}

export const CardComponent: React.FC<ICardComponentProps> = ({ work, handleBuy, handleLike, isExpanding, paymentValues, setPaymentValues, client }) => {
  const col = ['#6666ff','#cc80ff', '#9d95ed'];
  const colors = col[Math.floor(Math.random() * col.length)];
  // const randomColor = stringToColor(work.title);
  const color = 'white';
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const [popImg, setPopImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLike = async () => {
    setLoading(true);
    if (!work.sold)
      await handleLike(work.work_id!);
    setLoading(false);
  };

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
          style={{ backgroundColor: work.sold ? 'grey' : (colors), color: color }}
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
                  <Typography variant="h6">
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
                <Grid container flexDirection={'column'}>
                  <Grid item>
                    <IconButton
                      onClick={() => {setPop(true)}}
                      sx={{ color: 'rgba(255, 255, 255, 0.54)', marginLeft: 1.3 }}
                      aria-label={`info about ${work.artist?.firstname} ${work.artist?.lastname}`}>
                      <InfoRounded />
                    </IconButton>
                  </Grid>
                  <Grid container flexDirection={'row'} alignItems={'center'}
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                    <Typography>
                      {work.likes?.len !== 0 ? work.likes?.len! : 0}
                    </Typography>
                    <IconButton
                    onClick={onLike}
                    sx={{ color: (work.likes?.liked && !work.sold) ? '#eb4034' :'rgba(255, 255, 255, 0.54)' }}>
                      {loading ? <CircularProgress color='inherit' style={{ width: 20, height: 20 }} /> : (work.likes?.liked ? <FavoriteRounded /> : <FavoriteBorderRounded />)}
                    </IconButton>
                  </Grid>
                </Grid>
              }
            >
            </ImageListItemBar>
          </ImageListItem>
        </Collapse>
      </Card>
      <Modal info={true} buttonProps='OK' title={`${client.firstname} ${client.lastname}`} description={client.description!} open={pop} setOpen={setPop}>
        <Grid container padding={2} paddingTop={3} spacing={2} minWidth={300} sx={{ justifyItems: 'center', alignItems: 'center' }}>
          <Grid position={'absolute'} left={27} bottom={7}>
            <SmallAvatar aria-label="art" {...stringAvatar(`${client.firstname} ${client.lastname}`)} src={client.photo === 'p' ? '' : client.photo}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontSize={16}>Institution: </Typography>
            <Typography><strong>{work.artist?.institution}</strong></Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontSize={16}>Cursus: </Typography>
            <Typography><strong>{work.artist?.cursus}</strong></Typography>
          </Grid>
          {work.artist?.info && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography fontSize={16}>Téléphone: </Typography>
                <Typography><strong>{work.artist?.phonenumber}</strong></Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontSize={16}>Email: </Typography>
                <Typography><strong>{work.artist?.email}</strong></Typography>
              </Grid>
            </>
          )}
        </Grid>
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