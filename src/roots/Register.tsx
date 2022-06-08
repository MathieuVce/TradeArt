import * as React from 'react';
import { useState } from 'react';
import { EAuth } from '../@types/EAuth';
import { IUser } from '../@types/IUser';
import { Auth } from '../components/Auth';
import { useOutletContext } from 'react-router';
import { IAuth, IClient, TUser } from '../@types/IClient';
import { RegisterStepper } from '../components/Register/RegisterStep';
import { UserSecondStep } from '../components/Register/User/SecondStep';
import { ArtistFirstStep } from '../components/Register/Artist/FirstStep';
import { ArtistThirdStep } from '../components/Register/Artist/ThirdStep';
import { ArtistSecondStep } from '../components/Register/Artist/SecondStep';

const Register: React.FunctionComponent = () => {
  const { user } = useOutletContext<TUser>()
  const [authValues, setAuthValues] = useState<IAuth>({
      email: '',
      password: '',
  });


  const [detailsValues, setDetailsValues] = useState<IClient>(
  {
    email: '',
    birthdate: '2000-01-01' as unknown as Date,
    lastname: '',
    firstname: '',
    bank_account_number: '',
    address: {
      address: '',
      postalcode: '',
      city: '',
    },
    phonenumber: '',
    institution: '',
    cursus: '',
    description: '',
    photo: 'p'
  });

  const [detailsUValues, setDetailsUValues] = useState<IUser>(
  {
    firstname: '',
    lastname: '',
    username: '',
    address: {
      address: '',
      postalcode: '',
      city: '',
    },
    birthdate: '2000-01-01' as unknown as Date,
    credit_card_number: '',
    email: '',
    phonenumber: ''
  });

  const handleChangeDetails = (prop: keyof typeof detailsValues, value: any) => {
    setDetailsValues({
        ...detailsValues,
        [prop]: value
    });
  };

  const handleChangeDetailsU = (prop: keyof typeof detailsUValues, value: any) => {
    setDetailsUValues({
        ...detailsUValues,
        [prop]: value
    });
  };

  const handleChangeAuth = (prop: keyof typeof authValues, value: string | boolean) => {
    setAuthValues({
        ...authValues,
        [prop]: value
    });
  };

  const stepsArray = {
    'Inscription': <ArtistFirstStep key={1} authValues={authValues} detailsValues={detailsValues} handleChangeAuth={handleChangeAuth} handleChangeDetails={handleChangeDetails}/>,
    'Informations personnelles': <ArtistSecondStep key={2} detailsValues={detailsValues} handleChangeDetails={handleChangeDetails}/>,
    'Informations complémentaires': <ArtistThirdStep key={3} detailsValues={detailsValues} handleChangeDetails={handleChangeDetails}/>
  };

  const stepsArrayU = {
    'Inscription': <ArtistFirstStep key={1} authValues={authValues} detailsValues={detailsUValues} handleChangeAuth={handleChangeAuth} handleChangeDetails={handleChangeDetailsU}/>,
    'Informations personnelles': <UserSecondStep key={2} detailsValues={detailsUValues} handleChangeDetails={handleChangeDetailsU}/>
  };

  return (
    <Auth type={EAuth.register} values={{
    login: {...authValues},
    details: user ? {...detailsUValues} : {...detailsValues},
    }}>
      { user ?
      (
        <RegisterStepper authValues={authValues} detailsValues={detailsUValues} handleChangeAuth={handleChangeAuth} handleChangeDetails={handleChangeDetailsU} stepsArray={stepsArrayU}/>
      ) : (
        <RegisterStepper authValues={authValues} detailsValues={detailsValues} handleChangeAuth={handleChangeAuth} handleChangeDetails={handleChangeDetails} stepsArray={stepsArray}/>
      )
      }
    </Auth>
  );
};
  
export default Register
  