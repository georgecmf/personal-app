import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

function NewWorkoutModal({
  open,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Novo treino
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Ex.: Treino A"
          className="w-full bg-slate-800 rounded-lg p-3 mb-6 outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(name)}
            className="px-5 py-2 rounded-lg bg-green-500 font-bold text-slate-900"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewWorkoutModal;