import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { UserHome } from "../components/User/UserHome";
import { ArtistHome } from "../components/Artist/ArtistHome";


const Home: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const isUser = user ? true : false;

  return (
    <>
    {
      isUser ? (
        <UserHome/>
      ) : (
        <ArtistHome/>
      )
    }
    </>
  );
};

export default Home;