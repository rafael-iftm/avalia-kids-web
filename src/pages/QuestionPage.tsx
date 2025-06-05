import { useEffect, useState } from "react";
import { getQuestionsByClassLevel } from "../services/questionService";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import PageTitle from "../components/text/PageTitle";
import { CirclePlus, FileEdit } from "lucide-react";



function QuestionPage() {
  const classLevel = [
    { turma: "1º Ano" },
    { turma: "2º Ano" },
    { turma: "3º Ano" },
    { turma: "4º Ano" },
    { turma: "5º Ano" },
  ];

  const [questionsCount, setQuestionsCount] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchQuestionsCount = async () => {
      const counts: Record<string, number> = {};

      for (const item of classLevel) {
        const response = await getQuestionsByClassLevel(item.turma);
        counts[item.turma] = response.data.length; 
      }

      setQuestionsCount(counts);
    };

    fetchQuestionsCount();
  }, []);


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        <Header />

        <div className="m-10 ">
          <PageTitle title="Questões Cadastradas" />

          <div className="bg-white p-6 rounded-lg shadow mt-10 ">
            <table className="w-full table-auto ">
              <thead >
                <tr className="text-left text-gray-400 ">
                  <th className="w-3/12"></th>
                  <th className="w-5/12">Turma</th>
                  <th className="w-4/12">Questões</th>
                  <th className="w-6/12"></th>
                </tr>
              </thead>
              <tbody>
                {classLevel.map((item) => (
                  <tr key={item.turma} className="border-b last:border-b-0">
                    <td className="py-4">
                      <FileEdit className="w-6 h-6 text-gray-700" />
                    </td>
                    <td className="py-4 text-gray-700">{item.turma}</td>
                    <td className="py-4 font-medium text-gray-900">
                       {questionsCount[item.turma] !== undefined
                        ? questionsCount[item.turma]
                        : "Carregando..."}
                    </td>
                    <td className="py-4">
                      <Link
                        to="/questions/add"
                        className=" m-5 p-6 w-[250px] h-[34px]  bg-[#1B3C87] text-white rounded-lg flex items-center justify-center "
                      >
                        <CirclePlus className="m-2" />
                        Adicionar Questão
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
