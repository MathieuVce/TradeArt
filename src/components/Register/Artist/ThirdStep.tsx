import { Grid, TextField } from "@mui/material";
import { IClient } from "../../../@types/IClient";

interface IArtistThirdStepProps {
  detailsValues: IClient;
  handleChangeDetails: (prop: keyof IClient, value: any) => void;
}
  
export const ArtistThirdStep: React.FC<IArtistThirdStepProps> = ({ detailsValues, handleChangeDetails }) => {

  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          type="text"
          id="institution"
          label="Institution"
          name="institution"
          onChange={(e) => handleChangeDetails('institution', e.target.value)}
          value={detailsValues.institution}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          type="text"
          id="cursus"
          label="Cursus"
          name="cursus"
          onChange={(e) => handleChangeDetails('cursus', e.target.value)}
          value={detailsValues.cursus}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          type="text"
          id="description"
          label="Courte description"
          name="description"
          multiline
          minRows={4}
          maxRows={6}
          onChange={(e) => handleChangeDetails('description', e.target.value)}
          value={detailsValues.description}
        />
      </Grid>
    </>
  );
};