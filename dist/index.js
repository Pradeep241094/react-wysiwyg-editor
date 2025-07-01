var sr = Object.defineProperty;
var or = (r, e, t) => e in r ? sr(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var O = (r, e, t) => or(r, typeof e != "symbol" ? e + "" : e, t);
import { jsx as d, jsxs as D, Fragment as Ln } from "react/jsx-runtime";
import L, { PureComponent as ar, createRef as mn, useState as re, useRef as pt, useCallback as Mn, useEffect as lt } from "react";
const lr = [
  "Inter",
  "Arial",
  "Georgia",
  "Tahoma",
  "Courier New",
  "Verdana",
  "Times New Roman",
  "Helvetica",
  "Calibri",
  "Trebuchet MS",
  "SF Pro Display"
], cr = ["8pt", "9pt", "10pt", "11pt", "12pt", "14pt", "16pt", "18pt", "20pt", "24pt", "28pt", "32pt", "36pt", "48pt"], hr = ({ onCommand: r, currentStyles: e, mode: t, onModeChange: i }) => {
  const n = (s, p, x) => ({
    type: s,
    name: p,
    value: x
  }), o = [...cr];
  e.fontSize && !o.includes(e.fontSize) && (o.push(e.fontSize), o.sort((s, p) => parseInt(s) - parseInt(p)));
  const h = [...lr];
  e.fontFamily && !h.includes(e.fontFamily) && h.unshift(e.fontFamily);
  const a = ({ onClick: s, isActive: p = !1, title: x, children: u, className: b = "", size: E = "sm" }) => /* @__PURE__ */ d(
    "button",
    {
      type: "button",
      onClick: (C) => {
        C.preventDefault(), C.stopPropagation(), s();
      },
      title: x,
      className: `
        ${E === "sm" ? "w-7 h-7 text-xs" : "w-9 h-8 text-sm"}
        rounded-md transition-all duration-200 flex items-center justify-center font-medium flex-shrink-0
        cursor-pointer select-none relative z-10
        ${p ? "bg-blue-500 text-white shadow-sm" : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300"}
        ${b}
      `,
      style: { pointerEvents: "auto" },
      children: u
    }
  ), c = () => /* @__PURE__ */ d("div", { className: "w-px h-5 bg-gray-200 mx-1 flex-shrink-0" });
  return /* @__PURE__ */ d("div", { className: "bg-white border-b border-gray-200 shadow-sm relative z-10 flex-shrink-0", style: { pointerEvents: "auto" }, children: /* @__PURE__ */ D("div", { className: "flex flex-wrap items-center gap-1.5 px-3 py-2 max-w-full", children: [
    /* @__PURE__ */ D("div", { className: "flex items-center bg-gray-100 rounded-md p-0.5 flex-shrink-0", children: [
      /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          className: `px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer select-none relative z-10 ${t === "markdown" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:bg-white"}`,
          onClick: (s) => {
            s.preventDefault(), s.stopPropagation(), i("markdown");
          },
          style: { pointerEvents: "auto" },
          children: "📝"
        }
      ),
      /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          className: `px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer select-none relative z-10 ${t === "wysiwyg" ? "bg-purple-500 text-white shadow-sm" : "text-gray-600 hover:bg-white"}`,
          onClick: (s) => {
            s.preventDefault(), s.stopPropagation(), i("wysiwyg");
          },
          style: { pointerEvents: "auto" },
          children: "✨"
        }
      )
    ] }),
    t === "wysiwyg" && /* @__PURE__ */ D(Ln, { children: [
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ D(
        "select",
        {
          value: e.block,
          onChange: (s) => {
            s.preventDefault(), s.stopPropagation(), r(n("block", "formatBlock", s.target.value));
          },
          className: "px-1.5 py-1 border border-gray-200 rounded-md bg-white text-xs min-w-[80px] max-w-[100px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 cursor-pointer relative z-10",
          title: "Block Format",
          style: { pointerEvents: "auto" },
          children: [
            /* @__PURE__ */ d("option", { value: "p", children: "Para" }),
            /* @__PURE__ */ d("option", { value: "h1", children: "H1" }),
            /* @__PURE__ */ d("option", { value: "h2", children: "H2" }),
            /* @__PURE__ */ d("option", { value: "h3", children: "H3" }),
            /* @__PURE__ */ d("option", { value: "h4", children: "H4" }),
            /* @__PURE__ */ d("option", { value: "h5", children: "H5" }),
            /* @__PURE__ */ d("option", { value: "h6", children: "H6" }),
            /* @__PURE__ */ d("option", { value: "blockquote", children: "Quote" }),
            /* @__PURE__ */ d("option", { value: "pre", children: "Code" })
          ]
        }
      ),
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ d(
        "select",
        {
          value: e.fontFamily,
          onChange: (s) => {
            s.preventDefault(), s.stopPropagation(), r(n("inline", "fontName", s.target.value));
          },
          className: "px-1.5 py-1 border border-gray-200 rounded-md bg-white text-xs min-w-[70px] max-w-[90px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 cursor-pointer relative z-10",
          title: "Font Family",
          style: { pointerEvents: "auto" },
          children: h.map((s) => /* @__PURE__ */ d("option", { value: s, children: s.length > 8 ? s.substring(0, 8) + "..." : s }, s))
        }
      ),
      /* @__PURE__ */ d(
        "select",
        {
          value: e.fontSize,
          onChange: (s) => {
            s.preventDefault(), s.stopPropagation(), r(n("inline", "fontSize", s.target.value));
          },
          className: "px-1.5 py-1 border border-gray-200 rounded-md bg-white text-xs min-w-[45px] max-w-[55px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 cursor-pointer relative z-10",
          title: "Font Size",
          style: { pointerEvents: "auto" },
          children: o.map((s) => /* @__PURE__ */ d("option", { value: s, children: s }, s))
        }
      ),
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ d(
        "input",
        {
          type: "color",
          value: e.color,
          onChange: (s) => {
            s.preventDefault(), s.stopPropagation(), r(n("inline", "foreColor", s.target.value));
          },
          className: "w-7 h-7 border border-gray-200 rounded-md cursor-pointer flex-shrink-0 relative z-10",
          title: "Text Color",
          style: { pointerEvents: "auto" }
        }
      ),
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ D("div", { className: "flex gap-0.5 flex-shrink-0", children: [
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("inline", "bold")),
            isActive: e.isBold,
            title: "Bold (Ctrl+B)",
            children: /* @__PURE__ */ d("strong", { children: "B" })
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("inline", "italic")),
            isActive: e.isItalic,
            title: "Italic (Ctrl+I)",
            children: /* @__PURE__ */ d("em", { children: "I" })
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("inline", "underline")),
            isActive: e.isUnderline,
            title: "Underline (Ctrl+U)",
            children: /* @__PURE__ */ d("u", { children: "U" })
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("inline", "strikeThrough")),
            isActive: e.isStrikethrough,
            title: "Strikethrough",
            children: /* @__PURE__ */ d("s", { children: "S" })
          }
        )
      ] }),
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ D("div", { className: "flex gap-0.5 flex-shrink-0", children: [
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("list", "insertUnorderedList")),
            title: "Bullet List",
            children: "•"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("list", "insertOrderedList")),
            title: "Numbered List",
            children: "1."
          }
        )
      ] }),
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ D("div", { className: "flex gap-0.5 flex-shrink-0", children: [
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("align", "justifyLeft")),
            title: "Align Left",
            isActive: e.textAlign === "left",
            children: "⬅"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("align", "justifyCenter")),
            title: "Align Center",
            isActive: e.textAlign === "center",
            children: "↔"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("align", "justifyRight")),
            title: "Align Right",
            isActive: e.textAlign === "right",
            children: "➡"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("align", "justifyFull")),
            title: "Justify",
            isActive: e.textAlign === "justify",
            children: "≡"
          }
        )
      ] }),
      /* @__PURE__ */ d(c, {}),
      /* @__PURE__ */ D("div", { className: "flex gap-0.5 flex-shrink-0", children: [
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("special", "insertHorizontalRule")),
            title: "Insert Horizontal Line",
            children: "―"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("media", "insertImage")),
            title: "Insert Image",
            children: "🖼️"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("special", "createLink")),
            title: "Insert Link",
            children: "🔗"
          }
        ),
        /* @__PURE__ */ d(
          a,
          {
            onClick: () => r(n("special", "removeFormat")),
            title: "Clear Formatting",
            children: "🧹"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d(c, {}),
    /* @__PURE__ */ D(
      "button",
      {
        type: "button",
        onClick: (s) => {
          s.preventDefault(), s.stopPropagation(), r(n("special", "preview"));
        },
        title: "Preview & Export Document",
        className: "px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white border border-purple-500 rounded-md transition-all duration-200 flex items-center gap-2 font-medium text-sm cursor-pointer select-none relative z-10 flex-shrink-0 min-w-[100px]",
        style: { pointerEvents: "auto" },
        children: [
          /* @__PURE__ */ d("span", { className: "text-base", children: "👁️" }),
          /* @__PURE__ */ d("span", { children: "Preview" })
        ]
      }
    )
  ] }) });
}, pr = ({ editor: r, preview: e, mode: t }) => /* @__PURE__ */ D("div", { className: "flex h-full", children: [
  /* @__PURE__ */ d("div", { className: `${t === "markdown" ? "w-1/2" : "w-full"} h-full transition-all duration-300`, children: r }),
  t === "markdown" && /* @__PURE__ */ d("div", { className: "w-1/2 h-full border-l border-gray-200", children: e })
] });
var ur = Object.defineProperty, dr = (r, e, t) => e in r ? ur(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, F = (r, e, t) => dr(r, typeof e != "symbol" ? e + "" : e, t);
const ut = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, Ie = (r, e, t) => Math.min(Math.max(r, e), t), gr = (...r) => r.filter((e) => e && typeof e == "string").join(" "), xn = (r, e) => r === e || r.width === e.width && r.height === e.height && r.x === e.x && r.y === e.y && r.unit === e.unit;
function Le(r, e, t) {
  return r.unit === "%" ? { ...ut, ...r, unit: "%" } : {
    unit: "%",
    x: r.x ? r.x / e * 100 : 0,
    y: r.y ? r.y / t * 100 : 0,
    width: r.width ? r.width / e * 100 : 0,
    height: r.height ? r.height / t * 100 : 0
  };
}
function we(r, e, t) {
  return r.unit ? r.unit === "px" ? { ...ut, ...r, unit: "px" } : {
    unit: "px",
    x: r.x ? r.x * e / 100 : 0,
    y: r.y ? r.y * t / 100 : 0,
    width: r.width ? r.width * e / 100 : 0,
    height: r.height ? r.height * t / 100 : 0
  } : { ...ut, ...r, unit: "px" };
}
function wn(r, e, t, i, n, o = 0, h = 0, a = i, c = n) {
  const s = { ...r };
  let p = Math.min(o, i), x = Math.min(h, n), u = Math.min(a, i), b = Math.min(c, n);
  e && (e > 1 ? (p = h ? h * e : p, x = p / e, u = a * e) : (x = o ? o / e : x, p = x * e, b = c / e)), s.y < 0 && (s.height = Math.max(s.height + s.y, x), s.y = 0), s.x < 0 && (s.width = Math.max(s.width + s.x, p), s.x = 0);
  const E = i - (s.x + s.width);
  E < 0 && (s.x = Math.min(s.x, i - p), s.width += E);
  const C = n - (s.y + s.height);
  if (C < 0 && (s.y = Math.min(s.y, n - x), s.height += C), s.width < p && ((t === "sw" || t == "nw") && (s.x -= p - s.width), s.width = p), s.height < x && ((t === "nw" || t == "ne") && (s.y -= x - s.height), s.height = x), s.width > u && ((t === "sw" || t == "nw") && (s.x -= u - s.width), s.width = u), s.height > b && ((t === "nw" || t == "ne") && (s.y -= b - s.height), s.height = b), e) {
    const B = s.width / s.height;
    if (B < e) {
      const z = Math.max(s.width / e, x);
      (t === "nw" || t == "ne") && (s.y -= z - s.height), s.height = z;
    } else if (B > e) {
      const z = Math.max(s.height * e, p);
      (t === "sw" || t == "nw") && (s.x -= z - s.width), s.width = z;
    }
  }
  return s;
}
function fr(r, e, t, i) {
  const n = { ...r };
  return e === "ArrowLeft" ? i === "nw" ? (n.x -= t, n.y -= t, n.width += t, n.height += t) : i === "w" ? (n.x -= t, n.width += t) : i === "sw" ? (n.x -= t, n.width += t, n.height += t) : i === "ne" ? (n.y += t, n.width -= t, n.height -= t) : i === "e" ? n.width -= t : i === "se" && (n.width -= t, n.height -= t) : e === "ArrowRight" && (i === "nw" ? (n.x += t, n.y += t, n.width -= t, n.height -= t) : i === "w" ? (n.x += t, n.width -= t) : i === "sw" ? (n.x += t, n.width -= t, n.height -= t) : i === "ne" ? (n.y -= t, n.width += t, n.height += t) : i === "e" ? n.width += t : i === "se" && (n.width += t, n.height += t)), e === "ArrowUp" ? i === "nw" ? (n.x -= t, n.y -= t, n.width += t, n.height += t) : i === "n" ? (n.y -= t, n.height += t) : i === "ne" ? (n.y -= t, n.width += t, n.height += t) : i === "sw" ? (n.x += t, n.width -= t, n.height -= t) : i === "s" ? n.height -= t : i === "se" && (n.width -= t, n.height -= t) : e === "ArrowDown" && (i === "nw" ? (n.x += t, n.y += t, n.width -= t, n.height -= t) : i === "n" ? (n.y += t, n.height -= t) : i === "ne" ? (n.y += t, n.width -= t, n.height -= t) : i === "sw" ? (n.x -= t, n.width += t, n.height += t) : i === "s" ? n.height += t : i === "se" && (n.width += t, n.height += t)), n;
}
const Me = { capture: !0, passive: !1 };
let mr = 0;
const be = class le extends ar {
  constructor() {
    super(...arguments), F(this, "docMoveBound", !1), F(this, "mouseDownOnCrop", !1), F(this, "dragStarted", !1), F(this, "evData", {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }), F(this, "componentRef", mn()), F(this, "mediaRef", mn()), F(this, "resizeObserver"), F(this, "initChangeCalled", !1), F(this, "instanceId", `rc-${mr++}`), F(this, "state", {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }), F(this, "onCropPointerDown", (e) => {
      const { crop: t, disabled: i } = this.props, n = this.getBox();
      if (!t)
        return;
      const o = we(t, n.width, n.height);
      if (i)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const h = e.target.dataset.ord, a = !!h;
      let c = e.clientX, s = e.clientY, p = o.x, x = o.y;
      if (h) {
        const u = e.clientX - n.x, b = e.clientY - n.y;
        let E = 0, C = 0;
        h === "ne" || h == "e" ? (E = u - (o.x + o.width), C = b - o.y, p = o.x, x = o.y + o.height) : h === "se" || h === "s" ? (E = u - (o.x + o.width), C = b - (o.y + o.height), p = o.x, x = o.y) : h === "sw" || h == "w" ? (E = u - o.x, C = b - (o.y + o.height), p = o.x + o.width, x = o.y) : (h === "nw" || h == "n") && (E = u - o.x, C = b - o.y, p = o.x + o.width, x = o.y + o.height), c = p + n.x + E, s = x + n.y + C;
      }
      this.evData = {
        startClientX: c,
        startClientY: s,
        startCropX: p,
        startCropY: x,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: a,
        ord: h
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }), F(this, "onComponentPointerDown", (e) => {
      const { crop: t, disabled: i, locked: n, keepSelection: o, onChange: h } = this.props, a = this.getBox();
      if (i || n || o && t)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const c = e.clientX - a.x, s = e.clientY - a.y, p = {
        unit: "px",
        x: c,
        y: s,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCropX: c,
        startCropY: s,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, h(we(p, a.width, a.height), Le(p, a.width, a.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }), F(this, "onDocPointerMove", (e) => {
      const { crop: t, disabled: i, onChange: n, onDragStart: o } = this.props, h = this.getBox();
      if (i || !t || !this.mouseDownOnCrop)
        return;
      e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = !0, o && o(e));
      const { evData: a } = this;
      a.clientX = e.clientX, a.clientY = e.clientY;
      let c;
      a.isResize ? c = this.resizeCrop() : c = this.dragCrop(), xn(t, c) || n(
        we(c, h.width, h.height),
        Le(c, h.width, h.height)
      );
    }), F(this, "onComponentKeyDown", (e) => {
      const { crop: t, disabled: i, onChange: n, onComplete: o } = this.props;
      if (i)
        return;
      const h = e.key;
      let a = !1;
      if (!t)
        return;
      const c = this.getBox(), s = this.makePixelCrop(c), p = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? le.nudgeStepLarge : e.shiftKey ? le.nudgeStepMedium : le.nudgeStep;
      if (h === "ArrowLeft" ? (s.x -= p, a = !0) : h === "ArrowRight" ? (s.x += p, a = !0) : h === "ArrowUp" ? (s.y -= p, a = !0) : h === "ArrowDown" && (s.y += p, a = !0), a) {
        e.cancelable && e.preventDefault(), s.x = Ie(s.x, 0, c.width - s.width), s.y = Ie(s.y, 0, c.height - s.height);
        const x = we(s, c.width, c.height), u = Le(s, c.width, c.height);
        n(x, u), o && o(x, u);
      }
    }), F(this, "onHandlerKeyDown", (e, t) => {
      const {
        aspect: i = 0,
        crop: n,
        disabled: o,
        minWidth: h = 0,
        minHeight: a = 0,
        maxWidth: c,
        maxHeight: s,
        onChange: p,
        onComplete: x
      } = this.props, u = this.getBox();
      if (o || !n)
        return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        e.stopPropagation(), e.preventDefault();
      else
        return;
      const b = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? le.nudgeStepLarge : e.shiftKey ? le.nudgeStepMedium : le.nudgeStep, E = we(n, u.width, u.height), C = fr(E, e.key, b, t), B = wn(
        C,
        i,
        t,
        u.width,
        u.height,
        h,
        a,
        c,
        s
      );
      if (!xn(n, B)) {
        const z = Le(B, u.width, u.height);
        p(B, z), x && x(B, z);
      }
    }), F(this, "onDocPointerDone", (e) => {
      const { crop: t, disabled: i, onComplete: n, onDragEnd: o } = this.props, h = this.getBox();
      this.unbindDocMove(), !(i || !t) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, o && o(e), n && n(we(t, h.width, h.height), Le(t, h.width, h.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    }), F(this, "onDragFocus", () => {
      var e;
      (e = this.componentRef.current) == null || e.scrollTo(0, 0);
    });
  }
  get document() {
    return document;
  }
  // We unfortunately get the bounding box every time as x+y changes
  // due to scrolling.
  getBox() {
    const e = this.mediaRef.current;
    if (!e)
      return { x: 0, y: 0, width: 0, height: 0 };
    const { x: t, y: i, width: n, height: o } = e.getBoundingClientRect();
    return { x: t, y: i, width: n, height: o };
  }
  componentDidUpdate(e) {
    const { crop: t, onComplete: i } = this.props;
    if (i && !e.crop && t) {
      const { width: n, height: o } = this.getBox();
      n && o && i(we(t, n, o), Le(t, n, o));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, Me), this.document.addEventListener("pointerup", this.onDocPointerDone, Me), this.document.addEventListener("pointercancel", this.onDocPointerDone, Me), this.docMoveBound = !0);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, Me), this.document.removeEventListener("pointerup", this.onDocPointerDone, Me), this.document.removeEventListener("pointercancel", this.onDocPointerDone, Me), this.docMoveBound = !1);
  }
  getCropStyle() {
    const { crop: e } = this.props;
    if (e)
      return {
        top: `${e.y}${e.unit}`,
        left: `${e.x}${e.unit}`,
        width: `${e.width}${e.unit}`,
        height: `${e.height}${e.unit}`
      };
  }
  dragCrop() {
    const { evData: e } = this, t = this.getBox(), i = this.makePixelCrop(t), n = e.clientX - e.startClientX, o = e.clientY - e.startClientY;
    return i.x = Ie(e.startCropX + n, 0, t.width - i.width), i.y = Ie(e.startCropY + o, 0, t.height - i.height), i;
  }
  getPointRegion(e, t, i, n) {
    const { evData: o } = this, h = o.clientX - e.x, a = o.clientY - e.y;
    let c;
    n && t ? c = t === "nw" || t === "n" || t === "ne" : c = a < o.startCropY;
    let s;
    return i && t ? s = t === "nw" || t === "w" || t === "sw" : s = h < o.startCropX, s ? c ? "nw" : "sw" : c ? "ne" : "se";
  }
  resolveMinDimensions(e, t, i = 0, n = 0) {
    const o = Math.min(i, e.width), h = Math.min(n, e.height);
    return !t || !o && !h ? [o, h] : t > 1 ? o ? [o, o / t] : [h * t, h] : h ? [h * t, h] : [o, o / t];
  }
  resizeCrop() {
    const { evData: e } = this, { aspect: t = 0, maxWidth: i, maxHeight: n } = this.props, o = this.getBox(), [h, a] = this.resolveMinDimensions(o, t, this.props.minWidth, this.props.minHeight);
    let c = this.makePixelCrop(o);
    const s = this.getPointRegion(o, e.ord, h, a), p = e.ord || s;
    let x = e.clientX - e.startClientX, u = e.clientY - e.startClientY;
    (h && p === "nw" || p === "w" || p === "sw") && (x = Math.min(x, -h)), (a && p === "nw" || p === "n" || p === "ne") && (u = Math.min(u, -a));
    const b = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    s === "ne" ? (b.x = e.startCropX, b.width = x, t ? (b.height = b.width / t, b.y = e.startCropY - b.height) : (b.height = Math.abs(u), b.y = e.startCropY - b.height)) : s === "se" ? (b.x = e.startCropX, b.y = e.startCropY, b.width = x, t ? b.height = b.width / t : b.height = u) : s === "sw" ? (b.x = e.startCropX + x, b.y = e.startCropY, b.width = Math.abs(x), t ? b.height = b.width / t : b.height = u) : s === "nw" && (b.x = e.startCropX + x, b.width = Math.abs(x), t ? (b.height = b.width / t, b.y = e.startCropY - b.height) : (b.height = Math.abs(u), b.y = e.startCropY + u));
    const E = wn(
      b,
      t,
      s,
      o.width,
      o.height,
      h,
      a,
      i,
      n
    );
    return t || le.xyOrds.indexOf(p) > -1 ? c = E : le.xOrds.indexOf(p) > -1 ? (c.x = E.x, c.width = E.width) : le.yOrds.indexOf(p) > -1 && (c.y = E.y, c.height = E.height), c.x = Ie(c.x, 0, o.width - c.width), c.y = Ie(c.y, 0, o.height - c.height), c;
  }
  renderCropSelection() {
    const {
      ariaLabels: e = le.defaultProps.ariaLabels,
      disabled: t,
      locked: i,
      renderSelectionAddon: n,
      ruleOfThirds: o,
      crop: h
    } = this.props, a = this.getCropStyle();
    if (h)
      return /* @__PURE__ */ L.createElement(
        "div",
        {
          style: a,
          className: "ReactCrop__crop-selection",
          onPointerDown: this.onCropPointerDown,
          "aria-label": e.cropArea,
          tabIndex: 0,
          onKeyDown: this.onComponentKeyDown,
          role: "group"
        },
        !t && !i && /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": e.nwDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": e.nDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": e.neDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": e.eDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": e.seDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": e.sDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": e.swDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": e.wDragHandle,
            onKeyDown: (c) => this.onHandlerKeyDown(c, "w"),
            role: "button"
          }
        )),
        n && /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (c) => c.stopPropagation() }, n(this.state)),
        o && /* @__PURE__ */ L.createElement(L.Fragment, null, /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ L.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(e) {
    const t = { ...ut, ...this.props.crop || {} };
    return we(t, e.width, e.height);
  }
  render() {
    const { aspect: e, children: t, circularCrop: i, className: n, crop: o, disabled: h, locked: a, style: c, ruleOfThirds: s } = this.props, { cropIsActive: p, newCropIsBeingDrawn: x } = this.state, u = o ? this.renderCropSelection() : null, b = gr(
      "ReactCrop",
      n,
      p && "ReactCrop--active",
      h && "ReactCrop--disabled",
      a && "ReactCrop--locked",
      x && "ReactCrop--new-crop",
      o && e && "ReactCrop--fixed-aspect",
      o && i && "ReactCrop--circular-crop",
      o && s && "ReactCrop--rule-of-thirds",
      !this.dragStarted && o && !o.width && !o.height && "ReactCrop--invisible-crop",
      i && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ L.createElement("div", { ref: this.componentRef, className: b, style: c }, /* @__PURE__ */ L.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, t), o ? /* @__PURE__ */ L.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ L.createElement("defs", null, /* @__PURE__ */ L.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ L.createElement("rect", { width: "100%", height: "100%", fill: "white" }), i ? /* @__PURE__ */ L.createElement(
      "ellipse",
      {
        cx: `${o.x + o.width / 2}${o.unit}`,
        cy: `${o.y + o.height / 2}${o.unit}`,
        rx: `${o.width / 2}${o.unit}`,
        ry: `${o.height / 2}${o.unit}`,
        fill: "black"
      }
    ) : /* @__PURE__ */ L.createElement(
      "rect",
      {
        x: `${o.x}${o.unit}`,
        y: `${o.y}${o.unit}`,
        width: `${o.width}${o.unit}`,
        height: `${o.height}${o.unit}`,
        fill: "black"
      }
    ))), /* @__PURE__ */ L.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, u);
  }
};
F(be, "xOrds", ["e", "w"]), F(be, "yOrds", ["n", "s"]), F(be, "xyOrds", ["nw", "ne", "se", "sw"]), F(be, "nudgeStep", 1), F(be, "nudgeStepMedium", 10), F(be, "nudgeStepLarge", 100), F(be, "defaultProps", {
  ariaLabels: {
    cropArea: "Use the arrow keys to move the crop selection area",
    nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area",
    nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area",
    neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area",
    eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area",
    seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area",
    sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area",
    swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area",
    wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area"
  }
});
let xr = be;
const wr = ({
  isOpen: r,
  onClose: e,
  onImageInsert: t
}) => {
  const [i, n] = re(""), [o, h] = re({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5
  }), [a, c] = re(), [s, p] = re(""), [x, u] = re(""), [b, E] = re("medium"), [C, B] = re("upload"), [z, se] = re(!1), [ee, $] = re(!1), te = pt(null), j = pt(null), oe = {
    small: { label: "Small", maxWidth: "300px", description: "Thumbnails" },
    medium: { label: "Medium", maxWidth: "600px", description: "Balanced" },
    large: { label: "Large", maxWidth: "900px", description: "Full width" },
    original: { label: "Original", maxWidth: "100%", description: "Original size" }
  }, Oe = (y) => {
    var R;
    const w = (R = y.target.files) == null ? void 0 : R[0];
    if (!w) return;
    u(w.name.split(".")[0]);
    const S = new FileReader();
    S.onload = () => {
      n(S.result), B("crop");
    }, S.readAsDataURL(w);
  }, Pe = (y) => {
    y.preventDefault(), se(!1);
    const w = y.dataTransfer.files[0];
    if (w && w.type.startsWith("image/")) {
      u(w.name.split(".")[0]);
      const S = new FileReader();
      S.onload = () => {
        n(S.result), B("crop");
      }, S.readAsDataURL(w);
    }
  }, ze = (y) => {
    y.preventDefault(), se(!0);
  }, Y = (y) => {
    y.preventDefault(), se(!1);
  }, T = Mn((y) => {
    const w = y || a;
    if (!w || !te.current)
      return null;
    const S = te.current, R = document.createElement("canvas"), X = R.getContext("2d");
    if (!X)
      return null;
    const P = S.naturalWidth / S.width, Ee = S.naturalHeight / S.height;
    let H, ve, M, ae;
    w.unit === "%" ? (H = w.x / 100 * S.width, ve = w.y / 100 * S.height, M = w.width / 100 * S.width, ae = w.height / 100 * S.height) : (H = w.x, ve = w.y, M = w.width, ae = w.height), R.width = M, R.height = ae, X.clearRect(0, 0, R.width, R.height);
    try {
      return X.drawImage(
        S,
        H * P,
        ve * Ee,
        M * P,
        ae * Ee,
        0,
        0,
        M,
        ae
      ), R.toDataURL("image/jpeg", 0.9);
    } catch ($e) {
      return console.error("Error drawing to canvas:", $e), null;
    }
  }, [a]);
  lt(() => {
    if (C === "preview" && s && j.current) {
      const y = j.current.getContext("2d"), w = new Image();
      w.onload = () => {
        j.current && y && (j.current.width = w.width, j.current.height = w.height, y.drawImage(w, 0, 0));
      }, w.src = s;
    }
  }, [C, s]);
  const k = async () => {
    $(!0);
    const y = a || o;
    if (!y || !te.current) {
      $(!1);
      return;
    }
    a || c(y), await new Promise((S) => setTimeout(S, 300));
    const w = T(y);
    w && (p(w), B("preview")), $(!1);
  }, g = () => {
    s && (t(s, x || "Cropped image", b), m());
  }, m = () => {
    n(""), u(""), p(""), E("medium"), B("upload"), se(!1), $(!1), h({
      unit: "%",
      width: 90,
      height: 90,
      x: 5,
      y: 5
    }), c(void 0), e();
  };
  return r ? /* @__PURE__ */ d("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ D("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-4xl h-auto max-h-[85vh] flex flex-col", children: [
    /* @__PURE__ */ d("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-xl flex-shrink-0", children: /* @__PURE__ */ D("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ d("span", { className: "text-lg", children: "🖼️" }),
        /* @__PURE__ */ d("h2", { className: "text-lg font-semibold text-gray-800", children: "Insert Image" })
      ] }),
      /* @__PURE__ */ d(
        "button",
        {
          onClick: m,
          className: "w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center text-sm font-bold",
          children: "×"
        }
      )
    ] }) }),
    /* @__PURE__ */ D("div", { className: "flex-1 overflow-y-auto p-4", children: [
      C === "upload" && /* @__PURE__ */ d("div", { className: "flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ D(
        "div",
        {
          className: `
                  border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer w-full max-w-sm
                  ${z ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
                `,
          onDrop: Pe,
          onDragOver: ze,
          onDragLeave: Y,
          onClick: () => {
            var y;
            return (y = document.getElementById("image-upload")) == null ? void 0 : y.click();
          },
          children: [
            /* @__PURE__ */ d("div", { className: "text-4xl mb-3", children: "📸" }),
            /* @__PURE__ */ d("p", { className: "font-medium text-gray-700 mb-2", children: z ? "Drop image here" : "Upload image" }),
            /* @__PURE__ */ d("p", { className: "text-sm text-gray-500 mb-4", children: "Drag & drop or click" }),
            /* @__PURE__ */ d("div", { className: "inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors", children: "Choose File" }),
            /* @__PURE__ */ d(
              "input",
              {
                type: "file",
                accept: "image/*",
                onChange: Oe,
                className: "hidden",
                id: "image-upload"
              }
            )
          ]
        }
      ) }),
      C === "crop" && i && /* @__PURE__ */ D("div", { className: "space-y-4", children: [
        /* @__PURE__ */ D("div", { className: "text-center", children: [
          /* @__PURE__ */ d("h3", { className: "font-semibold text-gray-800 mb-1", children: "Crop Image" }),
          /* @__PURE__ */ d("p", { className: "text-sm text-gray-600", children: "Adjust selection area" })
        ] }),
        /* @__PURE__ */ d("div", { className: "flex justify-center bg-gray-50 rounded-lg p-3", children: /* @__PURE__ */ d("div", { className: "max-w-full max-h-[400px] overflow-hidden", children: /* @__PURE__ */ d(
          xr,
          {
            crop: o,
            onChange: (y) => h(y),
            onComplete: (y) => c(y),
            aspect: void 0,
            minWidth: 50,
            minHeight: 50,
            className: "rounded overflow-hidden",
            children: /* @__PURE__ */ d(
              "img",
              {
                ref: te,
                src: i,
                alt: "Crop preview",
                className: "max-w-[450px] max-h-[350px] w-auto h-auto object-contain",
                style: {
                  maxWidth: "450px",
                  maxHeight: "350px",
                  width: "auto",
                  height: "auto",
                  display: "block"
                }
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ D("div", { className: "flex gap-3 justify-center pt-2", children: [
          /* @__PURE__ */ d(
            "button",
            {
              onClick: () => B("upload"),
              className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors",
              children: "← Back"
            }
          ),
          /* @__PURE__ */ d(
            "button",
            {
              onClick: k,
              disabled: !a || ee,
              className: `px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${a && !ee ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`,
              children: ee ? /* @__PURE__ */ D(Ln, { children: [
                /* @__PURE__ */ d("div", { className: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                "Processing..."
              ] }) : "Apply Crop →"
            }
          )
        ] })
      ] }),
      C === "preview" && /* @__PURE__ */ D("div", { className: "space-y-4", children: [
        /* @__PURE__ */ D("div", { className: "text-center", children: [
          /* @__PURE__ */ d("h3", { className: "font-semibold text-gray-800 mb-1", children: "Customize & Insert" }),
          /* @__PURE__ */ d("p", { className: "text-sm text-gray-600", children: "Review and configure" })
        ] }),
        /* @__PURE__ */ D("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ d("div", { className: "lg:col-span-2", children: /* @__PURE__ */ D("div", { className: "bg-gray-50 rounded-lg p-3", children: [
            /* @__PURE__ */ d("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Preview" }),
            /* @__PURE__ */ d("div", { className: "flex justify-center", children: /* @__PURE__ */ d("div", { className: "max-w-[350px] max-h-[200px] overflow-hidden", children: /* @__PURE__ */ d(
              "canvas",
              {
                ref: j,
                className: "max-w-full max-h-full rounded border border-gray-200",
                style: {
                  maxWidth: "350px",
                  maxHeight: "200px",
                  width: "auto",
                  height: "auto"
                }
              }
            ) }) })
          ] }) }),
          /* @__PURE__ */ D("div", { className: "space-y-3", children: [
            /* @__PURE__ */ D("div", { className: "bg-gray-50 rounded-lg p-3", children: [
              /* @__PURE__ */ d("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Size" }),
              /* @__PURE__ */ d("div", { className: "grid grid-cols-2 gap-1", children: Object.entries(oe).map(([y, w]) => /* @__PURE__ */ D(
                "button",
                {
                  onClick: () => E(y),
                  className: `p-2 rounded border-2 transition-all text-left text-xs ${b === y ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`,
                  children: [
                    /* @__PURE__ */ d("div", { className: "font-medium", children: w.label }),
                    /* @__PURE__ */ d("div", { className: "text-gray-500", children: w.description })
                  ]
                },
                y
              )) })
            ] }),
            /* @__PURE__ */ D("div", { className: "bg-gray-50 rounded-lg p-3", children: [
              /* @__PURE__ */ d("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Alt Text" }),
              /* @__PURE__ */ d(
                "input",
                {
                  type: "text",
                  value: x,
                  onChange: (y) => u(y.target.value),
                  className: "w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  placeholder: "Describe image..."
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ D("div", { className: "flex gap-3 justify-center pt-2 border-t border-gray-100", children: [
          /* @__PURE__ */ d(
            "button",
            {
              onClick: () => B("crop"),
              className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors",
              children: "← Re-crop"
            }
          ),
          /* @__PURE__ */ D(
            "button",
            {
              onClick: g,
              className: "px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              children: [
                /* @__PURE__ */ d("span", { children: "✨" }),
                "Insert Image"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) }) : null;
};
function Ht() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var Te = Ht();
function On(r) {
  Te = r;
}
var Ke = { exec: () => null };
function I(r, e = "") {
  let t = typeof r == "string" ? r : r.source, i = { replace: (n, o) => {
    let h = typeof o == "string" ? o : o.source;
    return h = h.replace(Q.caret, "$1"), t = t.replace(n, h), i;
  }, getRegex: () => new RegExp(t, e) };
  return i;
}
var Q = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i") }, br = /^(?:[ \t]*(?:\n|$))+/, kr = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, yr = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ze = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Tr = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Ut = /(?:[*+-]|\d{1,9}[.)])/, Pn = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, zn = I(Pn).replace(/bull/g, Ut).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Er = I(Pn).replace(/bull/g, Ut).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Ft = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, vr = /^[^\n]+/, Bt = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Ar = I(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Bt).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Cr = I(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Ut).getRegex(), mt = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Wt = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, _r = I("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Wt).replace("tag", mt).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), $n = I(Ft).replace("hr", Ze).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", mt).getRegex(), Sr = I(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", $n).getRegex(), Yt = { blockquote: Sr, code: kr, def: Ar, fences: yr, heading: Tr, hr: Ze, html: _r, lheading: zn, list: Cr, newline: br, paragraph: $n, table: Ke, text: vr }, bn = I("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ze).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", mt).getRegex(), Rr = { ...Yt, lheading: Er, table: bn, paragraph: I(Ft).replace("hr", Ze).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", bn).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", mt).getRegex() }, Nr = { ...Yt, html: I(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Wt).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Ke, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: I(Ft).replace("hr", Ze).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", zn).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Dr = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ir = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Hn = /^( {2,}|\\)\n(?!\s*$)/, Lr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, xt = /[\p{P}\p{S}]/u, Xt = /[\s\p{P}\p{S}]/u, Un = /[^\s\p{P}\p{S}]/u, Mr = I(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Xt).getRegex(), Fn = /(?!~)[\p{P}\p{S}]/u, Or = /(?!~)[\s\p{P}\p{S}]/u, Pr = /(?:[^\s\p{P}\p{S}]|~)/u, zr = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Bn = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, $r = I(Bn, "u").replace(/punct/g, xt).getRegex(), Hr = I(Bn, "u").replace(/punct/g, Fn).getRegex(), Wn = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ur = I(Wn, "gu").replace(/notPunctSpace/g, Un).replace(/punctSpace/g, Xt).replace(/punct/g, xt).getRegex(), Fr = I(Wn, "gu").replace(/notPunctSpace/g, Pr).replace(/punctSpace/g, Or).replace(/punct/g, Fn).getRegex(), Br = I("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Un).replace(/punctSpace/g, Xt).replace(/punct/g, xt).getRegex(), Wr = I(/\\(punct)/, "gu").replace(/punct/g, xt).getRegex(), Yr = I(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Xr = I(Wt).replace("(?:-->|$)", "-->").getRegex(), Gr = I("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Xr).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), dt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, jr = I(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", dt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Yn = I(/^!?\[(label)\]\[(ref)\]/).replace("label", dt).replace("ref", Bt).getRegex(), Xn = I(/^!?\[(ref)\](?:\[\])?/).replace("ref", Bt).getRegex(), qr = I("reflink|nolink(?!\\()", "g").replace("reflink", Yn).replace("nolink", Xn).getRegex(), Gt = { _backpedal: Ke, anyPunctuation: Wr, autolink: Yr, blockSkip: zr, br: Hn, code: Ir, del: Ke, emStrongLDelim: $r, emStrongRDelimAst: Ur, emStrongRDelimUnd: Br, escape: Dr, link: jr, nolink: Xn, punctuation: Mr, reflink: Yn, reflinkSearch: qr, tag: Gr, text: Lr, url: Ke }, Kr = { ...Gt, link: I(/^!?\[(label)\]\((.*?)\)/).replace("label", dt).getRegex(), reflink: I(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", dt).getRegex() }, Mt = { ...Gt, emStrongRDelimAst: Fr, emStrongLDelim: Hr, url: I(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }, Zr = { ...Mt, br: I(Hn).replace("{2,}", "*").getRegex(), text: I(Mt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, it = { normal: Yt, gfm: Rr, pedantic: Nr }, Be = { normal: Gt, gfm: Mt, breaks: Zr, pedantic: Kr }, Qr = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, kn = (r) => Qr[r];
function pe(r, e) {
  if (e) {
    if (Q.escapeTest.test(r)) return r.replace(Q.escapeReplace, kn);
  } else if (Q.escapeTestNoEncode.test(r)) return r.replace(Q.escapeReplaceNoEncode, kn);
  return r;
}
function yn(r) {
  try {
    r = encodeURI(r).replace(Q.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function Tn(r, e) {
  var o;
  let t = r.replace(Q.findPipe, (h, a, c) => {
    let s = !1, p = a;
    for (; --p >= 0 && c[p] === "\\"; ) s = !s;
    return s ? "|" : " |";
  }), i = t.split(Q.splitPipe), n = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !((o = i.at(-1)) != null && o.trim()) && i.pop(), e) if (i.length > e) i.splice(e);
  else for (; i.length < e; ) i.push("");
  for (; n < i.length; n++) i[n] = i[n].trim().replace(Q.slashPipe, "|");
  return i;
}
function We(r, e, t) {
  let i = r.length;
  if (i === 0) return "";
  let n = 0;
  for (; n < i && r.charAt(i - n - 1) === e; )
    n++;
  return r.slice(0, i - n);
}
function Vr(r, e) {
  if (r.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let i = 0; i < r.length; i++) if (r[i] === "\\") i++;
  else if (r[i] === e[0]) t++;
  else if (r[i] === e[1] && (t--, t < 0)) return i;
  return t > 0 ? -2 : -1;
}
function En(r, e, t, i, n) {
  let o = e.href, h = e.title || null, a = r[1].replace(n.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let c = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: t, href: o, title: h, text: a, tokens: i.inlineTokens(a) };
  return i.state.inLink = !1, c;
}
function Jr(r, e, t) {
  let i = r.match(t.other.indentCodeCompensation);
  if (i === null) return e;
  let n = i[1];
  return e.split(`
`).map((o) => {
    let h = o.match(t.other.beginningSpace);
    if (h === null) return o;
    let [a] = h;
    return a.length >= n.length ? o.slice(n.length) : o;
  }).join(`
`);
}
var gt = class {
  constructor(r) {
    O(this, "options");
    O(this, "rules");
    O(this, "lexer");
    this.options = r || Te;
  }
  space(r) {
    let e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(r) {
    let e = this.rules.block.code.exec(r);
    if (e) {
      let t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : We(t, `
`) };
    }
  }
  fences(r) {
    let e = this.rules.block.fences.exec(r);
    if (e) {
      let t = e[0], i = Jr(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: i };
    }
  }
  heading(r) {
    let e = this.rules.block.heading.exec(r);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let i = We(t, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (t = i.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(r) {
    let e = this.rules.block.hr.exec(r);
    if (e) return { type: "hr", raw: We(e[0], `
`) };
  }
  blockquote(r) {
    let e = this.rules.block.blockquote.exec(r);
    if (e) {
      let t = We(e[0], `
`).split(`
`), i = "", n = "", o = [];
      for (; t.length > 0; ) {
        let h = !1, a = [], c;
        for (c = 0; c < t.length; c++) if (this.rules.other.blockquoteStart.test(t[c])) a.push(t[c]), h = !0;
        else if (!h) a.push(t[c]);
        else break;
        t = t.slice(c);
        let s = a.join(`
`), p = s.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${s}` : s, n = n ? `${n}
${p}` : p;
        let x = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, o, !0), this.lexer.state.top = x, t.length === 0) break;
        let u = o.at(-1);
        if ((u == null ? void 0 : u.type) === "code") break;
        if ((u == null ? void 0 : u.type) === "blockquote") {
          let b = u, E = b.raw + `
` + t.join(`
`), C = this.blockquote(E);
          o[o.length - 1] = C, i = i.substring(0, i.length - b.raw.length) + C.raw, n = n.substring(0, n.length - b.text.length) + C.text;
          break;
        } else if ((u == null ? void 0 : u.type) === "list") {
          let b = u, E = b.raw + `
` + t.join(`
`), C = this.list(E);
          o[o.length - 1] = C, i = i.substring(0, i.length - u.raw.length) + C.raw, n = n.substring(0, n.length - b.raw.length) + C.raw, t = E.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: i, tokens: o, text: n };
    }
  }
  list(r) {
    let e = this.rules.block.list.exec(r);
    if (e) {
      let t = e[1].trim(), i = t.length > 1, n = { type: "list", raw: "", ordered: i, start: i ? +t.slice(0, -1) : "", loose: !1, items: [] };
      t = i ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = i ? t : "[*+-]");
      let o = this.rules.other.listItemRegex(t), h = !1;
      for (; r; ) {
        let c = !1, s = "", p = "";
        if (!(e = o.exec(r)) || this.rules.block.hr.test(r)) break;
        s = e[0], r = r.substring(s.length);
        let x = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (z) => " ".repeat(3 * z.length)), u = r.split(`
`, 1)[0], b = !x.trim(), E = 0;
        if (this.options.pedantic ? (E = 2, p = x.trimStart()) : b ? E = e[1].length + 1 : (E = e[2].search(this.rules.other.nonSpaceChar), E = E > 4 ? 1 : E, p = x.slice(E), E += e[1].length), b && this.rules.other.blankLine.test(u) && (s += u + `
`, r = r.substring(u.length + 1), c = !0), !c) {
          let z = this.rules.other.nextBulletRegex(E), se = this.rules.other.hrRegex(E), ee = this.rules.other.fencesBeginRegex(E), $ = this.rules.other.headingBeginRegex(E), te = this.rules.other.htmlBeginRegex(E);
          for (; r; ) {
            let j = r.split(`
`, 1)[0], oe;
            if (u = j, this.options.pedantic ? (u = u.replace(this.rules.other.listReplaceNesting, "  "), oe = u) : oe = u.replace(this.rules.other.tabCharGlobal, "    "), ee.test(u) || $.test(u) || te.test(u) || z.test(u) || se.test(u)) break;
            if (oe.search(this.rules.other.nonSpaceChar) >= E || !u.trim()) p += `
` + oe.slice(E);
            else {
              if (b || x.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ee.test(x) || $.test(x) || se.test(x)) break;
              p += `
` + u;
            }
            !b && !u.trim() && (b = !0), s += j + `
`, r = r.substring(j.length + 1), x = oe.slice(E);
          }
        }
        n.loose || (h ? n.loose = !0 : this.rules.other.doubleBlankLine.test(s) && (h = !0));
        let C = null, B;
        this.options.gfm && (C = this.rules.other.listIsTask.exec(p), C && (B = C[0] !== "[ ] ", p = p.replace(this.rules.other.listReplaceTask, ""))), n.items.push({ type: "list_item", raw: s, task: !!C, checked: B, loose: !1, text: p, tokens: [] }), n.raw += s;
      }
      let a = n.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      n.raw = n.raw.trimEnd();
      for (let c = 0; c < n.items.length; c++) if (this.lexer.state.top = !1, n.items[c].tokens = this.lexer.blockTokens(n.items[c].text, []), !n.loose) {
        let s = n.items[c].tokens.filter((x) => x.type === "space"), p = s.length > 0 && s.some((x) => this.rules.other.anyLine.test(x.raw));
        n.loose = p;
      }
      if (n.loose) for (let c = 0; c < n.items.length; c++) n.items[c].loose = !0;
      return n;
    }
  }
  html(r) {
    let e = this.rules.block.html.exec(r);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(r) {
    let e = this.rules.block.def.exec(r);
    if (e) {
      let t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), i = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: e[0], href: i, title: n };
    }
  }
  table(r) {
    var h;
    let e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = Tn(e[1]), i = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = (h = e[3]) != null && h.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === i.length) {
      for (let a of i) this.rules.other.tableAlignRight.test(a) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? o.align.push("left") : o.align.push(null);
      for (let a = 0; a < t.length; a++) o.header.push({ text: t[a], tokens: this.lexer.inline(t[a]), header: !0, align: o.align[a] });
      for (let a of n) o.rows.push(Tn(a, o.header.length).map((c, s) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: o.align[s] })));
      return o;
    }
  }
  lheading(r) {
    let e = this.rules.block.lheading.exec(r);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(r) {
    let e = this.rules.block.paragraph.exec(r);
    if (e) {
      let t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(r) {
    let e = this.rules.block.text.exec(r);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(r) {
    let e = this.rules.inline.escape.exec(r);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(r) {
    let e = this.rules.inline.tag.exec(r);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(r) {
    let e = this.rules.inline.link.exec(r);
    if (e) {
      let t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t)) return;
        let o = We(t.slice(0, -1), "\\");
        if ((t.length - o.length) % 2 === 0) return;
      } else {
        let o = Vr(e[2], "()");
        if (o === -2) return;
        if (o > -1) {
          let h = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + o;
          e[2] = e[2].substring(0, o), e[0] = e[0].substring(0, h).trim(), e[3] = "";
        }
      }
      let i = e[2], n = "";
      if (this.options.pedantic) {
        let o = this.rules.other.pedanticHrefTitle.exec(i);
        o && (i = o[1], n = o[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? i = i.slice(1) : i = i.slice(1, -1)), En(e, { href: i && i.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(r, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(r)) || (t = this.rules.inline.nolink.exec(r))) {
      let i = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = e[i.toLowerCase()];
      if (!n) {
        let o = t[0].charAt(0);
        return { type: "text", raw: o, text: o };
      }
      return En(t, n, t[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, t = "") {
    let i = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!i || i[3] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(i[1] || i[2]) || !t || this.rules.inline.punctuation.exec(t))) {
      let n = [...i[0]].length - 1, o, h, a = n, c = 0, s = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (s.lastIndex = 0, e = e.slice(-1 * r.length + n); (i = s.exec(e)) != null; ) {
        if (o = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !o) continue;
        if (h = [...o].length, i[3] || i[4]) {
          a += h;
          continue;
        } else if ((i[5] || i[6]) && n % 3 && !((n + h) % 3)) {
          c += h;
          continue;
        }
        if (a -= h, a > 0) continue;
        h = Math.min(h, h + a + c);
        let p = [...i[0]][0].length, x = r.slice(0, n + i.index + p + h);
        if (Math.min(n, h) % 2) {
          let b = x.slice(1, -1);
          return { type: "em", raw: x, text: b, tokens: this.lexer.inlineTokens(b) };
        }
        let u = x.slice(2, -2);
        return { type: "strong", raw: x, text: u, tokens: this.lexer.inlineTokens(u) };
      }
    }
  }
  codespan(r) {
    let e = this.rules.inline.code.exec(r);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(t), n = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return i && n && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(r) {
    let e = this.rules.inline.br.exec(r);
    if (e) return { type: "br", raw: e[0] };
  }
  del(r) {
    let e = this.rules.inline.del.exec(r);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(r) {
    let e = this.rules.inline.autolink.exec(r);
    if (e) {
      let t, i;
      return e[2] === "@" ? (t = e[1], i = "mailto:" + t) : (t = e[1], i = t), { type: "link", raw: e[0], text: t, href: i, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(r) {
    var t;
    let e;
    if (e = this.rules.inline.url.exec(r)) {
      let i, n;
      if (e[2] === "@") i = e[0], n = "mailto:" + i;
      else {
        let o;
        do
          o = e[0], e[0] = ((t = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : t[0]) ?? "";
        while (o !== e[0]);
        i = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: i, href: n, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  inlineText(r) {
    let e = this.rules.inline.text.exec(r);
    if (e) {
      let t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: t };
    }
  }
}, me = class Ot {
  constructor(e) {
    O(this, "tokens");
    O(this, "options");
    O(this, "state");
    O(this, "tokenizer");
    O(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || Te, this.options.tokenizer = this.options.tokenizer || new gt(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: Q, block: it.normal, inline: Be.normal };
    this.options.pedantic ? (t.block = it.pedantic, t.inline = Be.pedantic) : this.options.gfm && (t.block = it.gfm, this.options.breaks ? t.inline = Be.breaks : t.inline = Be.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: it, inline: Be };
  }
  static lex(e, t) {
    return new Ot(t).lex(e);
  }
  static lexInline(e, t) {
    return new Ot(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(Q.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let i = this.inlineQueue[t];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], i = !1) {
    var n, o, h;
    for (this.options.pedantic && (e = e.replace(Q.tabCharGlobal, "    ").replace(Q.spaceLine, "")); e; ) {
      let a;
      if ((o = (n = this.options.extensions) == null ? void 0 : n.block) != null && o.some((s) => (a = s.call({ lexer: this }, e, t)) ? (e = e.substring(a.raw.length), t.push(a), !0) : !1)) continue;
      if (a = this.tokenizer.space(e)) {
        e = e.substring(a.raw.length);
        let s = t.at(-1);
        a.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(a);
        continue;
      }
      if (a = this.tokenizer.code(e)) {
        e = e.substring(a.raw.length);
        let s = t.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.at(-1).src = s.text) : t.push(a);
        continue;
      }
      if (a = this.tokenizer.fences(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.heading(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.hr(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.blockquote(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.list(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.html(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.def(e)) {
        e = e.substring(a.raw.length);
        let s = t.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = { href: a.href, title: a.title });
        continue;
      }
      if (a = this.tokenizer.table(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      if (a = this.tokenizer.lheading(e)) {
        e = e.substring(a.raw.length), t.push(a);
        continue;
      }
      let c = e;
      if ((h = this.options.extensions) != null && h.startBlock) {
        let s = 1 / 0, p = e.slice(1), x;
        this.options.extensions.startBlock.forEach((u) => {
          x = u.call({ lexer: this }, p), typeof x == "number" && x >= 0 && (s = Math.min(s, x));
        }), s < 1 / 0 && s >= 0 && (c = e.substring(0, s + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(c))) {
        let s = t.at(-1);
        i && (s == null ? void 0 : s.type) === "paragraph" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(a), i = c.length !== e.length, e = e.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(e)) {
        e = e.substring(a.raw.length);
        let s = t.at(-1);
        (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(a);
        continue;
      }
      if (e) {
        let s = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    var a, c, s;
    let i = e, n = null;
    if (this.tokens.links) {
      let p = Object.keys(this.tokens.links);
      if (p.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; ) p.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; ) i = i.slice(0, n.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; ) i = i.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let o = !1, h = "";
    for (; e; ) {
      o || (h = ""), o = !1;
      let p;
      if ((c = (a = this.options.extensions) == null ? void 0 : a.inline) != null && c.some((u) => (p = u.call({ lexer: this }, e, t)) ? (e = e.substring(p.raw.length), t.push(p), !0) : !1)) continue;
      if (p = this.tokenizer.escape(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.tag(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.link(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(p.raw.length);
        let u = t.at(-1);
        p.type === "text" && (u == null ? void 0 : u.type) === "text" ? (u.raw += p.raw, u.text += p.text) : t.push(p);
        continue;
      }
      if (p = this.tokenizer.emStrong(e, i, h)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.codespan(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.br(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.del(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (p = this.tokenizer.autolink(e)) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      if (!this.state.inLink && (p = this.tokenizer.url(e))) {
        e = e.substring(p.raw.length), t.push(p);
        continue;
      }
      let x = e;
      if ((s = this.options.extensions) != null && s.startInline) {
        let u = 1 / 0, b = e.slice(1), E;
        this.options.extensions.startInline.forEach((C) => {
          E = C.call({ lexer: this }, b), typeof E == "number" && E >= 0 && (u = Math.min(u, E));
        }), u < 1 / 0 && u >= 0 && (x = e.substring(0, u + 1));
      }
      if (p = this.tokenizer.inlineText(x)) {
        e = e.substring(p.raw.length), p.raw.slice(-1) !== "_" && (h = p.raw.slice(-1)), o = !0;
        let u = t.at(-1);
        (u == null ? void 0 : u.type) === "text" ? (u.raw += p.raw, u.text += p.text) : t.push(p);
        continue;
      }
      if (e) {
        let u = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(u);
          break;
        } else throw new Error(u);
      }
    }
    return t;
  }
}, ft = class {
  constructor(r) {
    O(this, "options");
    O(this, "parser");
    this.options = r || Te;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: t }) {
    var o;
    let i = (o = (e || "").match(Q.notSpaceStart)) == null ? void 0 : o[0], n = r.replace(Q.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + pe(i) + '">' + (t ? n : pe(n, !0)) + `</code></pre>
` : "<pre><code>" + (t ? n : pe(n, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  heading({ tokens: r, depth: e }) {
    return `<h${e}>${this.parser.parseInline(r)}</h${e}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let e = r.ordered, t = r.start, i = "";
    for (let h = 0; h < r.items.length; h++) {
      let a = r.items[h];
      i += this.listitem(a);
    }
    let n = e ? "ol" : "ul", o = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + n + o + `>
` + i + "</" + n + `>
`;
  }
  listitem(r) {
    var t;
    let e = "";
    if (r.task) {
      let i = this.checkbox({ checked: !!r.checked });
      r.loose ? ((t = r.tokens[0]) == null ? void 0 : t.type) === "paragraph" ? (r.tokens[0].text = i + " " + r.tokens[0].text, r.tokens[0].tokens && r.tokens[0].tokens.length > 0 && r.tokens[0].tokens[0].type === "text" && (r.tokens[0].tokens[0].text = i + " " + pe(r.tokens[0].tokens[0].text), r.tokens[0].tokens[0].escaped = !0)) : r.tokens.unshift({ type: "text", raw: i + " ", text: i + " ", escaped: !0 }) : e += i + " ";
    }
    return e += this.parser.parse(r.tokens, !!r.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let e = "", t = "";
    for (let n = 0; n < r.header.length; n++) t += this.tablecell(r.header[n]);
    e += this.tablerow({ text: t });
    let i = "";
    for (let n = 0; n < r.rows.length; n++) {
      let o = r.rows[n];
      t = "";
      for (let h = 0; h < o.length; h++) t += this.tablecell(o[h]);
      i += this.tablerow({ text: t });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let e = this.parser.parseInline(r.tokens), t = r.header ? "th" : "td";
    return (r.align ? `<${t} align="${r.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${pe(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, tokens: t }) {
    let i = this.parser.parseInline(t), n = yn(r);
    if (n === null) return i;
    r = n;
    let o = '<a href="' + r + '"';
    return e && (o += ' title="' + pe(e) + '"'), o += ">" + i + "</a>", o;
  }
  image({ href: r, title: e, text: t, tokens: i }) {
    i && (t = this.parser.parseInline(i, this.parser.textRenderer));
    let n = yn(r);
    if (n === null) return pe(t);
    r = n;
    let o = `<img src="${r}" alt="${t}"`;
    return e && (o += ` title="${pe(e)}"`), o += ">", o;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : pe(r.text);
  }
}, jt = class {
  strong({ text: r }) {
    return r;
  }
  em({ text: r }) {
    return r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r }) {
    return r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r }) {
    return "" + r;
  }
  image({ text: r }) {
    return "" + r;
  }
  br() {
    return "";
  }
}, xe = class Pt {
  constructor(e) {
    O(this, "options");
    O(this, "renderer");
    O(this, "textRenderer");
    this.options = e || Te, this.options.renderer = this.options.renderer || new ft(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new jt();
  }
  static parse(e, t) {
    return new Pt(t).parse(e);
  }
  static parseInline(e, t) {
    return new Pt(t).parseInline(e);
  }
  parse(e, t = !0) {
    var n, o;
    let i = "";
    for (let h = 0; h < e.length; h++) {
      let a = e[h];
      if ((o = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && o[a.type]) {
        let s = a, p = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (p !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(s.type)) {
          i += p || "";
          continue;
        }
      }
      let c = a;
      switch (c.type) {
        case "space": {
          i += this.renderer.space(c);
          continue;
        }
        case "hr": {
          i += this.renderer.hr(c);
          continue;
        }
        case "heading": {
          i += this.renderer.heading(c);
          continue;
        }
        case "code": {
          i += this.renderer.code(c);
          continue;
        }
        case "table": {
          i += this.renderer.table(c);
          continue;
        }
        case "blockquote": {
          i += this.renderer.blockquote(c);
          continue;
        }
        case "list": {
          i += this.renderer.list(c);
          continue;
        }
        case "html": {
          i += this.renderer.html(c);
          continue;
        }
        case "paragraph": {
          i += this.renderer.paragraph(c);
          continue;
        }
        case "text": {
          let s = c, p = this.renderer.text(s);
          for (; h + 1 < e.length && e[h + 1].type === "text"; ) s = e[++h], p += `
` + this.renderer.text(s);
          t ? i += this.renderer.paragraph({ type: "paragraph", raw: p, text: p, tokens: [{ type: "text", raw: p, text: p, escaped: !0 }] }) : i += p;
          continue;
        }
        default: {
          let s = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return i;
  }
  parseInline(e, t = this.renderer) {
    var n, o;
    let i = "";
    for (let h = 0; h < e.length; h++) {
      let a = e[h];
      if ((o = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && o[a.type]) {
        let s = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (s !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          i += s || "";
          continue;
        }
      }
      let c = a;
      switch (c.type) {
        case "escape": {
          i += t.text(c);
          break;
        }
        case "html": {
          i += t.html(c);
          break;
        }
        case "link": {
          i += t.link(c);
          break;
        }
        case "image": {
          i += t.image(c);
          break;
        }
        case "strong": {
          i += t.strong(c);
          break;
        }
        case "em": {
          i += t.em(c);
          break;
        }
        case "codespan": {
          i += t.codespan(c);
          break;
        }
        case "br": {
          i += t.br(c);
          break;
        }
        case "del": {
          i += t.del(c);
          break;
        }
        case "text": {
          i += t.text(c);
          break;
        }
        default: {
          let s = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return i;
  }
}, Lt, ct = (Lt = class {
  constructor(r) {
    O(this, "options");
    O(this, "block");
    this.options = r || Te;
  }
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  provideLexer() {
    return this.block ? me.lex : me.lexInline;
  }
  provideParser() {
    return this.block ? xe.parse : xe.parseInline;
  }
}, O(Lt, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Lt), ei = class {
  constructor(...r) {
    O(this, "defaults", Ht());
    O(this, "options", this.setOptions);
    O(this, "parse", this.parseMarkdown(!0));
    O(this, "parseInline", this.parseMarkdown(!1));
    O(this, "Parser", xe);
    O(this, "Renderer", ft);
    O(this, "TextRenderer", jt);
    O(this, "Lexer", me);
    O(this, "Tokenizer", gt);
    O(this, "Hooks", ct);
    this.use(...r);
  }
  walkTokens(r, e) {
    var i, n;
    let t = [];
    for (let o of r) switch (t = t.concat(e.call(this, o)), o.type) {
      case "table": {
        let h = o;
        for (let a of h.header) t = t.concat(this.walkTokens(a.tokens, e));
        for (let a of h.rows) for (let c of a) t = t.concat(this.walkTokens(c.tokens, e));
        break;
      }
      case "list": {
        let h = o;
        t = t.concat(this.walkTokens(h.items, e));
        break;
      }
      default: {
        let h = o;
        (n = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && n[h.type] ? this.defaults.extensions.childTokens[h.type].forEach((a) => {
          let c = h[a].flat(1 / 0);
          t = t.concat(this.walkTokens(c, e));
        }) : h.tokens && (t = t.concat(this.walkTokens(h.tokens, e)));
      }
    }
    return t;
  }
  use(...r) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((t) => {
      let i = { ...t };
      if (i.async = this.defaults.async || i.async || !1, t.extensions && (t.extensions.forEach((n) => {
        if (!n.name) throw new Error("extension name required");
        if ("renderer" in n) {
          let o = e.renderers[n.name];
          o ? e.renderers[n.name] = function(...h) {
            let a = n.renderer.apply(this, h);
            return a === !1 && (a = o.apply(this, h)), a;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let o = e[n.level];
          o ? o.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), i.extensions = e), t.renderer) {
        let n = this.defaults.renderer || new ft(this.defaults);
        for (let o in t.renderer) {
          if (!(o in n)) throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o)) continue;
          let h = o, a = t.renderer[h], c = n[h];
          n[h] = (...s) => {
            let p = a.apply(n, s);
            return p === !1 && (p = c.apply(n, s)), p || "";
          };
        }
        i.renderer = n;
      }
      if (t.tokenizer) {
        let n = this.defaults.tokenizer || new gt(this.defaults);
        for (let o in t.tokenizer) {
          if (!(o in n)) throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o)) continue;
          let h = o, a = t.tokenizer[h], c = n[h];
          n[h] = (...s) => {
            let p = a.apply(n, s);
            return p === !1 && (p = c.apply(n, s)), p;
          };
        }
        i.tokenizer = n;
      }
      if (t.hooks) {
        let n = this.defaults.hooks || new ct();
        for (let o in t.hooks) {
          if (!(o in n)) throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o)) continue;
          let h = o, a = t.hooks[h], c = n[h];
          ct.passThroughHooks.has(o) ? n[h] = (s) => {
            if (this.defaults.async) return Promise.resolve(a.call(n, s)).then((x) => c.call(n, x));
            let p = a.call(n, s);
            return c.call(n, p);
          } : n[h] = (...s) => {
            let p = a.apply(n, s);
            return p === !1 && (p = c.apply(n, s)), p;
          };
        }
        i.hooks = n;
      }
      if (t.walkTokens) {
        let n = this.defaults.walkTokens, o = t.walkTokens;
        i.walkTokens = function(h) {
          let a = [];
          return a.push(o.call(this, h)), n && (a = a.concat(n.call(this, h))), a;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return me.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return xe.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (e, t) => {
      let i = { ...t }, n = { ...this.defaults, ...i }, o = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && i.async === !1) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      n.hooks && (n.hooks.options = n, n.hooks.block = r);
      let h = n.hooks ? n.hooks.provideLexer() : r ? me.lex : me.lexInline, a = n.hooks ? n.hooks.provideParser() : r ? xe.parse : xe.parseInline;
      if (n.async) return Promise.resolve(n.hooks ? n.hooks.preprocess(e) : e).then((c) => h(c, n)).then((c) => n.hooks ? n.hooks.processAllTokens(c) : c).then((c) => n.walkTokens ? Promise.all(this.walkTokens(c, n.walkTokens)).then(() => c) : c).then((c) => a(c, n)).then((c) => n.hooks ? n.hooks.postprocess(c) : c).catch(o);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let c = h(e, n);
        n.hooks && (c = n.hooks.processAllTokens(c)), n.walkTokens && this.walkTokens(c, n.walkTokens);
        let s = a(c, n);
        return n.hooks && (s = n.hooks.postprocess(s)), s;
      } catch (c) {
        return o(c);
      }
    };
  }
  onError(r, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let i = "<p>An error occurred:</p><pre>" + pe(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(i) : i;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, ye = new ei();
function N(r, e) {
  return ye.parse(r, e);
}
N.options = N.setOptions = function(r) {
  return ye.setOptions(r), N.defaults = ye.defaults, On(N.defaults), N;
};
N.getDefaults = Ht;
N.defaults = Te;
N.use = function(...r) {
  return ye.use(...r), N.defaults = ye.defaults, On(N.defaults), N;
};
N.walkTokens = function(r, e) {
  return ye.walkTokens(r, e);
};
N.parseInline = ye.parseInline;
N.Parser = xe;
N.parser = xe.parse;
N.Renderer = ft;
N.TextRenderer = jt;
N.Lexer = me;
N.lexer = me.lex;
N.Tokenizer = gt;
N.Hooks = ct;
N.parse = N;
N.options;
N.setOptions;
N.use;
N.walkTokens;
N.parseInline;
xe.parse;
me.lex;
/*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE */
const {
  entries: Gn,
  setPrototypeOf: vn,
  isFrozen: ti,
  getPrototypeOf: ni,
  getOwnPropertyDescriptor: ri
} = Object;
let {
  freeze: V,
  seal: ie,
  create: jn
} = Object, {
  apply: zt,
  construct: $t
} = typeof Reflect < "u" && Reflect;
V || (V = function(e) {
  return e;
});
ie || (ie = function(e) {
  return e;
});
zt || (zt = function(e, t, i) {
  return e.apply(t, i);
});
$t || ($t = function(e, t) {
  return new e(...t);
});
const st = J(Array.prototype.forEach), ii = J(Array.prototype.lastIndexOf), An = J(Array.prototype.pop), Ye = J(Array.prototype.push), si = J(Array.prototype.splice), ht = J(String.prototype.toLowerCase), St = J(String.prototype.toString), Cn = J(String.prototype.match), Xe = J(String.prototype.replace), oi = J(String.prototype.indexOf), ai = J(String.prototype.trim), ce = J(Object.prototype.hasOwnProperty), Z = J(RegExp.prototype.test), Ge = li(TypeError);
function J(r) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      i[n - 1] = arguments[n];
    return zt(r, e, i);
  };
}
function li(r) {
  return function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return $t(r, t);
  };
}
function _(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ht;
  vn && vn(r, null);
  let i = e.length;
  for (; i--; ) {
    let n = e[i];
    if (typeof n == "string") {
      const o = t(n);
      o !== n && (ti(e) || (e[i] = o), n = o);
    }
    r[n] = !0;
  }
  return r;
}
function ci(r) {
  for (let e = 0; e < r.length; e++)
    ce(r, e) || (r[e] = null);
  return r;
}
function fe(r) {
  const e = jn(null);
  for (const [t, i] of Gn(r))
    ce(r, t) && (Array.isArray(i) ? e[t] = ci(i) : i && typeof i == "object" && i.constructor === Object ? e[t] = fe(i) : e[t] = i);
  return e;
}
function je(r, e) {
  for (; r !== null; ) {
    const i = ri(r, e);
    if (i) {
      if (i.get)
        return J(i.get);
      if (typeof i.value == "function")
        return J(i.value);
    }
    r = ni(r);
  }
  function t() {
    return null;
  }
  return t;
}
const _n = V(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Rt = V(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Nt = V(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), hi = V(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Dt = V(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), pi = V(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Sn = V(["#text"]), Rn = V(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), It = V(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Nn = V(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ot = V(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ui = ie(/\{\{[\w\W]*|[\w\W]*\}\}/gm), di = ie(/<%[\w\W]*|[\w\W]*%>/gm), gi = ie(/\$\{[\w\W]*/gm), fi = ie(/^data-[\-\w.\u00B7-\uFFFF]+$/), mi = ie(/^aria-[\-\w]+$/), qn = ie(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), xi = ie(/^(?:\w+script|data):/i), wi = ie(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Kn = ie(/^html$/i), bi = ie(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Dn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: mi,
  ATTR_WHITESPACE: wi,
  CUSTOM_ELEMENT: bi,
  DATA_ATTR: fi,
  DOCTYPE_NAME: Kn,
  ERB_EXPR: di,
  IS_ALLOWED_URI: qn,
  IS_SCRIPT_OR_DATA: xi,
  MUSTACHE_EXPR: ui,
  TMPLIT_EXPR: gi
});
const qe = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, ki = function() {
  return typeof window > "u" ? null : window;
}, yi = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let i = null;
  const n = "data-tt-policy-suffix";
  t && t.hasAttribute(n) && (i = t.getAttribute(n));
  const o = "dompurify" + (i ? "#" + i : "");
  try {
    return e.createPolicy(o, {
      createHTML(h) {
        return h;
      },
      createScriptURL(h) {
        return h;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, In = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Zn() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ki();
  const e = (A) => Zn(A);
  if (e.version = "3.2.6", e.removed = [], !r || !r.document || r.document.nodeType !== qe.document || !r.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = r;
  const i = t, n = i.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: h,
    Node: a,
    Element: c,
    NodeFilter: s,
    NamedNodeMap: p = r.NamedNodeMap || r.MozNamedAttrMap,
    HTMLFormElement: x,
    DOMParser: u,
    trustedTypes: b
  } = r, E = c.prototype, C = je(E, "cloneNode"), B = je(E, "remove"), z = je(E, "nextSibling"), se = je(E, "childNodes"), ee = je(E, "parentNode");
  if (typeof h == "function") {
    const A = t.createElement("template");
    A.content && A.content.ownerDocument && (t = A.content.ownerDocument);
  }
  let $, te = "";
  const {
    implementation: j,
    createNodeIterator: oe,
    createDocumentFragment: Oe,
    getElementsByTagName: Pe
  } = t, {
    importNode: ze
  } = i;
  let Y = In();
  e.isSupported = typeof Gn == "function" && typeof ee == "function" && j && j.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: T,
    ERB_EXPR: k,
    TMPLIT_EXPR: g,
    DATA_ATTR: m,
    ARIA_ATTR: y,
    IS_SCRIPT_OR_DATA: w,
    ATTR_WHITESPACE: S,
    CUSTOM_ELEMENT: R
  } = Dn;
  let {
    IS_ALLOWED_URI: X
  } = Dn, P = null;
  const Ee = _({}, [..._n, ...Rt, ...Nt, ...Dt, ...Sn]);
  let H = null;
  const ve = _({}, [...Rn, ...It, ...Nn, ...ot]);
  let M = Object.seal(jn(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), ae = null, $e = null, qt = !0, wt = !0, Kt = !1, Zt = !0, Ae = !1, Qe = !0, ke = !1, bt = !1, kt = !1, Ce = !1, Ve = !1, Je = !1, Qt = !0, Vt = !1;
  const Qn = "user-content-";
  let yt = !0, He = !1, _e = {}, Se = null;
  const Jt = _({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let en = null;
  const tn = _({}, ["audio", "video", "img", "source", "image", "track"]);
  let Tt = null;
  const nn = _({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), et = "http://www.w3.org/1998/Math/MathML", tt = "http://www.w3.org/2000/svg", ue = "http://www.w3.org/1999/xhtml";
  let Re = ue, Et = !1, vt = null;
  const Vn = _({}, [et, tt, ue], St);
  let nt = _({}, ["mi", "mo", "mn", "ms", "mtext"]), rt = _({}, ["annotation-xml"]);
  const Jn = _({}, ["title", "style", "font", "a", "script"]);
  let Ue = null;
  const er = ["application/xhtml+xml", "text/html"], tr = "text/html";
  let G = null, Ne = null;
  const nr = t.createElement("form"), rn = function(l) {
    return l instanceof RegExp || l instanceof Function;
  }, At = function() {
    let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Ne && Ne === l)) {
      if ((!l || typeof l != "object") && (l = {}), l = fe(l), Ue = // eslint-disable-next-line unicorn/prefer-includes
      er.indexOf(l.PARSER_MEDIA_TYPE) === -1 ? tr : l.PARSER_MEDIA_TYPE, G = Ue === "application/xhtml+xml" ? St : ht, P = ce(l, "ALLOWED_TAGS") ? _({}, l.ALLOWED_TAGS, G) : Ee, H = ce(l, "ALLOWED_ATTR") ? _({}, l.ALLOWED_ATTR, G) : ve, vt = ce(l, "ALLOWED_NAMESPACES") ? _({}, l.ALLOWED_NAMESPACES, St) : Vn, Tt = ce(l, "ADD_URI_SAFE_ATTR") ? _(fe(nn), l.ADD_URI_SAFE_ATTR, G) : nn, en = ce(l, "ADD_DATA_URI_TAGS") ? _(fe(tn), l.ADD_DATA_URI_TAGS, G) : tn, Se = ce(l, "FORBID_CONTENTS") ? _({}, l.FORBID_CONTENTS, G) : Jt, ae = ce(l, "FORBID_TAGS") ? _({}, l.FORBID_TAGS, G) : fe({}), $e = ce(l, "FORBID_ATTR") ? _({}, l.FORBID_ATTR, G) : fe({}), _e = ce(l, "USE_PROFILES") ? l.USE_PROFILES : !1, qt = l.ALLOW_ARIA_ATTR !== !1, wt = l.ALLOW_DATA_ATTR !== !1, Kt = l.ALLOW_UNKNOWN_PROTOCOLS || !1, Zt = l.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ae = l.SAFE_FOR_TEMPLATES || !1, Qe = l.SAFE_FOR_XML !== !1, ke = l.WHOLE_DOCUMENT || !1, Ce = l.RETURN_DOM || !1, Ve = l.RETURN_DOM_FRAGMENT || !1, Je = l.RETURN_TRUSTED_TYPE || !1, kt = l.FORCE_BODY || !1, Qt = l.SANITIZE_DOM !== !1, Vt = l.SANITIZE_NAMED_PROPS || !1, yt = l.KEEP_CONTENT !== !1, He = l.IN_PLACE || !1, X = l.ALLOWED_URI_REGEXP || qn, Re = l.NAMESPACE || ue, nt = l.MATHML_TEXT_INTEGRATION_POINTS || nt, rt = l.HTML_INTEGRATION_POINTS || rt, M = l.CUSTOM_ELEMENT_HANDLING || {}, l.CUSTOM_ELEMENT_HANDLING && rn(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (M.tagNameCheck = l.CUSTOM_ELEMENT_HANDLING.tagNameCheck), l.CUSTOM_ELEMENT_HANDLING && rn(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (M.attributeNameCheck = l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), l.CUSTOM_ELEMENT_HANDLING && typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (M.allowCustomizedBuiltInElements = l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ae && (wt = !1), Ve && (Ce = !0), _e && (P = _({}, Sn), H = [], _e.html === !0 && (_(P, _n), _(H, Rn)), _e.svg === !0 && (_(P, Rt), _(H, It), _(H, ot)), _e.svgFilters === !0 && (_(P, Nt), _(H, It), _(H, ot)), _e.mathMl === !0 && (_(P, Dt), _(H, Nn), _(H, ot))), l.ADD_TAGS && (P === Ee && (P = fe(P)), _(P, l.ADD_TAGS, G)), l.ADD_ATTR && (H === ve && (H = fe(H)), _(H, l.ADD_ATTR, G)), l.ADD_URI_SAFE_ATTR && _(Tt, l.ADD_URI_SAFE_ATTR, G), l.FORBID_CONTENTS && (Se === Jt && (Se = fe(Se)), _(Se, l.FORBID_CONTENTS, G)), yt && (P["#text"] = !0), ke && _(P, ["html", "head", "body"]), P.table && (_(P, ["tbody"]), delete ae.tbody), l.TRUSTED_TYPES_POLICY) {
        if (typeof l.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Ge('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof l.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Ge('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        $ = l.TRUSTED_TYPES_POLICY, te = $.createHTML("");
      } else
        $ === void 0 && ($ = yi(b, n)), $ !== null && typeof te == "string" && (te = $.createHTML(""));
      V && V(l), Ne = l;
    }
  }, sn = _({}, [...Rt, ...Nt, ...hi]), on = _({}, [...Dt, ...pi]), rr = function(l) {
    let f = ee(l);
    (!f || !f.tagName) && (f = {
      namespaceURI: Re,
      tagName: "template"
    });
    const v = ht(l.tagName), U = ht(f.tagName);
    return vt[l.namespaceURI] ? l.namespaceURI === tt ? f.namespaceURI === ue ? v === "svg" : f.namespaceURI === et ? v === "svg" && (U === "annotation-xml" || nt[U]) : !!sn[v] : l.namespaceURI === et ? f.namespaceURI === ue ? v === "math" : f.namespaceURI === tt ? v === "math" && rt[U] : !!on[v] : l.namespaceURI === ue ? f.namespaceURI === tt && !rt[U] || f.namespaceURI === et && !nt[U] ? !1 : !on[v] && (Jn[v] || !sn[v]) : !!(Ue === "application/xhtml+xml" && vt[l.namespaceURI]) : !1;
  }, he = function(l) {
    Ye(e.removed, {
      element: l
    });
    try {
      ee(l).removeChild(l);
    } catch {
      B(l);
    }
  }, De = function(l, f) {
    try {
      Ye(e.removed, {
        attribute: f.getAttributeNode(l),
        from: f
      });
    } catch {
      Ye(e.removed, {
        attribute: null,
        from: f
      });
    }
    if (f.removeAttribute(l), l === "is")
      if (Ce || Ve)
        try {
          he(f);
        } catch {
        }
      else
        try {
          f.setAttribute(l, "");
        } catch {
        }
  }, an = function(l) {
    let f = null, v = null;
    if (kt)
      l = "<remove></remove>" + l;
    else {
      const W = Cn(l, /^[\r\n\t ]+/);
      v = W && W[0];
    }
    Ue === "application/xhtml+xml" && Re === ue && (l = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + l + "</body></html>");
    const U = $ ? $.createHTML(l) : l;
    if (Re === ue)
      try {
        f = new u().parseFromString(U, Ue);
      } catch {
      }
    if (!f || !f.documentElement) {
      f = j.createDocument(Re, "template", null);
      try {
        f.documentElement.innerHTML = Et ? te : U;
      } catch {
      }
    }
    const q = f.body || f.documentElement;
    return l && v && q.insertBefore(t.createTextNode(v), q.childNodes[0] || null), Re === ue ? Pe.call(f, ke ? "html" : "body")[0] : ke ? f.documentElement : q;
  }, ln = function(l) {
    return oe.call(
      l.ownerDocument || l,
      l,
      // eslint-disable-next-line no-bitwise
      s.SHOW_ELEMENT | s.SHOW_COMMENT | s.SHOW_TEXT | s.SHOW_PROCESSING_INSTRUCTION | s.SHOW_CDATA_SECTION,
      null
    );
  }, Ct = function(l) {
    return l instanceof x && (typeof l.nodeName != "string" || typeof l.textContent != "string" || typeof l.removeChild != "function" || !(l.attributes instanceof p) || typeof l.removeAttribute != "function" || typeof l.setAttribute != "function" || typeof l.namespaceURI != "string" || typeof l.insertBefore != "function" || typeof l.hasChildNodes != "function");
  }, cn = function(l) {
    return typeof a == "function" && l instanceof a;
  };
  function de(A, l, f) {
    st(A, (v) => {
      v.call(e, l, f, Ne);
    });
  }
  const hn = function(l) {
    let f = null;
    if (de(Y.beforeSanitizeElements, l, null), Ct(l))
      return he(l), !0;
    const v = G(l.nodeName);
    if (de(Y.uponSanitizeElement, l, {
      tagName: v,
      allowedTags: P
    }), Qe && l.hasChildNodes() && !cn(l.firstElementChild) && Z(/<[/\w!]/g, l.innerHTML) && Z(/<[/\w!]/g, l.textContent) || l.nodeType === qe.progressingInstruction || Qe && l.nodeType === qe.comment && Z(/<[/\w]/g, l.data))
      return he(l), !0;
    if (!P[v] || ae[v]) {
      if (!ae[v] && un(v) && (M.tagNameCheck instanceof RegExp && Z(M.tagNameCheck, v) || M.tagNameCheck instanceof Function && M.tagNameCheck(v)))
        return !1;
      if (yt && !Se[v]) {
        const U = ee(l) || l.parentNode, q = se(l) || l.childNodes;
        if (q && U) {
          const W = q.length;
          for (let ne = W - 1; ne >= 0; --ne) {
            const ge = C(q[ne], !0);
            ge.__removalCount = (l.__removalCount || 0) + 1, U.insertBefore(ge, z(l));
          }
        }
      }
      return he(l), !0;
    }
    return l instanceof c && !rr(l) || (v === "noscript" || v === "noembed" || v === "noframes") && Z(/<\/no(script|embed|frames)/i, l.innerHTML) ? (he(l), !0) : (Ae && l.nodeType === qe.text && (f = l.textContent, st([T, k, g], (U) => {
      f = Xe(f, U, " ");
    }), l.textContent !== f && (Ye(e.removed, {
      element: l.cloneNode()
    }), l.textContent = f)), de(Y.afterSanitizeElements, l, null), !1);
  }, pn = function(l, f, v) {
    if (Qt && (f === "id" || f === "name") && (v in t || v in nr))
      return !1;
    if (!(wt && !$e[f] && Z(m, f))) {
      if (!(qt && Z(y, f))) {
        if (!H[f] || $e[f]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(un(l) && (M.tagNameCheck instanceof RegExp && Z(M.tagNameCheck, l) || M.tagNameCheck instanceof Function && M.tagNameCheck(l)) && (M.attributeNameCheck instanceof RegExp && Z(M.attributeNameCheck, f) || M.attributeNameCheck instanceof Function && M.attributeNameCheck(f)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            f === "is" && M.allowCustomizedBuiltInElements && (M.tagNameCheck instanceof RegExp && Z(M.tagNameCheck, v) || M.tagNameCheck instanceof Function && M.tagNameCheck(v)))
          ) return !1;
        } else if (!Tt[f]) {
          if (!Z(X, Xe(v, S, ""))) {
            if (!((f === "src" || f === "xlink:href" || f === "href") && l !== "script" && oi(v, "data:") === 0 && en[l])) {
              if (!(Kt && !Z(w, Xe(v, S, "")))) {
                if (v)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, un = function(l) {
    return l !== "annotation-xml" && Cn(l, R);
  }, dn = function(l) {
    de(Y.beforeSanitizeAttributes, l, null);
    const {
      attributes: f
    } = l;
    if (!f || Ct(l))
      return;
    const v = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: H,
      forceKeepAttr: void 0
    };
    let U = f.length;
    for (; U--; ) {
      const q = f[U], {
        name: W,
        namespaceURI: ne,
        value: ge
      } = q, Fe = G(W), _t = ge;
      let K = W === "value" ? _t : ai(_t);
      if (v.attrName = Fe, v.attrValue = K, v.keepAttr = !0, v.forceKeepAttr = void 0, de(Y.uponSanitizeAttribute, l, v), K = v.attrValue, Vt && (Fe === "id" || Fe === "name") && (De(W, l), K = Qn + K), Qe && Z(/((--!?|])>)|<\/(style|title)/i, K)) {
        De(W, l);
        continue;
      }
      if (v.forceKeepAttr)
        continue;
      if (!v.keepAttr) {
        De(W, l);
        continue;
      }
      if (!Zt && Z(/\/>/i, K)) {
        De(W, l);
        continue;
      }
      Ae && st([T, k, g], (fn) => {
        K = Xe(K, fn, " ");
      });
      const gn = G(l.nodeName);
      if (!pn(gn, Fe, K)) {
        De(W, l);
        continue;
      }
      if ($ && typeof b == "object" && typeof b.getAttributeType == "function" && !ne)
        switch (b.getAttributeType(gn, Fe)) {
          case "TrustedHTML": {
            K = $.createHTML(K);
            break;
          }
          case "TrustedScriptURL": {
            K = $.createScriptURL(K);
            break;
          }
        }
      if (K !== _t)
        try {
          ne ? l.setAttributeNS(ne, W, K) : l.setAttribute(W, K), Ct(l) ? he(l) : An(e.removed);
        } catch {
          De(W, l);
        }
    }
    de(Y.afterSanitizeAttributes, l, null);
  }, ir = function A(l) {
    let f = null;
    const v = ln(l);
    for (de(Y.beforeSanitizeShadowDOM, l, null); f = v.nextNode(); )
      de(Y.uponSanitizeShadowNode, f, null), hn(f), dn(f), f.content instanceof o && A(f.content);
    de(Y.afterSanitizeShadowDOM, l, null);
  };
  return e.sanitize = function(A) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, f = null, v = null, U = null, q = null;
    if (Et = !A, Et && (A = "<!-->"), typeof A != "string" && !cn(A))
      if (typeof A.toString == "function") {
        if (A = A.toString(), typeof A != "string")
          throw Ge("dirty is not a string, aborting");
      } else
        throw Ge("toString is not a function");
    if (!e.isSupported)
      return A;
    if (bt || At(l), e.removed = [], typeof A == "string" && (He = !1), He) {
      if (A.nodeName) {
        const ge = G(A.nodeName);
        if (!P[ge] || ae[ge])
          throw Ge("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (A instanceof a)
      f = an("<!---->"), v = f.ownerDocument.importNode(A, !0), v.nodeType === qe.element && v.nodeName === "BODY" || v.nodeName === "HTML" ? f = v : f.appendChild(v);
    else {
      if (!Ce && !Ae && !ke && // eslint-disable-next-line unicorn/prefer-includes
      A.indexOf("<") === -1)
        return $ && Je ? $.createHTML(A) : A;
      if (f = an(A), !f)
        return Ce ? null : Je ? te : "";
    }
    f && kt && he(f.firstChild);
    const W = ln(He ? A : f);
    for (; U = W.nextNode(); )
      hn(U), dn(U), U.content instanceof o && ir(U.content);
    if (He)
      return A;
    if (Ce) {
      if (Ve)
        for (q = Oe.call(f.ownerDocument); f.firstChild; )
          q.appendChild(f.firstChild);
      else
        q = f;
      return (H.shadowroot || H.shadowrootmode) && (q = ze.call(i, q, !0)), q;
    }
    let ne = ke ? f.outerHTML : f.innerHTML;
    return ke && P["!doctype"] && f.ownerDocument && f.ownerDocument.doctype && f.ownerDocument.doctype.name && Z(Kn, f.ownerDocument.doctype.name) && (ne = "<!DOCTYPE " + f.ownerDocument.doctype.name + `>
` + ne), Ae && st([T, k, g], (ge) => {
      ne = Xe(ne, ge, " ");
    }), $ && Je ? $.createHTML(ne) : ne;
  }, e.setConfig = function() {
    let A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    At(A), bt = !0;
  }, e.clearConfig = function() {
    Ne = null, bt = !1;
  }, e.isValidAttribute = function(A, l, f) {
    Ne || At({});
    const v = G(A), U = G(l);
    return pn(v, U, f);
  }, e.addHook = function(A, l) {
    typeof l == "function" && Ye(Y[A], l);
  }, e.removeHook = function(A, l) {
    if (l !== void 0) {
      const f = ii(Y[A], l);
      return f === -1 ? void 0 : si(Y[A], f, 1)[0];
    }
    return An(Y[A]);
  }, e.removeHooks = function(A) {
    Y[A] = [];
  }, e.removeAllHooks = function() {
    Y = In();
  }, e;
}
var at = Zn();
const Ai = ({
  initialContent: r = "",
  onChange: e,
  mode: t = "wysiwyg",
  height: i = "400px"
}) => {
  const n = pt(null), o = pt(null), [h, a] = re(t), [c, s] = re(r), [p, x] = re(!1), [u, b] = re({
    block: "p",
    fontSize: "12pt",
    fontFamily: "Inter",
    textAlign: "left",
    color: "#000000",
    backgroundColor: "transparent",
    isBold: !1,
    isItalic: !1,
    isUnderline: !1,
    isStrikethrough: !1
  }), E = Mn(() => {
    if (console.log("Force updating toolbar state..."), !n.current) {
      console.log("No editor ref, setting defaults"), b({
        block: "p",
        fontSize: "12pt",
        fontFamily: "Inter",
        textAlign: "left",
        color: "#000000",
        backgroundColor: "transparent",
        isBold: !1,
        isItalic: !1,
        isUnderline: !1,
        isStrikethrough: !1
      });
      return;
    }
    z(!0);
  }, []);
  lt(() => {
    n.current && (h === "wysiwyg" ? N.parse(c, (T, k) => {
      !T && n.current && (n.current.innerHTML = at.sanitize(k), setTimeout(() => {
        E();
      }, 100));
    }) : n.current.textContent = c);
  }, [h, c, E]), lt(() => {
    if (n.current && h === "wysiwyg") {
      (!n.current.innerHTML.trim() || n.current.innerHTML === "<br>") && (n.current.innerHTML = "<p><br></p>"), n.current.focus();
      const T = document.createRange(), k = window.getSelection();
      n.current.firstChild && (T.setStart(n.current.firstChild, 0), T.collapse(!0), k == null || k.removeAllRanges(), k == null || k.addRange(T)), setTimeout(() => {
        E();
      }, 250), setTimeout(() => {
        E();
      }, 500);
    }
  }, [h, E]), lt(() => {
    const T = () => {
      h === "wysiwyg" && document.activeElement === n.current && z();
    };
    return document.addEventListener("selectionchange", T), () => document.removeEventListener("selectionchange", T);
  }, [h]);
  const C = async () => {
    if (!n.current) return;
    const T = n.current.innerHTML;
    if (h === "wysiwyg") {
      const k = ze(T);
      s(k), e == null || e(T, k);
    } else {
      const k = n.current.textContent || "";
      s(k);
      const g = await N.parse(k);
      e == null || e(g, k);
    }
  }, B = (T) => {
    T.preventDefault();
    const k = window.getSelection();
    if (!(k != null && k.rangeCount)) return;
    const g = k.getRangeAt(0);
    let m = h === "wysiwyg" && T.clipboardData.getData("text/html") || T.clipboardData.getData("text/plain");
    if (h === "wysiwyg") {
      m = at.sanitize(m);
      const y = document.createElement("div");
      y.innerHTML = m, g.deleteContents(), Array.from(y.childNodes).forEach((w) => {
        g.insertNode(w.cloneNode(!0)), g.collapse(!1);
      });
    } else
      document.execCommand("insertText", !1, m);
    C();
  }, z = (T = !1) => {
    if (!n.current || h === "markdown") return;
    const k = window.getSelection();
    let g = null;
    k != null && k.rangeCount && (g = k.anchorNode, (g == null ? void 0 : g.nodeType) === Node.TEXT_NODE && (g = g.parentElement)), g || (g = n.current, n.current.children.length > 0 && (g = n.current.children[0])), console.log("Updating styles for element:", g, "Mode:", h);
    const m = window.getComputedStyle(g), y = parseFloat(m.fontSize);
    let w = Math.round(y * 0.75) + "pt";
    const S = {
      "12pt": "12pt",
      // 16px default
      "13pt": "12pt",
      // Close to 16px
      "14pt": "14pt",
      "15pt": "14pt",
      "16pt": "16pt",
      "18pt": "18pt",
      "20pt": "20pt",
      "24pt": "24pt",
      "28pt": "28pt",
      "32pt": "32pt",
      "36pt": "36pt",
      "48pt": "48pt"
    };
    S[w] && (w = S[w]);
    let R = m.fontFamily.replace(/['"]/g, "").split(",")[0].trim();
    const X = {
      "system-ui": "Inter",
      "-apple-system": "Inter",
      BlinkMacSystemFont: "Inter",
      "Segoe UI": "Inter",
      Roboto: "Inter",
      "Helvetica Neue": "Helvetica",
      Arial: "Arial",
      "Noto Sans": "Inter",
      "Liberation Sans": "Arial",
      "Apple Color Emoji": "Inter",
      "Segoe UI Emoji": "Inter",
      "Segoe UI Symbol": "Inter",
      "Noto Color Emoji": "Inter"
    };
    X[R] && (R = X[R]);
    const P = {
      block: se(g),
      fontSize: w,
      fontFamily: R,
      textAlign: m.textAlign,
      color: ee(m.color),
      backgroundColor: m.backgroundColor === "rgba(0, 0, 0, 0)" ? "transparent" : ee(m.backgroundColor),
      isBold: m.fontWeight === "bold" || parseInt(m.fontWeight) >= 600,
      isItalic: m.fontStyle === "italic",
      isUnderline: m.textDecoration.includes("underline"),
      isStrikethrough: m.textDecoration.includes("line-through")
    };
    (T || Object.keys(P).some(
      (H) => P[H] !== u[H]
    )) && (console.log("Updating styles:", P), b(P));
  }, se = (T) => {
    var g;
    if (!T) return "p";
    let k = T;
    for (; k && k !== n.current; ) {
      const m = (g = k.tagName) == null ? void 0 : g.toLowerCase();
      if (m && ["h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "pre"].includes(m))
        return m;
      k = k.parentElement;
    }
    return "p";
  }, ee = (T) => {
    const k = T.match(/\d+/g);
    if (!k) return "#000000";
    const [g, m, y] = k.map(Number);
    return `#${((1 << 24) + (g << 16) + (m << 8) + y).toString(16).slice(1)}`;
  }, $ = (T) => {
    if (!n.current) return;
    console.log("Applying font size:", T);
    const k = window.getSelection();
    if (k != null && k.rangeCount)
      try {
        const g = k.getRangeAt(0);
        if (g.collapsed) {
          let m = k.anchorNode;
          (m == null ? void 0 : m.nodeType) === Node.TEXT_NODE && (m = m.parentElement), m && m !== n.current && (m.style.fontSize = T);
        } else {
          const m = g.extractContents(), y = document.createElement("span");
          y.style.fontSize = T, y.appendChild(m), g.insertNode(y), g.selectNodeContents(y), k.removeAllRanges(), k.addRange(g);
        }
        setTimeout(() => {
          z(!0);
        }, 50);
      } catch (g) {
        console.warn("Font size application failed:", g), document.execCommand("fontSize", !1, "1"), n.current.querySelectorAll('font[size="1"]').forEach((y) => {
          y.style.fontSize = T, y.removeAttribute("size");
        });
      }
  }, te = (T) => {
    if (!n.current) return;
    console.log("Applying font family:", T);
    const k = window.getSelection();
    if (k != null && k.rangeCount)
      try {
        const g = k.getRangeAt(0);
        if (g.collapsed) {
          let m = k.anchorNode;
          (m == null ? void 0 : m.nodeType) === Node.TEXT_NODE && (m = m.parentElement), m && m !== n.current && (m.style.fontFamily = T);
        } else {
          const m = g.extractContents(), y = document.createElement("span");
          y.style.fontFamily = T, y.appendChild(m), g.insertNode(y), g.selectNodeContents(y), k.removeAllRanges(), k.addRange(g);
        }
        setTimeout(() => {
          z(!0);
        }, 50);
      } catch (g) {
        console.warn("Font family application failed:", g), document.execCommand("fontName", !1, T);
      }
  }, j = (T) => {
    if (h === "wysiwyg" && T.key === "Enter") {
      const k = window.getSelection();
      if (k != null && k.rangeCount) {
        let m = k.getRangeAt(0).startContainer;
        m.nodeType === Node.TEXT_NODE && (m = m.parentElement);
        const y = window.getComputedStyle(m), w = y.fontSize, S = y.fontFamily;
        setTimeout(() => {
          var X;
          const R = (X = n.current) == null ? void 0 : X.querySelector("p:last-child");
          R && R.innerHTML === "<br>" && (R.style.fontSize = w, R.style.fontFamily = S);
        }, 10);
      }
    }
  }, oe = (T, k, g = "medium") => {
    if (!n.current) return;
    const m = {
      small: { width: 300, height: "auto" },
      medium: { width: 600, height: "auto" },
      large: { width: 900, height: "auto" },
      original: { width: null, height: "auto" }
    }, y = m[g] || m.medium, w = document.createElement("img");
    w.src = T, w.alt = k || "Inserted image", w.style.maxWidth = "100%", w.style.height = y.height, y.width && (w.style.width = `${y.width}px`), w.style.display = "block", w.style.margin = "1rem 0", w.style.borderRadius = "8px", w.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    const S = window.getSelection();
    if (S && S.rangeCount > 0) {
      const R = S.getRangeAt(0);
      R.deleteContents();
      const X = document.createElement("p");
      X.appendChild(w), R.insertNode(X), R.setStartAfter(X), R.collapse(!0), S.removeAllRanges(), S.addRange(R);
    } else {
      const R = document.createElement("p");
      R.appendChild(w), n.current.appendChild(R);
    }
    C(), x(!1);
  }, Oe = (T) => {
    var k;
    if (!(!n.current || h === "markdown")) {
      console.log("Executing command:", T);
      try {
        switch (T.type) {
          case "block":
            const g = (k = window.getSelection()) == null ? void 0 : k.anchorNode;
            if (g) {
              let m = g.nodeType === Node.TEXT_NODE ? g.parentElement : g;
              for (; m && m !== n.current && !["H1", "H2", "H3", "H4", "H5", "H6", "P", "BLOCKQUOTE", "PRE"].includes(m.tagName); )
                m = m.parentNode;
            }
            document.execCommand("formatBlock", !1, `<${T.value}>`);
            break;
          case "inline":
          case "list":
          case "align":
          case "indent":
          case "special":
            if (T.name === "preview") {
              console.log("Preview requested - implement preview functionality in your app");
              return;
            } else T.name === "fontSize" ? (console.log("Applying font size:", T.value), $(T.value || "12pt")) : T.name === "fontName" ? (console.log("Applying font family:", T.value), te(T.value || "Arial")) : document.execCommand(T.name, !1, T.value || "");
            break;
          case "media":
            T.name === "insertImage" && x(!0);
            break;
          default:
            break;
        }
      } catch (g) {
        console.warn("Command failed:", T, g);
      }
      C(), z();
    }
  }, Pe = (T) => {
    var m;
    const k = (m = T.target.files) == null ? void 0 : m[0];
    if (!k || !n.current) return;
    const g = new FileReader();
    g.onload = () => {
      var w;
      const y = document.createElement("img");
      y.src = g.result, y.alt = k.name, (w = n.current) == null || w.appendChild(y), C();
    }, g.readAsDataURL(k);
  }, ze = (T) => {
    const k = document.createElement("div");
    k.innerHTML = at.sanitize(T);
    let g = "";
    const m = (y) => {
      switch (y.nodeType) {
        case Node.TEXT_NODE:
          g += y.textContent;
          break;
        case Node.ELEMENT_NODE:
          const w = y;
          switch (w.tagName.toLowerCase()) {
            case "p":
              g += `

`, w.childNodes.forEach(m);
              break;
            case "strong":
            case "b":
              g += "**", w.childNodes.forEach(m), g += "**";
              break;
            case "em":
            case "i":
              g += "_", w.childNodes.forEach(m), g += "_";
              break;
            case "h1":
              g += "# ", w.childNodes.forEach(m), g += `

`;
              break;
            case "h2":
              g += "## ", w.childNodes.forEach(m), g += `

`;
              break;
            case "h3":
              g += "### ", w.childNodes.forEach(m), g += `

`;
              break;
            case "h4":
              g += "#### ", w.childNodes.forEach(m), g += `

`;
              break;
            case "h5":
              g += "##### ", w.childNodes.forEach(m), g += `

`;
              break;
            case "h6":
              g += "###### ", w.childNodes.forEach(m), g += `

`;
              break;
            case "ul":
              w.childNodes.forEach((R) => {
                R.nodeName === "LI" && (g += "* ", R.childNodes.forEach(m), g += `
`);
              });
              break;
            case "ol":
              Array.from(w.childNodes).forEach((R, X) => {
                R.nodeName === "LI" && (g += `${X + 1}. `, R.childNodes.forEach(m), g += `
`);
              });
              break;
            case "a":
              g += `[${w.textContent}](${w.href})`;
              break;
            case "img":
              const S = w;
              g += `

![${S.alt || "Image"}](${S.src})

`;
              break;
            case "code":
              g += "`", w.childNodes.forEach(m), g += "`";
              break;
            case "pre":
              g += "```\n", w.childNodes.forEach(m), g += "\n```";
              break;
            case "blockquote":
              g += "> ", w.childNodes.forEach(m), g += `

`;
              break;
            default:
              w.childNodes.forEach(m);
          }
          break;
      }
    };
    return k.childNodes.forEach(m), g.trim().replace(/\n{3,}/g, `

`);
  };
  return /* @__PURE__ */ D(
    "div",
    {
      className: "group relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.12)] hover:border-slate-300/80 hover:-translate-y-0.5 backdrop-blur-sm flex flex-col",
      style: { height: i },
      children: [
        /* @__PURE__ */ d(
          "div",
          {
            className: "absolute inset-0 opacity-[0.015] mix-blend-overlay",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
            }
          }
        ),
        /* @__PURE__ */ d("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" }),
        /* @__PURE__ */ d("div", { className: "absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-x-16 -translate-y-16" }),
        /* @__PURE__ */ d("div", { className: "absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full translate-x-16 translate-y-16" }),
        /* @__PURE__ */ d(
          hr,
          {
            onCommand: Oe,
            currentStyles: u,
            mode: h,
            onModeChange: a
          }
        ),
        /* @__PURE__ */ d("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ d(
          pr,
          {
            editor: /* @__PURE__ */ d(
              "div",
              {
                ref: n,
                contentEditable: !0,
                suppressContentEditableWarning: !0,
                tabIndex: 0,
                className: `
        h-full p-8 outline-none transition-all duration-300
        ${h === "markdown" ? "font-mono text-sm leading-relaxed bg-gray-50/50" : "prose prose-lg max-w-none bg-white/50"} 
        wysiwyg-editor-content
        focus:bg-white/80 focus:shadow-inner
        selection:bg-blue-100/60 selection:text-blue-900
        overflow-y-auto overflow-x-hidden
      `,
                onInput: C,
                onPaste: B,
                onMouseUp: () => z(),
                onKeyUp: () => z(),
                onKeyDown: j,
                style: {
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  direction: "ltr",
                  unicodeBidi: "embed",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#e2e8f0 #f8fafc",
                  lineHeight: h === "markdown" ? "1.6" : "1.7",
                  letterSpacing: h === "markdown" ? "0.01em" : "0.005em"
                }
              }
            ),
            preview: /* @__PURE__ */ d("div", { className: "prose prose-lg max-w-none p-4 h-full overflow-y-auto", dangerouslySetInnerHTML: { __html: at.sanitize(N(c)) } }),
            mode: h
          }
        ) }),
        /* @__PURE__ */ d("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" }),
        /* @__PURE__ */ d(
          wr,
          {
            isOpen: p,
            onClose: () => x(!1),
            onImageInsert: oe
          }
        ),
        /* @__PURE__ */ d(
          "input",
          {
            type: "file",
            accept: "image/*",
            ref: o,
            onChange: Pe,
            style: { display: "none" }
          }
        )
      ]
    }
  );
};
export {
  wr as ImageUploadModal,
  pr as SplitView,
  hr as Toolbar,
  Ai as WYSIWYGEditor
};
