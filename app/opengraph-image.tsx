import { ImageResponse } from "next/og";
import { copy } from "@/content/copy";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = copy.pt.meta.title;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05080a",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(61,232,192,0.22), transparent 55%), radial-gradient(circle at 20% 90%, rgba(42,169,216,0.16), transparent 55%)",
          padding: 72,
          color: "#e6f0ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#8fa6a2" }}>{profile.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
            {copy.pt.hero.titleLines[0]}
          </div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, letterSpacing: -2, color: "#3de8c0" }}>
            {copy.pt.hero.titleLines[1]}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8fa6a2", maxWidth: 900 }}>
          {copy.pt.hero.sub}
        </div>
      </div>
    ),
    size,
  );
}
