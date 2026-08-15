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
import StudentLogin from "./pages/login/StudentLogin";
import Register from "./pages/register/Register";
import StudentWorkouts from "./pages/workouts/StudentWorkouts";
import PrivateRoute from "./routes/PrivateRoute";
import WorkoutExercises from "./pages/workouts/WorkoutExercises";
import StudentProfile from "./pages/students/StudentProfile";
import StudentAssessments from "./pages/assessments/StudentAssessments";
import SelectStudentForWorkout from "./pages/students/SelectStudentForWorkout";
import SelectStudentForAssessment from "./pages/students/SelectStudentForAssessment";
import Settings from "./pages/settings/Settings";
import StudentDashboard from "./pages/students/StudentDashboard";
import StudentAreaWorkouts from "./pages/students/StudentWorkouts";
import StudentWorkoutExercises from "./pages/students/StudentWorkoutExercises";
import StudentAreaAssessments from "./pages/students/StudentAssessments";
import StudentRoute from "./routes/StudentRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/login" 
        element={<Login />} />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/student/:studentId"
          element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          }
        />

        <Route
          path="/student/:studentId/workouts"
          element={
            <StudentRoute>
              <StudentAreaWorkouts />
            </StudentRoute>
          }
        />

        <Route
          path="/student/:studentId/workouts/:workoutId"
          element={
            <StudentRoute>
              <StudentWorkoutExercises />
            </StudentRoute>
          }
        />

        <Route
          path="/student/:studentId/assessments"
          element={
            <StudentRoute>
              <StudentAreaAssessments />
            </StudentRoute>
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
            element={<Navigate to="/login" replace />}
          />
        
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard"
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
              path="/settings"
              element={<Settings />}
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