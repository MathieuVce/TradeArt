import { useContext } from "react";
import { ClientContext } from "../../contexts/ClientContext";


const ArtistSale: React.FunctionComponent = () => {
  const { client } = useContext(ClientContext);
  // const { Alerts } = useContext(AlertContext);

  // useEffect(() => {
  //   Alerts.info({message: `Bienvenue à TradeArt ${isUser?.firstname} ${isUser?.lastname} !`});
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
        {client?.email}
    </>
  );
};

export default ArtistSale;