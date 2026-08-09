import { useState } from "react";
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
      <td className="py-3">
        {title}
      </td>

      <td className="text-center">
        {previous}
      </td>

      <td className="text-center">
        {current}
      </td>

      <td
        className={`text-center font-semibold ${
          diff.startsWith("+")
            ? "text-green-400"
            : diff.startsWith("-")
              ? "text-red-400"
              : "text-slate-400"
        }`}
      >
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
  const [selectedPhoto, setSelectedPhoto] =
    useState<string | null>(null);

  if (!current || !previous) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl p-8 w-full max-w-[1100px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CABEÇALHO */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Comparação de Avaliações
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-400 cursor-pointer"
          >
            ✕
          </button>

        </div>

        {/* TABELA */}

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-3">
                Medida
              </th>

              <th className="text-center">
                Anterior
              </th>

              <th className="text-center">
                Atual
              </th>

              <th className="text-center">
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

        {/* FOTOS */}

        <div className="mt-10">

          {/* AVALIAÇÃO ANTERIOR */}

          <div>

            <h4 className="text-center mb-5 font-bold text-lg">
              Avaliação Anterior
            </h4>

            <div className="grid grid-cols-3 gap-5">

              {previous.front_photo && (
                <div
                  onClick={() =>
                    setSelectedPhoto(previous.front_photo!)
                  }
                  className="cursor-pointer bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
                >
                  <img
                    src={previous.front_photo}
                    alt="Avaliação anterior - frente"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="block mt-2 text-sm text-center">
                    Frente
                  </span>
                </div>
              )}

              {previous.side_photo && (
                <div
                  onClick={() =>
                    setSelectedPhoto(previous.side_photo!)
                  }
                  className="cursor-pointer bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
                >
                  <img
                    src={previous.side_photo}
                    alt="Avaliação anterior - lado"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="block mt-2 text-sm text-center">
                    Lado
                  </span>
                </div>
              )}

              {previous.back_photo && (
                <div
                  onClick={() =>
                    setSelectedPhoto(previous.back_photo!)
                  }
                  className="cursor-pointer bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
                >
                  <img
                    src={previous.back_photo}
                    alt="Avaliação anterior - costas"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="block mt-2 text-sm text-center">
                    Costas
                  </span>
                </div>
              )}

            </div>

          </div>

          {/* SEPARADOR */}

          <div className="border-t border-slate-700 my-8" />

          {/* AVALIAÇÃO ATUAL */}

          <div>

            <h4 className="text-center mb-5 font-bold text-lg">
              Avaliação Atual
            </h4>

            <div className="grid grid-cols-3 gap-5">

              {current.front_photo && (
                <div
                  onClick={() =>
                    setSelectedPhoto(current.front_photo!)
                  }
                  className="cursor-pointer bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
                >
                  <img
                    src={current.front_photo}
                    alt="Avaliação atual - frente"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="block mt-2 text-sm text-center">
                    Frente
                  </span>
                </div>
              )}

              {current.side_photo && (
                <div
                  onClick={() =>
                    setSelectedPhoto(current.side_photo!)
                  }
                  className="cursor-pointer bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
                >
                  <img
                    src={current.side_photo}
                    alt="Avaliação atual - lado"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="block mt-2 text-sm text-center">
                    Lado
                  </span>
                </div>
              )}

              {current.back_photo && (
                <div
                  onClick={() =>
                    setSelectedPhoto(current.back_photo!)
                  }
                  className="cursor-pointer bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
                >
                  <img
                    src={current.back_photo}
                    alt="Avaliação atual - costas"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="block mt-2 text-sm text-center">
                    Costas
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* MODAL DA FOTO */}

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >

          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-4 -right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 font-bold text-xl cursor-pointer"
            >
              ×
            </button>

            <img
              src={selectedPhoto}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              alt="Foto da avaliação"
            />

          </div>

        </div>
      )}

    </div>
  );
}

export default AssessmentComparisonModal;