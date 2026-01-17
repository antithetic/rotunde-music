import * as De from "node:http";
import * as U from "node:fs/promises";
import M from "node:process";
import { fileURLToPath as we } from "node:url";
import _e from "astro/zod";
import * as je from "/Users/raul/Documents/01 Projects/rotunde-music/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/index.js";
import { normalizePath as I, searchForWorkspaceRoot as Ue } from "/Users/raul/Documents/01 Projects/rotunde-music/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/index.js";
import * as Me from "fs";
import { readdir as We, promises as ee } from "fs";
import * as R from "path";
import h, { resolve as te, dirname as T } from "path";
import { createRequire as se } from "module";
import { inspect as ze } from "util";
import * as Ve from "os";
function Fe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var K = { exports: {} }, W, ce;
function Be() {
  if (ce)
    return W;
  ce = 1;
  var e = 1e3, n = e * 60, t = n * 60, r = t * 24, o = r * 7, i = r * 365.25;
  W = function(a, l) {
    l = l || {};
    var c = typeof a;
    if (c === "string" && a.length > 0)
      return s(a);
    if (c === "number" && isFinite(a))
      return l.long ? d(a) : u(a);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(a)
    );
  };
  function s(a) {
    if (a = String(a), !(a.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        a
      );
      if (l) {
        var c = parseFloat(l[1]), f = (l[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return c * i;
          case "weeks":
          case "week":
          case "w":
            return c * o;
          case "days":
          case "day":
          case "d":
            return c * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return c * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return c * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return c * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return c;
          default:
            return;
        }
      }
    }
  }
  function u(a) {
    var l = Math.abs(a);
    return l >= r ? Math.round(a / r) + "d" : l >= t ? Math.round(a / t) + "h" : l >= n ? Math.round(a / n) + "m" : l >= e ? Math.round(a / e) + "s" : a + "ms";
  }
  function d(a) {
    var l = Math.abs(a);
    return l >= r ? p(a, l, r, "day") : l >= t ? p(a, l, t, "hour") : l >= n ? p(a, l, n, "minute") : l >= e ? p(a, l, e, "second") : a + " ms";
  }
  function p(a, l, c, f) {
    var v = l >= c * 1.5;
    return Math.round(a / c) + " " + f + (v ? "s" : "");
  }
  return W;
}
function Ze(e) {
  t.debug = t, t.default = t, t.coerce = d, t.disable = i, t.enable = o, t.enabled = s, t.humanize = Be(), t.destroy = p, Object.keys(e).forEach((a) => {
    t[a] = e[a];
  }), t.names = [], t.skips = [], t.formatters = {};
  function n(a) {
    let l = 0;
    for (let c = 0; c < a.length; c++)
      l = (l << 5) - l + a.charCodeAt(c), l |= 0;
    return t.colors[Math.abs(l) % t.colors.length];
  }
  t.selectColor = n;
  function t(a) {
    let l, c = null, f, v;
    function m(...g) {
      if (!m.enabled)
        return;
      const C = m, F = Number(/* @__PURE__ */ new Date()), w = F - (l || F);
      C.diff = w, C.prev = l, C.curr = F, l = F, g[0] = t.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
      let y = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (b, k) => {
        if (b === "%%")
          return "%";
        y++;
        const E = t.formatters[k];
        if (typeof E == "function") {
          const x = g[y];
          b = E.call(C, x), g.splice(y, 1), y--;
        }
        return b;
      }), t.formatArgs.call(C, g), (C.log || t.log).apply(C, g);
    }
    return m.namespace = a, m.useColors = t.useColors(), m.color = t.selectColor(a), m.extend = r, m.destroy = t.destroy, Object.defineProperty(m, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => c !== null ? c : (f !== t.namespaces && (f = t.namespaces, v = t.enabled(a)), v),
      set: (g) => {
        c = g;
      }
    }), typeof t.init == "function" && t.init(m), m;
  }
  function r(a, l) {
    const c = t(this.namespace + (typeof l > "u" ? ":" : l) + a);
    return c.log = this.log, c;
  }
  function o(a) {
    t.save(a), t.namespaces = a, t.names = [], t.skips = [];
    let l;
    const c = (typeof a == "string" ? a : "").split(/[\s,]+/), f = c.length;
    for (l = 0; l < f; l++)
      c[l] && (a = c[l].replace(/\*/g, ".*?"), a[0] === "-" ? t.skips.push(new RegExp("^" + a.slice(1) + "$")) : t.names.push(new RegExp("^" + a + "$")));
  }
  function i() {
    const a = [
      ...t.names.map(u),
      ...t.skips.map(u).map((l) => "-" + l)
    ].join(",");
    return t.enable(""), a;
  }
  function s(a) {
    if (a[a.length - 1] === "*")
      return !0;
    let l, c;
    for (l = 0, c = t.skips.length; l < c; l++)
      if (t.skips[l].test(a))
        return !1;
    for (l = 0, c = t.names.length; l < c; l++)
      if (t.names[l].test(a))
        return !0;
    return !1;
  }
  function u(a) {
    return a.toString().substring(2, a.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function d(a) {
    return a instanceof Error ? a.stack || a.message : a;
  }
  function p() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Ge = Ze;
(function(e, n) {
  n.formatArgs = r, n.save = o, n.load = i, n.useColors = t, n.storage = s(), n.destroy = (() => {
    let d = !1;
    return () => {
      d || (d = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), n.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(d) {
    if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
      return;
    const p = "color: " + this.color;
    d.splice(1, 0, p, "color: inherit");
    let a = 0, l = 0;
    d[0].replace(/%[a-zA-Z%]/g, (c) => {
      c !== "%%" && (a++, c === "%c" && (l = a));
    }), d.splice(l, 0, p);
  }
  n.log = console.debug || console.log || (() => {
  });
  function o(d) {
    try {
      d ? n.storage.setItem("debug", d) : n.storage.removeItem("debug");
    } catch {
    }
  }
  function i() {
    let d;
    try {
      d = n.storage.getItem("debug");
    } catch {
    }
    return !d && typeof process < "u" && "env" in process && (d = process.env.DEBUG), d;
  }
  function s() {
    try {
      return localStorage;
    } catch {
    }
  }
  e.exports = Ge(n);
  const { formatters: u } = e.exports;
  u.j = function(d) {
    try {
      return JSON.stringify(d);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(K, K.exports);
var qe = K.exports;
const Je = /* @__PURE__ */ Fe(qe), be = process.platform === "win32", Ke = be ? "\\\\+" : "\\/", X = be ? "\\\\" : "/", Xe = "((?:[^/]*(?:/|$))*)", He = "([^/]*)", z = `((?:[^${X}]*(?:${X}|$))*)`, Ye = `([^${X}]*)`;
function Qe(e, { extended: n = !1, globstar: t = !1, strict: r = !1, filepath: o = !1, flags: i = "" } = {}) {
  let s = "", u = "", d = { regex: "", segments: [] }, p = !1, a = !1;
  const l = [];
  function c(g, { split: C, last: F, only: w } = {}) {
    w !== "path" && (s += g), o && w !== "regex" && (d.regex += g === "\\/" ? Ke : g, C ? (F && (u += g), u !== "" && (i.includes("g") || (u = `^${u}$`), d.segments.push(new RegExp(u, i))), u = "") : u += g);
  }
  let f, v;
  for (let g = 0; g < e.length; g++) {
    if (f = e[g], v = e[g + 1], ["\\", "$", "^", ".", "="].includes(f)) {
      c(`\\${f}`);
      continue;
    }
    if (f === "/") {
      c(`\\${f}`, { split: !0 }), v === "/" && !r && (s += "?");
      continue;
    }
    if (f === "(") {
      if (l.length) {
        c(f);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === ")") {
      if (l.length) {
        c(f);
        let C = l.pop();
        c(C === "@" ? "{1}" : C === "!" ? "([^/]*)" : C);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "|") {
      if (l.length) {
        c(f);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "+") {
      if (v === "(" && n) {
        l.push(f);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "@" && n && v === "(") {
      l.push(f);
      continue;
    }
    if (f === "!") {
      if (n) {
        if (a) {
          c("^");
          continue;
        }
        if (v === "(") {
          l.push(f), c("(?!"), g++;
          continue;
        }
        c(`\\${f}`);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "?") {
      if (n) {
        v === "(" ? l.push(f) : c(".");
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "[") {
      if (a && v === ":") {
        g++;
        let C = "";
        for (; e[++g] !== ":"; )
          C += e[g];
        C === "alnum" ? c("(\\w|\\d)") : C === "space" ? c("\\s") : C === "digit" && c("\\d"), g++;
        continue;
      }
      if (n) {
        a = !0, c(f);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "]") {
      if (n) {
        a = !1, c(f);
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "{") {
      if (n) {
        p = !0, c("(");
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "}") {
      if (n) {
        p = !1, c(")");
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === ",") {
      if (p) {
        c("|");
        continue;
      }
      c(`\\${f}`);
      continue;
    }
    if (f === "*") {
      if (v === "(" && n) {
        l.push(f);
        continue;
      }
      let C = e[g - 1], F = 1;
      for (; e[g + 1] === "*"; )
        F++, g++;
      let w = e[g + 1];
      t ? F > 1 && // multiple "*"'s
      (C === "/" || C === void 0) && // from the start of the segment
      (w === "/" || w === void 0) ? (c(Xe, { only: "regex" }), c(z, { only: "path", last: !0, split: !0 }), g++) : (c(He, { only: "regex" }), c(Ye, { only: "path" })) : c(".*");
      continue;
    }
    c(f);
  }
  i.includes("g") || (s = `^${s}$`, u = `^${u}$`, o && (d.regex = `^${d.regex}$`));
  const m = { regex: new RegExp(s, i) };
  return o && (d.segments.push(new RegExp(u, i)), d.regex = new RegExp(d.regex, i), d.globstar = new RegExp(i.includes("g") ? z : `^${z}$`, i), m.path = d), m;
}
var et = Qe;
const tt = /* @__PURE__ */ Fe(et);
async function ae(e, n) {
  let t = h.dirname(h.resolve(e));
  const r = n != null && n.root ? h.resolve(n.root) : null;
  for (; t; ) {
    const o = await nt(t, n);
    if (o)
      return o;
    {
      if (r === t)
        break;
      const i = h.dirname(t);
      if (i === t)
        break;
      t = i;
    }
  }
  throw new Error(`no tsconfig file found for ${e}`);
}
async function nt(e, n) {
  const t = h.join(e, "tsconfig.json");
  if (n != null && n.tsConfigPaths)
    return n.tsConfigPaths.has(t) ? t : void 0;
  try {
    const r = await ee.stat(t);
    if (r.isFile() || r.isFIFO())
      return t;
  } catch (r) {
    if (r.code !== "ENOENT")
      throw r;
  }
}
var le = h.sep;
async function rt(e, n) {
  const t = {
    files: [],
    calls: 0,
    skip: n == null ? void 0 : n.skip,
    err: !1
  };
  return new Promise((r, o) => {
    Ee(h.resolve(e), t, (i, s) => i ? o(i) : r(s));
  });
}
function Ee(e, n, t) {
  n.err || (n.calls++, We(e, { withFileTypes: !0 }, (r, o = []) => {
    var i;
    if (!n.err)
      if (r && !(r.code === "ENOENT" || r.code === "EACCES"))
        n.err = !0, t(r);
      else {
        for (const s of o)
          s.isDirectory() && !((i = n.skip) != null && i.call(n, s.name)) ? Ee(`${e}${le}${s.name}`, n, t) : s.isFile() && s.name === "tsconfig.json" && n.files.push(`${e}${le}tsconfig.json`);
        --n.calls === 0 && (n.err || t(null, n.files));
      }
  }));
}
function ot(e) {
  const n = it(st(ct(e)));
  return n.trim() === "" ? "{}" : n;
}
function it(e) {
  let n = !1, t = 0, r = "", o = null;
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    if (s === '"' && (xe(e, i) || (n = !n)), n) {
      o = null;
      continue;
    }
    if (s === ",") {
      o = i;
      continue;
    }
    o && (s === "}" || s === "]" ? (r += e.slice(t, o) + " ", t = o + 1, o = null) : s.match(/\s/) || (o = null));
  }
  return r + e.substring(t);
}
function xe(e, n) {
  let t = n - 1, r = 0;
  for (; e[t] === "\\"; )
    t -= 1, r += 1;
  return !!(r % 2);
}
function L(e, n, t) {
  return e.slice(n, t).replace(/\S/g, " ");
}
var V = Symbol("singleComment"), fe = Symbol("multiComment");
function st(e) {
  let n = !1, t = !1, r = 0, o = "";
  for (let i = 0; i < e.length; i++) {
    const s = e[i], u = e[i + 1];
    !t && s === '"' && (xe(e, i) || (n = !n)), !n && (!t && s + u === "//" ? (o += e.slice(r, i), r = i, t = V, i++) : t === V && s + u === `\r
` ? (i++, t = !1, o += L(e, r, i), r = i) : t === V && s === `
` ? (t = !1, o += L(e, r, i), r = i) : !t && s + u === "/*" ? (o += e.slice(r, i), r = i, t = fe, i++) : t === fe && s + u === "*/" && (i++, t = !1, o += L(e, r, i + 1), r = i + 1));
  }
  return o + (t ? L(e.slice(r)) : e.slice(r));
}
function ct(e) {
  return e.charCodeAt(0) === 65279 ? e.slice(1) : e;
}
var at = new RegExp("\\" + h.posix.sep, "g"), lt = new RegExp("\\" + h.sep, "g"), B = /* @__PURE__ */ new Map(), Oe = "**/*", ne = [".ts", ".tsx", ".mts", ".cts"], ft = `\\.(?:${ne.map((e) => e.substring(1)).join(
  "|"
)})`, ut = new Function("path", "return import(path).then(m => m.default)");
async function Se() {
  try {
    return ut("typescript");
  } catch (e) {
    throw console.error('typescript must be installed to use "native" functions'), e;
  }
}
async function N(e) {
  if (h.extname(e) !== ".json")
    return;
  const n = h.resolve(e);
  try {
    const t = await ee.stat(n);
    if (t.isFile() || t.isFIFO())
      return n;
  } catch (t) {
    if (t.code !== "ENOENT")
      throw t;
  }
  throw new Error(`no tsconfig file found for ${e}`);
}
function Z(e) {
  return h.posix.sep !== h.sep && e.includes(h.posix.sep) ? e.replace(at, h.sep) : e;
}
function j(e) {
  return h.posix.sep !== h.sep && e.includes(h.sep) ? e.replace(lt, h.posix.sep) : e;
}
function $(e, n) {
  return h.sep === h.posix.sep ? e ? h.resolve(e, n) : h.resolve(n) : j(
    e ? h.resolve(Z(e), Z(n)) : h.resolve(Z(n))
  );
}
function ke(e) {
  const n = h.dirname(e.tsconfigFile);
  return e.tsconfig.references.map((t) => {
    const r = t.path.endsWith(".json") ? t.path : h.join(t.path, "tsconfig.json");
    return $(n, r);
  });
}
function Re(e, n) {
  if (n.referenced && ne.some((t) => e.endsWith(t)) && !ue(e, n)) {
    const t = n.referenced.find(
      (r) => ue(e, r)
    );
    if (t)
      return {
        ...t,
        solution: n
      };
  }
  return n;
}
function ue(e, n) {
  const t = j(h.dirname(n.tsconfigFile)), r = (n.tsconfig.files || []).map((s) => $(t, s)), o = $(null, e);
  return r.includes(e) ? !0 : de(
    o,
    t,
    n.tsconfig.include || (n.tsconfig.files ? [] : [Oe])
  ) ? !de(o, t, n.tsconfig.exclude || []) : !1;
}
function de(e, n, t) {
  return t.some((r) => {
    let o = r.length, i = !1;
    for (let p = r.length - 1; p > -1; p--)
      if (r[p] === "*" || r[p] === "?") {
        o = p, i = !0;
        break;
      }
    if (o < r.length - 1 && !e.endsWith(r.slice(o + 1)) || r.endsWith("*") && !ne.some((p) => e.endsWith(p)))
      return !1;
    if (r === Oe)
      return e.startsWith(`${n}/`);
    const s = $(n, r);
    let u = -1;
    for (let p = 0; p < s.length; p++)
      if (s[p] === "*" || s[p] === "?") {
        u = p, i = !0;
        break;
      }
    if (u > 1 && !e.startsWith(s.slice(0, u - 1)))
      return !1;
    if (!i)
      return e === s;
    if (B.has(s))
      return B.get(s).test(e);
    const d = dt(s);
    return B.set(s, d), d.test(e);
  });
}
function dt(e) {
  let n = "^";
  for (let t = 0; t < e.length; t++) {
    const r = e[t];
    if (r === "?") {
      n += "[^\\/]";
      continue;
    }
    if (r === "*") {
      if (e[t + 1] === "*" && e[t + 2] === "/") {
        t += 2, n += "(?:[^\\/]*\\/)*";
        continue;
      }
      n += "[^\\/]*";
      continue;
    }
    "/.+^${}()|[]\\".includes(r) && (n += "\\"), n += r;
  }
  return e.endsWith("*") && (n += ft), n += "$", new RegExp(n);
}
async function pt(e, n) {
  const t = n == null ? void 0 : n.cache;
  if (t != null && t.has(e))
    return t.get(e);
  let r;
  if (n != null && n.resolveWithEmptyIfConfigNotFound)
    try {
      r = await N(e) || await ae(e, n);
    } catch {
      const s = {
        tsconfigFile: "no_tsconfig_file_found",
        tsconfig: {}
      };
      return t == null || t.set(e, s), s;
    }
  else
    r = await N(e) || await ae(e, n);
  let o;
  return t != null && t.has(r) ? o = t.get(r) : (o = await re(r, t), await Promise.all([Te(o, t), ht(o, t)]), t == null || t.set(r, o)), o = Re(e, o), t == null || t.set(e, o), o;
}
async function re(e, n) {
  if (n != null && n.has(e))
    return n.get(e);
  try {
    const t = await ee.readFile(e, "utf-8"), r = ot(t), o = {
      tsconfigFile: e,
      tsconfig: gt(JSON.parse(r), h.dirname(e))
    };
    return n == null || n.set(e, o), o;
  } catch (t) {
    throw new A(
      `parsing ${e} failed: ${t}`,
      "PARSE_FILE",
      e,
      t
    );
  }
}
function gt(e, n) {
  var t;
  return (t = e.compilerOptions) != null && t.baseUrl && !h.isAbsolute(e.compilerOptions.baseUrl) && (e.compilerOptions.baseUrl = $(n, e.compilerOptions.baseUrl)), e;
}
async function ht(e, n) {
  if (!e.tsconfig.references)
    return;
  const t = ke(e), r = await Promise.all(t.map((o) => re(o, n)));
  await Promise.all(r.map((o) => Te(o, n))), e.referenced = r;
}
async function Te(e, n) {
  if (!e.tsconfig.extends)
    return;
  const t = [
    { tsconfigFile: e.tsconfigFile, tsconfig: JSON.parse(JSON.stringify(e.tsconfig)) }
  ];
  let r = 0;
  const o = [];
  let i = 0;
  for (; r < t.length; ) {
    const s = t[r];
    if (o.push(s.tsconfigFile), s.tsconfig.extends) {
      i += 1;
      let u;
      Array.isArray(s.tsconfig.extends) ? u = s.tsconfig.extends.reverse().map((p) => pe(p, s.tsconfigFile)) : u = [pe(s.tsconfig.extends, s.tsconfigFile)];
      const d = u.find(
        (p) => o.includes(p)
      );
      if (d) {
        const p = o.concat([d]).join(" -> ");
        throw new A(
          `Circular dependency in "extends": ${p}`,
          "EXTENDS_CIRCULAR",
          e.tsconfigFile
        );
      }
      t.splice(
        r + 1,
        0,
        ...await Promise.all(u.map((p) => re(p, n)))
      );
    } else
      o.splice(-i), i = 0;
    r = r + 1;
  }
  e.extended = t;
  for (const s of e.extended.slice(1))
    vt(e, s);
}
function pe(e, n) {
  let t;
  try {
    return se(n).resolve(e);
  } catch (r) {
    t = r;
  }
  if (!h.isAbsolute(e) && !e.startsWith("./") && !e.startsWith("../"))
    try {
      const r = h.join(e, "tsconfig.json");
      return se(n).resolve(r);
    } catch (r) {
      t = r;
    }
  throw new A(
    `failed to resolve "extends":"${e}" in ${n}`,
    "EXTENDS_RESOLVE",
    n,
    t
  );
}
var mt = [
  "compilerOptions",
  "files",
  "include",
  "exclude",
  "watchOptions",
  "compileOnSave",
  "typeAcquisition",
  "buildOptions"
];
function vt(e, n) {
  const t = e.tsconfig, r = n.tsconfig, o = j(
    h.relative(h.dirname(e.tsconfigFile), h.dirname(n.tsconfigFile))
  );
  for (const i of Object.keys(r).filter((s) => mt.includes(s)))
    if (i === "compilerOptions") {
      t.compilerOptions || (t.compilerOptions = {});
      for (const s of Object.keys(r.compilerOptions))
        Object.prototype.hasOwnProperty.call(t.compilerOptions, s) || (t.compilerOptions[s] = G(
          s,
          r.compilerOptions[s],
          o
        ));
    } else if (t[i] === void 0)
      if (i === "watchOptions") {
        t.watchOptions = {};
        for (const s of Object.keys(r.watchOptions))
          t.watchOptions[s] = G(
            s,
            r.watchOptions[s],
            o
          );
      } else
        t[i] = G(i, r[i], o);
}
var Ct = [
  // root
  "files",
  "include",
  "exclude",
  // compilerOptions
  "baseUrl",
  "rootDir",
  "rootDirs",
  "typeRoots",
  "outDir",
  "outFile",
  "declarationDir",
  // watchOptions
  "excludeDirectories",
  "excludeFiles"
];
function G(e, n, t) {
  return Ct.includes(e) ? Array.isArray(n) ? n.map((r) => ge(r, t)) : ge(n, t) : n;
}
function ge(e, n) {
  return h.isAbsolute(e) ? e : h.posix.normalize(h.posix.join(n, e));
}
var A = class extends Error {
  constructor(e, n, t, r) {
    super(e), Object.setPrototypeOf(this, A.prototype), this.name = A.name, this.code = n, this.cause = r, this.tsconfigFile = t;
  }
};
async function he(e) {
  const n = await Se(), { findConfigFile: t, sys: r } = n, o = t(h.dirname(h.resolve(e)), r.fileExists);
  if (!o)
    throw new Error(`no tsconfig file found for ${e}`);
  return o;
}
async function yt(e, n) {
  const t = n == null ? void 0 : n.cache;
  if (t != null && t.has(e))
    return t.get(e);
  let r;
  if (n != null && n.resolveWithEmptyIfConfigNotFound)
    try {
      r = await N(e), r || (r = await he(e));
    } catch {
      const s = {
        tsconfigFile: "no_tsconfig_file_found",
        tsconfig: {},
        result: null
      };
      return t == null || t.set(e, s), s;
    }
  else
    r = await N(e), r || (r = await he(e));
  let o;
  if (t != null && t.has(r))
    o = t.get(r);
  else {
    const i = await Se();
    o = await $e(r, i, n), await wt(o, i, n), t == null || t.set(r, o);
  }
  return o = Re(e, o), t == null || t.set(e, o), o;
}
async function $e(e, n, t) {
  const r = t == null ? void 0 : t.cache;
  if (r != null && r.has(e))
    return r.get(e);
  const o = j(e), { parseJsonConfigFileContent: i, readConfigFile: s, sys: u } = n, { config: d, error: p } = s(o, u.readFile);
  if (p)
    throw new D(p, e, null);
  const a = {
    useCaseSensitiveFileNames: !1,
    readDirectory: u.readDirectory,
    fileExists: u.fileExists,
    readFile: u.readFile
  };
  t != null && t.ignoreSourceFiles && (d.files = [], d.include = []);
  const l = i(
    d,
    a,
    h.dirname(o),
    void 0,
    o
  );
  _t(l, e);
  const c = {
    tsconfigFile: e,
    tsconfig: Ft(l, n),
    result: l
  };
  return r == null || r.set(e, c), c;
}
async function wt(e, n, t) {
  if (!e.tsconfig.references)
    return;
  const r = ke(e);
  e.referenced = await Promise.all(
    r.map((o) => $e(o, n, t))
  );
}
function _t(e, n) {
  var t;
  const r = [
    // see https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json
    18002,
    // empty files list
    18003
    // no inputs
  ], o = (t = e.errors) == null ? void 0 : t.find(
    (i) => i.category === 1 && !r.includes(i.code)
  );
  if (o)
    throw new D(o, n, e);
}
function Ft(e, n) {
  const t = JSON.parse(JSON.stringify(e.raw)), r = ["configFilePath", "pathsBasePath"];
  if (e.options && Object.keys(e.options).some((s) => !r.includes(s))) {
    t.compilerOptions = {
      ...e.options
    };
    for (const s of r)
      delete t.compilerOptions[s];
  }
  const o = t.compilerOptions;
  if (o) {
    o.lib != null && (o.lib = o.lib.map(
      (u) => u.replace(/^lib\./, "").replace(/\.d\.ts$/, "")
    ));
    const s = [
      { name: "importsNotUsedAsValues", enumeration: n.ImportsNotUsedAsValues },
      { name: "module", enumeration: n.ModuleKind },
      {
        name: "moduleResolution",
        enumeration: {
          ...n.ModuleResolutionKind,
          2: "node"
          /*ts.ModuleResolutionKind uses "Node10" but in tsconfig it is just node"*/
        }
      },
      {
        name: "newLine",
        enumeration: { 0: "crlf", 1: "lf" }
        /*ts.NewLineKind uses different names*/
      },
      { name: "target", enumeration: n.ScriptTarget }
    ];
    for (const u of s)
      o[u.name] != null && typeof o[u.name] == "number" && (o[u.name] = u.enumeration[o[u.name]].toLowerCase());
    o.target === "latest" && (o.target = "esnext");
  }
  e.watchOptions && (t.watchOptions = {
    ...e.watchOptions
  });
  const i = t.watchOptions;
  if (i) {
    const s = [
      { name: "watchFile", enumeration: n.WatchFileKind },
      { name: "watchDirectory", enumeration: n.WatchDirectoryKind },
      { name: "fallbackPolling", enumeration: n.PollingWatchKind }
    ];
    for (const u of s)
      if (i[u.name] != null && typeof i[u.name] == "number") {
        const d = u.enumeration[i[u.name]];
        i[u.name] = d.charAt(0).toLowerCase() + d.slice(1);
      }
  }
  return t.compileOnSave === !1 && delete t.compileOnSave, t;
}
var D = class extends Error {
  constructor(e, n, t) {
    super(e.messageText), Object.setPrototypeOf(this, D.prototype), this.name = D.name, this.code = `TS ${e.code}`, this.diagnostic = e, this.result = t, this.tsconfigFile = n;
  }
};
function bt(e, n) {
  const t = Object.keys(e).sort(
    (o, i) => me(i) - me(o)
  ), r = [];
  for (let o of t) {
    const i = e[o];
    o = Et(o).replace(/\*/g, "(.+)"), r.push({
      pattern: new RegExp("^" + o + "$"),
      paths: i.map((s) => te(n, s))
    });
  }
  return r;
}
function me(e) {
  const n = e.indexOf("*");
  return e.substr(0, n).length;
}
function Et(e) {
  return e.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var Ae = Ve.platform() == "win32";
Ae || R.posix.resolve;
var ve = Ae ? R.win32.isAbsolute : R.posix.isAbsolute, H = R.posix.join, Ce = R.posix.relative, xt = R.posix.basename, S = Je("vite-tsconfig-paths"), q = [void 0, !1], Ot = (e = {}) => {
  let n;
  return {
    name: "vite-tsconfig-paths",
    enforce: "pre",
    async configResolved(r) {
      let o = r.root, i, { root: s } = e;
      s ? s = te(o, s) : i = Ue(o), S("options.root   ==", s), S("project root   ==", o), S("workspace root ==", i), s && (o = s, i = s);
      const u = await $t(
        e.projects,
        o,
        i
      );
      S("projects:", u);
      let d = !1;
      if (e.parseNative)
        try {
          const c = Me.readFileSync(
            H(i, "package.json"),
            "utf8"
          ), f = JSON.parse(c);
          d = "typescript" in { ...f.dependencies, ...f.devDependencies };
        } catch (c) {
          if (c.code != "ENOENT")
            throw c;
        }
      let p;
      const a = {
        cache: /* @__PURE__ */ new Map(),
        resolveWithEmptyIfConfigNotFound: !0
      }, l = new Set(
        (await Promise.all(
          u.map(
            (c) => (d ? yt(c, a) : pt(c, a)).catch((f) => (e.ignoreConfigErrors || (r.logger.error(
              '[tsconfig-paths] An error occurred while parsing "' + c + '". See below for details.' + (p ? "" : " To disable this message, set the `ignoreConfigErrors` option to true."),
              { error: f }
            ), r.logger.hasErrorLogged(f) && console.error(f), p = f), null))
          )
        )).filter((c, f) => c ? c.tsconfigFile !== "no_tsconfig_file_found" ? !0 : (S("tsconfig file not found:", u[f]), !1) : !1)
      );
      n = {}, l.forEach((c) => {
        if (c)
          if (c.referenced)
            c.referenced.forEach((f) => {
              l.add(f);
            }), l.delete(c), l.add(c), c.referenced = void 0;
          else {
            const f = t(c);
            if (f) {
              const v = I(T(c.tsconfigFile));
              (n[v] || (n[v] = [])).push(f);
            }
          }
      });
    },
    async resolveId(r, o) {
      if (o && !oe.test(r) && !ve(r)) {
        const i = async (d, p) => {
          var a;
          return (a = await this.resolve(d, p, { skipSelf: !0 })) == null ? void 0 : a.id;
        };
        let s, u = T(o);
        e:
          for (; u && u != s; ) {
            const d = n[u];
            if (d)
              for (const p of d) {
                const [a, l] = await p(
                  i,
                  r,
                  o
                );
                if (a)
                  return a;
                if (l)
                  break e;
              }
            s = u, u = T(s);
          }
      }
    }
  };
  function t(r) {
    var o, i, s;
    const u = I(r.tsconfigFile), d = r.tsconfig;
    if (S("config loaded:", ze({ configPath: u, config: d }, !1, 10, !0)), ((o = d.files) == null ? void 0 : o.length) == 0 && !((i = d.include) != null && i.length))
      return S(
        `[!] skipping "${u}" as no files can be matched since "files" is empty and "include" is missing or empty`
      ), null;
    const p = d.compilerOptions || {}, { baseUrl: a, paths: l } = p;
    if (!a && !l)
      return S(`[!] missing baseUrl and paths: "${u}"`), null;
    const c = a ? (w, y, _) => w(H(a, y), _) : void 0;
    let f;
    if (l) {
      const w = bt(
        l,
        (s = p.baseUrl) != null ? s : T(u)
      ), y = async (_, b, k) => {
        for (const E of w) {
          const x = b.match(E.pattern);
          if (x)
            for (let O of E.paths) {
              let Ie = 0;
              const Pe = O.replace(/\*/g, () => {
                const Ne = Math.min(++Ie, x.length - 1);
                return x[Ne];
              }), ie = await _(Pe, k);
              if (ie)
                return ie;
            }
        }
      };
      c ? f = (_, b, k) => y(_, b, k).then((E) => E ?? c(_, b, k)) : f = y;
    } else
      f = c;
    const v = T(u);
    let { outDir: m } = p;
    m && ve(m) && (m = Ce(v, m));
    const g = Tt(
      d.include,
      d.exclude,
      m
    ), C = e.loose ? /./ : p.allowJs || xt(u).startsWith("jsconfig.") ? St : /\.[mc]?tsx?$/, F = /* @__PURE__ */ new Map();
    return async (w, y, _) => {
      var b;
      if (y.includes("\0"))
        return q;
      _ = I(_);
      const k = _.replace(/[#?].+$/, "");
      if (!C.test(k))
        return q;
      const E = Ce(v, k);
      if (!g(E))
        return q;
      const x = (b = /\?.+$/.exec(y)) == null ? void 0 : b[0];
      x && (y = y.slice(0, -x.length));
      let O = F.get(y);
      return O || (O = await f(w, y, _), O && (F.set(y, O), S("resolved:", {
        id: y,
        importer: _,
        resolvedId: O,
        configPath: u
      }))), [O && x ? O + x : O, !0];
    };
  }
}, St = /\.(vue|svelte|mdx|[mc]?[jt]sx?)$/, oe = /^\.\.?(\/|$)/, kt = ["**/*"], Rt = [
  "**/node_modules",
  "**/bower_components",
  "**/jspm_packages"
];
function Tt(e = kt, n = Rt, t) {
  if (t && (n = n.concat(t)), e.length || n.length) {
    const r = [], o = [];
    return e.forEach(ye, r), n.forEach(ye, o), S("compiled globs:", { includers: r, excluders: o }), (i) => {
      i = i.replace(/\?.+$/, ""), oe.test(i) || (i = "./" + i);
      const s = (u) => u.test(i);
      return r.some(s) && !o.some(s);
    };
  }
  return () => !0;
}
function ye(e) {
  const n = e.split("/").pop().includes("*"), t = oe.test(e) ? e : "./" + e;
  n ? this.push(J(t)) : (this.push(J(t + "/**")), /\.\w+$/.test(e) && this.push(J(t)));
}
function J(e) {
  return tt(e, {
    extended: !0,
    globstar: !0
  }).regex;
}
function $t(e, n, t) {
  return e ? e.map((r) => (r.endsWith(".json") || (r = H(r, "tsconfig.json")), te(n, r))) : rt(t, {
    skip(r) {
      return r == "node_modules" || r == ".git";
    }
  });
}
const At = (e, n) => (e = e.replace(
  new RegExp("((?<![\\p{Uppercase_Letter}\\d])[\\p{Uppercase_Letter}\\d](?![\\p{Uppercase_Letter}\\d]))", "gu"),
  (t) => t.toLowerCase()
), e.replace(
  /(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
  (t, r, o) => r + n + o.toLowerCase()
));
function Lt(e, {
  separator: n = "_",
  preserveConsecutiveUppercase: t = !1
} = {}) {
  if (!(typeof e == "string" && typeof n == "string"))
    throw new TypeError(
      "The `text` and `separator` arguments should be of type `string`"
    );
  if (e.length < 2)
    return t ? e : e.toLowerCase();
  const r = `$1${n}$2`, o = e.replace(
    /([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu,
    r
  );
  return t ? At(o, n) : o.replace(
    /(\p{Uppercase_Letter})(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
    r
  ).toLowerCase();
}
var It = /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i, Pt = /[^\s:–—-]+|./g, Nt = /\s/, Dt = /.(?=[A-Z]|\..)/, jt = /[A-Za-z0-9\u00C0-\u00FF]/;
function Ut(e) {
  for (var n = "", t; (t = Pt.exec(e)) !== null; ) {
    var r = t[0], o = t.index;
    if (
      // Ignore already capitalized words.
      !Dt.test(r) && // Ignore small words except at beginning or end.
      (!It.test(r) || o === 0 || o + r.length === e.length) && // Ignore URLs.
      (e.charAt(o + r.length) !== ":" || Nt.test(e.charAt(o + r.length + 1)))
    ) {
      n += r.replace(jt, function(i) {
        return i.toUpperCase();
      });
      continue;
    }
    n += r;
  }
  return n;
}
const {
  ZodBoolean: Mt,
  ZodDate: Wt,
  ZodDefault: zt,
  ZodNumber: Vt,
  ZodObject: P,
  ZodOptional: Y,
  ZodString: Bt,
  ZodArray: Zt,
  ZodEffects: Gt,
  ZodEnum: qt,
  ZodUnion: Jt,
  ZodIntersection: Kt
} = _e, Xt = (e) => Ut(Lt(e, { separator: " " })).replace(/Url(?!\S)/g, "URL").replace(/Id(?!\S)/g, "ID");
function Le(e) {
  let n = !1;
  e instanceof Y && (n = !0, e = e._def.innerType);
  let t;
  if (e instanceof Kt && e._def.left instanceof P && e._def.right instanceof P && (t = {
    ...e._def.left._def.shape(),
    ...e._def.right._def.shape()
  }), e instanceof P && (t = e._def.shape()), !t)
    return [];
  const r = [];
  for (const [o, i] of Object.entries(t))
    o !== "draft" && r.push(Q(i, { name: o, isOptionalByDefault: n }));
  return r;
}
const Q = (e, { name: n, isOptionalByDefault: t }) => {
  var u, d, p, a, l, c;
  const r = Xt(n);
  let o = e.description, i, s = t;
  if (e instanceof Y && (s = !0, e = e.unwrap()), e instanceof zt && (s = !0, i = e._def.defaultValue(), e = e._def.innerType), e instanceof Y && (s = !0, e = e.unwrap()), e.description && (o = e.description), e instanceof Gt && (e = e.sourceType()), e instanceof Bt) {
    if (e._def.__darkmatterType__ === "reference")
      return {
        type: "reference",
        isRequired: !s,
        name: n,
        label: r,
        description: o,
        defaultValue: typeof i == "string" ? i : void 0,
        collectionId: String(
          e._def.__darkmatterCollectionReference__
        )
      };
    if (e._def.__darkmatterType__ === "image")
      return {
        type: "image",
        isRequired: !s,
        name: n,
        label: r,
        description: o,
        defaultValue: typeof i == "string" ? i : void 0
      };
    let f = "text";
    for (const v of e._def.checks)
      v.kind === "email" && (f = "email"), v.kind === "url" && (f = "url");
    return e._def.__darkmatterType__ === "text" ? {
      type: "text",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: typeof i == "string" ? i : void 0
    } : {
      type: "string",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: typeof i == "string" ? i : void 0,
      inputMode: f
    };
  }
  if (e instanceof Vt) {
    let f, v;
    const m = e._def.checks.find((C) => C.kind === "min"), g = e._def.checks.find((C) => C.kind === "max");
    return (m == null ? void 0 : m.kind) === "min" && (f = m.inclusive ? m.value : m.value + 1), (g == null ? void 0 : g.kind) === "max" && (v = g.inclusive ? g.value : g.value - 1), {
      type: "number",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: typeof i == "number" ? i : void 0,
      minValue: f,
      maxValue: v
    };
  }
  if (e instanceof Mt)
    return {
      type: "boolean",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: !!i
    };
  if (e instanceof Wt) {
    const f = (u = e._def.checks.find((m) => m.kind === "min")) == null ? void 0 : u.value, v = (d = e._def.checks.find((m) => m.kind === "max")) == null ? void 0 : d.value;
    return {
      type: "date",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      granularity: e._def.__darkmatterType__ === "dateTime" ? "minute" : "day",
      defaultValue: i instanceof Date ? i.toISOString() : void 0,
      minValue: typeof f == "number" ? new Date(f).toISOString() : void 0,
      maxValue: typeof v == "number" ? new Date(v).toISOString() : void 0
    };
  }
  if (e instanceof P)
    return {
      type: "object",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: i || void 0,
      children: Le(e)
    };
  if (e instanceof Zt)
    return {
      type: "array",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: Array.isArray(i) ? i : void 0,
      minLength: ((p = e._def.minLength) == null ? void 0 : p.value) ?? ((a = e._def.exactLength) == null ? void 0 : a.value),
      maxLength: ((l = e._def.maxLength) == null ? void 0 : l.value) ?? ((c = e._def.exactLength) == null ? void 0 : c.value),
      element: Q(e.element, {
        name: "",
        isOptionalByDefault: !1
      })
    };
  if (e instanceof qt)
    return {
      type: "enum",
      isRequired: !s,
      name: n,
      label: r,
      description: o,
      defaultValue: typeof i == "string" ? i : void 0,
      values: e._def.values
    };
  if (e instanceof Jt) {
    const f = [];
    for (const v of e._def.options) {
      const m = Q(v, {
        name: "",
        isOptionalByDefault: s
      });
      m.type === "union" || m.type === "unknown" || f.push(m);
    }
    return {
      type: "union",
      isRequired: !s,
      name: n,
      label: r,
      options: f
    };
  }
  return {
    type: "unknown",
    name: n
  };
}, Ht = () => {
  const e = "astro:content", n = "\0" + e;
  return {
    name: "astro-content",
    resolveId(t) {
      if (t === e)
        return n;
    },
    load(t) {
      if (t === n)
        return `
					import {z as zod} from 'astro/zod';
					export const z = zod;
					export const defineCollection = collection => collection;
					export const reference = collection => {
						const zodType = zod.string();
						zodType._def.__darkmatterType__ = 'reference';
						zodType._def.__darkmatterCollectionReference__ = collection;
						return zodType;
					};
				`;
    }
  };
}, Yt = ({ configPath: e }) => {
  const n = we(
    new URL(e, import.meta.url)
  ), t = "darkmatter:sdk", r = "\0" + t;
  return {
    name: "darkmatter-sdk",
    transform(o, i) {
      return i === n ? o.replace("darkmatter", "darkmatter:sdk") : o;
    },
    resolveId(o) {
      if (o === t)
        return r;
    },
    load(o) {
      if (o === r)
        return `
					import zod from 'astro/zod';

					export function text() {
						const zodType = zod.string();
						zodType._def.__darkmatterType__ = 'text';
						return zodType;
					}

					export function dateTime() {
						const zodType = zod.date();
						zodType._def.__darkmatterType__ = 'dateTime';
						return zodType;
					}

					export function defineConfig(config) {
						return config;
					}
				`;
    }
  };
}, Qt = async () => {
  const e = String(M.argv[2]), n = String(M.argv[3]), t = String(M.argv[4]), r = [Ot(), Ht()];
  (e === "darkmatter-config" || e === "content-config") && r.push(
    Yt({
      configPath: n
    })
  ), De.Server.prototype.listen = () => {
  };
  const o = await je.createServer({
    server: {
      hmr: !1,
      watch: {
        ignored: ["**"]
      }
    },
    optimizeDeps: {
      disabled: !0
    },
    clearScreen: !1,
    appType: "custom",
    ssr: {
      external: [
        "@astrojs/tailwind",
        "@astrojs/mdx",
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/sitemap",
        "@astrojs/markdoc"
      ]
    },
    plugins: r
  });
  try {
    const i = await o.ssrLoadModule(
      we(new URL(n, import.meta.url))
    );
    if (e === "astro-config" && await U.writeFile(t, JSON.stringify(i.default)), e === "darkmatter-config" && await U.writeFile(t, JSON.stringify(i.default)), e === "content-config") {
      const s = i.collections ?? {}, u = {};
      for (const [d, p] of Object.entries(
        s
      ))
        u[d] = {
          ...p,
          schema: Le(
            typeof p.schema == "function" ? p.schema({
              image() {
                const a = _e.string();
                return a._def.__darkmatterType__ = "image", a;
              }
            }) : p.schema
          )
        };
      await U.writeFile(t, JSON.stringify(u));
    }
  } finally {
    await o.close();
  }
};
Qt();
