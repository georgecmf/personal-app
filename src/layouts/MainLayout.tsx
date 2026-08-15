import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

function MainLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 min-w-0 w-full px-6 md:px-8 lg:px-10 py-6 bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;