import React, { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdOutlinePlayArrow, MdOutlineStop } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';
import { RecipeData } from '../../hooks/useRecipes';
import { FaArrowLeft } from 'react-icons/fa6';


interface TimerPopupProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  recipeData?: RecipeData;
}

const TimerPopup: React.FC<TimerPopupProps> = ({
  onClose, recipeData
}) => {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 overflow-hidden">
      <div className="relative bg-white rounded-lg max-md:w-[85%] xl:w-[40%] w-[50%] flex flex-col items-center h-[75%] justify-start gap-4 overflow-y-auto">
        <button
          onClick={() => onClose(false)}
          className="absolute top-[5px] left-[5px] bg-[#2C5944] rounded-full p-2 z-50"
        >
          <FaArrowLeft className="text-xl text-white" />
        </button>
        <h2 className="max-md:text-xl text-2xl mt-4 text-[#2C5944] shadow-text-two">
          {recipeData!.name}
        </h2>
        <div className="text-base flex flex-col gap-1 justify-center items-start px-10 pt-10">
          <span>Ingredientes:</span>
          {recipeData!.ingredients.ingredients.map((ingredient, index) => (
            <span key={index}>✦ {ingredient}</span>
          ))}
          <br />
          <span>Passo a passo:</span>
          {recipeData!.steps.steps.map((step, index) => (
            <span key={index}>
              {step}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerPopup;
