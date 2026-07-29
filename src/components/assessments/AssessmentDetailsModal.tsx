import type { PhysicalAssessment } from "../../services/physicalAssessments";

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

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

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

          <h3 className="text-xl font-bold mb-3">
            Observações
          </h3>

          <div className="bg-slate-800 rounded-xl p-4 min-h-[120px]">
            {assessment.observations || "Nenhuma observação."}
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
    <div className="bg-slate-800 rounded-xl p-4">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <p className="text-xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}

export default AssessmentDetailsModal;