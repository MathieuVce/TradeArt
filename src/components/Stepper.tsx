import { Box, Step, StepLabel, Stepper } from "@mui/material";

interface ICustomStepperProps {
  activeStep: number;
  isStepFailed?: number;
  steps: { [key: string]: React.ReactNode };

}
  
export const CustomStepper: React.FC<ICustomStepperProps> = ({ activeStep, isStepFailed, steps }) => {
  const getStepFail = (index: number) => {
    return index === isStepFailed;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {Object.keys(steps).map((label, index) => {
          const labelProps: {
            error?: boolean;
          } = {};
          if (getStepFail(index)) {
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};