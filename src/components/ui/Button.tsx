import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger";
    icon?: ReactNode;
  };

function Button({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-green-400 text-slate-950 hover:opacity-90",

    secondary:
      "bg-slate-700 text-white hover:bg-slate-600",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        px-5
        py-3
        rounded-xl
        font-bold
        transition-all
        duration-200
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;