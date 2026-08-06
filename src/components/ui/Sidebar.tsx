import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Activity,
} from "lucide-react";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Alunos",
      path: "/students",
      icon: Users,
    },
    {
      name: "Novo treino",
      path: "/students/select/workout",
      icon: Dumbbell,
    },
    {
      name: "Nova avaliação",
      path: "/students/select/assessment",
      icon: Activity,
    },
  ];

  return (
    <aside className="w-56 min-h-screen bg-slate-900 border-r border-slate-800 p-4">

      <h1 className="text-2xl font-extrabold text-green-400 mb-8">
        FitPro
      </h1>

      <nav className="flex flex-col gap-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition
                ${
                  isActive
                    ? "bg-slate-800 text-green-400"
                    : "text-slate-300 hover:bg-slate-800"
                }
                `
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;