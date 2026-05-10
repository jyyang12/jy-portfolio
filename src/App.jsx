import React, { useState, useEffect } from "react";

const BLACK = "#111111";
const DARK  = "#191F28";
const GRAY1 = "#8B95A1";
const GRAY2 = "#F2F4F6";
const GRAY3 = "#E5E8EB";
const GRAY4 = "#6B7280";
const WHITE = "#FFFFFF";
const GREEN = "#16A34A";

const IMG_SIGUNG      = "/src/sigung.png";

const IMG_MAP = {
  sigung:      IMG_SIGUNG,
};

const NAV = [
  { id: "about",    label: "About" },
  { id: "work",     label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact" },
];

const STATS = [
  { value: "+296%", label: "협력사 매출 성장",   sub: "51억 → 153억" },
  { value: "0.8%",  label: "예측 오차율 달성",   sub: "3.4% → 0.8%" },
  { value: "10%↑",  label: "일반상품 매출 신장", sub: "시급 재설계 결과" },
  { value: "4.45",  label: "AI MBA GPA",         sub: "4.5 만점" },
];

const SKILLS = [
  { cat: "AI / ML",  items: ["RAG", "LLM", "Agent AI", "MCP"] },
  { cat: "Data",     items: ["Python", "R", "SQL", "Power BI"] },
  { cat: "Strategy", items: ["편성 기획", "상품 카테고리 운영", "데이터 전략"] },
  { cat: "Cert",     items: ["ADsP (데이터분석 준전문가)"] },
];

const WORKS = [
  {
    id: "w1", tag: "Data Pipeline",
    title: "시청률·경쟁사 데이터 기반 시급 체계 전면 재설계",
    period: "2025 ~ 2026", result: "26년 1분기 일반상품 매출 10%↑",
    desc: "Python 크롤링으로 경쟁사 편성 데이터를 수집하고, 닐슨 시청률과 내부 매출 DB를 결합 분석하여 데이터방송 개국 이래 최초로 시급 체계를 전면 재산정했습니다. 프라임타임 편성 유연성 확대 및 과밀 시간대 분산을 통해 매출 성장을 달성했습니다.",
    pipeline: ["경쟁사 크롤링 데이터 구축", "시청률·매출 DB 결합 분석", "시급 구조 모델링", "편성 전략 적용"],
    tags: ["Python", "크롤링", "데이터 파이프라인", "전략기획"],
    imgKey: "sigung", caption: "카테고리별 시간대별 편성 비중 — 현대홈쇼핑 플러스샵 vs 피어 평균",
  },
  {
    id: "w2", tag: "Revenue Strategy",
    title: "'전략브랜드' 핵심 협력사 육성제도 기획·운영",
    period: "2024 ~ 2025", result: "매출 51억 → 153억 (+296%)",
    desc: "영업팀의 핵심 협력사 이탈 문제를 발견하고, 사내에 존재하지 않던 전략브랜드 육성 제도를 처음으로 기획·도입했습니다. 영업부서와의 협업을 통해 전략 파트너를 선정한 뒤, 론칭 등 주요 상품의 선편성 지원, 상품별 최적 시간대 분석 고도화, PD(제작)부서와의 협업을 통한 제작·프로모션 지원까지 전방위적으로 협력사 성장을 지원했습니다. 방송 이후 성과를 지속 트래킹하며 제도 유지 여부를 데이터 기반으로 의사결정하는 운영 구조까지 직접 구축했습니다.",
    pipeline: ["문제 정의 (협력사 이탈)", "영업 협업으로 파트너 선정", "맞춤 지원 전략 실행", "성과 트래킹 및 의사결정"],
    tags: ["제도 기획", "파트너 운영", "성과 관리", "크로스펑셔널 협업"],
    imgKey: null,
  },
  {
    id: "w3", tag: "BI Dashboard",
    title: "Power BI 대시보드 자체 구축",
    period: "2025 ~ 현재", result: "예측 오차 3.4% → 0.8% · BI 이용순위 7위",
    desc: "사내에 Power BI가 도입된 초기, 스스로 툴 사용법을 익혀 대시보드를 직접 설계·구축하고 전사 배포했습니다. 3개월간 4종의 대시보드를 자체 설계했으며, 특히 판매전환율 모니터링 대시보드를 고도화하여 예측 오차를 3.4%에서 0.8%로 감축했습니다.",
    pipeline: ["문제 정의 (수작업 한계)", "Power BI 독학·4종 설계", "DAX 기반 KPI 시각화", "전사 배포"],
    tags: ["Power BI", "DAX", "데이터 시각화", "예측 모델"],
    imgKey: null,
  },
];

const PROJECTS = [
  {
    id: "p1", tag: "AI Engineering",
    title: "개인 맞춤형 영양제 추천 서비스 개발",
    period: "2025 · AI MBA 팀프로젝트",
    summary: "식약처 공공 API 기반 건강기능식품 추천 Agent AI 서비스. 증상 입력 시 성분 추천부터 실제 구매 링크까지 연결되는 파이프라인 구현.",
    problem: "건강기능식품 시장은 연간 6조원 규모지만, 소비자 대부분은 본인 증상에 맞는 성분이 뭔지 모른 채 광고에 의존해 구매합니다. 개인 상황에 맞는 추천 서비스가 없다는 문제를 해결하고자 프로젝트를 기획했습니다.",
    data: "식품의약품안전처 공공 API에서 건강기능식품 데이터를 직접 수집하고, 성분과 증상을 연결하는 데이터셋을 구축했습니다.",
    method: "사용자가 증상을 입력하면 공공 DB에서 관련 성분을 찾고, AI가 맞춤 추천 조합을 생성한 뒤, 네이버 쇼핑 API와 연동해 실제 구매 가능한 제품까지 자동으로 연결되는 서비스를 설계했습니다.",
    result: "30가지 다양한 증상 시나리오로 검증을 완료했으며, 증상 입력부터 제품 구매 링크 제공까지 전 과정이 자동으로 작동하는 서비스를 완성했습니다.",
    impact: "공공 데이터 수집부터 AI 추천, 외부 API 연동까지 서비스 전 과정을 직접 설계하고 구현했습니다. 데이터를 실제 사용 가능한 서비스로 만드는 역량을 실증한 프로젝트입니다.",
    tags: ["Agent AI", "RAG", "공공 API", "LLM", "네이버 쇼핑 API"],
    media: { type: "video", src: "/src/agent_video.mp4", startTime: 14, caption: "영양제 추천 Agent AI 서비스 데모" },
  },
  {
    id: "p2", tag: "Personal Project",
    title: "한국 부동산 적정 매매가 시뮬레이터",
    period: "2025 · 개인 프로젝트",
    summary: "Claude와 바이브코딩으로 직접 제작한 부동산 의사결정 도구. 내 소득·대출 조건 입력 시 Bear/Base/Bull 3가지 시나리오로 적정 매매가 분석.",
    problem: "부동산 구매를 고려할 때 대출 한도, 세금, 월 상환금, 향후 자산 변화까지 한눈에 계산할 수 있는 도구가 없어 의사결정이 어렵습니다. 이 불편함을 직접 해결하고자 시뮬레이터를 기획·제작했습니다.",
    data: "연봉, 자기자본, 지역, 대출 조건 등 사용자가 직접 입력한 값을 기반으로 실거래 시세를 반영한 집값 시나리오를 적용합니다.",
    method: "입력값에 따라 DSR, LTV, 취득세, 보유세, 월 상환금, 순자산 변화를 자동으로 계산하며, 집값이 하락·유지·상승하는 세 가지 시나리오(Bear/Base/Bull)별로 5년·10년 후 자산 변화를 비교해볼 수 있도록 설계했습니다.",
    result: "복잡한 부동산 계산을 한 화면에서 실시간으로 확인할 수 있는 인터랙티브 서비스를 완성했습니다.",
    impact: "기획부터 개발, AI 연동까지 전 과정을 Claude와 바이브코딩으로 단독 수행했습니다. AI 툴을 활용해 복잡한 문제를 실제 작동하는 서비스로 빠르게 구현하는 역량을 보여주는 프로젝트입니다.",
    tags: ["AI 바이브코딩", "금융 모델링", "인터랙티브 UI"],
    media: { type: "video", src: "/src/realestate_video.mp4", startTime: 0, caption: "한국 부동산 적정 매매가 시뮬레이터 데모" },
  },
];

function Tag({ text, dark }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: dark ? 600 : 400,
      color: dark ? WHITE : GRAY4,
      background: dark ? DARK : GRAY2,
      border: `1px solid ${dark ? DARK : GRAY3}`,
      borderRadius: 20, padding: "3px 10px", fontFamily: "sans-serif",
    }}>{text}</span>
  );
}

function Label({ text }) {
  return <span style={{ fontSize: 11, fontWeight: 700, color: GRAY4, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{text}</span>;
}

function VideoPlayer({ src, maxHeight = 400, startTime = 0 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const handler = () => {
      if (startTime > 0) v.currentTime = startTime;
      v.play().catch(() => {});
    };
    v.addEventListener("loadedmetadata", handler);
    return () => v.removeEventListener("loadedmetadata", handler);
  }, [src]);
  return (
    <video ref={ref} src={src} muted loop playsInline
      style={{ width: "100%", display: "block", maxHeight, objectFit: "contain", background: "#000" }} />
  );
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 40px",
      background: scrolled ? "rgba(255,255,255,0.96)" : WHITE,
      borderBottom: `1px solid ${scrolled ? GRAY3 : "transparent"}`,
      backdropFilter: scrolled ? "blur(8px)" : "none", transition: "all 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, background: BLACK, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, fontFamily: "sans-serif" }}>JY</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: DARK, fontFamily: "sans-serif" }}>양정윤</span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => scrollTo(n.id)} style={{
            fontSize: 14, fontWeight: active === n.id ? 600 : 400,
            color: active === n.id ? BLACK : GRAY1,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "sans-serif", padding: 0,
          }}>{n.label}</button>
        ))}
      </div>
      <div style={{ width: 80 }} />
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 40px 32px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: GRAY2, borderRadius: 20, padding: "5px 14px", marginBottom: 20, width: "fit-content" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLACK }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: DARK, fontFamily: "sans-serif" }}>Data-Driven Strategy Planner</span>
      </div>
      <h1 style={{ fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: DARK, margin: "0 0 20px", lineHeight: 1.05, fontFamily: "sans-serif", letterSpacing: "-1.5px" }}>양정윤</h1>
      <p style={{ fontSize: 17, color: GRAY1, lineHeight: 1.8, maxWidth: 560, margin: "0 0 32px", fontFamily: "sans-serif" }}>
        데이터분석을 기반으로 시장을 진단하고, 비즈니스 방향성과 실행전략을 설계합니다.<br />
        기획력과 구현력을 결합해, 숫자로 증명되는 결과를 만듭니다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, maxWidth: 680 }}>
        {STATS.map(s => (
          <div key={s.value} style={{ background: GRAY2, borderRadius: 12, padding: "14px 12px", textAlign: "center", border: `1px solid ${GRAY3}` }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: BLACK, fontFamily: "sans-serif", lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: DARK, fontFamily: "sans-serif", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 10, color: GRAY1, fontFamily: "sans-serif" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
        <button onClick={() => scrollTo("work")} style={{ fontSize: 14, fontWeight: 600, color: WHITE, background: BLACK, padding: "11px 22px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "sans-serif" }}>
          경력 보기 →
        </button>
        <button onClick={() => scrollTo("projects")} style={{ fontSize: 14, fontWeight: 600, color: BLACK, border: `1.5px solid ${BLACK}`, background: WHITE, padding: "11px 22px", borderRadius: 10, cursor: "pointer", fontFamily: "sans-serif" }}>
          프로젝트 보기
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "56px 40px", maxWidth: 900, margin: "0 auto", borderTop: `1px solid ${GRAY3}` }}>
      <Label text="About" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: DARK, margin: "0 0 18px", fontFamily: "sans-serif", lineHeight: 1.3 }}>데이터 전략가,<br />실행까지 직접 합니다.</h2>
          {[
            "현대홈쇼핑에서 6년간 편성 전략과 데이터 분석을 기반으로 매출과 운영 구조를 개선해왔습니다.",
            "분석 결과를 보고로 끝내지 않고, 시급 체계 재설계·협력사 육성 제도 설계 등 실질적인 매출 변화로 직접 연결해왔습니다.",
            "현재 AI MBA에서 LLM·Agent AI 기반 프로젝트를 구현하며, 데이터 분석을 넘어 제품과 서비스로 확장하는 역량을 쌓고 있습니다.",
          ].map((t, i) => <p key={i} style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.8, margin: "0 0 12px", fontFamily: "sans-serif" }}>{t}</p>)}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "데이터 기반 전략 기획", desc: "시청률·매출·경쟁사 데이터를 결합 분석하여 비즈니스 방향성과 실행 전략을 직접 설계" },
              { title: "실행 중심의 문제해결", desc: "비효율을 데이터로 구조화하고 빠르게 실행, 문제를 끝까지 능동적으로 해결하여 성과로 마무리" },
              { title: "협업 리더십", desc: "영업·제작·IT 등 다양한 이해관계자와 공통 목표를 설정하고 논리적으로 설득하여 협업을 이끄는 조정 역량" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: BLACK, marginTop: 7, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: DARK, fontFamily: "sans-serif" }}>{c.title} </span>
                  <span style={{ fontSize: 13, color: GRAY4, fontFamily: "sans-serif" }}>: {c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: 11, fontWeight: 700, color: GRAY1, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: "sans-serif" }}>Skills & Tools</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {SKILLS.map(s => (
              <div key={s.cat}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GRAY4, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontFamily: "sans-serif" }}>{s.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map(item => <span key={item} style={{ fontSize: 12, color: DARK, background: GRAY2, border: `1px solid ${GRAY3}`, borderRadius: 6, padding: "3px 10px", fontFamily: "sans-serif" }}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 11, fontWeight: 700, color: GRAY1, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "sans-serif" }}>Experience & Education</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { year: "2019 ~", label: "현대홈쇼핑 데이터전략팀", sub: "편성기획 · 현재" },
              { year: "2025 ~", label: "서강대 AI 빅데이터 MBA", sub: "GPA 4.45 / 4.5 · 2026년 6월 졸업예정" },
              { year: "2014 ~", label: "서강대 국문·신문방송학", sub: "GPA 3.73 / 4.5 · 우등졸업" },
            ].map(item => (
              <div key={item.year} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: DARK, minWidth: 48, paddingTop: 2, fontFamily: "sans-serif" }}>{item.year}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DARK, fontFamily: "sans-serif" }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: GRAY1, fontFamily: "sans-serif" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, onClick, featured }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={() => onClick(item)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: WHITE, border: `1px solid ${hover ? BLACK : GRAY3}`,
        borderRadius: 14, padding: featured ? "24px 28px" : 20,
        cursor: "pointer", transition: "all 0.2s",
        boxShadow: hover ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        display: featured ? "grid" : "block",
        gridTemplateColumns: featured ? "1fr 1fr" : undefined,
        gap: featured ? 28 : undefined,
        alignItems: featured ? "center" : undefined,
      }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <Tag text={item.tag} dark />
          <span style={{ fontSize: 11, color: GRAY1, fontFamily: "sans-serif" }}>{item.period}</span>
        </div>
        <h3 style={{ fontSize: featured ? 18 : 15, fontWeight: 700, color: DARK, margin: "0 0 6px", fontFamily: "sans-serif", lineHeight: 1.4 }}>{item.title}</h3>
        <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, margin: "0 0 10px", fontFamily: "sans-serif" }}>→ {item.result}</p>
        <p style={{ fontSize: 13, color: GRAY1, lineHeight: 1.6, margin: "0 0 12px", fontFamily: "sans-serif" }}>
          {(featured ? item.desc.slice(0, 120) : item.desc.slice(0, 80)) + "..."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {item.tags.slice(0, featured ? 4 : 3).map(t => <Tag key={t} text={t} />)}
        </div>
      </div>
      {item.imgKey && (
        <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${GRAY3}`, marginTop: featured ? 0 : 12 }}>
          <img src={IMG_MAP[item.imgKey]} alt={item.caption} style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: featured ? 220 : 140 }} />
        </div>
      )}
    </div>
  );
}

function WorkModal({ project, onClose }) {
  useEffect(() => {
    const fn = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  if (!project) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: 20, maxWidth: 680, width: "100%", maxHeight: "88vh", overflowY: "auto", padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <Tag text={project.tag} dark />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: DARK, margin: "10px 0 4px", fontFamily: "sans-serif" }}>{project.title}</h2>
            <span style={{ fontSize: 13, fontWeight: 600, color: GREEN, fontFamily: "sans-serif" }}>→ {project.result}</span>
          </div>
          <button onClick={onClose} style={{ background: GRAY2, border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 15, color: GRAY1 }}>✕</button>
        </div>
        {project.imgKey && (
          <div style={{ margin: "12px 0", borderRadius: 8, overflow: "hidden", border: `1px solid ${GRAY3}` }}>
            <img src={IMG_MAP[project.imgKey]} alt={project.caption} style={{ width: "100%", display: "block", objectFit: "contain" }} />
            {project.caption && <div style={{ padding: "6px 12px", background: GRAY2, fontSize: 11, color: GRAY1, fontFamily: "sans-serif" }}>{project.caption}</div>}
          </div>
        )}
        <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.8, margin: "16px 0", fontFamily: "sans-serif" }}>{project.desc}</p>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: GRAY1, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "sans-serif" }}>데이터 파이프라인</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {project.pipeline.map((step, i) => (
              <React.Fragment key={i}>
                <span style={{ fontSize: 12, color: DARK, background: GRAY2, border: `1px solid ${GRAY3}`, borderRadius: 6, padding: "4px 10px", fontFamily: "sans-serif" }}>{step}</span>
                {i < project.pipeline.length - 1 && <span style={{ color: GRAY4, fontWeight: 700 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.map(t => <Tag key={t} text={t} dark />)}
        </div>
      </div>
    </div>
  );
}

function Work() {
  const [sel, setSel] = useState(null);
  return (
    <section id="work" style={{ padding: "56px 40px", maxWidth: 900, margin: "0 auto", borderTop: `1px solid ${GRAY3}` }}>
      <Label text="Work Experience" />
      <p style={{ fontSize: 13, color: GRAY1, margin: "6px 0 20px", fontFamily: "sans-serif" }}>
        현대홈쇼핑 데이터전략팀 · 2019 ~ 현재 · 카드를 클릭하면 상세 내용을 볼 수 있어요
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        <WorkCard item={WORKS[0]} onClick={setSel} featured />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {WORKS.slice(1).map(item => <WorkCard key={item.id} item={item} onClick={setSel} />)}
        </div>
      </div>
      <WorkModal project={sel} onClose={() => setSel(null)} />
    </section>
  );
}

function ProjCard({ p, onClick, featured }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={() => onClick(p)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: WHITE, border: `1px solid ${hover ? BLACK : GRAY3}`,
        borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.2s",
        boxShadow: hover ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <Tag text={p.tag} dark />
        <span style={{ fontSize: 11, color: GRAY1, fontFamily: "sans-serif" }}>{p.period}</span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: "0 0 8px", fontFamily: "sans-serif", lineHeight: 1.4 }}>{p.title}</h3>
      <p style={{ fontSize: 13, color: GRAY1, lineHeight: 1.6, margin: "0 0 12px", fontFamily: "sans-serif" }}>{p.summary}</p>
      {p.media.type === "video" ? (
        <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${GRAY3}`, marginBottom: 12 }}>
          <VideoPlayer src={p.media.src} maxHeight={130} startTime={p.media.startTime || 0} />
        </div>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {p.tags.slice(0, 3).map(t => <Tag key={t} text={t} />)}
      </div>
    </div>
  );
}

function ProjModal({ project, onClose }) {
  useEffect(() => {
    const fn = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  if (!project) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: 20, maxWidth: 680, width: "100%", maxHeight: "88vh", overflowY: "auto", padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <Tag text={project.tag} dark />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: DARK, margin: "10px 0 0", fontFamily: "sans-serif" }}>{project.title}</h2>
            <p style={{ fontSize: 12, color: GRAY1, margin: "4px 0 0", fontFamily: "sans-serif" }}>{project.period}</p>
          </div>
          <button onClick={onClose} style={{ background: GRAY2, border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 15, color: GRAY1 }}>✕</button>
        </div>
        {project.media.type === "video" && (
          <div style={{ margin: "12px 0", borderRadius: 8, overflow: "hidden", border: `1px solid ${GRAY3}` }}>
            <VideoPlayer src={project.media.src} maxHeight={400} startTime={project.media.startTime || 0} />
            {project.media.caption && (
              <div style={{ padding: "6px 12px", background: GRAY2, fontSize: 11, color: GRAY1, fontFamily: "sans-serif" }}>{project.media.caption}</div>
            )}
          </div>
        )}
        {[
          { label: "문제 정의", value: project.problem },
          { label: "활용 데이터", value: project.data },
          { label: "분석 방법", value: project.method },
          { label: "핵심 결과", value: project.result, hi: true },
          { label: "비즈니스 임팩트", value: project.impact },
        ].map(r => (
          <div key={r.label} style={{ padding: "13px 0", borderBottom: `1px solid ${GRAY3}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: GRAY1, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5, fontFamily: "sans-serif" }}>{r.label}</div>
            <p style={{ fontSize: 14, color: r.hi ? BLACK : DARK, lineHeight: 1.7, margin: 0, fontFamily: "sans-serif", fontWeight: r.hi ? 700 : 400 }}>{r.value}</p>
          </div>
        ))}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 16 }}>
          {project.tags.map(t => <Tag key={t} text={t} dark />)}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [sel, setSel] = useState(null);
  return (
    <section id="projects" style={{ padding: "56px 40px", maxWidth: 900, margin: "0 auto", borderTop: `1px solid ${GRAY3}` }}>
      <Label text="Projects" />
      <p style={{ fontSize: 13, color: GRAY1, margin: "6px 0 20px", fontFamily: "sans-serif" }}>
        AI MBA 프로젝트 · 개인 프로젝트 · 카드를 클릭하면 상세 내용을 볼 수 있어요
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {PROJECTS.map(p => <ProjCard key={p.id} p={p} onClick={setSel} />)}
      </div>
      <ProjModal project={sel} onClose={() => setSel(null)} />
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "56px 40px 80px", maxWidth: 900, margin: "0 auto", borderTop: `1px solid ${GRAY3}` }}>
      <Label text="Contact" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: DARK, margin: "0 0 14px", fontFamily: "sans-serif" }}>함께 이야기해요.</h2>
          <p style={{ fontSize: 14, color: GRAY1, lineHeight: 1.8, fontFamily: "sans-serif" }}>데이터 전략, AI 기획, 비즈니스 애널리틱스 관련 기회라면 적극적으로 대화에 응하겠습니다.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Email", value: "yun110408@gmail.com", href: "mailto:yun110408@gmail.com" },
            { label: "Phone", value: "010-7702-1466", href: "tel:01077021466" },
          ].map(c => (
            <div key={c.label} style={{ padding: 18, background: GRAY2, borderRadius: 12, border: `1px solid ${GRAY3}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: GRAY1, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5, fontFamily: "sans-serif" }}>{c.label}</div>
              <a href={c.href} style={{ fontSize: 15, fontWeight: 600, color: BLACK, textDecoration: "none", fontFamily: "sans-serif" }}>{c.value}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "about", "work", "projects", "contact"];
    const obs = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: 0.3 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);
  return (
    <div style={{ background: WHITE, minHeight: "100vh" }}>
      <style>{"* { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #E5E8EB; border-radius: 2px; }"}</style>
      <Nav active={active} />
      <div style={{ paddingTop: 56 }}>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
      </div>
      <footer style={{ borderTop: `1px solid ${GRAY3}`, padding: "18px 40px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: GRAY1, fontFamily: "sans-serif" }}>© 2026 Yang Jungyoon</span>
        <span style={{ fontSize: 12, color: GRAY1, fontFamily: "sans-serif" }}>yun110408@gmail.com</span>
      </footer>
    </div>
  );
}
