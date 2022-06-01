import { formatDate } from "../utils/utils";
import { createContext, useState } from "react";
import { IAuth, IClient, IPassword, IRegister, IWork } from "../@types/IClient";
import { defaultClientValue, IClientContext, TCreateWorkFC, TDeleteWorkFC, TGetWorkFC, TLoginFC, TLogoutFC, TRegisterFC, TResetPasswwordFC, TUpdateFC } from "../@types/IClientContext";

export const ClientContext = createContext<IClientContext>(defaultClientValue);

export const ClientProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<null | IClient>(null);

  const ip = 'http://localhost:8000/'
  
  // const getData = async (url: string) => {
  //   return await fetch(ip+url)
  // };

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
          address: data.data[5].split(', ')[0],
          postalcode: data.data[5].split(', ')[1],
          city: data.data[5].split(', ')[2]
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
    }
  };

  const autolog = async () => {
    const tmpUser = localStorage.getItem('user');

    if (tmpUser !== null) {
      await logout();
    }
  };

  const register: TRegisterFC = async (payload: IRegister) => {
    const response = await postData('register_artist', 
    {
      ...payload.details,
      address: Object.values(payload.details.address).join(', '),
      ...payload.login,
      username: 'Username'
    });
    const data = await response.json();
    return {status: data.status, message: data.message};
  };

  const resetPassword: TResetPasswwordFC = async (payload: IPassword) => {
    const response = await putData('password_artist', payload);
    const data = await response.json();

    return {status: data.status, message: data.message};
  };

  const logout: TLogoutFC = async () => {
    try {
      const response = await putData('artist_log_out', {email: user?.email});
      const data = await response.json();
      setUser(null);
      localStorage.removeItem('user');
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
    }
  };

  const update: TUpdateFC = async (payload: IClient) => {
    try {
      const response = await putData('update_artist', {
        ...payload,
        address: Object.values(payload.address).join(', ')
      });
      const data = await response.json();
      setUser(payload);
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
    }
  };

  const createWork: TCreateWorkFC = async (payload: IWork) => {
    const response = await postData('register_work', {...payload, email: user?.email, artist_id: user?.artist_id, price: parseFloat(payload.price)});
    const data = await response.json();
    return {status: data.status, message: data.message, data: data.data};
  };

  const getWork: TGetWorkFC = async () => {
      const response = await postData('check_yourwork', {artist_id: user?.artist_id});
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
  };

  const deleteWork: TDeleteWorkFC = async (payload: {work_id: number}) => {
    const response = await postData('delete_work', payload);
    const data = await response.json();
    return {status: data.status, message: data.message, data: data.data};
};

  return (
    <ClientContext.Provider value={{
        client: user, autolog,
        login, register, resetPassword, logout, update,
        getWork, createWork, deleteWork
    }}>
        {children}
    </ClientContext.Provider>
  );
};