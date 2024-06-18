import React, { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdOutlinePlayArrow, MdOutlineStop } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';

interface TimerPopupProps {
  onClose: () => void;
  duration: number; // duration in seconds
  currentRepetition: number;
  totalRepetitions: number;
  onNextRepetition: () => void;
}

const TimerPopup: React.FC<TimerPopupProps> = ({
  onClose,
  duration,
  currentRepetition,
  totalRepetitions,
  onNextRepetition,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handlePlayPause = () => {
    if (isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimeLeft(duration);
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const handleNextRepetition = () => {
    setTimeLeft(duration);
    setIsRunning(false);
    onNextRepetition();
  };

  const isLastRepetition = currentRepetition === totalRepetitions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg max-md:w-[85%] xl:w-[30%] w-[40%] flex flex-col items-center h-[50%] justify-center gap-4">
        <button
          onClick={onClose}
          className="absolute top-[-45px] right-[-5px] bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="max-md:text-xl text-2xl mt-4">
          Repetições feitas: {currentRepetition}/{totalRepetitions}
        </h2>
        <div className="text-2xl mt-4 mb-4 flex flex-col gap-5 justify-center items-center">
          <LuClock4 className="text-7xl" />
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
        <button
          onClick={handlePlayPause}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 mb-4 flex justify-center items-center"
        >
          {isRunning ? (
            <MdOutlineStop className="text-3xl font-black" />
          ) : (
            <MdOutlinePlayArrow className="text-3xl font-black" />
          )}
        </button>
        <button
          onClick={handleNextRepetition}
          className={`bg-${currentRepetition === totalRepetitions + 1 ? 'red-500' : '[#E96921]'
            } hover:bg-${currentRepetition === totalRepetitions + 1 ? 'red-500' : '[#E96921]'
            } rounded-full p-2 mb-4 text-white`}
        >
          {isLastRepetition ? 'Finalizar Exercício' : 'Próxima Repetição'}
        </button>
      </div>
    </div>
  );
};

export default TimerPopup;
