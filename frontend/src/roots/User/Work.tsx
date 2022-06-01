import { AddRounded } from '@mui/icons-material';
import { IWork } from "../../@types/IClient";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { ClientContext } from "../../contexts/ClientContext";
import { OpenInFullRounded, CloseFullscreenRounded } from '@mui/icons-material';
import { Grid, Typography, Button, FormControlLabel, Switch, Box } from "@mui/material";

const UserWorks: React.FunctionComponent = () => {
  const { client, getWork, createWork, deleteWork } = useContext(ClientContext);
  const { Alerts } = useContext(AlertContext);
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(true);
  const [works, setWorks] = useState<IWork[]>();

  const handleOpen = () => {
    setOpen(!open);
  };

  const getWorkData = async () => {
    setWorks([])
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
          {/* <Grid container columnSpacing={2} rowSpacing={0} justifyContent="space-evenly" alignItems="baseline" xs={12}> */}
          <Grid container columnSpacing={2} rowSpacing={0} justifyContent="space-evenly" alignItems="baseline">
            {works?.map((work, i) => (
              <>
              </>
              // <CardComponent key={i} work={work} handleDelete={handleDelete} client={client!} isExpanding={expand}/>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default UserWorks;