import type { ReactNode } from "react";

type ActionCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
};

function ActionCard({
  title,
  description,
  icon,
  onClick,
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-400 hover:scale-[1.02] transition-all text-left"
    >
      <div className="text-green-400 mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </button>
  );
}

export default ActionCard;