import { createContext, useState } from "react";
import { IAuth, IClient, IPassword, IRegister } from "../@types/IClient";
import { defaultClientValue, IClientContext, TLoginFC, TLogoutFC, TRegisterFC, TResetPasswwordFC } from "../@types/IClientContext";

export const ClientContext = createContext<IClientContext>(defaultClientValue);

export const ClientProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<null | IClient>(null);

  const ip = 'http://localhost:8000/'
  
  const fetchData = async (url: string) => {
    return await fetch(ip+url)
  };

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
      console.log(data.data);
      if (data.status === 'success') {
        const address = {
          address: data.data[5].split(',')[0],
          postalcode: data.data[5].split(',')[1],
          city: data.data[5].split(',')[2]
        };
        setUser({
          user: false,
          id: data.data[0],
          firstname: data.data[1],
          lastname: data.data[2],
          birthdate: new Date(data.data[3]),
          bank_account_number: data.data[4],
          address,
          email: data.data[6],
          phonenumber: data.data[7],
          institution: data.data[8],
          cursus: data.data[9],
          description: data.data[10],
          photo: data.data[11]
        });
      }
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
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
      return {status: 'success', message: data.detail};
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <ClientContext.Provider value={{
        client: user,
        login, register, resetPassword, logout,
    }}>
        {children}
    </ClientContext.Provider>
  );
};