import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuBar from '../../components/menu-bar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { LuClock4 } from 'react-icons/lu';
import TimerPopup from '../../components/popup';
import { getExercisesByWeekday } from '../../hooks/useTraining';
import Toast from '../../components/toaster';

const Exercises: React.FC = () => {
  const location = useLocation();
  const { day, exercises } = location.state;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRepetition, setCurrentRepetition] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const filteredExercises = getExercisesByWeekday(exercises, day);

  const navigate = useNavigate();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

   const extractInterval = (interval: string) => {
     const numberString = interval.split(' ')[0];
     return parseInt(numberString, 10);
  };
  
  const intervalDuration = extractInterval(
    filteredExercises[currentIndex].interval
  );


  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleNextExercise = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      goBackHome();
    }
  };

  const handleNextRepetition = () => {
    const totalRepetitions = Number(
      filteredExercises?.[currentIndex]?.repetitions?.split('x')?.[0]
    );
    if (currentRepetition < totalRepetitions) {
      setCurrentRepetition((prev) => prev + 1);
    } else {
      closePopup();
      setCurrentRepetition(0);
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false);
      }, 3300);
    }
  };

  if (!day) {
    return <div>Dia não especificado</div>;
  }

  const goBackHome = () => {
    navigate('/home');
  };

  if (filteredExercises.length === 0) {
    return (
      <div className="bg-white flex w-screen h-screen flex-col items-center justify-center">
        <h2>Você não tem exercícios para este dia!</h2>
        <button
          className="bg-[#1C1C1E] text-white rounded-[20px] mt-4"
          onClick={goBackHome}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col pt-10 w-screen md:pl-[150px]">
      <header className="text-center mb-8 flex items-center justify-center relative">
        <button
          onClick={goBackHome}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          aria-label="Voltar para Home"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <div className="flex flex-col gap-8">
          <h1 className="text-[50px] leading-[1] font-bold">MOVE IN</h1>
          <h2 className="text-[24px] font-bold">Treino do dia</h2>
        </div>
      </header>
      <section className="bg-[#1C1C1E] rounded-t-[20px] w-full text-white pt-12 pb-[96px] px-12 flex flex-1 flex-col ">
        <h2 className="text-lg mb-4 font-bold">
          {filteredExercises[currentIndex].name}
        </h2>
        <p className="text-base">
          Descrição: {filteredExercises[currentIndex].description}
        </p>
        <div className="flex flex-col gap-5">
          <h2 className="text-lg pt-8">
            Repetições: {filteredExercises[currentIndex].repetitions}
          </h2>
          <h2 className="text-lg">
            Carga: {filteredExercises[currentIndex].load}
          </h2>
          <h2 className="text-lg">
            Intervalo entre repetições:{' '}
            {filteredExercises[currentIndex].interval}
          </h2>
        </div>
        <div
          className="bg-[#E96921] py-4 w-[225px] self-center mt-16 rounded-[20px] flex items-center justify-center flex-col gap-2 cursor-pointer"
          onClick={openPopup}
        >
          <LuClock4 className="text-5xl" />
          <span className="text-xl">Começar</span>
        </div>
        <div
          className="flex gap-3 py-3 bg-[#E96921] max-md:bg-[#E96921] min-w-[200px] w-1 items-center justify-center rounded-[20px] mt-16 self-center max-w-[400px] cursor-pointer"
          onClick={handleNextExercise}
        >
          {currentIndex < filteredExercises.length - 1
            ? 'Próximo exercício'
            : 'Finalizar dia'}
          <FaArrowRight />
        </div>
      </section>
      <MenuBar />
      {isPopupOpen && (
        <TimerPopup
          onClose={closePopup}
          duration={intervalDuration}
          currentRepetition={currentRepetition}
          totalRepetitions={Number(
            filteredExercises?.[currentIndex]?.repetitions?.split('x')?.[0]
          )}
          onNextRepetition={handleNextRepetition}
        />
      )}
      {showToast && (
        <Toast
          type={'success'}
          message={'Você conclui esse exercício! Vá para o proxímo'}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Exercises;
