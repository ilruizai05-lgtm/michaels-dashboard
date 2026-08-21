// Minimal inline stroke icons (1.6px, rounded) — no icon dependency.
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  watch: <><circle cx="12" cy="12" r="6" /><path d="M12 9v3l2 1" /><path d="M9 5l.5-2h5l.5 2M9 19l.5 2h5l.5-2" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.9M21 20a6 6 0 0 0-4-5.6" /></>,
  home: <><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></>,
  chart: <><path d="M4 20V4" /><path d="M4 20h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="8" width="3" height="9" /><rect x="17" y="5" width="3" height="12" /></>,
  badge: <><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="13" r="1.5" /><path d="M12 14.5V17" /></>,
  activity: <><path d="M3 12h4l2 7 4-14 2 7h6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  bell: <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  chevron: <><path d="M9 6l6 6-6 6" /></>,
  logout: <><path d="M15 12H4" /><path d="M9 7l-5 5 5 5" /><path d="M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5" /></>,
  arrowUp: <><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></>,
  arrowDown: <><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></>,
  camera: <><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" transform="translate(0 1)" /><circle cx="12" cy="14" r="3.5" /></>,
  back: <><path d="M15 18l-6-6 6-6" /></>,
  check: <><path d="M20 6L9 17l-5-5" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  print: <><path d="M6 9V3h12v6" /><rect x="4" y="9" width="16" height="8" rx="2" /><path d="M7 17h10v4H7z" /></>,
}

export default function Icon({ name, size, className, ...rest }) {
  const p = paths[name]
  if (!p) return null
  return (
    <svg {...base} width={size || base.width} height={size || base.height} className={className} aria-hidden="true" {...rest}>
      {p}
    </svg>
  )
}
