var Rt = Object.defineProperty;
var kt = (s, e, t) => e in s ? Rt(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var dt = (s, e, t) => kt(s, typeof e != "symbol" ? e + "" : e, t);
import xt, { useState as E, useRef as ke, useEffect as le, useCallback as L } from "react";
import Et, { centerCrop as Lt, makeAspectCrop as wt } from "react-image-crop";
var mt = { exports: {} }, Ue = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pt;
function Tt() {
  if (pt) return Ue;
  pt = 1;
  var s = xt, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, l = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(u, d, p) {
    var c, h = {}, v = null, x = null;
    p !== void 0 && (v = "" + p), d.key !== void 0 && (v = "" + d.key), d.ref !== void 0 && (x = d.ref);
    for (c in d) o.call(d, c) && !i.hasOwnProperty(c) && (h[c] = d[c]);
    if (u && u.defaultProps) for (c in d = u.defaultProps, d) h[c] === void 0 && (h[c] = d[c]);
    return { $$typeof: e, type: u, key: v, ref: x, props: h, _owner: l.current };
  }
  return Ue.Fragment = t, Ue.jsx = a, Ue.jsxs = a, Ue;
}
var Me = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gt;
function Nt() {
  return gt || (gt = 1, process.env.NODE_ENV !== "production" && function() {
    var s = xt, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), _ = Symbol.iterator, g = "@@iterator";
    function j(n) {
      if (n === null || typeof n != "object")
        return null;
      var m = _ && n[_] || n[g];
      return typeof m == "function" ? m : null;
    }
    var D = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(n) {
      {
        for (var m = arguments.length, b = new Array(m > 1 ? m - 1 : 0), T = 1; T < m; T++)
          b[T - 1] = arguments[T];
        S("error", n, b);
      }
    }
    function S(n, m, b) {
      {
        var T = D.ReactDebugCurrentFrame, M = T.getStackAddendum();
        M !== "" && (m += "%s", b = b.concat([M]));
        var z = b.map(function(F) {
          return String(F);
        });
        z.unshift("Warning: " + m), Function.prototype.apply.call(console[n], console, z);
      }
    }
    var U = !1, k = !1, w = !1, G = !1, q = !1, I;
    I = Symbol.for("react.module.reference");
    function P(n) {
      return !!(typeof n == "string" || typeof n == "function" || n === o || n === i || q || n === l || n === p || n === c || G || n === x || U || k || w || typeof n == "object" && n !== null && (n.$$typeof === v || n.$$typeof === h || n.$$typeof === a || n.$$typeof === u || n.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      n.$$typeof === I || n.getModuleId !== void 0));
    }
    function H(n, m, b) {
      var T = n.displayName;
      if (T)
        return T;
      var M = m.displayName || m.name || "";
      return M !== "" ? b + "(" + M + ")" : b;
    }
    function Y(n) {
      return n.displayName || "Context";
    }
    function W(n) {
      if (n == null)
        return null;
      if (typeof n.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
        return n.displayName || n.name || null;
      if (typeof n == "string")
        return n;
      switch (n) {
        case o:
          return "Fragment";
        case t:
          return "Portal";
        case i:
          return "Profiler";
        case l:
          return "StrictMode";
        case p:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case u:
            var m = n;
            return Y(m) + ".Consumer";
          case a:
            var b = n;
            return Y(b._context) + ".Provider";
          case d:
            return H(n, n.render, "ForwardRef");
          case h:
            var T = n.displayName || null;
            return T !== null ? T : W(n.type) || "Memo";
          case v: {
            var M = n, z = M._payload, F = M._init;
            try {
              return W(F(z));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var X = Object.assign, ae = 0, ue, ce, Ee, Pe, he, He, Ne;
    function Be() {
    }
    Be.__reactDisabledLog = !0;
    function $e() {
      {
        if (ae === 0) {
          ue = console.log, ce = console.info, Ee = console.warn, Pe = console.error, he = console.group, He = console.groupCollapsed, Ne = console.groupEnd;
          var n = {
            configurable: !0,
            enumerable: !0,
            value: Be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: n,
            log: n,
            warn: n,
            error: n,
            group: n,
            groupCollapsed: n,
            groupEnd: n
          });
        }
        ae++;
      }
    }
    function Se() {
      {
        if (ae--, ae === 0) {
          var n = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: X({}, n, {
              value: ue
            }),
            info: X({}, n, {
              value: ce
            }),
            warn: X({}, n, {
              value: Ee
            }),
            error: X({}, n, {
              value: Pe
            }),
            group: X({}, n, {
              value: he
            }),
            groupCollapsed: X({}, n, {
              value: He
            }),
            groupEnd: X({}, n, {
              value: Ne
            })
          });
        }
        ae < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = D.ReactCurrentDispatcher, xe;
    function be(n, m, b) {
      {
        if (xe === void 0)
          try {
            throw Error();
          } catch (M) {
            var T = M.stack.trim().match(/\n( *(at )?)/);
            xe = T && T[1] || "";
          }
        return `
` + xe + n;
      }
    }
    var je = !1, fe;
    {
      var te = typeof WeakMap == "function" ? WeakMap : Map;
      fe = new te();
    }
    function ze(n, m) {
      if (!n || je)
        return "";
      {
        var b = fe.get(n);
        if (b !== void 0)
          return b;
      }
      var T;
      je = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var z;
      z = Ie.current, Ie.current = null, $e();
      try {
        if (m) {
          var F = function() {
            throw Error();
          };
          if (Object.defineProperty(F.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(F, []);
            } catch (ie) {
              T = ie;
            }
            Reflect.construct(n, [], F);
          } else {
            try {
              F.call();
            } catch (ie) {
              T = ie;
            }
            n.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ie) {
            T = ie;
          }
          n();
        }
      } catch (ie) {
        if (ie && T && typeof ie.stack == "string") {
          for (var A = ie.stack.split(`
`), se = T.stack.split(`
`), J = A.length - 1, V = se.length - 1; J >= 1 && V >= 0 && A[J] !== se[V]; )
            V--;
          for (; J >= 1 && V >= 0; J--, V--)
            if (A[J] !== se[V]) {
              if (J !== 1 || V !== 1)
                do
                  if (J--, V--, V < 0 || A[J] !== se[V]) {
                    var de = `
` + A[J].replace(" at new ", " at ");
                    return n.displayName && de.includes("<anonymous>") && (de = de.replace("<anonymous>", n.displayName)), typeof n == "function" && fe.set(n, de), de;
                  }
                while (J >= 1 && V >= 0);
              break;
            }
        }
      } finally {
        je = !1, Ie.current = z, Se(), Error.prepareStackTrace = M;
      }
      var Te = n ? n.displayName || n.name : "", Ce = Te ? be(Te) : "";
      return typeof n == "function" && fe.set(n, Ce), Ce;
    }
    function N(n, m, b) {
      return ze(n, !1);
    }
    function ye(n) {
      var m = n.prototype;
      return !!(m && m.isReactComponent);
    }
    function K(n, m, b) {
      if (n == null)
        return "";
      if (typeof n == "function")
        return ze(n, ye(n));
      if (typeof n == "string")
        return be(n);
      switch (n) {
        case p:
          return be("Suspense");
        case c:
          return be("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case d:
            return N(n.render);
          case h:
            return K(n.type, m, b);
          case v: {
            var T = n, M = T._payload, z = T._init;
            try {
              return K(z(M), m, b);
            } catch {
            }
          }
        }
      return "";
    }
    var B = Object.prototype.hasOwnProperty, _e = {}, We = D.ReactDebugCurrentFrame;
    function Le(n) {
      if (n) {
        var m = n._owner, b = K(n.type, n._source, m ? m.type : null);
        We.setExtraStackFrame(b);
      } else
        We.setExtraStackFrame(null);
    }
    function Ae(n, m, b, T, M) {
      {
        var z = Function.call.bind(B);
        for (var F in n)
          if (z(n, F)) {
            var A = void 0;
            try {
              if (typeof n[F] != "function") {
                var se = Error((T || "React class") + ": " + b + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw se.name = "Invariant Violation", se;
              }
              A = n[F](m, F, T, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (J) {
              A = J;
            }
            A && !(A instanceof Error) && (Le(M), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", T || "React class", b, F, typeof A), Le(null)), A instanceof Error && !(A.message in _e) && (_e[A.message] = !0, Le(M), R("Failed %s type: %s", b, A.message), Le(null));
          }
      }
    }
    var Ke = Array.isArray;
    function Oe(n) {
      return Ke(n);
    }
    function Qe(n) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, b = m && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return b;
      }
    }
    function et(n) {
      try {
        return qe(n), !1;
      } catch {
        return !0;
      }
    }
    function qe(n) {
      return "" + n;
    }
    function Ye(n) {
      if (et(n))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(n)), qe(n);
    }
    var Ge = D.ReactCurrentOwner, tt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Je, Ve;
    function rt(n) {
      if (B.call(n, "ref")) {
        var m = Object.getOwnPropertyDescriptor(n, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return n.ref !== void 0;
    }
    function we(n) {
      if (B.call(n, "key")) {
        var m = Object.getOwnPropertyDescriptor(n, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return n.key !== void 0;
    }
    function nt(n, m) {
      typeof n.ref == "string" && Ge.current;
    }
    function ot(n, m) {
      {
        var b = function() {
          Je || (Je = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        b.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function st(n, m) {
      {
        var b = function() {
          Ve || (Ve = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        b.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var at = function(n, m, b, T, M, z, F) {
      var A = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: n,
        key: m,
        ref: b,
        props: F,
        // Record the component responsible for creating this element.
        _owner: z
      };
      return A._store = {}, Object.defineProperty(A._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(A, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: T
      }), Object.defineProperty(A, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.freeze && (Object.freeze(A.props), Object.freeze(A)), A;
    };
    function it(n, m, b, T, M) {
      {
        var z, F = {}, A = null, se = null;
        b !== void 0 && (Ye(b), A = "" + b), we(m) && (Ye(m.key), A = "" + m.key), rt(m) && (se = m.ref, nt(m, M));
        for (z in m)
          B.call(m, z) && !tt.hasOwnProperty(z) && (F[z] = m[z]);
        if (n && n.defaultProps) {
          var J = n.defaultProps;
          for (z in J)
            F[z] === void 0 && (F[z] = J[z]);
        }
        if (A || se) {
          var V = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          A && ot(F, V), se && st(F, V);
        }
        return at(n, A, se, M, T, Ge.current, F);
      }
    }
    var ve = D.ReactCurrentOwner, Xe = D.ReactDebugCurrentFrame;
    function pe(n) {
      if (n) {
        var m = n._owner, b = K(n.type, n._source, m ? m.type : null);
        Xe.setExtraStackFrame(b);
      } else
        Xe.setExtraStackFrame(null);
    }
    var Fe;
    Fe = !1;
    function De(n) {
      return typeof n == "object" && n !== null && n.$$typeof === e;
    }
    function Ze() {
      {
        if (ve.current) {
          var n = W(ve.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
    }
    function lt(n) {
      return "";
    }
    var f = {};
    function C(n) {
      {
        var m = Ze();
        if (!m) {
          var b = typeof n == "string" ? n : n.displayName || n.name;
          b && (m = `

Check the top-level render call using <` + b + ">.");
        }
        return m;
      }
    }
    function y(n, m) {
      {
        if (!n._store || n._store.validated || n.key != null)
          return;
        n._store.validated = !0;
        var b = C(m);
        if (f[b])
          return;
        f[b] = !0;
        var T = "";
        n && n._owner && n._owner !== ve.current && (T = " It was passed a child from " + W(n._owner.type) + "."), pe(n), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, T), pe(null);
      }
    }
    function O(n, m) {
      {
        if (typeof n != "object")
          return;
        if (Oe(n))
          for (var b = 0; b < n.length; b++) {
            var T = n[b];
            De(T) && y(T, m);
          }
        else if (De(n))
          n._store && (n._store.validated = !0);
        else if (n) {
          var M = j(n);
          if (typeof M == "function" && M !== n.entries)
            for (var z = M.call(n), F; !(F = z.next()).done; )
              De(F.value) && y(F.value, m);
        }
      }
    }
    function $(n) {
      {
        var m = n.type;
        if (m == null || typeof m == "string")
          return;
        var b;
        if (typeof m == "function")
          b = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === h))
          b = m.propTypes;
        else
          return;
        if (b) {
          var T = W(m);
          Ae(b, n.props, "prop", T, n);
        } else if (m.PropTypes !== void 0 && !Fe) {
          Fe = !0;
          var M = W(m);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function re(n) {
      {
        for (var m = Object.keys(n.props), b = 0; b < m.length; b++) {
          var T = m[b];
          if (T !== "children" && T !== "key") {
            pe(n), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", T), pe(null);
            break;
          }
        }
        n.ref !== null && (pe(n), R("Invalid attribute `ref` supplied to `React.Fragment`."), pe(null));
      }
    }
    var ne = {};
    function Q(n, m, b, T, M, z) {
      {
        var F = P(n);
        if (!F) {
          var A = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (A += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var se = lt();
          se ? A += se : A += Ze();
          var J;
          n === null ? J = "null" : Oe(n) ? J = "array" : n !== void 0 && n.$$typeof === e ? (J = "<" + (W(n.type) || "Unknown") + " />", A = " Did you accidentally export a JSX literal instead of a component?") : J = typeof n, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, A);
        }
        var V = it(n, m, b, M, z);
        if (V == null)
          return V;
        if (F) {
          var de = m.children;
          if (de !== void 0)
            if (T)
              if (Oe(de)) {
                for (var Te = 0; Te < de.length; Te++)
                  O(de[Te], n);
                Object.freeze && Object.freeze(de);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              O(de, n);
        }
        if (B.call(m, "key")) {
          var Ce = W(n), ie = Object.keys(m).filter(function(Ct) {
            return Ct !== "key";
          }), ct = ie.length > 0 ? "{key: someKey, " + ie.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ne[Ce + ct]) {
            var vt = ie.length > 0 ? "{" + ie.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ct, Ce, vt, Ce), ne[Ce + ct] = !0;
          }
        }
        return n === o ? re(V) : $(V), V;
      }
    }
    function Z(n, m, b) {
      return Q(n, m, b, !0);
    }
    function oe(n, m, b) {
      return Q(n, m, b, !1);
    }
    var me = oe, ee = Z;
    Me.Fragment = o, Me.jsx = me, Me.jsxs = ee;
  }()), Me;
}
process.env.NODE_ENV === "production" ? mt.exports = Tt() : mt.exports = Nt();
var r = mt.exports;
const St = [
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
], It = [
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
], jt = ({
  onCommand: s,
  activeFormats: e,
  canUndo: t,
  canRedo: o
}) => {
  const [l, i] = E(null), [a, u] = E(null), d = ke({});
  le(() => {
    const g = (j) => {
      const D = j.target;
      !D.closest(".toolbar-dropdown") && !D.closest(".toolbar-color-picker") && !D.closest(".toolbar-button") && (i(null), u(null));
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, []);
  const p = (g) => {
    g.type === "dropdown" ? (i(l === g.command ? null : g.command), u(null)) : g.type === "color" ? (u(a === g.command ? null : g.command), i(null)) : (s(g.command, g.value), i(null), u(null));
  }, c = (g, j) => {
    s(g, j), i(null);
  }, h = (g, j) => {
    s(g, j), u(null);
  }, v = (g, j) => {
    const D = {
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
    if (g === "formatBlock" && j) {
      const S = `FORMAT_${j}`;
      return e.has(S);
    }
    const R = D[g];
    return R ? e.has(R) : !1;
  }, x = (g) => g === "undo" ? !t : g === "redo" ? !o : !1, _ = (g, j, D) => {
    var k;
    if (g.type === "separator")
      return /* @__PURE__ */ r.jsx("div", { className: "toolbar-separator" }, `${j}-sep-${D}`);
    const R = v(g.command, g.value), S = x(g.command), U = `${j}-${g.command}-${D}`;
    return /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ r.jsxs(
        "button",
        {
          className: `toolbar-button ${R ? "active" : ""} ${g.type === "dropdown" || g.type === "color" ? "dropdown" : ""}`,
          title: g.title,
          "aria-label": g.title,
          disabled: S,
          onClick: () => p(g),
          onMouseDown: (w) => w.preventDefault(),
          children: [
            /* @__PURE__ */ r.jsx("span", { className: "button-icon", "aria-hidden": "true", children: g.icon }),
            (g.type === "dropdown" || g.type === "color") && /* @__PURE__ */ r.jsx("span", { className: "dropdown-arrow", children: "▼" })
          ]
        }
      ),
      g.type === "dropdown" && l === g.command && /* @__PURE__ */ r.jsx(
        "div",
        {
          ref: (w) => d.current[g.command] = w,
          className: "toolbar-dropdown",
          children: (k = g.options) == null ? void 0 : k.map((w) => /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "dropdown-item",
              onClick: () => c(g.command, w.value),
              children: [
                w.icon && /* @__PURE__ */ r.jsx("span", { className: "option-icon", children: w.icon }),
                /* @__PURE__ */ r.jsx("span", { className: "option-label", children: w.label })
              ]
            },
            w.value
          ))
        }
      ),
      g.type === "color" && a === g.command && /* @__PURE__ */ r.jsxs(
        "div",
        {
          ref: (w) => d.current[g.command] = w,
          className: "toolbar-color-picker",
          children: [
            /* @__PURE__ */ r.jsxs("div", { className: "color-picker-header", children: [
              /* @__PURE__ */ r.jsx("h4", { className: "color-picker-title", children: g.command === "fontColor" ? "Text Color" : "Background Color" }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  className: "color-picker-close",
                  onClick: () => u(null),
                  "aria-label": "Close color picker",
                  children: "×"
                }
              )
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "color-grid", children: It.map((w) => /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "color-swatch",
                style: { backgroundColor: w },
                onClick: () => h(g.command, w),
                title: w,
                "aria-label": `Select color ${w}`
              },
              w
            )) }),
            /* @__PURE__ */ r.jsxs("div", { className: "color-input-section", children: [
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "color",
                  className: "color-input",
                  onChange: (w) => h(g.command, w.target.value),
                  title: "Choose custom color"
                }
              ),
              /* @__PURE__ */ r.jsx("span", { className: "color-input-label", children: "Custom Color" }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  className: "color-remove-btn",
                  onClick: () => h(g.command, g.command === "fontColor" ? "inherit" : "transparent"),
                  title: "Remove color",
                  children: "Remove"
                }
              )
            ] })
          ]
        }
      )
    ] }, U);
  };
  return /* @__PURE__ */ r.jsx("div", { className: "advanced-toolbar toolbar", role: "toolbar", "aria-label": "Rich text formatting toolbar", children: St.map((g) => /* @__PURE__ */ r.jsx("div", { className: "toolbar-group", children: g.buttons.map((j, D) => _(j, g.name, D)) }, g.name)) });
}, bt = () => {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0)
    return {
      range: null,
      isCollapsed: !0,
      activeFormats: /* @__PURE__ */ new Set(),
      currentBlockFormat: "div"
    };
  const e = s.getRangeAt(0), t = _t(), o = At();
  return {
    range: e.cloneRange(),
    isCollapsed: s.isCollapsed,
    activeFormats: t,
    currentBlockFormat: o
  };
}, yt = (s) => {
  if (!s.range)
    return;
  const e = window.getSelection();
  if (e)
    try {
      e.removeAllRanges(), e.addRange(s.range);
    } catch (t) {
      console.warn("Failed to restore selection:", t);
    }
}, er = () => {
  const s = bt();
  return () => {
    yt(s);
  };
}, _t = () => {
  const s = /* @__PURE__ */ new Set();
  try {
    document.queryCommandState("bold") && s.add("bold"), document.queryCommandState("italic") && s.add("italic"), document.queryCommandState("underline") && s.add("underline"), document.queryCommandState("insertUnorderedList") && s.add("insertUnorderedList"), document.queryCommandState("insertOrderedList") && s.add("insertOrderedList"), document.queryCommandState("justifyLeft") && s.add("justifyLeft"), document.queryCommandState("justifyCenter") && s.add("justifyCenter"), document.queryCommandState("justifyRight") && s.add("justifyRight");
  } catch (e) {
    console.warn("Error checking command state:", e);
  }
  return s;
}, At = () => {
  var e;
  try {
    const t = document.queryCommandValue("formatBlock");
    if (t)
      return t.toLowerCase();
  } catch (t) {
    console.warn("Error getting block format:", t);
  }
  const s = window.getSelection();
  if (s && s.rangeCount > 0) {
    let o = s.getRangeAt(0).commonAncestorContainer;
    o.nodeType === Node.TEXT_NODE && (o = o.parentElement || o);
    const l = (e = o.tagName) == null ? void 0 : e.toLowerCase();
    if (["h1", "h2", "h3", "h4", "h5", "h6", "p", "div"].includes(l))
      return l;
  }
  return "div";
}, Ot = (s) => {
  const e = window.getSelection();
  if (!e || e.rangeCount === 0)
    return !1;
  const t = e.getRangeAt(0);
  return s.contains(t.commonAncestorContainer);
}, tr = (s) => {
  s.focus();
  const e = window.getSelection();
  if (e) {
    const t = document.createRange();
    t.selectNodeContents(s), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
  }
}, Ft = (s, e) => {
  s.focus(), e && yt(e);
}, Dt = {
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
class Ut {
  constructor(e = Dt) {
    dt(this, "config");
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
    let t = this.cleanPasteArtifacts(e), o = this.sanitizeHtml(t);
    return o = this.normalizeWhitespace(o), o;
  }
  /**
   * Recursively sanitize a DOM element and its children
   */
  sanitizeElement(e) {
    var o;
    const t = Array.from(e.children);
    for (const l of t) {
      const i = l.tagName.toLowerCase();
      if (!this.config.allowedTags.includes(i)) {
        if (this.isDangerousTag(i)) {
          l.remove();
          continue;
        }
        const a = l.textContent || "";
        if (a.trim()) {
          const u = document.createTextNode(a);
          (o = l.parentNode) == null || o.replaceChild(u, l);
        } else
          l.remove();
        continue;
      }
      this.sanitizeAttributes(l), this.sanitizeElement(l);
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
    const t = e.tagName.toLowerCase(), o = this.config.allowedAttributes[t] || [], l = Array.from(e.attributes);
    for (const i of l) {
      const a = i.name.toLowerCase();
      if (!o.includes(a)) {
        e.removeAttribute(i.name);
        continue;
      }
      if (a === "href") {
        const u = this.sanitizeUrl(i.value);
        u ? e.setAttribute("href", u) : e.removeAttribute("href");
        continue;
      }
      if (a === "style") {
        const u = this.sanitizeStyle(i.value);
        u ? e.setAttribute("style", u) : e.removeAttribute("style");
        continue;
      }
      this.containsScript(i.value) && e.removeAttribute(i.name);
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
      const o = new URL(t);
      if (this.config.allowedProtocols.includes(o.protocol))
        return t;
    } catch {
      try {
        const l = `http://${t}`, i = new URL(l);
        if (this.config.allowedProtocols.includes(i.protocol))
          return l;
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
    for (const a of t)
      if (a.test(e))
        return null;
    const o = [
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
    ], l = e.split(";").filter((a) => a.trim()), i = [];
    for (const a of l) {
      const [u, d] = a.split(":").map((p) => p.trim());
      u && d && o.includes(u.toLowerCase()) && (this.containsScript(d) || i.push(`${u}: ${d}`));
    }
    return i.length > 0 ? i.join("; ") : null;
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
    ].some((o) => o.test(e));
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
    ].some((o) => o.test(e));
  }
}
const Mt = new Ut(), Pt = ({
  content: s,
  placeholder: e,
  onContentChange: t,
  onFocus: o,
  onBlur: l,
  editorRef: i,
  onSelectionChange: a,
  onLinkClick: u
}) => {
  const [d, p] = E(!1), [c, h] = E(null), v = L(() => {
    if (i.current && Ot(i.current)) {
      const I = bt();
      h(I), a && a(I);
    }
  }, [i, a]), x = L(() => {
    i.current && c && Ft(i.current, c);
  }, [i, c]), _ = (I) => {
    const H = I.currentTarget.innerHTML, Y = g(H);
    t(Y);
  }, g = (I) => {
    if (!I || I === "<br>" || I === "<div><br></div>")
      return "";
    let P = I.replace(/^<div><br><\/div>$/, "");
    return P = P.replace(/^<div>(.*)<\/div>$/, "$1"), P;
  }, j = (I) => {
    p(!0), o();
  }, D = (I) => {
    p(!1), l();
  }, R = (I) => {
    I.preventDefault();
    const P = I.clipboardData;
    if (!P)
      return;
    let H = P.getData("text/html");
    if (!H) {
      const W = P.getData("text/plain");
      W && (H = `<p>${W.replace(/\n/g, "<br>")}</p>`);
    }
    if (!H)
      return;
    const Y = Mt.sanitizePastedContent(H);
    S(Y);
  }, S = (I) => {
    const P = window.getSelection();
    if (!P || !P.rangeCount)
      return;
    const H = P.getRangeAt(0);
    H.deleteContents();
    const Y = document.createElement("div");
    Y.innerHTML = I;
    const W = document.createDocumentFragment();
    for (; Y.firstChild; )
      W.appendChild(Y.firstChild);
    if (H.insertNode(W), H.collapse(!1), P.removeAllRanges(), P.addRange(H), i.current) {
      const X = i.current.innerHTML;
      t(g(X));
    }
  }, U = (I) => {
    const H = I.target.closest("a[href]");
    if (H && H.href) {
      I.preventDefault(), I.stopPropagation(), u && u(I.nativeEvent, H);
      return;
    }
  }, k = (I) => {
    I.key === "Enter" && !I.shiftKey && w(I);
  }, w = (I) => {
    var ue, ce;
    const P = window.getSelection();
    if (!P || !P.rangeCount)
      return !1;
    const H = P.getRangeAt(0), Y = H.startContainer.nodeType === Node.TEXT_NODE ? H.startContainer.parentElement : H.startContainer, W = Y == null ? void 0 : Y.closest("li");
    if (!W)
      return !1;
    const X = W.closest("ul, ol");
    return X && (((ue = W.textContent) == null ? void 0 : ue.trim()) === "" || H.startOffset === 0 && ((ce = W.textContent) == null ? void 0 : ce.trim()) === "") ? (I.preventDefault(), G(W, X), !0) : !1;
  }, G = (I, P) => {
    var W, X;
    I.remove();
    const H = document.createElement("p");
    H.innerHTML = "<br>", P.nextSibling ? (W = P.parentNode) == null || W.insertBefore(H, P.nextSibling) : (X = P.parentNode) == null || X.appendChild(H);
    const Y = window.getSelection();
    if (Y) {
      const ae = document.createRange();
      ae.setStart(H, 0), ae.collapse(!0), Y.removeAllRanges(), Y.addRange(ae);
    }
    if (i.current) {
      const ae = i.current.innerHTML;
      t(g(ae));
    }
  }, q = () => d ? !1 : !s || s === "" || s === "<br>" || s === "<div><br></div>" || s.replace(/<[^>]*>/g, "").trim() === "";
  return le(() => {
    i.current && i.current.innerHTML !== s && (i.current.innerHTML = s || "");
  }, [s, i]), le(() => (document.addEventListener("selectionchange", v), () => {
    document.removeEventListener("selectionchange", v);
  }), [v]), le(() => {
    i.current && (i.current.restoreFocus = x);
  }, [i, x]), /* @__PURE__ */ r.jsxs("div", { className: "editable-area-container", children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        ref: i,
        className: "editable-area",
        contentEditable: !0,
        onInput: _,
        onFocus: j,
        onBlur: D,
        onKeyDown: k,
        onPaste: R,
        onClick: U,
        suppressContentEditableWarning: !0,
        role: "textbox",
        "aria-label": "Rich text editor content area",
        "aria-multiline": "true",
        "aria-describedby": "keyboard-shortcuts-help",
        "data-placeholder": e
      }
    ),
    q() && /* @__PURE__ */ r.jsx("div", { className: "placeholder", "aria-hidden": "true", children: e })
  ] });
};
function ht(s, e, t) {
  return Lt(
    wt(
      {
        unit: "%",
        width: 90
      },
      t,
      s,
      e
    ),
    s,
    e
  );
}
const Ht = ({
  isOpen: s,
  imageUrl: e,
  onClose: t,
  onCropComplete: o
}) => {
  const [l, i] = E(), [a, u] = E(), [d, p] = E(void 0), [c, h] = E(!1), v = ke(null), x = ke(null), _ = L((R) => {
    const { width: S, height: U } = R.currentTarget;
    i(ht(S, U, d || S / U));
  }, [d]), g = L(async () => {
    if (!a || !v.current || !x.current)
      return null;
    const R = v.current, S = x.current, U = S.getContext("2d");
    if (!U)
      return null;
    const k = R.naturalWidth / R.width, w = R.naturalHeight / R.height;
    return S.width = a.width, S.height = a.height, U.drawImage(
      R,
      a.x * k,
      a.y * w,
      a.width * k,
      a.height * w,
      0,
      0,
      a.width,
      a.height
    ), new Promise((G) => {
      S.toBlob((q) => {
        if (q) {
          const I = URL.createObjectURL(q);
          G(I);
        }
      }, "image/jpeg", 0.9);
    });
  }, [a]), j = async () => {
    h(!0);
    try {
      const R = await g();
      R && (o(R), t());
    } catch (R) {
      console.error("Error cropping image:", R);
    } finally {
      h(!1);
    }
  }, D = (R) => {
    if (p(R), v.current) {
      const { width: S, height: U } = v.current;
      i(ht(S, U, R || S / U));
    }
  };
  return s ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ r.jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Crop Image" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: t,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
          "aria-label": "Close",
          children: /* @__PURE__ */ r.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "p-4 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ r.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Aspect Ratio:" }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => D(void 0),
            className: `px-3 py-1 text-sm rounded ${d === void 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`,
            children: "Free"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => D(1),
            className: `px-3 py-1 text-sm rounded ${d === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`,
            children: "1:1"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => D(16 / 9),
            className: `px-3 py-1 text-sm rounded ${d === 16 / 9 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`,
            children: "16:9"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => D(4 / 3),
            className: `px-3 py-1 text-sm rounded ${d === 4 / 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`,
            children: "4:3"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ r.jsx("div", { className: "p-4 max-h-96 overflow-auto", children: /* @__PURE__ */ r.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ r.jsx(
      Et,
      {
        crop: l,
        onChange: (R, S) => i(S),
        onComplete: (R) => u(R),
        aspect: d,
        minWidth: 50,
        minHeight: 50,
        children: /* @__PURE__ */ r.jsx(
          "img",
          {
            ref: v,
            alt: "Crop preview",
            src: e,
            style: { maxHeight: "400px", maxWidth: "100%" },
            onLoad: _
          }
        )
      }
    ) }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50", children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-sm text-gray-600", children: "Drag to select the area you want to crop" }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: t,
            className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: j,
            disabled: !a || c,
            className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            children: c ? "Processing..." : "Apply Crop"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: x,
        style: { display: "none" }
      }
    )
  ] }) }) : null;
}, Bt = ({
  isOpen: s,
  onClose: e,
  onFileSelect: t,
  accept: o = "*/*",
  maxSize: l = 10 * 1024 * 1024,
  // 10MB default
  title: i = "Upload File",
  description: a = "Select a file to upload"
}) => {
  const [u, d] = E(!1), [p, c] = E(null), h = ke(null), v = L((k) => k.size > l ? `File size exceeds ${Math.round(l / 1048576)}MB limit` : o !== "*/*" && !o.split(",").map((q) => q.trim()).some((q) => {
    if (q.startsWith("."))
      return k.name.toLowerCase().endsWith(q.toLowerCase());
    if (q.includes("/*")) {
      const I = q.split("/")[0];
      return k.type.startsWith(I + "/");
    } else
      return k.type === q;
  }) ? `File type not supported. Accepted types: ${o}` : null, [o, l]), x = L((k) => {
    const w = v(k);
    if (w) {
      c(w);
      return;
    }
    c(null), t(k), e();
  }, [v, t, e]), _ = L((k) => {
    var G;
    const w = (G = k.target.files) == null ? void 0 : G[0];
    w && x(w);
  }, [x]), g = L((k) => {
    k.preventDefault(), d(!0);
  }, []), j = L((k) => {
    k.preventDefault(), d(!1);
  }, []), D = L((k) => {
    k.preventDefault(), d(!1);
    const w = Array.from(k.dataTransfer.files);
    w.length > 0 && x(w[0]);
  }, [x]), R = L(() => {
    var k;
    (k = h.current) == null || k.click();
  }, []), S = L((k) => {
    if (k === 0) return "0 Bytes";
    const w = 1024, G = ["Bytes", "KB", "MB", "GB"], q = Math.floor(Math.log(k) / Math.log(w));
    return parseFloat((k / Math.pow(w, q)).toFixed(2)) + " " + G[q];
  }, []), U = L(() => o === "*/*" ? "All files" : o.includes("image/*") ? "Images" : o.includes("video/*") ? "Videos" : o.includes("audio/*") ? "Audio files" : o.replace(/,/g, ", "), [o]);
  return s ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ r.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: i }),
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
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-gray-600 mb-4", children: a }),
      /* @__PURE__ */ r.jsx(
        "div",
        {
          className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${u ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`,
          onDragOver: g,
          onDragLeave: j,
          onDrop: D,
          children: /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ r.jsx(
              "svg",
              {
                className: `w-12 h-12 mb-4 ${u ? "text-blue-500" : "text-gray-400"}`,
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
                onClick: R,
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
          U()
        ] }),
        /* @__PURE__ */ r.jsxs("p", { children: [
          "Maximum size: ",
          S(l)
        ] })
      ] }),
      p && /* @__PURE__ */ r.jsx("div", { className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ r.jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ r.jsx("svg", { className: "w-5 h-5 text-red-400 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm text-red-700", children: p })
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
        ref: h,
        type: "file",
        accept: o,
        onChange: _,
        className: "hidden"
      }
    )
  ] }) }) : null;
}, $t = ({
  imageElement: s,
  onUpdate: e,
  onRemove: t
}) => {
  const [o, l] = E(!1), [i, a] = E({ x: 0, y: 0 }), [u, d] = E({ width: 0, height: 0 }), [p, c] = E("none"), [h, v] = E(!1), x = ke(null);
  le(() => {
    var S;
    if (s) {
      const U = s.getBoundingClientRect(), k = (S = s.closest(".editable-area")) == null ? void 0 : S.getBoundingClientRect();
      k && a({
        x: U.left - k.left,
        y: U.top - k.top
      }), d({
        width: s.offsetWidth,
        height: s.offsetHeight
      });
      const w = window.getComputedStyle(s), G = w.display, q = w.marginLeft, I = w.marginRight;
      c(G === "block" ? q === "auto" && I === "auto" ? "center" : q === "auto" ? "right" : "left" : "none");
    }
  }, [s]);
  const _ = L((S) => {
    if (s) {
      switch (c(S), S) {
        case "left":
          s.style.display = "block", s.style.marginLeft = "0", s.style.marginRight = "auto", s.style.float = "none";
          break;
        case "center":
          s.style.display = "block", s.style.marginLeft = "auto", s.style.marginRight = "auto", s.style.float = "none";
          break;
        case "right":
          s.style.display = "block", s.style.marginLeft = "auto", s.style.marginRight = "0", s.style.float = "none";
          break;
        case "none":
          s.style.display = "inline-block", s.style.marginLeft = "", s.style.marginRight = "", s.style.float = "";
          break;
      }
      e();
    }
  }, [s, e]), g = L((S) => {
    if (!s) return;
    const U = s.naturalHeight / s.naturalWidth, k = S * U;
    s.style.width = `${S}px`, s.style.height = `${k}px`, d({ width: S, height: k }), e();
  }, [s, e]), j = L((S) => {
    if (s) {
      switch (S) {
        case "left":
          s.style.float = "left", s.style.marginRight = "15px", s.style.marginBottom = "10px", s.style.display = "block";
          break;
        case "right":
          s.style.float = "right", s.style.marginLeft = "15px", s.style.marginBottom = "10px", s.style.display = "block";
          break;
        case "none":
          s.style.float = "none", s.style.marginLeft = "", s.style.marginRight = "", s.style.marginBottom = "";
          break;
      }
      e();
    }
  }, [s, e]), D = L(() => {
    if (!s) return;
    const S = s.alt || "", U = window.prompt("Enter alt text for the image (for accessibility):", S);
    U !== null && (s.alt = U, e());
  }, [s, e]), R = L(() => {
    confirm("Are you sure you want to remove this image?") && (t(), l(!1));
  }, [t]);
  return le(() => {
    const S = (k) => {
      k.stopPropagation(), l(!0);
    }, U = (k) => {
      x.current && !x.current.contains(k.target) && l(!1);
    };
    return s && (s.addEventListener("click", S), document.addEventListener("click", U)), () => {
      s && s.removeEventListener("click", S), document.removeEventListener("click", U);
    };
  }, [s]), !o || !s ? null : /* @__PURE__ */ r.jsxs(
    "div",
    {
      ref: x,
      className: "absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-64",
      style: {
        left: i.x + u.width + 10,
        top: i.y,
        maxWidth: "300px"
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mb-3 pb-2 border-b border-gray-200", children: [
          /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-semibold text-gray-900", children: "Image Settings" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: () => l(!1),
              className: "text-gray-400 hover:text-gray-600 transition-colors",
              "aria-label": "Close",
              children: /* @__PURE__ */ r.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: [
            "Width: ",
            Math.round(u.width),
            "px"
          ] }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "range",
              min: "50",
              max: "800",
              value: u.width,
              onChange: (S) => g(parseInt(S.target.value)),
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
                onClick: () => _("left"),
                className: `px-2 py-1 text-xs rounded ${p === "left" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Left"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => _("center"),
                className: `px-2 py-1 text-xs rounded ${p === "center" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Center"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => _("right"),
                className: `px-2 py-1 text-xs rounded ${p === "right" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
                children: "Right"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => _("none"),
                className: `px-2 py-1 text-xs rounded ${p === "none" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`,
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
                onClick: () => j("left"),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Wrap Left"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => j("right"),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Wrap Right"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => j("none"),
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
                onClick: () => g(150),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Small"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => g(300),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Medium"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => g(500),
                className: "px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors",
                children: "Large"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: () => g(s.naturalWidth),
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
              onClick: D,
              className: "flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded transition-colors",
              children: "Alt Text"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: R,
              className: "flex-1 px-2 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded transition-colors",
              children: "Remove"
            }
          )
        ] })
      ]
    }
  );
}, zt = ({
  isOpen: s,
  onClose: e,
  onInsert: t
}) => {
  const [o, l] = E(3), [i, a] = E(3), [u, d] = E(!0), [p] = E(3), [c] = E(3), h = () => {
    t(o, i, u), e();
  };
  return s ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4", children: [
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
        p,
        " × ",
        c,
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
              value: o,
              onChange: (v) => l(Math.max(1, parseInt(v.target.value) || 1)),
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
              value: i,
              onChange: (v) => a(Math.max(1, parseInt(v.target.value) || 1)),
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
            checked: u,
            onChange: (v) => d(v.target.checked),
            className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Include header row" })
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ r.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Preview:" }),
        /* @__PURE__ */ r.jsx("div", { className: "border border-gray-300 rounded overflow-hidden", children: /* @__PURE__ */ r.jsx("table", { className: "w-full text-xs", children: /* @__PURE__ */ r.jsxs("tbody", { children: [
          Array.from({ length: Math.min(o, 4) }, (v, x) => /* @__PURE__ */ r.jsxs("tr", { children: [
            Array.from({ length: Math.min(i, 6) }, (_, g) => /* @__PURE__ */ r.jsx(
              "td",
              {
                className: `border border-gray-200 p-1 text-center ${u && x === 0 ? "bg-gray-100 font-medium" : "bg-white"}`,
                children: u && x === 0 ? `Header ${g + 1}` : `Cell ${x + 1},${g + 1}`
              },
              g
            )),
            i > 6 && /* @__PURE__ */ r.jsx("td", { className: "border border-gray-200 p-1 text-center bg-gray-50", children: "..." })
          ] }, x)),
          o > 4 && /* @__PURE__ */ r.jsx("tr", { children: Array.from({ length: Math.min(i + (i > 6 ? 1 : 0), 7) }, (v, x) => /* @__PURE__ */ r.jsx("td", { className: "border border-gray-200 p-1 text-center bg-gray-50", children: "..." }, x)) })
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
          onClick: h,
          className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors",
          children: "Insert Table"
        }
      )
    ] })
  ] }) }) : null;
}, ut = {
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
}, Wt = ({
  isOpen: s,
  onClose: e,
  onInsert: t
}) => {
  const [o, l] = E("General"), [i, a] = E(""), u = (p) => {
    t(p), e();
  }, d = i ? Object.values(ut).flat().filter(
    (p) => p.includes(i) || p.toLowerCase().includes(i.toLowerCase())
  ) : ut[o];
  return s ? /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ r.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden", children: [
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
        value: i,
        onChange: (p) => a(p.target.value),
        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    ) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex h-96", children: [
      !i && /* @__PURE__ */ r.jsx("div", { className: "w-1/3 border-r border-gray-200 overflow-y-auto", children: /* @__PURE__ */ r.jsx("div", { className: "p-2", children: Object.keys(ut).map((p) => /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => l(p),
          className: `w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${o === p ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`,
          children: p
        },
        p
      )) }) }),
      /* @__PURE__ */ r.jsx("div", { className: `${i ? "w-full" : "w-2/3"} overflow-y-auto`, children: /* @__PURE__ */ r.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-8 gap-2", children: d.map((p, c) => /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => u(p),
            className: "w-10 h-10 flex items-center justify-center text-lg border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors",
            title: `Insert ${p}`,
            children: p
          },
          `${p}-${c}`
        )) }),
        d.length === 0 && /* @__PURE__ */ r.jsxs("div", { className: "text-center text-gray-500 py-8", children: [
          'No characters found matching "',
          i,
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
}, Kt = ({
  isOpen: s,
  onClose: e,
  onSubmit: t,
  title: o,
  placeholder: l = "Enter URL...",
  initialValue: i = "",
  description: a
}) => {
  const [u, d] = E(i), [p, c] = E("");
  le(() => {
    s && (d(i), c(""));
  }, [s, i]);
  const h = (x) => {
    if (x.preventDefault(), !u.trim()) {
      c("URL is required");
      return;
    }
    try {
      if (u.trim().startsWith("http://") || u.trim().startsWith("https://") || u.trim().startsWith("/"))
        t(u.trim()), e();
      else {
        const _ = `https://${u.trim()}`;
        new URL(_), t(_), e();
      }
    } catch {
      c("Please enter a valid URL");
    }
  }, v = (x) => {
    x.key === "Escape" && e();
  };
  return s ? /* @__PURE__ */ r.jsx(
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
      onClick: (x) => x.target === x.currentTarget && e(),
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
          onKeyDown: v,
          children: [
            /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "20px" }, children: [
              /* @__PURE__ */ r.jsx("h3", { style: {
                margin: "0 0 8px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937"
              }, children: o }),
              a && /* @__PURE__ */ r.jsx("p", { style: {
                margin: 0,
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: "1.5"
              }, children: a })
            ] }),
            /* @__PURE__ */ r.jsxs("form", { onSubmit: h, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "16px" }, children: [
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "text",
                    value: u,
                    onChange: (x) => {
                      d(x.target.value), c("");
                    },
                    placeholder: l,
                    autoFocus: !0,
                    style: {
                      width: "100%",
                      padding: "12px",
                      border: `2px solid ${p ? "#ef4444" : "#e5e7eb"}`,
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    },
                    onFocus: (x) => {
                      x.target.style.borderColor = "#3b82f6";
                    },
                    onBlur: (x) => {
                      p || (x.target.style.borderColor = "#e5e7eb");
                    }
                  }
                ),
                p && /* @__PURE__ */ r.jsx("p", { style: {
                  margin: "8px 0 0 0",
                  fontSize: "14px",
                  color: "#ef4444"
                }, children: p })
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
                    onMouseEnter: (x) => {
                      x.currentTarget.style.backgroundColor = "#f9fafb", x.currentTarget.style.borderColor = "#9ca3af";
                    },
                    onMouseLeave: (x) => {
                      x.currentTarget.style.backgroundColor = "white", x.currentTarget.style.borderColor = "#d1d5db";
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
                    onMouseEnter: (x) => {
                      x.currentTarget.style.backgroundColor = "#2563eb";
                    },
                    onMouseLeave: (x) => {
                      x.currentTarget.style.backgroundColor = "#3b82f6";
                    },
                    children: [
                      i ? "Update" : "Add",
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
}, qt = ({
  isOpen: s,
  onClose: e,
  onFindReplace: t
}) => {
  const [o, l] = E(""), [i, a] = E(""), [u, d] = E("");
  le(() => {
    s && (l(""), a(""), d(""));
  }, [s]);
  const p = (h) => {
    if (h.preventDefault(), !o.trim()) {
      d("Find text is required");
      return;
    }
    t(o.trim(), i.trim()), e();
  }, c = (h) => {
    h.key === "Escape" && e();
  };
  return s ? /* @__PURE__ */ r.jsx(
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
      onClick: (h) => h.target === h.currentTarget && e(),
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
          onKeyDown: c,
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
            /* @__PURE__ */ r.jsxs("form", { onSubmit: p, children: [
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
                    value: o,
                    onChange: (h) => {
                      l(h.target.value), d("");
                    },
                    placeholder: "Enter text to find...",
                    autoFocus: !0,
                    style: {
                      width: "100%",
                      padding: "12px",
                      border: `2px solid ${u ? "#ef4444" : "#e5e7eb"}`,
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    },
                    onFocus: (h) => {
                      h.target.style.borderColor = "#3b82f6";
                    },
                    onBlur: (h) => {
                      u || (h.target.style.borderColor = "#e5e7eb");
                    }
                  }
                ),
                u && /* @__PURE__ */ r.jsx("p", { style: {
                  margin: "8px 0 0 0",
                  fontSize: "14px",
                  color: "#ef4444"
                }, children: u })
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
                    value: i,
                    onChange: (h) => a(h.target.value),
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
                    onFocus: (h) => {
                      h.target.style.borderColor = "#3b82f6";
                    },
                    onBlur: (h) => {
                      h.target.style.borderColor = "#e5e7eb";
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
                    onMouseEnter: (h) => {
                      h.currentTarget.style.backgroundColor = "#f9fafb", h.currentTarget.style.borderColor = "#9ca3af";
                    },
                    onMouseLeave: (h) => {
                      h.currentTarget.style.backgroundColor = "white", h.currentTarget.style.borderColor = "#d1d5db";
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
                    onMouseEnter: (h) => {
                      h.currentTarget.style.backgroundColor = "#2563eb";
                    },
                    onMouseLeave: (h) => {
                      h.currentTarget.style.backgroundColor = "#3b82f6";
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
}, Yt = ({
  isOpen: s,
  onClose: e,
  title: t,
  message: o,
  type: l = "info",
  autoClose: i = !1,
  autoCloseDelay: a = 3e3
}) => {
  le(() => {
    if (s && i) {
      const c = setTimeout(() => {
        e();
      }, a);
      return () => clearTimeout(c);
    }
  }, [s, i, a, e]);
  const u = (c) => {
    c.key === "Escape" && e();
  };
  if (!s) return null;
  const p = (() => {
    switch (l) {
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
      onClick: (c) => c.target === c.currentTarget && e(),
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
              border: `2px solid ${p.borderColor}`
            },
            onKeyDown: u,
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
                }, children: p.icon }),
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
                  }, children: o })
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
                    backgroundColor: p.iconColor,
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  },
                  onMouseEnter: (c) => {
                    c.currentTarget.style.opacity = "0.9";
                  },
                  onMouseLeave: (c) => {
                    c.currentTarget.style.opacity = "1";
                  },
                  children: "OK"
                }
              ) }),
              i && /* @__PURE__ */ r.jsx("div", { style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "3px",
                backgroundColor: p.backgroundColor,
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                overflow: "hidden"
              }, children: /* @__PURE__ */ r.jsx("div", { style: {
                height: "100%",
                backgroundColor: p.iconColor,
                animation: `shrink ${a}ms linear`,
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
}, Gt = ({
  isOpen: s,
  linkUrl: e,
  linkText: t,
  position: o,
  onEdit: l,
  onRemove: i,
  onGoToLink: a,
  onClose: u
}) => s ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
      onClick: u
    }
  ),
  /* @__PURE__ */ r.jsxs(
    "div",
    {
      style: {
        position: "fixed",
        left: `${o.x}px`,
        top: `${o.y}px`,
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
      onClick: (d) => d.stopPropagation(),
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
              onClick: a,
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
              onClick: l,
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
              onMouseEnter: (d) => {
                d.currentTarget.style.backgroundColor = "#eff6ff";
              },
              onMouseLeave: (d) => {
                d.currentTarget.style.backgroundColor = "transparent";
              },
              children: "Change"
            }
          ),
          /* @__PURE__ */ r.jsx("span", { style: { color: "#d1d5db" }, children: "|" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: i,
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
              onMouseEnter: (d) => {
                d.currentTarget.style.backgroundColor = "#fef2f2";
              },
              onMouseLeave: (d) => {
                d.currentTarget.style.backgroundColor = "transparent";
              },
              children: "Remove"
            }
          )
        ] })
      ]
    }
  )
] }) : null, Jt = {
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
}, Re = class Re {
  constructor() {
  }
  static getInstance() {
    return Re.instance || (Re.instance = new Re()), Re.instance;
  }
  /**
   * Execute a command using document.execCommand with error handling
   */
  executeCommand(e, t, o, l) {
    const i = Jt[e];
    if (!i)
      return {
        success: !1,
        error: `Unknown command: ${e}`,
        command: e
      };
    if (i.type === "custom")
      return this.executeCustomCommand(e, t, o);
    if (i.requiresSelection && this.isSelectionEmpty())
      return {
        success: !1,
        error: `Command ${e} requires text selection`,
        command: e
      };
    try {
      o && document.activeElement !== o && o.focus();
      const a = t || i.value || "";
      return document.execCommand(i.command, !1, a) ? {
        success: !0,
        command: e,
        value: a
      } : {
        success: !1,
        error: `Command execution failed: ${i.command}`,
        command: e,
        value: a
      };
    } catch (a) {
      return {
        success: !1,
        error: `Command execution error: ${a instanceof Error ? a.message : "Unknown error"}`,
        command: e,
        value: t || i.value || ""
      };
    }
  }
  /**
   * Execute custom commands that require special handling
   */
  executeCustomCommand(e, t, o) {
    try {
      switch (o && document.activeElement !== o && o.focus(), e) {
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
    } catch (l) {
      return {
        success: !1,
        error: `Custom command execution error: ${l instanceof Error ? l.message : "Unknown error"}`,
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
   * Get the current active formatting states
   */
  getActiveFormats() {
    const e = /* @__PURE__ */ new Set();
    try {
      document.queryCommandState("bold") && e.add("BOLD"), document.queryCommandState("italic") && e.add("ITALIC"), document.queryCommandState("underline") && e.add("UNDERLINE"), document.queryCommandState("strikeThrough") && e.add("STRIKETHROUGH"), document.queryCommandState("subscript") && e.add("SUBSCRIPT"), document.queryCommandState("superscript") && e.add("SUPERSCRIPT");
      const t = this.getCurrentBlockFormat();
      t === "H1" ? e.add("FORMAT_H1") : t === "H2" ? e.add("FORMAT_H2") : t === "H3" ? e.add("FORMAT_H3") : t === "H4" ? e.add("FORMAT_H4") : t === "H5" ? e.add("FORMAT_H5") : t === "H6" ? e.add("FORMAT_H6") : t === "BLOCKQUOTE" ? e.add("FORMAT_BLOCKQUOTE") : t === "PRE" && e.add("FORMAT_PRE"), document.queryCommandState("justifyLeft") && e.add("JUSTIFY_LEFT"), document.queryCommandState("justifyCenter") && e.add("JUSTIFY_CENTER"), document.queryCommandState("justifyRight") && e.add("JUSTIFY_RIGHT"), document.queryCommandState("justifyFull") && e.add("JUSTIFY_FULL"), document.queryCommandState("insertUnorderedList") && e.add("INSERT_UNORDERED_LIST"), document.queryCommandState("insertOrderedList") && e.add("INSERT_ORDERED_LIST"), this.isInLink() && (e.add("CREATE_LINK"), e.add("EDIT_LINK"));
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
    const o = this.normalizeUrl(e);
    if (!o)
      return {
        success: !1,
        error: "Invalid URL provided",
        command: "CREATE_LINK",
        value: e
      };
    try {
      if (!t || t.isCollapsed) {
        const l = document.createElement("a");
        if (l.href = o, l.textContent = e, l.target = "_blank", l.rel = "noopener noreferrer", t && t.rangeCount > 0) {
          const i = t.getRangeAt(0);
          i.insertNode(l), i.setStartAfter(l), i.setEndAfter(l), t.removeAllRanges(), t.addRange(i);
        } else {
          const i = document.querySelector(".editable-area");
          if (i)
            i.appendChild(l);
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
          value: o
        };
      } else
        return document.execCommand("createLink", !1, o) ? (setTimeout(() => {
          const i = window.getSelection();
          if (i && i.rangeCount > 0) {
            const a = this.findLinkInSelection(i);
            if (a)
              a.setAttribute("target", "_blank"), a.setAttribute("rel", "noopener noreferrer");
            else {
              const u = document.querySelector(".editable-area");
              u && u.querySelectorAll(`a[href="${o}"]`).forEach((p) => {
                p.hasAttribute("target") || (p.setAttribute("target", "_blank"), p.setAttribute("rel", "noopener noreferrer"));
              });
            }
          }
        }, 0), {
          success: !0,
          command: "CREATE_LINK",
          value: o
        }) : {
          success: !1,
          error: "Failed to create link",
          command: "CREATE_LINK",
          value: o
        };
    } catch (l) {
      return {
        success: !1,
        error: `Link creation error: ${l instanceof Error ? l.message : "Unknown error"}`,
        command: "CREATE_LINK",
        value: o
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
    const o = this.findLinkInSelection(t);
    if (!o)
      return {
        success: !1,
        error: "No link found in current selection or cursor position",
        command: "EDIT_LINK"
      };
    let l = e;
    if (!l)
      return {
        success: !1,
        error: "URL is required to edit the link",
        command: "EDIT_LINK"
      };
    if (!l || l.trim() === "")
      return this.removeLinkElement(o);
    const i = this.normalizeUrl(l);
    if (!i)
      return {
        success: !1,
        error: "Invalid URL provided",
        command: "EDIT_LINK",
        value: l
      };
    try {
      return o.setAttribute("href", i), o.hasAttribute("target") || o.setAttribute("target", "_blank"), o.hasAttribute("rel") || o.setAttribute("rel", "noopener noreferrer"), {
        success: !0,
        command: "EDIT_LINK",
        value: i
      };
    } catch (a) {
      return {
        success: !1,
        error: `Link editing error: ${a instanceof Error ? a.message : "Unknown error"}`,
        command: "EDIT_LINK",
        value: i
      };
    }
  }
  /**
   * Find a link element in the current selection or cursor position
   */
  findLinkInSelection(e) {
    if (!e.rangeCount) return null;
    const t = e.getRangeAt(0);
    let o = t.commonAncestorContainer;
    if (o.nodeType === Node.TEXT_NODE && (o = o.parentElement), o instanceof HTMLAnchorElement)
      return o;
    const l = o.closest("a");
    if (l instanceof HTMLAnchorElement)
      return l;
    if (t.cloneContents().querySelector("a")) {
      const u = document.createTreeWalker(
        t.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (p) => p instanceof HTMLAnchorElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        }
      );
      let d = u.nextNode();
      for (; d; ) {
        if (t.intersectsNode(d))
          return d;
        d = u.nextNode();
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
      const o = e.textContent || "", l = document.createTextNode(o);
      return (t = e.parentNode) == null || t.replaceChild(l, e), {
        success: !0,
        command: "EDIT_LINK",
        value: "Link removed"
      };
    } catch (o) {
      return {
        success: !1,
        error: `Error removing link: ${o instanceof Error ? o.message : "Unknown error"}`,
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
    var o, l, i;
    if (!this.isValidImageUrl(e))
      return {
        success: !1,
        error: "Invalid image URL provided",
        command: "INSERT_IMAGE",
        value: e
      };
    try {
      const a = document.createElement("img");
      a.src = e, a.alt = (t == null ? void 0 : t.alt) || "Inserted image", a.className = "editor-image", a.draggable = !0, a.style.maxWidth = "100%", a.style.height = "auto", a.style.cursor = "pointer", a.style.border = "2px solid transparent", a.style.borderRadius = "4px", a.style.transition = "all 0.2s ease", t != null && t.width && (a.style.width = `${t.width}px`), t != null && t.height && (a.style.height = `${t.height}px`), t != null && t.alignment && this.applyImageAlignment(a, t.alignment), t != null && t.float && t.float !== "none" && this.applyImageFloat(a, t.float), a.addEventListener("mouseenter", () => {
        a.style.borderColor = "#3b82f6", a.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.15)";
      }), a.addEventListener("mouseleave", () => {
        a.style.borderColor = "transparent", a.style.boxShadow = "none";
      });
      const u = window.getSelection();
      if (u && u.rangeCount > 0) {
        const d = u.getRangeAt(0), p = d.commonAncestorContainer;
        if (p.nodeType === Node.TEXT_NODE && ((o = p.textContent) != null && o.trim())) {
          const c = p, h = ((l = c.textContent) == null ? void 0 : l.substring(0, d.startOffset)) || "", v = ((i = c.textContent) == null ? void 0 : i.substring(d.endOffset)) || "";
          if (h || v) {
            const x = document.createElement("p"), _ = document.createElement("p"), g = document.createElement("p");
            h && (x.textContent = h), g.appendChild(a), v && (_.textContent = v);
            const j = c.parentNode;
            j && (j.insertBefore(h ? x : g, c), h && j.insertBefore(g, c), v && j.insertBefore(_, c), j.removeChild(c));
          } else
            d.deleteContents(), d.insertNode(a);
        } else
          d.deleteContents(), d.insertNode(a);
        d.setStartAfter(a), d.setEndAfter(a), u.removeAllRanges(), u.addRange(d);
      } else {
        const d = document.querySelector(".editable-area");
        if (d) {
          const p = document.createElement("p");
          p.appendChild(a), d.appendChild(p);
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
    } catch (a) {
      return {
        success: !1,
        error: `Image insertion error: ${a instanceof Error ? a.message : "Unknown error"}`,
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
        var a;
        const o = (a = t.target.files) == null ? void 0 : a[0];
        if (!o)
          return;
        if (!o.type.startsWith("image/")) {
          console.error("Selected file is not an image");
          return;
        }
        const l = 5 * 1024 * 1024;
        if (o.size > l) {
          console.error("Image file is too large (max 5MB)");
          return;
        }
        const i = new FileReader();
        i.onload = (u) => {
          var p;
          const d = (p = u.target) == null ? void 0 : p.result;
          this.insertImage(d);
        }, i.onerror = () => {
          console.error("Failed to read image file");
        }, i.readAsDataURL(o);
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
      return t.type = "file", t.style.display = "none", t.onchange = (o) => {
        var u;
        const l = (u = o.target.files) == null ? void 0 : u[0];
        if (!l)
          return;
        const i = 10 * 1024 * 1024;
        if (l.size > i) {
          console.error("File is too large (max 10MB)");
          return;
        }
        const a = URL.createObjectURL(l);
        this.insertFileLink(a, l.name, l.type);
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
  insertFileLink(e, t, o) {
    try {
      const l = document.createElement("a");
      l.href = e, l.download = t || "download", l.target = "_blank", l.rel = "noopener noreferrer";
      const i = t || "Download File", a = this.getFileIcon(o);
      l.innerHTML = `${a} ${i}`, l.style.display = "inline-block", l.style.padding = "8px 12px", l.style.margin = "4px", l.style.backgroundColor = "#f0f0f0", l.style.border = "1px solid #ccc", l.style.borderRadius = "4px", l.style.textDecoration = "none", l.style.color = "#333";
      const u = window.getSelection();
      if (u && u.rangeCount > 0) {
        const d = u.getRangeAt(0);
        d.deleteContents(), d.insertNode(l), d.setStartAfter(l), d.setEndAfter(l), u.removeAllRanges(), u.addRange(d);
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
    } catch (l) {
      return {
        success: !1,
        error: `File insertion error: ${l instanceof Error ? l.message : "Unknown error"}`,
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
      const t = e ? e.split(",") : ["3", "3", "true"], o = parseInt(t[0]) || 3, l = parseInt(t[1]) || 3, i = t[2] === "true", a = document.createElement("table");
      a.className = "editor-table", a.style.borderCollapse = "collapse", a.style.width = "100%", a.style.border = "1px solid #ccc", a.style.margin = "10px 0";
      const u = document.createElement("tbody");
      for (let p = 0; p < o; p++) {
        const c = document.createElement("tr");
        for (let h = 0; h < l; h++) {
          const v = document.createElement(i && p === 0 ? "th" : "td");
          v.style.border = "1px solid #ccc", v.style.padding = "8px", v.style.minWidth = "50px", v.style.minHeight = "20px", i && p === 0 ? (v.style.backgroundColor = "#f5f5f5", v.style.fontWeight = "bold", v.textContent = `Header ${h + 1}`) : v.innerHTML = "&nbsp;", c.appendChild(v);
        }
        u.appendChild(c);
      }
      a.appendChild(u);
      const d = window.getSelection();
      if (d && d.rangeCount > 0) {
        const p = d.getRangeAt(0);
        p.deleteContents(), p.insertNode(a);
        const c = a.querySelector("td, th");
        c && (p.selectNodeContents(c), p.collapse(!0), d.removeAllRanges(), d.addRange(p));
      } else
        return {
          success: !1,
          error: "No cursor position found",
          command: "INSERT_TABLE"
        };
      return {
        success: !0,
        command: "INSERT_TABLE",
        value: `${o}x${l} table inserted`
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
        const o = t.getRangeAt(0);
        o.deleteContents(), o.insertNode(document.createTextNode(e)), o.setStartAfter(o.endContainer), o.collapse(!0), t.removeAllRanges(), t.addRange(o);
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
        const o = e.textContent || "";
        e.innerHTML = o, e.contentEditable = "true", e.removeAttribute("data-source-mode"), e.style.fontFamily = "", e.style.whiteSpace = "";
      } else {
        const o = e.innerHTML;
        e.textContent = o, e.contentEditable = "true", e.setAttribute("data-source-mode", "true"), e.style.fontFamily = "monospace", e.style.whiteSpace = "pre-wrap";
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
      const o = e.innerHTML;
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
          ${o}
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
dt(Re, "instance");
let ft = Re;
const ge = ft.getInstance(), rr = ({
  initialContent: s = "",
  placeholder: e = "Start typing...",
  onChange: t,
  onFocus: o,
  onBlur: l
}) => {
  const [i, a] = E(s), [u, d] = E(!1), [p, c] = E(/* @__PURE__ */ new Set()), [h, v] = E(!1), [x, _] = E(!1), [g, j] = E(!1), [D, R] = E(!1), [S, U] = E(""), [k, w] = E("image"), [G, q] = E(null), [I, P] = E([]), [H, Y] = E(!1), [W, X] = E(!1), [ae, ue] = E(!1), [ce, Ee] = E("create"), [Pe, he] = E(""), [He, Ne] = E(!1), [Be, $e] = E(!1), [Se, Ie] = E({
    title: "",
    message: "",
    type: "info"
  }), [xe, be] = E(null), [je, fe] = E(!1), [te, ze] = E({
    url: "",
    text: "",
    position: { x: 0, y: 0 },
    element: null
  }), N = ke(null), ye = ke(null), K = L(() => {
    if (!u || !N.current) return;
    const f = ge.getActiveFormats();
    c(f), v(ge.canUndo()), _(ge.canRedo());
  }, [u]), B = L((f) => {
    ye.current && (ye.current.textContent = f, setTimeout(() => {
      ye.current && (ye.current.textContent = "");
    }, 1e3));
  }, []), _e = L((f, C) => {
    const y = {
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
    return f === "formatBlock" && C ? `heading ${C.toLowerCase()}` : y[f] || f;
  }, []), We = L((f) => {
    const C = new FileReader();
    C.onload = (y) => {
      var $;
      const O = ($ = y.target) == null ? void 0 : $.result;
      U(O), R(!1), j(!0);
    }, C.readAsDataURL(f);
  }, []), Le = L((f) => {
    const C = ge.insertImage(f);
    C.success ? (B("Image inserted"), setTimeout(() => {
      if (N.current) {
        const y = N.current.innerHTML;
        a(y), t == null || t(y), K(), Ae();
      }
    }, 0)) : (console.warn("Image insertion failed:", C.error), B("Image insertion failed")), j(!1), U("");
  }, [t, K, B]), Ae = L(() => {
    if (!N.current) return;
    const f = N.current.querySelectorAll("img.editor-image"), C = Array.from(f);
    C.forEach((y) => {
      y.removeEventListener("click", Ke), y.addEventListener("click", Ke), y.addEventListener("dragstart", Oe), y.addEventListener("dragend", Qe);
    }), P(C);
  }, []), Ke = L((f) => {
    f.stopPropagation();
    const C = f.target;
    q(C);
  }, []), Oe = L((f) => {
    const C = f.target;
    f.dataTransfer && (f.dataTransfer.effectAllowed = "move", f.dataTransfer.setData("text/html", C.outerHTML), C.style.opacity = "0.5");
  }, []), Qe = L((f) => {
    const C = f.target;
    C.style.opacity = "1";
  }, []), et = L(() => {
    if (N.current) {
      const f = N.current.innerHTML;
      a(f), t == null || t(f);
    }
  }, [t]), qe = L(() => {
    if (G && G.parentNode) {
      if (G.parentNode.removeChild(G), q(null), N.current) {
        const f = N.current.innerHTML;
        a(f), t == null || t(f);
      }
      B("Image removed");
    }
  }, [G, t, B]), Ye = L((f) => {
    const C = URL.createObjectURL(f), y = document.createElement("a");
    y.href = C, y.download = f.name, y.target = "_blank", y.rel = "noopener noreferrer";
    const O = Ge(f.type);
    y.innerHTML = `${O} ${f.name}`, y.style.display = "inline-block", y.style.padding = "8px 12px", y.style.margin = "4px", y.style.backgroundColor = "#f0f0f0", y.style.border = "1px solid #ccc", y.style.borderRadius = "4px", y.style.textDecoration = "none", y.style.color = "#333";
    const $ = window.getSelection();
    if ($ && $.rangeCount > 0) {
      const re = $.getRangeAt(0);
      re.deleteContents(), re.insertNode(y), re.setStartAfter(y), re.setEndAfter(y), $.removeAllRanges(), $.addRange(re), B("File uploaded and inserted"), setTimeout(() => {
        if (N.current) {
          const ne = N.current.innerHTML;
          a(ne), t == null || t(ne), K();
        }
      }, 0);
    } else
      B("File upload failed - no cursor position");
    R(!1);
  }, [t, K, B]), Ge = L((f) => f.startsWith("image/") ? "🖼️" : f.startsWith("video/") ? "🎥" : f.startsWith("audio/") ? "🎵" : f.includes("pdf") ? "📕" : f.includes("word") || f.includes("document") ? "📝" : f.includes("excel") || f.includes("spreadsheet") || f.includes("powerpoint") || f.includes("presentation") ? "📊" : f.includes("zip") || f.includes("archive") ? "🗜️" : "📄", []), tt = L((f, C, y) => {
    if (!N.current) return;
    const O = `${f},${C},${y}`, $ = ge.executeCommand("INSERT_TABLE", O, N.current);
    $.success ? (B("Table inserted"), setTimeout(() => {
      if (N.current) {
        const re = N.current.innerHTML;
        a(re), t == null || t(re), K();
      }
    }, 0)) : (console.warn("Table insertion failed:", $.error), B("Table insertion failed")), Y(!1);
  }, [t, K, B]), Je = L((f) => {
    if (!N.current) return;
    const C = ge.executeCommand("INSERT_SPECIAL_CHAR", f, N.current);
    C.success ? (B(`Special character ${f} inserted`), setTimeout(() => {
      if (N.current) {
        const y = N.current.innerHTML;
        a(y), t == null || t(y), K();
      }
    }, 0)) : (console.warn("Special character insertion failed:", C.error), B("Special character insertion failed")), X(!1);
  }, [t, K, B]), Ve = L((f) => {
    if (!N.current) return;
    if (xe && ce === "create") {
      const O = window.getSelection();
      O && (O.removeAllRanges(), O.addRange(xe), N.current.focus());
    }
    const C = ce === "create" ? "CREATE_LINK" : "EDIT_LINK", y = ge.executeCommand(C, f, N.current);
    y.success ? (B(`Link ${ce === "create" ? "created" : "updated"}`), setTimeout(() => {
      if (N.current) {
        const $ = N.current.innerHTML;
        a($), t == null || t($), K();
      }
    }, 0)) : we("Error", y.error || "Failed to create link", "error"), be(null), he(""), ue(!1);
  }, [ce, xe, t, K, B]), rt = L((f, C) => {
    if (!N.current) return;
    const y = N.current.innerHTML, O = y.replace(new RegExp(f, "gi"), C);
    if (y !== O) {
      N.current.innerHTML = O, a(O), t == null || t(O);
      const $ = (y.match(new RegExp(f, "gi")) || []).length;
      we("Find & Replace", `Replaced ${$} occurrence(s)`, "success"), B(`Replaced ${$} occurrences`);
    } else
      we("Find & Replace", "No matches found", "info");
  }, [t, B]), we = L((f, C, y = "info") => {
    Ie({ title: f, message: C, type: y }), $e(!0);
  }, []), nt = L((f, C) => {
    f.preventDefault(), f.stopPropagation();
    const y = C.getBoundingClientRect(), O = {
      x: y.left,
      y: y.bottom + 5
      // Position below the link
    };
    ze({
      url: C.href,
      text: C.textContent || "",
      position: O,
      element: C
    }), fe(!0);
  }, []), ot = L(() => {
    te.element && (he(te.element.href), Ee("edit"), ue(!0), fe(!1));
  }, [te.element]), st = L(() => {
    var f;
    if (te.element) {
      const C = te.element.textContent || "", y = document.createTextNode(C);
      if ((f = te.element.parentNode) == null || f.replaceChild(y, te.element), N.current) {
        const O = N.current.innerHTML;
        a(O), t == null || t(O);
      }
      B("Link removed"), fe(!1);
    }
  }, [te.element, t, B]), at = L(() => {
    te.url && (window.open(te.url, "_blank", "noopener,noreferrer"), fe(!1));
  }, [te.url]), it = L(() => {
    fe(!1);
  }, []), ve = L((f, C, y = !1) => {
    if (!N.current) return;
    const O = window.getSelection();
    let $ = null;
    if (O && O.rangeCount > 0 && ($ = O.getRangeAt(0).cloneRange()), f === "insertImage") {
      w("image"), R(!0);
      return;
    }
    if (f === "uploadFile") {
      w("file"), R(!0);
      return;
    }
    if (f === "insertTable") {
      Y(!0);
      return;
    }
    if (f === "insertSpecialChar") {
      X(!0);
      return;
    }
    if (f === "createLink") {
      be($), Ee("create"), he(""), ue(!0);
      return;
    }
    if (f === "editLink") {
      const Q = window.getSelection();
      let Z = null;
      if (Q && Q.rangeCount > 0) {
        const oe = Q.getRangeAt(0), me = (ee) => {
          var n;
          if (ee.nodeType === Node.TEXT_NODE)
            return ((n = ee.parentElement) == null ? void 0 : n.closest("a")) || null;
          if (ee.nodeType === Node.ELEMENT_NODE) {
            const m = ee;
            return m.tagName === "A" ? m : m.closest("a") || null;
          }
          return null;
        };
        if (Z = me(oe.startContainer), !Z && !Q.isCollapsed) {
          const ee = me(oe.endContainer);
          ee && (Z = ee);
        }
        if (Z || (Z = me(oe.commonAncestorContainer)), !Z && N.current) {
          const ee = N.current.querySelectorAll("a[href]");
          for (const n of Array.from(ee))
            if (oe.intersectsNode(n)) {
              Z = n;
              break;
            }
        }
      }
      if (!Z && N.current) {
        const oe = N.current.querySelectorAll("a[href]");
        oe.length === 1 && (Z = oe[0]);
      }
      if (Z && Z.href) {
        he(Z.href), Ee("edit"), ue(!0);
        return;
      }
      we("Edit Link", "Please place your cursor on a link to edit it, or select the link text first", "info");
      return;
    }
    if (f === "findReplace") {
      Ne(!0);
      return;
    }
    let ne = {
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
    }[f];
    if (f === "formatBlock" && C && (ne = `FORMAT_${C}`), ne) {
      const Q = ge.executeCommand(ne, C, N.current);
      if (Q.success) {
        const Z = _e(f, C), me = p.has(ne) ? "removed" : "applied";
        B(`${Z} ${me}`), setTimeout(() => {
          if (N.current) {
            const ee = N.current.innerHTML;
            a(ee), t == null || t(ee), K();
          }
        }, 0);
      } else
        console.warn("Command execution failed:", Q.error), B("Command failed");
    }
  }, [t, K, p, _e, B]), Xe = L((f) => {
    if (!u) return;
    const { ctrlKey: C, metaKey: y, key: O, shiftKey: $ } = f;
    if (!(C || y)) return;
    const Q = {
      b: { command: "bold" },
      i: { command: "italic" },
      u: { command: "underline" },
      k: { command: "createLink" },
      z: { command: $ ? "redo" : "undo" },
      y: { command: "redo" },
      1: { command: "formatBlock", value: "H1" },
      2: { command: "formatBlock", value: "H2" },
      3: { command: "formatBlock", value: "H3" },
      l: { command: $ ? "insertOrderedList" : "justifyLeft" },
      e: { command: "justifyCenter" },
      r: { command: "justifyRight" },
      "\\": { command: "removeFormat" }
    }[O.toLowerCase()];
    Q && (f.preventDefault(), ve(Q.command, Q.value, !0));
  }, [u, ve]), pe = L((f) => {
    a(f), t == null || t(f), setTimeout(K, 0);
  }, [t, K]), Fe = L((f) => {
    K();
  }, [K]), De = L(() => {
    d(!0), o == null || o(), setTimeout(K, 0);
  }, [o, K]), Ze = L(() => {
    d(!1), l == null || l();
  }, [l]);
  le(() => {
    u && K();
  }, [u, K]), le(() => {
    Ae(), lt();
  }, [i, Ae]);
  const lt = L(() => {
    if (!N.current) return;
    N.current.querySelectorAll("a[href]").forEach((C) => {
      const y = C;
      y.hasAttribute("target") || y.setAttribute("target", "_blank"), y.hasAttribute("rel") || y.setAttribute("rel", "noopener noreferrer");
    });
  }, []);
  return le(() => {
    const f = (C) => {
      const y = C.target;
      !y.closest("img.editor-image") && !y.closest(".image-manager") && q(null);
    };
    return document.addEventListener("click", f), () => document.removeEventListener("click", f);
  }, []), le(() => {
    if (!N.current) return;
    const f = N.current, C = (O) => {
      O.preventDefault(), O.dataTransfer.dropEffect = "move";
    }, y = (O) => {
      var re;
      O.preventDefault();
      const $ = (re = O.dataTransfer) == null ? void 0 : re.getData("text/html");
      if ($ && $.includes("<img")) {
        const ne = window.getSelection();
        if (ne && ne.rangeCount > 0) {
          const Q = ne.getRangeAt(0), Z = document.createElement("div");
          Z.innerHTML = $;
          const oe = Z.querySelector("img");
          if (oe) {
            const me = f.querySelector(`img[src="${oe.src}"]`);
            me && me !== oe && me.remove(), Q.deleteContents(), Q.insertNode(oe);
            const ee = f.innerHTML;
            a(ee), t == null || t(ee);
          }
        }
      }
    };
    return f.addEventListener("dragover", C), f.addEventListener("drop", y), () => {
      f.removeEventListener("dragover", C), f.removeEventListener("drop", y);
    };
  }, [t]), /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "wysiwyg-editor",
      onKeyDown: Xe,
      role: "application",
      "aria-label": "Rich text editor with keyboard shortcuts",
      children: [
        /* @__PURE__ */ r.jsx(
          jt,
          {
            onCommand: ve,
            activeFormats: p,
            canUndo: h,
            canRedo: x
          }
        ),
        /* @__PURE__ */ r.jsx(
          Pt,
          {
            content: i,
            placeholder: e,
            onContentChange: pe,
            onFocus: De,
            onBlur: Ze,
            editorRef: N,
            onSelectionChange: Fe,
            onLinkClick: nt
          }
        ),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            ref: ye,
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "sr-only",
            role: "status"
          }
        ),
        /* @__PURE__ */ r.jsx("div", { className: "sr-only", id: "keyboard-shortcuts-help", children: "Keyboard shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline, Ctrl+K for link, Ctrl+Z for undo, Ctrl+Y for redo, Ctrl+1/2/3 for headings, Ctrl+L for left align, Ctrl+E for center align, Ctrl+R for right align, Ctrl+Shift+L for numbered list, Ctrl+\\ for clear formatting" }),
        /* @__PURE__ */ r.jsx(
          Bt,
          {
            isOpen: D,
            onClose: () => R(!1),
            onFileSelect: k === "image" ? We : Ye,
            accept: k === "image" ? "image/*" : "*/*",
            maxSize: k === "image" ? 5 * 1024 * 1024 : 10 * 1024 * 1024,
            title: k === "image" ? "Upload Image" : "Upload File",
            description: k === "image" ? "Select an image to upload and crop" : "Select a file to upload"
          }
        ),
        /* @__PURE__ */ r.jsx(
          Ht,
          {
            isOpen: g,
            imageUrl: S,
            onClose: () => {
              j(!1), U("");
            },
            onCropComplete: Le
          }
        ),
        /* @__PURE__ */ r.jsx(
          zt,
          {
            isOpen: H,
            onClose: () => Y(!1),
            onInsert: tt
          }
        ),
        /* @__PURE__ */ r.jsx(
          Wt,
          {
            isOpen: W,
            onClose: () => X(!1),
            onInsert: Je
          }
        ),
        /* @__PURE__ */ r.jsx(
          Kt,
          {
            isOpen: ae,
            onClose: () => ue(!1),
            onSubmit: Ve,
            title: ce === "create" ? "Insert Link" : "Edit Link",
            placeholder: "https://example.com",
            initialValue: Pe,
            description: ce === "create" ? "Enter the URL for the link" : "Update the URL for this link"
          }
        ),
        /* @__PURE__ */ r.jsx(
          qt,
          {
            isOpen: He,
            onClose: () => Ne(!1),
            onFindReplace: rt
          }
        ),
        /* @__PURE__ */ r.jsx(
          Yt,
          {
            isOpen: Be,
            onClose: () => $e(!1),
            title: Se.title,
            message: Se.message,
            type: Se.type
          }
        ),
        /* @__PURE__ */ r.jsx(
          Gt,
          {
            isOpen: je,
            linkUrl: te.url,
            linkText: te.text,
            position: te.position,
            onEdit: ot,
            onRemove: st,
            onGoToLink: at,
            onClose: it
          }
        ),
        G && /* @__PURE__ */ r.jsx(
          $t,
          {
            imageElement: G,
            onUpdate: et,
            onRemove: qe
          }
        )
      ]
    }
  );
}, Vt = [
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
], nr = ({
  onCommand: s,
  activeFormats: e,
  canUndo: t,
  canRedo: o
}) => {
  const l = (c) => {
    s(c.command, c.value);
  }, i = (c, h) => {
    (c.key === "Enter" || c.key === " ") && (c.preventDefault(), l(h));
  }, a = (c, h) => {
    const v = {
      bold: "BOLD",
      italic: "ITALIC",
      underline: "UNDERLINE",
      insertUnorderedList: "INSERT_UNORDERED_LIST",
      insertOrderedList: "INSERT_ORDERED_LIST",
      justifyLeft: "JUSTIFY_LEFT",
      justifyCenter: "JUSTIFY_CENTER",
      justifyRight: "JUSTIFY_RIGHT",
      createLink: "CREATE_LINK",
      editLink: "EDIT_LINK",
      unlink: "UNLINK"
    };
    if (c === "formatBlock" && h) {
      const _ = `FORMAT_${h}`;
      return e.has(_);
    }
    const x = v[c];
    return x ? e.has(x) : !1;
  }, u = (c) => c === "undo" ? !t : c === "redo" ? !o : !1, d = (c) => {
    const h = a(c.command, c.value), v = u(c.command);
    let x = c.title;
    const _ = {
      bold: "Ctrl+B",
      italic: "Ctrl+I",
      underline: "Ctrl+U",
      createLink: "Ctrl+K",
      undo: "Ctrl+Z",
      redo: "Ctrl+Y",
      removeFormat: "Ctrl+\\"
    };
    if (c.command === "formatBlock" && c.value) {
      const D = c.value.replace("H", "");
      _[`${c.command}-${c.value}`] = `Ctrl+${D}`;
    }
    c.command === "justifyLeft" && (_[c.command] = "Ctrl+L"), c.command === "justifyCenter" && (_[c.command] = "Ctrl+E"), c.command === "justifyRight" && (_[c.command] = "Ctrl+R"), c.command === "insertOrderedList" && (_[c.command] = "Ctrl+Shift+L");
    const g = c.value ? `${c.command}-${c.value}` : c.command, j = _[g];
    return j && (x += `, keyboard shortcut ${j}`), v ? x += ", disabled" : h && (x += ", currently active"), x;
  }, p = (c, h) => `toolbar-${c.value ? `${c.command}-${c.value}` : c.command}-${h}`;
  return /* @__PURE__ */ r.jsx(
    "div",
    {
      className: "toolbar",
      role: "toolbar",
      "aria-label": "Text formatting toolbar",
      children: Vt.map((c, h) => {
        const v = a(c.command, c.value), x = u(c.command);
        return /* @__PURE__ */ r.jsx(
          "button",
          {
            id: p(c, h),
            className: `toolbar-button ${v ? "active" : ""}`,
            title: c.title,
            "aria-label": d(c),
            "aria-pressed": v,
            disabled: x,
            tabIndex: x ? -1 : 0,
            onClick: () => l(c),
            onKeyDown: (_) => i(_, c),
            onMouseDown: (_) => {
              _.preventDefault();
            },
            children: /* @__PURE__ */ r.jsx("span", { "aria-hidden": "true", children: c.icon })
          },
          p(c, h)
        );
      })
    }
  );
}, or = {
  allowedTags: ["p", "br", "strong", "em", "u", "h1", "h2", "h3", "ul", "ol", "li", "a"],
  allowedAttributes: {
    a: ["href", "title"],
    "*": ["style"]
    // Limited style attributes only
  }
};
export {
  jt as AdvancedToolbar,
  Jt as COMMANDS,
  ft as CommandExecutor,
  Ut as ContentSanitizer,
  or as DEFAULT_SANITIZATION_CONFIG,
  Pt as EditableArea,
  nr as Toolbar,
  rr as WYSIWYGEditor,
  Mt as contentSanitizer,
  rr as default,
  tr as focusEditor,
  Ft as focusEditorWithSelection,
  _t as getActiveFormats,
  At as getCurrentBlockFormat,
  bt as getCurrentSelection,
  Ot as isSelectionInEditor,
  yt as restoreSelection,
  er as saveSelection
};
//# sourceMappingURL=wysiwyg-editor.es.js.map
