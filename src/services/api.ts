import axios from 'axios';

export interface UserData {
  id: number | string;
  name: string;
  age: number;
  created_at: string;
  user_id: string;
  weight: number;
  height: number;
  goal: string;
}

export interface UserCredentials {
  id: number;
  user_id: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface TrainingData {
  id: number;
  students_id: string;
  day: string;
  exercises_id: string;
}

const api = axios.create({
  baseURL: 'https://dietyout-back-production.up.railway.app',
});

export const fetchStudents = async (): Promise<UserData[]> => {
  const response = await api.get<UserData[]>('/students');

  return response.data;
};

export const fetchTraining = async (
  students_id: string,
  day?: string
): Promise<TrainingData[]> => {
  try {
    const params: Record<string, string> = { students_id };
    if (day) {
      params.day = day;
    }
    const response = await api.get<TrainingData[]>('auth/training', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || 'Erro ao tentar buscar treinos'
      );
    }
    throw new Error('Erro ao tentar buscar treinos');
  }
};

export const fetchMeals = async (account_id: string) => {
  try {
    const response = await api.get(`meals/${account_id}`);
   return response.data
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRecipes = async () => {
  try {
    const response = await api.get(`recipes`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const login = async (
  credentials: SignInCredentials
): Promise<string> => {
  try {
    const response = await api.post<SignInResponse>('auth/signin', credentials);
    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Erro ao tentar fazer login'
      );
    }
    throw new Error('Erro ao tentar fazer login');
  }
};

export const me = async (token: string) => {
  return api.post('auth/me', {
    token,
  });
};
