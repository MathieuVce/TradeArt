import { Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { ClientContext } from "../contexts/ClientContext";


const Home: React.FunctionComponent = () => {
  const { client } = useContext(ClientContext);
  const { Alerts } = useContext(AlertContext);

  useEffect(() => {
    Alerts.info({message: `Bienvenue à TradeArt ${client?.firstname} ${client?.lastname} !`});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: { xs: 4, sm: 6, md: 8, lg: 10 }, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {client?.user ? 'Je suis un client': 'Je suis un artiste'}
      </Typography>
      <Typography variant="body1">
        TradeArt est un site de vente de marchandises qui permet aux artistes de vendre leurs oeuvres à des clients.
      </Typography>
      <Typography>
        {client?.email}
        {client?.birthdate.toLocaleDateString('fr-FR')}
      </Typography>
    </Container>
  );
};

export default Home;