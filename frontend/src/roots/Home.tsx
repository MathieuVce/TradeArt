import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ArtistHome } from "../components/Artist/ArtistHome";


const Home: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const isUser = user ? true : false;
  // const { Alerts } = useContext(AlertContext);

  // useEffect(() => {
  //   Alerts.info({message: `Bienvenue à TradeArt ${isUser?.firstname} ${isUser?.lastname} !`});
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
    {
      isUser ? (
        <>
        </>
      ) : (
        <ArtistHome/>
      )
    }
    </>
  );
};

export default Home;