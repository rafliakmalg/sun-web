export type ChartPoint = {
  label: string
  value: number
}

type Props = {
  data: ChartPoint[]
}

const width = 420
const height = 190
const top = 22
const bottom = 26
const gap = 14

export function BarChartMolecule({ data }: Props) {
  const largest = Math.max(...data.map((point) => point.value), 1)
  const barWidth = (width - gap * (data.length + 1)) / data.length
  const plotHeight = height - top - bottom

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-100"
      role="img"
    >
      <line
        x1={0}
        x2={width}
        y1={height - bottom}
        y2={height - bottom}
        stroke="var(--bs-border-color)"
      />
      {data.map((point, index) => {
        const barHeight = Math.max((point.value / largest) * plotHeight, point.value > 0 ? 4 : 0)
        const x = gap + index * (barWidth + gap)
        const isLast = index === data.length - 1

        return (
          <g key={point.label + index}>
            <rect
              x={x}
              y={height - bottom - barHeight}
              width={barWidth}
              height={barHeight}
              rx={6}
              fill={isLast ? 'var(--bs-primary)' : 'var(--bs-primary-border-subtle)'}
            />
            <text
              x={x + barWidth / 2}
              y={height - bottom - barHeight - 6}
              textAnchor="middle"
              fontSize={12}
              fill="var(--bs-secondary-color)"
            >
              {point.value}
            </text>
            <text
              x={x + barWidth / 2}
              y={height - 8}
              textAnchor="middle"
              fontSize={12}
              fill="var(--bs-secondary-color)"
            >
              {point.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
