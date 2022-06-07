import { Grid, Typography } from "@mui/material";
import { SaleCard } from "../../components/Sales";
import { useContext, useEffect, useState } from "react";
import { ICommand, IResponse } from "../../@types/IClient";
import { AlertContext } from "../../contexts/AlertContext";
import { UserContext } from "../../contexts/UserContext";


const UserCart: React.FunctionComponent = () => {
  const { getPurchases, user } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);
  const [commands, setCommands] = useState<ICommand[]>();

  const getPayments = async () => {
    const response: IResponse = await getPurchases(user?.customer_id!);
    Alerts[response.status]({message: response.message});
    if (response.status === 'success') {
      console.log(response.data);
      const promiseArray = response.data.map(async (item: any) => {
        return {
          picture: item[5],
          title: item[1],
          price: parseFloat(item[2]),
          description: item[3],
          order_date: new Date(item[10]),
          order_location: item[11]
        }
      });
      const data: ICommand[] = await Promise.all(promiseArray);
      console.log(data)
      setCommands(data);
    }
  };
  
  useEffect(() => {
    getPayments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
              Vous n'avez pas encore d'achats
            </Typography>
          </Grid>   
        </Grid> 
      ) : (
        <>
          <Grid container spacing={2} borderBottom={1} paddingBottom={2} marginBottom={4} borderColor='lightgrey'>
            <Grid item justifyContent='flex-start' sx={{ flexGrow: 1, alignSelf: 'center' }}>
              <Typography variant="h4" textAlign={'start'} color='primary' fontWeight={600}>
                {commands?.length ? (commands?.length! === 1 ? `${commands?.length} ACHAT` : `${commands?.length} ACHATS`) : ""}
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
  );
};

export default UserCart;