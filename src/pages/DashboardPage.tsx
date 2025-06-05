import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import PageTitle from "../components/text/PageTitle";


function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className=" m-10">
          <PageTitle title="Bem-vindo ao painel" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-10">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Cadastrar Questões</h3>
              <p className="text-sm text-gray-600 mb-2">Adicione novas questões ao banco de dados.</p>
              <Link to="/questions" className="text-blue-600 hover:underline text-sm">Ir para cadastro</Link>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Resultados dos Alunos</h3>
              <p className="text-sm text-gray-600 mb-2">Veja os resultados das avaliações aplicadas.</p>
              <Link to="/results" className="text-blue-600 hover:underline text-sm">Ver resultados</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;