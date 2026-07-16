import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../../services/auth";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Conta criada com sucesso!");

    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Criar conta
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
            onClick={handleRegister}
            disabled={loading}
            className="bg-green-400 text-slate-950 font-bold p-4 rounded-xl"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>

          <Link
            to="/login"
            className="text-center text-green-400 hover:underline"
          >
            Já tenho uma conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;