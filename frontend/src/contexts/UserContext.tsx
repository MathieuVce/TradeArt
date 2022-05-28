import { createContext, useState } from "react";
import { IUser, IRegisterU } from "../@types/IUser";
import { IAuth, IPassword } from "../@types/IClient";
import { IUserContext, defaultUserValue, TLoginFC, TLogoutFC, TRegisterFC, TResetPasswwordFC } from "../@types/IUserContext";

export const UserContext = createContext<IUserContext>(defaultUserValue);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<null | IUser>(null);

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

  const loginU: TLoginFC = async (payload: IAuth) => {
    try {
      const response = await putData('customer_log_in', payload);
      const data = await response.json();
      console.log(data.data);
      if (data.status === 'success') {
        const address = {
          address: data.data[4].split(',')[0],
          postalcode: data.data[4].split(',')[1],
          city: data.data[4].split(',')[2]
        };
        setUser({
        user: true,
        id: data.data[0],
        firstname: data.data[1],
        lastname: data.data[2],
        address,
        birthdate: new Date(data.data[5]),
        credit_card_number: data.data[6],
        email: data.data[7],
        phonenumber: data.data[8],
        });
      }
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
    }
  };

  const registerU: TRegisterFC = async (payload: IRegisterU) => {
    const response = await postData('register_customer', 
    {
      ...payload.details,
      address: Object.values(payload.details.address).join(', '),
      ...payload.login,
      username: 'Username'
    });
    const data = await response.json();
    return {status: data.status, message: data.message};
  };

  const resetPasswordU: TResetPasswwordFC = async (payload: IPassword) => {
    const response = await putData('password_customer', payload);
    const data = await response.json();

    return {status: data.status, message: data.message};
  };

  const logoutU: TLogoutFC = async () => {
    try {
      const response = await putData('customer_log_out', {email: user?.email});
      const data = await response.json();
      setUser(null);
      return {status: 'success', message: data.detail};
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <UserContext.Provider value={{
        user,
        loginU, registerU, resetPasswordU, logoutU,
    }}>
        {children}
    </UserContext.Provider>
  );
};