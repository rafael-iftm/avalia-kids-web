import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Bem-vindo ao painel</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/questions" className="text-blue-600 hover:underline">Cadastrar Questões</Link>
          </li>
          <li>
            <Link to="/results" className="text-blue-600 hover:underline">Ver Resultados</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;