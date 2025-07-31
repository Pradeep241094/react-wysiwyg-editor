var Lt = Object.defineProperty;
var jt = (a, e, t) => e in a ? Lt(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var Me = (a, e, t) => jt(a, typeof e != "symbol" ? e + "" : e, t);
import kt, { memo as Rt, useState as R, useRef as Re, useMemo as nt, useCallback as v, useEffect as fe } from "react";
import Nt, { centerCrop as It, makeAspectCrop as At } from "react-image-crop";
var gt = { exports: {} }, Ye = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yt;
function _t() {
  if (yt) return Ye;
  yt = 1;
  var a = kt, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, i = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(d, c, m) {
    var f, b = {}, u = null, y = null;
    m !== void 0 && (u = "" + m), c.key !== void 0 && (u = "" + c.key), c.ref !== void 0 && (y = c.ref);
    for (f in c) n.call(c, f) && !s.hasOwnProperty(f) && (b[f] = c[f]);
    if (d && d.defaultProps) for (f in c = d.defaultProps, c) b[f] === void 0 && (b[f] = c[f]);
    return { $$typeof: e, type: d, key: u, ref: y, props: b, _owner: i.current };
  }
  return Ye.Fragment = t, Ye.jsx = l, Ye.jsxs = l, Ye;
}
var qe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xt;
function Ft() {
  return xt || (xt = 1, process.env.NODE_ENV !== "production" && function() {
    var a = kt, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), d = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), C = Symbol.iterator, j = "@@iterator";
    function N(o) {
      if (o === null || typeof o != "object")
        return null;
      var p = C && o[C] || o[j];
      return typeof p == "function" ? p : null;
    }
    var q = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function D(o) {
      {
        for (var p = arguments.length, x = new Array(p > 1 ? p - 1 : 0), L = 1; L < p; L++)
          x[L - 1] = arguments[L];
        _("error", o, x);
      }
    }
    function _(o, p, x) {
      {
        var L = q.ReactDebugCurrentFrame, z = L.getStackAddendum();
        z !== "" && (p += "%s", x = x.concat([z]));
        var K = x.map(function(O) {
          return String(O);
        });
        K.unshift("Warning: " + p), Function.prototype.apply.call(console[o], console, K);
      }
    }
    var V = !1, h = !1, E = !1, H = !1, $ = !1, J;
    J = Symbol.for("react.module.reference");
    function A(o) {
      return !!(typeof o == "string" || typeof o == "function" || o === n || o === s || $ || o === i || o === m || o === f || H || o === y || V || h || E || typeof o == "object" && o !== null && (o.$$typeof === u || o.$$typeof === b || o.$$typeof === l || o.$$typeof === d || o.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      o.$$typeof === J || o.getModuleId !== void 0));
    }
    function B(o, p, x) {
      var L = o.displayName;
      if (L)
        return L;
      var z = p.displayName || p.name || "";
      return z !== "" ? x + "(" + z + ")" : x;
    }
    function I(o) {
      return o.displayName || "Context";
    }
    function W(o) {
      if (o == null)
        return null;
      if (typeof o.tag == "number" && D("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof o == "function")
        return o.displayName || o.name || null;
      if (typeof o == "string")
        return o;
      switch (o) {
        case n:
          return "Fragment";
        case t:
          return "Portal";
        case s:
          return "Profiler";
        case i:
          return "StrictMode";
        case m:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case d:
            var p = o;
            return I(p) + ".Consumer";
          case l:
            var x = o;
            return I(x._context) + ".Provider";
          case c:
            return B(o, o.render, "ForwardRef");
          case b:
            var L = o.displayName || null;
            return L !== null ? L : W(o.type) || "Memo";
          case u: {
            var z = o, K = z._payload, O = z._init;
            try {
              return W(O(K));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, oe = 0, ie, ue, ge, Ae, be, ye, ve;
    function _e() {
    }
    _e.__reactDisabledLog = !0;
    function Fe() {
      {
        if (oe === 0) {
          ie = console.log, ue = console.info, ge = console.warn, Ae = console.error, be = console.group, ye = console.groupCollapsed, ve = console.groupEnd;
          var o = {
            configurable: !0,
            enumerable: !0,
            value: _e,
            writable: !0
          };
          Object.defineProperties(console, {
            info: o,
            log: o,
            warn: o,
            error: o,
            group: o,
            groupCollapsed: o,
            groupEnd: o
          });
        }
        oe++;
      }
    }
    function Ee() {
      {
        if (oe--, oe === 0) {
          var o = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, o, {
              value: ie
            }),
            info: M({}, o, {
              value: ue
            }),
            warn: M({}, o, {
              value: ge
            }),
            error: M({}, o, {
              value: Ae
            }),
            group: M({}, o, {
              value: be
            }),
            groupCollapsed: M({}, o, {
              value: ye
            }),
            groupEnd: M({}, o, {
              value: ve
            })
          });
        }
        oe < 0 && D("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = q.ReactCurrentDispatcher, S;
    function U(o, p, x) {
      {
        if (S === void 0)
          try {
            throw Error();
          } catch (z) {
            var L = z.stack.trim().match(/\n( *(at )?)/);
            S = L && L[1] || "";
          }
        return `
` + S + o;
      }
    }
    var Z = !1, ae;
    {
      var te = typeof WeakMap == "function" ? WeakMap : Map;
      ae = new te();
    }
    function Oe(o, p) {
      if (!o || Z)
        return "";
      {
        var x = ae.get(o);
        if (x !== void 0)
          return x;
      }
      var L;
      Z = !0;
      var z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var K;
      K = we.current, we.current = null, Fe();
      try {
        if (p) {
          var O = function() {
            throw Error();
          };
          if (Object.defineProperty(O.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(O, []);
            } catch (me) {
              L = me;
            }
            Reflect.construct(o, [], O);
          } else {
            try {
              O.call();
            } catch (me) {
              L = me;
            }
            o.call(O.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (me) {
            L = me;
          }
          o();
        }
      } catch (me) {
        if (me && L && typeof me.stack == "string") {
          for (var F = me.stack.split(`
`), de = L.stack.split(`
`), Q = F.length - 1, ee = de.length - 1; Q >= 1 && ee >= 0 && F[Q] !== de[ee]; )
            ee--;
          for (; Q >= 1 && ee >= 0; Q--, ee--)
            if (F[Q] !== de[ee]) {
              if (Q !== 1 || ee !== 1)
                do
                  if (Q--, ee--, ee < 0 || F[Q] !== de[ee]) {
                    var pe = `
` + F[Q].replace(" at new ", " at ");
                    return o.displayName && pe.includes("<anonymous>") && (pe = pe.replace("<anonymous>", o.displayName)), typeof o == "function" && ae.set(o, pe), pe;
                  }
                while (Q >= 1 && ee >= 0);
              break;
            }
        }
      } finally {
        Z = !1, we.current = K, Ee(), Error.prepareStackTrace = z;
      }
      var He = o ? o.displayName || o.name : "", je = He ? U(He) : "";
      return typeof o == "function" && ae.set(o, je), je;
    }
    function T(o, p, x) {
      return Oe(o, !1);
    }
    function xe(o) {
      var p = o.prototype;
      return !!(p && p.isReactComponent);
    }
    function Se(o, p, x) {
      if (o == null)
        return "";
      if (typeof o == "function")
        return Oe(o, xe(o));
      if (typeof o == "string")
        return U(o);
      switch (o) {
        case m:
          return U("Suspense");
        case f:
          return U("SuspenseList");
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case c:
            return T(o.render);
          case b:
            return Se(o.type, p, x);
          case u: {
            var L = o, z = L._payload, K = L._init;
            try {
              return Se(K(z), p, x);
            } catch {
            }
          }
        }
      return "";
    }
    var Te = Object.prototype.hasOwnProperty, X = {}, G = q.ReactDebugCurrentFrame;
    function Le(o) {
      if (o) {
        var p = o._owner, x = Se(o.type, o._source, p ? p.type : null);
        G.setExtraStackFrame(x);
      } else
        G.setExtraStackFrame(null);
    }
    function ze(o, p, x, L, z) {
      {
        var K = Function.call.bind(Te);
        for (var O in o)
          if (K(o, O)) {
            var F = void 0;
            try {
              if (typeof o[O] != "function") {
                var de = Error((L || "React class") + ": " + x + " type `" + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[O] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw de.name = "Invariant Violation", de;
              }
              F = o[O](p, O, L, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              F = Q;
            }
            F && !(F instanceof Error) && (Le(z), D("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", L || "React class", x, O, typeof F), Le(null)), F instanceof Error && !(F.message in X) && (X[F.message] = !0, Le(z), D("Failed %s type: %s", x, F.message), Le(null));
          }
      }
    }
    var Ve = Array.isArray;
    function De(o) {
      return Ve(o);
    }
    function Be(o) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, x = p && o[Symbol.toStringTag] || o.constructor.name || "Object";
        return x;
      }
    }
    function ot(o) {
      try {
        return Je(o), !1;
      } catch {
        return !0;
      }
    }
    function Je(o) {
      return "" + o;
    }
    function Xe(o) {
      if (ot(o))
        return D("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(o)), Je(o);
    }
    var Ze = q.ReactCurrentOwner, it = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Qe, et;
    function at(o) {
      if (Te.call(o, "ref")) {
        var p = Object.getOwnPropertyDescriptor(o, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return o.ref !== void 0;
    }
    function st(o) {
      if (Te.call(o, "key")) {
        var p = Object.getOwnPropertyDescriptor(o, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return o.key !== void 0;
    }
    function Ue(o, p) {
      typeof o.ref == "string" && Ze.current;
    }
    function lt(o, p) {
      {
        var x = function() {
          Qe || (Qe = !0, D("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        x.isReactWarning = !0, Object.defineProperty(o, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function ct(o, p) {
      {
        var x = function() {
          et || (et = !0, D("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        x.isReactWarning = !0, Object.defineProperty(o, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var dt = function(o, p, x, L, z, K, O) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: o,
        key: p,
        ref: x,
        props: O,
        // Record the component responsible for creating this element.
        _owner: K
      };
      return F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(F, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: L
      }), Object.defineProperty(F, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    };
    function ut(o, p, x, L, z) {
      {
        var K, O = {}, F = null, de = null;
        x !== void 0 && (Xe(x), F = "" + x), st(p) && (Xe(p.key), F = "" + p.key), at(p) && (de = p.ref, Ue(p, z));
        for (K in p)
          Te.call(p, K) && !it.hasOwnProperty(K) && (O[K] = p[K]);
        if (o && o.defaultProps) {
          var Q = o.defaultProps;
          for (K in Q)
            O[K] === void 0 && (O[K] = Q[K]);
        }
        if (F || de) {
          var ee = typeof o == "function" ? o.displayName || o.name || "Unknown" : o;
          F && lt(O, ee), de && ct(O, ee);
        }
        return dt(o, F, de, z, L, Ze.current, O);
      }
    }
    var We = q.ReactCurrentOwner, Pe = q.ReactDebugCurrentFrame;
    function Ce(o) {
      if (o) {
        var p = o._owner, x = Se(o.type, o._source, p ? p.type : null);
        Pe.setExtraStackFrame(x);
      } else
        Pe.setExtraStackFrame(null);
    }
    var Ke;
    Ke = !1;
    function Ge(o) {
      return typeof o == "object" && o !== null && o.$$typeof === e;
    }
    function tt() {
      {
        if (We.current) {
          var o = W(We.current.type);
          if (o)
            return `

Check the render method of \`` + o + "`.";
        }
        return "";
      }
    }
    function mt(o) {
      return "";
    }
    var rt = {};
    function g(o) {
      {
        var p = tt();
        if (!p) {
          var x = typeof o == "string" ? o : o.displayName || o.name;
          x && (p = `

Check the top-level render call using <` + x + ">.");
        }
        return p;
      }
    }
    function w(o, p) {
      {
        if (!o._store || o._store.validated || o.key != null)
          return;
        o._store.validated = !0;
        var x = g(p);
        if (rt[x])
          return;
        rt[x] = !0;
        var L = "";
        o && o._owner && o._owner !== We.current && (L = " It was passed a child from " + W(o._owner.type) + "."), Ce(o), D('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, L), Ce(null);
      }
    }
    function k(o, p) {
      {
        if (typeof o != "object")
          return;
        if (De(o))
          for (var x = 0; x < o.length; x++) {
            var L = o[x];
            Ge(L) && w(L, p);
          }
        else if (Ge(o))
          o._store && (o._store.validated = !0);
        else if (o) {
          var z = N(o);
          if (typeof z == "function" && z !== o.entries)
            for (var K = z.call(o), O; !(O = K.next()).done; )
              Ge(O.value) && w(O.value, p);
        }
      }
    }
    function P(o) {
      {
        var p = o.type;
        if (p == null || typeof p == "string")
          return;
        var x;
        if (typeof p == "function")
          x = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === b))
          x = p.propTypes;
        else
          return;
        if (x) {
          var L = W(p);
          ze(x, o.props, "prop", L, o);
        } else if (p.PropTypes !== void 0 && !Ke) {
          Ke = !0;
          var z = W(p);
          D("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", z || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && D("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Y(o) {
      {
        for (var p = Object.keys(o.props), x = 0; x < p.length; x++) {
          var L = p[x];
          if (L !== "children" && L !== "key") {
            Ce(o), D("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", L), Ce(null);
            break;
          }
        }
        o.ref !== null && (Ce(o), D("Invalid attribute `ref` supplied to `React.Fragment`."), Ce(null));
      }
    }
    var se = {};
    function le(o, p, x, L, z, K) {
      {
        var O = A(o);
        if (!O) {
          var F = "";
          (o === void 0 || typeof o == "object" && o !== null && Object.keys(o).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var de = mt();
          de ? F += de : F += tt();
          var Q;
          o === null ? Q = "null" : De(o) ? Q = "array" : o !== void 0 && o.$$typeof === e ? (Q = "<" + (W(o.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof o, D("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, F);
        }
        var ee = ut(o, p, x, z, K);
        if (ee == null)
          return ee;
        if (O) {
          var pe = p.children;
          if (pe !== void 0)
            if (L)
              if (De(pe)) {
                for (var He = 0; He < pe.length; He++)
                  k(pe[He], o);
                Object.freeze && Object.freeze(pe);
              } else
                D("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              k(pe, o);
        }
        if (Te.call(p, "key")) {
          var je = W(o), me = Object.keys(p).filter(function(Tt) {
            return Tt !== "key";
          }), ft = me.length > 0 ? "{key: someKey, " + me.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!se[je + ft]) {
            var St = me.length > 0 ? "{" + me.join(": ..., ") + ": ...}" : "{}";
            D(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ft, je, St, je), se[je + ft] = !0;
          }
        }
        return o === n ? Y(ee) : P(ee), ee;
      }
    }
    function re(o, p, x) {
      return le(o, p, x, !0);
    }
    function ne(o, p, x) {
      return le(o, p, x, !1);
    }
    var ce = ne, he = re;
    qe.Fragment = n, qe.jsx = ce, qe.jsxs = he;
  }()), qe;
}
process.env.NODE_ENV === "production" ? gt.exports = _t() : gt.exports = Ft();
var r = gt.exports;
const Ot = [
  {
    name: "clipboard",
    buttons: [
      { command: "undo", icon: "↶", title: "Undo" },
      { command: "redo", icon: "↷", title: "Redo" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "editing",
    buttons: [
      { command: "findReplace", icon: "🔍", title: "Find & Replace" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "basicstyles",
    buttons: [
      { command: "bold", icon: "B", title: "Bold" },
      { command: "italic", icon: "I", title: "Italic" },
      { command: "underline", icon: "U", title: "Underline" },
      { command: "strikethrough", icon: "S̶", title: "Strikethrough" },
      { command: "subscript", icon: "X₂", title: "Subscript" },
      { command: "superscript", icon: "X²", title: "Superscript" },
      { command: "removeFormat", icon: "🧹", title: "Clear Formatting" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "paragraph",
    buttons: [
      // Individual heading buttons for test compatibility
      { command: "formatBlock", value: "H1", icon: "H1", title: "Heading 1" },
      { command: "formatBlock", value: "H2", icon: "H2", title: "Heading 2" },
      { command: "formatBlock", value: "H3", icon: "H3", title: "Heading 3" },
      {
        command: "formatBlock",
        icon: "¶",
        title: "Format",
        type: "dropdown",
        options: [
          { value: "P", label: "Normal", icon: "¶" },
          { value: "H1", label: "Heading 1", icon: "H1" },
          { value: "H2", label: "Heading 2", icon: "H2" },
          { value: "H3", label: "Heading 3", icon: "H3" },
          { value: "H4", label: "Heading 4", icon: "H4" },
          { value: "H5", label: "Heading 5", icon: "H5" },
          { value: "H6", label: "Heading 6", icon: "H6" },
          { value: "BLOCKQUOTE", label: "Quote", icon: '"' },
          { value: "PRE", label: "Code Block", icon: "</>" }
        ]
      },
      {
        command: "fontSize",
        icon: "🔤",
        title: "Font Size",
        type: "dropdown",
        options: [
          { value: "1", label: "8pt" },
          { value: "2", label: "10pt" },
          { value: "3", label: "12pt" },
          { value: "4", label: "14pt" },
          { value: "5", label: "18pt" },
          { value: "6", label: "24pt" },
          { value: "7", label: "36pt" }
        ]
      },
      {
        command: "fontName",
        icon: "Aa",
        title: "Font Family",
        type: "dropdown",
        options: [
          { value: "Arial", label: "Arial" },
          { value: "Georgia", label: "Georgia" },
          { value: "Times New Roman", label: "Times New Roman" },
          { value: "Courier New", label: "Courier New" },
          { value: "Verdana", label: "Verdana" },
          { value: "Helvetica", label: "Helvetica" }
        ]
      },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "colors",
    buttons: [
      { command: "fontColor", icon: "A", title: "Text Color", type: "color" },
      { command: "backgroundColor", icon: "🎨", title: "Background Color", type: "color" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "list",
    buttons: [
      { command: "insertUnorderedList", icon: "•", title: "Bullet List" },
      { command: "insertOrderedList", icon: "1.", title: "Numbered List" },
      { command: "outdent", icon: "⇤", title: "Decrease Indent" },
      { command: "indent", icon: "⇥", title: "Increase Indent" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "align",
    buttons: [
      { command: "justifyLeft", icon: "⬅", title: "Align Left" },
      { command: "justifyCenter", icon: "⬌", title: "Align Center" },
      { command: "justifyRight", icon: "➡", title: "Align Right" },
      { command: "justifyFull", icon: "⬌", title: "Justify" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "links",
    buttons: [
      { command: "createLink", icon: "🔗", title: "Insert Link" },
      { command: "unlink", icon: "🔗✕", title: "Remove Link" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "insert",
    buttons: [
      { command: "insertImage", icon: "🖼️", title: "Insert Image" },
      { command: "insertTable", icon: "⊞", title: "Insert Table" },
      { command: "insertHorizontalRule", icon: "―", title: "Horizontal Rule" },
      { command: "insertSpecialChar", icon: "Ω", title: "Special Characters" },
      { command: "uploadFile", icon: "📎", title: "Upload File" },
      { type: "separator", command: "", icon: "", title: "" }
    ]
  },
  {
    name: "tools",
    buttons: [
      { command: "sourceCode", icon: "</>", title: "Source Code" },
      { command: "fullscreen", icon: "⛶", title: "Fullscreen" },
      { command: "print", icon: "🖨️", title: "Print" },
      { command: "spellCheck", icon: "✓", title: "Spell Check" }
    ]
  }
], Dt = [
  // Black / Grayscale
  "#ffffff",
  "#e6e6e6",
  "#999999",
  "#4d4d4d",
  "#1a1a1a",
  "#000000",
  // Red
  "#ffebee",
  "#ef9a9a",
  "#ef5350",
  "#f44336",
  "#d32f2f",
  "#b71c1c",
  // Blue
  "#e3f2fd",
  "#90caf9",
  "#42a5f5",
  "#2196f3",
  "#1976d2",
  "#0d47a1",
  // Green
  "#e8f5e9",
  "#a5d6a7",
  "#66bb6a",
  "#4caf50",
  "#388e3c",
  "#1b5e20",
  // Orange
  "#fff3e0",
  "#ffcc80",
  "#ffa726",
  "#ff9800",
  "#f57c00",
  "#e65100",
  // Grey
  "#fafafa",
  "#eeeeee",
  "#bdbdbd",
  "#9e9e9e",
  "#616161",
  "#212121"
], Bt = Rt(({
  button: a,
  groupName: e,
  index: t,
  isActive: n,
  isDisabled: i,
  openDropdown: s,
  openColorPicker: l,
  onButtonClick: d,
  onDropdownSelect: c,
  onColorSelect: m,
  setOpenColorPicker: f,
  dropdownRefs: b
}) => {
  var y;
  if (a.type === "separator")
    return /* @__PURE__ */ r.jsx("div", { className: "toolbar-separator" }, `${e}-sep-${t}`);
  const u = `${e}-${a.command}-${t}`;
  return /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ r.jsxs(
      "button",
      {
        className: `toolbar-button ${n ? "active" : ""} ${a.type === "dropdown" || a.type === "color" ? "dropdown" : ""}`,
        title: a.title,
        "aria-label": a.title,
        disabled: i,
        onClick: () => d(a),
        onMouseDown: (C) => C.preventDefault(),
        children: [
          /* @__PURE__ */ r.jsx("span", { className: "button-icon", "aria-hidden": "true", children: a.icon }),
          (a.type === "dropdown" || a.type === "color") && /* @__PURE__ */ r.jsx("span", { className: "dropdown-arrow", children: "▼" })
        ]
      }
    ),
    a.type === "dropdown" && s === a.command && /* @__PURE__ */ r.jsx(
      "div",
      {
        ref: (C) => b.current[a.command] = C,
        className: "toolbar-dropdown",
        children: (y = a.options) == null ? void 0 : y.map((C) => /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "dropdown-item",
            onClick: () => c(a.command, C.value),
            children: [
              C.icon && /* @__PURE__ */ r.jsx("span", { className: "option-icon", children: C.icon }),
              /* @__PURE__ */ r.jsx("span", { className: "option-label", children: C.label })
            ]
          },
          C.value
        ))
      }
    ),
    a.type === "color" && l === a.command && /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: (C) => b.current[a.command] = C,
        className: "toolbar-color-picker",
        children: [
          /* @__PURE__ */ r.jsxs("div", { className: "color-picker-header", children: [
            /* @__PURE__ */ r.jsx("h4", { className: "color-picker-title", children: a.command === "fontColor" ? "Text Color" : "Background Color" }),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "color-picker-close",
                onClick: () => f(null),
                "aria-label": "Close color picker",
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: "color-grid", children: Dt.map((C) => /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "color-swatch",
              style: { backgroundColor: C },
              onClick: () => m(a.command, C),
              title: C,
              "aria-label": `Select color ${C}`
            },
            C
          )) }),
          /* @__PURE__ */ r.jsxs("div", { className: "color-input-section", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "color",
                className: "color-input",
                onChange: (C) => m(a.command, C.target.value),
                title: "Choose custom color"
              }
            ),
            /* @__PURE__ */ r.jsx("span", { className: "color-input-label", children: "Custom Color" }),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "color-remove-btn",
                onClick: () => m(a.command, a.command === "fontColor" ? "inherit" : "transparent"),
                title: "Remove color",
                children: "Remove"
              }
            )
          ] })
        ]
      }
    )
  ] }, u);
}), Ut = {
  // Basic formatting
  bold: { command: "bold", icon: "B", title: "Bold" },
  italic: { command: "italic", icon: "I", title: "Italic" },
  underline: { command: "underline", icon: "U", title: "Underline" },
  strikethrough: { command: "strikethrough", icon: "S̶", title: "Strikethrough" },
  subscript: { command: "subscript", icon: "X₂", title: "Subscript" },
  superscript: { command: "superscript", icon: "X²", title: "Superscript" },
  // Headings
  h1: { command: "formatBlock", value: "H1", icon: "H1", title: "Heading 1" },
  h2: { command: "formatBlock", value: "H2", icon: "H2", title: "Heading 2" },
  h3: { command: "formatBlock", value: "H3", icon: "H3", title: "Heading 3" },
  h4: { command: "formatBlock", value: "H4", icon: "H4", title: "Heading 4" },
  h5: { command: "formatBlock", value: "H5", icon: "H5", title: "Heading 5" },
  h6: { command: "formatBlock", value: "H6", icon: "H6", title: "Heading 6" },
  // Lists
  bulletList: { command: "insertUnorderedList", icon: "•", title: "Bullet List" },
  numberedList: { command: "insertOrderedList", icon: "1.", title: "Numbered List" },
  indent: { command: "indent", icon: "⇥", title: "Increase Indent" },
  outdent: { command: "outdent", icon: "⇤", title: "Decrease Indent" },
  // Alignment
  alignLeft: { command: "justifyLeft", icon: "⬅", title: "Align Left" },
  alignCenter: { command: "justifyCenter", icon: "⬌", title: "Align Center" },
  alignRight: { command: "justifyRight", icon: "➡", title: "Align Right" },
  alignJustify: { command: "justifyFull", icon: "⬌", title: "Justify" },
  // Media
  image: { command: "insertImage", icon: "🖼️", title: "Insert Image" },
  file: { command: "uploadFile", icon: "📎", title: "Upload File" },
  table: { command: "insertTable", icon: "⊞", title: "Insert Table" },
  // Links
  link: { command: "createLink", icon: "🔗", title: "Insert Link" },
  unlink: { command: "unlink", icon: "🔗✕", title: "Remove Link" },
  // Advanced formatting
  fontColor: { command: "fontColor", icon: "A", title: "Text Color", type: "color" },
  backgroundColor: { command: "backgroundColor", icon: "🎨", title: "Background Color", type: "color" },
  fontSize: {
    command: "fontSize",
    icon: "🔤",
    title: "Font Size",
    type: "dropdown",
    options: [
      { value: "1", label: "8pt" },
      { value: "2", label: "10pt" },
      { value: "3", label: "12pt" },
      { value: "4", label: "14pt" },
      { value: "5", label: "18pt" },
      { value: "6", label: "24pt" },
      { value: "7", label: "36pt" }
    ]
  },
  fontFamily: {
    command: "fontName",
    icon: "Aa",
    title: "Font Family",
    type: "dropdown",
    options: [
      { value: "Arial", label: "Arial" },
      { value: "Georgia", label: "Georgia" },
      { value: "Times New Roman", label: "Times New Roman" },
      { value: "Courier New", label: "Courier New" },
      { value: "Verdana", label: "Verdana" },
      { value: "Helvetica", label: "Helvetica" }
    ]
  },
  specialChar: { command: "insertSpecialChar", icon: "Ω", title: "Special Characters" },
  horizontalRule: { command: "insertHorizontalRule", icon: "―", title: "Horizontal Rule" },
  // Tools
  findReplace: { command: "findReplace", icon: "🔍", title: "Find & Replace" },
  sourceCode: { command: "sourceCode", icon: "</>", title: "Source Code" },
  fullscreen: { command: "fullscreen", icon: "⛶", title: "Fullscreen" },
  print: { command: "print", icon: "🖨️", title: "Print" },
  undo: { command: "undo", icon: "↶", title: "Undo" },
  redo: { command: "redo", icon: "↷", title: "Redo" },
  removeFormat: { command: "removeFormat", icon: "🧹", title: "Clear Formatting" }
}, Pt = ({
  onCommand: a,
  activeFormats: e,
  canUndo: t,
  canRedo: n,
  toolbarConfig: i,
  showConfigDropdown: s = !1,
  configOptions: l,
  selectedConfigKey: d,
  onConfigChange: c
}) => {
  const [m, f] = R(null), [b, u] = R(null), y = Re({}), C = nt(() => i ? i.groups.map((h) => ({
    name: h.name,
    buttons: h.buttons.map((E) => Ut[E]).filter(Boolean)
    // Remove any undefined buttons
  })).filter((h) => h.buttons.length > 0) : Ot, [i]), j = v((h) => {
    h.type === "dropdown" ? (f(m === h.command ? null : h.command), u(null)) : h.type === "color" ? (u(b === h.command ? null : h.command), f(null)) : (a(h.command, h.value), f(null), u(null));
  }, [a, m, b]), N = v((h, E) => {
    a(h, E), f(null);
  }, [a]), q = v((h, E) => {
    a(h, E), u(null);
  }, [a]), D = v((h, E) => {
    const H = {
      bold: "BOLD",
      italic: "ITALIC",
      underline: "UNDERLINE",
      strikethrough: "STRIKETHROUGH",
      subscript: "SUBSCRIPT",
      superscript: "SUPERSCRIPT",
      insertUnorderedList: "INSERT_UNORDERED_LIST",
      insertOrderedList: "INSERT_ORDERED_LIST",
      justifyLeft: "JUSTIFY_LEFT",
      justifyCenter: "JUSTIFY_CENTER",
      justifyRight: "JUSTIFY_RIGHT",
      justifyFull: "JUSTIFY_FULL",
      createLink: "CREATE_LINK"
    };
    if (h === "formatBlock" && E) {
      const J = `FORMAT_${E}`;
      return e.has(J);
    }
    const $ = H[h];
    return $ ? e.has($) : !1;
  }, [e]), _ = v((h) => h === "undo" ? !t : h === "redo" ? !n : !1, [t, n]);
  fe(() => {
    const h = (E) => {
      const H = E.target;
      !H.closest(".toolbar-dropdown") && !H.closest(".toolbar-color-picker") && !H.closest(".toolbar-button") && (f(null), u(null));
    };
    if (m || b) {
      const E = setTimeout(() => {
        document.addEventListener("click", h);
      }, 0);
      return () => {
        clearTimeout(E), document.removeEventListener("click", h);
      };
    }
  }, [m, b]);
  const V = v((h, E, H) => {
    if (h.type === "separator")
      return /* @__PURE__ */ r.jsx("div", { className: "toolbar-separator" }, `${E}-sep-${H}`);
    const $ = D(h.command, h.value), J = _(h.command);
    return /* @__PURE__ */ r.jsx(
      Bt,
      {
        button: h,
        groupName: E,
        index: H,
        isActive: $,
        isDisabled: J,
        openDropdown: m,
        openColorPicker: b,
        onButtonClick: j,
        onDropdownSelect: N,
        onColorSelect: q,
        setOpenColorPicker: u,
        dropdownRefs: y
      },
      `${E}-${h.command}-${H}`
    );
  }, [
    D,
    _,
    m,
    b,
    j,
    N,
    q
  ]);
  return /* @__PURE__ */ r.jsxs("div", { className: "advanced-toolbar toolbar", role: "toolbar", "aria-label": "Rich text formatting toolbar", style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
    /* @__PURE__ */ r.jsx("div", { className: "toolbar-left", style: { display: "flex", alignItems: "center", gap: "4px" }, children: C.map((h) => /* @__PURE__ */ r.jsx("div", { className: "toolbar-group", children: h.buttons.map((E, H) => V(E, h.name, H)) }, h.name)) }),
    s && l && /* @__PURE__ */ r.jsx("div", { className: "toolbar-right", style: { marginLeft: "auto" }, children: /* @__PURE__ */ r.jsx("div", { className: "toolbar-group", children: /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ r.jsxs(
        "button",
        {
          className: `toolbar-button dropdown ${m === "config" ? "active" : ""}`,
          title: "Toolbar Configuration",
          "aria-label": "Change toolbar configuration",
          onClick: (h) => {
            h.stopPropagation(), f(m === "config" ? null : "config");
          },
          onMouseDown: (h) => h.preventDefault(),
          children: [
            /* @__PURE__ */ r.jsx("span", { className: "button-icon", "aria-hidden": "true", children: "⚙️" }),
            /* @__PURE__ */ r.jsx("span", { className: "dropdown-arrow", children: "▼" })
          ]
        }
      ),
      m === "config" && /* @__PURE__ */ r.jsxs(
        "div",
        {
          ref: (h) => y.current.config = h,
          className: "toolbar-dropdown config-dropdown",
          style: {
            position: "absolute",
            top: "100%",
            right: 0,
            left: "auto",
            minWidth: "280px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1e3,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          },
          children: [
            /* @__PURE__ */ r.jsxs("div", { className: "config-dropdown-header", children: [
              /* @__PURE__ */ r.jsx("h4", { className: "config-dropdown-title", children: "Toolbar Configuration" }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  className: "config-dropdown-close",
                  onClick: () => f(null),
                  "aria-label": "Close configuration menu",
                  children: "×"
                }
              )
            ] }),
            Object.entries(l).map(([h, E]) => /* @__PURE__ */ r.jsxs(
              "button",
              {
                className: `config-dropdown-item ${d === h ? "active" : ""}`,
                onClick: () => {
                  c == null || c(h), f(null);
                },
                children: [
                  /* @__PURE__ */ r.jsx("div", { className: "config-item-name", children: E.name }),
                  E.description && /* @__PURE__ */ r.jsx("div", { className: "config-item-description", children: E.description })
                ]
              },
              h
            ))
          ]
        }
      )
    ] }) }) })
  ] });
}, Et = () => {
  const a = window.getSelection();
  if (!a || a.rangeCount === 0)
    return {
      range: null,
      isCollapsed: !0,
      activeFormats: /* @__PURE__ */ new Set(),
      currentBlockFormat: "div"
    };
  const e = a.getRangeAt(0), t = Ht(), n = Mt();
  return {
    range: e.cloneRange(),
    isCollapsed: a.isCollapsed,
    activeFormats: t,
    currentBlockFormat: n
  };
}, wt = (a) => {
  if (!a.range)
    return;
  const e = window.getSelection();
  if (e)
    try {
      e.removeAllRanges(), e.addRange(a.range);
    } catch (t) {
      console.warn("Failed to restore selection:", t);
    }
}, dr = () => {
  const a = Et();
  return () => {
    wt(a);
  };
}, Ht = () => {
  const a = /* @__PURE__ */ new Set();
  try {
    document.queryCommandState("bold") && a.add("bold"), document.queryCommandState("italic") && a.add("italic"), document.queryCommandState("underline") && a.add("underline"), document.queryCommandState("insertUnorderedList") && a.add("insertUnorderedList"), document.queryCommandState("insertOrderedList") && a.add("insertOrderedList"), document.queryCommandState("justifyLeft") && a.add("justifyLeft"), document.queryCommandState("justifyCenter") && a.add("justifyCenter"), document.queryCommandState("justifyRight") && a.add("justifyRight");
  } catch (e) {
    console.warn("Error checking command state:", e);
  }
  return a;
}, Mt = () => {
  var e;
  try {
    const t = document.queryCommandValue("formatBlock");
    if (t)
      return t.toLowerCase();
  } catch (t) {
    console.warn("Error getting block format:", t);
  }
  const a = window.getSelection();
  if (a && a.rangeCount > 0) {
    let n = a.getRangeAt(0).commonAncestorContainer;
    n.nodeType === Node.TEXT_NODE && (n = n.parentElement || n);
    const i = (e = n.tagName) == null ? void 0 : e.toLowerCase();
    if (["h1", "h2", "h3", "h4", "h5", "h6", "p", "div"].includes(i))
      return i;
  }
  return "div";
}, $t = (a) => {
  const e = window.getSelection();
  if (!e || e.rangeCount === 0)
    return !1;
  const t = e.getRangeAt(0);
  return a.contains(t.commonAncestorContainer);
}, ur = (a) => {
  a.focus();
  const e = window.getSelection();
  if (e) {
    const t = document.createRange();
    t.selectNodeContents(a), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
  }
}, zt = (a, e) => {
  a.focus(), e && wt(e);
}, Wt = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "b",
    "i",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "span",
    "div"
  ],
  allowedAttributes: {
    a: ["href", "title"],
    span: ["style"],
    div: ["style"],
    p: ["style"],
    h1: ["style"],
    h2: ["style"],
    h3: ["style"],
    h4: ["style"],
    h5: ["style"],
    h6: ["style"]
  },
  allowedProtocols: ["http:", "https:", "mailto:"]
};
class Kt {
  constructor(e = Wt) {
    Me(this, "config");
    this.config = e;
  }
  /**
   * Sanitize HTML content by removing dangerous elements and attributes
   */
  sanitizeHtml(e) {
    if (!e || typeof e != "string")
      return "";
    const t = document.createElement("div");
    return t.innerHTML = e, this.sanitizeElement(t), t.innerHTML;
  }
  /**
   * Sanitize pasted content specifically for the editor
   */
  sanitizePastedContent(e) {
    let t = this.cleanPasteArtifacts(e), n = this.sanitizeHtml(t);
    return n = this.normalizeWhitespace(n), n;
  }
  /**
   * Recursively sanitize a DOM element and its children
   */
  sanitizeElement(e) {
    var n;
    const t = Array.from(e.children);
    for (const i of t) {
      const s = i.tagName.toLowerCase();
      if (!this.config.allowedTags.includes(s)) {
        if (this.isDangerousTag(s)) {
          i.remove();
          continue;
        }
        const l = i.textContent || "";
        if (l.trim()) {
          const d = document.createTextNode(l);
          (n = i.parentNode) == null || n.replaceChild(d, i);
        } else
          i.remove();
        continue;
      }
      this.sanitizeAttributes(i), this.sanitizeElement(i);
    }
  }
  /**
   * Check if a tag is dangerous and should be removed completely
   */
  isDangerousTag(e) {
    return [
      "script",
      "iframe",
      "object",
      "embed",
      "form",
      "input",
      "button",
      "textarea",
      "select",
      "option",
      "style",
      "link",
      "meta",
      "base",
      "applet",
      "frame",
      "frameset"
    ].includes(e);
  }
  /**
   * Sanitize attributes of an element
   */
  sanitizeAttributes(e) {
    const t = e.tagName.toLowerCase(), n = this.config.allowedAttributes[t] || [], i = Array.from(e.attributes);
    for (const s of i) {
      const l = s.name.toLowerCase();
      if (!n.includes(l)) {
        e.removeAttribute(s.name);
        continue;
      }
      if (l === "href") {
        const d = this.sanitizeUrl(s.value);
        d ? e.setAttribute("href", d) : e.removeAttribute("href");
        continue;
      }
      if (l === "style") {
        const d = this.sanitizeStyle(s.value);
        d ? e.setAttribute("style", d) : e.removeAttribute("style");
        continue;
      }
      this.containsScript(s.value) && e.removeAttribute(s.name);
    }
  }
  /**
   * Sanitize URL to ensure it uses allowed protocols
   */
  sanitizeUrl(e) {
    if (!e || typeof e != "string")
      return null;
    const t = e.trim();
    if (/^(javascript|data|vbscript|file|ftp):/i.test(t))
      return null;
    if (t.startsWith("/") || t.startsWith("./") || t.startsWith("../") || t.startsWith("#"))
      return t;
    try {
      const n = new URL(t);
      if (this.config.allowedProtocols.includes(n.protocol))
        return t;
    } catch {
      try {
        const i = `http://${t}`, s = new URL(i);
        if (this.config.allowedProtocols.includes(s.protocol))
          return i;
      } catch {
        return null;
      }
    }
    return null;
  }
  /**
   * Sanitize CSS style attribute
   */
  sanitizeStyle(e) {
    if (!e || typeof e != "string")
      return null;
    const t = [
      /expression\s*\(/i,
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /data\s*:/i,
      /import\s*['"]/i,
      /@import/i,
      /binding\s*:/i,
      /behavior\s*:/i,
      /position\s*:\s*fixed/i,
      /position\s*:\s*absolute/i
    ];
    for (const l of t)
      if (l.test(e))
        return null;
    const n = [
      "color",
      "background-color",
      "font-size",
      "font-weight",
      "font-style",
      "text-decoration",
      "text-align",
      "margin",
      "padding",
      "border",
      "font-family"
    ], i = e.split(";").filter((l) => l.trim()), s = [];
    for (const l of i) {
      const [d, c] = l.split(":").map((m) => m.trim());
      d && c && n.includes(d.toLowerCase()) && (this.containsScript(c) || s.push(`${d}: ${c}`));
    }
    return s.length > 0 ? s.join("; ") : null;
  }
  /**
   * Check if a string contains potentially dangerous script content
   */
  containsScript(e) {
    return !e || typeof e != "string" ? !1 : [
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /data\s*:/i,
      /on\w+\s*=/i,
      // Event handlers like onclick, onload, etc.
      /<script/i,
      /<\/script/i,
      /expression\s*\(/i,
      /eval\s*\(/i,
      /setTimeout\s*\(/i,
      /setInterval\s*\(/i
    ].some((n) => n.test(e));
  }
  /**
   * Clean up common artifacts from pasted content
   */
  cleanPasteArtifacts(e) {
    let t = e;
    return t = t.replace(/<o:p\s*\/?>/gi, ""), t = t.replace(/<\/o:p>/gi, ""), t = t.replace(/\s*mso-[^:]+:[^;"]+;?/gi, ""), t = t.replace(/\s*class="?Mso[^"]*"?/gi, ""), t = t.replace(/<p[^>]*>\s*<\/p>/gi, ""), t = t.replace(/<div[^>]*>\s*<\/div>/gi, ""), t = t.replace(/<font[^>]*>/gi, "<span>"), t = t.replace(/<\/font>/gi, "</span>"), t = t.replace(/<!--[\s\S]*?-->/g, ""), t = t.replace(/\s+/g, " "), t = t.replace(/>\s+</g, "><"), t.trim();
  }
  /**
   * Normalize whitespace and line breaks
   */
  normalizeWhitespace(e) {
    let t = e;
    return t = t.replace(/(<br\s*\/?>){2,}/gi, "</p><p>"), t && !t.match(/^<(p|h[1-6]|ul|ol|div)/i) && (t = `<p>${t}</p>`), t = t.replace(/<p>\s*<\/p>/gi, ""), t;
  }
  /**
   * Extract plain text from HTML content
   */
  extractPlainText(e) {
    if (!e || typeof e != "string")
      return "";
    const t = document.createElement("div");
    return t.innerHTML = e, t.textContent || t.innerText || "";
  }
  /**
   * Check if content is safe (contains no dangerous elements)
   */
  isContentSafe(e) {
    return !e || typeof e != "string" ? !0 : ![
      /<script/i,
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<form/i,
      /<input/i,
      /<button/i
    ].some((n) => n.test(e));
  }
}
const Gt = new Kt(), Yt = ({
  content: a,
  placeholder: e,
  onContentChange: t,
  onFocus: n,
  onBlur: i,
  editorRef: s,
  onSelectionChange: l,
  onLinkClick: d,
  height: c = "300px"
}) => {
  const [m, f] = R(!1), [b, u] = R(null), y = v(() => {
    if (s.current && $t(s.current)) {
      const A = Et();
      u(A), l && l(A);
    }
  }, [s, l]), C = v(() => {
    s.current && b && zt(s.current, b);
  }, [s, b]), j = (A) => {
    const I = A.currentTarget.innerHTML, W = N(I);
    t(W);
  }, N = (A) => {
    if (!A || A === "<br>" || A === "<div><br></div>")
      return "";
    let B = A.replace(/^<div><br><\/div>$/, "");
    return B = B.replace(/^<div>(.*)<\/div>$/, "$1"), B;
  }, q = (A) => {
    f(!0), n();
  }, D = (A) => {
    f(!1), i();
  }, _ = (A) => {
    A.preventDefault();
    const B = A.clipboardData;
    if (!B)
      return;
    let I = B.getData("text/html");
    if (!I) {
      const M = B.getData("text/plain");
      M && (I = `<p>${M.replace(/\n/g, "<br>")}</p>`);
    }
    if (!I)
      return;
    const W = Gt.sanitizePastedContent(I);
    V(W);
  }, V = (A) => {
    const B = window.getSelection();
    if (!B || !B.rangeCount)
      return;
    const I = B.getRangeAt(0);
    I.deleteContents();
    const W = document.createElement("div");
    W.innerHTML = A;
    const M = document.createDocumentFragment();
    for (; W.firstChild; )
      M.appendChild(W.firstChild);
    if (I.insertNode(M), I.collapse(!1), B.removeAllRanges(), B.addRange(I), s.current) {
      const oe = s.current.innerHTML;
      t(N(oe));
    }
  }, h = (A) => {
    const I = A.target.closest("a[href]");
    if (I && I.href) {
      A.preventDefault(), A.stopPropagation(), d && d(A.nativeEvent, I);
      return;
    }
  }, E = (A) => {
    A.key === "Enter" && !A.shiftKey && H(A);
  }, H = (A) => {
    var ue, ge;
    const B = window.getSelection();
    if (!B || !B.rangeCount)
      return !1;
    const I = B.getRangeAt(0), W = I.startContainer.nodeType === Node.TEXT_NODE ? I.startContainer.parentElement : I.startContainer, M = W == null ? void 0 : W.closest("li");
    if (!M)
      return !1;
    const oe = M.closest("ul, ol");
    return oe && (((ue = M.textContent) == null ? void 0 : ue.trim()) === "" || I.startOffset === 0 && ((ge = M.textContent) == null ? void 0 : ge.trim()) === "") ? (A.preventDefault(), $(M, oe), !0) : !1;
  }, $ = (A, B) => {
    var M, oe;
    A.remove();
    const I = document.createElement("p");
    I.innerHTML = "<br>", B.nextSibling ? (M = B.parentNode) == null || M.insertBefore(I, B.nextSibling) : (oe = B.parentNode) == null || oe.appendChild(I);
    const W = window.getSelection();
    if (W) {
      const ie = document.createRange();
      ie.setStart(I, 0), ie.collapse(!0), W.removeAllRanges(), W.addRange(ie);
    }
    if (s.current) {
      const ie = s.current.innerHTML;
      t(N(ie));
    }
  }, J = () => m ? !1 : !a || a === "" || a === "<br>" || a === "<div><br></div>" || a.replace(/<[^>]*>/g, "").trim() === "";
  return fe(() => {
    s.current && s.current.innerHTML !== a && (s.current.innerHTML = a || "");
  }, [a, s]), fe(() => (document.addEventListener("selectionchange", y), () => {
    document.removeEventListener("selectionchange", y);
  }), [y]), fe(() => {
    s.current && (s.current.restoreFocus = C);
  }, [s, C]), /* @__PURE__ */ r.jsxs("div", { className: "editable-area-container", children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        ref: s,
        className: "editable-area",
        contentEditable: !0,
        onInput: j,
        onFocus: q,
        onBlur: D,
        onKeyDown: E,
        onPaste: _,
        onClick: h,
        suppressContentEditableWarning: !0,
        role: "textbox",
        "aria-label": "Rich text editor content area",
        "aria-multiline": "true",
        "aria-describedby": "keyboard-shortcuts-help",
        "data-placeholder": e,
        style: {
          height: typeof c == "number" ? `${c}px` : c,
          minHeight: typeof c == "number" ? `${c}px` : c
        }
      }
    ),
    J() && /* @__PURE__ */ r.jsx("div", { className: "placeholder", "aria-hidden": "true", children: e })
  ] });
};
function vt(a, e, t) {
  return It(
    At(
      {
        unit: "%",
        width: 90
      },
      t,
      a,
      e
    ),
    a,
    e
  );
}
const qt = ({
  isOpen: a,
  onClose: e,
  onImageInsert: t
}) => {
  const [n, i] = R("upload"), [, s] = R(null), [l, d] = R(""), [c, m] = R(), [f, b] = R(), [u, y] = R(""), [C, j] = R(void 0), [N, q] = R(!1), [D, _] = R(!1), [V, h] = R(null), E = Re(null), H = Re(null), $ = Re(null), J = 10 * 1024 * 1024, A = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"], B = v(() => {
    i("upload"), s(null), d(""), m(void 0), b(void 0), y(""), j(void 0), q(!1), _(!1), h(null), l && URL.revokeObjectURL(l), u && URL.revokeObjectURL(u);
  }, [l, u]), I = v(() => {
    B(), e();
  }, [B, e]), W = v((S) => S.size > J ? "File size exceeds 10MB limit" : A.includes(S.type) ? null : "File type not supported. Please select a JPEG, PNG, GIF, or WebP image.", []), M = v((S) => {
    const U = W(S);
    if (U) {
      h(U);
      return;
    }
    h(null), s(S);
    const Z = URL.createObjectURL(S);
    d(Z), i("crop");
  }, [W]), oe = v((S) => {
    var Z;
    const U = (Z = S.target.files) == null ? void 0 : Z[0];
    U && M(U);
  }, [M]), ie = v((S) => {
    S.preventDefault(), _(!0);
  }, []), ue = v((S) => {
    S.preventDefault(), _(!1);
  }, []), ge = v((S) => {
    S.preventDefault(), _(!1);
    const U = Array.from(S.dataTransfer.files);
    U.length > 0 && M(U[0]);
  }, [M]), Ae = v(() => {
    var S;
    (S = E.current) == null || S.click();
  }, []), be = v((S) => {
    const { width: U, height: Z } = S.currentTarget;
    m(vt(U, Z, C || U / Z));
  }, [C]), ye = v((S) => {
    if (j(S), H.current) {
      const { width: U, height: Z } = H.current;
      m(vt(U, Z, S || U / Z));
    }
  }, []), ve = v(async () => {
    if (!f || !H.current || !$.current)
      return null;
    const S = H.current, U = $.current, Z = U.getContext("2d");
    if (!Z)
      return null;
    const ae = S.naturalWidth / S.width, te = S.naturalHeight / S.height;
    return U.width = f.width, U.height = f.height, Z.drawImage(
      S,
      f.x * ae,
      f.y * te,
      f.width * ae,
      f.height * te,
      0,
      0,
      f.width,
      f.height
    ), new Promise((Oe) => {
      U.toBlob((T) => {
        if (T) {
          const xe = URL.createObjectURL(T);
          Oe(xe);
        }
      }, "image/jpeg", 0.9);
    });
  }, [f]), _e = v(async () => {
    q(!0);
    try {
      const S = await ve();
      S && (y(S), i("save"));
    } catch (S) {
      console.error("Error cropping image:", S), h("Failed to process image. Please try again.");
    } finally {
      q(!1);
    }
  }, [ve]), Fe = v(() => {
    u && (t(u), I());
  }, [u, t, I]), Ee = v(() => {
    u && URL.revokeObjectURL(u), y(""), i("crop");
  }, [u]), we = v((S) => {
    if (S === 0) return "0 Bytes";
    const U = 1024, Z = ["Bytes", "KB", "MB", "GB"], ae = Math.floor(Math.log(S) / Math.log(U));
    return parseFloat((S / Math.pow(U, ae)).toFixed(2)) + " " + Z[ae];
  }, []);
  return a ? /* @__PURE__ */ r.jsx("div", { className: "image-crop-modal", children: /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__content", style: {
    maxWidth: n === "crop" ? "900px" : "500px"
  }, children: [
    /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__header", children: [
      /* @__PURE__ */ r.jsx("h2", { className: "image-crop-modal__title", children: n === "upload" ? "Upload Image" : n === "crop" ? "Crop Image" : "Save Image" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: I,
          className: "image-crop-modal__close",
          "aria-label": "Close",
          children: /* @__PURE__ */ r.jsx("svg", { width: "24", height: "24", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    n === "upload" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "1.5rem" }, children: [
        /* @__PURE__ */ r.jsx("p", { style: { fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }, children: "Select an image to upload and crop" }),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            style: {
              border: `2px dashed ${D ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: "0.5rem",
              padding: "2rem",
              textAlign: "center",
              backgroundColor: D ? "#eff6ff" : "transparent",
              transition: "all 0.2s",
              cursor: "pointer"
            },
            onDragOver: ie,
            onDragLeave: ue,
            onDrop: ge,
            onClick: Ae,
            children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
              /* @__PURE__ */ r.jsx(
                "svg",
                {
                  width: "48",
                  height: "48",
                  style: { marginBottom: "1rem", color: D ? "#3b82f6" : "#9ca3af" },
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ r.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    }
                  )
                }
              ),
              /* @__PURE__ */ r.jsx("p", { style: { fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }, children: "Drag and drop your image here, or click to browse" }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  style: {
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#3b82f6",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  },
                  children: "Browse Files"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ r.jsxs("div", { style: { marginTop: "1rem", fontSize: "0.75rem", color: "#6b7280" }, children: [
          /* @__PURE__ */ r.jsx("p", { children: "Accepted formats: JPEG, PNG, GIF, WebP" }),
          /* @__PURE__ */ r.jsxs("p", { children: [
            "Maximum size: ",
            we(J)
          ] })
        ] }),
        V && /* @__PURE__ */ r.jsxs("div", { style: {
          marginTop: "1rem",
          padding: "0.75rem",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "0.375rem",
          display: "flex",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ r.jsx("svg", { width: "20", height: "20", style: { color: "#ef4444", marginRight: "0.5rem" }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ r.jsx("p", { style: { fontSize: "0.875rem", color: "#dc2626" }, children: V })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__footer", children: [
        /* @__PURE__ */ r.jsx("div", {}),
        /* @__PURE__ */ r.jsx("div", { className: "image-crop-modal__actions", children: /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: I,
            className: "image-crop-modal__button image-crop-modal__button--secondary",
            children: "Cancel"
          }
        ) })
      ] })
    ] }),
    n === "crop" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("div", { className: "image-crop-modal__controls", children: /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__aspect-controls", children: [
        /* @__PURE__ */ r.jsx("span", { className: "image-crop-modal__aspect-label", children: "Aspect Ratio:" }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => ye(void 0),
            className: `image-crop-modal__aspect-button ${C === void 0 ? "image-crop-modal__aspect-button--active" : ""}`,
            children: "Free"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => ye(1),
            className: `image-crop-modal__aspect-button ${C === 1 ? "image-crop-modal__aspect-button--active" : ""}`,
            children: "1:1"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => ye(16 / 9),
            className: `image-crop-modal__aspect-button ${C === 16 / 9 ? "image-crop-modal__aspect-button--active" : ""}`,
            children: "16:9"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => ye(4 / 3),
            className: `image-crop-modal__aspect-button ${C === 4 / 3 ? "image-crop-modal__aspect-button--active" : ""}`,
            children: "4:3"
          }
        )
      ] }) }),
      /* @__PURE__ */ r.jsx("div", { className: "image-crop-modal__crop-area", children: /* @__PURE__ */ r.jsx(
        Nt,
        {
          crop: c,
          onChange: (S, U) => m(U),
          onComplete: (S) => b(S),
          aspect: C,
          minWidth: 50,
          minHeight: 50,
          children: /* @__PURE__ */ r.jsx(
            "img",
            {
              ref: H,
              alt: "Crop preview",
              src: l,
              style: { maxHeight: "500px", maxWidth: "100%" },
              onLoad: be
            }
          )
        }
      ) }),
      /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__footer", children: [
        /* @__PURE__ */ r.jsx("div", { className: "image-crop-modal__help-text", children: "Drag to select the area you want to crop" }),
        /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__actions", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: I,
              className: "image-crop-modal__button image-crop-modal__button--secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: _e,
              disabled: !f || N,
              className: "image-crop-modal__button image-crop-modal__button--primary",
              children: N ? "Processing..." : "Crop"
            }
          )
        ] })
      ] })
    ] }),
    n === "save" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "1.5rem", textAlign: "center" }, children: [
        /* @__PURE__ */ r.jsx("p", { style: { fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }, children: 'Your image has been cropped successfully. Click "Save Image to Editor" to add it to your content.' }),
        /* @__PURE__ */ r.jsx("div", { style: {
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
          padding: "1rem",
          backgroundColor: "#f9fafb",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb"
        }, children: /* @__PURE__ */ r.jsx(
          "img",
          {
            src: u,
            alt: "Cropped preview",
            style: {
              maxWidth: "300px",
              maxHeight: "300px",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { style: {
          padding: "1rem",
          backgroundColor: "#f0f9ff",
          borderRadius: "0.375rem",
          border: "1px solid #bfdbfe",
          marginBottom: "1rem"
        }, children: /* @__PURE__ */ r.jsx("p", { style: { fontSize: "0.875rem", color: "#0c5460", margin: 0 }, children: "✓ Image cropped and ready to be added to your editor" }) })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__footer", children: [
        /* @__PURE__ */ r.jsx("div", {}),
        /* @__PURE__ */ r.jsxs("div", { className: "image-crop-modal__actions", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: Ee,
              className: "image-crop-modal__button image-crop-modal__button--secondary",
              children: "Back to Crop"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: I,
              className: "image-crop-modal__button image-crop-modal__button--secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: Fe,
              className: "image-crop-modal__button image-crop-modal__button--primary",
              children: "Save Image to Editor"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(
      "input",
      {
        ref: E,
        type: "file",
        accept: "image/jpeg,image/jpg,image/png,image/gif,image/webp",
        onChange: oe,
        style: { display: "none" }
      }
    ),
    /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: $,
        style: { display: "none" }
      }
    )
  ] }) }) : null;
}, Vt = ({
  isOpen: a,
  onClose: e,
  onFileSelect: t,
  accept: n = "*/*",
  maxSize: i = 10 * 1024 * 1024,
  // 10MB default
  title: s = "Upload File",
  description: l = "Select a file to upload"
}) => {
  const [d, c] = R(!1), [m, f] = R(null), b = Re(null), u = v((h) => h.size > i ? `File size exceeds ${Math.round(i / 1048576)}MB limit` : n !== "*/*" && !n.split(",").map(($) => $.trim()).some(($) => {
    if ($.startsWith("."))
      return h.name.toLowerCase().endsWith($.toLowerCase());
    if ($.includes("/*")) {
      const J = $.split("/")[0];
      return h.type.startsWith(J + "/");
    } else
      return h.type === $;
  }) ? `File type not supported. Accepted types: ${n}` : null, [n, i]), y = v((h) => {
    const E = u(h);
    if (E) {
      f(E);
      return;
    }
    f(null), t(h), e();
  }, [u, t, e]), C = v((h) => {
    var H;
    const E = (H = h.target.files) == null ? void 0 : H[0];
    E && y(E);
  }, [y]), j = v((h) => {
    h.preventDefault(), c(!0);
  }, []), N = v((h) => {
    h.preventDefault(), c(!1);
  }, []), q = v((h) => {
    h.preventDefault(), c(!1);
    const E = Array.from(h.dataTransfer.files);
    E.length > 0 && y(E[0]);
  }, [y]), D = v(() => {
    var h;
    (h = b.current) == null || h.click();
  }, []), _ = v((h) => {
    if (h === 0) return "0 Bytes";
    const E = 1024, H = ["Bytes", "KB", "MB", "GB"], $ = Math.floor(Math.log(h) / Math.log(E));
    return parseFloat((h / Math.pow(E, $)).toFixed(2)) + " " + H[$];
  }, []), V = v(() => n === "*/*" ? "All files" : n.includes("image/*") ? "Images" : n.includes("video/*") ? "Videos" : n.includes("audio/*") ? "Audio files" : n.replace(/,/g, ", "), [n]);
  return a ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ r.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: s }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: e,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
          "aria-label": "Close",
          children: /* @__PURE__ */ r.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-gray-600 mb-4", children: l }),
      /* @__PURE__ */ r.jsx(
        "div",
        {
          className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${d ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`,
          onDragOver: j,
          onDragLeave: N,
          onDrop: q,
          children: /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ r.jsx(
              "svg",
              {
                className: `w-12 h-12 mb-4 ${d ? "text-blue-500" : "text-gray-400"}`,
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ r.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  }
                )
              }
            ),
            /* @__PURE__ */ r.jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Drag and drop your file here, or" }),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: D,
                className: "px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors",
                children: "Browse Files"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "mt-4 text-xs text-gray-500 space-y-1", children: [
        /* @__PURE__ */ r.jsxs("p", { children: [
          "Accepted types: ",
          V()
        ] }),
        /* @__PURE__ */ r.jsxs("p", { children: [
          "Maximum size: ",
          _(i)
        ] })
      ] }),
      m && /* @__PURE__ */ r.jsx("div", { className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ r.jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ r.jsx("svg", { className: "w-5 h-5 text-red-400 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm text-red-700", children: m })
      ] }) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "flex justify-end p-4 border-t border-gray-200 bg-gray-50", children: /* @__PURE__ */ r.jsx(
      "button",
      {
        onClick: e,
        className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
        children: "Cancel"
      }
    ) }),
    /* @__PURE__ */ r.jsx(
      "input",
      {
        ref: b,
        type: "file",
        accept: n,
        onChange: C,
        className: "hidden"
      }
    )
  ] }) }) : null;
}, Jt = ({
  imageElement: a,
  onUpdate: e,
  onRemove: t
}) => {
  const [n, i] = R(!1), [s, l] = R({ x: 0, y: 0 }), [d, c] = R({ width: 0, height: 0 }), [m, f] = R("none"), [b, u] = R(!1), y = Re(null);
  fe(() => {
    var _;
    if (a) {
      const V = a.getBoundingClientRect(), h = (_ = a.closest(".editable-area")) == null ? void 0 : _.getBoundingClientRect();
      h && l({
        x: V.left - h.left,
        y: V.top - h.top
      }), c({
        width: a.offsetWidth,
        height: a.offsetHeight
      });
      const E = window.getComputedStyle(a), H = E.display, $ = E.marginLeft, J = E.marginRight;
      f(H === "block" ? $ === "auto" && J === "auto" ? "center" : $ === "auto" ? "right" : "left" : "none");
    }
  }, [a]);
  const C = v((_) => {
    if (a) {
      switch (f(_), _) {
        case "left":
          a.style.display = "block", a.style.marginLeft = "0", a.style.marginRight = "auto", a.style.float = "none";
          break;
        case "center":
          a.style.display = "block", a.style.marginLeft = "auto", a.style.marginRight = "auto", a.style.float = "none";
          break;
        case "right":
          a.style.display = "block", a.style.marginLeft = "auto", a.style.marginRight = "0", a.style.float = "none";
          break;
        case "none":
          a.style.display = "inline-block", a.style.marginLeft = "", a.style.marginRight = "", a.style.float = "";
          break;
      }
      e();
    }
  }, [a, e]), j = v((_) => {
    if (!a) return;
    const V = a.naturalHeight / a.naturalWidth, h = _ * V;
    a.style.width = `${_}px`, a.style.height = `${h}px`, c({ width: _, height: h }), e();
  }, [a, e]), N = v((_) => {
    if (a) {
      switch (_) {
        case "left":
          a.style.float = "left", a.style.marginRight = "15px", a.style.marginBottom = "10px", a.style.display = "block";
          break;
        case "right":
          a.style.float = "right", a.style.marginLeft = "15px", a.style.marginBottom = "10px", a.style.display = "block";
          break;
        case "none":
          a.style.float = "none", a.style.marginLeft = "", a.style.marginRight = "", a.style.marginBottom = "";
          break;
      }
      e();
    }
  }, [a, e]), q = v(() => {
    if (!a) return;
    const _ = a.alt || "", V = window.prompt("Enter alt text for the image (for accessibility):", _);
    V !== null && (a.alt = V, e());
  }, [a, e]), D = v(() => {
    confirm("Are you sure you want to remove this image?") && (t(), i(!1));
  }, [t]);
  return fe(() => {
    const _ = (h) => {
      h.stopPropagation(), i(!0);
    }, V = (h) => {
      y.current && !y.current.contains(h.target) && i(!1);
    };
    return a && (a.addEventListener("click", _), document.addEventListener("click", V)), () => {
      a && a.removeEventListener("click", _), document.removeEventListener("click", V);
    };
  }, [a]), !n || !a ? null : /* @__PURE__ */ r.jsxs(
    "div",
    {
      ref: y,
      className: "absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-64",
      style: {
        left: s.x + d.width + 10,
        top: s.y,
        maxWidth: "300px"
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mb-3 pb-2 border-b border-gray-200", children: [
          /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-semibold text-gray-900", children: "Image Settings" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: () => i(!1),
              className: "text-gray-400 hover:text-gray-600 transition-colors",
              "aria-label": "Close",
              children: /* @__PURE__ */ r.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: [
            "Width: ",
            Math.round(d.width),
            "px"
          ] }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "range",
              min: "50",
              max: "800",
              value: d.width,
              onChange: (_) => j(parseInt(_.target.value)),
              className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
            /* @__PURE__ */ r.jsx("span", { children: "50px" }),
            /* @__PURE__ */ r.jsx("span", { children: "800px" })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsx("label", { className: "block text-xs font-medium text-gray-700 mb-2", children: "Alignment" }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => C("left"),
                className: `px-2 py-1 text-xs rounded ${m === "left" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Left"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => C("center"),
                className: `px-2 py-1 text-xs rounded ${m === "center" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Center"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => C("right"),
                className: `px-2 py-1 text-xs rounded ${m === "right" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Right"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => C("none"),
                className: `px-2 py-1 text-xs rounded ${m === "none" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Inline"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsx("label", { className: "block text-xs font-medium text-gray-700 mb-2", children: "Text Wrapping" }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => N("left"),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Wrap Left"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => N("right"),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Wrap Right"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => N("none"),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "No Wrap"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsx("label", { className: "block text-xs font-medium text-gray-700 mb-2", children: "Quick Sizes" }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => j(150),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Small"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => j(300),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Medium"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => j(500),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Large"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => j(a.naturalWidth),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Original"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2 pt-2 border-t border-gray-200", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: q,
              className: "flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded transition-colors",
              children: "Alt Text"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: D,
              className: "flex-1 px-2 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded transition-colors",
              children: "Remove"
            }
          )
        ] })
      ]
    }
  );
}, Xt = ({
  isOpen: a,
  onClose: e,
  onInsert: t
}) => {
  const [n, i] = R(3), [s, l] = R(3), [d, c] = R(!0), [m] = R(3), [f] = R(3), b = () => {
    t(n, s, d), e();
  };
  return a ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ r.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Insert Table" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: e,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
          "aria-label": "Close",
          children: /* @__PURE__ */ r.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ r.jsx("div", { className: "mb-6", children: /* @__PURE__ */ r.jsxs("div", { className: "mt-2 text-sm text-gray-600", children: [
        m,
        " × ",
        f,
        " table"
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Rows" }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              min: "1",
              max: "20",
              value: n,
              onChange: (u) => i(Math.max(1, parseInt(u.target.value) || 1)),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Columns" }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              min: "1",
              max: "20",
              value: s,
              onChange: (u) => l(Math.max(1, parseInt(u.target.value) || 1)),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "mb-6", children: /* @__PURE__ */ r.jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "checkbox",
            checked: d,
            onChange: (u) => c(u.target.checked),
            className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Include header row" })
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ r.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Preview:" }),
        /* @__PURE__ */ r.jsx("div", { className: "border border-gray-300 rounded overflow-hidden", children: /* @__PURE__ */ r.jsx("table", { className: "w-full text-xs", children: /* @__PURE__ */ r.jsxs("tbody", { children: [
          Array.from({ length: Math.min(n, 4) }, (u, y) => /* @__PURE__ */ r.jsxs("tr", { children: [
            Array.from({ length: Math.min(s, 6) }, (C, j) => /* @__PURE__ */ r.jsx(
              "td",
              {
                className: `border border-gray-200 p-1 text-center ${d && y === 0 ? "bg-gray-100 font-medium" : "bg-white"}`,
                children: d && y === 0 ? `Header ${j + 1}` : `Cell ${y + 1},${j + 1}`
              },
              j
            )),
            s > 6 && /* @__PURE__ */ r.jsx("td", { className: "border border-gray-200 p-1 text-center bg-gray-50", children: "..." })
          ] }, y)),
          n > 4 && /* @__PURE__ */ r.jsx("tr", { children: Array.from({ length: Math.min(s + (s > 6 ? 1 : 0), 7) }, (u, y) => /* @__PURE__ */ r.jsx("td", { className: "border border-gray-200 p-1 text-center bg-gray-50", children: "..." }, y)) })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50", children: [
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: e,
          className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: b,
          className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors",
          children: "Insert Table"
        }
      )
    ] })
  ] }) }) : null;
}, pt = {
  General: [
    "©",
    "®",
    "™",
    "§",
    "¶",
    "†",
    "‡",
    "•",
    "‰",
    "′",
    "″",
    "‴",
    "‹",
    "›",
    "«",
    "»",
    "–",
    "—",
    "…",
    "¡",
    "¿"
  ],
  Currency: [
    "$",
    "¢",
    "£",
    "¤",
    "¥",
    "€",
    "₹",
    "₽",
    "₩",
    "₪",
    "₫",
    "₦",
    "₡",
    "₨",
    "₱",
    "₵"
  ],
  Math: [
    "±",
    "×",
    "÷",
    "=",
    "≠",
    "≈",
    "≡",
    "≤",
    "≥",
    "<",
    ">",
    "∞",
    "∑",
    "∏",
    "∂",
    "∆",
    "∇",
    "∈",
    "∉",
    "∋",
    "∌",
    "∩",
    "∪",
    "⊂",
    "⊃",
    "⊆",
    "⊇",
    "⊕",
    "⊗",
    "⊥",
    "∥",
    "∠"
  ],
  Greek: [
    "Α",
    "Β",
    "Γ",
    "Δ",
    "Ε",
    "Ζ",
    "Η",
    "Θ",
    "Ι",
    "Κ",
    "Λ",
    "Μ",
    "Ν",
    "Ξ",
    "Ο",
    "Π",
    "Ρ",
    "Σ",
    "Τ",
    "Υ",
    "Φ",
    "Χ",
    "Ψ",
    "Ω",
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "ζ",
    "η",
    "θ",
    "ι",
    "κ",
    "λ",
    "μ",
    "ν",
    "ξ",
    "ο",
    "π",
    "ρ",
    "σ",
    "τ",
    "υ",
    "φ",
    "χ",
    "ψ",
    "ω"
  ],
  Arrows: [
    "←",
    "↑",
    "→",
    "↓",
    "↔",
    "↕",
    "↖",
    "↗",
    "↘",
    "↙",
    "↚",
    "↛",
    "↜",
    "↝",
    "↞",
    "↟",
    "↠",
    "↡",
    "↢",
    "↣",
    "↤",
    "↥",
    "↦",
    "↧",
    "↨",
    "↩",
    "↪",
    "↫",
    "↬",
    "↭",
    "↮",
    "↯"
  ],
  Symbols: [
    "☀",
    "☁",
    "☂",
    "☃",
    "☄",
    "★",
    "☆",
    "☇",
    "☈",
    "☉",
    "☊",
    "☋",
    "☌",
    "☍",
    "☎",
    "☏",
    "☐",
    "☑",
    "☒",
    "☓",
    "☔",
    "☕",
    "☖",
    "☗",
    "☘",
    "☙",
    "☚",
    "☛",
    "☜",
    "☝",
    "☞",
    "☟"
  ],
  Fractions: [
    "½",
    "⅓",
    "⅔",
    "¼",
    "¾",
    "⅕",
    "⅖",
    "⅗",
    "⅘",
    "⅙",
    "⅚",
    "⅛",
    "⅜",
    "⅝",
    "⅞",
    "⅟"
  ]
}, Zt = ({
  isOpen: a,
  onClose: e,
  onInsert: t
}) => {
  const [n, i] = R("General"), [s, l] = R(""), d = (m) => {
    t(m), e();
  }, c = s ? Object.values(pt).flat().filter(
    (m) => m.includes(s) || m.toLowerCase().includes(s.toLowerCase())
  ) : pt[n];
  return a ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ r.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Special Characters" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: e,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
          "aria-label": "Close",
          children: /* @__PURE__ */ r.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ r.jsx(
      "input",
      {
        type: "text",
        placeholder: "Search characters...",
        value: s,
        onChange: (m) => l(m.target.value),
        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    ) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex h-96", children: [
      !s && /* @__PURE__ */ r.jsx("div", { className: "w-1/3 border-r border-gray-200 overflow-y-auto", children: /* @__PURE__ */ r.jsx("div", { className: "p-2", children: Object.keys(pt).map((m) => /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => i(m),
          className: `w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${n === m ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`,
          children: m
        },
        m
      )) }) }),
      /* @__PURE__ */ r.jsx("div", { className: `${s ? "w-full" : "w-2/3"} overflow-y-auto`, children: /* @__PURE__ */ r.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-8 gap-2", children: c.map((m, f) => /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => d(m),
            className: "w-10 h-10 flex items-center justify-center text-lg border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors",
            title: `Insert ${m}`,
            children: m
          },
          `${m}-${f}`
        )) }),
        c.length === 0 && /* @__PURE__ */ r.jsxs("div", { className: "text-center text-gray-500 py-8", children: [
          'No characters found matching "',
          s,
          '"'
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "flex justify-end p-4 border-t border-gray-200 bg-gray-50", children: /* @__PURE__ */ r.jsx(
      "button",
      {
        onClick: e,
        className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
        children: "Close"
      }
    ) })
  ] }) }) : null;
}, Qt = ({
  isOpen: a,
  onClose: e,
  onSubmit: t,
  title: n,
  placeholder: i = "Enter URL...",
  initialValue: s = "",
  description: l
}) => {
  const [d, c] = R(s), [m, f] = R("");
  fe(() => {
    a && (c(s), f(""));
  }, [a, s]);
  const b = (y) => {
    if (y.preventDefault(), !d.trim()) {
      f("URL is required");
      return;
    }
    try {
      if (d.trim().startsWith("http://") || d.trim().startsWith("https://") || d.trim().startsWith("/"))
        t(d.trim()), e();
      else {
        const C = `https://${d.trim()}`;
        new URL(C), t(C), e();
      }
    } catch {
      f("Please enter a valid URL");
    }
  }, u = (y) => {
    y.key === "Escape" && e();
  };
  return a ? /* @__PURE__ */ r.jsx(
    "div",
    {
      className: "modal-backdrop",
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e3,
        animation: "fadeIn 0.2s ease-out"
      },
      onClick: (y) => y.target === y.currentTarget && e(),
      children: /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "modal-content",
          style: {
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            animation: "slideIn 0.3s ease-out"
          },
          onKeyDown: u,
          children: [
            /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "20px" }, children: [
              /* @__PURE__ */ r.jsx("h3", { style: {
                margin: "0 0 8px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937"
              }, children: n }),
              l && /* @__PURE__ */ r.jsx("p", { style: {
                margin: 0,
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: "1.5"
              }, children: l })
            ] }),
            /* @__PURE__ */ r.jsxs("form", { onSubmit: b, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "16px" }, children: [
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "text",
                    value: d,
                    onChange: (y) => {
                      c(y.target.value), f("");
                    },
                    placeholder: i,
                    autoFocus: !0,
                    style: {
                      width: "100%",
                      padding: "12px",
                      border: `2px solid ${m ? "#ef4444" : "#e5e7eb"}`,
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    },
                    onFocus: (y) => {
                      y.target.style.borderColor = "#3b82f6";
                    },
                    onBlur: (y) => {
                      m || (y.target.style.borderColor = "#e5e7eb");
                    }
                  }
                ),
                m && /* @__PURE__ */ r.jsx("p", { style: {
                  margin: "8px 0 0 0",
                  fontSize: "14px",
                  color: "#ef4444"
                }, children: m })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { style: {
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end"
              }, children: [
                /* @__PURE__ */ r.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: e,
                    style: {
                      padding: "10px 20px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    },
                    onMouseEnter: (y) => {
                      y.currentTarget.style.backgroundColor = "#f9fafb", y.currentTarget.style.borderColor = "#9ca3af";
                    },
                    onMouseLeave: (y) => {
                      y.currentTarget.style.backgroundColor = "white", y.currentTarget.style.borderColor = "#d1d5db";
                    },
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ r.jsxs(
                  "button",
                  {
                    type: "submit",
                    style: {
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    },
                    onMouseEnter: (y) => {
                      y.currentTarget.style.backgroundColor = "#2563eb";
                    },
                    onMouseLeave: (y) => {
                      y.currentTarget.style.backgroundColor = "#3b82f6";
                    },
                    children: [
                      s ? "Update" : "Add",
                      " Link"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) : null;
}, er = ({
  isOpen: a,
  onClose: e,
  onFindReplace: t
}) => {
  const [n, i] = R(""), [s, l] = R(""), [d, c] = R("");
  fe(() => {
    a && (i(""), l(""), c(""));
  }, [a]);
  const m = (b) => {
    if (b.preventDefault(), !n.trim()) {
      c("Find text is required");
      return;
    }
    t(n.trim(), s.trim()), e();
  }, f = (b) => {
    b.key === "Escape" && e();
  };
  return a ? /* @__PURE__ */ r.jsx(
    "div",
    {
      className: "modal-backdrop",
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e3,
        animation: "fadeIn 0.2s ease-out"
      },
      onClick: (b) => b.target === b.currentTarget && e(),
      children: /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "modal-content",
          style: {
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            animation: "slideIn 0.3s ease-out"
          },
          onKeyDown: f,
          children: [
            /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "20px" }, children: [
              /* @__PURE__ */ r.jsx("h3", { style: {
                margin: "0 0 8px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937"
              }, children: "🔍 Find & Replace" }),
              /* @__PURE__ */ r.jsx("p", { style: {
                margin: 0,
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: "1.5"
              }, children: "Search for text in your document and replace it with new text." })
            ] }),
            /* @__PURE__ */ r.jsxs("form", { onSubmit: m, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "16px" }, children: [
                /* @__PURE__ */ r.jsx("label", { style: {
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151"
                }, children: "Find:" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "text",
                    value: n,
                    onChange: (b) => {
                      i(b.target.value), c("");
                    },
                    placeholder: "Enter text to find...",
                    autoFocus: !0,
                    style: {
                      width: "100%",
                      padding: "12px",
                      border: `2px solid ${d ? "#ef4444" : "#e5e7eb"}`,
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    },
                    onFocus: (b) => {
                      b.target.style.borderColor = "#3b82f6";
                    },
                    onBlur: (b) => {
                      d || (b.target.style.borderColor = "#e5e7eb");
                    }
                  }
                ),
                d && /* @__PURE__ */ r.jsx("p", { style: {
                  margin: "8px 0 0 0",
                  fontSize: "14px",
                  color: "#ef4444"
                }, children: d })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "20px" }, children: [
                /* @__PURE__ */ r.jsx("label", { style: {
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151"
                }, children: "Replace with:" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "text",
                    value: s,
                    onChange: (b) => l(b.target.value),
                    placeholder: "Enter replacement text...",
                    style: {
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    },
                    onFocus: (b) => {
                      b.target.style.borderColor = "#3b82f6";
                    },
                    onBlur: (b) => {
                      b.target.style.borderColor = "#e5e7eb";
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ r.jsxs("div", { style: {
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end"
              }, children: [
                /* @__PURE__ */ r.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: e,
                    style: {
                      padding: "10px 20px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    },
                    onMouseEnter: (b) => {
                      b.currentTarget.style.backgroundColor = "#f9fafb", b.currentTarget.style.borderColor = "#9ca3af";
                    },
                    onMouseLeave: (b) => {
                      b.currentTarget.style.backgroundColor = "white", b.currentTarget.style.borderColor = "#d1d5db";
                    },
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ r.jsx(
                  "button",
                  {
                    type: "submit",
                    style: {
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    },
                    onMouseEnter: (b) => {
                      b.currentTarget.style.backgroundColor = "#2563eb";
                    },
                    onMouseLeave: (b) => {
                      b.currentTarget.style.backgroundColor = "#3b82f6";
                    },
                    children: "Replace All"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) : null;
}, tr = ({
  isOpen: a,
  onClose: e,
  title: t,
  message: n,
  type: i = "info",
  autoClose: s = !1,
  autoCloseDelay: l = 3e3
}) => {
  fe(() => {
    if (a && s) {
      const f = setTimeout(() => {
        e();
      }, l);
      return () => clearTimeout(f);
    }
  }, [a, s, l, e]);
  const d = (f) => {
    f.key === "Escape" && e();
  };
  if (!a) return null;
  const m = (() => {
    switch (i) {
      case "success":
        return {
          icon: "✅",
          iconColor: "#10b981",
          borderColor: "#10b981",
          backgroundColor: "#f0fdf4"
        };
      case "warning":
        return {
          icon: "⚠️",
          iconColor: "#f59e0b",
          borderColor: "#f59e0b",
          backgroundColor: "#fffbeb"
        };
      case "error":
        return {
          icon: "❌",
          iconColor: "#ef4444",
          borderColor: "#ef4444",
          backgroundColor: "#fef2f2"
        };
      default:
        return {
          icon: "ℹ️",
          iconColor: "#3b82f6",
          borderColor: "#3b82f6",
          backgroundColor: "#eff6ff"
        };
    }
  })();
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "modal-backdrop",
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e3,
        animation: "fadeIn 0.2s ease-out"
      },
      onClick: (f) => f.target === f.currentTarget && e(),
      children: [
        /* @__PURE__ */ r.jsxs(
          "div",
          {
            className: "modal-content",
            style: {
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              animation: "slideIn 0.3s ease-out",
              border: `2px solid ${m.borderColor}`
            },
            onKeyDown: d,
            children: [
              /* @__PURE__ */ r.jsxs("div", { style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "20px"
              }, children: [
                /* @__PURE__ */ r.jsx("div", { style: {
                  fontSize: "24px",
                  flexShrink: 0
                }, children: m.icon }),
                /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ r.jsx("h3", { style: {
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1f2937"
                  }, children: t }),
                  /* @__PURE__ */ r.jsx("p", { style: {
                    margin: 0,
                    fontSize: "14px",
                    color: "#6b7280",
                    lineHeight: "1.5"
                  }, children: n })
                ] })
              ] }),
              /* @__PURE__ */ r.jsx("div", { style: {
                display: "flex",
                justifyContent: "flex-end"
              }, children: /* @__PURE__ */ r.jsx(
                "button",
                {
                  onClick: e,
                  autoFocus: !0,
                  style: {
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: m.iconColor,
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  },
                  onMouseEnter: (f) => {
                    f.currentTarget.style.opacity = "0.9";
                  },
                  onMouseLeave: (f) => {
                    f.currentTarget.style.opacity = "1";
                  },
                  children: "OK"
                }
              ) }),
              s && /* @__PURE__ */ r.jsx("div", { style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "3px",
                backgroundColor: m.backgroundColor,
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                overflow: "hidden"
              }, children: /* @__PURE__ */ r.jsx("div", { style: {
                height: "100%",
                backgroundColor: m.iconColor,
                animation: `shrink ${l}ms linear`,
                transformOrigin: "left"
              } }) })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      ` })
      ]
    }
  );
}, rr = ({
  isOpen: a,
  linkUrl: e,
  linkText: t,
  position: n,
  onEdit: i,
  onRemove: s,
  onGoToLink: l,
  onClose: d
}) => a ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
  /* @__PURE__ */ r.jsx(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        background: "transparent"
      },
      onClick: d
    }
  ),
  /* @__PURE__ */ r.jsxs(
    "div",
    {
      style: {
        position: "fixed",
        left: `${n.x}px`,
        top: `${n.y}px`,
        zIndex: 1e3,
        background: "white",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        padding: "12px 16px",
        minWidth: "300px",
        maxWidth: "400px",
        fontSize: "14px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
      },
      onClick: (c) => c.stopPropagation(),
      children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px"
        }, children: [
          /* @__PURE__ */ r.jsx("span", { style: {
            color: "#374151",
            fontWeight: "500"
          }, children: "Go to link:" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: l,
              style: {
                color: "#2563eb",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                padding: "0",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              },
              title: e,
              children: e
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          gap: "12px",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: i,
              style: {
                color: "#2563eb",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "background-color 0.2s"
              },
              onMouseEnter: (c) => {
                c.currentTarget.style.backgroundColor = "#eff6ff";
              },
              onMouseLeave: (c) => {
                c.currentTarget.style.backgroundColor = "transparent";
              },
              children: "Change"
            }
          ),
          /* @__PURE__ */ r.jsx("span", { style: { color: "#d1d5db" }, children: "|" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: s,
              style: {
                color: "#dc2626",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "background-color 0.2s"
              },
              onMouseEnter: (c) => {
                c.currentTarget.style.backgroundColor = "#fef2f2";
              },
              onMouseLeave: (c) => {
                c.currentTarget.style.backgroundColor = "transparent";
              },
              children: "Remove"
            }
          )
        ] })
      ]
    }
  )
] }) : null, nr = {
  BOLD: {
    type: "execCommand",
    command: "bold",
    description: "Toggle bold formatting"
  },
  ITALIC: {
    type: "execCommand",
    command: "italic",
    description: "Toggle italic formatting"
  },
  UNDERLINE: {
    type: "execCommand",
    command: "underline",
    description: "Toggle underline formatting"
  },
  STRIKETHROUGH: {
    type: "execCommand",
    command: "strikeThrough",
    description: "Toggle strikethrough formatting"
  },
  SUBSCRIPT: {
    type: "execCommand",
    command: "subscript",
    description: "Toggle subscript formatting"
  },
  SUPERSCRIPT: {
    type: "execCommand",
    command: "superscript",
    description: "Toggle superscript formatting"
  },
  FORMAT_H1: {
    type: "execCommand",
    command: "formatBlock",
    value: "H1",
    description: "Format as heading 1"
  },
  FORMAT_H2: {
    type: "execCommand",
    command: "formatBlock",
    value: "H2",
    description: "Format as heading 2"
  },
  FORMAT_H3: {
    type: "execCommand",
    command: "formatBlock",
    value: "H3",
    description: "Format as heading 3"
  },
  FORMAT_H4: {
    type: "execCommand",
    command: "formatBlock",
    value: "H4",
    description: "Format as heading 4"
  },
  FORMAT_H5: {
    type: "execCommand",
    command: "formatBlock",
    value: "H5",
    description: "Format as heading 5"
  },
  FORMAT_H6: {
    type: "execCommand",
    command: "formatBlock",
    value: "H6",
    description: "Format as heading 6"
  },
  FORMAT_PARAGRAPH: {
    type: "execCommand",
    command: "formatBlock",
    value: "P",
    description: "Format as paragraph"
  },
  FORMAT_BLOCKQUOTE: {
    type: "execCommand",
    command: "formatBlock",
    value: "BLOCKQUOTE",
    description: "Format as blockquote"
  },
  FORMAT_PRE: {
    type: "execCommand",
    command: "formatBlock",
    value: "PRE",
    description: "Format as preformatted text"
  },
  INSERT_UNORDERED_LIST: {
    type: "execCommand",
    command: "insertUnorderedList",
    description: "Create bullet list"
  },
  INSERT_ORDERED_LIST: {
    type: "execCommand",
    command: "insertOrderedList",
    description: "Create numbered list"
  },
  JUSTIFY_LEFT: {
    type: "execCommand",
    command: "justifyLeft",
    description: "Align text left"
  },
  JUSTIFY_CENTER: {
    type: "execCommand",
    command: "justifyCenter",
    description: "Center align text"
  },
  JUSTIFY_RIGHT: {
    type: "execCommand",
    command: "justifyRight",
    description: "Align text right"
  },
  JUSTIFY_FULL: {
    type: "execCommand",
    command: "justifyFull",
    description: "Justify text"
  },
  INDENT: {
    type: "execCommand",
    command: "indent",
    description: "Increase indent"
  },
  OUTDENT: {
    type: "execCommand",
    command: "outdent",
    description: "Decrease indent"
  },
  FONT_COLOR: {
    type: "custom",
    command: "foreColor",
    description: "Change text color"
  },
  BACKGROUND_COLOR: {
    type: "custom",
    command: "backColor",
    description: "Change background color"
  },
  FONT_NAME: {
    type: "execCommand",
    command: "fontName",
    description: "Change font family"
  },
  FONT_SIZE: {
    type: "execCommand",
    command: "fontSize",
    description: "Change font size"
  },
  INSERT_HORIZONTAL_RULE: {
    type: "execCommand",
    command: "insertHorizontalRule",
    description: "Insert horizontal rule"
  },
  CREATE_LINK: {
    type: "custom",
    command: "createLink",
    description: "Create hyperlink"
  },
  EDIT_LINK: {
    type: "custom",
    command: "editLink",
    description: "Edit existing hyperlink"
  },
  UNLINK: {
    type: "execCommand",
    command: "unlink",
    description: "Remove hyperlink"
  },
  UNDO: {
    type: "execCommand",
    command: "undo",
    description: "Undo last action"
  },
  REDO: {
    type: "execCommand",
    command: "redo",
    description: "Redo last undone action"
  },
  REMOVE_FORMAT: {
    type: "execCommand",
    command: "removeFormat",
    description: "Clear all formatting"
  },
  INSERT_IMAGE: {
    type: "custom",
    command: "insertImage",
    description: "Insert image"
  },
  UPLOAD_FILE: {
    type: "custom",
    command: "uploadFile",
    description: "Upload and insert file"
  },
  INSERT_TABLE: {
    type: "custom",
    command: "insertTable",
    description: "Insert table"
  },
  INSERT_SPECIAL_CHAR: {
    type: "custom",
    command: "insertSpecialChar",
    description: "Insert special character"
  },
  FIND_REPLACE: {
    type: "custom",
    command: "findReplace",
    description: "Find and replace text"
  },
  SOURCE_CODE: {
    type: "custom",
    command: "sourceCode",
    description: "Edit HTML source code"
  },
  FULLSCREEN: {
    type: "custom",
    command: "fullscreen",
    description: "Toggle fullscreen mode"
  },
  PRINT: {
    type: "custom",
    command: "print",
    description: "Print document"
  },
  SPELL_CHECK: {
    type: "custom",
    command: "spellCheck",
    description: "Toggle spell check"
  }
}, Ie = class Ie {
  constructor() {
  }
  static getInstance() {
    return Ie.instance || (Ie.instance = new Ie()), Ie.instance;
  }
  /**
   * Execute a command using document.execCommand with error handling
   */
  executeCommand(e, t, n, i) {
    const s = nr[e];
    if (!s)
      return {
        success: !1,
        error: `Unknown command: ${e}`,
        command: e
      };
    if (s.type === "custom")
      return this.executeCustomCommand(e, t, n);
    if (s.requiresSelection && this.isSelectionEmpty())
      return {
        success: !1,
        error: `Command ${e} requires text selection`,
        command: e
      };
    try {
      n && document.activeElement !== n && n.focus();
      const l = t || s.value || "";
      return document.execCommand(s.command, !1, l) ? {
        success: !0,
        command: e,
        value: l
      } : {
        success: !1,
        error: `Command execution failed: ${s.command}`,
        command: e,
        value: l
      };
    } catch (l) {
      return {
        success: !1,
        error: `Command execution error: ${l instanceof Error ? l.message : "Unknown error"}`,
        command: e,
        value: t || s.value || ""
      };
    }
  }
  /**
   * Execute custom commands that require special handling
   */
  executeCustomCommand(e, t, n) {
    try {
      switch (n && document.activeElement !== n && n.focus(), e) {
        case "FONT_COLOR":
          return this.setFontColor(t);
        case "BACKGROUND_COLOR":
          return this.setBackgroundColor(t);
        case "CREATE_LINK":
          return this.createLink(t);
        case "EDIT_LINK":
          return this.editLink(t);
        case "INSERT_IMAGE":
          return t ? this.insertImage(t) : this.triggerImageUpload();
        case "UPLOAD_FILE":
          return this.uploadFile(t);
        case "INSERT_TABLE":
          return this.insertTable(t);
        case "INSERT_SPECIAL_CHAR":
          return this.insertSpecialChar(t);
        case "FIND_REPLACE":
          return this.findReplace();
        case "SOURCE_CODE":
          return this.toggleSourceCode();
        case "FULLSCREEN":
          return this.toggleFullscreen();
        case "PRINT":
          return this.printDocument();
        case "SPELL_CHECK":
          return this.toggleSpellCheck();
        default:
          return {
            success: !1,
            error: `Unknown custom command: ${e}`,
            command: e
          };
      }
    } catch (i) {
      return {
        success: !1,
        error: `Custom command execution error: ${i instanceof Error ? i.message : "Unknown error"}`,
        command: e,
        value: t || ""
      };
    }
  }
  /**
   * Check if the current selection is empty
   */
  isSelectionEmpty() {
    const e = window.getSelection();
    return !e || e.isCollapsed;
  }
  /**
   * Check if the current selection contains mixed formatting
   */
  hasMixedFormatting() {
    const e = window.getSelection();
    if (!e || e.rangeCount === 0) return !1;
    const t = e.getRangeAt(0);
    if (!t.collapsed) {
      if (e.toString().length > 500) return !0;
      const i = t.startContainer.nodeType === Node.ELEMENT_NODE ? t.startContainer : t.startContainer.parentElement, s = t.endContainer.nodeType === Node.ELEMENT_NODE ? t.endContainer : t.endContainer.parentElement;
      if (i && s && i !== s) {
        const l = i.closest("p, div, h1, h2, h3, h4, h5, h6, li, blockquote"), d = s.closest("p, div, h1, h2, h3, h4, h5, h6, li, blockquote");
        if (l !== d) return !0;
      }
    }
    return !1;
  }
  /**
   * Get the current active formatting states
   */
  getActiveFormats() {
    const e = /* @__PURE__ */ new Set();
    try {
      if (this.hasMixedFormatting())
        return e;
      document.queryCommandState("bold") && e.add("BOLD"), document.queryCommandState("italic") && e.add("ITALIC"), document.queryCommandState("underline") && e.add("UNDERLINE"), document.queryCommandState("strikeThrough") && e.add("STRIKETHROUGH"), document.queryCommandState("subscript") && e.add("SUBSCRIPT"), document.queryCommandState("superscript") && e.add("SUPERSCRIPT");
      const t = this.getCurrentBlockFormat();
      t === "H1" ? e.add("FORMAT_H1") : t === "H2" ? e.add("FORMAT_H2") : t === "H3" ? e.add("FORMAT_H3") : t === "H4" ? e.add("FORMAT_H4") : t === "H5" ? e.add("FORMAT_H5") : t === "H6" ? e.add("FORMAT_H6") : t === "BLOCKQUOTE" ? e.add("FORMAT_BLOCKQUOTE") : t === "PRE" && e.add("FORMAT_PRE");
      const n = window.getSelection();
      if (n && n.rangeCount > 0) {
        let s = n.getRangeAt(0).commonAncestorContainer;
        for (; s && s.nodeType !== Node.ELEMENT_NODE && s.parentNode; )
          s = s.parentNode;
        if (s && s.nodeType === Node.ELEMENT_NODE) {
          const l = s, c = window.getComputedStyle(l).textAlign;
          c === "center" || l.style.textAlign === "center" ? e.add("JUSTIFY_CENTER") : c === "right" || l.style.textAlign === "right" ? e.add("JUSTIFY_RIGHT") : c === "justify" || l.style.textAlign === "justify" ? e.add("JUSTIFY_FULL") : l.style.textAlign === "left" && e.add("JUSTIFY_LEFT");
        }
      }
      document.queryCommandState("insertUnorderedList") && e.add("INSERT_UNORDERED_LIST"), document.queryCommandState("insertOrderedList") && e.add("INSERT_ORDERED_LIST"), this.isInLink() && (e.add("CREATE_LINK"), e.add("EDIT_LINK"));
    } catch (t) {
      console.warn("Error checking command states:", t);
    }
    return e;
  }
  /**
   * Check if undo is available
   */
  canUndo() {
    try {
      return document.queryCommandEnabled("undo");
    } catch {
      return !1;
    }
  }
  /**
   * Check if redo is available
   */
  canRedo() {
    try {
      return document.queryCommandEnabled("redo");
    } catch {
      return !1;
    }
  }
  /**
   * Get current block format (heading level, etc.)
   */
  getCurrentBlockFormat() {
    try {
      return document.queryCommandValue("formatBlock").toUpperCase();
    } catch {
      return "";
    }
  }
  /**
   * Create a hyperlink from selected text or insert new link
   */
  createLink(e) {
    const t = window.getSelection();
    if (!e)
      return {
        success: !1,
        error: "URL is required to create a link",
        command: "CREATE_LINK"
      };
    const n = this.normalizeUrl(e);
    if (!n)
      return {
        success: !1,
        error: "Invalid URL provided",
        command: "CREATE_LINK",
        value: e
      };
    try {
      if (!t || t.isCollapsed) {
        const i = document.createElement("a");
        if (i.href = n, i.textContent = e, i.target = "_blank", i.rel = "noopener noreferrer", t && t.rangeCount > 0) {
          const s = t.getRangeAt(0);
          s.insertNode(i), s.setStartAfter(i), s.setEndAfter(i), t.removeAllRanges(), t.addRange(s);
        } else {
          const s = document.querySelector(".editable-area");
          if (s)
            s.appendChild(i);
          else
            return {
              success: !1,
              error: "No cursor position found and no editor element",
              command: "CREATE_LINK"
            };
        }
        return {
          success: !0,
          command: "CREATE_LINK",
          value: n
        };
      } else
        return document.execCommand("createLink", !1, n) ? (setTimeout(() => {
          const s = window.getSelection();
          if (s && s.rangeCount > 0) {
            const l = this.findLinkInSelection(s);
            if (l)
              l.setAttribute("target", "_blank"), l.setAttribute("rel", "noopener noreferrer");
            else {
              const d = document.querySelector(".editable-area");
              d && d.querySelectorAll(`a[href="${n}"]`).forEach((m) => {
                m.hasAttribute("target") || (m.setAttribute("target", "_blank"), m.setAttribute("rel", "noopener noreferrer"));
              });
            }
          }
        }, 0), {
          success: !0,
          command: "CREATE_LINK",
          value: n
        }) : {
          success: !1,
          error: "Failed to create link",
          command: "CREATE_LINK",
          value: n
        };
    } catch (i) {
      return {
        success: !1,
        error: `Link creation error: ${i instanceof Error ? i.message : "Unknown error"}`,
        command: "CREATE_LINK",
        value: n
      };
    }
  }
  /**
   * Edit an existing hyperlink
   */
  editLink(e) {
    const t = window.getSelection();
    if (!t || !t.rangeCount)
      return {
        success: !1,
        error: "No selection available",
        command: "EDIT_LINK"
      };
    const n = this.findLinkInSelection(t);
    if (!n)
      return {
        success: !1,
        error: "No link found in current selection or cursor position",
        command: "EDIT_LINK"
      };
    let i = e;
    if (!i)
      return {
        success: !1,
        error: "URL is required to edit the link",
        command: "EDIT_LINK"
      };
    if (!i || i.trim() === "")
      return this.removeLinkElement(n);
    const s = this.normalizeUrl(i);
    if (!s)
      return {
        success: !1,
        error: "Invalid URL provided",
        command: "EDIT_LINK",
        value: i
      };
    try {
      return n.setAttribute("href", s), n.hasAttribute("target") || n.setAttribute("target", "_blank"), n.hasAttribute("rel") || n.setAttribute("rel", "noopener noreferrer"), {
        success: !0,
        command: "EDIT_LINK",
        value: s
      };
    } catch (l) {
      return {
        success: !1,
        error: `Link editing error: ${l instanceof Error ? l.message : "Unknown error"}`,
        command: "EDIT_LINK",
        value: s
      };
    }
  }
  /**
   * Find a link element in the current selection or cursor position
   */
  findLinkInSelection(e) {
    if (!e.rangeCount) return null;
    const t = e.getRangeAt(0);
    let n = t.commonAncestorContainer;
    if (n.nodeType === Node.TEXT_NODE && (n = n.parentElement), n instanceof HTMLAnchorElement)
      return n;
    const i = n.closest("a");
    if (i instanceof HTMLAnchorElement)
      return i;
    if (t.cloneContents().querySelector("a")) {
      const d = document.createTreeWalker(
        t.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (m) => m instanceof HTMLAnchorElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        }
      );
      let c = d.nextNode();
      for (; c; ) {
        if (t.intersectsNode(c))
          return c;
        c = d.nextNode();
      }
    }
    return null;
  }
  /**
   * Remove a link element while preserving its text content
   */
  removeLinkElement(e) {
    var t;
    try {
      const n = e.textContent || "", i = document.createTextNode(n);
      return (t = e.parentNode) == null || t.replaceChild(i, e), {
        success: !0,
        command: "EDIT_LINK",
        value: "Link removed"
      };
    } catch (n) {
      return {
        success: !1,
        error: `Error removing link: ${n instanceof Error ? n.message : "Unknown error"}`,
        command: "EDIT_LINK"
      };
    }
  }
  /**
   * Check if the current selection or cursor is within a link
   */
  isInLink() {
    const e = window.getSelection();
    return !e || !e.rangeCount ? !1 : this.findLinkInSelection(e) !== null;
  }
  /**
   * Insert an image into the editor with enhanced positioning
   */
  insertImage(e, t) {
    var n, i, s;
    if (!this.isValidImageUrl(e))
      return {
        success: !1,
        error: "Invalid image URL provided",
        command: "INSERT_IMAGE",
        value: e
      };
    try {
      const l = document.createElement("img");
      l.src = e, l.alt = (t == null ? void 0 : t.alt) || "Inserted image", l.className = "editor-image", l.draggable = !0, l.style.maxWidth = "100%", l.style.height = "auto", l.style.cursor = "pointer", l.style.border = "2px solid transparent", l.style.borderRadius = "4px", l.style.transition = "all 0.2s ease", t != null && t.width && (l.style.width = `${t.width}px`), t != null && t.height && (l.style.height = `${t.height}px`), t != null && t.alignment && this.applyImageAlignment(l, t.alignment), t != null && t.float && t.float !== "none" && this.applyImageFloat(l, t.float), l.addEventListener("mouseenter", () => {
        l.style.borderColor = "#3b82f6", l.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.15)";
      }), l.addEventListener("mouseleave", () => {
        l.style.borderColor = "transparent", l.style.boxShadow = "none";
      });
      const d = window.getSelection();
      if (d && d.rangeCount > 0) {
        const c = d.getRangeAt(0), m = c.commonAncestorContainer;
        if (m.nodeType === Node.TEXT_NODE && ((n = m.textContent) != null && n.trim())) {
          const f = m, b = ((i = f.textContent) == null ? void 0 : i.substring(0, c.startOffset)) || "", u = ((s = f.textContent) == null ? void 0 : s.substring(c.endOffset)) || "";
          if (b || u) {
            const y = document.createElement("p"), C = document.createElement("p"), j = document.createElement("p");
            b && (y.textContent = b), j.appendChild(l), u && (C.textContent = u);
            const N = f.parentNode;
            N && (N.insertBefore(b ? y : j, f), b && N.insertBefore(j, f), u && N.insertBefore(C, f), N.removeChild(f));
          } else
            c.deleteContents(), c.insertNode(l);
        } else
          c.deleteContents(), c.insertNode(l);
        c.setStartAfter(l), c.setEndAfter(l), d.removeAllRanges(), d.addRange(c);
      } else {
        const c = document.querySelector(".editable-area");
        if (c) {
          const m = document.createElement("p");
          m.appendChild(l), c.appendChild(m);
        } else
          return {
            success: !1,
            error: "No cursor position found and no editor element",
            command: "INSERT_IMAGE"
          };
      }
      return {
        success: !0,
        command: "INSERT_IMAGE",
        value: e
      };
    } catch (l) {
      return {
        success: !1,
        error: `Image insertion error: ${l instanceof Error ? l.message : "Unknown error"}`,
        command: "INSERT_IMAGE",
        value: e
      };
    }
  }
  /**
   * Apply alignment to an image element
   */
  applyImageAlignment(e, t) {
    switch (t) {
      case "left":
        e.style.display = "block", e.style.marginLeft = "0", e.style.marginRight = "auto";
        break;
      case "center":
        e.style.display = "block", e.style.marginLeft = "auto", e.style.marginRight = "auto";
        break;
      case "right":
        e.style.display = "block", e.style.marginLeft = "auto", e.style.marginRight = "0";
        break;
      case "none":
        e.style.display = "inline-block", e.style.marginLeft = "", e.style.marginRight = "";
        break;
    }
  }
  /**
   * Apply float to an image element
   */
  applyImageFloat(e, t) {
    e.style.float = t, e.style.margin = t === "left" ? "0 15px 10px 0" : "0 0 10px 15px";
  }
  /**
   * Trigger image file upload
   */
  triggerImageUpload() {
    try {
      const e = document.createElement("input");
      return e.type = "file", e.accept = "image/*", e.style.display = "none", e.onchange = (t) => {
        var l;
        const n = (l = t.target.files) == null ? void 0 : l[0];
        if (!n)
          return;
        if (!n.type.startsWith("image/")) {
          console.error("Selected file is not an image");
          return;
        }
        const i = 5 * 1024 * 1024;
        if (n.size > i) {
          console.error("Image file is too large (max 5MB)");
          return;
        }
        const s = new FileReader();
        s.onload = (d) => {
          var m;
          const c = (m = d.target) == null ? void 0 : m.result;
          this.insertImage(c);
        }, s.onerror = () => {
          console.error("Failed to read image file");
        }, s.readAsDataURL(n);
      }, document.body.appendChild(e), e.click(), document.body.removeChild(e), {
        success: !0,
        command: "INSERT_IMAGE",
        value: "File upload triggered"
      };
    } catch (e) {
      return {
        success: !1,
        error: `File upload error: ${e instanceof Error ? e.message : "Unknown error"}`,
        command: "INSERT_IMAGE"
      };
    }
  }
  /**
   * Upload and insert a file
   */
  uploadFile(e) {
    if (e)
      return this.insertFileLink(e);
    try {
      const t = document.createElement("input");
      return t.type = "file", t.style.display = "none", t.onchange = (n) => {
        var d;
        const i = (d = n.target.files) == null ? void 0 : d[0];
        if (!i)
          return;
        const s = 10 * 1024 * 1024;
        if (i.size > s) {
          console.error("File is too large (max 10MB)");
          return;
        }
        const l = URL.createObjectURL(i);
        this.insertFileLink(l, i.name, i.type);
      }, document.body.appendChild(t), t.click(), document.body.removeChild(t), {
        success: !0,
        command: "UPLOAD_FILE",
        value: "File upload triggered"
      };
    } catch (t) {
      return {
        success: !1,
        error: `File upload error: ${t instanceof Error ? t.message : "Unknown error"}`,
        command: "UPLOAD_FILE"
      };
    }
  }
  /**
   * Insert a file link into the editor
   */
  insertFileLink(e, t, n) {
    try {
      const i = document.createElement("a");
      i.href = e, i.download = t || "download", i.target = "_blank", i.rel = "noopener noreferrer";
      const s = t || "Download File", l = this.getFileIcon(n);
      i.innerHTML = `${l} ${s}`, i.style.display = "inline-block", i.style.padding = "8px 12px", i.style.margin = "4px", i.style.backgroundColor = "#f0f0f0", i.style.border = "1px solid #ccc", i.style.borderRadius = "4px", i.style.textDecoration = "none", i.style.color = "#333";
      const d = window.getSelection();
      if (d && d.rangeCount > 0) {
        const c = d.getRangeAt(0);
        c.deleteContents(), c.insertNode(i), c.setStartAfter(i), c.setEndAfter(i), d.removeAllRanges(), d.addRange(c);
      } else
        return {
          success: !1,
          error: "No cursor position found",
          command: "UPLOAD_FILE"
        };
      return {
        success: !0,
        command: "UPLOAD_FILE",
        value: e
      };
    } catch (i) {
      return {
        success: !1,
        error: `File insertion error: ${i instanceof Error ? i.message : "Unknown error"}`,
        command: "UPLOAD_FILE",
        value: e
      };
    }
  }
  /**
   * Get file icon based on file type
   */
  getFileIcon(e) {
    return e ? e.startsWith("image/") ? "🖼️" : e.startsWith("video/") ? "🎥" : e.startsWith("audio/") ? "🎵" : e.includes("pdf") ? "📕" : e.includes("word") || e.includes("document") ? "📝" : e.includes("excel") || e.includes("spreadsheet") || e.includes("powerpoint") || e.includes("presentation") ? "📊" : e.includes("zip") || e.includes("archive") ? "🗜️" : "📄" : "📄";
  }
  /**
   * Insert a table into the editor
   */
  insertTable(e) {
    try {
      const t = e ? e.split(",") : ["3", "3", "true"], n = parseInt(t[0]) || 3, i = parseInt(t[1]) || 3, s = t[2] === "true", l = document.createElement("table");
      l.className = "editor-table", l.style.borderCollapse = "collapse", l.style.width = "100%", l.style.border = "1px solid #ccc", l.style.margin = "10px 0";
      const d = document.createElement("tbody");
      for (let m = 0; m < n; m++) {
        const f = document.createElement("tr");
        for (let b = 0; b < i; b++) {
          const u = document.createElement(s && m === 0 ? "th" : "td");
          u.style.border = "1px solid #ccc", u.style.padding = "8px", u.style.minWidth = "50px", u.style.minHeight = "20px", s && m === 0 ? (u.style.backgroundColor = "#f5f5f5", u.style.fontWeight = "bold", u.textContent = `Header ${b + 1}`) : u.innerHTML = "&nbsp;", f.appendChild(u);
        }
        d.appendChild(f);
      }
      l.appendChild(d);
      const c = window.getSelection();
      if (c && c.rangeCount > 0) {
        const m = c.getRangeAt(0);
        m.deleteContents(), m.insertNode(l);
        const f = l.querySelector("td, th");
        f && (m.selectNodeContents(f), m.collapse(!0), c.removeAllRanges(), c.addRange(m));
      } else
        return {
          success: !1,
          error: "No cursor position found",
          command: "INSERT_TABLE"
        };
      return {
        success: !0,
        command: "INSERT_TABLE",
        value: `${n}x${i} table inserted`
      };
    } catch (t) {
      return {
        success: !1,
        error: `Table insertion error: ${t instanceof Error ? t.message : "Unknown error"}`,
        command: "INSERT_TABLE"
      };
    }
  }
  /**
   * Insert a special character
   */
  insertSpecialChar(e) {
    if (!e)
      return {
        success: !1,
        error: "No character specified",
        command: "INSERT_SPECIAL_CHAR"
      };
    try {
      const t = window.getSelection();
      if (t && t.rangeCount > 0) {
        const n = t.getRangeAt(0);
        n.deleteContents(), n.insertNode(document.createTextNode(e)), n.setStartAfter(n.endContainer), n.collapse(!0), t.removeAllRanges(), t.addRange(n);
      } else
        return {
          success: !1,
          error: "No cursor position found",
          command: "INSERT_SPECIAL_CHAR"
        };
      return {
        success: !0,
        command: "INSERT_SPECIAL_CHAR",
        value: e
      };
    } catch (t) {
      return {
        success: !1,
        error: `Special character insertion error: ${t instanceof Error ? t.message : "Unknown error"}`,
        command: "INSERT_SPECIAL_CHAR"
      };
    }
  }
  /**
   * Find and replace functionality
   * Note: This function should not be called directly anymore
   * Find/replace is now handled by the modal system in the WYSIWYGEditor component
   */
  findReplace() {
    return {
      success: !1,
      error: "Find and replace should be handled by the modal system",
      command: "FIND_REPLACE"
    };
  }
  /**
   * Toggle source code view
   */
  toggleSourceCode() {
    try {
      const e = document.querySelector(".editable-area");
      if (!e)
        return {
          success: !1,
          error: "Editor element not found",
          command: "SOURCE_CODE"
        };
      const t = e.getAttribute("data-source-mode") === "true";
      if (t) {
        const n = e.textContent || "";
        e.innerHTML = n, e.contentEditable = "true", e.removeAttribute("data-source-mode"), e.style.fontFamily = "", e.style.whiteSpace = "";
      } else {
        const n = e.innerHTML;
        e.textContent = n, e.contentEditable = "true", e.setAttribute("data-source-mode", "true"), e.style.fontFamily = "monospace", e.style.whiteSpace = "pre-wrap";
      }
      return {
        success: !0,
        command: "SOURCE_CODE",
        value: t ? "WYSIWYG mode" : "Source mode"
      };
    } catch (e) {
      return {
        success: !1,
        error: `Source code toggle error: ${e instanceof Error ? e.message : "Unknown error"}`,
        command: "SOURCE_CODE"
      };
    }
  }
  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen() {
    try {
      const e = document.querySelector(".wysiwyg-editor");
      if (!e)
        return {
          success: !1,
          error: "Editor container not found",
          command: "FULLSCREEN"
        };
      const t = e.classList.contains("fullscreen");
      return t ? (e.classList.remove("fullscreen"), document.body.style.overflow = "") : (e.classList.add("fullscreen"), document.body.style.overflow = "hidden"), {
        success: !0,
        command: "FULLSCREEN",
        value: t ? "Exited fullscreen" : "Entered fullscreen"
      };
    } catch (e) {
      return {
        success: !1,
        error: `Fullscreen toggle error: ${e instanceof Error ? e.message : "Unknown error"}`,
        command: "FULLSCREEN"
      };
    }
  }
  /**
   * Print document
   */
  printDocument() {
    try {
      const e = document.querySelector(".editable-area");
      if (!e)
        return {
          success: !1,
          error: "Editor element not found",
          command: "PRINT"
        };
      const t = window.open("", "_blank");
      if (!t)
        return {
          success: !1,
          error: "Could not open print window",
          command: "PRINT"
        };
      const n = e.innerHTML;
      return t.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Document</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          ${n}
        </body>
        </html>
      `), t.document.close(), t.focus(), t.print(), t.close(), {
        success: !0,
        command: "PRINT",
        value: "Print dialog opened"
      };
    } catch (e) {
      return {
        success: !1,
        error: `Print error: ${e instanceof Error ? e.message : "Unknown error"}`,
        command: "PRINT"
      };
    }
  }
  /**
   * Toggle spell check
   */
  toggleSpellCheck() {
    try {
      const e = document.querySelector(".editable-area");
      if (!e)
        return {
          success: !1,
          error: "Editor element not found",
          command: "SPELL_CHECK"
        };
      const t = e.spellcheck;
      return e.spellcheck = !t, {
        success: !0,
        command: "SPELL_CHECK",
        value: t ? "Spell check disabled" : "Spell check enabled"
      };
    } catch (e) {
      return {
        success: !1,
        error: `Spell check toggle error: ${e instanceof Error ? e.message : "Unknown error"}`,
        command: "SPELL_CHECK"
      };
    }
  }
  /**
   * Validate if URL is a valid image URL
   */
  isValidImageUrl(e) {
    if (!e || e.trim() === "") return !1;
    if (e.startsWith("data:image/") || e.startsWith("blob:")) return !0;
    try {
      return new URL(e), /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i.test(e);
    } catch {
      return !1;
    }
  }
  /**
   * Set font color for selected text or future text input
   */
  setFontColor(e) {
    if (!e)
      return {
        success: !1,
        error: "Color value is required",
        command: "FONT_COLOR"
      };
    try {
      return document.execCommand("foreColor", !1, e) ? {
        success: !0,
        command: "FONT_COLOR",
        value: e
      } : {
        success: !1,
        error: "Failed to set font color",
        command: "FONT_COLOR",
        value: e
      };
    } catch (t) {
      return {
        success: !1,
        error: `Font color error: ${t instanceof Error ? t.message : "Unknown error"}`,
        command: "FONT_COLOR",
        value: e
      };
    }
  }
  /**
   * Set background color for selected text or future text input
   */
  setBackgroundColor(e) {
    if (!e)
      return {
        success: !1,
        error: "Color value is required",
        command: "BACKGROUND_COLOR"
      };
    try {
      return document.execCommand("backColor", !1, e) ? {
        success: !0,
        command: "BACKGROUND_COLOR",
        value: e
      } : {
        success: !1,
        error: "Failed to set background color",
        command: "BACKGROUND_COLOR",
        value: e
      };
    } catch (t) {
      return {
        success: !1,
        error: `Background color error: ${t instanceof Error ? t.message : "Unknown error"}`,
        command: "BACKGROUND_COLOR",
        value: e
      };
    }
  }
  /**
   * Normalize and validate URL
   */
  normalizeUrl(e) {
    if (!e || e.trim() === "")
      return null;
    const t = e.trim();
    try {
      return /^https?:\/\//i.test(t) ? (new URL(t), t) : t.includes("@") && !t.includes(" ") ? `mailto:${t}` : `http://${t}`;
    } catch {
      return null;
    }
  }
};
Me(Ie, "instance");
let ht = Ie;
const ke = ht.getInstance(), Ne = /* @__PURE__ */ new Map(), Ct = 100, $e = class $e {
  /**
   * Validates if a configuration object has the correct structure
   * @param config - The configuration to validate
   * @returns True if the configuration is valid, false otherwise
   */
  static validateConfigStructure(e) {
    if (e == null)
      return !0;
    if (typeof e != "object" || Array.isArray(e))
      return console.warn("Toolbar configuration must be an object, received:", Array.isArray(e) ? "array" : typeof e), !1;
    if (e.preset !== void 0 && typeof e.preset != "string")
      return console.warn("Toolbar configuration preset must be a string, received:", typeof e.preset), !1;
    if (e.include !== void 0) {
      if (typeof e.include != "object" || e.include === null)
        return console.warn("Toolbar configuration include must be an object, received:", typeof e.include), !1;
      const { categories: t, buttons: n, groups: i } = e.include;
      if (t !== void 0 && !Array.isArray(t))
        return console.warn("Toolbar configuration include.categories must be an array, received:", typeof t), !1;
      if (n !== void 0 && !Array.isArray(n))
        return console.warn("Toolbar configuration include.buttons must be an array, received:", typeof n), !1;
      if (i !== void 0) {
        if (!Array.isArray(i))
          return console.warn("Toolbar configuration include.groups must be an array, received:", typeof i), !1;
        for (let s = 0; s < i.length; s++) {
          const l = i[s];
          if (typeof l != "object" || l === null)
            return console.warn(`Toolbar configuration include.groups[${s}] must be an object, received:`, typeof l), !1;
          if (typeof l.name != "string")
            return console.warn(`Toolbar configuration include.groups[${s}].name must be a string, received:`, typeof l.name), !1;
          if (!Array.isArray(l.buttons))
            return console.warn(`Toolbar configuration include.groups[${s}].buttons must be an array, received:`, typeof l.buttons), !1;
        }
      }
    }
    if (e.exclude !== void 0) {
      if (typeof e.exclude != "object" || e.exclude === null)
        return console.warn("Toolbar configuration exclude must be an object, received:", typeof e.exclude), !1;
      const { categories: t, buttons: n } = e.exclude;
      if (t !== void 0 && !Array.isArray(t))
        return console.warn("Toolbar configuration exclude.categories must be an array, received:", typeof t), !1;
      if (n !== void 0 && !Array.isArray(n))
        return console.warn("Toolbar configuration exclude.buttons must be an array, received:", typeof n), !1;
    }
    if (e.order !== void 0) {
      if (!Array.isArray(e.order))
        return console.warn("Toolbar configuration order must be an array, received:", typeof e.order), !1;
      for (let t = 0; t < e.order.length; t++) {
        const n = e.order[t];
        if (typeof n != "string" && (typeof n != "object" || n === null))
          return console.warn(`Toolbar configuration order[${t}] must be a string or object, received:`, typeof n), !1;
        if (typeof n == "object") {
          if (typeof n.name != "string")
            return console.warn(`Toolbar configuration order[${t}].name must be a string, received:`, typeof n.name), !1;
          if (!Array.isArray(n.buttons))
            return console.warn(`Toolbar configuration order[${t}].buttons must be an array, received:`, typeof n.buttons), !1;
        }
      }
    }
    return !0;
  }
  /**
   * Sanitizes a configuration object by removing invalid properties
   * @param config - The configuration to sanitize
   * @returns A sanitized configuration object
   */
  static sanitizeConfig(e) {
    if (!e || typeof e != "object")
      return;
    const t = {};
    return typeof e.preset == "string" && (t.preset = e.preset), e.include && typeof e.include == "object" && (t.include = {}, Array.isArray(e.include.categories) && (t.include.categories = e.include.categories.filter(
      (n) => typeof n == "string"
    )), Array.isArray(e.include.buttons) && (t.include.buttons = e.include.buttons.filter(
      (n) => typeof n == "string"
    )), Array.isArray(e.include.groups) && (t.include.groups = e.include.groups.filter(
      (n) => n && typeof n == "object" && typeof n.name == "string" && Array.isArray(n.buttons)
    ).map((n) => ({
      name: n.name,
      buttons: n.buttons.filter((i) => typeof i == "string")
    })).filter((n) => n.buttons.length > 0))), e.exclude && typeof e.exclude == "object" && (t.exclude = {}, Array.isArray(e.exclude.categories) && (t.exclude.categories = e.exclude.categories.filter(
      (n) => typeof n == "string"
    )), Array.isArray(e.exclude.buttons) && (t.exclude.buttons = e.exclude.buttons.filter(
      (n) => typeof n == "string"
    ))), Array.isArray(e.order) && (t.order = e.order.filter((n) => !!(typeof n == "string" || n && typeof n == "object" && typeof n.name == "string" && Array.isArray(n.buttons))).map((n) => typeof n == "string" ? n : {
      name: n.name,
      buttons: n.buttons.filter((i) => typeof i == "string")
    })), t;
  }
  /**
   * Main method to resolve a toolbar configuration into a processed configuration
   * @param config - The toolbar configuration to process
   * @returns Resolved toolbar configuration with groups and enabled buttons
   */
  static resolve(e) {
    var s;
    let t = e;
    try {
      if (e != null && !this.validateConfigStructure(e) && (console.warn("Invalid toolbar configuration structure detected, attempting to sanitize..."), t = this.sanitizeConfig(e), !t))
        return console.warn("Configuration could not be sanitized, falling back to default configuration"), this.createFallbackConfig();
    } catch (l) {
      return console.warn("Error validating toolbar configuration, falling back to default:", l), this.createFallbackConfig();
    }
    const n = this.generateCacheKey(t), i = Ne.get(n);
    if (i)
      return this.cloneResolvedConfig(i);
    try {
      let l = [];
      if ((t == null ? void 0 : t.preset) !== void 0 && (l = this.applyPreset(t.preset)), t != null && t.include) {
        const m = this.processIncludes(t.include), f = /* @__PURE__ */ new Set([...l, ...m]);
        l = Array.from(f);
      }
      t != null && t.exclude && (l = this.processExcludes(l, t.exclude)), (!t || l.length === 0) && (l = [...this.PRESETS.full]);
      const c = {
        groups: this.applyOrder(l, t == null ? void 0 : t.order, (s = t == null ? void 0 : t.include) == null ? void 0 : s.groups),
        enabledButtons: new Set(l)
      };
      return this.cacheResult(n, c), c;
    } catch (l) {
      return console.warn("Error processing toolbar configuration, falling back to default:", l), this.createFallbackConfig();
    }
  }
  /**
   * Creates a fallback configuration when the main configuration fails
   * @returns A safe fallback configuration
   */
  static createFallbackConfig() {
    return {
      groups: [{ name: "default", buttons: [...this.PRESETS.full] }],
      enabledButtons: new Set(this.PRESETS.full)
    };
  }
  /**
   * Apply a preset configuration
   * @param preset - The preset name to apply
   * @returns Array of toolbar buttons for the preset
   */
  static applyPreset(e) {
    if (typeof e != "string")
      return console.warn(`Preset must be a string, received ${typeof e}, falling back to full preset`), [...this.PRESETS.full];
    const t = e.trim().toLowerCase();
    if (t === "")
      return console.warn("Empty preset name provided, falling back to full preset"), [...this.PRESETS.full];
    const n = this.PRESETS[t];
    if (!n) {
      const i = Object.keys(this.PRESETS).join(", ");
      return console.warn(`Invalid preset "${e}". Available presets: ${i}. Falling back to full preset`), [...this.PRESETS.full];
    }
    return [...n];
  }
  /**
   * Process include configurations to determine which buttons to include
   * @param include - The include configuration object
   * @returns Array of toolbar buttons to include
   */
  static processIncludes(e) {
    if (!e || typeof e != "object")
      return console.warn("Include configuration must be an object, ignoring include settings"), [];
    const t = /* @__PURE__ */ new Set();
    if (e.categories)
      if (!Array.isArray(e.categories))
        console.warn("Include categories must be an array, ignoring categories");
      else
        for (const n of e.categories) {
          if (typeof n != "string") {
            console.warn(`Category must be a string, received ${typeof n}, ignoring this category`);
            continue;
          }
          const i = n.trim(), s = this.CATEGORY_MAPPINGS[i];
          if (s)
            s.forEach((l) => t.add(l));
          else {
            const l = Object.keys(this.CATEGORY_MAPPINGS).join(", ");
            console.warn(`Invalid category "${n}". Available categories: ${l}. Category ignored`);
          }
        }
    if (e.buttons)
      if (!Array.isArray(e.buttons))
        console.warn("Include buttons must be an array, ignoring buttons");
      else
        for (const n of e.buttons) {
          if (typeof n != "string") {
            console.warn(`Button must be a string, received ${typeof n}, ignoring this button`);
            continue;
          }
          const i = n.trim();
          if (this.isValidButton(i))
            t.add(i);
          else {
            const s = Array.from(this.VALID_BUTTONS).sort().join(", ");
            console.warn(`Invalid button "${n}". Available buttons: ${s}. Button ignored`);
          }
        }
    if (e.groups)
      if (!Array.isArray(e.groups))
        console.warn("Include groups must be an array, ignoring groups");
      else
        for (let n = 0; n < e.groups.length; n++) {
          const i = e.groups[n];
          if (!i || typeof i != "object") {
            console.warn(`Group at index ${n} must be an object, ignoring this group`);
            continue;
          }
          if (typeof i.name != "string") {
            console.warn(`Group at index ${n} must have a string name, ignoring this group`);
            continue;
          }
          if (!Array.isArray(i.buttons)) {
            console.warn(`Group "${i.name}" must have a buttons array, ignoring this group`);
            continue;
          }
          for (const s of i.buttons) {
            if (typeof s != "string") {
              console.warn(`Button in group "${i.name}" must be a string, received ${typeof s}, ignoring this button`);
              continue;
            }
            const l = s.trim();
            this.isValidButton(l) ? t.add(l) : console.warn(`Invalid button "${s}" in group "${i.name}" ignored`);
          }
        }
    return Array.from(t);
  }
  /**
   * Generate a cache key for the given configuration
   * @param config - The toolbar configuration
   * @returns A string key for caching
   */
  static generateCacheKey(e) {
    if (!e)
      return "default";
    try {
      const t = {
        preset: typeof e.preset == "string" ? e.preset : void 0,
        include: e.include && typeof e.include == "object" ? {
          categories: Array.isArray(e.include.categories) ? e.include.categories.filter((n) => typeof n == "string").sort() : void 0,
          buttons: Array.isArray(e.include.buttons) ? e.include.buttons.filter((n) => typeof n == "string").sort() : void 0,
          groups: Array.isArray(e.include.groups) ? e.include.groups.filter((n) => n && typeof n == "object" && typeof n.name == "string" && Array.isArray(n.buttons)).map((n) => ({
            name: n.name,
            buttons: n.buttons.filter((i) => typeof i == "string").sort()
          })).sort((n, i) => n.name.localeCompare(i.name)) : void 0
        } : void 0,
        exclude: e.exclude && typeof e.exclude == "object" ? {
          categories: Array.isArray(e.exclude.categories) ? e.exclude.categories.filter((n) => typeof n == "string").sort() : void 0,
          buttons: Array.isArray(e.exclude.buttons) ? e.exclude.buttons.filter((n) => typeof n == "string").sort() : void 0
        } : void 0,
        order: Array.isArray(e.order) ? e.order.map((n) => typeof n == "string" ? n : n && typeof n == "object" && typeof n.name == "string" && Array.isArray(n.buttons) ? {
          name: n.name,
          buttons: n.buttons.filter((i) => typeof i == "string").sort()
        } : "invalid-order-item") : void 0
      };
      return JSON.stringify(t);
    } catch (t) {
      return console.warn("Failed to generate cache key for toolbar configuration:", t), `malformed-${Date.now()}-${Math.random()}`;
    }
  }
  /**
   * Create a deep clone of a resolved toolbar configuration
   * @param config - The configuration to clone
   * @returns A deep clone of the configuration
   */
  static cloneResolvedConfig(e) {
    return {
      groups: e.groups.map((t) => ({
        name: t.name,
        buttons: [...t.buttons]
      })),
      enabledButtons: new Set(e.enabledButtons)
    };
  }
  /**
   * Cache a resolved configuration result
   * @param key - The cache key
   * @param result - The resolved configuration to cache
   */
  static cacheResult(e, t) {
    if (Ne.size >= Ct) {
      const n = Ne.keys().next().value;
      n && Ne.delete(n);
    }
    Ne.set(e, this.cloneResolvedConfig(t));
  }
  /**
   * Clear the configuration cache (useful for testing or memory management)
   */
  static clearCache() {
    Ne.clear();
  }
  /**
   * Get cache statistics for debugging
   */
  static getCacheStats() {
    return {
      size: Ne.size,
      maxSize: Ct
    };
  }
  /**
   * Process exclude configurations to remove buttons from the current set
   * @param buttons - Current array of buttons
   * @param exclude - The exclude configuration object
   * @returns Array of toolbar buttons with exclusions applied
   */
  static processExcludes(e, t) {
    if (!t || typeof t != "object")
      return console.warn("Exclude configuration must be an object, ignoring exclude settings"), e;
    const n = /* @__PURE__ */ new Set();
    if (t.categories)
      if (!Array.isArray(t.categories))
        console.warn("Exclude categories must be an array, ignoring categories");
      else
        for (const i of t.categories) {
          if (typeof i != "string") {
            console.warn(`Exclude category must be a string, received ${typeof i}, ignoring this category`);
            continue;
          }
          const s = i.trim(), l = this.CATEGORY_MAPPINGS[s];
          if (l)
            l.forEach((d) => n.add(d));
          else {
            const d = Object.keys(this.CATEGORY_MAPPINGS).join(", ");
            console.warn(`Invalid exclude category "${i}". Available categories: ${d}. Category ignored`);
          }
        }
    if (t.buttons)
      if (!Array.isArray(t.buttons))
        console.warn("Exclude buttons must be an array, ignoring buttons");
      else
        for (const i of t.buttons) {
          if (typeof i != "string") {
            console.warn(`Exclude button must be a string, received ${typeof i}, ignoring this button`);
            continue;
          }
          const s = i.trim();
          if (this.isValidButton(s))
            n.add(s);
          else {
            const l = Array.from(this.VALID_BUTTONS).sort().join(", ");
            console.warn(`Invalid exclude button "${i}". Available buttons: ${l}. Button ignored`);
          }
        }
    return e.filter((i) => !n.has(i));
  }
  /**
   * Apply custom ordering to buttons, organizing them into groups
   * @param buttons - Array of buttons to organize
   * @param order - Optional custom ordering configuration
   * @param includeGroups - Optional groups from include configuration
   * @returns Array of toolbar groups with proper ordering
   */
  static applyOrder(e, t, n) {
    return t && t.length > 0 ? this.processCustomOrder(e, t) : n && n.length > 0 ? this.processIncludeGroups(e, n) : this.createDefaultGroups(e);
  }
  /**
   * Process custom order configuration
   * @param buttons - Array of buttons to organize
   * @param order - Custom ordering configuration
   * @returns Array of toolbar groups with proper ordering
   */
  static processCustomOrder(e, t) {
    if (!Array.isArray(t))
      return console.warn("Order configuration must be an array, falling back to default grouping"), this.createDefaultGroups(e);
    const n = [], i = /* @__PURE__ */ new Set(), s = new Set(e);
    for (let d = 0; d < t.length; d++) {
      const c = t[d];
      if (typeof c == "string") {
        const m = c.trim();
        s.has(m) && this.isValidButton(m) ? (n.push({ name: `group-${n.length}`, buttons: [m] }), i.add(m)) : this.isValidButton(m) || console.warn(`Invalid button "${c}" in order configuration ignored`);
      } else if (c && typeof c == "object") {
        if (!("name" in c) || typeof c.name != "string") {
          console.warn(`Order item at index ${d} must have a string name property, ignoring this item`);
          continue;
        }
        if (!("buttons" in c) || !Array.isArray(c.buttons)) {
          console.warn(`Order item "${c.name}" at index ${d} must have a buttons array, ignoring this item`);
          continue;
        }
        const m = [];
        for (const f of c.buttons) {
          if (typeof f != "string") {
            console.warn(`Button in order group "${c.name}" must be a string, received ${typeof f}, ignoring this button`);
            continue;
          }
          const b = f.trim();
          if (!this.isValidButton(b)) {
            console.warn(`Invalid button "${f}" in order group "${c.name}" ignored`);
            continue;
          }
          s.has(b) && m.push(b);
        }
        m.length > 0 && (n.push({ name: c.name, buttons: m }), m.forEach((f) => i.add(f)));
      } else
        console.warn(`Order item at index ${d} must be a string or object, received ${typeof c}, ignoring this item`);
    }
    const l = e.filter((d) => !i.has(d));
    return l.length > 0 && n.push({ name: "remaining", buttons: l }), n;
  }
  /**
   * Process groups from include configuration
   * @param buttons - Array of buttons to organize
   * @param includeGroups - Groups from include configuration
   * @returns Array of toolbar groups with proper ordering
   */
  static processIncludeGroups(e, t) {
    if (!Array.isArray(t))
      return console.warn("Include groups must be an array, falling back to default grouping"), this.createDefaultGroups(e);
    const n = [], i = /* @__PURE__ */ new Set(), s = new Set(e);
    for (let d = 0; d < t.length; d++) {
      const c = t[d];
      if (!c || typeof c != "object") {
        console.warn(`Include group at index ${d} must be an object, ignoring this group`);
        continue;
      }
      if (!("name" in c) || typeof c.name != "string") {
        console.warn(`Include group at index ${d} must have a string name property, ignoring this group`);
        continue;
      }
      if (!("buttons" in c) || !Array.isArray(c.buttons)) {
        console.warn(`Include group "${c.name}" at index ${d} must have a buttons array, ignoring this group`);
        continue;
      }
      const m = [];
      for (const f of c.buttons) {
        if (typeof f != "string") {
          console.warn(`Button in include group "${c.name}" must be a string, received ${typeof f}, ignoring this button`);
          continue;
        }
        const b = f.trim();
        if (!this.isValidButton(b)) {
          console.warn(`Invalid button "${f}" in include group "${c.name}" ignored`);
          continue;
        }
        s.has(b) && m.push(b);
      }
      m.length > 0 && (n.push({ name: c.name, buttons: m }), m.forEach((f) => i.add(f)));
    }
    const l = e.filter((d) => !i.has(d));
    return l.length > 0 && n.push({ name: "remaining", buttons: l }), n;
  }
  /**
   * Create default groups organized by category
   * @param buttons - Array of buttons to organize
   * @returns Array of toolbar groups organized by category
   */
  static createDefaultGroups(e) {
    const t = [], n = new Set(e);
    for (const [i, s] of Object.entries(this.CATEGORY_MAPPINGS)) {
      const l = s.filter((d) => n.has(d));
      l.length > 0 && t.push({ name: i, buttons: l });
    }
    return t;
  }
  /**
   * Validate if a button type is valid
   * @param button - The button type to validate
   * @returns True if the button is valid
   */
  static isValidButton(e) {
    return this.VALID_BUTTONS.has(e);
  }
};
/**
 * Static mapping of toolbar categories to their respective button arrays
 */
Me($e, "CATEGORY_MAPPINGS", {
  formatting: ["bold", "italic", "underline", "strikethrough", "subscript", "superscript"],
  structure: ["h1", "h2", "h3", "h4", "h5", "h6"],
  lists: ["bulletList", "numberedList", "indent", "outdent"],
  alignment: ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
  media: ["image", "file", "table"],
  links: ["link", "unlink"],
  advanced: [
    "fontColor",
    "backgroundColor",
    "fontSize",
    "fontFamily",
    "specialChar",
    "horizontalRule",
    "findReplace",
    "sourceCode",
    "fullscreen",
    "print",
    "undo",
    "redo",
    "removeFormat"
  ]
}), /**
 * Static preset configurations for common toolbar setups
 */
Me($e, "PRESETS", {
  minimal: ["bold", "italic", "underline"],
  standard: [
    "bold",
    "italic",
    "underline",
    "h1",
    "h2",
    "h3",
    "bulletList",
    "numberedList",
    "link",
    "image"
  ],
  full: [
    // All available buttons
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "bulletList",
    "numberedList",
    "indent",
    "outdent",
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
    "image",
    "file",
    "table",
    "link",
    "unlink",
    "fontColor",
    "backgroundColor",
    "fontSize",
    "fontFamily",
    "subscript",
    "superscript",
    "specialChar",
    "horizontalRule",
    "findReplace",
    "sourceCode",
    "fullscreen",
    "print",
    "undo",
    "redo",
    "removeFormat"
  ]
}), /**
 * Pre-computed set of all valid buttons for O(1) validation
 */
Me($e, "VALID_BUTTONS", new Set(
  Object.values($e.CATEGORY_MAPPINGS).flat()
));
let bt = $e;
const mr = ({
  initialContent: a = "",
  placeholder: e = "Start typing...",
  onChange: t,
  onFocus: n,
  onBlur: i,
  toolbarConfig: s,
  showConfigDropdown: l = !1,
  configOptions: d,
  selectedConfigKey: c,
  onConfigChange: m,
  height: f = "300px"
  // Default height
}) => {
  const [b, u] = R(a), [y, C] = R(!1), [j, N] = R(/* @__PURE__ */ new Set()), [q, D] = R(!1), [_, V] = R(!1), [h, E] = R(!1), [H, $] = R(!1), [J, A] = R(null), [B, I] = R(!1), [W, M] = R(!1), [oe, ie] = R(!1), [ue, ge] = R("create"), [Ae, be] = R(""), [ye, ve] = R(!1), [_e, Fe] = R(!1), [Ee, we] = R({
    title: "",
    message: "",
    type: "info"
  }), [S, U] = R(null), [Z, ae] = R(!1), [te, Oe] = R({
    url: "",
    text: "",
    position: { x: 0, y: 0 },
    element: null
  }), T = Re(null), xe = Re(null), Se = nt(() => bt.resolve(s), [s]), Te = nt(() => Se, [Se]), X = v(() => {
    if (!y || !T.current) return;
    const g = ke.getActiveFormats();
    N(g), D(ke.canUndo()), V(ke.canRedo());
  }, [y]), G = v((g) => {
    xe.current && (xe.current.textContent = g, setTimeout(() => {
      xe.current && (xe.current.textContent = "");
    }, 1e3));
  }, []), Le = v((g, w) => {
    const k = {
      bold: "bold",
      italic: "italic",
      underline: "underline",
      insertUnorderedList: "bullet list",
      insertOrderedList: "numbered list",
      justifyLeft: "left aligned",
      justifyCenter: "center aligned",
      justifyRight: "right aligned",
      createLink: "link",
      unlink: "link removed",
      insertImage: "image inserted",
      uploadFile: "file uploaded",
      undo: "undone",
      redo: "redone",
      removeFormat: "formatting cleared"
    };
    return g === "formatBlock" && w ? `heading ${w.toLowerCase()}` : k[g] || g;
  }, []), ze = v((g) => {
    g.stopPropagation();
    const w = g.target;
    A(w);
  }, []), Ve = v((g) => {
    const w = g.target;
    g.dataTransfer && (g.dataTransfer.effectAllowed = "move", g.dataTransfer.setData("text/html", w.outerHTML), w.style.opacity = "0.5");
  }, []), De = v((g) => {
    const w = g.target;
    w.style.opacity = "1";
  }, []), Be = v(() => {
    if (!T.current) return;
    const g = T.current.querySelectorAll("img.editor-image");
    Array.from(g).forEach((k) => {
      k.removeEventListener("click", ze), k.addEventListener("click", ze), k.addEventListener("dragstart", Ve), k.addEventListener("dragend", De);
    });
  }, [ze, Ve, De]), ot = v((g) => {
    const w = ke.insertImage(g);
    w.success ? (G("Image inserted"), setTimeout(() => {
      if (T.current) {
        const k = T.current.innerHTML;
        u(k), t == null || t(k), X(), Be();
      }
    }, 0)) : (console.warn("Image insertion failed:", w.error), G("Image insertion failed"));
  }, [t, X, G, Be]), Je = v(() => {
    if (T.current) {
      const g = T.current.innerHTML;
      u(g), t == null || t(g);
    }
  }, [t]), Xe = v(() => {
    if (J && J.parentNode) {
      if (J.parentNode.removeChild(J), A(null), T.current) {
        const g = T.current.innerHTML;
        u(g), t == null || t(g);
      }
      G("Image removed");
    }
  }, [J, t, G]), Ze = v((g) => {
    const w = URL.createObjectURL(g), k = document.createElement("a");
    k.href = w, k.download = g.name, k.target = "_blank", k.rel = "noopener noreferrer";
    const P = it(g.type);
    k.innerHTML = `${P} ${g.name}`, k.style.display = "inline-block", k.style.padding = "8px 12px", k.style.margin = "4px", k.style.backgroundColor = "#f0f0f0", k.style.border = "1px solid #ccc", k.style.borderRadius = "4px", k.style.textDecoration = "none", k.style.color = "#333";
    const Y = window.getSelection();
    if (Y && Y.rangeCount > 0) {
      const se = Y.getRangeAt(0);
      se.deleteContents(), se.insertNode(k), se.setStartAfter(k), se.setEndAfter(k), Y.removeAllRanges(), Y.addRange(se), G("File uploaded and inserted"), setTimeout(() => {
        if (T.current) {
          const le = T.current.innerHTML;
          u(le), t == null || t(le), X();
        }
      }, 0);
    } else
      G("File upload failed - no cursor position");
    $(!1);
  }, [t, X, G]), it = v((g) => g.startsWith("image/") ? "🖼️" : g.startsWith("video/") ? "🎥" : g.startsWith("audio/") ? "🎵" : g.includes("pdf") ? "📕" : g.includes("word") || g.includes("document") ? "📝" : g.includes("excel") || g.includes("spreadsheet") || g.includes("powerpoint") || g.includes("presentation") ? "📊" : g.includes("zip") || g.includes("archive") ? "🗜️" : "📄", []), Qe = v((g, w, k) => {
    if (!T.current) return;
    const P = `${g},${w},${k}`, Y = ke.executeCommand("INSERT_TABLE", P, T.current);
    Y.success ? (G("Table inserted"), setTimeout(() => {
      if (T.current) {
        const se = T.current.innerHTML;
        u(se), t == null || t(se), X();
      }
    }, 0)) : (console.warn("Table insertion failed:", Y.error), G("Table insertion failed")), I(!1);
  }, [t, X, G]), et = v((g) => {
    if (!T.current) return;
    const w = ke.executeCommand("INSERT_SPECIAL_CHAR", g, T.current);
    w.success ? (G(`Special character ${g} inserted`), setTimeout(() => {
      if (T.current) {
        const k = T.current.innerHTML;
        u(k), t == null || t(k), X();
      }
    }, 0)) : (console.warn("Special character insertion failed:", w.error), G("Special character insertion failed")), M(!1);
  }, [t, X, G]), at = v((g) => {
    if (!T.current) return;
    if (S && ue === "create") {
      const P = window.getSelection();
      P && (P.removeAllRanges(), P.addRange(S), T.current.focus());
    }
    const w = ue === "create" ? "CREATE_LINK" : "EDIT_LINK", k = ke.executeCommand(w, g, T.current);
    k.success ? (G(`Link ${ue === "create" ? "created" : "updated"}`), setTimeout(() => {
      if (T.current) {
        const Y = T.current.innerHTML;
        u(Y), t == null || t(Y), X();
      }
    }, 0)) : Ue("Error", k.error || "Failed to create link", "error"), U(null), be(""), ie(!1);
  }, [ue, S, t, X, G]), st = v((g, w) => {
    if (!T.current) return;
    const k = T.current.innerHTML, P = k.replace(new RegExp(g, "gi"), w);
    if (k !== P) {
      T.current.innerHTML = P, u(P), t == null || t(P);
      const Y = (k.match(new RegExp(g, "gi")) || []).length;
      Ue("Find & Replace", `Replaced ${Y} occurrence(s)`, "success"), G(`Replaced ${Y} occurrences`);
    } else
      Ue("Find & Replace", "No matches found", "info");
  }, [t, G]), Ue = v((g, w, k = "info") => {
    we({ title: g, message: w, type: k }), Fe(!0);
  }, []), lt = v((g, w) => {
    g.preventDefault(), g.stopPropagation();
    const k = w.getBoundingClientRect(), P = {
      x: k.left,
      y: k.bottom + 5
      // Position below the link
    };
    Oe({
      url: w.href,
      text: w.textContent || "",
      position: P,
      element: w
    }), ae(!0);
  }, []), ct = v(() => {
    te.element && (be(te.element.href), ge("edit"), ie(!0), ae(!1));
  }, [te.element]), dt = v(() => {
    var g;
    if (te.element) {
      const w = te.element.textContent || "", k = document.createTextNode(w);
      if ((g = te.element.parentNode) == null || g.replaceChild(k, te.element), T.current) {
        const P = T.current.innerHTML;
        u(P), t == null || t(P);
      }
      G("Link removed"), ae(!1);
    }
  }, [te.element, t, G]), ut = v(() => {
    te.url && (window.open(te.url, "_blank", "noopener,noreferrer"), ae(!1));
  }, [te.url]), We = v(() => {
    ae(!1);
  }, []), Pe = v((g, w, k = !1) => {
    if (!T.current) return;
    const P = window.getSelection();
    let Y = null;
    if (P && P.rangeCount > 0) {
      const re = P.getRangeAt(0);
      typeof re.cloneRange == "function" && (Y = re.cloneRange());
    }
    if (g === "insertImage") {
      E(!0);
      return;
    }
    if (g === "uploadFile") {
      $(!0);
      return;
    }
    if (g === "insertTable") {
      I(!0);
      return;
    }
    if (g === "insertSpecialChar") {
      M(!0);
      return;
    }
    if (g === "createLink") {
      U(Y), ge("create"), be(""), ie(!0);
      return;
    }
    if (g === "editLink") {
      const re = window.getSelection();
      let ne = null;
      if (re && re.rangeCount > 0) {
        const ce = re.getRangeAt(0), he = (o) => {
          var p;
          if (o.nodeType === Node.TEXT_NODE)
            return ((p = o.parentElement) == null ? void 0 : p.closest("a")) || null;
          if (o.nodeType === Node.ELEMENT_NODE) {
            const x = o;
            return x.tagName === "A" ? x : x.closest("a") || null;
          }
          return null;
        };
        if (ne = he(ce.startContainer), !ne && !re.isCollapsed) {
          const o = he(ce.endContainer);
          o && (ne = o);
        }
        if (ne || (ne = he(ce.commonAncestorContainer)), !ne && T.current) {
          const o = T.current.querySelectorAll("a[href]");
          for (const p of Array.from(o))
            if (ce.intersectsNode(p)) {
              ne = p;
              break;
            }
        }
      }
      if (!ne && T.current) {
        const ce = T.current.querySelectorAll("a[href]");
        ce.length === 1 && (ne = ce[0]);
      }
      if (ne && ne.href) {
        be(ne.href), ge("edit"), ie(!0);
        return;
      }
      Ue("Edit Link", "Please place your cursor on a link to edit it, or select the link text first", "info");
      return;
    }
    if (g === "findReplace") {
      ve(!0);
      return;
    }
    let le = {
      bold: "BOLD",
      italic: "ITALIC",
      underline: "UNDERLINE",
      strikethrough: "STRIKETHROUGH",
      subscript: "SUBSCRIPT",
      superscript: "SUPERSCRIPT",
      formatBlock: "FORMAT_H1",
      // Will be handled specially
      fontSize: "FONT_SIZE",
      fontName: "FONT_NAME",
      fontColor: "FONT_COLOR",
      backgroundColor: "BACKGROUND_COLOR",
      insertUnorderedList: "INSERT_UNORDERED_LIST",
      insertOrderedList: "INSERT_ORDERED_LIST",
      indent: "INDENT",
      outdent: "OUTDENT",
      justifyLeft: "JUSTIFY_LEFT",
      justifyCenter: "JUSTIFY_CENTER",
      justifyRight: "JUSTIFY_RIGHT",
      justifyFull: "JUSTIFY_FULL",
      createLink: "CREATE_LINK",
      editLink: "EDIT_LINK",
      unlink: "UNLINK",
      insertHorizontalRule: "INSERT_HORIZONTAL_RULE",
      findReplace: "FIND_REPLACE",
      sourceCode: "SOURCE_CODE",
      fullscreen: "FULLSCREEN",
      print: "PRINT",
      spellCheck: "SPELL_CHECK",
      undo: "UNDO",
      redo: "REDO",
      removeFormat: "REMOVE_FORMAT"
    }[g];
    if (g === "formatBlock" && w && (le = `FORMAT_${w}`), le) {
      const re = ke.executeCommand(le, w, T.current);
      if (re.success) {
        const ne = Le(g, w), he = j.has(le) ? "removed" : "applied";
        G(`${ne} ${he}`), setTimeout(() => {
          if (T.current) {
            const o = T.current.innerHTML;
            u(o), t == null || t(o), X();
          }
        }, 0);
      } else
        console.warn("Command execution failed:", re.error), G("Command failed");
    }
  }, [t, X, j, Le, G]), Ce = v((g) => {
    if (!y) return;
    const { ctrlKey: w, metaKey: k, key: P, shiftKey: Y } = g;
    if (!(w || k)) return;
    const re = {
      b: { command: "bold" },
      i: { command: "italic" },
      u: { command: "underline" },
      k: { command: "createLink" },
      z: { command: Y ? "redo" : "undo" },
      y: { command: "redo" },
      1: { command: "formatBlock", value: "H1" },
      2: { command: "formatBlock", value: "H2" },
      3: { command: "formatBlock", value: "H3" },
      l: { command: Y ? "insertOrderedList" : "justifyLeft" },
      e: { command: "justifyCenter" },
      r: { command: "justifyRight" },
      "\\": { command: "removeFormat" }
    }[P.toLowerCase()];
    re && (g.preventDefault(), Pe(re.command, re.value, !0));
  }, [y, Pe]), Ke = v((g) => {
    u(g), t == null || t(g), setTimeout(X, 0);
  }, [t, X]), Ge = v((g) => {
    X();
  }, [X]), tt = v(() => {
    C(!0), n == null || n(), setTimeout(X, 0);
  }, [n, X]), mt = v(() => {
    C(!1), i == null || i();
  }, [i]);
  fe(() => {
    y && X();
  }, [y, X]), fe(() => {
    Be(), rt();
  }, [b, Be]);
  const rt = v(() => {
    if (!T.current) return;
    T.current.querySelectorAll("a[href]").forEach((w) => {
      const k = w;
      k.hasAttribute("target") || k.setAttribute("target", "_blank"), k.hasAttribute("rel") || k.setAttribute("rel", "noopener noreferrer");
    });
  }, []);
  return fe(() => {
    const g = (w) => {
      const k = w.target;
      !k.closest("img.editor-image") && !k.closest(".image-manager") && A(null);
    };
    return document.addEventListener("click", g), () => document.removeEventListener("click", g);
  }, []), fe(() => {
    if (!T.current) return;
    const g = T.current, w = (P) => {
      P.preventDefault(), P.dataTransfer.dropEffect = "move";
    }, k = (P) => {
      var se;
      P.preventDefault();
      const Y = (se = P.dataTransfer) == null ? void 0 : se.getData("text/html");
      if (Y && Y.includes("<img")) {
        const le = window.getSelection();
        if (le && le.rangeCount > 0) {
          const re = le.getRangeAt(0), ne = document.createElement("div");
          ne.innerHTML = Y;
          const ce = ne.querySelector("img");
          if (ce) {
            const he = g.querySelector(`img[src="${ce.src}"]`);
            he && he !== ce && he.remove(), re.deleteContents(), re.insertNode(ce);
            const o = g.innerHTML;
            u(o), t == null || t(o);
          }
        }
      }
    };
    return g.addEventListener("dragover", w), g.addEventListener("drop", k), () => {
      g.removeEventListener("dragover", w), g.removeEventListener("drop", k);
    };
  }, [t]), /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "wysiwyg-editor",
      onKeyDown: Ce,
      role: "application",
      "aria-label": "Rich text editor with keyboard shortcuts",
      children: [
        /* @__PURE__ */ r.jsx(
          Pt,
          {
            onCommand: Pe,
            activeFormats: j,
            canUndo: q,
            canRedo: _,
            toolbarConfig: Te,
            showConfigDropdown: l,
            configOptions: d,
            selectedConfigKey: c,
            onConfigChange: m
          }
        ),
        /* @__PURE__ */ r.jsx(
          Yt,
          {
            content: b,
            placeholder: e,
            onContentChange: Ke,
            onFocus: tt,
            onBlur: mt,
            editorRef: T,
            onSelectionChange: Ge,
            onLinkClick: lt,
            height: f
          }
        ),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            ref: xe,
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "sr-only",
            role: "status"
          }
        ),
        /* @__PURE__ */ r.jsx("div", { className: "sr-only", id: "keyboard-shortcuts-help", children: "Keyboard shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline, Ctrl+K for link, Ctrl+Z for undo, Ctrl+Y for redo, Ctrl+1/2/3 for headings, Ctrl+L for left align, Ctrl+E for center align, Ctrl+R for right align, Ctrl+Shift+L for numbered list, Ctrl+\\ for clear formatting" }),
        /* @__PURE__ */ r.jsx(
          qt,
          {
            isOpen: h,
            onClose: () => E(!1),
            onImageInsert: ot
          }
        ),
        /* @__PURE__ */ r.jsx(
          Vt,
          {
            isOpen: H,
            onClose: () => $(!1),
            onFileSelect: Ze,
            accept: "*/*",
            maxSize: 10 * 1024 * 1024,
            title: "Upload File",
            description: "Select a file to upload"
          }
        ),
        /* @__PURE__ */ r.jsx(
          Xt,
          {
            isOpen: B,
            onClose: () => I(!1),
            onInsert: Qe
          }
        ),
        /* @__PURE__ */ r.jsx(
          Zt,
          {
            isOpen: W,
            onClose: () => M(!1),
            onInsert: et
          }
        ),
        /* @__PURE__ */ r.jsx(
          Qt,
          {
            isOpen: oe,
            onClose: () => ie(!1),
            onSubmit: at,
            title: ue === "create" ? "Insert Link" : "Edit Link",
            placeholder: "https://example.com",
            initialValue: Ae,
            description: ue === "create" ? "Enter the URL for the link" : "Update the URL for this link"
          }
        ),
        /* @__PURE__ */ r.jsx(
          er,
          {
            isOpen: ye,
            onClose: () => ve(!1),
            onFindReplace: st
          }
        ),
        /* @__PURE__ */ r.jsx(
          tr,
          {
            isOpen: _e,
            onClose: () => Fe(!1),
            title: Ee.title,
            message: Ee.message,
            type: Ee.type
          }
        ),
        /* @__PURE__ */ r.jsx(
          rr,
          {
            isOpen: Z,
            linkUrl: te.url,
            linkText: te.text,
            position: te.position,
            onEdit: ct,
            onRemove: dt,
            onGoToLink: ut,
            onClose: We
          }
        ),
        J && /* @__PURE__ */ r.jsx(
          Jt,
          {
            imageElement: J,
            onUpdate: Je,
            onRemove: Xe
          }
        )
      ]
    }
  );
}, or = [
  // Basic text formatting
  { command: "bold", icon: "B", title: "Bold" },
  { command: "italic", icon: "I", title: "Italic" },
  { command: "underline", icon: "U", title: "Underline" },
  // Heading formatting
  { command: "formatBlock", value: "H1", icon: "H1", title: "Heading 1" },
  { command: "formatBlock", value: "H2", icon: "H2", title: "Heading 2" },
  { command: "formatBlock", value: "H3", icon: "H3", title: "Heading 3" },
  // List formatting
  { command: "insertUnorderedList", icon: "•", title: "Bullet List" },
  { command: "insertOrderedList", icon: "1.", title: "Numbered List" },
  // Text alignment
  { command: "justifyLeft", icon: "⬅", title: "Align Left" },
  { command: "justifyCenter", icon: "⬌", title: "Align Center" },
  { command: "justifyRight", icon: "➡", title: "Align Right" },
  // Link management
  { command: "createLink", icon: "🔗", title: "Insert Link" },
  { command: "editLink", icon: "✏️🔗", title: "Edit Link" },
  { command: "unlink", icon: "🔗✕", title: "Remove Link" },
  // Media insertion
  { command: "insertImage", icon: "🖼️", title: "Insert Image" },
  { command: "uploadFile", icon: "📎", title: "Upload File" },
  // History management
  { command: "undo", icon: "↶", title: "Undo" },
  { command: "redo", icon: "↷", title: "Redo" },
  // Format clearing
  { command: "removeFormat", icon: "✕", title: "Clear Formatting" }
], ir = {
  // Basic formatting
  bold: { command: "bold", icon: "B", title: "Bold" },
  italic: { command: "italic", icon: "I", title: "Italic" },
  underline: { command: "underline", icon: "U", title: "Underline" },
  strikethrough: { command: "strikethrough", icon: "S̶", title: "Strikethrough" },
  subscript: { command: "subscript", icon: "X₂", title: "Subscript" },
  superscript: { command: "superscript", icon: "X²", title: "Superscript" },
  // Headings
  h1: { command: "formatBlock", value: "H1", icon: "H1", title: "Heading 1" },
  h2: { command: "formatBlock", value: "H2", icon: "H2", title: "Heading 2" },
  h3: { command: "formatBlock", value: "H3", icon: "H3", title: "Heading 3" },
  h4: { command: "formatBlock", value: "H4", icon: "H4", title: "Heading 4" },
  h5: { command: "formatBlock", value: "H5", icon: "H5", title: "Heading 5" },
  h6: { command: "formatBlock", value: "H6", icon: "H6", title: "Heading 6" },
  // Lists
  bulletList: { command: "insertUnorderedList", icon: "•", title: "Bullet List" },
  numberedList: { command: "insertOrderedList", icon: "1.", title: "Numbered List" },
  indent: { command: "indent", icon: "⇥", title: "Increase Indent" },
  outdent: { command: "outdent", icon: "⇤", title: "Decrease Indent" },
  // Alignment
  alignLeft: { command: "justifyLeft", icon: "⬅", title: "Align Left" },
  alignCenter: { command: "justifyCenter", icon: "⬌", title: "Align Center" },
  alignRight: { command: "justifyRight", icon: "➡", title: "Align Right" },
  alignJustify: { command: "justifyFull", icon: "⬌", title: "Justify" },
  // Media
  image: { command: "insertImage", icon: "🖼️", title: "Insert Image" },
  file: { command: "uploadFile", icon: "📎", title: "Upload File" },
  table: { command: "insertTable", icon: "⊞", title: "Insert Table" },
  // Links
  link: { command: "createLink", icon: "🔗", title: "Insert Link" },
  unlink: { command: "unlink", icon: "🔗✕", title: "Remove Link" },
  // Advanced formatting (simplified for basic toolbar)
  fontColor: { command: "fontColor", icon: "A", title: "Text Color" },
  backgroundColor: { command: "backgroundColor", icon: "🎨", title: "Background Color" },
  fontSize: { command: "fontSize", icon: "🔤", title: "Font Size" },
  fontFamily: { command: "fontName", icon: "Aa", title: "Font Family" },
  specialChar: { command: "insertSpecialChar", icon: "Ω", title: "Special Characters" },
  horizontalRule: { command: "insertHorizontalRule", icon: "―", title: "Horizontal Rule" },
  // Tools
  findReplace: { command: "findReplace", icon: "🔍", title: "Find & Replace" },
  sourceCode: { command: "sourceCode", icon: "</>", title: "Source Code" },
  fullscreen: { command: "fullscreen", icon: "⛶", title: "Fullscreen" },
  print: { command: "print", icon: "🖨️", title: "Print" },
  undo: { command: "undo", icon: "↶", title: "Undo" },
  redo: { command: "redo", icon: "↷", title: "Redo" },
  removeFormat: { command: "removeFormat", icon: "🧹", title: "Clear Formatting" }
}, ar = Rt(({
  button: a,
  isActive: e,
  isDisabled: t,
  ariaLabel: n,
  buttonId: i,
  onButtonClick: s,
  onKeyDown: l
}) => /* @__PURE__ */ r.jsx(
  "button",
  {
    id: i,
    className: `toolbar-button ${e ? "active" : ""}`,
    title: a.title,
    "aria-label": n,
    "aria-pressed": e,
    disabled: t,
    tabIndex: t ? -1 : 0,
    onClick: () => s(a),
    onKeyDown: (d) => l(d, a),
    onMouseDown: (d) => {
      d.preventDefault();
    },
    children: /* @__PURE__ */ r.jsx("span", { "aria-hidden": "true", children: a.icon })
  },
  i
)), fr = ({
  onCommand: a,
  activeFormats: e,
  canUndo: t,
  canRedo: n,
  toolbarConfig: i
}) => {
  const s = nt(() => {
    if (i) {
      const u = [], y = i.enabledButtons;
      for (const C of i.groups)
        for (const j of C.buttons)
          if (y.has(j)) {
            const N = ir[j];
            N && u.push(N);
          }
      return u;
    }
    return or;
  }, [i]), l = v((u) => {
    a(u.command, u.value);
  }, [a]), d = v((u, y) => {
    (u.key === "Enter" || u.key === " ") && (u.preventDefault(), l(y));
  }, [l]), c = v((u, y) => {
    const C = {
      bold: "BOLD",
      italic: "ITALIC",
      underline: "UNDERLINE",
      strikethrough: "STRIKETHROUGH",
      subscript: "SUBSCRIPT",
      superscript: "SUPERSCRIPT",
      insertUnorderedList: "INSERT_UNORDERED_LIST",
      insertOrderedList: "INSERT_ORDERED_LIST",
      justifyLeft: "JUSTIFY_LEFT",
      justifyCenter: "JUSTIFY_CENTER",
      justifyRight: "JUSTIFY_RIGHT",
      justifyFull: "JUSTIFY_FULL",
      createLink: "CREATE_LINK",
      editLink: "EDIT_LINK",
      unlink: "UNLINK"
    };
    if (u === "formatBlock" && y) {
      const N = `FORMAT_${y}`;
      return e.has(N);
    }
    const j = C[u];
    return j ? e.has(j) : !1;
  }, [e]), m = v((u) => u === "undo" ? !t : u === "redo" ? !n : !1, [t, n]), f = (u) => {
    const y = c(u.command, u.value), C = m(u.command);
    let j = u.title;
    const N = {
      bold: "Ctrl+B",
      italic: "Ctrl+I",
      underline: "Ctrl+U",
      createLink: "Ctrl+K",
      undo: "Ctrl+Z",
      redo: "Ctrl+Y",
      removeFormat: "Ctrl+\\"
    };
    if (u.command === "formatBlock" && u.value) {
      const _ = u.value.replace("H", "");
      N[`${u.command}-${u.value}`] = `Ctrl+${_}`;
    }
    u.command === "justifyLeft" && (N[u.command] = "Ctrl+L"), u.command === "justifyCenter" && (N[u.command] = "Ctrl+E"), u.command === "justifyRight" && (N[u.command] = "Ctrl+R"), u.command === "insertOrderedList" && (N[u.command] = "Ctrl+Shift+L");
    const q = u.value ? `${u.command}-${u.value}` : u.command, D = N[q];
    return D && (j += `, keyboard shortcut ${D}`), C ? j += ", disabled" : y && (j += ", currently active"), j;
  }, b = (u, y) => `toolbar-${u.value ? `${u.command}-${u.value}` : u.command}-${y}`;
  return /* @__PURE__ */ r.jsx(
    "div",
    {
      className: "toolbar",
      role: "toolbar",
      "aria-label": "Text formatting toolbar",
      children: s.map((u, y) => {
        const C = b(u, y), j = c(u.command, u.value), N = m(u.command), q = f(u);
        return /* @__PURE__ */ r.jsx(
          ar,
          {
            button: u,
            isActive: j,
            isDisabled: N,
            ariaLabel: q,
            buttonId: C,
            onButtonClick: l,
            onKeyDown: d
          },
          C
        );
      })
    }
  );
}, pr = {
  allowedTags: ["p", "br", "strong", "em", "u", "h1", "h2", "h3", "ul", "ol", "li", "a"],
  allowedAttributes: {
    a: ["href", "title"],
    "*": ["style"]
    // Limited style attributes only
  }
};
export {
  Pt as AdvancedToolbar,
  nr as COMMANDS,
  ht as CommandExecutor,
  Kt as ContentSanitizer,
  pr as DEFAULT_SANITIZATION_CONFIG,
  Yt as EditableArea,
  qt as ImageUploadCropModal,
  fr as Toolbar,
  bt as ToolbarConfigResolver,
  mr as WYSIWYGEditor,
  Gt as contentSanitizer,
  mr as default,
  ur as focusEditor,
  zt as focusEditorWithSelection,
  Ht as getActiveFormats,
  Mt as getCurrentBlockFormat,
  Et as getCurrentSelection,
  $t as isSelectionInEditor,
  wt as restoreSelection,
  dr as saveSelection
};
//# sourceMappingURL=wysiwyg-editor.es.js.map
