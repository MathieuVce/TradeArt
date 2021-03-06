import { SaleCard } from "../../components/SaleCard";
import { useContext, useEffect, useState } from "react";
import { ICommand, IResponse } from "../../@types/IClient";
import { AlertContext } from "../../contexts/AlertContext";
import { ClientContext } from "../../contexts/ClientContext";
import { Grid, Typography, CircularProgress } from "@mui/material";


const ArtistSale: React.FunctionComponent = () => {
  const { client, receivePayment } = useContext(ClientContext);
  const { Alerts } = useContext(AlertContext);
  const [commands, setCommands] = useState<ICommand[]>();
  const [loading, setLoading] = useState(true);

  const getPayments = async () => {
    const response: IResponse = await receivePayment(client?.artist_id!);
    Alerts[response.status]({message: response.message});
    if (response.status === 'success') {
      const promiseArray = response.data.map(async (item: any) => {
        return {
          picture: item[16],
          title: item[12],
          price: parseFloat(item[13]),
          description: item[14],
          order_date: new Date(item[7]),
          order_location: item[8]
        }
      });
      const data: ICommand[] = await Promise.all(promiseArray);
      setCommands(data);
    }
  };
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      await getPayments();
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '80vh' }}
        >
          <CircularProgress color="secondary" />
            <Typography variant="h5" textAlign={'center'} color='primary' fontWeight={700}>
              Chargement de vos ventes...
            </Typography>
        </Grid>
      ) : (
        <>
          {!commands ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '70vh' }}
            >
              <Grid item xs={3}>
                <Typography variant="h5" textAlign={'center'} color='primary'>
                  Vous n'avez pas encore de ventes
                </Typography>
              </Grid>   
            </Grid> 
          ) : (
            <>
              <Grid container spacing={2} borderBottom={1} paddingBottom={2} marginBottom={4} borderColor='#002E82'>
                <Grid item justifyContent='flex-start' sx={{ flexGrow: 1, alignSelf: 'center' }}>
                  <Typography variant="h4" textAlign={'start'} color='primary' fontWeight={600}>
                    {commands?.length ? (commands?.length! === 1 ? `${commands?.length} VENTE` : `${commands?.length} VENTES`) : ""}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-evenly" alignItems="baseline" sx={{ marginTop: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                {commands && (
                  commands?.map((item: ICommand) => {
                    return (
                      <SaleCard key={item.title} command={item} />
                    )})
                )}
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ArtistSale;