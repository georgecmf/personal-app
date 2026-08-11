import { useCallback, useEffect, useState } from "react";
import { ClipboardList, Plus, Trash2 } from "lucide-react";
import { 
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import NewStudentModal from "../../components/students/NewStudentModal";
import { useAuth } from "../../hooks/useAuth";
import {
  createStudent,
  deleteStudent as deleteStudentService,
  getStudents,
  updateStudent,
  createStudentAccess,
} from "../../services/students";

import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

type Student = {
  id: number;
  name: string;
  goal: string;
  attendance_type: string;
  phone: string;
  email: string;
  birth_date: string;
  gender: string;
  height: string;
  weight: string;
  notes: string;
};

function Students() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>([]);

  const [search, setSearch] = useState("");

  const [accessCode, setAccessCode] = useState<string | null>(null);

  const loadStudents = useCallback(async () => {
  if (!user) return;

  const data = await getStudents(user.id);


  setStudents(data || []);
}, [user]);

  useEffect(() => {
  loadStudents();
}, [loadStudents]);

  useEffect(() => {
  if (searchParams.get("new") === "true") {
    setEditingStudent(null);
    setOpenModal(true);

    navigate("/students", { replace: true });

  }
}, [searchParams, navigate]);

  async function addStudent(student: Student) {
    if (editingStudent) {
      await updateStudent(editingStudent.id, {
        name: student.name,
        goal: student.goal,
        attendance_type: student.attendance_type,
        phone: student.phone,
        email: student.email,
        birth_date: student.birth_date,
        gender: student.gender,
        height: student.height,
        weight: student.weight,
        notes: student.notes,
      });
    } else {
      await createStudent({
        name: student.name,
        goal: student.goal,
        attendance_type: student.attendance_type,
        phone: student.phone,
        email: student.email,
        birth_date: student.birth_date,
        gender: student.gender,
        height: student.height,
        weight: student.weight,
        notes: student.notes,
        user_id: user?.id,
      });
    }

    await loadStudents();

    setEditingStudent(null);
    setOpenModal(false);
  }

  async function deleteStudent(id: number) {
    await deleteStudentService(id);
    await loadStudents();
  }

  function handleEditStudent(student: Student) {
    setEditingStudent(student);
    setOpenModal(true);
  }

  async function handleCreateAccess(student: Student) {
  try {
    const account = await createStudentAccess(
      student.id,
      user!.id
    );

    setAccessCode(account.access_code);
  } catch (error) {
    console.error(error);
    alert("Não foi possível gerar o acesso.");
  }
}

  const filteredStudents = students.filter((student) =>
  student.name
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Alunos
          </h1>

          <p className="text-slate-400">
            Gerencie seus alunos.
          </p>
        </div>

       <Button
          icon={<Plus size={20} />}
          onClick={() => {
            setEditingStudent(null);
            setOpenModal(true);
          }}
        >
          Novo aluno
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6">

        <input
          type="text"
          placeholder="Buscar aluno pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-white outline-none focus:border-green-400"
        />

        <p className="mb-4">
          Total de alunos: {filteredStudents.length}
        </p>

        <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 sm:p-5">
                Nome
              </th>

              <th className="p-2 sm:p-5 text-slate-400">
                Objetivo
              </th>

              <th className="p-2 sm:p-5">
                Atendimento
              </th>

              <th className="p-2 sm:p-5">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
             {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-t border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td
                  className="p-2 sm:p-5 cursor-pointer hover:text-green-400"
                  onClick={() =>
                    navigate(`/students/${student.id}`)
                  }
                >
                  {student.name}
                </td>

                <td className="p-2 sm:p-5 text-slate-400">
                  {student.goal}
                </td>

                <td className="p-2 sm:p-5">
                  <Badge>
                    {student.attendance_type}
                  </Badge>
                </td>

                <td className="p-2 sm:p-5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() =>
                        handleEditStudent(student)
                      }
                      className="cursor-pointer text-blue-400 hover:text-blue-300 transition"
                      title="Editar aluno"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/students/${student.id}/workouts`
                        )
                      }
                      className="cursor-pointer text-green-400 hover:text-green-300 transition"
                      title="Treinos"
                    >
                      <ClipboardList size={20} />
                    </button>

                    <button
                      onClick={() => handleCreateAccess(student)}
                      className="cursor-pointer text-purple-400 hover:text-purple-300 transition"
                      title="Gerar acesso do aluno"
                    >
                      🔑
                    </button>

                    <button
                      onClick={() =>
                        deleteStudent(student.id)
                      }
                      className="cursor-pointer text-red-400 hover:text-red-300 transition"
                      title="Excluir aluno"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-slate-500"
                >
                  Nenhum aluno encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {accessCode && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">
              Acesso do aluno
            </h2>

            <p className="text-slate-400 mb-5">
              Código de acesso gerado com sucesso.
            </p>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-5">
              <p className="text-xs text-slate-500 mb-1">
                Código
              </p>

              <p className="text-2xl font-bold text-green-400 break-all">
                {accessCode}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAccessCode(null)}
                className="cursor-pointer px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
              >
                Fechar
              </button>

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(accessCode);
                  alert("Código copiado!");
                }}
                className="cursor-pointer px-4 py-2 rounded-xl bg-green-400 text-slate-950 font-bold hover:opacity-90 transition"
              >
                Copiar código
              </button>
            </div>
          </div>
        </div>
      )}

      <NewStudentModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingStudent(null);
        }}
        onAddStudent={addStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
}

export default Students;