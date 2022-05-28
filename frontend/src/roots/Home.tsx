import { useContext, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";
import { ClientContext } from "../contexts/ClientContext";


const Home: React.FunctionComponent = () => {
  const { client } = useContext(ClientContext);
  const { user } = useContext(UserContext);
  const isUser = client ? client : user;
  const { Alerts } = useContext(AlertContext);

  useEffect(() => {
    Alerts.info({message: `Bienvenue à TradeArt ${isUser?.firstname} ${isUser?.lastname} !`});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: { xs: 4, sm: 6, md: 8, lg: 10 }, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isUser?.user ? 'Je suis un client': 'Je suis un artiste'}
      </Typography>
      <Typography variant="body1">
        TradeArt est un site de vente de marchandises qui permet aux artistes de vendre leurs oeuvres à des clients.
      </Typography>
      <Typography>
        {isUser?.email}
        {isUser?.birthdate.toLocaleDateString('fr-FR')}
      </Typography>
    </Container>
  );
};

export default Home;