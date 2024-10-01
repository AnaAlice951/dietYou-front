import MenuBar from '../../components/menu-bar';
import useAuth from '../../hooks/useAuth';
import useMeals, { MealsPerDay } from '../../hooks/useMeals';
import Meals from '../Meals';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import Logo from '../../assets/imgs/dietYouLogo.png'
import { useNavigate } from 'react-router-dom';

function Home() {
  const { userData } = useAuth();
  const { meals, loading } = useMeals();
  const navigate = useNavigate();
  
  const getCurrentDayOfWeek = () => {
    const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const todayIndex = new Date().getDay();
    const reorderedDaysOfWeek = [
      ...daysOfWeek.slice(todayIndex),
      ...daysOfWeek.slice(0, todayIndex),
    ];
    return { daysOfWeek, reorderedDaysOfWeek };
  };

  const currentDayOfWeek = getCurrentDayOfWeek().reorderedDaysOfWeek[0];
  const daysOfWeek = getCurrentDayOfWeek().daysOfWeek;
  const [selectedDay, setSelectedDay] = useState(currentDayOfWeek);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [meal, setMeal] = useState(meals[currentDayOfWeek.toLowerCase() as any] as unknown as MealsPerDay);
  
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMeal(meals[(selectedDay as any).toLowerCase()] as any);
  }, [selectedDay, meals, currentDayOfWeek]);

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  if (loading) {
    return (
      <div className="bg-white flex w-screen h-screen flex-col items-center justify-center">
        <h2>Carregando...</h2>
        <MenuBar />
      </div>
    );
  }

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };


  return (
    <div className="bg-[#FEFEFE] md:w-[100%] h-full  overflow-y-hidden">
      <header className="text-center flex flex-col items-center justify-center md:ml-[150px] h-[20%] min-h-[190px]">
        <img
          src={Logo}
          className="md:h-[155px] md:w-[155px] h-[75px] w-[75px] flex mt-3"
        ></img>
        <div className="flex items-start justify-start w-full mt-5">
          <p className="md:text-[30px] text-[25px] text-[#2C5944] flex justify-center items-center md:ml-[5%] max-md:px-10">
            Olá, {userData?.name}!
          </p>
        </div>
        <FiLogOut
          onClick={() => handleLogoutConfirm()}
          className="text-black opacity-25 md:h-10 md:w-10 h-8 w-8 absolute md:right-5 md:top-5 right-5 top-4 cursor-pointer"
        />
      </header>
      <section className="flex flex-col justify-center items-center bg-[#FEFEFE] md:ml-[150px] md:mb-0 ml-0 mb-[80px] h-[80%] overflow-y-hidden">
        <div className="w-[90%] bg-[#F2EFEF] rounded-xl flex flex-col justify-start items-center h-[90%] py-5 overflow-y-hidden">
          <ul className="flex md:gap-10 gap-3 flex-row md:text-xl text-base md:pt-5 pt-3">
            {daysOfWeek.map((day, index) => (
              <li
                key={index}
                className={`text-[#494747] flex items-center justify-between cursor-pointer ${
                  day === selectedDay
                    ? 'text-[#2C5945] font-bold shadow-text-two'
                    : 'opacity-50'
                }`}
                onClick={() => handleDayClick(day)}
              >
                <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-[#2C5944] shadow-text-two md:text-lg text-base pt-5">
            Refeições
          </h3>
          <Meals meal={meal} />
        </div>
      </section>
      <MenuBar />
    </div>
  );
}

export default Home;
