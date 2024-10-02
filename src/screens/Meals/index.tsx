import React from 'react';
import { MealsPerDay } from '../../hooks/useMeals';

interface MealsProps {
  meal?: MealsPerDay;
}

const Meals: React.FC<MealsProps> = ({ meal }) => {
  return (
    <div className="flex justify-center mt-2 h-full overflow-y-scroll w-[90%] px-10 overflow-x-hidden">
      {meal ? (
        <div className="max-w-full w-full flex flex-col gap-5 items-center ">
          {meal.refeicoes.map((refeicao, index) => (
            <div
              key={index}
              className="min-h-[170px] sm:w-[100%] w-[80vw] border border-[#2C5944] border-opacity-30 rounded-3xl bg-[#F5F5F5] flex flex-col items-start justify-start"
            >
              <h3 className="text-xl text-[#101f18] w-full text-center bg-[#bed3c9] rounded-t-3xl">
                {refeicao.refeicao}
              </h3>
              {refeicao.itens.map((item, itemIndex) => (
                <div key={itemIndex} className="p-2 pb-1 max-w-full">
                  <span className="text-[#2C5944] shadow-text-two">
                    ✦ {item.item}
                  </span>
                  : <span>{item.detalhes}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma refeição disponível para este dia.</p>
      )}
    </div>
  );
};

export default Meals;
