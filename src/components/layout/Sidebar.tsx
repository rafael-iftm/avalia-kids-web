import { LayoutDashboard, FileEdit, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const linkClass = 'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-600 transition';

  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
      <h2 className="text-xl font-bold mb-6">Avalia Kids</h2>
      <nav className="flex flex-col gap-2 text-sm">
        <Link to="/" className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/questions" className={linkClass}>
          <FileEdit size={18} /> Cadastrar Questões
        </Link>
        <Link to="/results" className={linkClass}>
          <BarChart2 size={18} /> Resultados
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
