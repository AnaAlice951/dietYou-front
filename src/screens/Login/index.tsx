import { useEffect, useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { IoIosLock } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import Toast from '../../components/toaster';
import useAuth from '../../hooks/useAuth';

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
      handleNavigate('home');
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
    if (userData) navigate('/home');
  }, [userData]);

  return (
    <div className="h-screen w-screen flex items-center pt-[10%] bg-[#1C1C1E] flex-col gap-[5%] p-7">
      <div className="max-w-md w-full text-center flex flex-col gap-9">
        <h2 className="text-white">Bem vindo</h2>
        <h2 className="text-white">Entre com sua conta aqui</h2>
        <h1 className="text-white font-oswald pt-12">MOVE IN</h1>

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
                className="appearance-none relative block w-full px-12 py-2 placeholder-white text-white  focus:outline-none focus:ring-[#E96921] focus:border-[#E96921] focus:z-10 text-[15px] bg-[#4D4A4A]"
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
                  className="appearance-none relative block w-full px-12 py-2 placeholder-white text-white focus:outline-none focus:ring-[#E96921] focus:border-[#E96921] focus:z-10 text-[15px] bg-[#4D4A4A]"
                  placeholder="Senha"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between flex-col gap-4">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-white hover:text-[#E96921] text-[13px]"
                onClick={() => handleNavigate('forgotpassword')}
              >
                Esqueceu a senha?
              </a>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-white hover:text-[#E96921] text-[13px]"
                onClick={() => handleNavigate('signup')}
              >
                Cadastre-se
              </a>
            </div>
          </div>

          <div className="pt-10">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E96921] hover:bg-[#E96921] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E96921]"
            >
              Entrar
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
