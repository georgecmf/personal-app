import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { useLocation, useNavigate } from "react-router-dom";

function AndroidBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const listener = CapacitorApp.addListener(
      "backButton",
      ({ canGoBack }) => {
        const path = location.pathname;

        // LOGIN
        if (path === "/login" || path === "/student-login") {
          CapacitorApp.exitApp();
          return;
        }

        // ÁREA DO ALUNO
        if (path.startsWith("/student/")) {
          // Se estiver no Dashboard do aluno,
          // o botão voltar fecha o aplicativo.
          const studentDashboard =
            /^\/student\/[^/]+$/.test(path);

          if (studentDashboard) {
            CapacitorApp.exitApp();
            return;
          }

          // Nas outras telas do aluno, volta normalmente.
          if (canGoBack && window.history.length > 1) {
            navigate(-1);
            return;
          }

          CapacitorApp.exitApp();
          return;
        }

        // ÁREA DO PERSONAL
        if (canGoBack && window.history.length > 1) {
          navigate(-1);
          return;
        }

        // Se não houver mais histórico,
        // volta para o Dashboard.
        if (path !== "/dashboard") {
          navigate("/dashboard", { replace: true });
          return;
        }

        // Já está no Dashboard.
        CapacitorApp.exitApp();
      }
    );

    return () => {
      listener.then((handle) => handle.remove());
    };
  }, [navigate, location.pathname]);

  return null;
}

export default AndroidBackButton;