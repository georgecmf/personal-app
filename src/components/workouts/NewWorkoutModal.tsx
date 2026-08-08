import { useEffect, useState } from "react";

type Workout = {
  id: number;
  name: string;
};

type Props = {
  open: boolean;
  onClose: () => void;

  onSave: (name: string) => Promise<void>;

  editingWorkout: Workout | null;
};

function NewWorkoutModal({
  open,
  onClose,
  onSave,
  editingWorkout,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!open) return;

    if (editingWorkout) {
      setName(editingWorkout.name);
    } else {
      setName("");
    }
  }, [open, editingWorkout]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-slate-800">

        <h2 className="text-2xl font-bold mb-6">
          {editingWorkout
            ? "Editar treino"
            : "Novo treino"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Treino A"
          className="w-full bg-slate-800 rounded-lg p-3 mb-6 outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          >
            Cancelar
          </button>

          <button
            onClick={async () => {
              await onSave(name);
            }}
            className="cursor-pointer px-5 py-2 rounded-lg bg-green-500 font-bold text-slate-900 hover:opacity-90 transition"
          >
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}

export default NewWorkoutModal;