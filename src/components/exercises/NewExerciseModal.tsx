import { useEffect, useState } from "react";

type Exercise = {
  id: number;
  name: string;
  series: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
};

type Props = {
  open: boolean;
  onClose: () => void;

  onSave: (exercise: {
  name: string;
  series: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
}) => Promise<void>;

  editingExercise: Exercise | null;
};

function NewExerciseModal({
  open,
  onClose,
  onSave,
  editingExercise,
}: Props) {
  const [name, setName] = useState("");
  const [series, setSeries] = useState(3);
  const [reps, setReps] = useState("10");
  const [weight, setWeight] = useState("");
  const [rest, setRest] = useState("60s");
  const [notes, setNotes] = useState("");

  useEffect(() => {
  if (!open) return;

  if (editingExercise) {
    setName(editingExercise.name);
    setSeries(editingExercise.series);
    setReps(editingExercise.reps);
    setWeight(editingExercise.weight);
    setRest(editingExercise.rest);
    setNotes(editingExercise.notes);
  } else {
    setName("");
    setSeries(3);
    setReps("10");
    setWeight("");
    setRest("60s");
    setNotes("");
  }
}, [open, editingExercise]);

if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-lg border border-slate-800">

        <h2 className="text-2xl font-bold mb-6">
          {editingExercise
            ? "Editar exercício"
            : "Novo exercício"}
        </h2>

        <div className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Nome do exercício"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Séries"
            value={series}
            onChange={(e) =>
              setSeries(Number(e.target.value))
            }
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Repetições"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Peso"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Descanso"
            value={rest}
            onChange={(e) => setRest(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Observações"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700"
          >
            Cancelar
          </button>

          <button
            onClick={async () => {
              await onSave({
                name,
                series,
                reps,
                weight,
                rest,
                notes,
              });
            }}
            className="px-5 py-2 rounded-lg bg-green-400 text-slate-950 font-bold"
          >
            Salvar
          </button>

        </div>

      </div>
    </div>
  );
}

export default NewExerciseModal;