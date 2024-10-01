import { useEffect, useState } from 'react';
import { fetchMeals} from '../services/api';
import useAuth from './useAuth';


interface Item {
  item: string;
  detalhes: string;
}

interface Meals {
  itens: Item[];
  refeicao: string;
}

export interface MealsPerDay {
  refeicoes: Meals[];
}

export interface MealsData {
  dom: MealsPerDay;
  seg: MealsPerDay;
  ter: MealsPerDay;
  qua: MealsPerDay;
  qui: MealsPerDay;
  sex: MealsPerDay;
  sab: MealsPerDay;
}

const useMeals = () => {
  const { userData } = useAuth();
  const [meals, setMeals] = useState<MealsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        setLoading(true);

        try {
          const data = await fetchMeals(userData.id as string);
          setMeals(data);
          console.log({ data });
        } catch (error) {
          console.log('error ', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [userData]);

  return {
    meals,
    loading,
  };
};

export default useMeals;
