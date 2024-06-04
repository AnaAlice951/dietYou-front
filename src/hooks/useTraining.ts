import { useEffect, useState } from 'react';
import { fetchExercises, fetchTraining } from '../services/api';
import useAuth from './useAuth';

type Exercise = {
  weekday: string;
  name: string;
  description: string;
  repetitions: string;
  load: string;
  interval: string;
};

export const getExercisesByWeekday = (
  exercises: Exercise[],
  weekDay: string
) => {
  return exercises.filter((item) => item.weekday === weekDay);
};

const useTraining = () => {
  const { userData } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        setLoading(true);

        try {
          const data = await fetchTraining(userData.id as string);

          if (data && data.length > 0) {
            const response = await fetchExercises(
              data.map((item) => item.exercises_id)
            );

            setExercises(
              data.map((item) => {
                const exercise = response.find(
                  (exercise) => exercise.id === item.exercises_id
                );
                return { ...exercise, weekday: item.day };
              })
            );
          }
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
    exercises,
    loading,
  };
};

export default useTraining;
