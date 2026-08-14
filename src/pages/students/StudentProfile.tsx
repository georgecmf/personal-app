import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import {
  getStudentById,
  uploadStudentPhoto,
  updateStudentPhoto,
} from "../../services/students";

import type { Student } from "../../services/students";


function StudentProfile() {
  const { studentId } = useParams();

  const [student, setStudent] = useState<Student | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function loadStudent() {
      if (!user || !studentId) return;

      const data = await getStudentById(
        Number(studentId),
        user.id
      );

      setStudent(data);
    }

    loadStudent();
  }, [studentId, user]);

   async function handlePhoto(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files?.length || !student || !user) return;

  const file = e.target.files[0];

  const url = await uploadStudentPhoto(
    file,
    student.id!,
    user!.id
  );

  console.log("URL DA FOTO:", url);

  if (!url) {
    alert("Erro ao enviar a foto.");
    return;
  }

  const updated = await updateStudentPhoto(
    student.id!,
    url
  );

  console.log("ALUNO ATUALIZADO:", updated);

  if (!updated) {
    alert(
      "A foto foi enviada, mas não foi possível salvar no aluno."
    );
    return;
  }

  setStudent({
    ...student,
    photo_url: url,
  });
}
  if (!student) {

    return (
      <p className="text-slate-400">
        Carregando aluno...
      </p>
    );
  }

    function formatDate(date: string) {
      if (!date) return "-";

      const [year, month, day] = date.split("-");

      return `${day}/${month}/${year}`;
  }

    return (
    <div>

      <h1 className="text-3xl md:text-5xlfont-bold mb-2">
        {student.name}
      </h1>

      <p className="text-slate-400 mb-10">
        Perfil completo do aluno
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">

      <div className="flex items-center gap-6">

      <div>
        {student.photo_url ? (
          <img
            src={student.photo_url}
            alt={student.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
            Sem foto
          </div>
        )}
      </div>


      <div>
        <label
          className="cursor-pointer bg-green-400 text-slate-950 px-5 py-3 rounded-xl font-bold"
        >
          Alterar foto

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
        </label>
      </div>

    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-slate-500">Telefone</p>
            <p>{student.phone || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500">Email</p>
            <p>{student.email || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500">
              Data de nascimento
            </p>
            <p>{formatDate(student.birth_date)}</p>
          </div>

          <div>
            <p className="text-slate-500">Sexo</p>
            <p>{student.gender || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500">Altura</p>
            <p>{student.height || "-"} cm</p>
          </div>

          <div>
            <p className="text-slate-500">Peso</p>
            <p>{student.weight || "-"} kg</p>
          </div>

          <div>
            <p className="text-slate-500">Objetivo</p>
            <p>{student.goal}</p>
          </div>

          <div>
            <p className="text-slate-500">Atendimento</p>
            <p>{student.attendance_type || "-"}</p>
          </div>

        </div>

        <div>
          <p className="text-slate-500 mb-2">
            Observações
          </p>

          <div className="bg-slate-800 rounded-xl p-4 min-h-[100px]">
            {student.notes || "Nenhuma observação."}
          </div>
        </div>

        <div className="flex gap-4">

          <button
            onClick={() =>
              navigate(`/students/${student.id}/workouts`)
            }
            className="cursor-pointer bg-green-400 text-slate-950 px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
          >
            🏋️ Treinos do aluno
          </button>

          <button
            onClick={() =>
              navigate(`/students/${student.id}/assessments`)
            }
            className="cursor-pointer bg-green-400 text-slate-950 px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
          >
            📋 Avaliações físicas
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;