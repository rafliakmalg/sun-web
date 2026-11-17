import type { ChartPoint } from '@/components/molecules/BarChartMolecule'
import { formatNumber } from '@/utils'

type Props = {
  data: ChartPoint[]
}

const colors = [
  'var(--bs-primary)',
  'var(--bs-success)',
  'var(--bs-warning)',
  'var(--bs-info)',
  'var(--bs-danger)',
  'var(--bs-secondary)',
]

const size = 150
const stroke = 22
const radius = (size - stroke) / 2
const circumference = 2 * Math.PI * radius

export function DonutChartMolecule({ data }: Props) {
  const total = data.reduce((sum, point) => sum + point.value, 0)
  const lengths = data.map((point) => (total > 0 ? (point.value / total) * circumference : 0))

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bs-tertiary-bg)"
          strokeWidth={stroke}
        />
        {data.map((point, index) => (
          <circle
            key={point.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors[index % colors.length]}
            strokeWidth={stroke}
            strokeDasharray={`${lengths[index]} ${circumference - lengths[index]}`}
            strokeDashoffset={-lengths.slice(0, index).reduce((sum, length) => sum + length, 0)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ))}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={18}
          fontWeight={700}
          fill="var(--bs-body-color)"
        >
          {formatNumber(total)}
        </text>
      </svg>
      <ul className="list-unstyled small mb-0">
        {data.map((point, index) => (
          <li key={point.label} className="d-flex align-items-center gap-2 mb-1">
            <span
              className="legend-dot"
              style={{ background: colors[index % colors.length] }}
            />
            <span>{point.label}</span>
            <span className="text-muted ms-auto ps-2">{total > 0 ? Math.round((point.value / total) * 100) : 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
