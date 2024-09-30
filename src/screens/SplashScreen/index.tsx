import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/imgs/dietYouLogo.png';

function SplashScreen() {
  const navigate = useNavigate();

    const handleEnterButton = () => {
      navigate('/login');
    };
  return (
    <div className="h-screen w-screen flex items-center bg-[#2C5944] flex-col gap-[5%] p-7">
      <div className="max-w-md w-full h-full text-center flex flex-col gap-9 items-center justify-center -mt-10">
        <h2 className="text-white text-[64px]">dietYou</h2>
        <img src={Logo} className="h-[180px] w-[200px] flex"></img>

        <button
          onClick={handleEnterButton}
          className="mt-20 shadow-text relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-[22px] shadow-xl rounded-3xl text-[#ffffff] bg-[#6e8f4b] hover:bg-[#64754e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e6e6e6]"
        >
          ENTRAR
        </button>
      </div>
    </div>
  );
}

export default SplashScreen;
