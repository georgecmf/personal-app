import { useState } from "react";
import type { PhysicalAssessment } from "../../services/physicalAssessments";

import { generateAssessmentPdf } from "../../services/pdf";

type Props = {
  assessment: PhysicalAssessment | null;
  onClose: () => void;
};

function AssessmentDetailsModal({
  assessment,
  onClose,
}: Props) {
  const [selectedPhoto, setSelectedPhoto] =
    useState<string | null>(null);

  if (!assessment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl p-8 w-full max-w-[700px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CABEÇALHO */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Avaliação Física
          </h2>

          <div className="flex items-center gap-3">

            <button
              onClick={async () => {
                await generateAssessmentPdf(
                  assessment,
                  `avaliacao-${assessment.assessment_date}`
                );
              }}
              className="cursor-pointer bg-green-500 hover:bg-green-400 text-slate-950 px-4 py-2 rounded-xl font-bold"
            >
              Gerar PDF
            </button>

            <button
              onClick={onClose}
              className="cursor-pointer text-slate-400 hover:text-white text-2xl"
            >
              ✕
            </button>

          </div>

        </div>

        {/* CONTEÚDO */}

        <div
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
          }}
        >

          {/* MEDIDAS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >

            <Info
              title="Peso"
              value={`${assessment.weight} kg`}
            />

            <Info
              title="% Gordura"
              value={`${assessment.body_fat}%`}
            />

            <Info
              title="Massa muscular"
              value={`${assessment.muscle_mass} kg`}
            />

            <Info
              title="Peito"
              value={`${assessment.chest} cm`}
            />

            <Info
              title="Cintura"
              value={`${assessment.waist} cm`}
            />

            <Info
              title="Abdômen"
              value={`${assessment.abdomen} cm`}
            />

            <Info
              title="Quadril"
              value={`${assessment.hip} cm`}
            />

            <Info
              title="Braço Direito"
              value={`${assessment.right_arm} cm`}
            />

            <Info
              title="Braço Esquerdo"
              value={`${assessment.left_arm} cm`}
            />

            <Info
              title="Antebraço Direito"
              value={`${assessment.right_forearm} cm`}
            />

            <Info
              title="Antebraço Esquerdo"
              value={`${assessment.left_forearm} cm`}
            />

            <Info
              title="Coxa Direita"
              value={`${assessment.right_thigh} cm`}
            />

            <Info
              title="Coxa Esquerda"
              value={`${assessment.left_thigh} cm`}
            />

            <Info
              title="Panturrilha Direita"
              value={`${assessment.right_calf} cm`}
            />

            <Info
              title="Panturrilha Esquerda"
              value={`${assessment.left_calf} cm`}
            />

          </div>

          {/* OBSERVAÇÕES */}

          <div className="mt-8">

            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Observações
            </h3>

            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "16px",
                minHeight: "120px",
              }}
            >
              {assessment.observations || "Nenhuma observação."}
            </div>

          </div>

          {/* FOTOS */}

          <div className="mt-8">

            <h3 className="text-xl font-bold mb-4">
              Fotos da Avaliação
            </h3>

            <div className="grid grid-cols-3 gap-4">

              {/* FRENTE */}

              {assessment.front_photo && (
                <div>

                  <p className="text-center mb-2 text-slate-400">
                    Frente
                  </p>

                  <img
                    src={assessment.front_photo}
                    alt="Frente"
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{
                      width: "100%",
                      height: "256px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      setSelectedPhoto(assessment.front_photo!)
                    }
                  />

                </div>
              )}

              {/* LADO */}

              {assessment.side_photo && (
                <div>

                  <p className="text-center mb-2 text-slate-400">
                    Lado
                  </p>

                  <img
                    src={assessment.side_photo}
                    alt="Lado"
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{
                      width: "100%",
                      height: "256px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      setSelectedPhoto(assessment.side_photo!)
                    }
                  />

                </div>
              )}

              {/* COSTAS */}

              {assessment.back_photo && (
                <div>

                  <p className="text-center mb-2 text-slate-400">
                    Costas
                  </p>

                  <img
                    src={assessment.back_photo}
                    alt="Costas"
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{
                      width: "100%",
                      height: "256px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      setSelectedPhoto(assessment.back_photo!)
                    }
                  />

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* MODAL DA FOTO AMPLIADA */}

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >

          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* BOTÃO FECHAR */}

            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-4 -right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 font-bold text-xl cursor-pointer"
            >
              ×
            </button>

            {/* FOTO AMPLIADA */}

            <img
              src={selectedPhoto}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              alt="Foto da avaliação ampliada"
            />

          </div>

        </div>
      )}

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        borderRadius: "12px",
        padding: "16px",
      }}
    >

      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "4px",
        }}
      >
        {value}
      </p>

    </div>
  );
}

export default AssessmentDetailsModal;