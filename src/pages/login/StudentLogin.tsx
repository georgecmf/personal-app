import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStudentAccountByCode } from "../../services/students";
import { supabase } from "../../services/supabase";

function StudentLogin() {
  const navigate = useNavigate();

  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  setError("");

  const code = accessCode.trim().toUpperCase();

  if (!code) {
    setError("Digite seu código de acesso.");
    return;
  }

  setLoading(true);

  try {
    const account = await getStudentAccountByCode(code);

    console.log("CÓDIGO DIGITADO:", code);
    console.log("CONTA ENCONTRADA:", account);

    if (!account) {
      setError("Código de acesso inválido.");
      return;
    }

    const {
      data: { session },
      error: authError,
    } = await supabase.auth.signInAnonymously();

    console.log("SESSÃO SUPABASE:", session);
    console.log("ERRO AUTENTICAÇÃO:", authError);

    if (authError || !session) {
      console.error(
        "ERRO AO CRIAR SESSÃO ANÔNIMA:",
        authError
      );

      setError(
        "Não foi possível iniciar a sessão do aluno."
      );

      return;
    }

    sessionStorage.setItem(
      "student_id",
      String(account.student_id)
    );

    sessionStorage.setItem(
      "student_access_code",
      code
    );

    navigate(`/student/${account.student_id}`);

  } catch (error) {
    console.error(error);
    setError("Não foi possível realizar o acesso.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Área do aluno
          </h1>

          <p className="text-slate-400 mt-2">
            Digite o código de acesso fornecido pelo seu personal.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Código de acesso
            </label>

            <input
              type="text"
              value={accessCode}
              onChange={(e) =>
                setAccessCode(e.target.value.toUpperCase())
              }
              placeholder="ALU-XXXXXX"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-green-400"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-300 text-slate-950 font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default StudentLogin;