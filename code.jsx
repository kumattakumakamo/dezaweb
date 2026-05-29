import { useState, useRef } from "react";

const COURSES = [
    { id: 0, period: "4月・5月", name: "仮想生物", desc: "架空の生物をデザインし、その生態系を考える課題。観察・発想・表現の基礎を習得する。", icon: "ti-bug", cols: ["#D3D1C7", "#9FE1CB", "#FAC775", "#B4B2A9"] },
    { id: 1, period: "6月・7月", name: "フィールド調査ポスター", desc: "現地調査の結果をポスターに視覚化する。データを「伝わる形」にする技術を磨く。", icon: "ti-map-pin", cols: ["#CECBF6", "#B5D4F4", "#C0DD97", "#D3D1C7"] },
    { id: 2, period: "夏休み", name: "夏休み", desc: "自由制作期間。各自のテーマで作品を制作し、2年前期の学びを深める。", icon: "ti-sun", cols: ["#FAC775", "#F5C4B3", "#9FE1CB", "#B4B2A9"] },
    { id: 3, period: "9月・10月", name: "遊びの提案", desc: "「遊び」をデザインする課題。ユーザー体験を考えながらゲームや体験を設計する。", icon: "ti-puzzle", cols: ["#9FE1CB", "#C0DD97", "#CECBF6", "#D3D1C7"] },
    { id: 4, period: "11月・12月", name: "サービスの提案", desc: "社会課題を解決するサービスをデザインする。ステークホルダーマップやペルソナを活用。", icon: "ti-device-mobile", cols: ["#B5D4F4", "#CECBF6", "#9FE1CB", "#C0DD97"] },
    { id: 5, period: "春休み", name: "春休み", desc: "1年間の学びを振り返り、次の学年に向けて自由制作に取り組む最終フェーズ。", icon: "ti-flower", cols: ["#F5C4B3", "#FAC775", "#D3D1C7", "#B4B2A9"] },
];

const SLIDE_LABELS = ["作品写真", "制作過程", "プレゼン資料", "ボツ案も…"];
const CYCLE = [
    { icon: "ti-eye", label: "観察する" },
    { icon: "ti-bulb", label: "発想する" },
    { icon: "ti-pencil", label: "つくる" },
    { icon: "ti-presentation", label: "伝える" },
];
const TOOLS = ["Figma", "Illustrator", "工房", "アトリエ", "カメラ", "3Dプリンタ"];

const SH_NODES = [
    { id: "user", label: "ユーザー", x: 160, y: 30 },
    { id: "coop", label: "大学生協", x: 28, y: 152 },
    { id: "shop", label: "地域商店", x: 292, y: 152 },
    { id: "service", label: "サービス", x: 160, y: 258 },
];
const SH_STEPS = [
    [],
    [{ from: "user", to: "service", label: "利用する" }],
    [
        { from: "user", to: "service", label: "利用する" },
        { from: "user", to: "coop", label: "会員" },
        { from: "user", to: "shop", label: "訪問" },
        { from: "coop", to: "service", label: "提供" },
        { from: "shop", to: "service", label: "連携" },
        { from: "coop", to: "shop", label: "取引" },
    ],
];
const SH_DESC = [
    "4つのノードがいます。誰と誰がどんな関係でつながっているか考えてみよう。",
    "ユーザーとサービスの関係が繋がりました。他の関係はどうでしょう？",
    "完成！全員が何らかの関係で結ばれています。これがステークホルダーマップです。",
];

const BASE_STYLE = {
    fontFamily: "'Hiragino Kaku Gothic ProN','Hiragino Sans','Meiryo','Noto Sans JP',sans-serif",
    background: "#FAF8F3",
    color: "#2C2C2A",
    maxWidth: 390,
    margin: "0 auto",
    minHeight: "100vh",
    overflowX: "hidden",
};

function AppHeader({ onLogoTap }) {
    return (
        <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,248,243,0.96)", borderBottom: "1.5px solid #2C2C2A", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, cursor: "pointer", userSelect: "none" }} onClick={onLogoTap}>
                情報デザインコース
            </span>
            <i className="ti ti-menu-2" style={{ fontSize: 22 }} aria-label="メニュー" />
        </header>
    );
}

function KeyVisual() {
    const colors = ["#D3D1C7", "#9FE1CB", "#FAC775", "#CECBF6", "#B5D4F4", "#F5C4B3", "#C0DD97", "#B4B2A9", "#9FE1CB", "#FAC775"];
    return (
        <section style={{ position: "relative", height: 500, overflow: "hidden", background: "#F1EFE8" }}>
            <style>{`
        @keyframes kvUp{from{transform:translateY(0)}to{transform:translateY(-50%)}}
        @keyframes kvDown{from{transform:translateY(-50%)}to{transform:translateY(0)}}
        .kv-up{animation:kvUp 22s linear infinite}
        .kv-down{animation:kvDown 22s linear infinite}
      `}</style>
            <div style={{ display: "flex", gap: 6, padding: 6, height: "100%" }}>
                {[colors, [...colors].reverse()].map((col, ci) => (
                    <div key={ci} style={{ flex: 1, overflow: "hidden" }}>
                        <div className={ci === 0 ? "kv-up" : "kv-down"}>
                            {[...col, ...col].map((c, i) => (
                                <div key={i} style={{ height: 96, background: c, borderRadius: 6, marginBottom: 6, border: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "rgba(0,0,0,0.25)" }}>photo</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,248,243,0.68)" }}>
                <div style={{ background: "#FAF8F3", border: "2.5px solid #2C2C2A", borderRadius: 6, padding: "18px 24px", textAlign: "center", transform: "rotate(-0.8deg)", boxShadow: "4px 4px 0 rgba(0,0,0,0.12)" }}>
                    <div style={{ fontSize: 10, color: "#888780", letterSpacing: "0.18em", marginBottom: 6 }}>FUTURE UNIVERSITY HAKODATE</div>
                    <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.6 }}>未来大<br />情報デザインコース<br />特設サイト</div>
                    <div style={{ marginTop: 10, fontSize: 12, color: "#3B6D11", fontWeight: 700, background: "#EAF3DE", padding: "4px 10px", borderRadius: 4, display: "inline-block" }}>
                        「デザイン」の解像度を上げるサイト
                    </div>
                </div>
            </div>
        </section>
    );
}

function WelcomeSection({ revealed, setRevealed }) {
    return (
        <section style={{ padding: "32px 16px 24px" }}>
            <p style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.6, margin: "0 0 12px" }}>
                未来大情報デザインコース<br />特設サイトへようこそ！
            </p>
            <p style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.8, margin: "0 0 20px" }}>
                このサイトでは、情報デザインコースに所属したばかりの<br /><strong>2年生の学び</strong>について紹介します。
            </p>
            <div style={{ position: "relative", height: 186, marginBottom: 20 }}>
                {[
                    { label: "複雑系\nコース", top: 8, left: 16, right: "auto", bottom: "auto", h: false },
                    { label: "知能システム\nコース", top: 8, left: "auto", right: 16, bottom: "auto", h: false },
                    { label: "情報システム\nコース", top: "auto", left: 16, right: "auto", bottom: 8, h: false },
                    { label: "情報デザイン\nコース", top: "auto", left: "auto", right: 16, bottom: 8, h: true },
                ].map((c, i) => (
                    <div key={i} style={{ position: "absolute", width: 84, height: 84, borderRadius: "50%", border: c.h ? "2.5px solid #2C2C2A" : "1.5px solid #888780", background: c.h ? "rgba(159,225,203,0.35)" : "rgba(250,248,243,0.7)", display: "flex", alignItems: "center", justifyContent: "center", top: c.top, bottom: c.bottom, left: c.left, right: c.right, fontSize: 10, fontWeight: c.h ? 700 : 400, textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line" }}>
                        {c.label}
                    </div>
                ))}
            </div>
            <div onClick={() => setRevealed(true)} style={{ border: `1.5px solid ${revealed ? "#639922" : "#888780"}`, borderRadius: 8, padding: 14, cursor: "pointer", background: revealed ? "#EAF3DE" : "#FAF8F3", transition: "background 0.3s" }}>
                {!revealed ? (
                    <>
                        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                            <i className="ti ti-help-circle" aria-hidden="true" style={{ marginRight: 6 }} />クイズ：これはデザインですか？
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 2, borderLeft: "3px solid #D3D1C7", paddingLeft: 10 }}>
                            <span style={{ fontFamily: "serif" }}>未来大学情報デザインコース</span><br />
                            <span style={{ fontFamily: "serif" }}>2025年度 春学期カリキュラム</span><br />
                            <span style={{ fontSize: 11, color: "#888780" }}>（タップして確認する）</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#3B6D11", marginBottom: 6 }}>✓ これもデザインされています！</div>
                        <p style={{ fontSize: 12, color: "#5F5E5A", margin: 0, lineHeight: 1.7 }}>
                            フォント・行間・余白——テキストだけのポスターも、すべてデザインの選択です。情報デザインは「見た目だけ」じゃない。
                        </p>
                    </>
                )}
            </div>
        </section>
    );
}

function CycleSection() {
    return (
        <section style={{ padding: "24px 16px", background: "#F1EFE8", borderTop: "1px solid #D3D1C7", borderBottom: "1px solid #D3D1C7" }}>
            <div style={{ display: "inline-block", background: "#FAF8F3", border: "2px solid #2C2C2A", borderRadius: 4, padding: "4px 12px", fontSize: 13, fontWeight: 700, transform: "rotate(-1deg)", marginBottom: 6 }}>情デザの学び方</div>
            <p style={{ fontSize: 12, color: "#5F5E5A", margin: "4px 0 16px", lineHeight: 1.7 }}>「観察→発想→つくる→伝える」のサイクルを繰り返してスキルを磨く。</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                {CYCLE.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 52 }}>
                            <div style={{ width: 42, height: 42, border: "2px solid #2C2C2A", borderRadius: "50%", background: "#FAF8F3", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                                <i className={`ti ${s.icon}`} style={{ fontSize: 18 }} aria-hidden="true" />
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 600 }}>{s.label}</span>
                        </div>
                        {i < 3 && <i className="ti ti-arrow-right" style={{ fontSize: 12, color: "#888780", margin: "0 2px 12px" }} aria-hidden="true" />}
                    </div>
                ))}
                <span style={{ fontSize: 16, color: "#888780", marginBottom: 12 }}>↩</span>
            </div>
            <p style={{ fontSize: 10, color: "#888780", margin: "0 0 8px", fontWeight: 600, letterSpacing: "0.05em" }}>使うツール・施設</p>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {TOOLS.map((t, i) => (
                    <span key={i} style={{ flexShrink: 0, border: "1.5px solid #888780", borderRadius: 4, padding: "5px 10px", fontSize: 11, fontWeight: 500, background: "#FAF8F3" }}>{t}</span>
                ))}
            </div>
        </section>
    );
}

function LearningSection({ activeCourse, setActiveCourse, slideIndex, updateSlide, onExperience }) {
    const ref = useRef(null);
    const handleScroll = () => {
        if (!ref.current) return;
        const idx = Math.round(ref.current.scrollTop / 440);
        setActiveCourse(Math.min(5, Math.max(0, idx)));
    };
    const goTo = (i) => {
        if (!ref.current) return;
        ref.current.scrollTo({ top: i * 440, behavior: "smooth" });
        setActiveCourse(i);
    };
    return (
        <section>
            <div style={{ padding: "24px 16px 8px" }}>
                <div style={{ display: "inline-block", background: "#FAF8F3", border: "2px solid #2C2C2A", borderRadius: 4, padding: "4px 10px", fontSize: 12, fontWeight: 700, transform: "rotate(-1deg)" }}>
                    情報デザインコース２年生の１年間の学び
                </div>
            </div>
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 10, width: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "4px 0" }}>
                    {COURSES.map((c, i) => (
                        <button key={i} onClick={() => goTo(i)} style={{ width: 34, height: 34, borderRadius: "50%", border: activeCourse === i ? "2px solid #2C2C2A" : "1px solid #888780", background: activeCourse === i ? "#2C2C2A" : "#FAF8F3", color: activeCourse === i ? "#FAF8F3" : "#888780", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, flexShrink: 0 }}>
                            <i className={`ti ${c.icon}`} style={{ fontSize: 13 }} aria-hidden="true" />
                        </button>
                    ))}
                </div>
                <div ref={ref} onScroll={handleScroll} style={{ marginLeft: 44, height: 440, overflowY: "scroll", scrollSnapType: "y mandatory" }}>
                    {COURSES.map((c, i) => (
                        <div key={i} style={{ height: 440, scrollSnapAlign: "start", padding: "12px", display: "flex", flexDirection: "column", borderBottom: "1px solid #D3D1C7", boxSizing: "border-box" }}>
                            <div style={{ fontSize: 10, color: "#888780", marginBottom: 2 }}>{c.period}</div>
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 5 }}>{c.name}</div>
                            <div style={{ fontSize: 12, color: "#5F5E5A", lineHeight: 1.7, marginBottom: 10, flex: "0 0 auto" }}>{c.desc}</div>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                <div style={{ height: 138, background: c.cols[slideIndex[i]], borderRadius: 6, border: "1.5px solid #888780", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#5F5E5A", marginBottom: 6 }}>
                                    {SLIDE_LABELS[slideIndex[i]]}
                                </div>
                                <div style={{ fontSize: 10, color: "#5F5E5A", marginBottom: 6 }}>
                                    {slideIndex[i] === 3 ? "👀 最初の案はこんな感じでした…" : `${c.name}の記録（${slideIndex[i] + 1}/4）`}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                    <button onClick={() => updateSlide(i, -1)} style={{ padding: "4px 14px", border: "1.5px solid #888780", borderRadius: 4, background: "#FAF8F3", cursor: "pointer" }}>
                                        <i className="ti ti-arrow-left" aria-hidden="true" />
                                    </button>
                                    <span style={{ fontSize: 11, color: "#888780" }}>{slideIndex[i] + 1} / 4</span>
                                    <button onClick={() => updateSlide(i, 1)} style={{ padding: "4px 14px", border: "1.5px solid #888780", borderRadius: 4, background: "#FAF8F3", cursor: "pointer" }}>
                                        <i className="ti ti-arrow-right" aria-hidden="true" />
                                    </button>
                                </div>
                                <button onClick={onExperience} style={{ width: "100%", padding: "10px", border: "2px solid #2C2C2A", borderRadius: 6, background: "#FAF8F3", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12, fontWeight: 700, transform: "rotate(0.3deg)" }}>
                                    <i className="ti ti-player-play" aria-hidden="true" />疑似体験コーナーへ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MiraitenSection() {
    const imgCols = ["#D3D1C7", "#9FE1CB", "#FAC775", "#CECBF6", "#B5D4F4"];
    return (
        <section style={{ padding: "32px 16px 24px", background: "#F1EFE8", borderTop: "1px solid #D3D1C7" }}>
            <div style={{ display: "inline-block", background: "#FAF8F3", border: "2px solid #2C2C2A", borderRadius: 4, padding: "4px 12px", fontSize: 13, fontWeight: 700, transform: "rotate(-1deg)", marginBottom: 8 }}>未来展</div>
            <p style={{ fontSize: 12, color: "#5F5E5A", margin: "4px 0 12px", lineHeight: 1.7 }}>1年間の集大成を学外に向けて発表する場。来場者に直接作品を伝える体験ができます。</p>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {imgCols.map((c, i) => (
                    <div key={i} style={{ flexShrink: 0, width: 130, height: 88, background: c, borderRadius: 6, border: "1.5px solid #888780", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#5F5E5A" }}>当日の様子 {i + 1}</div>
                ))}
            </div>
            <p style={{ fontSize: 12, color: "#3B6D11", fontWeight: 600, margin: "12px 0 0" }}>→ OCで制作の裏側を学生に聞いてみよう</p>
        </section>
    );
}

function CTASection() {
    return (
        <section style={{ padding: "32px 16px 32px" }}>
            <div style={{ display: "inline-block", background: "#FAF8F3", border: "2px solid #2C2C2A", borderRadius: 4, padding: "4px 12px", fontSize: 13, fontWeight: 700, transform: "rotate(-0.8deg)", marginBottom: 16 }}>オープンキャンパスに来てみよう</div>
            <div style={{ border: "2px solid #2C2C2A", borderRadius: 8, padding: 16, marginBottom: 16, transform: "rotate(-0.2deg)" }}>
                <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 10px" }}>OCに来ると…</p>
                <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 12, lineHeight: 2.2 }}>
                    <li>学生の制作物を直接見られる</li>
                    <li>現役学生に制作の話を聞ける</li>
                    <li>FigmaやIllustratorを実際に触れる</li>
                    <li>未来展の作品展示を体感できる</li>
                </ul>
            </div>
            <button style={{ width: "100%", padding: 14, background: "#2C2C2A", color: "#FAF8F3", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
                オープンキャンパスに申し込む ↗
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#888780", margin: 0 }}>2025年8月開催予定</p>
        </section>
    );
}

function EasterEggPopup({ onClose }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
            <div style={{ background: "#FAF8F3", border: "2.5px solid #2C2C2A", borderRadius: 8, padding: "24px 20px", maxWidth: 280, textAlign: "center", transform: "rotate(-1.5deg)", boxShadow: "4px 4px 0 rgba(0,0,0,0.2)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>隠れ情報デザイナーを発見！</div>
                <p style={{ fontSize: 12, color: "#5F5E5A", lineHeight: 1.8, margin: "0 0 12px" }}>
                    実はこのサイト、Figmaでデザインしてからコーディングしました。デザインツールが気になる人は、OCで聞いてみてね！
                </p>
                <div style={{ fontSize: 11, color: "#888780" }}>タップで閉じる</div>
            </div>
        </div>
    );
}

function ExperienceTop({ onSelect, onBack }) {
    const buildings = [
        [56, 96, 88, 64, "講義棟"], [218, 84, 96, 72, "研究棟"],
        [28, 238, 72, 52, "工房"], [244, 250, 84, 52, "アトリエ"],
        [124, 346, 104, 46, "ライブラリ"],
    ];
    return (
        <div style={{ ...BASE_STYLE }}>
            <AppHeader onLogoTap={() => { }} />
            <div style={{ position: "relative", height: 476, background: "#F1EFE8", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.04) 28px,rgba(0,0,0,0.04) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(0,0,0,0.04) 28px,rgba(0,0,0,0.04) 29px)" }} />
                <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%) rotate(-2deg)", background: "#FAF8F3", border: "2px solid #2C2C2A", borderRadius: 4, padding: "6px 18px", fontSize: 14, fontWeight: 700, zIndex: 2, whiteSpace: "nowrap", boxShadow: "2px 2px 0 rgba(0,0,0,0.12)" }}>
                    情デザ体験入学コーナー
                </div>
                {buildings.map(([l, t, w, h, label], i) => (
                    <div key={i} style={{ position: "absolute", left: l, top: t, width: w, height: h, background: "#D3D1C7", border: "1.5px solid #888780", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#5F5E5A" }}>{label}</div>
                ))}
                <div style={{ position: "absolute", bottom: 44, right: 28, width: 50, height: 50, background: "#B4B2A9", borderRadius: "50% 50% 50% 50% / 55% 55% 45% 45%", border: "1.5px solid #888780", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🐰</div>
                <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", fontSize: 26 }}>📷</div>
                <button onClick={() => onSelect("stakeholder")} style={{ position: "absolute", top: 160, left: 145, width: 62, height: 62, borderRadius: "50%", border: "2.5px solid #2C2C2A", background: "rgba(250,248,243,0.96)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: 0, boxShadow: "2px 2px 0 rgba(0,0,0,0.15)" }}>
                    <i className="ti ti-arrows-split" style={{ fontSize: 20 }} aria-hidden="true" />
                    <span style={{ fontSize: 8, fontWeight: 700 }}>ステーク</span>
                </button>
                <button disabled style={{ position: "absolute", top: 208, left: 60, width: 56, height: 56, borderRadius: "50%", border: "1.5px solid #888780", background: "rgba(250,248,243,0.7)", cursor: "not-allowed", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: 0, opacity: 0.55 }}>
                    <i className="ti ti-id-badge" style={{ fontSize: 18 }} aria-hidden="true" />
                    <span style={{ fontSize: 8 }}>近日公開</span>
                </button>
            </div>
            <div style={{ padding: 16 }}>
                <button onClick={onBack} style={{ padding: "8px 16px", border: "1.5px solid #888780", borderRadius: 6, background: "#FAF8F3", cursor: "pointer", fontSize: 12 }}>
                    <i className="ti ti-arrow-left" /> サイトに戻る
                </button>
            </div>
        </div>
    );
}

function StakeholderGame({ step, setStep, onBack, onBackMain }) {
    const nodeMap = Object.fromEntries(SH_NODES.map(n => [n.id, n]));
    const conns = SH_STEPS[step];
    const R = 22;
    return (
        <div style={{ ...BASE_STYLE }}>
            <div style={{ background: "rgba(250,248,243,0.96)", borderBottom: "1.5px solid #2C2C2A", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ border: "1.5px solid #2C2C2A", borderRadius: 4, padding: "2px 10px", fontSize: 11, fontWeight: 700, transform: "rotate(-1deg)", background: "#FAF8F3" }}>情デザ体験入学中</div>
            </div>
            <div style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <i className="ti ti-arrows-split" style={{ fontSize: 22 }} aria-hidden="true" />
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>ステークホルダーマップ</h2>
                </div>
                <p style={{ fontSize: 12, color: "#5F5E5A", margin: "0 0 12px", lineHeight: 1.6 }}>
                    どんな関係が成り立つサービスになるだろう？<br />みんなを線で繋げてみよう
                </p>
                <div style={{ background: "#EAF3DE", border: "1px solid #C0DD97", borderRadius: 6, padding: "8px 12px", marginBottom: 14, fontSize: 11, color: "#3B6D11", lineHeight: 1.6 }}>
                    <strong>ステークホルダーとは？</strong> サービスに関わるすべての人・組織のこと。
                </div>
                <div style={{ background: "#F8F8F5", border: "1.5px solid #D3D1C7", borderRadius: 8, padding: 4, marginBottom: 10 }}>
                    <svg width="320" height="290" viewBox="0 0 320 290" style={{ display: "block", margin: "0 auto" }}>
                        <defs>
                            <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                                <path d="M0,0.5 L0,6.5 L6,3.5 Z" fill="#2C2C2A" />
                            </marker>
                        </defs>
                        {conns.map((c, i) => {
                            const f = nodeMap[c.from], t = nodeMap[c.to];
                            const dx = t.x - f.x, dy = t.y - f.y;
                            const d = Math.sqrt(dx * dx + dy * dy);
                            const x1 = f.x + dx / d * R, y1 = f.y + dy / d * R;
                            const x2 = t.x - dx / d * R, y2 = t.y - dy / d * R;
                            const mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2;
                            return (
                                <g key={i}>
                                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2C2C2A" strokeWidth="1.5" markerEnd="url(#arr)" />
                                    <rect x={mx - 18} y={my - 10} width="36" height="14" rx="3" fill="rgba(250,248,243,0.9)" />
                                    <text x={mx} y={my + 1} textAnchor="middle" fontSize="8" fill="#5F5E5A" dominantBaseline="middle">{c.label}</text>
                                </g>
                            );
                        })}
                        {SH_NODES.map(n => (
                            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                                <circle r={R} fill="#FAF8F3" stroke="#2C2C2A" strokeWidth="1.5" />
                                <text textAnchor="middle" fontSize="9" fill="#2C2C2A" dominantBaseline="middle" fontWeight="600">{n.label}</text>
                            </g>
                        ))}
                    </svg>
                </div>
                <div style={{ fontSize: 11, color: "#5F5E5A", marginBottom: 14, padding: "6px 10px", background: "#F1EFE8", borderRadius: 4 }}>
                    サービス名：大学周辺の地域商店とつなぐ購買アプリ
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
                    {["3-1", "3-2", "3-3"].map((label, i) => (
                        <button key={i} onClick={() => setStep(i)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: step === i ? 700 : 400, border: step === i ? "2px solid #2C2C2A" : "1px solid #888780", borderRadius: 4, background: step === i ? "#2C2C2A" : "#FAF8F3", color: step === i ? "#FAF8F3" : "#2C2C2A", cursor: "pointer" }}>
                            {label}
                        </button>
                    ))}
                </div>
                <div style={{ fontSize: 12, color: "#5F5E5A", lineHeight: 1.7, marginBottom: 20, padding: "8px 12px", border: "1px solid #D3D1C7", borderRadius: 6 }}>
                    {SH_DESC[step]}
                </div>
            </div>
            <div style={{ position: "sticky", bottom: 0, background: "rgba(250,248,243,0.96)", borderTop: "1.5px solid #D3D1C7", display: "flex", justifyContent: "space-between", padding: "10px 16px" }}>
                <button onClick={onBackMain} style={{ padding: "8px 12px", fontSize: 11, border: "1.5px solid #888780", borderRadius: 6, background: "#FAF8F3", cursor: "pointer" }}>
                    <i className="ti ti-arrow-left" /> サービス提案
                </button>
                <button onClick={onBack} style={{ padding: "8px 12px", fontSize: 11, border: "1.5px solid #888780", borderRadius: 6, background: "#FAF8F3", cursor: "pointer", transform: "rotate(0.5deg)" }}>
                    ゲームセレクトへ戻る ↩
                </button>
            </div>
        </div>
    );
}

export default function App() {
    const [screen, setScreen] = useState("main");
    const [activeCourse, setActiveCourse] = useState(0);
    const [slideIndex, setSlideIndex] = useState([0, 0, 0, 0, 0, 0]);
    const [easterFound, setEasterFound] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [shStep, setShStep] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const handleLogoTap = () => {
        const n = tapCount + 1;
        setTapCount(n);
        if (n >= 5) { setEasterFound(true); setTapCount(0); }
    };
    const updateSlide = (id, dir) => {
        setSlideIndex(prev => {
            const next = [...prev];
            next[id] = (next[id] + dir + 4) % 4;
            return next;
        });
    };

    if (screen === "stakeholder") {
        return <StakeholderGame step={shStep} setStep={setShStep} onBack={() => setScreen("experience")} onBackMain={() => setScreen("main")} />;
    }
    if (screen === "experience") {
        return <ExperienceTop onSelect={setScreen} onBack={() => setScreen("main")} />;
    }

    return (
        <div style={{ ...BASE_STYLE }}>
            <AppHeader onLogoTap={handleLogoTap} />
            {easterFound && <EasterEggPopup onClose={() => setEasterFound(false)} />}
            <KeyVisual />
            <WelcomeSection revealed={revealed} setRevealed={setRevealed} />
            <CycleSection />
            <LearningSection
                activeCourse={activeCourse}
                setActiveCourse={setActiveCourse}
                slideIndex={slideIndex}
                updateSlide={updateSlide}
                onExperience={() => setScreen("experience")}
            />
            <MiraitenSection />
            <CTASection />
            <div style={{ padding: "16px", textAlign: "center", fontSize: 11, color: "#888780", borderTop: "1px solid #D3D1C7" }}>
                ※ このサイトにはイースターエッグが隠れています
            </div>
        </div>
    );
}