import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/students/Students";
import Workouts from "./pages/workouts/Workouts";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/workouts" element={<Workouts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;