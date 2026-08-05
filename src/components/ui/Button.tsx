type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {

  const styles = {
    primary:
      "bg-green-400 text-slate-950 hover:opacity-90",

    secondary:
      "bg-blue-400 text-slate-950 hover:opacity-90",

    danger:
      "bg-red-500 text-white hover:opacity-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-5
        py-3
        rounded-xl
        font-bold
        transition
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}