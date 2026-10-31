// ==UserScript==
// @name         OPlayTCG Turbo (โหลดรูปการ์ดล่วงหน้า)
// @namespace    https://github.com/Mosquito5142/optcgsim-thai
// @version      0.2.261031.1445
// @description  โหลดรูปการ์ดของ oplaytcg.com เก็บไว้ในแคชของเบราว์เซอร์ล่วงหน้า (ชุดล่าสุด / การ์ดในหน้าเด็ค) ตอนเล่นจริงรูปขึ้นทันที และมีโหมดลดเอฟเฟกต์สำหรับเครื่องสเปกต่ำ ไม่ได้ทำให้เซิร์ฟเวอร์เกมเร็วขึ้น ม็อดแฟนเมด ไม่เป็นทางการ โดย $ong$oul
// @author       $ong$oul
// @match        https://oplaytcg.com/*
// @match        https://www.oplaytcg.com/*
// @updateURL    https://raw.githubusercontent.com/Mosquito5142/optcgsim-thai/main/public/oplay/oplaytcg-turbo.meta.js
// @downloadURL  https://raw.githubusercontent.com/Mosquito5142/optcgsim-thai/main/public/oplay/oplaytcg-turbo.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";
  // How it helps: card images (cards.oplaytcg.com/<folder>/<lang>/{small/}<id>.webp?v=<n>) are sent with a 1-year immutable
  // Cache-Control, but Cloudflare does not cache them, so every card you have not seen yet goes to the origin, which is slow
  // at peak times. We ask the site's own card API for the exact URLs (same ?v= the game uses) and load them as plain images
  // while the site is quiet: the browser keeps them, and in a match they come from disk. Nothing is stored by us.
  const CARD_RE = /^https:\/\/cards\.oplaytcg\.com\/[^/]+\/[a-z]{2}\/(?:small\/)?[^/?#]+\.webp(?:\?v=\d+)?$/i;
  const LANG = (location.pathname.match(/^\/([a-z]{2})(?:\/|$)/) || [])[1] || "en";
  const CONCURRENCY = 2; // be gentle with their server
  const GAP_MS = 150;
  const FONT = '"Leelawadee UI","Noto Sans Thai","Sarabun",Tahoma,sans-serif';

  const store = {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* storage blocked */ } },
  };
  let lite = store.get("oplayTurbo.lite", "0") === "1";

  const style = document.createElement("style");
  style.textContent = `
    html.oplay-lite *,html.oplay-lite *::before,html.oplay-lite *::after{animation-duration:0s!important;animation-delay:0s!important;
      transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;scroll-behavior:auto!important}
    #oplay-tb-fab{position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:2147483646;width:40px;height:40px;
      border-radius:50%;background:#1e2a44;color:#ffd36e;border:2px solid #3a4560;font:700 18px/1 ${FONT};opacity:.75;padding:0;cursor:pointer;
      box-shadow:0 4px 12px rgba(0,0,0,.5);touch-action:manipulation}
    #oplay-tb-fab:hover{opacity:1}
    #oplay-tb-menu{position:fixed;left:14px;bottom:calc(62px + env(safe-area-inset-bottom,0px));z-index:2147483646;width:min(300px,88vw);
      padding:10px 12px 12px;border-radius:14px;background:#141a26;color:#eef1f7;border:1px solid #3a4560;font:14px/1.5 ${FONT};display:none;
      box-shadow:0 10px 28px rgba(0,0,0,.55)}
    #oplay-tb-menu .t{font-weight:700;margin-bottom:6px}
    #oplay-tb-menu button.b{display:block;width:100%;min-height:40px;margin:6px 0;border:1px solid #3a4560;border-radius:10px;background:#24304a;
      color:#eef1f7;font:14px ${FONT};cursor:pointer;text-align:left;padding:6px 10px}
    #oplay-tb-menu button.b:disabled{opacity:.5;cursor:default}
    #oplay-tb-menu label{display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:40px}
    #oplay-tb-menu input{width:20px;height:20px}
    #oplay-tb-menu .p{height:6px;border-radius:3px;background:#24304a;overflow:hidden;margin-top:6px}
    #oplay-tb-menu .p i{display:block;height:100%;width:0;background:#e2823f}
    #oplay-tb-menu .s,#oplay-tb-menu .hint{font-size:12px;color:#9fb0cf;margin-top:4px}
    @media (max-width:1024px){ /* the site shows a bottom tab bar here: sit above it */
      #oplay-tb-fab{bottom:calc(84px + env(safe-area-inset-bottom,0px))}
      #oplay-tb-menu{bottom:calc(132px + env(safe-area-inset-bottom,0px));max-height:60vh;overflow:auto}}`;
  document.head.appendChild(style);
  document.documentElement.classList.toggle("oplay-lite", lite);

  // ---------- preload queue ----------

  const seen = new Set(); // URLs already loaded (or queued) in this tab
  const queue = [];
  let active = 0, done = 0, failed = 0, total = 0, onProgress = () => {};

  function enqueue(urls) {
    for (const u of urls) {
      if (!u || seen.has(u) || !CARD_RE.test(u)) continue;
      seen.add(u);
      queue.push(u);
      total++;
    }
    pump();
    onProgress();
  }

  function pump() {
    if (document.hidden) return; // resumes on visibilitychange
    while (active < CONCURRENCY && queue.length) {
      const url = queue.shift();
      active++;
      const img = new Image();
      img.decoding = "async";
      const finish = (ok) => {
        img.onload = img.onerror = null;
        active--;
        ok ? done++ : failed++;
        onProgress();
        setTimeout(pump, GAP_MS);
      };
      img.onload = () => finish(true);
      img.onerror = () => finish(false);
      img.src = url;
    }
  }
  document.addEventListener("visibilitychange", pump);

  /** Both sizes of a card image: the API gives them, a page <img> gives one and the other only differs by "/small". */
  function bothSizes(url) {
    return /\/small\//.test(url) ? [url, url.replace("/small/", "/")] : [url, url.replace(/(\/[a-z]{2}\/)([^/]+\.webp)/i, "$1small/$2")];
  }

  async function api(path) {
    const r = await fetch(path, { credentials: "same-origin" });
    if (!r.ok) throw new Error(path + " " + r.status);
    return r.json();
  }

  /** The newest main set (highest OPxx in /api/filters) or null. */
  async function latestSet() {
    const f = await api(`/api/filters?lang=${LANG}`);
    const ops = (f.sets || []).map((s) => s.code).filter((c) => /^OP\d+$/.test(c));
    ops.sort((a, b) => Number(b.slice(2)) - Number(a.slice(2)));
    return ops[0] || null;
  }

  /** Every card image URL (small + full) of one set, page by page from the deck builder's own card API. */
  async function setUrls(set) {
    const urls = [];
    for (let page = 1; page <= 10; page++) {
      const q = new URLSearchParams({ lang: LANG, page: String(page), pageSize: "60", legal: "0", format: "STANDARD", sets: set });
      const j = await api(`/api/deck/cards?${q}`);
      for (const c of j.items || []) urls.push(c.image, c.imageFull);
      if (!j.hasMore) break;
    }
    return urls;
  }

  function pageUrls() {
    const urls = [];
    for (const img of document.querySelectorAll('img[src*="cards.oplaytcg.com"]')) urls.push(...bothSizes(img.getAttribute("src") || ""));
    return urls;
  }

  // ---------- UI ----------

  const fab = document.createElement("button");
  fab.id = "oplay-tb-fab";
  fab.type = "button";
  fab.textContent = "⚡";
  fab.title = "OPlay Turbo: โหลดรูปการ์ดล่วงหน้า";
  const menu = document.createElement("div");
  menu.id = "oplay-tb-menu";

  const title = document.createElement("div");
  title.className = "t";
  title.textContent = "OPlay Turbo";
  const btnSet = document.createElement("button");
  btnSet.className = "b";
  btnSet.type = "button";
  btnSet.textContent = "โหลดรูปการ์ดชุดล่าสุดเก็บไว้";
  const btnPage = document.createElement("button");
  btnPage.className = "b";
  btnPage.type = "button";
  btnPage.textContent = "โหลดรูปการ์ดในหน้านี้ (เช่น เด็คที่เปิดอยู่)";
  const bar = document.createElement("div");
  bar.className = "p";
  const fill = document.createElement("i");
  bar.appendChild(fill);
  const status = document.createElement("div");
  status.className = "s";
  status.textContent = "ยังไม่ได้โหลด";
  const liteRow = document.createElement("label");
  liteRow.textContent = "โหมดลดเอฟเฟกต์ (Alt+L)";
  const liteBox = document.createElement("input");
  liteBox.type = "checkbox";
  liteBox.checked = lite;
  liteRow.appendChild(liteBox);
  const hint = document.createElement("div");
  hint.className = "hint";
  hint.textContent = "แนะนำกดโหลดตอนคนเล่นน้อย รูปจะเก็บในเบราว์เซอร์ ช่วยเรื่องรูปขึ้นช้า ไม่ได้ทำให้เซิร์ฟเวอร์เกมเร็วขึ้น";
  for (const el of [title, btnSet, btnPage, bar, status, liteRow, hint]) menu.appendChild(el);
  document.body.appendChild(fab);
  document.body.appendChild(menu);

  onProgress = () => {
    const pct = total ? Math.round(((done + failed) / total) * 100) : 0;
    fill.style.width = pct + "%";
    status.textContent = total
      ? `โหลดแล้ว ${done}/${total} รูป` + (failed ? ` (ไม่สำเร็จ ${failed})` : "") + (queue.length || active ? "..." : " เสร็จแล้ว")
      : "ยังไม่ได้โหลด";
  };

  fab.addEventListener("click", () => { menu.style.display = menu.style.display === "block" ? "none" : "block"; });

  btnSet.addEventListener("click", async () => {
    btnSet.disabled = true;
    status.textContent = "กำลังดูรายชื่อการ์ด...";
    try {
      const set = await latestSet();
      if (!set) throw new Error("no set");
      btnSet.textContent = `โหลดรูปการ์ดชุดล่าสุด (${set}) เก็บไว้`;
      enqueue(await setUrls(set));
    } catch (_) {
      status.textContent = "ดึงรายชื่อการ์ดไม่ได้ ลองใหม่ภายหลัง";
    }
    btnSet.disabled = false;
  });

  btnPage.addEventListener("click", () => {
    const urls = pageUrls();
    if (!urls.length) { status.textContent = "หน้านี้ไม่มีรูปการ์ด เปิดเด็คใน Deck Builder ก่อนแล้วกดใหม่"; return; }
    enqueue(urls);
  });

  function setLite(on) {
    lite = on;
    liteBox.checked = on;
    store.set("oplayTurbo.lite", on ? "1" : "0");
    document.documentElement.classList.toggle("oplay-lite", on);
  }
  liteBox.addEventListener("change", () => setLite(liteBox.checked));
  document.addEventListener("keydown", (e) => {
    if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === "l" || e.key === "L")) { e.preventDefault(); setLite(!lite); }
  });

  // for tests / the console
  globalThis.__oplayTurbo = { enqueue, bothSizes, latestSet, setUrls, pageUrls, setLite, state: () => ({ active, done, failed, total, queued: queue.length }) };
})();
