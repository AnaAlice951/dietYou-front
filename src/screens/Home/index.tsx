import { useNavigate } from 'react-router-dom';
import MenuBar from '../../components/menu-bar';
import { TrainingData, UserData, fetchTraining } from '../../services/api';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

function Home() {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState<TrainingData[]>([]);
  const { verifyLogin, userData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        try {
          const data = await fetchTraining(userData.id as string);

          if (data && data.length > 0) setExercises(data);
        } catch (error) {
          console.log('error ', error);
        }
      }
    };

    fetchData();
  }, [userData]);

  useEffect(() => {
    verifyLogin().then((isLogged) => {
      if (!isLogged) return navigate('/');
    });
  }, []);

  const getCurrentDayOfWeek = () => {
    const daysOfWeek = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];
    const todayIndex = new Date().getDay();
    const reorderedDaysOfWeek = [
      ...daysOfWeek.slice(todayIndex),
      ...daysOfWeek.slice(0, todayIndex),
    ];
    return reorderedDaysOfWeek;
  };

  const currentDayOfWeek = getCurrentDayOfWeek();

  const handleDayClick = (day: string, userData: UserData | null) => {
    const filteredExercises = exercises.filter(item => item.day === day)
    navigate(`/treino`, {
      state: { day, userData, exercises: filteredExercises },
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen md:pl-[180px]">
      <header className="text-center mb-8 p-6">
        <h1 className="text-3xl font-bold">MOVE IN</h1>
        <p className="text-lg text-gray-600">Olá, {userData?.name}!</p>
        <p className="text-gray-600">Treino de hoje: {currentDayOfWeek[0]}</p>
      </header>
      <section className='p-6'>
        <h2 className="text-lg font-semibold mb-4">Dias da Semana</h2>
        <ul className="flex flex-col gap-4">
          {currentDayOfWeek.map((day, index) => (
            <li
              key={index}
              className={`bg-white p-4 shadow-md flex items-center justify-between ${
                index === 0 ? 'text-xl font-bold' : ''
              }`}
              onClick={() => handleDayClick(day, userData)}
            >
              <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
          ))}
        </ul>
      </section>
      <MenuBar />
    </div>
  );
}

export default Home;
