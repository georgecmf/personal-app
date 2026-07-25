import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import {
  getAssessments,
} from "../../services/physicalAssessments";

import type {
  PhysicalAssessment,
} from "../../services/physicalAssessments";

function StudentAssessments() {
  const { studentId } = useParams();

  const { user } = useAuth();

  const [assessments, setAssessments] = useState<PhysicalAssessment[]>([]);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold">
            Avaliações Físicas
          </h1>

          <p className="text-slate-400 mt-2">
            Histórico das avaliações do aluno.
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-green-400 text-slate-950 font-bold px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          <Plus size={20} />
          Nova avaliação
        </button>
      </div>

      <div className="space-y-4">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold">
              {new Date(
                assessment.assessment_date
              ).toLocaleDateString("pt-BR")}
            </h2>

            <div className="mt-4 grid grid-cols-3 gap-6">
              <div>
                <p className="text-slate-500">Peso</p>
                <p>{assessment.weight || "-"} kg</p>
              </div>

              <div>
                <p className="text-slate-500">% Gordura</p>
                <p>{assessment.body_fat || "-"}%</p>
              </div>

              <div>
                <p className="text-slate-500">Massa muscular</p>
                <p>{assessment.muscle_mass || "-"} kg</p>
              </div>
            </div>
          </div>
        ))}

        {assessments.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-500">
            Nenhuma avaliação cadastrada.
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAssessments;