import { useNavigate } from 'react-router-dom';
import MenuBar from '../../components/menu-bar';
import { UserData } from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { RiArrowDropRightLine } from 'react-icons/ri';
import useTraining from '../../hooks/useTraining';

function Home() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { exercises, loading } = useTraining();

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
    navigate(`/treino`, {
      state: { day, userData, exercises },
    });
  };

  if (loading) {
    return (
      <div className="bg-white flex w-screen h-screen flex-col items-center justify-center">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#1C1C1E] min-h-screen w-[99.14vw] md:pl-[180px] pb-[80px]">
      <header className="text-center mb-8 p-6">
        <h1 className="text-white font-oswald pt-12">MOVE IN</h1>
        <div>
          <p className="text-lg text-[#FF5C00]">Olá, {userData?.name}!</p>
          <p className="text-white">Treino de hoje: {currentDayOfWeek[0]}</p>
        </div>
      </header>
      <section className="p-6 flex flex-col justify-center">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Dias da Semana
        </h2>
        <ul className="flex flex-col gap-4">
          {currentDayOfWeek.map((day, index) => (
            <li
              key={index}
              className={`bg-white p-4 shadow-md flex items-center justify-between ${
                index === 0 ? 'text-xl font-bold p-10' : ''
              }`}
              onClick={() => handleDayClick(day, userData)}
            >
              <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
              {index == 0 ? (
                <RiArrowRightDoubleFill className="text-6xl" />
              ) : (
                <RiArrowDropRightLine className="text-4xl" />
              )}
            </li>
          ))}
        </ul>
      </section>
      <MenuBar />
    </div>
  );
}

export default Home;
