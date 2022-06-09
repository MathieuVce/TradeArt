import { formatDate } from "../utils/utils";
import { createContext, useState } from "react";
import { IAuth, IClient, IPassword, IRegister, IWork } from "../@types/IClient";
import { defaultClientValue, IClientContext, TCreateWorkFC, TDeleteWorkFC, TGetWorkFC, TLoginFC, TLogoutFC, TReceivePaymentFC, TRegisterFC, TResetPasswwordFC, TUpdateFC } from "../@types/IClientContext";

export const ClientContext = createContext<IClientContext>(defaultClientValue);

export const ClientProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<null | IClient>(null);

  const ip = 'https://tradeartfastapi.herokuapp.com/'
  // const ip = 'http://localhost:8000/'
  
  const postData = async (url: string, data: any) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data)
    };
    return await fetch(ip+url, requestOptions)
  };

  const putData = async (url: string, data: any) => {

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data)
    };
    return await fetch(ip+url, requestOptions)
  };

  const login: TLoginFC = async (payload: IAuth) => {
    try {
      const response = await putData('artist_log_in', payload);
      const data = await response.json();
      if (data.status === 'success') {
        const address = {
          address: data.data[5].split('& ')[0],
          postalcode: data.data[5].split('& ')[1],
          city: data.data[5].split('& ')[2]
        };

        setUser({
          user: false,
          artist_id: data.data[0],
          firstname: data.data[1],
          lastname: data.data[2],
          birthdate: formatDate(new Date(data.data[3])) as unknown as Date,
          bank_account_number: data.data[4],
          address,
          email: data.data[6],
          phonenumber: data.data[7],
          institution: data.data[8],
          cursus: data.data[9],
          description: data.data[10],
          photo: data.data[11]
        });
        localStorage.setItem('user', JSON.stringify({ email: payload.email, password: payload.password }));
      }
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const autolog = async () => {
    const tmpUser = localStorage.getItem('user');

    if (tmpUser !== null) {
      await logout();
    }
  };

  const register: TRegisterFC = async (payload: IRegister) => {
    try {
      const response = await postData('register_artist', 
      {
        ...payload.details,
        address: Object.values(payload.details.address).join('& '),
        ...payload.login,
        username: 'Username'
      });
      const data = await response.json();
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const resetPassword: TResetPasswwordFC = async (payload: IPassword) => {
    try {
      const response = await putData('password_artist', payload);
      const data = await response.json();

      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const logout: TLogoutFC = async () => {
    try {
      const tmpUser = localStorage.getItem('user');
      const response = await putData('artist_log_out', {email: user?.email || JSON.parse(tmpUser!).email});
      const data = await response.json();
      setUser(null);
      localStorage.removeItem('user');
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const update: TUpdateFC = async (payload: IClient) => {
    try {
      const response = await putData('update_artist', {
        ...payload,
        address: Object.values(payload.address).join('& ')
      });
      const data = await response.json();
      setUser(payload);
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const createWork: TCreateWorkFC = async (payload: IWork) => {
    try {
      const response = await postData('register_work', {...payload, email: user?.email, artist_id: user?.artist_id, price: parseFloat(payload.price), info: payload.info ? 1 : 0});
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue', data: []};
    }
  };

  const getWork: TGetWorkFC = async () => {
    try {
      const response = await postData('check_yourwork', {artist_id: user?.artist_id});
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue', data: []};
    }
  };

  const deleteWork: TDeleteWorkFC = async (payload: {work_id: number}) => {
    try {
      const response = await postData('delete_work', payload);
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue', data: []};
    }
  };

  const receivePayment: TReceivePaymentFC = async (artist_id: number) => {
    try {

      const response = await postData('received_payment', {artist_id});
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
      return {status:'error', message: 'Une erreur est survenue.'};
    }
  };

  return (
    <ClientContext.Provider value={{
        client: user, autolog,
        login, register, resetPassword, logout, update,
        getWork, createWork, deleteWork, receivePayment
    }}>
        {children}
    </ClientContext.Provider>
  );
};