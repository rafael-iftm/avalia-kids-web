import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      login(response);
      navigate('/');
    } catch (err) {
      alert('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !!email.trim() && !!password.trim();

  return (
    <div className="flex w-screen h-screen">
      {/* Lado esquerdo azul com texto e imagem */}
      <div className="w-1/2 bg-[#1B3C87] text-white flex flex-col justify-center items-center p-10">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/avaliakids.firebasestorage.app/o/assets%2Fimages%2Fpng%2Fdefault%2Flogin.png?alt=media&token=1e1f2955-90fd-4cc3-8f85-cfdb8b28417b"
          alt="Multi-currency card"
          className="w-72 mb-8"
        />
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Bem-vindo ao Avalia Kids!
        </h2>
        <p className="text-center max-w-sm">
          Crie questões e gerencie o desempenho dos seus alunos!
        </p>
      </div>

      {/* Lado direito com formulário */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login do Professor
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B3C87]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B3C87]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-2 px-4 rounded text-white font-semibold transition ${
                loading
                  ? 'bg-[#1B3C87]/50 cursor-wait'
                  : isFormValid
                  ? 'bg-[#1B3C87] hover:bg-[#152e6c]'
                  : 'bg-[#1B3C87]/30 cursor-not-allowed'
              }`}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Ainda não tem uma conta?{' '}
              <Link to="/register" className="text-[#1B3C87] hover:underline font-medium">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
