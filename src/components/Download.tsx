"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Chest, XMark } from "./Art";
import { CheckIcon, ClockIcon, CopyIcon, DesktopIcon, IphoneIcon, PhoneIcon, WarnIcon } from "./Icons";
import { usePlatform } from "./PlatformContext";
import { Heading, Reveal } from "./Reveal";
import { siteConfig } from "@/config/site.config";
import { PLATFORM_LABELS, siteData, type Platform } from "@/lib/site";

type Step = { title: string; time: string; text: React.ReactNode };
type DlKey = "windows" | "androidReady" | "androidConverter" | "ios";
type FileKey = "windows" | "androidReady" | "ios";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- small pieces ---------------- */

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="warn" role="note">
        <WarnIcon />
        <p>{children}</p>
      </div>
    </Reveal>
  );
}

function DownloadButton({ id, label, variant = "big" }: { id: DlKey; label: string; variant?: "big" | "small" | "ghost" }) {
  const cfg = siteConfig.downloads[id];
  const enabled = id === "androidConverter" ? siteConfig.downloads.androidConverter.enabled === true : Boolean(cfg.url);
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [mirror, setMirror] = useState(false);
  const [hover, setHover] = useState(false);

  const click = () => {
    if (!enabled || state === "busy") return;
    setState("busy");
    setTimeout(() => {
      setState("done");
      if (cfg.mirror) setMirror(true);
      window.location.href = cfg.url;
    }, 900);
  };

  const text = !enabled
    ? id === "androidConverter"
      ? "เร็วๆ นี้"
      : "ลิงก์ดาวน์โหลดยังไม่พร้อม"
    : state === "busy"
      ? "กำลังขนสมบัติ..."
      : state === "done"
        ? "ดาวน์โหลดอีกครั้ง"
        : label;
  const cls = variant === "big" ? "btn big" : variant === "ghost" ? "btn small ghost" : "btn small";

  return (
    <div className="dl">
      <motion.button
        type="button"
        className={cls}
        aria-disabled={!enabled}
        onClick={click}
        style={{ position: "relative", overflow: "hidden" }}
        whileHover={enabled ? { y: -2, scale: 1.02 } : undefined}
        whileTap={enabled ? { scale: 0.97 } : undefined}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        {state === "busy" && (
          <motion.span
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.25)", transformOrigin: "0 50%" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
        <Chest size={variant === "big" ? 34 : 28} open={enabled && (hover || state === "busy")} />
        <span style={{ position: "relative" }}>{text}</span>
      </motion.button>
      <AnimatePresence>
        {mirror && cfg.mirror && (
          <motion.p
            className="faint"
            style={variant === "big" ? undefined : { fontSize: 12 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            ลิงก์หลักใช้ไม่ได้?{" "}
            <a href={cfg.mirror} rel="noopener">
              ลองลิงก์สำรอง (Mirror)
            </a>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function HashButton({ file, prefix }: { file: FileKey; prefix?: string }) {
  const info = siteData.files[file];
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!info) return;
    try {
      await navigator.clipboard.writeText(info.sha256);
    } catch {
      /* clipboard unavailable: still show the confirmation so the click is not silent */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <>
      <motion.button type="button" className="hash" onClick={copy} aria-label="คัดลอกค่า SHA-256" whileTap={{ scale: 0.97 }}>
        <span>
          {prefix}
          {info?.sha256 ?? "—"}
        </span>
        <CopyIcon />
      </motion.button>
      <AnimatePresence>
        {copied && (
          <motion.span
            className="copied"
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckIcon /> ปักหมุดแล้ว (คัดลอก)
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}

function FileInfo({ file }: { file: FileKey }) {
  const info = siteData.files[file];
  return (
    <Reveal>
      <div className="fileinfo">
        <div className="f">
          <span className="k">ไฟล์ติดตั้ง</span>
          <span className="mono">{info?.name ?? "—"}</span>
        </div>
        <div className="f">
          <span className="k">ขนาดไฟล์</span>
          <span className="v">{info?.size ?? "—"}</span>
        </div>
        <div className="f">
          <span className="k">เวอร์ชัน</span>
          <span className="v">{siteData.version}</span>
        </div>
        <div className="f">
          <span className="k">อัปเดตล่าสุด</span>
          <span className="v">{info?.date ?? "—"}</span>
        </div>
        <div className="f" style={{ flex: 1, minWidth: 220 }}>
          <span className="k">SHA-256</span>
          <HashButton file={file} />
        </div>
      </div>
    </Reveal>
  );
}

/** Numbered steps; an orange line fills down the list as you scroll and each number lights up when reached. */
function Steps({ title, steps }: { title: string; steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.ceil(v * steps.length - 0.05)));

  return (
    <div className="steps">
      <h3>{title}</h3>
      <div className="list" ref={ref}>
        <div className="step-line" aria-hidden="true">
          <motion.i style={{ scaleY }} />
        </div>
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className={`step${reached > i ? " on" : ""}`}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            <div className="n" aria-hidden="true">
              {i + 1}
            </div>
            <div className="body">
              <div className="head">
                <b>{s.title}</b>
                <span className="t">
                  <ClockIcon /> {s.time}
                </span>
              </div>
              <p>{s.text}</p>
            </div>
          </motion.div>
        ))}
        <div className="treasure">
          <div className="x">
            <XMark size={30} show={reached >= steps.length} />
          </div>
          <span>ถึงเกาะสมบัติแล้ว — เปิดเกมได้เลย!</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- platform panels ---------------- */

function WindowsPanel() {
  const size = siteData.files.windows?.size ?? "~19 MB";
  return (
    <>
      <FileInfo file="windows" />
      <DownloadButton id="windows" label="ดาวน์โหลดตัวติดตั้ง (.exe)" />
      <Steps
        title="ขั้นตอนติดตั้ง"
        steps={[
          { title: "ดาวน์โหลดตัวติดตั้ง (.exe)", time: "~30 วินาที", text: <>ไฟล์ขนาดเล็กประมาณ {size} ดาวน์โหลดเสร็จเร็ว</> },
          { title: "เปิดไฟล์ที่ดาวน์โหลด", time: "~10 วินาที", text: <>ถ้า Windows เตือน SmartScreen ให้กด &quot;More info&quot; แล้วเลือก &quot;Run anyway&quot;</> },
          {
            title: "เลือกโฟลเดอร์เกม แล้วกดติดตั้ง",
            time: "~20 วินาที",
            text: (
              <>
                เลือกโฟลเดอร์ที่มี OPTCGSim.exe (ถ้าวางตัวติดตั้งไว้ในโฟลเดอร์เกม โปรแกรมจะหาให้เอง)
                เลือกได้ว่าจะแปลรูปการ์ด ข้อความในเกม หรือทั้งสองอย่าง แล้วกด &quot;ติดตั้งภาษาไทย&quot;
              </>
            ),
          },
          { title: "รอจนเสร็จ แล้วเปิดเกม", time: "~2–5 นาที", text: <>โปรแกรมสำรองรูปอังกฤษเดิมไว้ให้ เมื่อเสร็จเปิดเกม OPTCGSim ได้เลย</> },
        ]}
      />
      <Warn>
        Windows อาจแจ้งเตือน SmartScreen เพราะไฟล์ยังไม่มีลายเซ็นดิจิทัล กด &quot;More info&quot; แล้วเลือก &quot;Run anyway&quot; เพื่อดำเนินการต่อ
        ตรวจค่า SHA-256 ให้ตรงกับด้านบนได้ถ้าต้องการความมั่นใจ
      </Warn>
    </>
  );
}

function AndroidPanel() {
  const apk = siteData.files.androidReady;
  return (
    <>
      <div className="opts">
        <Reveal className="opt">
          <span className="chip">แนะนำ • ไฟล์เล็กกว่า</span>
          <h3>เครื่องมือแปลงไฟล์ของคุณเอง</h3>
          <p>แปลงไฟล์ apk ของคุณเองให้เป็นเวอร์ชันภาษาไทย โดยไม่ต้องโหลดไฟล์เกมทั้งหมดใหม่ เหมาะกับคนเน็ตช้าหรือพื้นที่เก็บข้อมูลจำกัด</p>
          <DownloadButton id="androidConverter" label="ดาวน์โหลดเครื่องมือแปลงไฟล์" variant="small" />
        </Reveal>
        <Reveal className="opt" delay={0.1}>
          <span className="chip mute">ไฟล์สำเร็จรูป</span>
          <h3>APK แปลไทยพร้อมติดตั้ง</h3>
          <p>
            ไฟล์ <span className="mono">{apk?.name ?? "1.44a_Android_TH.apk"}</span> ขนาด {apk?.size ?? "—"} ติดตั้งแทนที่เกมเดิมได้เลยโดยไม่ต้องแปลงเอง
          </p>
          <div className="meta">
            <span>เวอร์ชัน {siteData.version}</span>
            <span>อัปเดต {apk?.date ?? "—"}</span>
          </div>
          <HashButton file="androidReady" prefix="SHA-256: " />
          <DownloadButton id="androidReady" label="ดาวน์โหลด APK สำเร็จรูป" variant="ghost" />
        </Reveal>
      </div>
      <Steps
        title="ขั้นตอนติดตั้ง"
        steps={[
          { title: "สำรองโฟลเดอร์ Decks และถอนแอปเดิม", time: "~1 นาที", text: <>สำรองเด็คของคุณไว้ก่อน แล้วถอนการติดตั้ง OPTCGSim เวอร์ชันเดิมออกจากเครื่อง (ลายเซ็นต่างกัน ติดตั้งทับไม่ได้)</> },
          { title: "ดาวน์โหลดไฟล์ตามวิธีที่เลือกด้านบน", time: "~5–15 นาที", text: <>ไฟล์ APK สำเร็จรูปมีขนาดใหญ่ อาจใช้เวลานานขึ้นตามความเร็วอินเทอร์เน็ต</> },
          { title: "อนุญาตติดตั้งจากแหล่งที่ไม่รู้จัก", time: "~20 วินาที", text: <>เปิดไฟล์ที่ดาวน์โหลด แล้วกดอนุญาต &quot;ติดตั้งจากแหล่งที่ไม่รู้จัก&quot; เมื่อระบบถาม</> },
          { title: "เปิดเกมและนำเด็คกลับเข้าไป", time: "~1 นาที", text: <>เปิดเกม OPTCGSim แล้วนำเข้าเด็คที่สำรองไว้กลับเข้าไปตามเดิม</> },
        ]}
      />
      <Warn>ต้องถอนแอป OPTCGSim เวอร์ชันเดิมออกก่อนติดตั้งเวอร์ชันแปลไทย และควรสำรองโฟลเดอร์ Decks ไว้ล่วงหน้าเสมอ</Warn>
    </>
  );
}

function IosPanel() {
  const size = siteData.files.ios?.size ?? "~771 MB";
  return (
    <>
      <FileInfo file="ios" />
      <DownloadButton id="ios" label="ดาวน์โหลดไฟล์ .ipa" />
      <Steps
        title="ขั้นตอนติดตั้ง (ต้องใช้คอมพิวเตอร์)"
        steps={[
          { title: "ติดตั้ง Sideloadly หรือ AltStore", time: "~5 นาที", text: <>ติดตั้งโปรแกรมใดโปรแกรมหนึ่งบนคอมพิวเตอร์ของคุณ (Windows หรือ Mac)</> },
          { title: "ดาวน์โหลดไฟล์ .ipa", time: "~5–15 นาที", text: <>ไฟล์ยังไม่ได้เซ็น ขนาดประมาณ {size}</> },
          { title: "เชื่อมต่อ iPhone แล้วเซ็นไฟล์", time: "~5 นาที", text: <>เชื่อมต่อเครื่องกับคอมพิวเตอร์ แล้วใช้ Sideloadly/AltStore เซ็นและติดตั้งด้วย Apple ID ของคุณ</> },
          { title: "เชื่อถือโปรไฟล์นักพัฒนา", time: "~1 นาที", text: <>เข้า Settings &gt; General &gt; VPN &amp; Device Management แล้วกด Trust ให้โปรไฟล์</> },
        ]}
      />
      <Warn>บัญชี Apple ID ฟรีใช้งานแอปที่เซ็นเองได้ 7 วันเท่านั้น เมื่อครบกำหนดต้องเซ็นไฟล์ใหม่อีกครั้งด้วย Sideloadly หรือ AltStore</Warn>
    </>
  );
}

/* ---------------- section ---------------- */

const TABS: { id: Platform; icon: React.ReactNode }[] = [
  { id: "windows", icon: <DesktopIcon /> },
  { id: "android", icon: <PhoneIcon /> },
  { id: "ios", icon: <IphoneIcon /> },
];

export default function Download() {
  const { platform, setPlatform } = usePlatform();

  const onKey = (e: React.KeyboardEvent, index: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = TABS[(index + d + TABS.length) % TABS.length].id;
    setPlatform(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section id="download-section" className="band">
      <div className="wrap stack gap24">
        <div>
          <Heading>เลือกแพลตฟอร์มของคุณ</Heading>
          <Reveal delay={0.1}>
            <p style={{ marginTop: 8, fontSize: 14, color: "#d9ccaf" }}>
              รองรับเกมเวอร์ชัน {siteData.version} — ถ้าเกมอัปเดตเป็นเวอร์ชันใหม่ ให้ติดตั้งม็อดซ้ำอีกครั้ง
            </p>
          </Reveal>
        </div>

        <Warn>ก่อนติดตั้ง: ปิดเกม OPTCGSim ให้สนิท และสำรองโฟลเดอร์ Decks ของคุณไว้ก่อนทุกครั้ง</Warn>

        <div className="tabs" role="tablist" aria-label="แพลตฟอร์ม">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-controls={`panel-${t.id}`}
              aria-selected={platform === t.id}
              tabIndex={platform === t.id ? 0 : -1}
              onClick={() => setPlatform(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              style={{ position: "relative" }}
            >
              {t.icon}
              {PLATFORM_LABELS[t.id]}
              {platform === t.id && (
                <motion.span
                  layoutId="tab-underline"
                  style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 3, background: "var(--orange-strong)", borderRadius: 3, zIndex: 2 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="panel-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              className="panel sheet paper"
              role="tabpanel"
              id={`panel-${platform}`}
              aria-labelledby={`tab-${platform}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {platform === "windows" && <WindowsPanel />}
              {platform === "android" && <AndroidPanel />}
              {platform === "ios" && <IosPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
