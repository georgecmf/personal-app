import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  getStudentByAccessCode,
  uploadStudentPhoto,
  updateStudentPhoto,
} from "../../services/students";

type Student = {
  id: number;
  name: string;
  goal: string;
  plan: string;
  height: number | null;
  weight: number | null;
  photo_url?: string;
};

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  async function handlePhoto(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files?.length || !student) return;

  const file = e.target.files[0];

  const url = await uploadStudentPhoto(
  file,
  student.id
);

console.log("URL DA FOTO:", url);

if (!url) {
  alert("Erro ao enviar a foto.");
  return;
}

const updated = await updateStudentPhoto(
  student.id,
  url
);

console.log("ALUNO ATUALIZADO:", updated);

if (!updated) {
  alert("A foto foi enviada, mas não foi possível salvar no aluno.");
  return;
}

setStudent({
  ...student,
  photo_url: url,
});
}

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Carregando...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 px-4">
        Não foi possível carregar os dados do aluno.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {student.photo_url ? (
              <img
                src={student.photo_url}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                👤
              </div>
            )}

            <label className="cursor-pointer text-sm text-green-400 hover:text-green-300">
              Alterar foto

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhoto}
              />
            </label>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Olá, {student.name}! 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Bem-vindo à sua área no FitPro.
            </p>
          </div>
        </div>

        <button
            onClick={() => {
            sessionStorage.removeItem("student_id");
            sessionStorage.removeItem("student_access_code");

            navigate("/login", { replace: true });
            }}
            className="cursor-pointer w-fit border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition"
        >
            Sair
        </button>

        </div>


        {/* Informações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-sm text-slate-400">
              Objetivo
            </p>

            <p className="text-lg font-bold mt-2">
              {student.goal || "-"}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-sm text-slate-400">
              Plano
            </p>

            <p className="text-lg font-bold mt-2">
              {student.plan || "-"}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-sm text-slate-400">
              Peso
            </p>

            <p className="text-2xl font-bold mt-2">
              {student.weight ?? "-"}
              {student.weight !== null && " kg"}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-sm text-slate-400">
              Altura
            </p>

            <p className="text-2xl font-bold mt-2">
              {student.height ?? "-"}
              {student.height !== null && " cm"}
            </p>
          </div>

        </div>

        {/* Acesso rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <button
            onClick={() =>
              navigate(`/student/${student.id}/workouts`)
            }
            className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-green-400 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center text-2xl">
                🏋️
              </div>

              <div>
                <h2 className="text-xl font-bold group-hover:text-green-400 transition">
                  Meus treinos
                </h2>

                <p className="text-slate-400 mt-1">
                  Veja seus treinos e exercícios.
                </p>
              </div>

            </div>
          </button>

          <button
            onClick={() =>
              navigate(`/student/${student.id}/assessments`)
            }
            className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-green-400 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center text-2xl">
                📊
              </div>

              <div>
                <h2 className="text-xl font-bold group-hover:text-green-400 transition">
                  Minha evolução
                </h2>

                <p className="text-slate-400 mt-1">
                  Acompanhe suas avaliações físicas.
                </p>
              </div>

            </div>
          </button>

        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
