import { useState, useEffect, useCallback, useRef } from "react";
import {
  CARDS,
  SPREAD_TYPES,
  CATEGORIES,
  drawCards,
  type LenormandCard,
  type SpreadType,
  type Category,
} from "./data/cards";
import { interpret, type ReadingAnalysis, type ReadingDepth } from "./engine/interpreter";

type Screen =
  | "home"
  | "question"
  | "spread"
  | "shuffle"
  | "reveal"
  | "reading"
  | "upsell"
  | "history"
  | "offers";

type ShufflePhase = "concentrating" | "shuffling" | "ready";

interface HistoryEntry {
  id: string;
  date: string;
  question: string;
  spreadType: SpreadType;
  category: Category;
  cards: LenormandCard[];
}

const MOCK_HISTORY: HistoryEntry[] = [
  {
    id: "h1",
    date: "18 set 2026",
    question: "Como posso compreender melhor minha situação profissional?",
    spreadType: 3,
    category: "trabalho",
    cards: [CARDS[14], CARDS[0], CARDS[30]],
  },
  {
    id: "h2",
    date: "12 set 2026",
    question: "Que aspectos devo observar em meu relacionamento atual?",
    spreadType: 1,
    category: "amor",
    cards: [CARDS[23]],
  },
  {
    id: "h3",
    date: "5 set 2026",
    question: "O que preciso considerar sobre minha situação financeira?",
    spreadType: 5,
    category: "dinheiro",
    cards: [CARDS[33], CARDS[14], CARDS[7], CARDS[22], CARDS[30]],
  },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
      <span style={{ color: "#c9a84c", fontSize: "10px", letterSpacing: "4px" }}>✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
    </div>
  );
}

function NavBar({
  onHome,
  onHistory,
  onOffers,
}: {
  onHome: () => void;
  onHistory: () => void;
  onOffers: () => void;
}) {
  return (
    <nav
      style={{ borderBottom: "1px solid #252742", backgroundColor: "rgba(7,8,15,0.95)" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <button
          onClick={onHome}
          className="cursor-pointer"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "13px",
            color: "#c9a84c",
            letterSpacing: "3px",
          }}
        >
          ORÁCULO
        </button>
        <div className="flex items-center gap-6">
          <button
            onClick={onHistory}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              color: "#7a7590",
              letterSpacing: "2px",
            }}
          >
            LEITURAS
          </button>
          <button
            onClick={onOffers}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              color: "#7a7590",
              letterSpacing: "2px",
            }}
          >
            PLANOS
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Card Visual ──────────────────────────────────────────────────────────────

function CardBack({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const dims = {
    sm: { w: 48, h: 68, sym: "12px" },
    md: { w: 72, h: 100, sym: "18px" },
    lg: { w: 110, h: 154, sym: "28px" },
    xl: { w: 140, h: 196, sym: "36px" },
  }[size];

  return (
    <div
      style={{
        width: dims.w,
        height: dims.h,
        background: "linear-gradient(135deg, #161827 0%, #0e101b 50%, #161827 100%)",
        border: "1px solid #c9a84c40",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* corner ornaments */}
      <div style={{ position: "absolute", top: 4, left: 4, color: "#c9a84c40", fontSize: "8px" }}>✦</div>
      <div style={{ position: "absolute", top: 4, right: 4, color: "#c9a84c40", fontSize: "8px" }}>✦</div>
      <div style={{ position: "absolute", bottom: 4, left: 4, color: "#c9a84c40", fontSize: "8px" }}>✦</div>
      <div style={{ position: "absolute", bottom: 4, right: 4, color: "#c9a84c40", fontSize: "8px" }}>✦</div>
      {/* center */}
      <div
        style={{
          width: "60%",
          height: "60%",
          border: "1px solid #c9a84c30",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#c9a84c50", fontSize: dims.sym }}>✦</span>
      </div>
    </div>
  );
}

function CardFront({
  card,
  size = "md",
  focus = false,
}: {
  card: LenormandCard;
  size?: "sm" | "md" | "lg" | "xl";
  focus?: boolean;
}) {
  const dims = {
    sm: { w: 48, h: 68, num: "8px", sym: "18px", name: "7px" },
    md: { w: 72, h: 100, num: "9px", sym: "26px", name: "8px" },
    lg: { w: 110, h: 154, num: "10px", sym: "40px", name: "9px" },
    xl: { w: 140, h: 196, num: "11px", sym: "52px", name: "10px" },
  }[size];

  return (
    <div
      style={{
        width: dims.w,
        height: dims.h,
        background: focus
          ? "linear-gradient(135deg, #1e1a2e 0%, #161222 100%)"
          : "linear-gradient(135deg, #181a2c 0%, #0e101b 100%)",
        border: focus ? "1px solid #c9a84c80" : "1px solid #c9a84c40",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: focus ? "0 0 20px rgba(201,168,76,0.25)" : "none",
      }}
    >
      {/* card number */}
      <div
        style={{
          position: "absolute",
          top: 5,
          left: 6,
          fontFamily: "'Cinzel', serif",
          fontSize: dims.num,
          color: "#c9a84c70",
          lineHeight: 1,
        }}
      >
        {String(card.id).padStart(2, "0")}
      </div>
      {/* symbol */}
      <div style={{ fontSize: dims.sym, color: "#c9a84c", lineHeight: 1, marginBottom: 4 }}>
        {card.symbol}
      </div>
      {/* name */}
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: dims.name,
          color: "#e4dece90",
          letterSpacing: "1px",
          textAlign: "center",
          padding: "0 4px",
          lineHeight: 1.2,
        }}
      >
        {card.name.toUpperCase()}
      </div>
    </div>
  );
}

function FlipCard({
  card,
  revealed,
  onReveal,
  size = "lg",
}: {
  card: LenormandCard;
  revealed: boolean;
  onReveal: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const dims = {
    sm: { w: 48, h: 68 },
    md: { w: 72, h: 100 },
    lg: { w: 110, h: 154 },
    xl: { w: 140, h: 196 },
  }[size];

  return (
    <div
      className="card-scene cursor-pointer"
      style={{ width: dims.w, height: dims.h }}
      onClick={!revealed ? onReveal : undefined}
    >
      <div className={`card-inner ${revealed ? "flipped" : ""}`} style={{ width: dims.w, height: dims.h }}>
        <div className="card-face card-back-face">
          <CardBack size={size} />
        </div>
        <div className="card-face card-front-face">
          <CardFront card={card} size={size} />
        </div>
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function HomeScreen({
  onStart,
  onHistory,
  onOffers,
}: {
  onStart: () => void;
  onHistory: () => void;
  onOffers: () => void;
}) {
  const deckCards = CARDS.slice(0, 5).reverse();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07080f" }}>
      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* starfield */}
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              borderRadius: "50%",
              backgroundColor: "#c9a84c",
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
              opacity: 0.1 + (i % 5) * 0.05,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}

        {/* ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="fade-up fade-up-delay-1" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "6px",
              color: "#c9a84c80",
              marginBottom: "20px",
            }}
          >
            BARALHO CIGANO • LENORMAND
          </p>
          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(48px, 10vw, 96px)",
              color: "#e4dece",
              letterSpacing: "6px",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            ORÁCULO
          </h1>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(13px, 2vw, 16px)",
              color: "#7a7590",
              letterSpacing: "2px",
              maxWidth: 480,
              margin: "0 auto 16px",
              fontWeight: 300,
            }}
          >
            Uma leitura simbólica para iluminar caminhos,
            <br />
            possibilidades e perguntas.
          </p>
        </div>

        {/* Deck visualization */}
        <div className="fade-up fade-up-delay-2" style={{ margin: "48px 0", position: "relative", height: 200, width: 180 }}>
          {deckCards.map((card, i) => (
            <div
              key={card.id}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${(i - 2) * 8}deg) translateY(${(i - 2) * 4}px)`,
                transition: "all 0.3s",
                zIndex: i,
              }}
            >
              <CardBack size="xl" />
            </div>
          ))}
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* CTAs */}
        <div className="fade-up fade-up-delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={onStart}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "3px",
              color: "#07080f",
              backgroundColor: "#c9a84c",
              border: "none",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e8c97a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c9a84c";
            }}
          >
            FAZER UMA LEITURA
          </button>
          <button
            onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "3px",
              color: "#c9a84c",
              backgroundColor: "transparent",
              border: "1px solid #c9a84c40",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c80";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c40";
            }}
          >
            CONHECER O ORÁCULO
          </button>
        </div>
      </section>

      {/* How it works */}
      <section
        id="como-funciona"
        style={{
          padding: "100px 24px",
          borderTop: "1px solid #252742",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#c9a84c60",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          O PROCESSO
        </p>
        <h2
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 4vw, 32px)",
            color: "#e4dece",
            textAlign: "center",
            marginBottom: "64px",
            letterSpacing: "3px",
          }}
        >
          COMO FUNCIONA
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "48px",
          }}
        >
          {[
            { num: "01", title: "FORMULE", desc: "Pense em uma pergunta clara. Quanto mais específica, mais útil a leitura." },
            { num: "02", title: "ESCOLHA", desc: "Selecione o tipo de leitura mais adequado para a sua questão." },
            { num: "03", title: "TIRE", desc: "As cartas são embaralhadas e distribuídas. Concentre-se na sua pergunta." },
            { num: "04", title: "INTERPRETE", desc: "Veja a leitura das cartas em conjunto, considerando posições e combinações." },
          ].map((step) => (
            <div key={step.num} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "32px",
                  color: "#c9a84c20",
                  marginBottom: "16px",
                  lineHeight: 1,
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  color: "#c9a84c",
                  marginBottom: "12px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "13px",
                  color: "#7a7590",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 64 }}>
          <button
            onClick={onStart}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "3px",
              color: "#07080f",
              backgroundColor: "#c9a84c",
              border: "none",
              padding: "14px 40px",
              cursor: "pointer",
            }}
          >
            INICIAR LEITURA
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <footer
        style={{
          borderTop: "1px solid #252742",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "11px",
            color: "#7a7590",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          O Oráculo é uma ferramenta simbólica de reflexão e entretenimento.
          As interpretações não substituem orientação profissional nem determinam acontecimentos futuros.
        </p>
      </footer>
    </div>
  );
}

// ─── Question Screen ───────────────────────────────────────────────────────────

function QuestionScreen({
  question,
  category,
  onQuestion,
  onCategory,
  onContinue,
}: {
  question: string;
  category: Category | null;
  onQuestion: (q: string) => void;
  onCategory: (c: Category) => void;
  onContinue: () => void;
}) {
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  const handleContinue = () => {
    if (!question.trim()) {
      setError("Escreva uma pergunta para iniciar sua leitura.");
      setHint("");
      return;
    }
    if (question.trim().length < 10) {
      setHint("Perguntas mais específicas costumam gerar uma leitura mais útil.");
      setError("");
    } else {
      setError("");
      setHint("");
    }
    onContinue();
  };

  const placeholders = [
    "Como posso compreender melhor minha situação profissional?",
    "Que aspectos devo observar em meu relacionamento?",
    "O que preciso considerar neste momento?",
  ];
  const placeholder = placeholders[Math.floor(Date.now() / 10000) % placeholders.length];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07080f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#c9a84c60",
            marginBottom: "12px",
          }}
        >
          PASSO 1 DE 2
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(24px, 5vw, 40px)",
            color: "#e4dece",
            marginBottom: "8px",
            letterSpacing: "2px",
          }}
        >
          Prepare sua pergunta
        </h1>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "14px",
            color: "#7a7590",
            marginBottom: "40px",
            fontWeight: 300,
          }}
        >
          Sobre o que você deseja orientação?
        </p>

        <textarea
          value={question}
          onChange={(e) => {
            onQuestion(e.target.value);
            setError("");
          }}
          placeholder={placeholder}
          rows={4}
          style={{
            width: "100%",
            backgroundColor: "#0e101b",
            border: error ? "1px solid #c9a84c80" : "1px solid #252742",
            borderRadius: "4px",
            color: "#e4dece",
            fontFamily: "'Raleway', sans-serif",
            fontSize: "15px",
            padding: "16px",
            resize: "vertical",
            outline: "none",
            lineHeight: 1.7,
            fontWeight: 300,
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = "#c9a84c40";
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = "#252742";
          }}
        />

        {error && (
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "12px", color: "#c9a84c", marginTop: "8px" }}>
            {error}
          </p>
        )}
        {hint && (
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "12px", color: "#7a7590", marginTop: "8px", fontStyle: "italic" }}>
            {hint}
          </p>
        )}

        <GoldDivider />

        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#7a7590",
            marginBottom: "16px",
          }}
        >
          TEMA (OPCIONAL)
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategory(cat.id)}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "10px",
                letterSpacing: "2px",
                padding: "8px 16px",
                border: category === cat.id ? "1px solid #c9a84c" : "1px solid #252742",
                backgroundColor: category === cat.id ? "#c9a84c15" : "transparent",
                color: category === cat.id ? "#c9a84c" : "#7a7590",
                cursor: "pointer",
                borderRadius: "2px",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "12px" }}>{cat.icon}</span>
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          style={{
            width: "100%",
            fontFamily: "'Cinzel', serif",
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#07080f",
            backgroundColor: "#c9a84c",
            border: "none",
            padding: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e8c97a")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c9a84c")}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
}

// ─── Spread Selection Screen ───────────────────────────────────────────────────

function SpreadScreen({
  onSelect,
  onOffers,
}: {
  onSelect: (type: SpreadType) => void;
  onOffers: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07080f",
        padding: "100px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#c9a84c60",
            marginBottom: "12px",
          }}
        >
          PASSO 2 DE 2
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(24px, 5vw, 40px)",
            color: "#e4dece",
            marginBottom: "8px",
            letterSpacing: "2px",
          }}
        >
          Escolha sua leitura
        </h1>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "14px",
            color: "#7a7590",
            marginBottom: "48px",
            fontWeight: 300,
          }}
        >
          Cada modalidade oferece uma perspectiva diferente sobre sua questão.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {SPREAD_TYPES.map((spread) => (
            <button
              key={spread.id}
              onClick={() => onSelect(spread.id as SpreadType)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                backgroundColor: "#0e101b",
                border: "1px solid #252742",
                borderRadius: "4px",
                padding: "20px 24px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c40";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#10111e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#252742";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0e101b";
              }}
            >
              {/* card count badge */}
              <div
                style={{
                  minWidth: 48,
                  height: 48,
                  border: "1px solid #c9a84c30",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: spread.cards > 9 ? "13px" : "18px",
                    color: "#c9a84c",
                  }}
                >
                  {spread.cards}
                </span>
              </div>

              {/* info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "13px",
                      color: "#e4dece",
                      letterSpacing: "2px",
                    }}
                  >
                    {spread.name.toUpperCase()}
                  </span>
                  {spread.tier === "free" && (
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: "#c9a84c",
                        border: "1px solid #c9a84c40",
                        padding: "2px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      GRATUITO
                    </span>
                  )}
                  {spread.tier === "premium" && (
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: "#7a7590",
                        border: "1px solid #25274260",
                        padding: "2px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      PREMIUM
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "13px",
                    color: "#7a7590",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {spread.description}
                </p>
              </div>

              {/* depth */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "9px",
                    letterSpacing: "2px",
                    color: "#7a7590",
                  }}
                >
                  {spread.depth.toUpperCase()}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "12px",
            color: "#7a7590",
            textAlign: "center",
            marginTop: "32px",
            fontWeight: 300,
          }}
        >
          Conheça todos os planos disponíveis.{" "}
          <button
            onClick={onOffers}
            style={{
              background: "none",
              border: "none",
              color: "#c9a84c",
              cursor: "pointer",
              fontFamily: "'Raleway', sans-serif",
              fontSize: "12px",
              padding: 0,
            }}
          >
            Ver planos →
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Shuffle Screen ────────────────────────────────────────────────────────────

function ShuffleScreen({
  phase,
  onReady,
}: {
  phase: ShufflePhase;
  onReady: () => void;
}) {
  const messages: Record<ShufflePhase, string> = {
    concentrating: "Concentre-se na sua pergunta.",
    shuffling: "As cartas estão sendo embaralhadas...",
    ready: "As cartas estão prontas.",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07080f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
      }}
    >
      {/* deck */}
      <div style={{ position: "relative", width: 140, height: 196, marginBottom: 64 }}>
        {[4, 3, 2, 1, 0].map((i) => (
          <div
            key={i}
            className={phase === "shuffling" ? "shuffle-anim" : ""}
            style={{
              position: "absolute",
              left: `${i * 3}px`,
              top: `${i * -2}px`,
              animationDelay: `${i * 0.08}s`,
              transition: "transform 0.5s",
            }}
          >
            <CardBack size="xl" />
          </div>
        ))}
        {phase === "ready" && (
          <div
            className="glow-pulse"
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "13px",
          letterSpacing: "3px",
          color: "#c9a84c",
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        {messages[phase]}
      </p>

      {phase === "ready" && (
        <button
          onClick={onReady}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#07080f",
            backgroundColor: "#c9a84c",
            border: "none",
            padding: "14px 40px",
            cursor: "pointer",
          }}
        >
          REVELAR AS CARTAS
        </button>
      )}

      <div style={{ display: "flex", gap: "8px", marginTop: phase === "ready" ? "32px" : "0" }}>
        {["concentrating", "shuffling", "ready"].map((p) => (
          <div
            key={p}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: phase === p ? "#c9a84c" : "#252742",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Reveal Screen ─────────────────────────────────────────────────────────────

function RevealScreen({
  cards,
  spreadType,
  revealedSet,
  onReveal,
  onReadingClick,
}: {
  cards: LenormandCard[];
  spreadType: SpreadType;
  revealedSet: Set<number>;
  onReveal: (idx: number) => void;
  onReadingClick: () => void;
}) {
  const spread = SPREAD_TYPES.find((s) => s.id === spreadType)!;
  const allRevealed = revealedSet.size === cards.length;

  const getLayout = () => {
    if (spreadType === 1) return "single";
    if (spreadType === 3) return "row";
    if (spreadType === 5) return "cross";
    if (spreadType === 9) return "grid3x3";
    return "tableau";
  };

  const layout = getLayout();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07080f",
        padding: "100px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#c9a84c60",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          {spread.name.toUpperCase()}
        </p>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "13px",
            color: "#7a7590",
            textAlign: "center",
            marginBottom: "48px",
            fontWeight: 300,
          }}
        >
          {allRevealed ? "Todas as cartas foram reveladas." : "Clique nas cartas para revelá-las."}
        </p>

        {/* Single */}
        {layout === "single" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "10px",
                letterSpacing: "4px",
                color: "#c9a84c60",
              }}
            >
              CARTA DO DIA
            </p>
            <FlipCard card={cards[0]} revealed={revealedSet.has(0)} onReveal={() => onReveal(0)} size="xl" />
            {revealedSet.has(0) && (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "14px",
                    color: "#e4dece",
                    letterSpacing: "3px",
                    marginBottom: "4px",
                  }}
                >
                  {cards[0].name.toUpperCase()}
                </p>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "12px",
                    color: "#c9a84c70",
                    letterSpacing: "2px",
                  }}
                >
                  {cards[0].keywords.slice(0, 2).join(" • ").toUpperCase()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Row (3 cards) */}
        {layout === "row" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(12px, 3vw, 32px)",
              flexWrap: "wrap",
            }}
          >
            {cards.map((card, i) => (
              <div key={card.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <FlipCard card={card} revealed={revealedSet.has(i)} onReveal={() => onReveal(i)} size="lg" />
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "9px",
                    color: "#7a7590",
                    letterSpacing: "2px",
                    textAlign: "center",
                  }}
                >
                  {spread.positions[i]?.name.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Cross (5 cards) */}
        {layout === "cross" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <FlipCard card={cards[1]} revealed={revealedSet.has(1)} onReveal={() => onReveal(1)} size="md" />
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <FlipCard card={cards[0]} revealed={revealedSet.has(0)} onReveal={() => onReveal(0)} size="md" />
              <FlipCard card={cards[2]} revealed={revealedSet.has(2)} onReveal={() => onReveal(2)} size="lg" />
              <FlipCard card={cards[3]} revealed={revealedSet.has(3)} onReveal={() => onReveal(3)} size="md" />
            </div>
            <FlipCard card={cards[4]} revealed={revealedSet.has(4)} onReveal={() => onReveal(4)} size="md" />
            <div style={{ display: "flex", gap: "32px", marginTop: "8px" }}>
              {cards.map((_, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "8px",
                    color: "#7a7590",
                    letterSpacing: "1px",
                    textAlign: "center",
                    width: 72,
                  }}
                >
                  {spread.positions[i]?.name.toUpperCase()}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 3×3 grid */}
        {layout === "grid3x3" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                gap: "12px",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              {cards.map((card, i) => (
                <div
                  key={card.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FlipCard
                    card={card}
                    revealed={revealedSet.has(i)}
                    onReveal={() => onReveal(i)}
                    size={i === 4 ? "lg" : "md"}
                  />
                  <p
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "8px",
                      color: i === 4 ? "#c9a84c70" : "#7a7590",
                      letterSpacing: "1px",
                    }}
                  >
                    {i === 4 ? "CENTRO" : String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grand Tableau */}
        {layout === "tableau" && (
          <div style={{ overflowX: "auto", paddingBottom: "12px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(9, auto)",
                gap: "6px",
                justifyContent: "start",
                minWidth: "fit-content",
                margin: "0 auto",
              }}
            >
              {cards.map((card, i) => (
                <div
                  key={card.id}
                  className="house-cell"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px",
                    borderRadius: "2px",
                    transition: "background 0.2s",
                  }}
                >
                  <FlipCard card={card} revealed={revealedSet.has(i)} onReveal={() => onReveal(i)} size="sm" />
                  <p
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "7px",
                      color: "#7a7590",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button
            onClick={onReadingClick}
            disabled={!allRevealed}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "3px",
              color: allRevealed ? "#07080f" : "#7a7590",
              backgroundColor: allRevealed ? "#c9a84c" : "#252742",
              border: "none",
              padding: "14px 40px",
              cursor: allRevealed ? "pointer" : "default",
              transition: "all 0.3s",
            }}
          >
            {allRevealed ? "VER LEITURA COMPLETA" : `REVELAR TODAS (${revealedSet.size}/${cards.length})`}
          </button>
          {!allRevealed && (
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "12px",
                color: "#7a7590",
                marginTop: "12px",
                fontWeight: 300,
              }}
            >
              Clique em cada carta para revelá-la
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Reading Screen ────────────────────────────────────────────────────────────

// ─── Section header sub-component ────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "4px", color: "#c9a84c", marginBottom: "16px", marginTop: "0" }}>
      {children}
    </h2>
  );
}

// ─── Depth selector ────────────────────────────────────────────────────────────

function DepthSelector({ depth, onChange }: { depth: ReadingDepth; onChange: (d: ReadingDepth) => void }) {
  const opts: { id: ReadingDepth; label: string; desc: string }[] = [
    { id: "rapida", label: "Rápida", desc: "Síntese + conselho" },
    { id: "completa", label: "Completa", desc: "Cartas + combinações + percepções" },
    { id: "profunda", label: "Profunda", desc: "Todas as camadas + cruzamentos" },
  ];
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "40px", flexWrap: "wrap" }}>
      {opts.map((o) => (
        <button key={o.id} onClick={() => onChange(o.id)} style={{
          fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "2px",
          padding: "8px 14px", border: depth === o.id ? "1px solid #c9a84c" : "1px solid #252742",
          backgroundColor: depth === o.id ? "#c9a84c15" : "transparent",
          color: depth === o.id ? "#c9a84c" : "#7a7590", cursor: "pointer", borderRadius: "2px",
          transition: "all 0.15s",
        }}>
          {o.label.toUpperCase()}
          <span style={{ display: "block", fontSize: "7px", color: "#7a7590", letterSpacing: "1px", marginTop: "2px" }}>{o.desc}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Reading Screen ────────────────────────────────────────────────────────────

function ReadingScreen({
  cards,
  spreadType,
  category,
  question,
  onUpsell,
  onNewReading,
}: {
  cards: LenormandCard[];
  spreadType: SpreadType;
  category: Category;
  question: string;
  onUpsell: () => void;
  onNewReading: () => void;
}) {
  const [depth, setDepth] = useState<ReadingDepth>("completa");
  const spread = SPREAD_TYPES.find((s) => s.id === spreadType)!;

  // Run the interpretation engine
  const analysis: ReadingAnalysis = interpret(
    cards,
    spread.positions,
    question || "Orientação geral para o momento presente",
    category,
    depth
  );

  return (
    <div style={{ backgroundColor: "#07080f", minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "5px", color: "#c9a84c60", textAlign: "center", marginBottom: "8px" }}>
          SUA LEITURA
        </p>
        <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(22px, 4vw, 34px)", color: "#e4dece", textAlign: "center", marginBottom: "8px", letterSpacing: "2px" }}>
          {spread.name.toUpperCase()}
        </h1>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "3px", color: "#7a7590", textAlign: "center", marginBottom: "32px" }}>
          {analysis.domainLabel.toUpperCase()}
        </p>

        {/* Depth selector */}
        <DepthSelector depth={depth} onChange={setDepth} />

        {/* Question */}
        <div style={{ backgroundColor: "#0e101b", border: "1px solid #252742", borderRadius: "4px", padding: "20px 24px", marginBottom: "40px" }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "3px", color: "#7a7590", marginBottom: "8px" }}>SUA PERGUNTA</p>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "15px", color: "#e4dece", fontStyle: "italic", fontWeight: 300, lineHeight: 1.6 }}>
            "{question || "Orientação geral para o momento presente"}"
          </p>
        </div>

        {/* Cards row */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
          {cards.map((card, i) => (
            <div key={card.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <CardFront card={card} size={spreadType === 36 ? "sm" : "md"} focus={i === Math.floor(cards.length / 2)} />
              {spreadType <= 5 && (
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "7px", color: "#7a7590", letterSpacing: "1px", textAlign: "center" }}>
                  {spread.positions[i]?.name.toUpperCase()}
                </p>
              )}
            </div>
          ))}
        </div>

        <GoldDivider />

        {/* ── CAMADA 1: Síntese ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionLabel>SÍNTESE DA LEITURA</SectionLabel>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "15px", color: "#e4dece", lineHeight: 1.9, fontWeight: 300 }}>
            {analysis.synthesis}
          </p>
        </div>

        {/* ── CAMADA 2: Narrativa (completa+profunda) ── */}
        {(depth === "completa" || depth === "profunda") && (
          <div style={{ marginBottom: "40px" }}>
            <SectionLabel>O QUE AS CARTAS CONSTROEM</SectionLabel>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "14px", color: "#e4dece90", lineHeight: 1.9, fontWeight: 300 }}>
              {analysis.narrative}
            </p>
          </div>
        )}

        {(depth === "completa" || depth === "profunda") && <GoldDivider />}

        {/* ── CAMADA 2: Cards individuais (completa+profunda) ── */}
        {(depth === "completa" || depth === "profunda") && (
          <div style={{ marginBottom: "40px" }}>
            <SectionLabel>CARTAS DA TIRAGEM</SectionLabel>
            {analysis.cardAnalyses.map((ca) => (
              <div key={ca.card.id} style={{ backgroundColor: "#0e101b", border: "1px solid #252742", borderRadius: "4px", padding: "20px 24px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "22px", color: "#c9a84c", flexShrink: 0 }}>{ca.card.symbol}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", flexWrap: "wrap" }}>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#e4dece", letterSpacing: "2px", margin: 0 }}>
                        {ca.card.name.toUpperCase()}
                      </p>
                      {ca.position.name && spreadType > 1 && (
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", color: "#c9a84c70", letterSpacing: "2px", border: "1px solid #c9a84c20", padding: "1px 8px", borderRadius: "2px" }}>
                          {ca.position.name.toUpperCase()}
                        </span>
                      )}
                      {ca.modifiedBy.length > 0 && (
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", color: "#7a7590", letterSpacing: "1px" }}>
                          modificada por {ca.modifiedBy.map(m => m.modifierCard.name).join(", ")}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {ca.card.keywords.slice(0, 3).map(kw => (
                        <span key={kw} style={{ fontFamily: "'Cinzel', serif", fontSize: "7px", letterSpacing: "1px", color: "#c9a84c60", border: "1px solid #c9a84c15", padding: "1px 6px", borderRadius: "2px" }}>
                          {kw.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "13px", color: "#7a7590", lineHeight: 1.8, fontWeight: 300, marginBottom: "8px" }}>
                  {ca.contextualInterpretation}
                </p>
                {depth === "profunda" && (
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "12px", color: "#c9a84c50", lineHeight: 1.7, fontWeight: 300, fontStyle: "italic" }}>
                    Papel na tiragem: {ca.positionalRole}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── CAMADA 3: Combinações ── */}
        {(depth === "completa" || depth === "profunda") && analysis.adjacentCombinations.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <SectionLabel>COMBINAÇÕES RELEVANTES</SectionLabel>
            {analysis.adjacentCombinations
              .filter(c => c.significance !== "baixa")
              .slice(0, depth === "profunda" ? 6 : 3)
              .map((combo, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "12px", padding: "16px 20px", backgroundColor: "#0e101b", border: combo.type === "reforço" ? "1px solid #c9a84c30" : combo.type === "conflito" ? "1px solid #c9a84c20" : "1px solid #252742", borderRadius: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <span style={{ color: "#c9a84c", fontSize: "18px" }}>{combo.cardA.symbol}</span>
                  <span style={{ color: "#c9a84c30", fontSize: "14px" }}>+</span>
                  <span style={{ color: "#c9a84c", fontSize: "18px" }}>{combo.cardB.symbol}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: combo.type === "reforço" ? "#c9a84c90" : combo.type === "conflito" ? "#c9a84c60" : "#7a7590", letterSpacing: "2px", marginBottom: "4px" }}>
                    {combo.cardA.name.toUpperCase()} + {combo.cardB.name.toUpperCase()}
                    <span style={{ marginLeft: "8px", fontSize: "8px", color: "#7a7590" }}>
                      {combo.type === "reforço" ? "· REFORÇO" : combo.type === "conflito" ? "· TENSÃO" : combo.type === "modificação" ? "· MODIFICAÇÃO" : "· SEQUÊNCIA"}
                    </span>
                  </p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "13px", color: "#e4dece", fontWeight: 300, lineHeight: 1.7 }}>
                    {combo.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CAMADA 4: Tensões (profunda) ── */}
        {depth === "profunda" && analysis.conflicts.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <SectionLabel>TENSÕES ENCONTRADAS</SectionLabel>
            {analysis.conflicts.map((c, i) => (
              <div key={i} style={{ padding: "20px 24px", backgroundColor: "#0e101b", border: "1px solid #c9a84c20", borderRadius: "4px", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#c9a84c80", fontSize: "16px" }}>{c.cardA.symbol}</span>
                  <span style={{ color: "#c9a84c30" }}>⟷</span>
                  <span style={{ color: "#c9a84c80", fontSize: "16px" }}>{c.cardB.symbol}</span>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: "#7a7590", letterSpacing: "2px", margin: 0 }}>
                    {c.cardA.name.toUpperCase()} ↔ {c.cardB.name.toUpperCase()}
                  </p>
                </div>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "13px", color: "#e4dece80", lineHeight: 1.7, fontWeight: 300, marginBottom: "6px" }}>{c.tension}</p>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "12px", color: "#7a7590", lineHeight: 1.7, fontWeight: 300, fontStyle: "italic" }}>Como navegar: {c.resolution}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── CAMADA 4: Padrões/Percepções (completa+profunda) ── */}
        {(depth === "completa" || depth === "profunda") && (
          <>
            <GoldDivider />
            <div style={{ marginBottom: "40px" }}>
              <SectionLabel>PERCEPÇÕES DA TIRAGEM</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { label: "TEMA DOMINANTE", value: analysis.insights.dominantTheme },
                  { label: "TENDÊNCIA DA LEITURA", value: analysis.insights.movementDirection },
                  { label: "PRINCIPAL ABERTURA", value: analysis.insights.mainOpportunity },
                  { label: "PRINCIPAL OBSTÁCULO", value: analysis.insights.mainObstacle },
                ].map(({ label, value }) => (
                  <div key={label} style={{ backgroundColor: "#0e101b", border: "1px solid #252742", borderRadius: "4px", padding: "16px 18px" }}>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "2px", color: "#c9a84c70", marginBottom: "8px" }}>{label}</p>
                    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "12px", color: "#e4dece80", lineHeight: 1.7, fontWeight: 300 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Patterns badges */}
              {depth === "profunda" && (
                <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {analysis.patterns.movementCards.length > 0 && (
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "1px", color: "#c9a84c70", border: "1px solid #c9a84c20", padding: "4px 10px", borderRadius: "2px" }}>
                      MOVIMENTO × {analysis.patterns.movementCards.length}
                    </span>
                  )}
                  {analysis.patterns.stabilityCards.length > 0 && (
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "1px", color: "#c9a84c70", border: "1px solid #c9a84c20", padding: "4px 10px", borderRadius: "2px" }}>
                      ESTABILIDADE × {analysis.patterns.stabilityCards.length}
                    </span>
                  )}
                  {analysis.patterns.communicationCards.length > 0 && (
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "1px", color: "#c9a84c70", border: "1px solid #c9a84c20", padding: "4px 10px", borderRadius: "2px" }}>
                      COMUNICAÇÃO × {analysis.patterns.communicationCards.length}
                    </span>
                  )}
                  {analysis.patterns.transformationCards.length > 0 && (
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "1px", color: "#c9a84c70", border: "1px solid #c9a84c20", padding: "4px 10px", borderRadius: "2px" }}>
                      TRANSFORMAÇÃO × {analysis.patterns.transformationCards.length}
                    </span>
                  )}
                  {analysis.patterns.emotionCards.length > 0 && (
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "1px", color: "#c9a84c70", border: "1px solid #c9a84c20", padding: "4px 10px", borderRadius: "2px" }}>
                      EMOÇÃO × {analysis.patterns.emotionCards.length}
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <GoldDivider />

        {/* ── CAMADA 5: Conselho simbólico ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionLabel>CONSELHO SIMBÓLICO</SectionLabel>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "14px", color: "#e4dece90", lineHeight: 1.9, fontWeight: 300 }}>
            {analysis.insights.symbolicAdvice}
          </p>
        </div>

        {/* ── CAMADA 6: Reflexão ── */}
        <div style={{ padding: "28px 32px", border: "1px solid #c9a84c25", borderRadius: "4px", textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "4px", color: "#c9a84c60", marginBottom: "16px" }}>REFLEXÃO</p>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "16px", color: "#e4dece", fontStyle: "italic", lineHeight: 1.9, fontWeight: 300, maxWidth: 520, margin: "0 auto" }}>
            "{analysis.reflection}"
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {spreadType < 9 && (
            <button onClick={onUpsell} style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "2px", color: "#07080f", backgroundColor: "#c9a84c", border: "none", padding: "14px 32px", cursor: "pointer" }}>
              APROFUNDAR LEITURA
            </button>
          )}
          <button onClick={onNewReading} style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "2px", color: "#c9a84c", backgroundColor: "transparent", border: "1px solid #c9a84c40", padding: "14px 32px", cursor: "pointer" }}>
            NOVA LEITURA
          </button>
        </div>

        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "11px", color: "#7a7590", fontWeight: 300, textAlign: "center", marginTop: "32px", maxWidth: 480, margin: "32px auto 0" }}>
          {analysis.disclaimer}
        </p>
      </div>
    </div>
  );
}

// ─── Upsell Screen ─────────────────────────────────────────────────────────────

function UpsellScreen({
  currentSpread,
  onSelect,
  onBack,
}: {
  currentSpread: SpreadType;
  onSelect: (type: SpreadType) => void;
  onBack: () => void;
}) {
  const available = SPREAD_TYPES.filter((s) => s.id > currentSpread);

  return (
    <div style={{ backgroundColor: "#07080f", minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#c9a84c60",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          QUER IR MAIS FUNDO?
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 4vw, 34px)",
            color: "#e4dece",
            textAlign: "center",
            marginBottom: "16px",
            letterSpacing: "2px",
          }}
        >
          Aprofunde sua leitura
        </h1>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "14px",
            color: "#7a7590",
            textAlign: "center",
            marginBottom: "48px",
            fontWeight: 300,
            maxWidth: 480,
            margin: "0 auto 48px",
          }}
        >
          {currentSpread === 1
            ? "Sua pergunta pode revelar mais com uma leitura mais ampla."
            : "Uma leitura mais profunda pode explorar melhor as relações entre as cartas."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {available.map((spread) => (
            <div
              key={spread.id}
              style={{
                backgroundColor: "#0e101b",
                border: "1px solid #252742",
                borderRadius: "4px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "14px",
                    color: "#e4dece",
                    letterSpacing: "2px",
                    marginBottom: "4px",
                  }}
                >
                  {spread.name.toUpperCase()} — {spread.cards} CARTAS
                </p>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "13px",
                    color: "#7a7590",
                    fontWeight: 300,
                  }}
                >
                  {spread.description}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "13px",
                    color: "#c9a84c",
                  }}
                >
                  R$ XX,XX
                </span>
                <button
                  onClick={() => onSelect(spread.id as SpreadType)}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "#07080f",
                    backgroundColor: "#c9a84c",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  APROFUNDAR
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#7a7590",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
            }}
          >
            ← VOLTAR À LEITURA
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── History Screen ────────────────────────────────────────────────────────────

function HistoryScreen({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<Category | "todas">("todas");
  const categories: { id: Category | "todas"; label: string }[] = [
    { id: "todas", label: "Todas" },
    { id: "amor", label: "Amor" },
    { id: "trabalho", label: "Trabalho" },
    { id: "dinheiro", label: "Dinheiro" },
    { id: "geral", label: "Geral" },
  ];

  const filtered =
    filter === "todas" ? MOCK_HISTORY : MOCK_HISTORY.filter((h) => h.category === filter);
  const spread = (id: SpreadType) => SPREAD_TYPES.find((s) => s.id === id)!;

  return (
    <div style={{ backgroundColor: "#07080f", minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 4vw, 34px)",
            color: "#e4dece",
            marginBottom: "8px",
            letterSpacing: "2px",
          }}
        >
          MINHAS LEITURAS
        </h1>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "14px",
            color: "#7a7590",
            marginBottom: "32px",
            fontWeight: 300,
          }}
        >
          Seu histórico de consultas
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "9px",
                letterSpacing: "2px",
                padding: "6px 14px",
                border: filter === cat.id ? "1px solid #c9a84c" : "1px solid #252742",
                backgroundColor: filter === cat.id ? "#c9a84c15" : "transparent",
                color: filter === cat.id ? "#c9a84c" : "#7a7590",
                cursor: "pointer",
                borderRadius: "2px",
                transition: "all 0.15s",
              }}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* History cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((entry) => (
            <div
              key={entry.id}
              style={{
                backgroundColor: "#0e101b",
                border: "1px solid #252742",
                borderRadius: "4px",
                padding: "20px 24px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              {/* mini cards */}
              <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                {entry.cards.slice(0, 3).map((card, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 44,
                      backgroundColor: "#161827",
                      border: "1px solid #c9a84c30",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#c9a84c" }}>{card.symbol}</span>
                  </div>
                ))}
                {entry.cards.length > 3 && (
                  <div
                    style={{
                      width: 32,
                      height: 44,
                      backgroundColor: "#161827",
                      border: "1px solid #25274260",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "8px",
                        color: "#7a7590",
                      }}
                    >
                      +{entry.cards.length - 3}
                    </span>
                  </div>
                )}
              </div>

              {/* info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "6px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "9px",
                      color: "#7a7590",
                      letterSpacing: "2px",
                    }}
                  >
                    {entry.date}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "9px",
                      color: "#c9a84c70",
                      letterSpacing: "1px",
                    }}
                  >
                    {spread(entry.spreadType).name.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "9px",
                      color: "#7a7590",
                      letterSpacing: "1px",
                      textTransform: "capitalize",
                    }}
                  >
                    {entry.category}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "14px",
                    color: "#e4dece",
                    fontStyle: "italic",
                    fontWeight: 300,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  "{entry.question}"
                </p>
              </div>

              {/* action */}
              <button
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "#c9a84c",
                  background: "none",
                  border: "1px solid #c9a84c30",
                  padding: "6px 12px",
                  cursor: "pointer",
                  flexShrink: 0,
                  borderRadius: "2px",
                  whiteSpace: "nowrap",
                }}
              >
                VER →
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#7a7590",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ← VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Offers Screen ─────────────────────────────────────────────────────────────

function OffersScreen({ onSelect, onBack }: { onSelect: () => void; onBack: () => void }) {
  const tiers = [
    { name: "GRATUITO", cards: "1 carta", label: "Carta do Dia", depth: "Rápida", price: "Grátis", cta: "COMEÇAR AGORA", highlight: false },
    { name: "ESSENCIAL", cards: "3 cartas", label: "Situação · Influência · Tendência", depth: "Objetiva", price: "R$ XX,XX", cta: "ESCOLHER PLANO", highlight: false },
    { name: "PROFUNDO", cards: "5 ou 9 cartas", label: "Contexto ampliado e análise de relações", depth: "Detalhada", price: "R$ XX,XX", cta: "ESCOLHER PLANO", highlight: true },
    { name: "COMPLETO", cards: "36 cartas", label: "Grande Tableau", depth: "Avançada", price: "R$ XX,XX", cta: "ESCOLHER PLANO", highlight: false },
    { name: "PREMIUM", cards: "36 cartas", label: "Grande Tableau + histórico + relatório", depth: "Máxima", price: "R$ XX,XX", cta: "CONHECER PREMIUM", highlight: false },
  ];

  return (
    <div style={{ backgroundColor: "#07080f", minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "5px",
            color: "#c9a84c60",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          PLANOS E PRODUTOS
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 4vw, 34px)",
            color: "#e4dece",
            textAlign: "center",
            marginBottom: "16px",
            letterSpacing: "2px",
          }}
        >
          ENCONTRE A LEITURA CERTA
        </h1>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "14px",
            color: "#7a7590",
            textAlign: "center",
            marginBottom: "60px",
            fontWeight: 300,
            maxWidth: 440,
            margin: "0 auto 60px",
          }}
        >
          Cada modalidade oferece uma perspectiva diferente. Escolha a profundidade que sua questão merece.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                backgroundColor: tier.highlight ? "#10111e" : "#0e101b",
                border: tier.highlight ? "1px solid #c9a84c60" : "1px solid #252742",
                borderRadius: "4px",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                position: "relative",
              }}
            >
              {tier.highlight && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "8px",
                    letterSpacing: "2px",
                    color: "#07080f",
                    backgroundColor: "#c9a84c",
                    padding: "3px 12px",
                    borderRadius: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  MAIS POPULAR
                </span>
              )}
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "#c9a84c",
                }}
              >
                {tier.name}
              </p>
              <p
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "28px",
                  color: "#e4dece",
                  lineHeight: 1,
                }}
              >
                {tier.price}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "12px",
                  color: "#7a7590",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {tier.cards}
                <br />
                <span style={{ color: "#e4dece90" }}>{tier.label}</span>
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "8px",
                    letterSpacing: "2px",
                    color: "#7a7590",
                  }}
                >
                  {tier.depth.toUpperCase()}
                </span>
              </div>
              <button
                onClick={onSelect}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: tier.highlight ? "#07080f" : "#c9a84c",
                  backgroundColor: tier.highlight ? "#c9a84c" : "transparent",
                  border: tier.highlight ? "none" : "1px solid #c9a84c40",
                  padding: "11px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ marginTop: "60px" }}>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#c9a84c",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            COMPARAÇÃO
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Leitura", "Cartas", "Profundidade"].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: "#7a7590",
                        padding: "12px 16px",
                        textAlign: "left",
                        borderBottom: "1px solid #252742",
                      }}
                    >
                      {h.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Carta do Dia", "1", "Rápida"],
                  ["Essencial", "3", "Objetiva"],
                  ["Profunda", "5", "Detalhada"],
                  ["Ampliada", "9", "Completa"],
                  ["Grande Tableau", "36", "Avançada"],
                ].map(([name, cards, depth]) => (
                  <tr key={name}>
                    <td
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "13px",
                        color: "#e4dece",
                        padding: "14px 16px",
                        borderBottom: "1px solid #25274260",
                        fontWeight: 400,
                      }}
                    >
                      {name}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "13px",
                        color: "#c9a84c",
                        padding: "14px 16px",
                        borderBottom: "1px solid #25274260",
                      }}
                    >
                      {cards}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "13px",
                        color: "#7a7590",
                        padding: "14px 16px",
                        borderBottom: "1px solid #25274260",
                        fontWeight: 300,
                      }}
                    >
                      {depth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#7a7590",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ← VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [spreadType, setSpreadType] = useState<SpreadType>(1);
  const [drawnCards, setDrawnCards] = useState<LenormandCard[]>([]);
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());
  const [shufflePhase, setShufflePhase] = useState<ShufflePhase>("concentrating");
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goHome = () => setScreen("home");
  const goHistory = () => setScreen("history");
  const goOffers = () => setScreen("offers");

  const startShuffle = useCallback(() => {
    setShufflePhase("concentrating");
    setRevealedSet(new Set());
    const cards = drawCards(spreadType);
    setDrawnCards(cards);

    shuffleTimerRef.current = setTimeout(() => {
      setShufflePhase("shuffling");
      shuffleTimerRef.current = setTimeout(() => {
        setShufflePhase("ready");
      }, 2500);
    }, 2000);
  }, [spreadType]);

  useEffect(() => {
    if (screen === "shuffle") {
      startShuffle();
    }
    return () => {
      if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    };
  }, [screen, startShuffle]);

  const handleSpreadSelect = (type: SpreadType) => {
    setSpreadType(type);
    setScreen("shuffle");
  };

  const handleReveal = (idx: number) => {
    setRevealedSet((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const handleUpsellSelect = (type: SpreadType) => {
    setSpreadType(type);
    setScreen("shuffle");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07080f" }}>
      <NavBar onHome={goHome} onHistory={goHistory} onOffers={goOffers} />

      {screen === "home" && (
        <HomeScreen
          onStart={() => setScreen("question")}
          onHistory={goHistory}
          onOffers={goOffers}
        />
      )}

      {screen === "question" && (
        <QuestionScreen
          question={question}
          category={category}
          onQuestion={setQuestion}
          onCategory={setCategory}
          onContinue={() => setScreen("spread")}
        />
      )}

      {screen === "spread" && (
        <SpreadScreen onSelect={handleSpreadSelect} onOffers={goOffers} />
      )}

      {screen === "shuffle" && (
        <ShuffleScreen
          phase={shufflePhase}
          onReady={() => setScreen("reveal")}
        />
      )}

      {screen === "reveal" && (
        <RevealScreen
          cards={drawnCards}
          spreadType={spreadType}
          revealedSet={revealedSet}
          onReveal={handleReveal}
          onReadingClick={() => setScreen("reading")}
        />
      )}

      {screen === "reading" && (
        <ReadingScreen
          cards={drawnCards}
          spreadType={spreadType}
          category={category ?? "geral"}
          question={question || "Orientação geral para o momento presente"}
          onUpsell={() => setScreen("upsell")}
          onNewReading={() => setScreen("question")}
        />
      )}

      {screen === "upsell" && (
        <UpsellScreen
          currentSpread={spreadType}
          onSelect={handleUpsellSelect}
          onBack={() => setScreen("reading")}
        />
      )}

      {screen === "history" && <HistoryScreen onBack={() => setScreen("home")} />}

      {screen === "offers" && (
        <OffersScreen onSelect={() => setScreen("question")} onBack={() => setScreen("home")} />
      )}
    </div>
  );
}
