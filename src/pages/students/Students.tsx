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
} from "../../services/students";

import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

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

function Students() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>([]);

  const [search, setSearch] = useState("");

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
        plan: student.plan,
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
        plan: student.plan,
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

        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-5">
                Nome
              </th>

              <th className="text-left p-5">
                Objetivo
              </th>

              <th className="text-left p-5">
                Plano
              </th>

              <th className="text-left p-5">
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
                  className="p-5 cursor-pointer hover:text-green-400"
                  onClick={() =>
                    navigate(`/students/${student.id}`)
                  }
                >
                  {student.name}
                </td>

                <td className="p-5 text-slate-400">
                  {student.goal}
                </td>

                <td className="p-5">
                  <Badge>
                    {student.plan}
                  </Badge>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-4">
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