export type ButtonType = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  onClick: () => void;
  children: React.ReactNode;
};

export default function Button({
  children,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
}>) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
