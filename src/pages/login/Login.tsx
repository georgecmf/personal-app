import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800">
        <h1 className="text-4xl font-bold text-center mb-8">
          FitPro
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="cursor-pointer bg-green-400 text-slate-950 font-bold p-4 rounded-xl hover:opacity-90 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            onClick={() => navigate("/student-login")}
            className="cursor-pointer w-full border border-slate-700 text-slate-300 font-bold p-4 rounded-xl hover:bg-slate-800 hover:text-white transition"
          >
            Entrar como aluno
          </button>

          <button
            onClick={() => navigate("/register")}
            className="cursor-pointer w-full border border-green-400 text-green-400 font-bold p-4 rounded-xl hover:bg-green-400 hover:text-slate-950 transition"
          >
            Criar conta de Personal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;