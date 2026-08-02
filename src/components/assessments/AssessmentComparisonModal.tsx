import type { PhysicalAssessment } from "../../services/physicalAssessments";

type Props = {
  current: PhysicalAssessment | null;
  previous: PhysicalAssessment | null;
  onClose: () => void;
};

function difference(current: string, previous: string) {
  const c = parseFloat(current || "0");
  const p = parseFloat(previous || "0");

  const diff = c - p;

  if (diff > 0) {
    return `+${diff.toFixed(1)}`;
  }

  if (diff < 0) {
    return diff.toFixed(1);
  }

  return "0";
}

function ComparisonRow({
  title,
  current,
  previous,
}: {
  title: string;
  current: string;
  previous: string;
}) {
  const diff = difference(current, previous);

  return (
    <tr className="border-b border-slate-800">
      <td className="py-3">{title}</td>
      <td className="text-center">{previous}</td>
      <td className="text-center">{current}</td>
      <td className="text-center font-bold">
        {diff}
      </td>
    </tr>
  );
}

function AssessmentComparisonModal({
  current,
  previous,
  onClose,
}: Props) {
  if (!current || !previous) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 rounded-2xl p-8 w-[1100px] max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Comparação de Avaliações
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-400"
          >
            ✕
          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-3">
                Medida
              </th>

              <th>
                Anterior
              </th>

              <th>
                Atual
              </th>

              <th>
                Diferença
              </th>

            </tr>

          </thead>

          <tbody>

            <ComparisonRow
              title="Peso"
              previous={previous.weight}
              current={current.weight}
            />

            <ComparisonRow
              title="% Gordura"
              previous={previous.body_fat}
              current={current.body_fat}
            />

            <ComparisonRow
              title="Massa Muscular"
              previous={previous.muscle_mass}
              current={current.muscle_mass}
            />

            <ComparisonRow
              title="Peito"
              previous={previous.chest}
              current={current.chest}
            />

            <ComparisonRow
              title="Cintura"
              previous={previous.waist}
              current={current.waist}
            />

            <ComparisonRow
              title="Abdômen"
              previous={previous.abdomen}
              current={current.abdomen}
            />

            <ComparisonRow
              title="Quadril"
              previous={previous.hip}
              current={current.hip}
            />

            <ComparisonRow
              title="Braço Direito"
              previous={previous.right_arm}
              current={current.right_arm}
            />

            <ComparisonRow
              title="Braço Esquerdo"
              previous={previous.left_arm}
              current={current.left_arm}
            />

            <ComparisonRow
              title="Antebraço Direito"
              previous={previous.right_forearm}
              current={current.right_forearm}
            />

            <ComparisonRow
              title="Antebraço Esquerdo"
              previous={previous.left_forearm}
              current={current.left_forearm}
            />

            <ComparisonRow
              title="Coxa Direita"
              previous={previous.right_thigh}
              current={current.right_thigh}
            />

            <ComparisonRow
              title="Coxa Esquerda"
              previous={previous.left_thigh}
              current={current.left_thigh}
            />

            <ComparisonRow
              title="Panturrilha Direita"
              previous={previous.right_calf}
              current={current.right_calf}
            />

            <ComparisonRow
              title="Panturrilha Esquerda"
              previous={previous.left_calf}
              current={current.left_calf}
            />

          </tbody>

        </table>

        <div className="mt-10">

          <h3 className="text-2xl font-bold mb-6">
            Comparação das Fotos
          </h3>

          <div className="grid grid-cols-2 gap-10">

            <div>

              <h4 className="text-center mb-4 font-bold">
                Avaliação Anterior
              </h4>

              <div className="grid grid-cols-3 gap-3">

                {previous.front_photo && (
                  <img
                    src={previous.front_photo}
                    className="rounded-xl h-56 object-cover"
                  />
                )}

                {previous.side_photo && (
                  <img
                    src={previous.side_photo}
                    className="rounded-xl h-56 object-cover"
                  />
                )}

                {previous.back_photo && (
                  <img
                    src={previous.back_photo}
                    className="rounded-xl h-56 object-cover"
                  />
                )}

              </div>

            </div>

            <div>

              <h4 className="text-center mb-4 font-bold">
                Avaliação Atual
              </h4>

              <div className="grid grid-cols-3 gap-3">

                {current.front_photo && (
                  <img
                    src={current.front_photo}
                    className="rounded-xl h-56 object-cover"
                  />
                )}

                {current.side_photo && (
                  <img
                    src={current.side_photo}
                    className="rounded-xl h-56 object-cover"
                  />
                )}

                {current.back_photo && (
                  <img
                    src={current.back_photo}
                    className="rounded-xl h-56 object-cover"
                  />
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AssessmentComparisonModal;