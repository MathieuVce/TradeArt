import React from "react";
import { formatDate } from "../../utils/utils";
import { IPaymentValues } from "../../@types/IUser";
import { IResponse, IWork } from "../../@types/IClient";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CardComponent } from "../../components/User/Card";
import { OpenInFullRounded, CloseFullscreenRounded } from '@mui/icons-material';
import { Grid, Typography, FormControlLabel, Switch, Box, Skeleton, Card, CardHeader } from "@mui/material";


const UserWorks: React.FunctionComponent = () => {
  const { Alerts } = useContext(AlertContext);
  const { getWorks, user, createOrder, likeWork } = useContext(UserContext);
  const [expand, setExpand] = useState(true);
  const [works, setWorks] = useState<IWork[]>();
  const [loading, setLoading] = useState(true);

  const [paymentValues, setPaymentValues] = useState<IPaymentValues>({
    amount: 0,
    ccnumber: user?.credit_card_number ? user?.credit_card_number!.split('&')[0] : '',
    ccexp: user?.credit_card_number ?formatDate(new Date(user?.credit_card_number!.split('&')[1])) as unknown as Date : new Date(),
    cccvc:user?.credit_card_number ? user?.credit_card_number!.split('&')[2] : '',
    address: user?.address!,
    save: false
  });

  const getWorkData = async () => {
    const response: IResponse = await getWorks();
    if (response.data?.length === 0) {
      setWorks(response.data);
    } else {
      const promiseArray = response.data.map((work: any[]) => {
        const artist = {
          artist_id: parseInt(work[0][9]),
          email: work[0][16],
          lastname: work[0][12],
          firstname: work[0][11],
          phonenumber: work[0][17],
          institution: work[0][18],
          cursus: work[0][19],
          description: work[0][20],
          photo: work[0][21],
          info: work[0][7] === 0 ? false : true
        }
        const likeArr = work[1].map((work: any[]) => (
          work[0]
        ));
        return {
          work_id: parseInt(work[0][0]),
          title: work[0][1],
          price: parseFloat(work[0][2]),
          description: work[0][3],
          evaluation: work[0][4],
          picture: work[0][5],
          sold: work[0][6] === 0 ? false : true,
          artist,
          likes: {
            len: work[1].length,
            liked: work[1].length !== 0 ? likeArr.includes(user?.customer_id!) : false
          }
        }
      });
      const data: IWork[] = await Promise.all(promiseArray);
      setWorks(data);
    }
  };

  const handleLike = async (work_id: number) => {
    const response: IResponse = await likeWork({
      work_id,
      customer_id: user?.customer_id!
    });
    if (response.status === 'success') {
      await getWorkData();
    }
  };

  const handleBuy = async (work_id: number) => {
    setLoading(true);
    const response: IResponse = await createOrder({
      credit_card_number: `${paymentValues.ccnumber}&${paymentValues.ccexp}&${paymentValues.cccvc}`,
      work_id,
      customer_id: user?.customer_id!,
      orderlocation: Object.values(paymentValues.address).join('&'),
      price: paymentValues.amount,
      save: paymentValues.save ? 1 : 0
    });
    Alerts[response.status]({message: response.message});
    await getWorkData();
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getWorkData();
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={2} borderBottom={1} paddingBottom={2} borderColor='#002E82'>
        <Grid item justifyContent='flex-start' sx={{ flexGrow: 1, alignSelf: 'center' }}>
          <Typography variant="h4" textAlign={'start'} color='primary' fontWeight={600}>
            {works?.length ? (works?.length! === 1 ? `${works?.length} ŒUVRE` : `${works?.length} ŒUVRES`) : ""}
          </Typography>
        </Grid>
        <Grid item justifySelf='flex-end'>
          <Box justifyItems={'center'} alignItems={'center'}>
            <OpenInFullRounded color='primary' sx={{ mr: 1.5 }}/>
            <FormControlLabel color="primary" sx={{ mt: -1.5 }}  control={<Switch checked={expand} onChange={() => setExpand(!expand)}/>}
              label={
                <CloseFullscreenRounded color='primary' sx={{ mt: 1 }}/>
              } />
          </Box>
        </Grid>
      </Grid>
      {loading ? (   
        <Grid container justifyContent="space-evenly" alignItems="baseline" sx={{ marginTop: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }}>
          {Array.from(new Array(9)).map((_, i) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ mt: 2, boxShadow: 3 }}>
                <CardHeader
                  avatar={
                    <Skeleton animation="wave" variant="circular" width={50} height={50} />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={20}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                  }
                />
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
              </Card>
            </Grid>
          ))}
        </Grid>

      ) : (
      <>
        {!works ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh' }}
          >
            <Grid item xs={3}>
              <Typography variant="h5" textAlign={'center'} color='primary'>
                  Aucune œuvre à afficher...
              </Typography>
            </Grid>   
          </Grid> 
        ) : (
          <Grid container justifyContent="space-evenly" alignItems="baseline" sx={{ marginTop: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }}>
            {works?.map((work, i) => (
              <CardComponent key={i} work={work} handleBuy={handleBuy} handleLike={handleLike} isExpanding={expand} client={work.artist!} paymentValues={paymentValues} setPaymentValues={setPaymentValues}/>
            ))}
          </Grid>
        )}
      </>
      )}
    </>
  );
};

export default UserWorks;