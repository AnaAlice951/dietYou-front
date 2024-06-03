import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#1C1C1E]">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-white">MOVE IN</h1>
        <h2 className="text-white">Entre em contato conosco</h2>
        <h2 className="text-white">
          Para você, personal trainer que deseja cadastrar seus alunos, entre em
          contato conosco e solicite um orçamento
        </h2>
        <h3 className="text-white">(31) 9999-9999</h3>
        <h3 className="text-white">email@email.com</h3>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}

export default SignUp;
