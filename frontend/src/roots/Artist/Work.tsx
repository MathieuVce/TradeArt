import { Box, Button } from "@mui/material";
import { IResponse, IWork } from "../../@types/IClient";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { ClientContext } from "../../contexts/ClientContext";

const ArtistWork: React.FunctionComponent = () => {
  const { client, getWork } = useContext(ClientContext);
  const [image, setImage] = useState<string>("");
  const { Alerts } = useContext(AlertContext);
  const [works, setWorks] = useState<[]>();

  const getWorkData = async () => {
    const response: IResponse = await getWork();
    console.log(response);
    setWorks(response.data);
    response.data?.length === 0 && Alerts[response.status]({message: response.message});
  };

  const handleOnChange = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  };

  useEffect(() => {
    getWorkData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {works?.length === 0 ? (
        <>
          <p>Vous n'avez pas encore d'œuvres ajoutez-en une dès maintenant !</p>
        </>
      ) : (
        <ul>
          {works?.map((work) => (
            // <li key={work.work_id}>
            //   <p>{work.title}</p>
            //   <p>{work.description}</p>
            //   <p>{work.price}</p>
            //   <p>{client?.firstname}</p>
            // </li>
            <>
              
            </>
          ))}
        </ul>
      )}
      <Button
        variant="contained"
        component="label"
      >
        Ajouter une image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleOnChange}
        />
      </Button>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        src={image}
      />
    </>
  );
};

export default ArtistWork;