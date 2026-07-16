import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  goal: string;
  plan: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => Promise<void>;
  editingStudent: Student | null;
};

function NewStudentModal({
  open,
  onClose,
  onAddStudent,
  editingStudent,
}: Props) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("Basic");

  useEffect(() => {
    if (!open) return;

    if (editingStudent) {
      setName(editingStudent.name);
      setGoal(editingStudent.goal);
      setPlan(editingStudent.plan);
    } else {
      setName("");
      setGoal("");
      setPlan("Basic");
    }
  }, [open, editingStudent]);

  async function handleSaveStudent() {
    if (!name.trim() || !goal.trim()) {
      alert("Preencha o nome e o objetivo.");
      return;
    }

    await onAddStudent({
      id: editingStudent?.id ?? 0,
      name,
      goal,
      plan,
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            {editingStudent ? "Editar aluno" : "Novo aluno"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do aluno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Objetivo"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>

          <button
            onClick={handleSaveStudent}
            className="bg-green-400 text-slate-950 font-bold p-4 rounded-xl hover:opacity-90 transition"
          >
            {editingStudent ? "Salvar alterações" : "Salvar aluno"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewStudentModal;