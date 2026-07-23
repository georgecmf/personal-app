import { useParams } from "react-router-dom";

function StudentProfile() {
  const { studentId } = useParams();

  return (
    <div>
      <h1 className="text-5xl font-bold mb-3">
        Perfil do aluno
      </h1>

      <p className="text-slate-400 mb-10">
        ID: {studentId}
      </p>
    </div>
  );
}

export default StudentProfile;