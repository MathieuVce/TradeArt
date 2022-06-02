import { IResponse, IWork } from "../../@types/IClient";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CardComponent } from "../../components/User/Card";
import { OpenInFullRounded, CloseFullscreenRounded } from '@mui/icons-material';
import { Grid, Typography, FormControlLabel, Switch, Box } from "@mui/material";

const UserWorks: React.FunctionComponent = () => {
  const { Alerts } = useContext(AlertContext);
  const { user, getWorks } = useContext(UserContext);
  const [expand, setExpand] = useState(true);
  const [works, setWorks] = useState<IWork[]>();

  const getWorkData = async () => {
    const response: IResponse = await getWorks();
    if (response.data?.length === 0) {
      setWorks(response.data);
    } else {
      const promiseArray = response.data.map((work: any[]) => {
        return {
          work_id: parseInt(work[0]),
          title: work[1],
          price: parseFloat(work[2]),
          description: work[3],
          evaluation: work[4],
          picture: work[5],
          sold: work[6] === 0 ? false : true
        }
      });
      const data: IWork[] = await Promise.all(promiseArray);
      setWorks(data);
    }
  };

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
              <CardComponent key={i} work={work} handleBuy={async () => alert('buy')} isExpanding={expand}/>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default UserWorks;