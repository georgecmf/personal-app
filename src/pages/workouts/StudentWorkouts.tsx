import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../../services/workouts";

import NewWorkoutModal from "../../components/workouts/NewWorkoutModal";

type Workout = {
  id: number;
  name: string;
};

function StudentWorkouts() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [editingWorkout, setEditingWorkout] =
    useState<Workout | null>(null);

  async function loadWorkouts() {
    if (!user || !studentId) return;

    const data = await getWorkouts(
      Number(studentId),
      user.id
    );

    setWorkouts(data || []);
  }

  useEffect(() => {
    loadWorkouts();
  }, [user, studentId]);

  async function saveWorkout(name: string) {
    if (!user || !studentId) return;

    if (editingWorkout) {
      await updateWorkout(editingWorkout.id, {
        name,
        student_id: Number(studentId),
        user_id: user.id,
      });
    } else {
      await createWorkout({
        name,
        student_id: Number(studentId),
        user_id: user.id,
      });
    }

    await loadWorkouts();

    setEditingWorkout(null);
    setOpenModal(false);
  }

  async function handleDeleteWorkout(id: number) {
    const confirmDelete = window.confirm(
      "Deseja excluir este treino?"
    );

    if (!confirmDelete) return;

    await deleteWorkout(id);
    await loadWorkouts();
  }

  function handleEditWorkout(workout: Workout) {
    setEditingWorkout(workout);
    setOpenModal(true);
  }

  return (
    <div>
      <h1 className="text-5xl font-bold mb-2">
        Treinos
      </h1>

      <p className="text-slate-400 mb-8">
        Aluno ID: {studentId}
      </p>

      <div className="mb-8">
        <button
          onClick={() => {
            setEditingWorkout(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 bg-green-400 text-slate-950 font-bold px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          <Plus size={20} />
          Novo treino
        </button>
      </div>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between hover:border-green-400 transition"
          >
            <div>
              <h2 className="text-2xl font-bold">
                💪 {workout.name}
              </h2>

              <p className="text-slate-400 mt-1">
                Clique em Exercícios para montar o treino.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEditWorkout(workout)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              >
                Editar
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/students/${studentId}/workouts/${workout.id}`
                  )
                }
                className="px-4 py-2 rounded-lg bg-green-500 text-slate-950 font-bold hover:opacity-90 transition"
              >
                Exercícios
              </button>

              <button
                onClick={() =>
                  handleDeleteWorkout(workout.id)
                }
                className="px-4 py-2 rounded-lg bg-red-500 hover:opacity-90 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

        {workouts.length === 0 && (
          <p className="text-slate-500">
            Nenhum treino cadastrado.
          </p>
        )}
      </div>

      <NewWorkoutModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingWorkout(null);
        }}
        onSave={saveWorkout}
        editingWorkout={editingWorkout}
      />
    </div>
  );
}

export default StudentWorkouts;