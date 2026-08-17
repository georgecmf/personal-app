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
        if (canGoBack && window.history.length > 1) {
          navigate(-1);
          return;
        }

        if (
          location.pathname !== "/login" &&
          location.pathname !== "/student-login"
        ) {
          navigate("/login", { replace: true });
          return;
        }

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