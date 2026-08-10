import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function StudentRoute({ children }: Props) {
  const studentId = sessionStorage.getItem("student_id");

  if (!studentId) {
    return <Navigate to="/student-login" replace />;
  }

  return children;
}

export default StudentRoute;