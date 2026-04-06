import { useEffect, useRef } from "react";

export function GlobalCursor() {
  const canvasRef = useRef();
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });
  const angle = useRef(0);
  const raf = useRef();
  
  const isHovered = useRef(false);
  const curSize = useRef(1);
  const spinSpeed = useRef(0.06);

  const CANVAS_SIZE = 80;

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        isHovered.current = true;
      } else {
        isHovered.current = false;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onMouseDown = () => { curSize.current = 0.5; };
    window.addEventListener("mousedown", onMouseDown);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.22;
      cur.current.y += (pos.current.y - cur.current.y) * 0.22;
      
      const targetSize = isHovered.current ? 1.8 : 1;
      curSize.current += (targetSize - curSize.current) * 0.15;

      const targetSpeed = isHovered.current ? 0.12 : 0.05;
      spinSpeed.current += (targetSpeed - spinSpeed.current) * 0.1;

      angle.current += spinSpeed.current;

      const t = angle.current;
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      const s = curSize.current;

      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const grd = ctx.createRadialGradient(cx, cy, 1, cx, cy, 14 * s);
      grd.addColorStop(0, "rgba(0,255,231,0.2)");
      grd.addColorStop(1, "rgba(0,255,231,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * s, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      const core = ctx.createRadialGradient(cx - 1, cy - 1, 0, cx, cy, 4.5);
      core.addColorStop(0, "#ffffff");
      core.addColorStop(0.4, "#00ffe7");
      core.addColorStop(1, "#00ffe790");
      ctx.beginPath();
      // O núcleo encolhe quando focado
      ctx.arc(cx, cy, Math.max(0.5, 4.5 * (1.8 - s)), 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.shadowColor = "#00ffe7";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t);
      ctx.beginPath();
      ctx.ellipse(0, 0, 11 * s, 5 * s, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#00ffe7cc";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(11 * s, 0, 1.5, 0, Math.PI * 2);
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
      ctx.ellipse(0, 0, 9 * s, 3.5 * s, 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = "#7c3aed99";
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(9 * s * Math.cos(0), 3.5 * s * Math.sin(0), 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#7c3aed";
      ctx.shadowColor = "#7c3aed";
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      if (s > 1.1) {
         ctx.save();
         ctx.translate(cx, cy);
         ctx.rotate(t * 0.5);
         ctx.strokeStyle = `rgba(0, 255, 231, ${(s - 1) * 0.8})`;
         ctx.lineWidth = 1.5;
         const arch = 0.4;
         const r = 18 * s;
         
         for(let i=0; i<4; i++) {
           ctx.beginPath();
           ctx.arc(0, 0, r, i * (Math.PI/2), i * (Math.PI/2) + arch);
           ctx.stroke();
         }
         ctx.restore();
      }

      canvas.style.left = cur.current.x - CANVAS_SIZE / 2 + "px";
      canvas.style.top  = cur.current.y - CANVAS_SIZE / 2 + "px";

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "screen",
      }}
    />
  );
}
