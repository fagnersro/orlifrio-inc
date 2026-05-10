// Avatar circular baseado em iniciais + cor de fundo, com versão "stack"
// para listas com sobreposição e contador de overflow.
// Aceita qualquer objeto estruturalmente compatível com AvatarShape,
// evitando acoplamento ao tipo Attendee (mock) ou AttendeeSnapshot (DB).

export type AvatarShape = {
  name: string
  initials: string
  color: string
}

export function Avatar({
  attendee,
  size = 28,
}: {
  attendee: AvatarShape
  size?: number
}) {
  return (
    <span
      title={attendee.name}
      style={{ width: size, height: size, backgroundColor: attendee.color }}
      className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white text-white dark:border-gray-900"
    >
      <span
        style={{ fontSize: size * 0.38 }}
        className="font-semibold leading-none"
      >
        {attendee.initials}
      </span>
    </span>
  )
}

export function AvatarStack({
  attendees,
  size = 28,
  max = 4,
}: {
  attendees: AvatarShape[]
  size?: number
  max?: number
}) {
  const visible = attendees.slice(0, max)
  const overflow = attendees.length - visible.length
  const overlap = -Math.round(size * 0.28)

  return (
    <div className="flex items-center">
      {visible.map((a, i) => (
        <span
          key={a.name}
          className="relative"
          style={{
            marginLeft: i === 0 ? 0 : overlap,
            zIndex: visible.length - i,
          }}
        >
          <Avatar attendee={a} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          style={{
            width: size,
            height: size,
            fontSize: size * 0.36,
            marginLeft: overlap,
          }}
          className="relative inline-flex items-center justify-center rounded-full border-2 border-white bg-gray-200 font-semibold text-gray-600 dark:border-gray-900 dark:bg-gray-700 dark:text-gray-300"
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
