import { createContext, useState } from "react";
import { IUser, IRegisterU } from "../@types/IUser";
import { IAuth, IPassword } from "../@types/IClient";
import { IUserContext, defaultUserValue, TLoginFC, TLogoutFC, TRegisterFC, TResetPasswwordFC, TUpdateFC, TGetWorksFC } from "../@types/IUserContext";
import { formatDate } from "../utils/utils";

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
          address: data.data[4].split(', ')[0],
          postalcode: data.data[4].split(',' )[1],
          city: data.data[4].split(', ')[2]
        };
        setUser({
        user: true,
        customer_id: data.data[0],
        firstname: data.data[1],
        lastname: data.data[2],
        address,
        birthdate: formatDate(new Date(data.data[5])) as unknown as Date,
        credit_card_number: data.data[6],
        email: data.data[7],
        phonenumber: data.data[8],
        });
        localStorage.setItem('userU', JSON.stringify({ email: payload.email, password: payload.password }));
      }
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
    }
  };

  const autologU = async () => {
    const tmpUser = localStorage.getItem('userU');

    if (tmpUser !== null) {
      await logoutU();
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
      const tmpUser = localStorage.getItem('userU');
      const response = await putData('customer_log_out', {email: user?.email || JSON.parse(tmpUser!).email});
      const data = await response.json();
      setUser(null);
      localStorage.removeItem('user');
      return {status: 'success', message: data.detail};
    } catch (error) {
      console.log(error)
    }
  };
  const getWorks: TGetWorksFC = async () => {
    try {
      const response = await fetchData('all_work');
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
    }

  };

  const updateU: TUpdateFC = async (payload: IUser) => {
    try {
      const response = await putData('update_customer', {
        ...payload,
        address: Object.values(payload.address).join(', '),
        username: 'username'
      });
      const data = await response.json();
      setUser(payload);
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <UserContext.Provider value={{
        user, autologU,
        loginU, registerU, resetPasswordU, logoutU,
        updateU, getWorks
    }}>
        {children}
    </UserContext.Provider>
  );
};