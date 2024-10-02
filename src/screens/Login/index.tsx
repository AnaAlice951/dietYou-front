import { useEffect, useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { IoIosLock } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import Toast from '../../components/toaster';
import useAuth from '../../hooks/useAuth';
import Logo from '../../assets/imgs/dietYouLogo.png'
import { FaArrowLeft } from 'react-icons/fa6';

function Login() {
  const navigate = useNavigate();

  const handleNavigate = (navigateTo: string) => {
     navigate(navigateTo);
  };
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { userData } = useAuth();
  const [toastType, setToastType] = useState<
    'success' | 'warning' | 'error' | 'info'
  >('info');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = await login({ email, password });
      setToastType('success');
      setToastMessage('Login realizado com sucesso!');
      localStorage.setItem('authToken', token);
      handleNavigate('/home');
    } catch (error) {
      setToastType('error');
      setToastMessage((error as Error).message);
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    // if (userData) navigate('/home');
  }, [userData]);

  return (
    <div className="h-screen w-screen flex items-center bg-[#FEFEFE] flex-col gap-[5%] overflow-x-hidden">
      <header className="w-full min-h-24 justify-center items-center flex-row flex bg-[#DDDBDB] p-0 rounded-b-1xl">
        <div
          className="bg-[#2C5944] w-fit h-fit p-2 rounded-full absolute md:left-20 left-10"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft className="text-2xl text-white" />
        </div>
        <img src={Logo} className="h-[75px] w-[75px] flex"></img>
      </header>
      <div className="max-w-md w-full h-full text-center flex flex-col gap-9 justify-center items-center p-7">
        <h2 className="md:text-[45px] text-[25px]">Bem vindo</h2>
        <h2 className="md:text-[30px] text-[20px]">Entre com sua conta aqui</h2>
        <form
          className="mt-8 space-y-6 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="rounded-2xl gap-5 flex flex-col">
            <div className="relative">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                <CiMail className="text-white text-2xl" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 placeholder-white text-white  focus:outline-none focus:ring-[#E96921] focus:border-[#E96921] focus:z-10 md:text-[20px] text-base bg-[#4D4A4A]"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <div>
                <label className="sr-only">Senha</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                  <IoIosLock className="text-white text-2xl" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-12 py-3 placeholder-white text-white focus:outline-none focus:ring-[#E96921] focus:border-[#E96921] focus:z-10 md:text-[20px] text-base bg-[#4D4A4A]"
                  placeholder="Senha"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => handleSubmit}
              className="mt-20 shadow-text relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-[22px] shadow-xl rounded-3xl text-[#ffffff] bg-[#2C5944] hover:bg-[#64754e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e6e6e6]"
            >
              ENTRAR
            </button>
          </div>
        </form>
      </div>
      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default Login;
