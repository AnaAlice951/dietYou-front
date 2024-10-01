import { useEffect, useState } from 'react';
import { UserData, me } from '../services/api';
import { useNavigate } from 'react-router-dom';

type UserDataType = UserData | null;

const useAuth = () => {
  const [userData, setUserData] = useState<UserDataType>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    verifyLogin().then((isLogged) => {
    if (!isLogged) return navigate('/login');
    });
  }, []);

  return { verifyLogin, userData };
};

export default useAuth;
