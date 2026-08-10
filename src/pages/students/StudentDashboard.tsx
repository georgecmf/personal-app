import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStudentByAccessCode } from "../../services/students";

type Student = {
  id: number;
  name: string;
  goal: string;
  plan: string;
  height: number | null;
  weight: number | null;
};

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      const accessCode =
        sessionStorage.getItem("student_access_code");

      if (!accessCode) {
        navigate("/student-login", { replace: true });
        return;
      }

      const data =
        await getStudentByAccessCode(accessCode);

      if (!data) {
        console.error("Aluno não encontrado");
        setLoading(false);
        return;
      }

      setStudent(data);
      setLoading(false);
    }

    loadStudent();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">
          Carregando...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">
          Não foi possível carregar os dados do aluno.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Olá, {student.name}! 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Bem-vindo à sua área no FitPro.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">
            Objetivo
          </p>

          <p className="text-lg font-bold mt-2">
            {student.goal || "-"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">
            Plano
          </p>

          <p className="text-lg font-bold mt-2">
            {student.plan || "-"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">
            Peso
          </p>

          <p className="text-2xl font-bold mt-2">
            {student.weight ?? "-"}
            {student.weight !== null && " kg"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">
            Altura
          </p>

          <p className="text-2xl font-bold mt-2">
            {student.height ?? "-"}
            {student.height !== null && " cm"}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <button
          onClick={() =>
            navigate(`/student/${student.id}/workouts`)
          }
          className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-green-400 transition"
        >
          <h2 className="text-xl font-bold">
            🏋️ Meus treinos
          </h2>

          <p className="text-slate-400 mt-2">
            Veja seus treinos e exercícios.
          </p>
        </button>

        <button
          onClick={() =>
            navigate(`/student/${student.id}/assessments`)
          }
          className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-green-400 transition"
        >
          <h2 className="text-xl font-bold">
            📊 Minha evolução
          </h2>

          <p className="text-slate-400 mt-2">
            Acompanhe suas avaliações físicas.
          </p>
        </button>

      </div>

    </div>
  );
}

export default StudentDashboard;

