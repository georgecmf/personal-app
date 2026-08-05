import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getStudents } from "../../services/students";

type Student = {
  id: number;
  name: string;
  goal: string;
};

export default function SelectStudentForAssessment() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function loadStudents() {
      if (!user) return;

      const data = await getStudents(user.id);

      setStudents(data || []);
    }

    loadStudents();
  }, [user]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">
        Selecione um aluno
      </h1>

      <p className="text-slate-400 mb-8">
        Escolha o aluno para criar uma avaliação física.
      </p>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() =>
              navigate(`/students/${student.id}/assessments`)
            }
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 cursor-pointer hover:border-blue-400 transition"
          >
            <h2 className="text-xl font-bold">
              {student.name}
            </h2>

            <p className="text-slate-400">
              {student.goal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}