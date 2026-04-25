import Link from "next/link";

export default function Button({
  children,
  onClick,
  href,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const base =
    "px-5 py-3 rounded-xl font-semibold transition duration-200 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-white",
  };

  const stateStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const className = [
    base,
    variants[variant] || variants.primary,
    stateStyles,
  ].join(" ");

  // 🔗 Internal Next.js link
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  // 🌍 External link
  if (href) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // 🔘 Standard button
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
