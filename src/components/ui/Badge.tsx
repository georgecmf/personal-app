type BadgeProps = {
  children: React.ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-lg text-sm font-medium">
      {children}
    </span>
  );
}

export default Badge;