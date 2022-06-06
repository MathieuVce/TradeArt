import { IPaymentValues } from "../../@types/IUser";
import { IResponse, IWork } from "../../@types/IClient";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CardComponent } from "../../components/User/Card";
import { OpenInFullRounded, CloseFullscreenRounded } from '@mui/icons-material';
import { Grid, Typography, FormControlLabel, Switch, Box } from "@mui/material";

const UserWorks: React.FunctionComponent = () => {
  const { Alerts } = useContext(AlertContext);
  const { getWorks, user, createOrder } = useContext(UserContext);
  const [expand, setExpand] = useState(true);
  const [works, setWorks] = useState<IWork[]>();
  const [paymentValues, setPaymentValues] = useState<IPaymentValues>({
    amount: 0,
    ccnumber: "",
    ccexp: "",
    cccvc: "",
    address: user?.address!,
    save: false
  });

  const getWorkData = async () => {
    const response: IResponse = await getWorks();
    if (response.data?.length === 0) {
      setWorks(response.data);
    } else {
      const promiseArray = response.data.map((work: any[]) => {
        console.log(work);
        const artist = {
          artist_id: parseInt(work[8]),
          email: work[15],
          lastname: work[11],
          firstname: work[10],
          phonenumber: work[16],
          institution: work[17],
          cursus: work[18],
          photo: work[20],
          info: work[7] === '0' ? false : true
        }
        return {
          work_id: parseInt(work[0]),
          title: work[1],
          price: parseFloat(work[2]),
          description: work[3],
          evaluation: work[4],
          picture: work[5],
          sold: work[6] === 0 ? false : true,
          artist
        }
      });
      const data: IWork[] = await Promise.all(promiseArray);
      setWorks(data);
    }
  };

  const handleBuy = async (work_id: number) => {
      alert(`${paymentValues.ccnumber}&${paymentValues.ccexp}&${paymentValues.cccvc}`);
      alert(work_id);
      alert(user?.customer_id!);
      alert(Object.values(paymentValues.address).join('&'));
      alert(paymentValues.amount);
      alert(paymentValues.save ? 1 : 0)
    // const response: IResponse = await createOrder({
    //   credit_card_number: `${paymentValues.ccnumber}&${paymentValues.ccexp}&${paymentValues.cccvc}`,
    //   work_id,
      // user?.customer_id!,
    //   orderlocation: Object.values(paymentValues.address).join('&'),
    //   price: paymentValues.amount,
    //   save: paymentValues.save ? 1 : 0
    // });
    // Alerts[response.status]({message: response.message});
  }

  useEffect(() => {
    getWorkData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={2} borderBottom={1} paddingBottom={2} borderColor='lightgrey'>
        <Grid item justifyContent='flex-start' sx={{ flexGrow: 1, alignSelf: 'center' }}>
          <Typography variant="h4" textAlign={'start'} color='primary'>
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
      {works?.length === 0 ? (
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
        <>
          <Grid container columnSpacing={2} rowSpacing={0} justifyContent="space-evenly" alignItems="baseline">
            {works?.map((work, i) => (
              <CardComponent key={i} work={work} handleBuy={handleBuy} isExpanding={expand} client={work.artist!} paymentValues={paymentValues} setPaymentValues={setPaymentValues}/>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default UserWorks;