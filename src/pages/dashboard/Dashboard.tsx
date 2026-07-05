function Dashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Bem-vindo ao seu painel fitness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-slate-400 text-sm">
            Alunos ativos
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-4">
            24
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-slate-400 text-sm">
            Treinos hoje
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-4">
            18
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-slate-400 text-sm">
            Faturamento
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-4">
            R$ 4.200
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;