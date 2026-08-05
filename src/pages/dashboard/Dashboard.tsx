import { useEffect, useState } from "react";
import { useNavigate,} from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Users,
  Dumbbell,
  Activity,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { getStudents } from "../../services/students";
import { getAllWorkouts } from "../../services/workouts";
import { getAllExercises } from "../../services/exercises";

function Dashboard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [students, setStudents] = useState(0);
  const [workouts, setWorkouts] = useState(0);
  const [exercises, setExercises] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;

      const studentsData = await getStudents(user.id);
      const workoutsData = await getAllWorkouts(user.id);
      const exercisesData = await getAllExercises(user.id);

      setStudents(studentsData.length);
      setWorkouts(workoutsData.length);
      setExercises(exercisesData.length);
    }

    loadDashboard();
  }, [user]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-2">
          Painel
        </h1>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Bem-vindo de volta!
        </h2>

        <p className="text-slate-400">
          Gerencie seus alunos, avaliações e treinos em um único lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/students")}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-400 hover:scale-[1.02] hover:shadow-xl cursor-pointer transition-all duration-300 active:scale-95"
        >
          <h2 className="text-slate-400 text-sm">
            Total de alunos
          </h2>

          <div className="flex items-center justify-between mt-4">
            <Users
              size={40}
              className="text-green-400"
            />

            <p className="text-5xl font-bold text-green-400">
              {students}
            </p>
          </div>

          <p className="text-slate-500 text-sm mt-3">
            Cadastrados no sistema
          </p>
        </div>

        <div
          onClick={() => navigate("//students/select/workout")}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-400 hover:scale-[1.02] hover:shadow-xl cursor-pointer transition-all duration-300 active:scale-95"
        >
          <h2 className="text-slate-400 text-sm">
            Total de treinos
          </h2>

          <div className="flex items-center justify-between mt-4">
            <Dumbbell
              size={40}
              className="text-green-400"
            />

            <p className="text-5xl font-bold text-green-400">
              {workouts}
            </p>
          </div>

          <p className="text-slate-500 text-sm mt-3">
            Treinos criados
          </p>
        </div>

        <div
          onClick={() => navigate("/students")}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-400 hover:scale-[1.02] hover:shadow-xl cursor-pointer transition-all duration-300 active:scale-95"
        >
          <h2 className="text-slate-400 text-sm">
            Total de exercícios
          </h2>

          <div className="flex items-center justify-between mt-4">
            <Activity
              size={40}
              className="text-green-400"
            />

            <p className="text-5xl font-bold text-green-400">
              {exercises}
            </p>
          </div>

          <p className="text-slate-500 text-sm mt-3">
            Exercícios cadastrados
          </p>
        </div>
      </div>
      
      <div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">
    Ações rápidas
  </h2>

  <div className="grid md:grid-cols-3 gap-5">

    {/* Novo aluno */}
    <button
      onClick={() => navigate("/students?new=true")}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-400 transition-all text-left"
    >
      <Plus
        className="text-green-400 mb-4"
        size={36}
      />

      <h3 className="text-xl font-bold">
        Novo aluno
      </h3>

      <p className="text-slate-400 mt-2">
        Cadastre um novo aluno.
      </p>
    </button>

    {/* Nova avaliação */}
   {/* Nova avaliação */}
      <button
        onClick={() => navigate("/students/select/assessment")}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-400 transition-all text-left"
      >
      <Activity
        className="text-green-400 mb-4"
        size={36}
      />

      <h3 className="text-xl font-bold">
        Nova avaliação
      </h3>

      <p className="text-slate-400 mt-2">
        Registre uma avaliação física.
      </p>
    </button>

    {/* Novo treino */}
    <button
      onClick={() => navigate("/students/select/workout")}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-400 transition-all text-left"
    >
      <Dumbbell
        className="text-green-400 mb-4"
        size={36}
      />

      <h3 className="text-xl font-bold">
        Novo treino
      </h3>

      <p className="text-slate-400 mt-2">
        Crie um treino para um aluno.
      </p>
    </button>

  </div>
</div>
</div>
  );
}

export default Dashboard;