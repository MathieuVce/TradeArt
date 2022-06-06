import { forwardRef, useCallback } from 'react';
import { Alert, AlertColor } from '@mui/material';
import { SnackbarContent, SnackbarKey, useSnackbar } from 'notistack';

interface IAlertComponentProps {
  keyId: SnackbarKey,
  message: string | React.ReactNode
}

export const AlertComponent = forwardRef<HTMLDivElement, IAlertComponentProps>((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const message = props.message?.toString().split("/")[0];
  const severity = props.message?.toString().split("/")[1] as AlertColor;

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.keyId);
  }, [props.keyId, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Alert onClose={() => handleDismiss()} severity={severity}>
          {message}
      </Alert>
    </SnackbarContent>
  );
});