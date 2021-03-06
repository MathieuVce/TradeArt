import './index.css';
import React from 'react';
import { theme } from './utils/utils';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from "notistack";
import reportWebVitals from './reportWebVitals';
import Navigation from './navigation/Navigation';
import { AlertComponent } from './components/Alert';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './contexts/UserContext';
import { AlertProvier } from './contexts/AlertContext';
import { ClientProvider } from './contexts/ClientContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ClientProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }} maxSnack={4} preventDuplicate content={(key, message) => (
              <AlertComponent keyId={key} message={message}/>
            )} dense>
            <AlertProvier>
              <Navigation/>
            </AlertProvier>
          </SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </ClientProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
