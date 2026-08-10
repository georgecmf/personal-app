import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getExercisesForStudent } from "../../services/exercises";

type Exercise = {
  id: number;
  name: string;
  series: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
};

function StudentWorkoutExercises() {
  const { studentId, workoutId } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExercises() {
      if (!studentId || !workoutId) return;

      const data = await getExercisesForStudent(
        Number(workoutId)
      );

      setExercises(data || []);
      setLoading(false);
    }

    loadExercises();
  }, [studentId, workoutId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center px-4">
        Carregando exercícios...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <div className="mb-8">

          <button
            onClick={() =>
              navigate(`/student/${studentId}/workouts`)
            }
            className="cursor-pointer text-slate-400 hover:text-white transition mb-5 flex items-center gap-2"
          >
            ← Voltar para meus treinos
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold">
            Exercícios
          </h1>

          <p className="text-slate-400 mt-2">
            Veja os exercícios deste treino.
          </p>

        </div>

        {/* Exercícios */}
        <div className="space-y-4">

          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-green-400/50 transition"
            >

              {/* Nome */}
              <div className="flex items-start gap-4 mb-6">

                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-400/10 text-green-400 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {exercise.name}
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Exercício {index + 1}
                  </p>
                </div>

              </div>

              {/* Informações */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Séries
                  </p>

                  <p className="text-lg font-bold mt-1">
                    {exercise.series}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Repetições
                  </p>

                  <p className="text-lg font-bold mt-1">
                    {exercise.reps}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Peso
                  </p>

                  <p className="text-lg font-bold mt-1">
                    {exercise.weight || "-"}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Descanso
                  </p>

                  <p className="text-lg font-bold mt-1">
                    {exercise.rest || "-"}
                  </p>
                </div>

              </div>

              {/* Observações */}
              {exercise.notes && (
                <div className="mt-5 pt-5 border-t border-slate-800">

                  <p className="text-sm font-semibold text-slate-300">
                    Observações
                  </p>

                  <p className="text-slate-400 mt-2 leading-relaxed">
                    {exercise.notes}
                  </p>

                </div>
              )}

            </div>
          ))}

          {exercises.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

              <div className="text-4xl mb-4">
                🏋️
              </div>

              <p className="text-slate-300 font-semibold">
                Nenhum exercício cadastrado
              </p>

              <p className="text-slate-500 text-sm mt-2">
                Seu personal ainda não adicionou exercícios a este treino.
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default StudentWorkoutExercises;
