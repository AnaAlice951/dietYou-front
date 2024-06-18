import React from 'react';

interface ExitPopupProps {
  logout: () => void;
  onClose: () => void;
}

const ExitPopup: React.FC<ExitPopupProps> = ({ onClose, logout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg max-md:w-[85%] xl:w-[30%] w-[40%] flex flex-col items-center h-[50%] justify-center gap-12">
        <h2 className="max-md:text-xl text-2xl mt-4">
          Tem certeza que deseja sair?
        </h2>
        <div className="flex gap-6">
          <button
            className="bg-[#E96921] max-md:sm text-base mt-4 text-white rounded-full"
            onClick={logout}
          >
            Sim
          </button>
          <button
            className="bg-[#8F8B8B] max-md:sm text-base mt-4 text-white rounded-full"
            onClick={onClose}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitPopup;
