import { CustomStepper } from "../Stepper";
import { IUser } from "../../@types/IUser";
import { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { IAuth, IClient, TUser } from "../../@types/IClient";
import {  ArrowLeftSharp, ArrowRightSharp } from "@material-ui/icons";

interface IRegisterStepperProps {
  stepsArray: { [key: string]: React.ReactNode };
  authValues: IAuth;
  detailsValues: IClient | IUser;
  handleChangeAuth: (prop: keyof IAuth, value: string | boolean) => void;
  handleChangeDetails: (prop: any, value: any) => void;
}
  
export const RegisterStepper: React.FC<IRegisterStepperProps> = ({ stepsArray }) => {
  const { user } = useOutletContext<TUser>()
  const [currentStep, setStep] = useState<number>(0);

  useEffect(() => {
    setStep(0)
  }, [user]);

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  const nextStep = () => {
    setStep(currentStep + 1);
  };

  return (
    <Grid container spacing={2}>
      <CustomStepper steps={stepsArray} activeStep={currentStep}/>
      {Object.keys(stepsArray).map((key, index) => {
        return (
          index === currentStep && (
            stepsArray[key]
          )
        )
      })}
      <Grid container alignItems="center" direction="row" justifyContent="center" maxWidth={'100%'}>
          <IconButton sx={{ m: 1, bgcolor: 'primary.main', '&:hover': {background: "#31AFB4"}, '&:disabled': {background: "lightgrey"} }} onClick={() => prevStep()} disabled={currentStep === 0}>
            <ArrowLeftSharp style={{ color: 'white' }}/>
          </IconButton>
            <IconButton sx={{ m: 1, bgcolor: 'primary.main', '&:hover': {background: "#31AFB4"}, '&:disabled': {background: "lightgrey"} }} onClick={() => nextStep()} disabled={currentStep === (Object.keys(stepsArray).length - 1)}>
              <ArrowRightSharp style={{ color: 'white' }}/>
            </IconButton>
      </Grid>
    </Grid>
  );
};