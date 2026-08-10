import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAssessmentsForStudent } from "../../services/physicalAssessments";
import AssessmentCharts from "../../components/assessments/AssessmentCharts";


type Assessment = {
  id: number;
  student_id: number;
  assessment_date: string;

  weight: string;
  body_fat: string;
  muscle_mass: string;

  chest: string;
  waist: string;
  abdomen: string;
  hip: string;

  right_arm: string;
  left_arm: string;

  right_forearm: string;
  left_forearm: string;

  right_thigh: string;
  left_thigh: string;

  right_calf: string;
  left_calf: string;

  observations: string;

  front_photo?: string;
  side_photo?: string;
  back_photo?: string;
};

function StudentAssessments() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssessments() {
      const studentId = sessionStorage.getItem("student_id");

      if (!studentId) {
        navigate("/student-login", { replace: true });
        return;
      }

      const data = await getAssessmentsForStudent(
        Number(studentId)
      );

      setAssessments(data || []);
    }

    loadAssessments();
  }, [navigate]);

  const sortedAssessments = [...assessments].sort((a, b) => {
  const dateDifference =
    new Date(b.assessment_date).getTime() -
    new Date(a.assessment_date).getTime();

  if (dateDifference !== 0) {
    return dateDifference;
  }

  // Mesma data: ID maior = avaliação criada depois
  return (b.id ?? 0) - (a.id ?? 0);
});

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <div className="mb-8">

          <button
            onClick={() => {
              const studentId =
                sessionStorage.getItem("student_id");

              navigate(`/student/${studentId}`);
            }}
            className="cursor-pointer text-slate-400 hover:text-white transition mb-5"
          >
            ← Voltar para minha área
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold">
            Minha evolução
          </h1>

          <p className="text-slate-400 mt-2">
            Acompanhe suas avaliações físicas ao longo do tempo.
          </p>

        </div>

        {sortedAssessments.length > 0 && (
            <div className="mb-8">
                <AssessmentCharts
                assessments={[...sortedAssessments].reverse()}
                goal=""
                />
            </div>
            )}

        {/* Nenhuma avaliação */}
        {sortedAssessments.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

            <div className="text-4xl mb-4">
              📊
            </div>

            <p className="text-slate-300 font-semibold">
              Nenhuma avaliação cadastrada
            </p>

            <p className="text-slate-500 text-sm mt-2">
              Seu personal ainda não cadastrou nenhuma avaliação física.
            </p>

          </div>
        )}

        {/* Avaliações */}
        <div className="space-y-6">

          {sortedAssessments.map((assessment, index) => (

            <div
              key={assessment.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6"
            >

              {/* Data */}
              <div className="flex items-center justify-between mb-6">

                <div>
                  <p className="text-slate-500 text-sm">
                    Avaliação
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    {new Date(
                      assessment.assessment_date
                    ).toLocaleDateString("pt-BR")}
                  </h2>
                </div>

                {/* A primeira agora é realmente a mais recente */}
                {index === 0 && (
                  <span className="text-xs sm:text-sm bg-green-400/10 text-green-400 px-3 py-1.5 rounded-full">
                    Mais recente
                  </span>
                )}

              </div>

              {/* Principais indicadores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Peso
                  </p>

                  <p className="text-xl font-bold mt-1">
                    {assessment.weight || "-"}
                    {assessment.weight && " kg"}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Gordura corporal
                  </p>

                  <p className="text-xl font-bold mt-1">
                    {assessment.body_fat || "-"}
                    {assessment.body_fat && "%"}
                  </p>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-500 text-sm">
                    Massa muscular
                  </p>

                  <p className="text-xl font-bold mt-1">
                    {assessment.muscle_mass || "-"}
                    {assessment.muscle_mass && " kg"}
                  </p>
                </div>

              </div>

              {/* Medidas */}
              <div className="mt-6">

                <h3 className="text-lg font-bold mb-4">
                  📏 Medidas
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Peito
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.chest || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Cintura
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.waist || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Abdômen
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.abdomen || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Quadril
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.hip || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Braço direito
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.right_arm || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Braço esquerdo
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.left_arm || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Coxa direita
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.right_thigh || "-"}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3">
                    <p className="text-slate-500 text-xs">
                      Coxa esquerda
                    </p>
                    <p className="font-semibold mt-1">
                      {assessment.left_thigh || "-"}
                    </p>
                  </div>

                </div>

              </div>

              {/* Fotos da avaliação */}
                {(assessment.front_photo ||
                assessment.side_photo ||
                assessment.back_photo) && (
                <div className="mt-6">

                    <h3 className="text-lg font-bold mb-4">
                    📸 Fotos da avaliação
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {assessment.front_photo && (
                        <button
                        type="button"
                        onClick={() =>
                            setSelectedPhoto(assessment.front_photo!)
                        }
                        className="group cursor-pointer"
                        >
                        <div className="aspect-[3/4] overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
                            <img
                            src={assessment.front_photo}
                            alt="Foto de frente"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2">
                            Frente
                        </p>
                        </button>
                    )}

                    {assessment.side_photo && (
                        <button
                        type="button"
                        onClick={() =>
                            setSelectedPhoto(assessment.side_photo!)
                        }
                        className="group cursor-pointer"
                        >
                        <div className="aspect-[3/4] overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
                            <img
                            src={assessment.side_photo}
                            alt="Foto de lado"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2">
                            Lado
                        </p>
                        </button>
                    )}

                    {assessment.back_photo && (
                        <button
                        type="button"
                        onClick={() =>
                            setSelectedPhoto(assessment.back_photo!)
                        }
                        className="group cursor-pointer"
                        >
                        <div className="aspect-[3/4] overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
                            <img
                            src={assessment.back_photo}
                            alt="Foto de costas"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2">
                            Costas
                        </p>
                        </button>
                    )}

                    </div>
                </div>
                )}

              {/* Observações */}
              {assessment.observations && (
                <div className="mt-6 pt-5 border-t border-slate-800">

                  <p className="text-sm font-semibold text-slate-300">
                    📝 Observações
                  </p>

                  <p className="text-slate-400 mt-2 leading-relaxed">
                    {assessment.observations}
                  </p>

                </div>
              )}

            </div>

          ))}

        </div>

      </div>
      {selectedPhoto && (
        <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
        >
            <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
            >
            <img
                src={selectedPhoto}
                alt="Foto da avaliação"
                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />

            <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="cursor-pointer absolute top-3 right-3 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-red-500 transition"
            >
                ×
            </button>
            </div>
        </div>
        )}
    </div>
  );
}

export default StudentAssessments;
