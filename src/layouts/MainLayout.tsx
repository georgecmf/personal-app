import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;