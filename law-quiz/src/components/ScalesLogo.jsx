export default function ScalesLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Scales of justice"
      role="img"
    >
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M5 6h14" />
      <path d="M5 6l-3 6h6z" />
      <path d="M19 6l-3 6h6z" />
      <path d="M2 12a3 3 0 0 0 6 0" />
      <path d="M16 12a3 3 0 0 0 6 0" />
    </svg>
  );
}
