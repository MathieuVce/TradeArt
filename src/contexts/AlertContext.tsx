import { Button } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { TAlerts, IAlert } from '../@types/IAlert';
import { SnackbarMessage, useSnackbar, VariantType } from 'notistack';
import React, { createContext, Fragment, useCallback } from 'react';
  
  
export const AlertContext = createContext<{ Alerts: TAlerts }>(
  {
    Alerts: {
        info: () => {},
        error: () => {},
        success: () => {},
        warning: () => {},
    },
});

export const AlertProvier: React.FC = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickWithAction = useCallback((alert: IAlert, type: VariantType) => {
    enqueueSnackbar(`${alert.message}/${type}` as SnackbarMessage, {
        variant: type,
        autoHideDuration: alert.duration || 5000,
        action: (key) => (
            <Fragment>
                <Button color='inherit' size='small' onClick={() => closeSnackbar(key)}>
                  <CloseRounded />
                </Button>
            </Fragment>
        )
    });
  }, [enqueueSnackbar, closeSnackbar]);

  const Alerts: TAlerts = {
    warning: (alert) => handleClickWithAction(alert, 'warning'),
    error: (alert) =>  handleClickWithAction(alert, 'error'),
    success: (alert) =>  handleClickWithAction(alert, 'success'),
    info: (alert) =>  handleClickWithAction(alert, 'info'),
  };

  return (
    <AlertContext.Provider value={{
      Alerts,
    }}>
      {children}
    </AlertContext.Provider>
  );
};
