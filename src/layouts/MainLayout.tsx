import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

function MainLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;