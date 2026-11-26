interface IllustrationCheckMarkProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
}

/** White check stroke drawn inside the SVG illustrations. */
export function IllustrationCheckMark({
  x,
  y,
  scale = 1,
  color = "#fff",
}: IllustrationCheckMarkProps) {
  return (
    <path
      d={`M${x} ${y}l${6 * scale} ${6 * scale} ${12 * scale}-${12 * scale}`}
      stroke={color}
      strokeWidth={3.4 * scale}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
