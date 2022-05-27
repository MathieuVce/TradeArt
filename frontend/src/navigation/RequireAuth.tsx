import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ClientContext } from "../contexts/ClientContext";

export const RequireAuth: React.FC<any> = (props) => {
  const { client } = useContext(ClientContext); 
  const location = useLocation();

  if (client) {
    return <>{props.children}</>
  } else {
    console.log("You must be logged in to proceed");
    return <Navigate to="/login" replace state={{ path: location.pathname }}/>
  }
}