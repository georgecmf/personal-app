import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
} from "lucide-react";

import NewStudentModal from "../../components/students/NewStudentModal";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent as deleteStudentService,
} from "../../services/students";

type Student = {
  id: number;
  name: string;
  goal: string;
  plan: string;
};

function Students() {
  const [openModal, setOpenModal] =
    useState(false);

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const [students, setStudents] =
    useState<Student[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      const data =
        await getStudents();

      setStudents(data || []);
    }

    fetchStudents();
  }, []);

  async function addStudent(
  student: Student
) {
  if (editingStudent) {
    await updateStudent(
      editingStudent.id,
      {
        name: student.name,
        goal: student.goal,
        plan: student.plan,
      }
    );
  } else {
    await createStudent({
      name: student.name,
      goal: student.goal,
      plan: student.plan,
    });
  }

  const data =
    await getStudents();

  setStudents(data || []);

  setEditingStudent(null);
}
  async function deleteStudent(
    id: number
  ) {
    await deleteStudentService(id);

    const data =
      await getStudents();

    setStudents(data || []);
  }

  function handleEditStudent(
    student: Student
  ) {
    setEditingStudent(student);

    setOpenModal(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">
            Alunos
          </h1>

          <p className="text-slate-400">
            Gerencie seus alunos.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingStudent(null);

            setOpenModal(true);
          }}
          className="flex items-center gap-2 bg-green-400 text-slate-950 font-bold px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          <Plus size={20} />

          Novo aluno
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
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
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td
                  onClick={() =>
                    handleEditStudent(
                      student
                    )
                  }
                  className="p-5 cursor-pointer hover:text-green-400"
                >
                  {student.name}
                </td>

                <td className="p-5 text-slate-400">
                  {student.goal}
                </td>

                <td className="p-5">
                  <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-lg text-sm">
                    {student.plan}
                  </span>
                </td>

                <td className="p-5">
                  <button
                    onClick={() =>
                      deleteStudent(
                        student.id
                      )
                    }
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewStudentModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onAddStudent={addStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
}

export default Students;