import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [canCloseModal, setCanCloseModal] = useState(false);
  const termsContentRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const isFormValid = !!name.trim() && !!email.trim() && !!password.trim() && checkbox;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("[Cadastro] Enviando dados:", { name, email });

    try {
      await registerUser(name, email, password, "TEACHER");
      console.log("[Cadastro] Sucesso. Redirecionando para login...");
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (error: any) {
      console.error("[Cadastro] Erro:", error);

      if (error.response?.status === 409) {
        alert("Este e-mail já está registrado. Tente usar outro.");
      } else {
        alert("Erro ao registrar. Verifique os dados e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Lado esquerdo com imagem e texto */}
      <div className="w-1/2 bg-[#1B3C87] text-white flex flex-col justify-center items-center p-10">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/avaliakids.firebasestorage.app/o/assets%2Fimages%2Fpng%2Fdefault%2Fregister.png?alt=media&token=c9f6b30d-b7e1-4cbf-9bb6-8d8dd67c12b5"
          alt="Cadastro de professores"
          className="w-72 mb-8"
        />
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Torne-se um professor conectado
        </h2>
        <p className="text-center max-w-sm">
          Cadastre-se e leve o conhecimento para onde ele for necessário.
        </p>
      </div>

      {/* Lado direito com formulário */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Cadastro de Professor
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B3C87]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B3C87]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B3C87]"
                required
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                id="acceptTerm"
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
                required
                disabled={!canCloseModal}
              />
              <label
                htmlFor="acceptTerm"
                onClick={() => {
                  setShowTermsModal(true);
                  setCanCloseModal(false);
                }}
                className="text-[#1B3C87] underline cursor-pointer"
                
              >
                Aceito os{" "}
                  termos e condições de uso
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-2 px-4 rounded text-white font-semibold transition ${
                loading
                  ? "bg-[#1B3C87]/50 cursor-wait"
                  : isFormValid
                  ? "bg-[#1B3C87] hover:bg-[#152e6c]"
                  : "bg-[#1B3C87]/30 cursor-not-allowed"
              }`}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-[#1B3C87] hover:underline font-medium"
              >
                Faça login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal de Termos */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">
              Termos e Condições de Uso
            </h2>
            <div
              ref={termsContentRef}
              onScroll={() => {
                const el = termsContentRef.current;
                if (
                  el &&
                  el.scrollTop + el.clientHeight >= el.scrollHeight - 10
                ) {
                  setCanCloseModal(true);
                }
              }}
              className="text-sm text-gray-700 overflow-y-auto max-h-60 space-y-2"
            >
              <p>
                Ao se cadastrar, você concorda com o uso responsável da
                plataforma Avalia Kids. Professores devem seguir as diretrizes
                de conduta, respeitando alunos e colegas.
              </p>
              <p>
                O uso indevido, compartilhamento não autorizado de conteúdo ou
                desrespeito às normas poderá acarretar no bloqueio da conta.
              </p>
              <p>
                Os dados fornecidos serão armazenados com segurança e utilizados
                apenas para fins educacionais e administrativos.
              </p>
              <p>
                Este aplicativo (APP) foi desenvolvido como parte de um projeto
                de extensão, visando oferecer uma ferramenta educativa para
                avaliação diagnóstica de crianças. O APP e seus conteúdos
                (textos, fotografias, gráficos, imagens, tecnologia, software,
                links, conteúdos, design gráfico, código-fonte etc.), assim como
                as marcas e demais sinais distintivos, são de propriedade dos
                desenvolvedores ou de terceiros. O uso do APP não concede ao
                usuário nenhum direito sobre esses elementos.O usuário deve
                abster-se de:
              </p>
              <p>
                a. Reproduzir, copiar, distribuir, disponibilizar a terceiros,
                comunicar publicamente, transformar ou modificar o APP ou seus
                conteúdos, salvo nos casos previstos por lei ou expressamente
                autorizados pelos desenvolvedores ou pelos titulares dos
                direitos.
              </p>

              <p>
                b. Reproduzir ou copiar o APP ou seus conteúdos para uso
                privado, bem como comunicá-los publicamente ou disponibilizá-los
                a terceiros caso isso implique em sua reprodução.
              </p>

              <p>
                c. Extrair ou reutilizar total ou parcialmente conteúdos
                essenciais do APP.
              </p>
            </div>
            <button
              className={`mt-4 w-full py-2 rounded font-semibold ${
                canCloseModal
                  ? "bg-[#1B3C87] text-white hover:bg-[#152e6c]"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!canCloseModal}
              onClick={() => setShowTermsModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
