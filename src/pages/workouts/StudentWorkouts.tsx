import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import {
  getWorkouts,
  createWorkout,
} from "../../services/workouts";

import NewWorkoutModal from "../../components/workouts/NewWorkoutModal";

type Workout = {
  id: number;
  name: string;
};

function StudentWorkouts() {
  const { studentId } = useParams();

  const { user } = useAuth();

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [openModal, setOpenModal] = useState(false);

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
  }, [user]);

  async function addWorkout(name: string) {
  if (!user || !studentId) return;

  await createWorkout({
    name,
    student_id: Number(studentId),
    user_id: user.id,
  });

  await loadWorkouts();

  setOpenModal(false);
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
            onClick={() => setOpenModal(true)}
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
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <h2 className="text-xl font-bold">
              {workout.name}
            </h2>
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
        onClose={() => setOpenModal(false)}
        onSave={addWorkout}
        />
    </div>
  );
}

export default StudentWorkouts;