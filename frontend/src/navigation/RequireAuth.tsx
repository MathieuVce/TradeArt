import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";
import { ClientContext } from "../contexts/ClientContext";

interface ICopyrightProps {
  element: JSX.Element;
}

export const RequireAuth: React.FC<ICopyrightProps> = ({ element }) => {
  const { client } = useContext(ClientContext);
  const { user } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);

  const location = useLocation();

  if (client || user) {
    return <>{element}</>
  } else {
    Alerts.warning({message: "You must be logged in to proceed"});
    return <Navigate to="/login" replace state={{ path: location.pathname }}/>
  }
}