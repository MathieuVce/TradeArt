import React, { useState } from 'react';
import { Modal } from "./Modal";
import { Img } from '../utils/utils';
import { ICommand } from '../@types/IClient';
import {Typography, ButtonBase, Grid, Paper, CardMedia} from '@mui/material';

interface IModalProps {
  command: ICommand;
}

export const SaleCard: React.FC<IModalProps> = ({ command }) => {
  const [popImg, setPopImg] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        elevation={5}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase onClick={() => {setPopImg(true)}}>
              <Img alt="complex" src={command.picture} sx={{ boxShadow: '2', height: 128 }} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="body2">
                  {command.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div" fontWeight={300}>
                  {command.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" marginTop={3}>
                  {command.order_date.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {command.order_location.replaceAll('&', ', ')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {command.price}€
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Modal info={true} buttonProps='OK' title={command.title} description={command.description} open={popImg} setOpen={setPopImg}>
        <CardMedia
          component="img"
          image={command.picture}
          alt={command.title}
        />
      </Modal>
    </Grid>
  );
};
