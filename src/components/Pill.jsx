const cls = {
  green: 'pill pill-green',
  gold: 'pill pill-gold',
  red: 'pill pill-red',
  gray: 'pill pill-gray',
}

export default function Pill({ tone = 'gray', children }) {
  return <span className={cls[tone] || cls.gray}>{children}</span>
}
