import { useState } from "react";

type Student = {
  id: number;
  name: string;
  goal: string;
  plan: string;
};

type Props = {
  open: boolean;
  onClose: () => void;

  onAddStudent: (student: Student) => void;

  editingStudent: Student | null;
};

function NewStudentModal({
  open,
  onClose,
  onAddStudent,
  editingStudent,
}: Props) {
  const [name, setName] = useState(
    editingStudent?.name || ""
  );

  const [goal, setGoal] = useState(
    editingStudent?.goal || ""
  );

  const [plan, setPlan] = useState(
    editingStudent?.plan || "Basic"
  );

  if (!open) return null;

  function handleSaveStudent() {
    if (!name || !goal) return;

    const student = {
      id: editingStudent
        ? editingStudent.id
        : Date.now(),

      name,
      goal,
      plan,
    };

    onAddStudent(student);

    setName("");
    setGoal("");
    setPlan("Basic");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            {editingStudent
              ? "Editar aluno"
              : "Novo aluno"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do aluno"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Objetivo"
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <select
            value={plan}
            onChange={(e) =>
              setPlan(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          >
            <option>Basic</option>
            <option>Premium</option>
          </select>

          <button
            onClick={handleSaveStudent}
            className="bg-green-400 text-slate-950 font-bold p-4 rounded-xl hover:opacity-90 transition"
          >
            {editingStudent
              ? "Salvar alterações"
              : "Salvar aluno"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewStudentModal;