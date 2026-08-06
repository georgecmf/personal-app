import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="hidden md:block w-60 min-h-screen bg-slate-900 border-r border-slate-800 p-5">
      <h1 className="text-4xl font-extrabold text-green-400 tracking-tight mb-12">
        FitPro
      </h1>

      <nav className="flex flex-col gap-3">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `flex items-center gap-3 p-4 rounded-xl transition ${
        isActive
          ? "bg-slate-800 text-green-400"
          : "text-slate-300 hover:bg-slate-800"
      }`
    }
  >
    <LayoutDashboard size={22} />
    Dashboard
  </NavLink>

  <NavLink
    to="/students"
    className={({ isActive }) =>
      `flex items-center gap-3 p-4 rounded-xl transition ${
        isActive
          ? "bg-slate-800 text-green-400"
          : "text-slate-300 hover:bg-slate-800"
      }`
    }
  >
    <Users size={22} />
    Alunos
  </NavLink>

  <NavLink
    to="/login"
    className={({ isActive }) =>
      `flex items-center gap-3 p-4 rounded-xl transition ${
        isActive
          ? "bg-slate-800 text-green-400"
          : "text-slate-300 hover:bg-slate-800"
      }`
    }
  >
    <Settings size={22} />
    Login
  </NavLink>
</nav>
    </aside>
  );
}

export default Sidebar;