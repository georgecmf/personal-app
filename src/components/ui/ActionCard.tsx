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
      className="
        w-full
        text-left
        bg-slate-900
        border border-slate-800
        rounded-2xl
        p-6
        md:p-8
        hover:bg-slate-800/60
        transition
        cursor-pointer
      "
    >
      <div className="mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="text-slate-400 mt-3">
        {description}
      </p>
    </button>
  );
}

export default ActionCard;