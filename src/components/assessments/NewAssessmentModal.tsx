import { useEffect, useState } from "react";

import type { PhysicalAssessment } from "../../services/physicalAssessments";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (assessment: PhysicalAssessment) => void;
};

function NewAssessmentModal({
  open,
  onClose,
  onSave,
}: Props) {
  const [assessmentDate, setAssessmentDate] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (open) {
      setAssessmentDate(
        new Date().toISOString().split("T")[0]
      );

      setWeight("");
      setBodyFat("");
      setMuscleMass("");
      setObservations("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

      <div className="bg-slate-900 rounded-2xl p-8 w-[500px]">

        <h2 className="text-3xl font-bold mb-6">
          Nova Avaliação
        </h2>

        <div className="space-y-4">

          <input
            type="date"
            value={assessmentDate}
            onChange={(e) =>
              setAssessmentDate(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Peso"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="% Gordura"
            value={bodyFat}
            onChange={(e) =>
              setBodyFat(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Massa muscular"
            value={muscleMass}
            onChange={(e) =>
              setMuscleMass(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <textarea
            placeholder="Observações"
            value={observations}
            onChange={(e) =>
              setObservations(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 h-32"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-700"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSave({
                student_id: 0,
                assessment_date: assessmentDate,

                weight,
                body_fat: bodyFat,
                muscle_mass: muscleMass,

                chest: "",
                waist: "",
                abdomen: "",
                hip: "",

                right_arm: "",
                left_arm: "",

                right_forearm: "",
                left_forearm: "",

                right_thigh: "",
                left_thigh: "",

                right_calf: "",
                left_calf: "",

                observations,
              })
            }
            className="px-5 py-3 rounded-xl bg-green-400 text-slate-950 font-bold"
          >
            Salvar
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewAssessmentModal;