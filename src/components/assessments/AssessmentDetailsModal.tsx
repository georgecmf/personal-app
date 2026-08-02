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


  if (!assessment) return null;


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-slate-900 rounded-2xl p-8 w-[700px] max-h-[90vh] overflow-y-auto">

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold">
        Avaliação Física
      </h2>

      <div className="flex items-center gap-3">

        <button
          onClick={async () => {
            console.log("Botão clicado");

            await generateAssessmentPdf(
              assessment,
              `avaliacao-${assessment.assessment_date}`
            );
          }}
          className="bg-green-500 hover:bg-green-400 text-slate-950 px-4 py-2 rounded-xl font-bold"
        >
          Gerar PDF
        </button>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-2xl"
        >
          ✕
        </button>

      </div>

    </div>  

     <div
      style={{
        backgroundColor: "#0f172a",
        color: "#ffffff",
      }}
    >

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >

          <Info title="Peso" value={`${assessment.weight} kg`} />
          <Info title="% Gordura" value={`${assessment.body_fat}%`} />
          <Info title="Massa muscular" value={`${assessment.muscle_mass} kg`} />

          <Info title="Peito" value={`${assessment.chest} cm`} />
          <Info title="Cintura" value={`${assessment.waist} cm`} />
          <Info title="Abdômen" value={`${assessment.abdomen} cm`} />
          <Info title="Quadril" value={`${assessment.hip} cm`} />

          <Info title="Braço Direito" value={`${assessment.right_arm} cm`} />
          <Info title="Braço Esquerdo" value={`${assessment.left_arm} cm`} />

          <Info title="Antebraço Direito" value={`${assessment.right_forearm} cm`} />
          <Info title="Antebraço Esquerdo" value={`${assessment.left_forearm} cm`} />

          <Info title="Coxa Direita" value={`${assessment.right_thigh} cm`} />
          <Info title="Coxa Esquerda" value={`${assessment.left_thigh} cm`} />

          <Info title="Panturrilha Direita" value={`${assessment.right_calf} cm`} />
          <Info title="Panturrilha Esquerda" value={`${assessment.left_calf} cm`} />

        </div>

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

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">
            Fotos da Avaliação
          </h3>

          <div className="grid grid-cols-3 gap-4">

            {assessment.front_photo && (
              <div>
                <p className="text-center mb-2 text-slate-400">
                  Frente
                </p>

                <img
                  src={assessment.front_photo}
                  alt="Frente"
                  style={{
                    width: "100%",
                    height: "256px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onClick={() => window.open(assessment.front_photo!, "_blank")}
                />
              </div>
            )}

            {assessment.side_photo && (
              <div>
                <p className="text-center mb-2 text-slate-400">
                  Lado
                </p>

                <img
                  src={assessment.side_photo}
                  alt="Lado"
                  style={{
                    width: "100%",
                    height: "256px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onClick={() => window.open(assessment.side_photo!, "_blank")}
                />
              </div>
            )}

            {assessment.back_photo && (
              <div>
                <p className="text-center mb-2 text-slate-400">
                  Costas
                </p>

                <img
                  src={assessment.back_photo}
                  alt="Costas"
                  style={{
                    width: "100%",
                    height: "256px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  onClick={() => window.open(assessment.back_photo!, "_blank")}
                />
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  
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