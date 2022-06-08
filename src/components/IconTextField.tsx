import { TextField, InputAdornment, InputProps, IconProps, TextFieldProps, Button } from "@mui/material";

type IconTextFieldProps = 
    TextFieldProps &
    {
      iconStart?: IconProps,
      iconEnd?: IconProps,
      InputProps?: InputProps;
      onIconClick?: () => void;
    }

  
export const IconTextField: React.FC<IconTextFieldProps> = ({ iconStart, iconEnd, InputProps, onIconClick, ...props }) => {
    return (
      <TextField
        {...props}
        InputProps={{
          ...InputProps,
          startAdornment: iconStart ? (
            <InputAdornment position="start">{iconStart}</InputAdornment>
          ) : null,
          endAdornment: iconEnd ? (
            <InputAdornment position="end">
              <Button onClick={onIconClick}>
                {iconEnd}
              </Button>
            </InputAdornment>
          ) : null
        }}
      />
    );
  };