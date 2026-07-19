import { useEffect, useState } from "react";
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
          Dashboard
        </h1>

        <p className="text-slate-400">
          Gerencie seus alunos, treinos e exercícios em um único lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-400 hover:scale-[1.02] transition-all duration-300">
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

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-400 hover:scale-[1.02] transition-all duration-300">
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

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-400 hover:scale-[1.02] transition-all duration-300">
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
    </div>
  );
}

export default Dashboard;