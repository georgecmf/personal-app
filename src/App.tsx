import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/students/Students";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import StudentWorkouts from "./pages/workouts/StudentWorkouts";
import PrivateRoute from "./routes/PrivateRoute";
import WorkoutExercises from "./pages/workouts/WorkoutExercises";
import StudentProfile from "./pages/students/StudentProfile";
import StudentAssessments from "./pages/assessments/StudentAssessments";
import SelectStudentForWorkout from "./pages/students/SelectStudentForWorkout";
import SelectStudentForAssessment from "./pages/students/SelectStudentForAssessment";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={<Dashboard />}
          />
            <Route
              path="/students"
              element={<Students />}
            />

            <Route
              path="/students/:studentId"
              element={<StudentProfile />}
            />

            <Route
              path="/students/select/workout"
              element={<SelectStudentForWorkout />}
            />

            <Route
              path="/students/select/assessment"
              element={<SelectStudentForAssessment />}
            />

            <Route
              path="/students/:studentId/workouts"
              element={<StudentWorkouts />}
            />

            <Route
              path="/students/:studentId/workouts/:workoutId"
              element={<WorkoutExercises />}
            />

            <Route
              path="/students/:studentId/assessments"
              element={<StudentAssessments />}
            />

              <Route
              path="*"
              element={<Navigate to="/" />}
            />

          </Route>

        </Routes>

      </BrowserRouter>
  );
}

export default App;