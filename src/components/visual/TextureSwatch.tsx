import { getMaterial } from "@/lib/data/materials";

export function TextureSwatch({ materialId, className = "" }: { materialId: string; className?: string }) {
  const material = getMaterial(materialId);
  const face = material?.colors.face ?? "#f7f4ee";
  const ink = material?.colors.ink ?? "#161410";
  const fluted = materialId === "corrugated";
  const kraft = materialId === "kraft";
  const rigid = materialId === "rigid";

  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label={`${material?.name ?? "Material"} texture preview`}>
      <defs>
        <pattern id={`${materialId}-grain`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.8" fill={ink} opacity={kraft ? 0.18 : 0.07} />
          <circle cx="11" cy="12" r="0.7" fill={ink} opacity={kraft ? 0.12 : 0.05} />
        </pattern>
        <pattern id={`${materialId}-lines`} width="8" height="20" patternUnits="userSpaceOnUse">
          <path d="M2 0 v20" stroke={ink} strokeOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="400" height="280" fill={face} />
      <rect width="400" height="280" fill={`url(#${materialId}-grain)`} />
      {fluted ? <rect width="400" height="280" fill={`url(#${materialId}-lines)`} /> : null}
      {rigid ? <rect x="24" y="24" width="352" height="232" fill="none" stroke={ink} strokeOpacity="0.25" /> : null}
      {materialId === "coated" || materialId === "art-paper" ? (
        <path d="M0 0 L180 0 L0 140 Z" fill="#fff" opacity="0.35" />
      ) : null}
    </svg>
  );
}
