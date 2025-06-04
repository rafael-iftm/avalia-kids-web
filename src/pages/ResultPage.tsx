import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { getResults } from '../services/resultService';
import type { Result } from '../services/resultService';

function ResultPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getResults().then(setResults);
  }, []);

  const filtered = results.filter(r => r.studentName.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <Header />
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Resultados</h2>
        <input
          type="text"
          placeholder="Buscar por aluno..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Aluno</th>
              <th className="border px-4 py-2">Turma</th>
              <th className="border px-4 py-2">Nota</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((res, idx) => (
              <tr key={idx} className="even:bg-gray-100">
                <td className="border px-4 py-2">{res.studentName}</td>
                <td className="border px-4 py-2">{res.classroom}</td>
                <td className="border px-4 py-2">{res.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;