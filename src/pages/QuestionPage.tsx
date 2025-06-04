import { useState } from 'react';
import Header from '../components/layout/Header';
import { createQuestion } from '../services/questionService';

function QuestionPage() {
  const [question, setQuestion] = useState('');
  const [grade, setGrade] = useState('1');
  const [subject, setSubject] = useState('matematica');
  const [alternatives, setAlternatives] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuestion({ question, grade: parseInt(grade), subject, alternatives, correctIndex });
    alert('Questão cadastrada com sucesso!');
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Nova Questão</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Enunciado" value={question} onChange={e => setQuestion(e.target.value)} className="w-full border p-2 rounded" required />
          <div className="flex space-x-4">
            <select value={grade} onChange={e => setGrade(e.target.value)} className="border p-2 rounded">
              <option value="1">1º ano</option>
              <option value="2">2º ano</option>
              <option value="3">3º ano</option>
              <option value="4">4º ano</option>
            </select>
            <select value={subject} onChange={e => setSubject(e.target.value)} className="border p-2 rounded">
              <option value="matematica">Matemática</option>
              <option value="portugues">Português</option>
            </select>
          </div>
          {alternatives.map((alt, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input type="radio" name="correct" checked={correctIndex === idx} onChange={() => setCorrectIndex(idx)} />
              <input
                type="text"
                value={alt}
                onChange={e => {
                  const newAlts = [...alternatives];
                  newAlts[idx] = e.target.value;
                  setAlternatives(newAlts);
                }}
                placeholder={`Alternativa ${idx + 1}`}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default QuestionPage;