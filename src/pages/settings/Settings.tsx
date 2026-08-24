import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../../services/profile";


function Settings() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const profile = await getProfile(
        user.id
      );

      if (profile) {
        setName(profile.name);
      }

      setLoading(false);
    }

    loadProfile();

  }, [user]);


  async function handleSave() {
    if (!user) return;


    const profile = await getProfile(
      user.id
    );


    if (profile) {

      await updateProfile(
        user.id,
        name
      );

    } else {

      await createProfile({
        id: user.id,
        name,
      });

    }

    alert("Perfil atualizado!");

    navigate("/dashboard");
  }


  if (loading) {
    return (
      <p className="text-slate-400">
        Carregando...
      </p>
    );
  }


  return (
    <div>

      <h1 className="text-3xl md:text-5xlfont-bold mb-2">
        Configurações
      </h1>

      <p className="text-slate-400 mb-10">
        Gerencie seus dados profissionais.
      </p>


      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl">


        <div className="mb-6">

          <p className="text-slate-500">
            Email da conta
          </p>

          <p className="text-lg">
            {user?.email}
          </p>

        </div>



        <div>

          <label className="text-slate-500">
            Nome do Personal
          </label>


          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Digite seu nome"
            className="
              mt-2
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-5
              py-3
              outline-none
              focus:border-green-400
            "
          />

        </div>



        <button
          onClick={handleSave}
          className="
            mt-8
            bg-green-400
            text-slate-950
            font-bold
            px-6
            py-3
            rounded-xl
            hover:opacity-90
            transition
            cursor-pointer
          "
        >
          Salvar alterações
        </button>


      </div>

    </div>
  );
}

export default Settings;