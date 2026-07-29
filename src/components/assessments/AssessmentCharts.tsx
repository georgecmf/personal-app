import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import type { PhysicalAssessment } from "../../services/physicalAssessments";

type Props = {
  assessments: PhysicalAssessment[];
};

function AssessmentCharts({ assessments }: Props) {
  const data = [...assessments]
    .reverse()
    .map((assessment) => ({
      date: new Date(
        assessment.assessment_date
      ).toLocaleDateString("pt-BR"),

      weight: Number(assessment.weight),

      bodyFat: Number(assessment.body_fat),

      muscleMass: Number(assessment.muscle_mass),
    }));

    const first = data[0];
    const last = data[data.length - 1];

    const weightDiff =
    last && first
        ? last.weight - first.weight
        : 0;

    const fatDiff =
    last && first
        ? last.bodyFat - first.bodyFat
        : 0;

    const muscleDiff =
    last && first
        ? last.muscleMass - first.muscleMass
        : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Evolução Física
      </h2>

    <div className="grid grid-cols-3 gap-6 mb-8">

  <div className="bg-slate-800 rounded-xl p-5">
    <p className="text-slate-400">
      Peso Atual
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {last?.weight ?? "-"} kg
    </h3>

    <p
      className={`mt-2 font-semibold ${
        weightDiff >= 0
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {weightDiff >= 0 ? "▲" : "▼"}{" "}
      {Math.abs(weightDiff).toFixed(1)} kg
    </p>
  </div>

  <div className="bg-slate-800 rounded-xl p-5">
    <p className="text-slate-400">
      Gordura
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {last?.bodyFat ?? "-"}%
    </h3>

    <p
      className={`mt-2 font-semibold ${
        fatDiff <= 0
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {fatDiff <= 0 ? "▼" : "▲"}{" "}
      {Math.abs(fatDiff).toFixed(1)}%
    </p>
  </div>

  <div className="bg-slate-800 rounded-xl p-5">
    <p className="text-slate-400">
      Massa Muscular
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {last?.muscleMass ?? "-"} kg
    </h3>

    <p
      className={`mt-2 font-semibold ${
        muscleDiff >= 0
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {muscleDiff >= 0 ? "▲" : "▼"}{" "}
      {Math.abs(muscleDiff).toFixed(1)} kg
    </p>
  </div>

</div>    

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="weight"
            name="Peso"
            stroke="#22c55e"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="bodyFat"
            name="% Gordura"
            stroke="#ef4444"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="muscleMass"
            name="Massa Muscular"
            stroke="#3b82f6"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AssessmentCharts;