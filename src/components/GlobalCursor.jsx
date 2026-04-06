import { useEffect, useRef } from "react";

export function GlobalCursor() {
  const canvasRef = useRef();
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });
  const angle = useRef(0);
  const raf = useRef();
  const SIZE = 28;

  

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.22;
      cur.current.y += (pos.current.y - cur.current.y) * 0.22;
      angle.current += 0.06;

      const t = angle.current;
      const cx = SIZE / 2;
      const cy = SIZE / 2;

      ctx.clearRect(0, 0, SIZE, SIZE);

      const grd = ctx.createRadialGradient(cx, cy, 1, cx, cy, SIZE / 2);
      grd.addColorStop(0, "rgba(0,255,231,0.18)");
      grd.addColorStop(1, "rgba(0,255,231,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, SIZE / 2, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      const core = ctx.createRadialGradient(cx - 1, cy - 1, 0, cx, cy, 4.5);
      core.addColorStop(0, "#ffffff");
      core.addColorStop(0.4, "#00ffe7");
      core.addColorStop(1, "#00ffe790");
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.shadowColor = "#00ffe7";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t);
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 5, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#00ffe7cc";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(11, 0, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffe7";
      ctx.shadowColor = "#00ffe7";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.7);
      ctx.beginPath();
      ctx.ellipse(0, 0, 9, 3.5, 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = "#7c3aed99";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(9 * Math.cos(0), 3.5 * Math.sin(0), 0.9, 0, Math.PI * 2);
      ctx.fillStyle = "#7c3aed";
      ctx.shadowColor = "#7c3aed";
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      canvas.style.left = cur.current.x - SIZE / 2 + "px";
      canvas.style.top  = cur.current.y - SIZE / 2 + "px";

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        imageRendering: "pixelated",
      }}
    />
  );
}
