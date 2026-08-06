import type { ReactNode } from "react";

type CardProps = {
  title: string;
  value?: string | number;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
};

function Card({
  title,
  value,
  description,
  icon,
  onClick,
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        transition-all
        duration-300
        ${
          onClick
            ? "cursor-pointer hover:border-green-400 hover:scale-[1.02] hover:shadow-xl active:scale-95"
            : ""
        }
      `}
    >
      <h2 className="text-slate-400 text-sm">
        {title}
      </h2>

      {value !== undefined && (
        <div className="flex items-center justify-between mt-4">
          {icon}

          <p className="text-5xl font-bold text-green-400">
            {value}
          </p>
        </div>
      )}

      {children}

      {description && (
        <p className="text-slate-500 text-sm mt-3">
          {description}
        </p>
      )}
    </div>
  );
}

export default Card;