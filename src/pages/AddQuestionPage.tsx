import { useEffect, useState } from 'react';
import { createQuestion, getQuestionsByClassLevel } from '../services/questionService';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { Image, BookText, ListOrdered } from 'lucide-react';

interface Question {
  id?: string;
  text: string;
  options: string[];
  correctOption: string;
  imageUrl?: string;
  placeholderUrl?: string;
  classLevel: string;
}

function AddQuestionPage() {
  const [text, setText] = useState('');
  const [classLevel, setClassLevel] = useState('1º Ano');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const question: Question = {
      text,
      classLevel,
      options,
      correctOption: options[correctIndex],
      imageUrl: '', // futura URL do Firebase
      placeholderUrl: ''
    };

    await createQuestion(question);
    alert('Questão cadastrada com sucesso!');
    setText('');
    setOptions(['', '', '', '']);
    setCorrectIndex(0);
    setImageFile(null);
    fetchQuestions();
  };

  const fetchQuestions = async () => {
    const res = await getQuestionsByClassLevel(classLevel);
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [classLevel]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="px-10 py-8 space-y-10 overflow-y-auto">
          <section className="bg-white p-6 rounded-xl shadow max-w-4xl">
            <h2 className="text-2xl font-semibold mb-6">Cadastro de Questões</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enunciado</label>
                <div className="flex items-center gap-2">
                  <BookText size={18} className="text-gray-500" />
                  <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Digite o enunciado da questão"
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Série</label>
                  <select
                    value={classLevel}
                    onChange={e => setClassLevel(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option>1º Ano</option>
                    <option>2º Ano</option>
                    <option>3º Ano</option>
                    <option>4º Ano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagem (opcional)</label>
                  <div className="flex items-center gap-2">
                    <Image size={18} className="text-gray-500" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setImageFile(e.target.files?.[0] || null)}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alternativas</label>
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="correct"
                        checked={correctIndex === idx}
                        onChange={() => setCorrectIndex(idx)}
                      />
                      <input
                        type="text"
                        placeholder={`Alternativa ${idx + 1}`}
                        value={opt}
                        onChange={e => {
                          const updated = [...options];
                          updated[idx] = e.target.value;
                          setOptions(updated);
                        }}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Salvar Questão
              </button>
            </form>
          </section>

          <section className="max-w-4xl">
            <h3 className="text-lg font-semibold mb-3">Questões cadastradas ({questions.length})</h3>
            <ul className="space-y-3">
              {questions.map((q, i) => (
                <li key={q.id || i} className="bg-white p-4 rounded shadow text-sm">
                  <div className="font-medium mb-1">{q.text}</div>
                  {q.imageUrl && (
                    <img
                      src={q.imageUrl}
                      alt="Imagem da questão"
                      className="w-32 mb-2 rounded border"
                    />
                  )}
                  <ul className="list-disc ml-5 text-gray-700">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={opt === q.correctOption ? 'font-bold text-green-600' : ''}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AddQuestionPage;
