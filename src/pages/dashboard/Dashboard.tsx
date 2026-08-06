import { useEffect, useState } from "react";
import { useNavigate,} from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Users,
  Dumbbell,
  Activity,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { getStudents } from "../../services/students";
import { getAllWorkouts } from "../../services/workouts";
import { getAllExercises } from "../../services/exercises";

import Card from "../../components/ui/Card";
import ActionCard from "../../components/ui/ActionCard";

function Dashboard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [students, setStudents] = useState(0);
  const [workouts, setWorkouts] = useState(0);
  const [exercises, setExercises] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;

      const studentsData = await getStudents(user.id);
      const workoutsData = await getAllWorkouts(user.id);
      const exercisesData = await getAllExercises(user.id);

      setStudents(studentsData.length);
      setWorkouts(workoutsData.length);
      setExercises(exercisesData.length);
    }

    loadDashboard();
  }, [user]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Painel
        </h1>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Bem-vindo de volta!
        </h2>

        <p className="text-slate-400">
          Gerencie seus alunos, avaliações e treinos em um único lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <Card
        title="Total de alunos"
        value={students}
        description="Cadastrados no sistema"
        icon={
          <Users
            size={40}
            className="text-green-400"
          />
        }
        onClick={() => navigate("/students")}
      />

      <Card
        title="Total de treinos"
        value={workouts}
        description="Treinos criados"
        icon={
          <Dumbbell
            size={40}
            className="text-green-400"
          />
        }
        onClick={() => navigate("/students/select/workout")}
      />

      <Card
        title="Total de exercícios"
        value={exercises}
        description="Exercícios cadastrados"
        icon={
          <Activity
            size={40}
            className="text-green-400"
          />
        }
        onClick={() => navigate("/students")}
      />

    </div>
      
      <div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">
    Ações rápidas
  </h2>

  <div className="grid md:grid-cols-3 gap-5">

    {/* Novo aluno */}
      <ActionCard
        title="Novo aluno"
        description="Cadastre um novo aluno."
        icon={
          <Plus
            size={36}
            className="text-green-400"
          />
        }
        onClick={() => navigate("/students?new=true")}
      />

   {/* Nova avaliação */}
      <ActionCard
          title="Nova avaliação"
          description="Registre uma avaliação física."
          icon={
            <Activity
              size={36}
              className="text-green-400"
            />
          }
          onClick={() => navigate("/students/select/assessment")}
        />

    {/* Novo treino */}
      <ActionCard
        title="Novo treino"
        description="Crie um treino para um aluno."
        icon={
          <Dumbbell
            size={36}
            className="text-green-400"
          />
        }
        onClick={() => navigate("/students/select/workout")}
      />

  </div>
</div>
</div>
  );
}

export default Dashboard;