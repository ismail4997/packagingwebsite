import { useId } from "react";
import { getMaterial } from "@/lib/data/materials";
import type { PackShape } from "@/lib/data/catalog";

type PackShotProps = {
  shape?: PackShape;
  material?: string;
  brand?: string;
  className?: string;
  label?: string;
  decorative?: boolean;
  windowed?: boolean;
};

export function PackShot({
  shape = "carton",
  material = "bleach-card",
  brand = "#c4452d",
  className = "",
  label = "Illustrated packaging",
  decorative = false,
  windowed = false,
}: PackShotProps) {
  const uid = useId().replace(/:/g, "");
  const swatch = getMaterial(material)?.colors ?? {
    face: "#F7F4EE",
    side: "#E4DDD2",
    top: "#FFFcf8",
    ink: "#161410",
  };
  const showWindow = windowed || shape === "bakery" || shape === "food";

  return (
    <svg
      viewBox="0 0 640 720"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
    >
      <defs>
        <pattern id={`${uid}-fiber`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="0.7" fill={swatch.ink} opacity="0.08" />
          <circle cx="11" cy="12" r="0.6" fill={swatch.ink} opacity="0.06" />
        </pattern>
        <pattern id={`${uid}-flute`} width="10" height="12" patternUnits="userSpaceOnUse">
          <path d="M1 0 v12" stroke={swatch.ink} strokeOpacity="0.16" />
        </pattern>
        <linearGradient id={`${uid}-sheen`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="640" rx="180" ry="28" fill="#161410" opacity="0.08" />
      {shape === "bag" || shape === "paperbag" ? (
        <Bag uid={uid} swatch={swatch} brand={brand} compact={shape === "paperbag"} />
      ) : shape === "label" ? (
        <LabelSheet swatch={swatch} brand={brand} ink={swatch.ink} />
      ) : shape === "sticker" ? (
        <Sticker swatch={swatch} brand={brand} />
      ) : shape === "tag" ? (
        <Tag swatch={swatch} brand={brand} ink={swatch.ink} />
      ) : (
        <IsoBox
          swatch={swatch}
          brand={brand}
          uid={uid}
          windowed={showWindow}
          rigid={shape === "rigid"}
          tall={shape === "cosmetic"}
          fluted={material === "corrugated" || shape === "industrial" || shape === "hardware" || shape === "machinery"}
          tape={shape === "industrial" || shape === "machinery"}
        />
      )}
    </svg>
  );
}

function IsoBox({
  swatch,
  brand,
  uid,
  windowed,
  rigid,
  tall,
  fluted,
  tape,
}: {
  swatch: { face: string; side: string; top: string; ink: string };
  brand: string;
  uid: string;
  windowed: boolean;
  rigid: boolean;
  tall: boolean;
  fluted: boolean;
  tape: boolean;
}) {
  const transform = tall ? "translate(70 10) scale(0.82 1.08)" : rigid ? "translate(20 30) scale(0.94)" : undefined;
  return (
    <g transform={transform}>
      {rigid ? (
        <g transform="translate(36 -28)">
          <polygon points="150,150 250,98 370,150 270,202" fill={swatch.top} />
          <polygon points="150,150 270,202 270,248 150,196" fill={swatch.side} />
          <polygon points="270,202 370,150 370,196 270,248" fill={swatch.face} />
          <polygon points="300,214 350,190 350,214 300,238" fill={brand} />
        </g>
      ) : null}
      <polygon points="150,210 270,146 430,214 310,280" fill={swatch.top} />
      <polygon points="150,210 310,280 310,500 150,430" fill={swatch.side} />
      <polygon points="310,280 430,214 430,434 310,500" fill={swatch.face} />
      <polygon points="150,210 270,146 430,214 310,280" fill={`url(#${uid}-sheen)`} />
      {fluted ? <polygon points="310,280 430,214 430,434 310,500" fill={`url(#${uid}-flute)`} /> : null}
      <polygon points="150,210 310,280 310,500 150,430" fill={`url(#${uid}-fiber)`} opacity="0.45" />
      {windowed ? (
        <polygon points="338,330 400,300 400,390 338,420" fill="#d5e4e4" stroke={swatch.ink} strokeOpacity="0.25" />
      ) : (
        <polygon points="336,340 404,306 404,372 336,406" fill={brand} />
      )}
      {tape ? <polygon points="292,250 328,232 328,470 292,488" fill={swatch.ink} opacity="0.18" /> : null}
      <path d="M168 250 h46" stroke={brand} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
    </g>
  );
}

function Bag({
  uid,
  swatch,
  brand,
  compact,
}: {
  uid: string;
  swatch: { face: string; side: string; top: string; ink: string };
  brand: string;
  compact: boolean;
}) {
  const width = compact ? 250 : 300;
  const x = (640 - width) / 2;
  return (
    <g>
      <path
        d={`M${x + 34} 250 C ${x + 70} 150, ${x + width - 70} 150, ${x + width - 34} 250`}
        fill="none"
        stroke={swatch.ink}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d={`M${x} 230 h${width} l-24 360 h-${width - 48} z`}
        fill={swatch.face}
        stroke={swatch.ink}
        strokeOpacity="0.2"
      />
      <path d={`M${x} 230 h${width} l-24 360 h-${width - 48} z`} fill={`url(#${uid}-fiber)`} />
      <path d={`M${x + 40} 430 h${width - 90}`} stroke={brand} strokeWidth="28" strokeLinecap="round" />
      <path d={`M${x + 18} 560 h${width - 48}`} stroke={swatch.ink} strokeOpacity="0.15" strokeWidth="8" />
      <rect x={x + 48} y="470" width={width * 0.45} height="10" fill={swatch.ink} opacity="0.35" />
      <rect x={x + 48} y="492" width={width * 0.28} height="8" fill={swatch.ink} opacity="0.2" />
    </g>
  );
}

function LabelSheet({
  swatch,
  brand,
  ink,
}: {
  swatch: { face: string; side: string; top: string; ink: string };
  brand: string;
  ink: string;
}) {
  return (
    <g>
      <path d="M120 150 h20 M120 150 v20 M520 150 h-20 M520 150 v20 M120 570 h20 M120 570 v-20 M520 570 h-20 M520 570 v-20" stroke={ink} strokeOpacity="0.35" fill="none" />
      <rect x="150" y="180" width="340" height="360" rx="18" fill={swatch.face} stroke={ink} strokeOpacity="0.15" />
      <rect x="182" y="220" width="120" height="18" fill={brand} />
      <rect x="182" y="260" width="210" height="8" fill={ink} opacity="0.35" />
      <rect x="182" y="280" width="170" height="8" fill={ink} opacity="0.2" />
      <rect x="182" y="360" width="276" height="110" fill={swatch.side} />
      <text x="182" y="430" fill={ink} fontSize="28" fontFamily="Georgia, serif">
        MARK
      </text>
    </g>
  );
}

function Sticker({
  swatch,
  brand,
}: {
  swatch: { face: string; side: string; top: string; ink: string };
  brand: string;
}) {
  return (
    <g>
      <circle cx="320" cy="360" r="168" fill="none" stroke={swatch.ink} strokeDasharray="8 10" strokeOpacity="0.35" />
      <circle cx="320" cy="360" r="140" fill={swatch.face} stroke={swatch.ink} strokeOpacity="0.15" />
      <circle cx="320" cy="360" r="92" fill={brand} />
      <circle cx="320" cy="360" r="58" fill={swatch.top} />
    </g>
  );
}

function Tag({
  swatch,
  brand,
  ink,
}: {
  swatch: { face: string; side: string; top: string; ink: string };
  brand: string;
  ink: string;
}) {
  return (
    <g>
      <rect x="210" y="150" width="220" height="420" rx="16" fill={swatch.face} stroke={ink} strokeOpacity="0.18" />
      <circle cx="320" cy="214" r="18" fill={swatch.top} stroke={ink} strokeOpacity="0.3" />
      <rect x="250" y="280" width="140" height="16" fill={brand} />
      <rect x="250" y="320" width="110" height="8" fill={ink} opacity="0.3" />
      <rect x="250" y="342" width="86" height="8" fill={ink} opacity="0.18" />
    </g>
  );
}
