export type ButtonType = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  readonly purpose?: ButtonType;
  readonly size?: ButtonSize;
  readonly onClick?: () => void;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly type?: "submit" | "reset" | "button" | undefined;
};

const purposeClasses: Record<ButtonType, string> = {
  primary: "bg-black text-white hover:bg-zinc-800",
  secondary: "bg-zinc-200 text-black hover:bg-zinc-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-8 py-3 text-lg",
  md: "px-14 py-4 text-xl",
  lg: "px-20 py-6 text-2xl",
};

export default function Button({
  children,
  onClick,
  purpose = "primary",
  size = "md",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`${sizeClasses[size]} ${purposeClasses[purpose]} rounded-full transition-colors cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
