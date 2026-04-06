import { useRef, useState } from "react";
import { C } from "../constants";
import { ExternalLink, Code2 } from "lucide-react";

export function ProjectCard({ title, tags, desc, color, index, url, github }) {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    setHovered(false);
  };

  const cColor = color || C.neon;
  const hasLinks = url || github;

  return (
    <div
      className={`project-card-container project-card-${index}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(135deg, #060d1490, #0a1628aa)",
        border: `1px solid ${hovered ? cColor : "#ffffff12"}`,
        borderRadius: "2px",
        padding: "36px",
        cursor: "pointer",
        transition: "transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? `0 20px 60px ${cColor}25, 0 0 0 1px ${cColor}30` : "0 4px 24px #00000060",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "60px", height: "60px",
        background: `linear-gradient(225deg, ${cColor}30, transparent)`,
        clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{
          width: "36px", height: "3px",
          background: cColor,
          boxShadow: `0 0 12px ${cColor}`,
          transition: "width 0.3s ease",
          ...(hovered ? { width: "60px" } : {}),
        }} />
        {hasLinks && (
          <div style={{ display: "flex", gap: "8px", position: "relative", zIndex: 3 }}>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "32px", height: "32px",
                  border: `1px solid ${cColor}40`,
                  background: `${cColor}08`,
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${cColor}25`;
                  e.currentTarget.style.borderColor = cColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${cColor}08`;
                  e.currentTarget.style.borderColor = `${cColor}40`;
                }}
              >
                <ExternalLink size={14} color={cColor} />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "32px", height: "32px",
                  border: "1px solid #ffffff20",
                  background: "transparent",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff10";
                  e.currentTarget.style.borderColor = "#ffffff50";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#ffffff20";
                }}
              >
                <Code2 size={14} color={C.muted} />
              </a>
            )}
          </div>
        )}
      </div>

      <h3 style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "clamp(16px, 2vw, 20px)",
        color: C.text, marginBottom: "12px", letterSpacing: "0.05em",
      }}>{title}</h3>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px", color: C.muted, lineHeight: "1.7", marginBottom: "20px",
      }}>{desc}</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
        {tags.map((t) => (
          <span key={t} style={{
            padding: "4px 12px",
            border: `1px solid ${cColor}40`,
            color: cColor,
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px", letterSpacing: "0.1em",
            background: `${cColor}10`,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
