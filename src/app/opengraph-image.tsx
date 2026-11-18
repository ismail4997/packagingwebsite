import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PACKNEXT — Packaging that moves your brand forward";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eee6",
          color: "#161410",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>PACKNEXT</div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 0.95, maxWidth: 860 }}>
          Packaging that moves your brand forward.
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8d6a3f" }}>Custom packaging · Pakistan</div>
      </div>
    ),
    size,
  );
}
