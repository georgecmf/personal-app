import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  goal: string;
  plan: string;
  phone: string;
  email: string;
  birth_date: string;
  gender: string;
  height: string;
  weight: string;
  notes: string;
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
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;

    if (editingStudent) {
     setName(editingStudent.name);
      setGoal(editingStudent.goal);
      setPlan(editingStudent.plan);

      setPhone(editingStudent.phone);
      setEmail(editingStudent.email);
      setBirthDate(editingStudent.birth_date);
      setGender(editingStudent.gender);
      setHeight(editingStudent.height);
      setWeight(editingStudent.weight);
      setNotes(editingStudent.notes);
    } else {
      setName("");
      setGoal("");
      setPlan("Basic");
      setPhone("");
      setEmail("");
      setBirthDate("");
      setGender("");
      setHeight("");
      setWeight("");
      setNotes("");
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
      phone,
      email,
      birth_date: birthDate,
      gender,
      height,
      weight,
      notes,
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
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          >
            <option value="">Sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>

          <input
            type="number"
            placeholder="Altura (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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

          <textarea
            placeholder="Observações"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
            rows={4}
          />

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