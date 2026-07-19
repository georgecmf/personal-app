import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import NewExerciseModal from "../../components/exercises/NewExerciseModal";

import {
   getExercises,
    createExercise,
    updateExercise,
    deleteExercise,
} from "../../services/exercises";

type Exercise = {
  id: number;
  name: string;
  series: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
};

function WorkoutExercises() {
  const { workoutId } = useParams();

  const { user } = useAuth();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [editingExercise, setEditingExercise] =
  useState<Exercise | null>(null);

 async function loadExercises() {
  if (!user || !workoutId) return;

  const data = await getExercises(
    Number(workoutId),
    user.id
  );

  setExercises(data || []);
}

async function addExercise(exercise: {
  name: string;
  series: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
}) {
  if (!user || !workoutId) return;

  if (editingExercise) {
    await updateExercise(editingExercise.id, {
      ...exercise,
      workout_id: Number(workoutId),
      user_id: user.id,
    });
  } else {
    await createExercise({
      ...exercise,
      workout_id: Number(workoutId),
      user_id: user.id,
    });
  }

  await loadExercises();

  setEditingExercise(null);
  setOpenModal(false);
}

async function handleDeleteExercise(id: number) {
  const confirmed = window.confirm(
    "Deseja realmente excluir este exercício?"
  );

  if (!confirmed) return;

  await deleteExercise(id);

  await loadExercises();
}

useEffect(() => {
  loadExercises();
}, [user, workoutId]);

function handleEditExercise(exercise: Exercise) {
  setEditingExercise(exercise);
  setOpenModal(true);
}

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">
            Exercícios
          </h1>

          <p className="text-slate-400">
            Monte o treino do aluno.
          </p>
        </div>

        <button
            onClick={() => {
                setEditingExercise(null);
                setOpenModal(true);
              }}
            >
            <Plus size={20} />
            Novo exercício
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">
                  {exercise.name}
                </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditExercise(exercise)}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDeleteExercise(exercise.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300">
              <p>
                <strong>Séries:</strong>{" "}
                {exercise.series}
              </p>

              <p>
                <strong>Reps:</strong>{" "}
                {exercise.reps}
              </p>

              <p>
                <strong>Peso:</strong>{" "}
                {exercise.weight}
              </p>

              <p>
                <strong>Descanso:</strong>{" "}
                {exercise.rest}
              </p>
            </div>

            {exercise.notes && (
              <p className="mt-4 text-slate-400">
                {exercise.notes}
              </p>
            )}
          </div>
        ))}

        {exercises.length === 0 && (
          <p className="text-slate-500">
            Nenhum exercício cadastrado.
          </p>
        )}
      </div>

      <NewExerciseModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditingExercise(null);
          }}
          onSave={addExercise}
          editingExercise={editingExercise}
        />
    </div>
  );
}

export default WorkoutExercises;