import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "../../services/auth";

type SidebarProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login", { replace: true });
    onNavigate?.();
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-4 rounded-xl transition ${
      isActive
        ? "bg-slate-800 text-green-400"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside
      className={`w-56 min-h-screen bg-slate-900 border-r border-slate-800 p-4 ${
        mobile ? "block" : "hidden md:block"
      }`}
    >
      <h1 className="text-4xl font-extrabold text-green-400 tracking-tight mb-12">
        FitPro
      </h1>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          className={linkClass}
          onClick={onNavigate}
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/students"
          className={linkClass}
          onClick={onNavigate}
        >
          <Users size={22} />
          Alunos
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
          onClick={onNavigate}
        >
          <Settings size={22} />
          Configurações
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 rounded-xl text-slate-300 hover:bg-slate-800 transition text-left"
        >
          <LogOut size={22} />
          Sair
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;