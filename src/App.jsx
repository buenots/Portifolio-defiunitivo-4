import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { C } from "./constants";
import { GlobalCursor } from "./components/GlobalCursor";
import { FluidBlob } from "./components/FluidBlob";
import { FloatingGeometry } from "./components/FloatingGeometry";
import { FloatingCrystals } from "./components/FloatingCrystals";
import { BackgroundScene } from "./components/BackgroundScene";
import { SkillParticles } from "./components/SkillParticles";
import { NeonBtn } from "./components/NeonBtn";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
import { SkillBadge } from "./components/SkillBadge";
import { EnergyRing } from "./components/EnergyRing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function BrunoDevPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const heroWrapperRef = useRef();
  const heroTitleRef = useRef();
  const heroSubRef = useRef();
  const heroCTARef = useRef();
  const navRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', (e) => {
      setScrollY(window.scrollY);
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(heroTitleRef.current, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" })
      .fromTo(heroSubRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=1")
      .fromTo(heroCTARef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.8");

    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power4.out" });

    gsap.to(heroWrapperRef.current, {
      y: 200,
      scale: 0.9,
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.fromTo(".about-word",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.02,
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );

    gsap.fromTo(".about-stat",
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1,
        scrollTrigger: {
          trigger: "#about",
          start: "top 60%",
          end: "center center",
          scrub: 1,
        }
      }
    );

    const cards = gsap.utils.toArray(".project-card-container");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 150, opacity: 0.2 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          }
        }
      );
    });

    gsap.fromTo(".skill-badge-item",
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      }
    );

    const sections = ["hero", "about", "projects", "skills", "contact"];
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const projects = [
    { title: "NEON_ARENA", tags: ["Unity", "C#", "GLSL"], desc: "Battle royale tático com shaders procedurais e sistema de física customizado.", color: C.neon, url: "https://neon-arena.itch.io", github: "https://github.com/bruno/neon-arena" },
    { title: "CYBER_DASH", tags: ["Godot", "GDScript", "WebGL"], desc: "Runner infinito cyberpunk exportado para web com WebAssembly.", color: "#7c3aed", url: "https://cyber-dash.vercel.app" },
    { title: "STELLAR_UI", tags: ["React", "Three.js", "GSAP"], desc: "Design system com componentes 3D interativos para dashboards focados.", color: "#2563eb", github: "https://github.com/bruno/stellar-ui" },
    { title: "VOID_NET", tags: ["Node.js", "WebSocket", "Canvas"], desc: "Plataforma multiplayer real-time com engine de colisão extrema.", color: "#f59e0b" },
  ];

  const skills = [
    { name: "Three.js / WebGL", level: 90, color: C.neon },
    { name: "React / Next.js", level: 88, color: "#2563eb" },
    { name: "Unity / C#", level: 85, color: "#7c3aed" },
    { name: "GSAP / Animação", level: 82, color: C.neon },
    { name: "Node.js / APIs", level: 80, color: "#10b981" },
    { name: "GLSL / Shaders", level: 75, color: "#f59e0b" },
    { name: "Godot / GDScript", level: 72, color: "#7c3aed" },
    { name: "TypeScript", level: 78, color: "#2563eb" },
  ];

  const navLinks = ["about", "projects", "skills", "contact"];

  const aboutWords = "Construo experiências digitais que vivem na interseção entre arte e engenharia. Cada linha de código é coreografada para criar impacto, fluidez e imersão total.".split(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }
        body { background: ${C.bg}; color: ${C.text}; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.neon}40; border-radius: 2px; }
        ::selection { background: ${C.neon}30; }
        * { cursor: none !important; }
        @media (max-width: 768px) { * { cursor: auto !important; } }
      `}</style>

      <GlobalCursor />

      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: "20px clamp(24px, 6vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 50 ? `${C.bg}e0` : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? `1px solid #ffffff08` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "15px",
          color: C.neon, letterSpacing: "0.15em",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ color: C.muted }}>//</span> BRUNO.DEV
        </div>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a key={link} href={`#${link}`} style={{
              fontFamily: "'Space Mono', monospace", fontSize: "11px",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: activeSection === link ? C.neon : C.muted,
              textDecoration: "none",
              transition: "color 0.3s ease",
              position: "relative",
            }}
              onMouseEnter={(e) => e.target.style.color = C.neon}
              onMouseLeave={(e) => e.target.style.color = activeSection === link ? C.neon : C.muted}
            >
              {link}
            </a>
          ))}
          <NeonBtn href="#contact">Contratar</NeonBtn>
        </div>
      </nav>

      <Section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <Canvas eventSource={typeof window !== 'undefined' ? document.body : undefined} camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
            <FluidBlob />
          </Canvas>
        </div>

        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `radial-gradient(ellipse 60% 80% at 60% 50%, transparent 30%, ${C.bg} 100%)`,
        }} />

        <div ref={heroWrapperRef} style={{
          position: "relative", zIndex: 2,
          padding: "0 clamp(24px, 8vw, 120px)",
          maxWidth: "800px",
          width: "100%",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "11px",
            color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px",
          }}>
            <span style={{ width: "32px", height: "1px", background: C.neon, boxShadow: `0 0 8px ${C.neon}` }} />
            DESENVOLVEDOR • GAME DEV • WEB
          </div>

          <h1 ref={heroTitleRef} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(72px, 14vw, 180px)",
            lineHeight: "0.9",
            letterSpacing: "0.02em",
            color: C.text,
            marginBottom: "8px",
            opacity: 0,
          }}>
            BRUNO<br />
            <span style={{
              WebkitTextStroke: `2px ${C.neon}`,
              color: "transparent",
              textShadow: `0 0 40px ${C.neon}40`,
            }}>DEV</span>
          </h1>

          <p ref={heroSubRef} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            color: C.muted, lineHeight: "1.7",
            maxWidth: "480px", marginTop: "28px", marginBottom: "48px",
            opacity: 0,
          }}>
            Desenvolvedor focado em <span style={{ color: C.neon }}>jogos e web</span> — transformando ideias em experiências imersivas que desafiam os limites do browser.
          </p>

          <div ref={heroCTARef} style={{ display: "flex", gap: "16px", flexWrap: "wrap", opacity: 0 }}>
            <NeonBtn href="#projects">Ver Projetos</NeonBtn>
            <NeonBtn href="#contact" outline>Entre em Contato</NeonBtn>
          </div>
        </div>
      </Section>

      <Section id="about">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative" }}>

          <div style={{ position: "absolute", right: "0%", top: "0%", width: "100%", height: "100%", zIndex: 0, opacity: 0.2, pointerEvents: "none", filter: "blur(2px)" }}>
            <Canvas eventSource={typeof window !== 'undefined' ? document.body : undefined} camera={{ position: [0, 0, 10], fov: 45 }}>
              <FloatingGeometry />
            </Canvas>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "center", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: "10px",
                color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
                marginBottom: "16px",
              }}>01 / SOBRE</div>

              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(48px, 7vw, 96px)",
                lineHeight: "0.95", color: C.text,
                marginBottom: "48px", letterSpacing: "0.02em",
              }}>QUEM<br />SOU EU</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {[
                  { n: "5+", l: "Anos de XP" },
                  { n: "20+", l: "Projetos" },
                  { n: "8", l: "Jogos Lançados" },
                  { n: "100%", l: "Dedicação" },
                ].map((s) => (
                  <div key={s.l} className="about-stat" style={{
                    borderTop: `1px solid ${C.neon}30`,
                    paddingTop: "16px",
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "48px", color: C.neon, lineHeight: 1,
                      textShadow: `0 0 20px ${C.neon}60`,
                    }}>{s.n}</div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px", color: C.muted, letterSpacing: "0.15em",
                      textTransform: "uppercase", marginTop: "4px",
                    }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                lineHeight: "1.7", color: C.text,
              }}>
                {aboutWords.map((w, i) => (
                  <span key={i} className="about-word" style={{ display: "inline-block", marginRight: "6px", opacity: 0 }}>
                    {w}
                  </span>
                ))}
              </p>

              <div style={{ marginTop: "40px", padding: "24px", border: `1px solid ${C.neon}20`, background: `${C.neon}05` }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: C.neon, marginBottom: "8px" }}>
                  <span style={{ color: C.muted }}>const</span> focus = [
                </div>
                {["'Game Development'", "'Web 3D Experiences'", "'Real-time Graphics'", "'Creative Coding'"].map((f, i) => (
                  <div key={i} style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "11px",
                    color: "#e2e8f0", paddingLeft: "20px",
                  }}>{f},</div>
                ))}
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: C.neon }}>];</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" style={{ background: `linear-gradient(180deg, ${C.bg}, ${C.surface}, ${C.bg})` }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: "none" }}>
          <Canvas eventSource={typeof window !== 'undefined' ? document.body : undefined} camera={{ position: [0, 0, 10], fov: 75 }}>
            <FloatingCrystals />
          </Canvas>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "72px" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px",
              color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
              marginBottom: "16px",
            }}>02 / PROJETOS</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: "0.95", color: C.text, letterSpacing: "0.02em",
            }}>TRABALHOS<br /><span style={{ WebkitTextStroke: `2px ${C.neon}`, color: "transparent" }}>SELECIONADOS</span></h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "20px",
          }}>
            {projects.map((p, i) => (
              <div key={p.title} className="project-card-container">
                <ProjectCard {...p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: "10px",
                color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
                marginBottom: "16px",
              }}>03 / SKILLS</div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(48px, 7vw, 96px)",
                lineHeight: "0.95", color: C.text, letterSpacing: "0.02em",
                marginBottom: "40px",
              }}>STACK<br /><span style={{ WebkitTextStroke: `2px ${C.neon}`, color: "transparent" }}>TÉCNICA</span></h2>

              <div style={{ height: "300px", borderRadius: "2px", overflow: "hidden", border: `1px solid ${C.neon}15`, pointerEvents: "none" }}>
                <Canvas eventSource={typeof window !== 'undefined' ? document.body : undefined} camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.1} />
                  <pointLight color={C.neon} intensity={4} position={[3, 3, 3]} />
                  <pointLight color="#7c3aed" intensity={3} position={[-3, -3, 2]} />
                  <SkillParticles />
                </Canvas>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "80px" }}>
              {skills.map((s, i) => (
                <div key={s.name} className="skill-badge-item">
                  <SkillBadge {...s} delay={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" style={{ background: C.surface, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: "none" }}>
          <Canvas eventSource={typeof window !== 'undefined' ? document.body : undefined} camera={{ position: [0, 0, 8], fov: 50 }}>
            <EnergyRing />
          </Canvas>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", textAlign: "center", position: "relative", zIndex: 1 }} className="contact-inner">
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px",
            color: C.neon, letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: "16px",
          }}>04 / CONTATO</div>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 9vw, 120px)",
            lineHeight: "0.9", color: C.text, letterSpacing: "0.02em",
            marginBottom: "24px",
          }}>
            VAMOS<br />
            <span style={{ WebkitTextStroke: `2px ${C.neon}`, color: "transparent", textShadow: `0 0 60px ${C.neon}30` }}>
              CRIAR
            </span>
            <br />ALGO
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
            color: C.muted, marginBottom: "56px", maxWidth: "400px", margin: "0 auto 56px",
          }}>
            Aberto para projetos freelance, colaborações e posições CLT/PJ.
          </p>

          <form
            action="https://formsubmit.co/bruno.gustavo@nave.org.br"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}
          >
            <input type="hidden" name="_subject" value="Nova mensagem do Portfólio BRUNO.DEV" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />

            <input name="nome" type="text" placeholder="Seu nome" required style={{
              background: "transparent",
              border: `1px solid #ffffff15`,
              padding: "16px 20px",
              color: C.text,
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              outline: "none",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
              onFocus={(e) => {
                e.target.style.borderColor = `${C.neon}60`;
                e.target.style.boxShadow = `0 0 20px ${C.neon}10`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ffffff15";
                e.target.style.boxShadow = "none";
              }}
            />
            <input name="email" type="email" placeholder="seu@email.com" required style={{
              background: "transparent",
              border: `1px solid #ffffff15`,
              padding: "16px 20px",
              color: C.text,
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              outline: "none",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
              onFocus={(e) => {
                e.target.style.borderColor = `${C.neon}60`;
                e.target.style.boxShadow = `0 0 20px ${C.neon}10`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ffffff15";
                e.target.style.boxShadow = "none";
              }}
            />
            <textarea name="mensagem" placeholder="Sua mensagem..." rows={5} required style={{
              background: "transparent",
              border: `1px solid #ffffff15`,
              padding: "16px 20px",
              color: C.text,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              outline: "none",
              resize: "none",
              transition: "border-color 0.3s ease",
            }}
              onFocus={(e) => { e.target.style.borderColor = `${C.neon}60`; }}
              onBlur={(e) => { e.target.style.borderColor = "#ffffff15"; }}
            />

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button type="submit" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px",
                border: "none",
                background: `linear-gradient(135deg, #00ffe740, #00ffe715)`,
                color: C.neon,
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px", letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${C.neon}22`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${C.neon}60, inset 0 0 20px ${C.neon}10`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, #00ffe740, #00ffe715)`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Enviar Mensagem ↗
              </button>
            </div>
          </form>

          <div style={{
            marginTop: "64px", paddingTop: "40px",
            borderTop: `1px solid #ffffff08`,
            display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap",
          }}>
            {["GitHub", "LinkedIn", "Twitter", "Itch.io"].map((s) => (
              <a key={s} href="#" style={{
                fontFamily: "'Space Mono', monospace", fontSize: "11px",
                color: C.muted, textDecoration: "none",
                letterSpacing: "0.15em", textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
                onMouseEnter={(e) => e.target.style.color = C.neon}
                onMouseLeave={(e) => e.target.style.color = C.muted}
              >{s}</a>
            ))}
          </div>
        </div>
      </Section>

      <footer style={{
        padding: "24px clamp(24px, 6vw, 80px)",
        borderTop: `1px solid #ffffff08`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.muted }}>
          © 2025 BRUNO.DEV
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.muted }}>
          CRAFTED WITH <span style={{ color: C.neon }}>THREE.JS</span> + <span style={{ color: "#7c3aed" }}>GSAP</span>
        </span>
      </footer>
    </>
  );
}