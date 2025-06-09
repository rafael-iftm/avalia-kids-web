import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import { getImageUrl } from '../utils/storage';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const isFormValid = password.length >= 6 && password === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Link inválido ou expirado.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      alert('Senha redefinida com sucesso!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Erro ao redefinir a senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
    {/* Lado esquerdo (imagem e texto) */}
    <div className="md:w-1/2 bg-[#1B3C87] text-white flex flex-col justify-center items-center p-10">
      <img
        src={getImageUrl({ filename: 'reset-password' })}
        alt="Recuperar senha"
        className="w-32 md:w-52 lg:w-72 mb-6"
      />
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-1">
        Redefina sua senha
      </h2>
      <p className="text-sm text-center max-w-sm">
        Digite uma nova senha para recuperar o acesso à sua conta.
      </p>
    </div>

    {/* Lado direito (formulário) */}
    <div className="flex-1 flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-4 md:mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Criar nova senha
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nova senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B3C87]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar senha</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirme sua nova senha"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B3C87]"
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
            {loading ? 'Salvando...' : 'Redefinir Senha'}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default ResetPasswordPage;
