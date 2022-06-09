import { formatDate } from "../utils/utils";
import { createContext, useState } from "react";
import { IAuth, IPassword } from "../@types/IClient";
import { IUser, IRegisterU, ICreateOrder, ILike } from "../@types/IUser";
import { IUserContext, defaultUserValue, TLoginFC, TLogoutFC, TRegisterFC, TResetPasswwordFC, TUpdateFC, TGetWorksFC, TCreateOrderFC, TGetPurchasesFC, TLikeWorkFC } from "../@types/IUserContext";

export const UserContext = createContext<IUserContext>(defaultUserValue);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<null | IUser>(null);

  const ip = 'https://tradeartfastapi.herokuapp.com/'
  // const ip = 'http://localhost:8000/'
  
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
      if (data.status === 'success') {
        const address = {
          address: data.data[4].split('& ')[0],
          postalcode: data.data[4].split('& ' )[1],
          city: data.data[4].split('& ')[2]
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
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const autologU = async () => {
    const tmpUser = localStorage.getItem('userU');

    if (tmpUser !== null) {
      await logoutU();
    }
  };

  const registerU: TRegisterFC = async (payload: IRegisterU) => {
    try {
      const response = await postData('register_customer', 
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

  const resetPasswordU: TResetPasswwordFC = async (payload: IPassword) => {
    try {
      const response = await putData('password_customer', payload);
      const data = await response.json();

      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue', data: []};
    }
  };

  const logoutU: TLogoutFC = async () => {
    try {
      const tmpUser = localStorage.getItem('userU');
      const response = await putData('customer_log_out', {email: user?.email || JSON.parse(tmpUser!).email});
      const data = await response.json();
      setUser(null);
      localStorage.removeItem('user');
      return {status: 'success', message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };
  const getWorks: TGetWorksFC = async () => {
    try {
      const response = await fetchData('all_work');
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue', data: []};
    }

  };

  const updateU: TUpdateFC = async (payload: IUser) => {
    try {
      const response = await putData('update_customer', {
        ...payload,
        address: Object.values(payload.address).join('& '),
        username: 'username'
      });
      const data = await response.json();
      setUser(payload);
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const createOrder: TCreateOrderFC = async (payload: ICreateOrder) => {
    try {
      const response = await postData('create_order', payload);
      const data = await response.json();
      if (data.status === 'success') {
        if (payload.save === 1) {
          setUser({
            ...user!,
            credit_card_number: payload.credit_card_number
        });
        }
      }
      return {status: data.status, message: data.message};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue'};
    }
  };

  const getPurchases: TGetPurchasesFC = async (customer_id: number) => {
    try {
      const response = await postData('my_purchases', {customer_id});
      const data = await response.json();
      return {status: data.status, message: data.message, data: data.data};
    } catch (error) {
      console.log(error)
      return {status: 'error', message: 'Une erreur est survenue', data: []};
    }
  };

  const likeWork: TLikeWorkFC = async (payload: ILike) => {
    try {
      const response = await postData('like_work', payload);
      const data = await response.json();
      return {status: data.status};
    } catch (error) {
      console.log(error)
      return {status: 'error'};
    }
  };

  return (
    <UserContext.Provider value={{
        user, autologU,
        loginU, registerU, resetPasswordU, logoutU,
        updateU, getWorks, createOrder, getPurchases,
        likeWork
    }}>
        {children}
    </UserContext.Provider>
  );
};