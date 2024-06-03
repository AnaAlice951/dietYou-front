import { useState } from 'react';
import { UserData, me } from '../services/api';

type UserDataType = UserData| null;


const useAuth = () => {
  const [userData, setUserData] = useState<UserDataType>(null);

  const verifyLogin = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setUserData(null);
      return false;
    }

    try {
      const response = await me(token);
      setUserData(response.data.data);
      return true;
    } catch (error) {
      setUserData(null);
      return false;
    }
  };

  return { verifyLogin, userData };
};

export default useAuth;
