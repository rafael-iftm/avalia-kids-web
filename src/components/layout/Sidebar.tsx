import { LayoutDashboard, FileEdit, BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
      location.pathname === path
        ? 'bg-white text-[#1B3C87] font-semibold'
        : 'hover:bg-blue-800'
    }`;

  return (
    <aside className="w-64 bg-[#1B3C87] text-white flex flex-col p-6">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/avaliakids.firebasestorage.app/o/assets%2Fimages%2Fpng%2Fdefault%2Flogo-avaliakids-horizontal%20(1).png?alt=media&token=489328f2-fad4-46a8-9250-13251b552a20"
        alt="Avalia Kids Logo"
        className="mb-8"
      />
      <nav className="flex flex-col gap-2 text-sm">
        <Link to="/" className={linkClass('/')}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/questions" className={linkClass('/questions')}>
          <FileEdit size={18} /> Questões
        </Link>
        <Link to="/results" className={linkClass('/results')}>
          <BarChart2 size={18} /> Resultados
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
