export default function Button({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      className={`bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md ${className}`}
    >
      {children}
    </button>
  )
}