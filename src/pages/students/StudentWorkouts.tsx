import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getWorkoutsForStudent } from "../../services/workouts";

type Workout = {
  id: number;
  name: string;
};

function StudentWorkouts() {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      const studentId = sessionStorage.getItem("student_id");

      if (!studentId) {
        navigate("/student-login", { replace: true });
        return;
      }

      const data = await getWorkoutsForStudent();

      setWorkouts(data || []);
      setLoading(false);
    }

    loadWorkouts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Carregando seus treinos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <div className="mb-8">
        <button
          onClick={() =>
            navigate(
              `/student/${sessionStorage.getItem("student_id")}`
            )
          }
          className="text-slate-400 hover:text-white transition mb-4"
        >
          ← Voltar
        </button>

        <h1 className="text-3xl font-bold">
          Meus treinos
        </h1>

        <p className="text-slate-400 mt-2">
          Aqui estão os treinos preparados pelo seu personal.
        </p>
      </div>

      <div className="space-y-4">

        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:border-green-400 transition"
          >
            <div>
              <h2 className="text-2xl font-bold">
                💪 {workout.name}
              </h2>

              <p className="text-slate-400 mt-1">
                Veja os exercícios deste treino.
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/student/${sessionStorage.getItem("student_id")}/workouts/${workout.id}`
                )
              }
              className="cursor-pointer px-5 py-3 rounded-xl bg-green-400 text-slate-950 font-bold hover:bg-green-300 transition"
            >
              Ver exercícios
            </button>
          </div>
        ))}

        {workouts.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400">
              Seu personal ainda não cadastrou nenhum treino.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentWorkouts;