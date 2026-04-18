type LogoProps = {
  className?: string
  variant?: "default" | "white"
}

export default function Logo({ className = "", variant = "default" }: LogoProps) {
  const wordmarkColor = variant === "white" ? "#ffffff" : "#0b2d7a"
  const accentColor = variant === "white" ? "#bae6fd" : "#e11d48"

  return (
    <svg
      viewBox="0 0 240 90"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Orlifrio Refrigeração"
    >
      {/* Wordmark: Orlifrio */}
      <text
        x="0"
        y="48"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
        fontSize="44"
        fontWeight="800"
        fill={wordmarkColor}
        letterSpacing="-1.5"
      >
        Orlifrio
      </text>

      {/* Subtítulo: Refrigeração */}
      <text
        x="2"
        y="76"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill={accentColor}
        letterSpacing="0.5"
      >
        Refrigeração
      </text>
    </svg>
  )
}
