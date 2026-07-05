function Login() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
          FitPro
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <button className="bg-green-400 text-slate-950 font-bold p-4 rounded-xl hover:opacity-90 transition">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;