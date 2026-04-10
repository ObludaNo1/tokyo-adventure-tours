export type ButtonType = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
  readonly type?: ButtonType;
  readonly size?: ButtonSize;
  readonly onClick?: () => void;
  readonly children?: React.ReactNode;
};

const typeClasses: Record<ButtonType, string> = {
  primary: "bg-black text-white hover:bg-zinc-800",
  secondary: "bg-zinc-200 text-black hover:bg-zinc-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-8 py-3 text-lg",
  medium: "px-14 py-4 text-xl",
  large: "px-20 py-6 text-2xl",
};

export default function Button({
  children,
  onClick,
  type = "primary",
  size = "medium",
}: ButtonProps) {
  return (
    <button
      className={`${sizeClasses[size]} ${typeClasses[type]} rounded-full transition-colors cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
