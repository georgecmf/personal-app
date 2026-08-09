import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import {
  getAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  uploadAssessmentPhoto,
} from "../../services/physicalAssessments";

import type {
  PhysicalAssessment,
} from "../../services/physicalAssessments";

import NewAssessmentModal from "../../components/assessments/NewAssessmentModal";
import AssessmentDetailsModal from "../../components/assessments/AssessmentDetailsModal";
import AssessmentCharts from "../../components/assessments/AssessmentCharts";
import AssessmentComparisonModal from "../../components/assessments/AssessmentComparisonModal";


function StudentAssessments() {
  const { studentId } = useParams();

  const { user } = useAuth();

  const [assessments, setAssessments] = useState<PhysicalAssessment[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [selectedAssessment, setSelectedAssessment] =
  useState<PhysicalAssessment | null>(null);

  const [editingAssessment, setEditingAssessment] =
  useState<PhysicalAssessment | null>(null);

  const [comparisonCurrent, setComparisonCurrent] =
  useState<PhysicalAssessment | null>(null);

  const [comparisonPrevious, setComparisonPrevious] =
  useState<PhysicalAssessment | null>(null);

  async function loadAssessments() {
    if (!user || !studentId) return;

    const data = await getAssessments(
      Number(studentId),
      user.id
    );

    setAssessments(data || []);
  }

  useEffect(() => {
    loadAssessments();
  }, [user, studentId]);

async function saveAssessment(
  assessment: PhysicalAssessment,
  frontPhoto: File | null,
  sidePhoto: File | null,
  backPhoto: File | null
) {
  if (!user || !studentId) return;

  let frontPhotoUrl = editingAssessment?.front_photo || "";
  let sidePhotoUrl = editingAssessment?.side_photo || "";
  let backPhotoUrl = editingAssessment?.back_photo || "";

  if (frontPhoto) {
    const url = await uploadAssessmentPhoto(frontPhoto, user.id);
    if (url) frontPhotoUrl = url;
  }

  if (sidePhoto) {
    const url = await uploadAssessmentPhoto(sidePhoto, user.id);
    if (url) sidePhotoUrl = url;
  }

  if (backPhoto) {
    const url = await uploadAssessmentPhoto(backPhoto, user.id);
    if (url) backPhotoUrl = url;
}

  if (editingAssessment) {
    await updateAssessment(
      editingAssessment.id!,
      {
      ...assessment,
      id: editingAssessment.id,
      student_id: Number(studentId),
      user_id: user.id,

      front_photo: frontPhotoUrl,
      side_photo: sidePhotoUrl,
      back_photo: backPhotoUrl,
    }
  );
  } else {
    await createAssessment({
      ...assessment,
      student_id: Number(studentId),
      user_id: user.id,

      front_photo: frontPhotoUrl,
      side_photo: sidePhotoUrl,
      back_photo: backPhotoUrl,
    });
  }

  await loadAssessments();

  setEditingAssessment(null);
  setOpenModal(false);
}

async function removeAssessment(id: number) {
  const confirmDelete = window.confirm(
    "Deseja realmente excluir esta avaliação?"
  );

  if (!confirmDelete) return;

  await deleteAssessment(id);

  await loadAssessments();
}

const sortedAssessments = [...assessments].sort((a, b) => {
  const dateDifference =
    new Date(b.assessment_date).getTime() -
    new Date(a.assessment_date).getTime();

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return (b.id ?? 0) - (a.id ?? 0);
});

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-bold">
            Avaliações Físicas
          </h1>

          <p className="text-slate-400 mt-2">
            Histórico das avaliações do aluno.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAssessment(null);
            setOpenModal(true);
          }}
          className="cursor-pointer w-fit flex items-center gap-2 bg-green-400 text-slate-950 font-bold px-4 py-2 rounded-xl hover:opacity-90 transition"
        >
          <Plus size={20} />
          Nova avaliação
        </button>
      </div>

      <AssessmentCharts
          assessments={assessments}
        />

      <div className="space-y-4">
        {assessments.map((assessment) => {
          const index = sortedAssessments.findIndex(
            (a) => a.id === assessment.id
          );

          const hasPrevious =
            index !== -1 &&
            index < sortedAssessments.length - 1;

          return (
            <div
              key={assessment.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {new Date(
                  assessment.assessment_date
                ).toLocaleDateString("pt-BR")}
              </h2>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-slate-500">Peso</p>
                  <p>{assessment.weight || "-"} kg</p>
                </div>

                <div>
                  <p className="text-slate-500">% Gordura</p>
                  <p>{assessment.body_fat || "-"}%</p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Massa muscular
                  </p>
                  <p>{assessment.muscle_mass || "-"} kg</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    setSelectedAssessment(assessment)
                  }
                  className="cursor-pointer bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition"
                >
                  Ver detalhes
                </button>

                {hasPrevious && (
                  <button
                    onClick={() => {
                      setComparisonCurrent(
                        sortedAssessments[index]
                      );

                      setComparisonPrevious(
                        sortedAssessments[index + 1]
                      );
                    }}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl"
                  >
                    Comparar
                  </button>
                )}

                <button
                  onClick={() => {
                    setEditingAssessment(assessment);
                    setOpenModal(true);
                  }}
                  className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-4 py-2 rounded-xl font-bold"
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    removeAssessment(assessment.id!)
                  }
                  className="cursor-pointer bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl"
                >
                  Excluir
                </button>
              </div>
            </div>
          );
        })}

  {assessments.length === 0 && (
    <p className="text-slate-500">
      Nenhuma avaliação cadastrada.
    </p>
  )}
</div>

<NewAssessmentModal
  open={openModal}
  assessment={editingAssessment}
  onClose={() => {
    setOpenModal(false);
    setEditingAssessment(null);
  }}
  onSave={saveAssessment}
/>

      <AssessmentDetailsModal
        assessment={selectedAssessment}
        onClose={() => setSelectedAssessment(null)}
      />

      <AssessmentComparisonModal
        current={comparisonCurrent}
        previous={comparisonPrevious}
        onClose={() => {
          setComparisonCurrent(null);
          setComparisonPrevious(null);
        }}
      />
    </div>
  );
}

export default StudentAssessments;