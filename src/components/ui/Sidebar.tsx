import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getProfile } from "../../services/profile";

import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const { user } = useAuth();

  const [profileName, setProfileName] = useState("");

  useEffect(() => {
  async function loadProfile() {
    if (!user) return;

    const data = await getProfile(user.id);

    if (data) {
      setProfileName(data.name);
    }
  }

  loadProfile();

}, [user]);

  const { logout } = useAuth();
  const navigate = useNavigate();

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
  ];

  const account = [
    {
      name: "Configurações",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
   <aside className="w-full md:w-56 md:min-h-screen bg-slate-900 border-b md:border-r border-slate-800 p-6">

      <h1 className="text-2xl font-extrabold text-green-400 mb-2">
        FitPro
      </h1>

      <div className="mb-8">
        <p className="font-bold">
          {profileName || "Personal"}
        </p>

        <p className="text-sm text-slate-500">
          {user?.email}
        </p>
      </div>

      <p className="text-xs uppercase text-slate-500 mb-3">
        Menu
      </p>

      <nav className="flex flex-col gap-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-slate-800 text-green-400"
                    : "text-slate-300 hover:bg-slate-800"
                }`
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


      <div className="mt-8">

        <p className="text-xs uppercase text-slate-500 mb-3">
          Conta
        </p>

        <nav className="flex flex-col gap-2">

          {account.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-slate-800 text-green-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>

              </NavLink>
            );
          })}

          <button
            onClick={async () => {
                await logout();
                navigate("/login");
            }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
            <LogOut size={20} />
            <span className="font-medium">
              Sair
            </span>
          </button>

        </nav>

      </div>

    </aside>
  );
}

export default Sidebar;