import React, { useState } from 'react';
import { RecipeData } from '../../hooks/useRecipes';
import MenuBar from '../../components/menu-bar';
import Logo from '../../assets/imgs/dietYouLogo.png';
import { FiLogOut } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import useRecipes from '../../hooks/useRecipes';
import { FaArrowRight } from 'react-icons/fa6';
import Popup from '../../components/popup';
import { useNavigate } from 'react-router-dom';

interface RecipesProps {
  meal?: RecipeData;
}

const Recipes: React.FC<RecipesProps> = () => {
  const { userData } = useAuth();
  const { recipes, loading } = useRecipes();
    const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);

  const handleSelectRecipe = (recipe: RecipeData) => {
    setModalOpen(true);
    setSelectedRecipe(recipe);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="bg-white flex w-screen h-screen flex-col items-center justify-center">
        <h2>Carregando...</h2>
        <MenuBar />
      </div>
    );
  }

  return (
    <div className="bg-[#FEFEFE] md:w-[100%] h-full flex flex-col justify-start overflow-y-hidden">
      <header className="text-center flex flex-col items-center justify-center md:ml-[150px]">
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
          onClick={() => handleLogout()}
          className="text-black opacity-25 md:h-10 md:w-10 h-8 w-8 absolute md:right-5 md:top-5 right-5 top-4 cursor-pointer"
        />
      </header>
      <section className="flex flex-col justify-center items-center bg-[#FEFEFE] md:ml-[150px] md:mb-0 ml-0 mb-[80px] h-[80%] overflow-y-hidden">
        <div className="w-[90%] bg-[#F2EFEF] rounded-xl flex flex-col justify-start items-center h-[90%] py-5 overflow-y-auto">
          <div className="h-auto min-w-[90%] pt-4">
            <h3 className="text-[#2C5944] shadow-text-two md:text-lg text-base">
              Receitas
            </h3>
            <span className="text-[#2C5944] shadow-text-two md:text-base text-base">
              Aqui estão algumas receitas saudáveis para você dar uma
              diferenciada nas suas refeições semanais!
            </span>
            <div className="flex justify-center items-end w-full h-full overflow-y-auto mt-2">
              {recipes ? (
                <ul className="max-w-full w-full flex flex-col gap-5 items-center ">
                  {recipes.map((recipe, index) => (
                    <div
                      onClick={() => handleSelectRecipe(recipe)}
                      key={index}
                      className="h-[170px] sm:w-[60%] w-[80vw] border border-[#2C5944] border-opacity-30 rounded-3xl bg-[#F5F5F5] flex flex-col items-start justify-start"
                    >
                      <h3 className="text-xl text-[#101f18] w-full h-full text-center flex justify-center items-center rounded-t-3xl gap-5">
                        {recipe.name}
                        <FaArrowRight className="bg-[#2C5944] rounded-full text-white w-7 h-7 p-1" />
                      </h3>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma receita disponível.</p>
              )}
            </div>
          </div>
        </div>
        {modalOpen && (
          <Popup recipeData={selectedRecipe} onClose={setModalOpen} />
        )}
      </section>
      <MenuBar />
    </div>
  );
};

export default Recipes;
