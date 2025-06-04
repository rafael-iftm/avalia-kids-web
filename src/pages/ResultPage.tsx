import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { getResults } from '../services/resultService';
import type { Result } from '../services/resultService';

function ResultPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getResults().then(setResults);
  }, []);

  const filtered = results.filter(r =>
    r.studentName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6">Resultados dos Alunos</h2>

          <input
            type="text"
            placeholder="Buscar por aluno..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />

          <table className="w-full text-sm border-collapse rounded overflow-hidden shadow-sm bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left px-4 py-2 border">Aluno</th>
                <th className="text-left px-4 py-2 border">Turma</th>
                <th className="text-left px-4 py-2 border">Nota</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((res, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{res.studentName}</td>
                  <td className="px-4 py-2 border">{res.classroom}</td>
                  <td className="px-4 py-2 border">{res.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default ResultPage;
