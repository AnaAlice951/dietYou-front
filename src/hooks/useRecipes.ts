import { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/api';
import useAuth from './useAuth';

export interface RecipeData  {
  name: string;
  ingredients: {
    ingredients: string[];
  };
  steps: {
    steps: string[];
  };
}


const useRecipes = () => {
  const { userData } = useAuth();
  const [recipes, setRecipes] = useState<RecipeData []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        setLoading(true);

        try {
          const data = await fetchRecipes();
          setRecipes(data);
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
    recipes,
    loading,
  };
};

export default useRecipes;
