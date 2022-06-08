import { AddRounded } from '@mui/icons-material';
import { Modal } from "../../components/Artist/Modal";
import { IResponse, IWork } from "../../@types/IClient";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { ClientContext } from "../../contexts/ClientContext";
import { CardComponent } from "../../components/Artist/Card";
import { OpenInFullRounded, CloseFullscreenRounded } from '@mui/icons-material';
import { Grid, Typography, Link, Button, FormControlLabel, Switch, Box, CircularProgress } from "@mui/material";

const ArtistWork: React.FunctionComponent = () => {
  const { client, getWork, createWork, deleteWork } = useContext(ClientContext);
  const { Alerts } = useContext(AlertContext);
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(true);
  const [works, setWorks] = useState<IWork[]>();
  const [loading, setLoading] = useState(true);


  const handleOpen = () => {
    setOpen(!open);
  };

  const getWorkData = async () => {
    const response: IResponse = await getWork();
    if (response.data?.length === 0) {
      Alerts[response.status]({message: response.message});
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
          sold: work[6] === 0 ? false : true,
          info: work[7] === 1 ? true : false
        }
      });
      const data: IWork[] = await Promise.all(promiseArray);
      setWorks(data);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getWorkData();
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (work_id: number) => {
    setLoading(true);
    const response: IResponse = await deleteWork({work_id});
    Alerts[response.status]({message: response.message})
    await getWorkData();
    setLoading(false);
  };

  const handleUpload = async (workValues: IWork) => {
    setLoading(true);
    const res: IResponse = await createWork({...workValues, evaluation: '12/20', price: workValues.price.replace(',','.')});
    Alerts[res.status]({message: res.message});
    await getWorkData();
    setLoading(false);
  }

  return (
    <>
      <Grid container spacing={2} borderBottom={1} paddingBottom={2} borderColor='lightgrey'>
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
          <Button variant="contained" onClick={handleOpen} sx={{ display: { md: 'none'} }}>
            <AddRounded/>
          </Button>
          <Button variant="outlined" onClick={handleOpen} endIcon={<AddRounded/>} sx={{ display: { xs: 'none', md: 'flex'} }}>
            Ajouter une oeuvre
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '60vh' }}
        >
          <CircularProgress color="secondary" />
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
                  Vous n'avez pas encore d'œuvres {' '}
                  <Link underline='always' onClick={handleOpen}>
                    ajoutez-en une
                  </Link>
                  {' '} dès maintenant !
                </Typography>
              </Grid>   
            </Grid> 
          ) : (
            <>
              <Grid container justifyContent="space-evenly" alignItems="baseline" sx={{ marginTop: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                {works?.map((work, i) => (
                  <CardComponent key={i} work={work} handleDelete={handleDelete} client={client!} isExpanding={expand}/>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
      <Modal open={open} setOpen={setOpen} handleUpload={handleUpload}/>
    </>
  );
};

export default ArtistWork;