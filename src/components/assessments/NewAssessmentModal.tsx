import { useEffect, useRef, useState } from "react";

import type { PhysicalAssessment } from "../../services/physicalAssessments";

type Props = {
  open: boolean;
  assessment: PhysicalAssessment | null;
  onClose: () => void;
  onSave: (
    assessment: PhysicalAssessment,
    frontPhoto: File | null,
    sidePhoto: File | null,
    backPhoto: File | null
  ) => Promise<void>;
};

function NewAssessmentModal({
  open,
  assessment,
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
  
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);
  const [backPhoto, setBackPhoto] = useState<File | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const sideInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);

useEffect(() => {
  if (!assessment) return;

  setAssessmentDate(assessment.assessment_date);

  setWeight(assessment.weight);
  setBodyFat(assessment.body_fat);
  setMuscleMass(assessment.muscle_mass);

  setChest(assessment.chest);
  setWaist(assessment.waist);
  setAbdomen(assessment.abdomen);
  setHip(assessment.hip);

  setRightArm(assessment.right_arm);
  setLeftArm(assessment.left_arm);

  setRightForearm(assessment.right_forearm);
  setLeftForearm(assessment.left_forearm);

  setRightThigh(assessment.right_thigh);
  setLeftThigh(assessment.left_thigh);

  setRightCalf(assessment.right_calf);
  setLeftCalf(assessment.left_calf);

  setObservations(assessment.observations);
}, [assessment]);

  useEffect(() => {
    if (open && !assessment) {
      const today = new Date();

      const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-");

      setAssessmentDate(localDate);

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

      <div className="bg-slate-900 rounded-2xl p-8 w-[500px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-3xl font-bold mb-6">
          {assessment ? "Editar Avaliação" : "Nova Avaliação"}
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

          <div className="space-y-3">
            <p className="font-semibold">Fotos da avaliação</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <button
                type="button"
                onClick={() => frontInputRef.current?.click()}
                className={`cursor-pointer p-4 rounded-xl border transition text-left ${
                  frontPhoto
                    ? "border-green-400 bg-green-400/10 text-green-400"
                    : "border-slate-700 bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <div className="font-semibold">
                  📷 Foto Frente
                </div>

                <div className="text-xs text-slate-400 mt-1 truncate">
                  {frontPhoto ? frontPhoto.name : "Selecionar foto"}
                </div>
              </button>

              <button
                type="button"
                onClick={() => sideInputRef.current?.click()}
                className={`cursor-pointer p-4 rounded-xl border transition text-left ${
                  sidePhoto
                    ? "border-green-400 bg-green-400/10 text-green-400"
                    : "border-slate-700 bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <div className="font-semibold">
                  📷 Foto Lado
                </div>

                <div className="text-xs text-slate-400 mt-1 truncate">
                  {sidePhoto ? sidePhoto.name : "Selecionar foto"}
                </div>
              </button>

              <button
                type="button"
                onClick={() => backInputRef.current?.click()}
                className={`cursor-pointer p-4 rounded-xl border transition text-left ${
                  backPhoto
                    ? "border-green-400 bg-green-400/10 text-green-400"
                    : "border-slate-700 bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <div className="font-semibold">
                  📷 Foto Costas
                </div>

                <div className="text-xs text-slate-400 mt-1 truncate">
                  {backPhoto ? backPhoto.name : "Selecionar foto"}
                </div>
              </button>

            </div>

            <input
              ref={frontInputRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFrontPhoto(e.target.files?.[0] || null)
              }
              className="hidden"
            />

            <input
              ref={sideInputRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSidePhoto(e.target.files?.[0] || null)
              }
              className="hidden"
            />

            <input
              ref={backInputRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setBackPhoto(e.target.files?.[0] || null)
              }
              className="hidden"
            />
          </div>
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
            className="cursor-pointer px-5 py-3 rounded-xl bg-slate-700"
          >
            Cancelar
          </button>

          <button
            disabled={saving}
            onClick={async () => {
              setSaving(true);

              try {
                await onSave(
                  {
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
                  },
                  frontPhoto,
                  sidePhoto,
                  backPhoto
                );
              } finally {
                setSaving(false);
              }
            }}
            className="cursor-pointer px-5 py-3 rounded-xl bg-green-400 text-slate-950 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewAssessmentModal;