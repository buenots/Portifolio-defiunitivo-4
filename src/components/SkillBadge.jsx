import { useRef } from "react";
import { C } from "../constants";
import {
  Box, Globe, Gamepad2, Sparkles, Server,
  Cpu, Joystick, FileCode2
} from "lucide-react";const SKILL_ICONS = {
  "Three.js / WebGL": Globe,
  "React / Next.js": Box,
  "Unity / C#": Gamepad2,
  "GSAP / Animação": Sparkles,
  "Node.js / APIs": Server,
  "GLSL / Shaders": Cpu,
  "Godot / GDScript": Joystick,
  "TypeScript": FileCode2,
};

export function SkillBadge({ name, level, color, delay }) {
  const ref = useRef();
  const cColor = color || C.neon;
  const Icon = SKILL_ICONS[name] || Box;

  return (
    <div
      ref={ref}
      className="skill-badge-item"
      style={{
        padding: "16px 24px",
        border: `1px solid ${cColor}30`,
        borderRadius: "0px",
        background: `linear-gradient(135deg, ${cColor}08, transparent)`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "16px",
        transition: "all 0.3s ease",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cColor}80`;
        e.currentTarget.style.background = `linear-gradient(135deg, ${cColor}15, transparent)`;
        e.currentTarget.style.transform = "translateX(6px)";
        e.currentTarget.style.boxShadow = `0 0 20px ${cColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${cColor}30`;
        e.currentTarget.style.background = `linear-gradient(135deg, ${cColor}08, transparent)`;
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Icon size={16} color={cColor} strokeWidth={1.5} />
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "12px", letterSpacing: "0.1em",
          color: C.text, textTransform: "uppercase",
        }}>{name}</span>
      </div>
      <div style={{ width: "80px", height: "2px", background: "#ffffff10", borderRadius: "2px" }}>
        <div style={{
          height: "100%", width: `${level}%`,
          background: `linear-gradient(90deg, ${cColor}, ${cColor}aa)`,
          boxShadow: `0 0 8px ${cColor}`,
          borderRadius: "2px",
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}
