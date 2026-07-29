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
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [abdomen, setAbdomen] = useState("");
  const [hip, setHip] = useState("");

  const [rightArm, setRightArm] = useState("");
  const [leftArm, setLeftArm] = useState("");

  const [rightForearm, setRightForearm] = useState("");
  const [leftForearm, setLeftForearm] = useState("");

  const [rightThigh, setRightThigh] = useState("");
  const [leftThigh, setLeftThigh] = useState("");

  const [rightCalf, setRightCalf] = useState("");
  const [leftCalf, setLeftCalf] = useState("");
  
  useEffect(() => {
    if (open) {
      setAssessmentDate(
        new Date().toISOString().split("T")[0]
      );

      setWeight("");
      setBodyFat("");
      setMuscleMass("");
      setObservations("");

      setChest("");
      setWaist("");
      setAbdomen("");
      setHip("");

      setRightArm("");
      setLeftArm("");

      setRightForearm("");
      setLeftForearm("");

      setRightThigh("");
      setLeftThigh("");

      setRightCalf("");
      setLeftCalf("");
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

          <input
            placeholder="Peito (cm)"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Cintura (cm)"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Abdômen (cm)"
            value={abdomen}
            onChange={(e) => setAbdomen(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Quadril (cm)"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Braço direito (cm)"
            value={rightArm}
            onChange={(e) => setRightArm(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Braço esquerdo (cm)"
            value={leftArm}
            onChange={(e) => setLeftArm(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Antebraço direito (cm)"
            value={rightForearm}
            onChange={(e) => setRightForearm(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Antebraço esquerdo (cm)"
            value={leftForearm}
            onChange={(e) => setLeftForearm(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Coxa direita (cm)"
            value={rightThigh}
            onChange={(e) => setRightThigh(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Coxa esquerda (cm)"
            value={leftThigh}
            onChange={(e) => setLeftThigh(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Panturrilha direita (cm)"
            value={rightCalf}
            onChange={(e) => setRightCalf(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            placeholder="Panturrilha esquerda (cm)"
            value={leftCalf}
            onChange={(e) => setLeftCalf(e.target.value)}
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

                chest,
                waist,
                abdomen,
                hip,

                right_arm: rightArm,
                left_arm: leftArm,

                right_forearm: rightForearm,
                left_forearm: leftForearm,

                right_thigh: rightThigh,
                left_thigh: leftThigh,

                right_calf: rightCalf,
                left_calf: leftCalf,

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