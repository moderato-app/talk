var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function _mergeNamespaces(n2, m2) {
  for (var i3 = 0; i3 < m2.length; i3++) {
    const e3 = m2[i3];
    if (typeof e3 !== "string" && !Array.isArray(e3)) {
      for (const k2 in e3) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e3, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e3[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$5 = Symbol.for("react.element"), n$4 = Symbol.for("react.portal"), p$7 = Symbol.for("react.fragment"), q$4 = Symbol.for("react.strict_mode"), r$5 = Symbol.for("react.profiler"), t$7 = Symbol.for("react.provider"), u$6 = Symbol.for("react.context"), v$4 = Symbol.for("react.forward_ref"), w$3 = Symbol.for("react.suspense"), x$1 = Symbol.for("react.memo"), y$3 = Symbol.for("react.lazy"), z$2 = Symbol.iterator;
function A$2(a2) {
  if (null === a2 || "object" !== typeof a2)
    return null;
  a2 = z$2 && a2[z$2] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$2(a2, b2, e3) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e3 || B$1;
}
E$2.prototype.isReactComponent = {};
E$2.prototype.setState = function(a2, b2) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b2, "setState");
};
E$2.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$2.prototype;
function G$1(a2, b2, e3) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e3 || B$1;
}
var H$2 = G$1.prototype = new F$1();
H$2.constructor = G$1;
C$2(H$2, E$2.prototype);
H$2.isPureReactComponent = true;
var I$3 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$6(a2, b2, e3) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (null != b2)
    for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2)
      J$1.call(b2, d2) && !L$1.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
  var g2 = arguments.length - 2;
  if (1 === g2)
    c2.children = e3;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
      f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps)
    for (d2 in g2 = a2.defaultProps, g2)
      void 0 === c2[d2] && (c2[d2] = g2[d2]);
  return { $$typeof: l$5, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$3(a2, b2) {
  return { $$typeof: l$5, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$1(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$5;
}
function escape(a2) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b2[a3];
  });
}
var P$1 = /\/+/g;
function Q$1(a2, b2) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
}
function R$2(a2, b2, e3, d2, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2)
    a2 = null;
  var h2 = false;
  if (null === a2)
    h2 = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$5:
          case n$4:
            h2 = true;
        }
    }
  if (h2)
    return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q$1(h2, 0) : d2, I$3(c2) ? (e3 = "", null != a2 && (e3 = a2.replace(P$1, "$&/") + "/"), R$2(c2, b2, e3, "", function(a3) {
      return a3;
    })) : null != c2 && (O$1(c2) && (c2 = N$3(c2, e3 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$1, "$&/") + "/") + a2)), b2.push(c2)), 1;
  h2 = 0;
  d2 = "" === d2 ? "." : d2 + ":";
  if (I$3(a2))
    for (var g2 = 0; g2 < a2.length; g2++) {
      k2 = a2[g2];
      var f2 = d2 + Q$1(k2, g2);
      h2 += R$2(k2, b2, e3, f2, c2);
    }
  else if (f2 = A$2(a2), "function" === typeof f2)
    for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; )
      k2 = k2.value, f2 = d2 + Q$1(k2, g2++), h2 += R$2(k2, b2, e3, f2, c2);
  else if ("object" === k2)
    throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$4(a2, b2, e3) {
  if (null == a2)
    return a2;
  var d2 = [], c2 = 0;
  R$2(a2, d2, "", "", function(a3) {
    return b2.call(e3, a3, c2++);
  });
  return d2;
}
function T$3(a2) {
  if (-1 === a2._status) {
    var b2 = a2._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a2._status || -1 === a2._status)
        a2._status = 1, a2._result = b3;
    }, function(b3) {
      if (0 === a2._status || -1 === a2._status)
        a2._status = 2, a2._result = b3;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b2);
  }
  if (1 === a2._status)
    return a2._result.default;
  throw a2._result;
}
var U$3 = { current: null }, V$1 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$3, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
react_production_min.Children = { map: S$4, forEach: function(a2, b2, e3) {
  S$4(a2, function() {
    b2.apply(this, arguments);
  }, e3);
}, count: function(a2) {
  var b2 = 0;
  S$4(a2, function() {
    b2++;
  });
  return b2;
}, toArray: function(a2) {
  return S$4(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$1(a2))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$2;
react_production_min.Fragment = p$7;
react_production_min.Profiler = r$5;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$4;
react_production_min.Suspense = w$3;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.cloneElement = function(a2, b2, e3) {
  if (null === a2 || void 0 === a2)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d2 = C$2({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h2 = K$1.current);
    void 0 !== b2.key && (c2 = "" + b2.key);
    if (a2.type && a2.type.defaultProps)
      var g2 = a2.type.defaultProps;
    for (f2 in b2)
      J$1.call(b2, f2) && !L$1.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d2.children = e3;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$5, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$6, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$7, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$6;
react_production_min.createFactory = function(a2) {
  var b2 = M$6.bind(null, a2);
  b2.type = a2;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$4, render: a2 };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$3, _payload: { _status: -1, _result: a2 }, _init: T$3 };
};
react_production_min.memo = function(a2, b2) {
  return { $$typeof: x$1, type: a2, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a2) {
  var b2 = V$1.transition;
  V$1.transition = {};
  try {
    a2();
  } finally {
    V$1.transition = b2;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a2, b2) {
  return U$3.current.useCallback(a2, b2);
};
react_production_min.useContext = function(a2) {
  return U$3.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$3.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b2) {
  return U$3.current.useEffect(a2, b2);
};
react_production_min.useId = function() {
  return U$3.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b2, e3) {
  return U$3.current.useImperativeHandle(a2, b2, e3);
};
react_production_min.useInsertionEffect = function(a2, b2) {
  return U$3.current.useInsertionEffect(a2, b2);
};
react_production_min.useLayoutEffect = function(a2, b2) {
  return U$3.current.useLayoutEffect(a2, b2);
};
react_production_min.useMemo = function(a2, b2) {
  return U$3.current.useMemo(a2, b2);
};
react_production_min.useReducer = function(a2, b2, e3) {
  return U$3.current.useReducer(a2, b2, e3);
};
react_production_min.useRef = function(a2) {
  return U$3.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$3.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b2, e3) {
  return U$3.current.useSyncExternalStore(a2, b2, e3);
};
react_production_min.useTransition = function() {
  return U$3.current.useTransition();
};
react_production_min.version = "18.2.0";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const e$5 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$4 = reactExports, k$1 = Symbol.for("react.element"), l$4 = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n$3 = f$4.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$6 = { key: true, ref: true, __self: true, __source: true };
function q$3(c2, a2, g2) {
  var b2, d2 = {}, e3 = null, h2 = null;
  void 0 !== g2 && (e3 = "" + g2);
  void 0 !== a2.key && (e3 = "" + a2.key);
  void 0 !== a2.ref && (h2 = a2.ref);
  for (b2 in a2)
    m$2.call(a2, b2) && !p$6.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      void 0 === d2[b2] && (d2[b2] = a2[b2]);
  return { $$typeof: k$1, type: c2, key: e3, ref: h2, props: d2, _owner: n$3.current };
}
reactJsxRuntime_production_min.Fragment = l$4;
reactJsxRuntime_production_min.jsx = q$3;
reactJsxRuntime_production_min.jsxs = q$3;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b2) {
    var c2 = a2.length;
    a2.push(b2);
    a:
      for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e3 = a2[d2];
        if (0 < g2(e3, b2))
          a2[d2] = b2, a2[c2] = e3, c2 = d2;
        else
          break a;
      }
  }
  function h2(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length)
      return null;
    var b2 = a2[0], c2 = a2.pop();
    if (c2 !== b2) {
      a2[0] = c2;
      a:
        for (var d2 = 0, e3 = a2.length, w2 = e3 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g2(C2, c2))
            n2 < e3 && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
          else if (n2 < e3 && 0 > g2(x2, c2))
            a2[d2] = x2, a2[n2] = c2, d2 = n2;
          else
            break a;
        }
    }
    return b2;
  }
  function g2(a2, b2) {
    var c2 = a2.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r3 = [], t4 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b2 = h2(t4); null !== b2; ) {
      if (null === b2.callback)
        k2(t4);
      else if (b2.startTime <= a2)
        k2(t4), b2.sortIndex = b2.expirationTime, f2(r3, b2);
      else
        break;
      b2 = h2(t4);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2)
      if (null !== h2(r3))
        A2 = true, I2(J2);
      else {
        var b2 = h2(t4);
        null !== b2 && K2(H2, b2.startTime - a2);
      }
  }
  function J2(a2, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h2(r3); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M2()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e3 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e3 ? v2.callback = e3 : v2 === h2(r3) && k2(r3);
          G2(b2);
        } else
          k2(r3);
        v2 = h2(r3);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h2(t4);
        null !== m2 && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b2 = true;
      try {
        b2 = O2(true, a2);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b2) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r3);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b2) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b2, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a2) {
      case 1:
        var e3 = -1;
        break;
      case 2:
        e3 = 250;
        break;
      case 5:
        e3 = 1073741823;
        break;
      case 4:
        e3 = 1e4;
        break;
      default:
        e3 = 5e3;
    }
    e3 = c2 + e3;
    a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e3, sortIndex: -1 };
    c2 > d2 ? (a2.sortIndex = c2, f2(t4, a2), null === h2(r3) && a2 === h2(t4) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e3, f2(r3, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$5(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a2, b2) {
  ha(a2, b2);
  ha(a2 + "Capture", b2);
}
function ha(a2, b2) {
  ea[a2] = b2;
  for (a2 = 0; a2 < b2.length; a2++)
    da.add(b2[a2]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a2) {
  if (ja.call(ma, a2))
    return true;
  if (ja.call(la, a2))
    return false;
  if (ka.test(a2))
    return ma[a2] = true;
  la[a2] = true;
  return false;
}
function pa(a2, b2, c2, d2) {
  if (null !== c2 && 0 === c2.type)
    return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2)
        return false;
      if (null !== c2)
        return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa(a2, b2, c2, d2) {
  if (null === b2 || "undefined" === typeof b2 || pa(a2, b2, c2, d2))
    return true;
  if (d2)
    return false;
  if (null !== c2)
    switch (c2.type) {
      case 3:
        return !b2;
      case 4:
        return false === b2;
      case 5:
        return isNaN(b2);
      case 6:
        return isNaN(b2) || 1 > b2;
    }
  return false;
}
function v$3(a2, b2, c2, d2, e3, f2, g2) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d2;
  this.attributeNamespace = e3;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z$1[a2] = new v$3(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  z$1[b2] = new v$3(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z$1[a2] = new v$3(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(
    ra,
    sa
  );
  z$1[b2] = new v$3(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(ra, sa);
  z$1[b2] = new v$3(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(ra, sa);
  z$1[b2] = new v$3(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new v$3("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z$1[a2] = new v$3(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta(a2, b2, c2, d2) {
  var e3 = z$1.hasOwnProperty(b2) ? z$1[b2] : null;
  if (null !== e3 ? 0 !== e3.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1])
    qa(b2, c2, e3, d2) && (c2 = null), d2 || null === e3 ? oa(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e3.mustUseProperty ? a2[e3.propertyName] = null === c2 ? 3 === e3.type ? false : "" : c2 : (b2 = e3.attributeName, d2 = e3.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e3 = e3.type, c2 = 3 === e3 || 4 === e3 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b2, c2) : a2.setAttribute(b2, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a2) {
  if (null === a2 || "object" !== typeof a2)
    return null;
  a2 = Ja && a2[Ja] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A$1 = Object.assign, La;
function Ma(a2) {
  if (void 0 === La)
    try {
      throw Error();
    } catch (c2) {
      var b2 = c2.stack.trim().match(/\n( *(at )?)/);
      La = b2 && b2[1] || "";
    }
  return "\n" + La + a2;
}
var Na = false;
function Oa(a2, b2) {
  if (!a2 || Na)
    return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2)
      if (b2 = function() {
        throw Error();
      }, Object.defineProperty(b2.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b2, []);
        } catch (l2) {
          var d2 = l2;
        }
        Reflect.construct(a2, [], b2);
      } else {
        try {
          b2.call();
        } catch (l2) {
          d2 = l2;
        }
        a2.call(b2.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d2 && "string" === typeof l2.stack) {
      for (var e3 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e3.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e3[g2] !== f2[h2]; )
        h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--)
        if (e3[g2] !== f2[h2]) {
          if (1 !== g2 || 1 !== h2) {
            do
              if (g2--, h2--, 0 > h2 || e3[g2] !== f2[h2]) {
                var k2 = "\n" + e3[g2].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g2 && 0 <= h2);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
}
function Pa(a2) {
  switch (a2.tag) {
    case 5:
      return Ma(a2.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa(a2.type, false), a2;
    case 11:
      return a2 = Oa(a2.type.render, false), a2;
    case 1:
      return a2 = Oa(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa(a2) {
  if (null == a2)
    return null;
  if ("function" === typeof a2)
    return a2.displayName || a2.name || null;
  if ("string" === typeof a2)
    return a2;
  switch (a2) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a2)
    switch (a2.$$typeof) {
      case Ca:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga:
        return b2 = a2.displayName || null, null !== b2 ? b2 : Qa(a2.type) || "Memo";
      case Ha:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return Qa(a2(b2));
        } catch (c2) {
        }
    }
  return null;
}
function Ra(a2) {
  var b2 = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b2);
    case 8:
      return b2 === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2)
        return b2.displayName || b2.name || null;
      if ("string" === typeof b2)
        return b2;
  }
  return null;
}
function Sa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta(a2) {
  var b2 = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua(a2) {
  var b2 = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d2 = "" + a2[b2];
  if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e3 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b2, { configurable: true, get: function() {
      return e3.call(this);
    }, set: function(a3) {
      d2 = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a3) {
      d2 = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b2];
    } };
  }
}
function Va(a2) {
  a2._valueTracker || (a2._valueTracker = Ua(a2));
}
function Wa(a2) {
  if (!a2)
    return false;
  var b2 = a2._valueTracker;
  if (!b2)
    return true;
  var c2 = b2.getValue();
  var d2 = "";
  a2 && (d2 = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d2;
  return a2 !== c2 ? (b2.setValue(a2), true) : false;
}
function Xa(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2)
    return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b2) {
    return a2.body;
  }
}
function Ya(a2, b2) {
  var c2 = b2.checked;
  return A$1({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za(a2, b2) {
  var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
  c2 = Sa(null != b2.value ? b2.value : c2);
  a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab(a2, b2) {
  b2 = b2.checked;
  null != b2 && ta(a2, "checked", b2, false);
}
function bb(a2, b2) {
  ab(a2, b2);
  var c2 = Sa(b2.value), d2 = b2.type;
  if (null != c2)
    if ("number" === d2) {
      if (0 === c2 && "" === a2.value || a2.value != c2)
        a2.value = "" + c2;
    } else
      a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d2 || "reset" === d2) {
    a2.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a2, b2.type, Sa(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
}
function db(a2, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d2 = b2.type;
    if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value))
      return;
    b2 = "" + a2._wrapperState.initialValue;
    c2 || b2 === a2.value || (a2.value = b2);
    a2.defaultValue = b2;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb(a2, b2, c2) {
  if ("number" !== b2 || Xa(a2.ownerDocument) !== a2)
    null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a2, b2, c2, d2) {
  a2 = a2.options;
  if (b2) {
    b2 = {};
    for (var e3 = 0; e3 < c2.length; e3++)
      b2["$" + c2[e3]] = true;
    for (c2 = 0; c2 < a2.length; c2++)
      e3 = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e3 && (a2[c2].selected = e3), e3 && d2 && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b2 = null;
    for (e3 = 0; e3 < a2.length; e3++) {
      if (a2[e3].value === c2) {
        a2[e3].selected = true;
        d2 && (a2[e3].defaultSelected = true);
        return;
      }
      null !== b2 || a2[e3].disabled || (b2 = a2[e3]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb(a2, b2) {
  if (null != b2.dangerouslySetInnerHTML)
    throw Error(p$5(91));
  return A$1({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb(a2, b2) {
  var c2 = b2.value;
  if (null == c2) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (null != c2) {
      if (null != b2)
        throw Error(p$5(92));
      if (eb(c2)) {
        if (1 < c2.length)
          throw Error(p$5(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    null == b2 && (b2 = "");
    c2 = b2;
  }
  a2._wrapperState = { initialValue: Sa(c2) };
}
function ib(a2, b2) {
  var c2 = Sa(b2.value), d2 = Sa(b2.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d2 && (a2.defaultValue = "" + d2);
}
function jb(a2) {
  var b2 = a2.textContent;
  b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
}
function kb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a2, b2) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb, nb = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e3) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b2, c2, d2, e3);
    });
  } : a2;
}(function(a2, b2) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2)
    a2.innerHTML = b2;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb.firstChild; a2.firstChild; )
      a2.removeChild(a2.firstChild);
    for (; b2.firstChild; )
      a2.appendChild(b2.firstChild);
  }
});
function ob(a2, b2) {
  if (b2) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b2;
      return;
    }
  }
  a2.textContent = b2;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a2) {
  qb.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb[b2] = pb[a2];
  });
});
function rb(a2, b2, c2) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b2).trim() : b2 + "px";
}
function sb(a2, b2) {
  a2 = a2.style;
  for (var c2 in b2)
    if (b2.hasOwnProperty(c2)) {
      var d2 = 0 === c2.indexOf("--"), e3 = rb(c2, b2[c2], d2);
      "float" === c2 && (c2 = "cssFloat");
      d2 ? a2.setProperty(c2, e3) : a2[c2] = e3;
    }
}
var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a2, b2) {
  if (b2) {
    if (tb[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML))
      throw Error(p$5(137, a2));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children)
        throw Error(p$5(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML))
        throw Error(p$5(61));
    }
    if (null != b2.style && "object" !== typeof b2.style)
      throw Error(p$5(62));
  }
}
function vb(a2, b2) {
  if (-1 === a2.indexOf("-"))
    return "string" === typeof b2.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb = null, zb = null, Ab = null;
function Bb(a2) {
  if (a2 = Cb(a2)) {
    if ("function" !== typeof yb)
      throw Error(p$5(280));
    var b2 = a2.stateNode;
    b2 && (b2 = Db(b2), yb(a2.stateNode, a2.type, b2));
  }
}
function Eb(a2) {
  zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
}
function Fb() {
  if (zb) {
    var a2 = zb, b2 = Ab;
    Ab = zb = null;
    Bb(a2);
    if (b2)
      for (a2 = 0; a2 < b2.length; a2++)
        Bb(b2[a2]);
  }
}
function Gb(a2, b2) {
  return a2(b2);
}
function Hb() {
}
var Ib = false;
function Jb(a2, b2, c2) {
  if (Ib)
    return a2(b2, c2);
  Ib = true;
  try {
    return Gb(a2, b2, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab)
      Hb(), Fb();
  }
}
function Kb(a2, b2) {
  var c2 = a2.stateNode;
  if (null === c2)
    return null;
  var d2 = Db(c2);
  if (null === d2)
    return null;
  c2 = d2[b2];
  a:
    switch (b2) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
        a2 = !d2;
        break a;
      default:
        a2 = false;
    }
  if (a2)
    return null;
  if (c2 && "function" !== typeof c2)
    throw Error(p$5(231, b2, typeof c2));
  return c2;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a2) {
    Lb = false;
  }
function Nb(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
  Ob = true;
  Pb = a2;
} };
function Tb(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p$5(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a2) {
  var b2 = a2, c2 = a2;
  if (a2.alternate)
    for (; b2.return; )
      b2 = b2.return;
  else {
    a2 = b2;
    do
      b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
    while (a2);
  }
  return 3 === b2.tag ? c2 : null;
}
function Wb(a2) {
  if (13 === a2.tag) {
    var b2 = a2.memoizedState;
    null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
    if (null !== b2)
      return b2.dehydrated;
  }
  return null;
}
function Xb(a2) {
  if (Vb(a2) !== a2)
    throw Error(p$5(188));
}
function Yb(a2) {
  var b2 = a2.alternate;
  if (!b2) {
    b2 = Vb(a2);
    if (null === b2)
      throw Error(p$5(188));
    return b2 !== a2 ? null : a2;
  }
  for (var c2 = a2, d2 = b2; ; ) {
    var e3 = c2.return;
    if (null === e3)
      break;
    var f2 = e3.alternate;
    if (null === f2) {
      d2 = e3.return;
      if (null !== d2) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e3.child === f2.child) {
      for (f2 = e3.child; f2; ) {
        if (f2 === c2)
          return Xb(e3), a2;
        if (f2 === d2)
          return Xb(e3), b2;
        f2 = f2.sibling;
      }
      throw Error(p$5(188));
    }
    if (c2.return !== d2.return)
      c2 = e3, d2 = f2;
    else {
      for (var g2 = false, h2 = e3.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e3;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e3;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e3;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e3;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2)
          throw Error(p$5(189));
      }
    }
    if (c2.alternate !== d2)
      throw Error(p$5(190));
  }
  if (3 !== c2.tag)
    throw Error(p$5(188));
  return c2.stateNode.current === c2 ? a2 : b2;
}
function Zb(a2) {
  a2 = Yb(a2);
  return null !== a2 ? $b(a2) : null;
}
function $b(a2) {
  if (5 === a2.tag || 6 === a2.tag)
    return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b2 = $b(a2);
    if (null !== b2)
      return b2;
    a2 = a2.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a2) {
  if (lc && "function" === typeof lc.onCommitFiberRoot)
    try {
      lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
    } catch (b2) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc(a2, b2) {
  var c2 = a2.pendingLanes;
  if (0 === c2)
    return 0;
  var d2 = 0, e3 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e3;
    0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
  } else
    g2 = c2 & ~e3, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
  if (0 === d2)
    return 0;
  if (0 !== b2 && b2 !== d2 && 0 === (b2 & e3) && (e3 = d2 & -d2, f2 = b2 & -b2, e3 >= f2 || 16 === e3 && 0 !== (f2 & 4194240)))
    return b2;
  0 !== (d2 & 4) && (d2 |= c2 & 16);
  b2 = a2.entangledLanes;
  if (0 !== b2)
    for (a2 = a2.entanglements, b2 &= d2; 0 < b2; )
      c2 = 31 - oc(b2), e3 = 1 << c2, d2 |= a2[c2], b2 &= ~e3;
  return d2;
}
function vc(a2, b2) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a2, b2) {
  for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e3 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e3[g2];
    if (-1 === k2) {
      if (0 === (h2 & c2) || 0 !== (h2 & d2))
        e3[g2] = vc(h2, b2);
    } else
      k2 <= b2 && (a2.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a2 = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a2;
}
function zc(a2) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++)
    b2.push(a2);
  return b2;
}
function Ac(a2, b2, c2) {
  a2.pendingLanes |= b2;
  536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b2 = 31 - oc(b2);
  a2[b2] = c2;
}
function Bc(a2, b2) {
  var c2 = a2.pendingLanes & ~b2;
  a2.pendingLanes = b2;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b2;
  a2.mutableReadLanes &= b2;
  a2.entangledLanes &= b2;
  b2 = a2.entanglements;
  var d2 = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e3 = 31 - oc(c2), f2 = 1 << e3;
    b2[e3] = 0;
    d2[e3] = -1;
    a2[e3] = -1;
    c2 &= ~f2;
  }
}
function Cc(a2, b2) {
  var c2 = a2.entangledLanes |= b2;
  for (a2 = a2.entanglements; c2; ) {
    var d2 = 31 - oc(c2), e3 = 1 << d2;
    e3 & b2 | a2[d2] & b2 && (a2[d2] |= b2);
    c2 &= ~e3;
  }
}
var C$1 = 0;
function Dc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a2, b2) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b2.pointerId);
  }
}
function Tc(a2, b2, c2, d2, e3, f2) {
  if (null === a2 || a2.nativeEvent !== f2)
    return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e3] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a2;
  a2.eventSystemFlags |= d2;
  b2 = a2.targetContainers;
  null !== e3 && -1 === b2.indexOf(e3) && b2.push(e3);
  return a2;
}
function Uc(a2, b2, c2, d2, e3) {
  switch (b2) {
    case "focusin":
      return Lc = Tc(Lc, a2, b2, c2, d2, e3), true;
    case "dragenter":
      return Mc = Tc(Mc, a2, b2, c2, d2, e3), true;
    case "mouseover":
      return Nc = Tc(Nc, a2, b2, c2, d2, e3), true;
    case "pointerover":
      var f2 = e3.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a2, b2, c2, d2, e3));
      return true;
    case "gotpointercapture":
      return f2 = e3.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b2, c2, d2, e3)), true;
  }
  return false;
}
function Vc(a2) {
  var b2 = Wc(a2.target);
  if (null !== b2) {
    var c2 = Vb(b2);
    if (null !== c2) {
      if (b2 = c2.tag, 13 === b2) {
        if (b2 = Wb(c2), null !== b2) {
          a2.blockedOn = b2;
          Ic(a2.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc(a2) {
  if (null !== a2.blockedOn)
    return false;
  for (var b2 = a2.targetContainers; 0 < b2.length; ) {
    var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      wb = d2;
      c2.target.dispatchEvent(d2);
      wb = null;
    } else
      return b2 = Cb(c2), null !== b2 && Fc(b2), a2.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Zc(a2, b2, c2) {
  Xc(a2) && c2.delete(b2);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a2, b2) {
  a2.blockedOn === b2 && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a2) {
  function b2(b3) {
    return ad(b3, a2);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a2);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d2 = Kc[c2];
      d2.blockedOn === a2 && (d2.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a2);
  null !== Mc && ad(Mc, a2);
  null !== Nc && ad(Nc, a2);
  Oc.forEach(b2);
  Pc.forEach(b2);
  for (c2 = 0; c2 < Qc.length; c2++)
    d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); )
    Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a2, b2, c2, d2) {
  var e3 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 1, fd(a2, b2, c2, d2);
  } finally {
    C$1 = e3, cd.transition = f2;
  }
}
function gd(a2, b2, c2, d2) {
  var e3 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 4, fd(a2, b2, c2, d2);
  } finally {
    C$1 = e3, cd.transition = f2;
  }
}
function fd(a2, b2, c2, d2) {
  if (dd) {
    var e3 = Yc(a2, b2, c2, d2);
    if (null === e3)
      hd(a2, b2, d2, id, c2), Sc(a2, d2);
    else if (Uc(e3, a2, b2, c2, d2))
      d2.stopPropagation();
    else if (Sc(a2, d2), b2 & 4 && -1 < Rc.indexOf(a2)) {
      for (; null !== e3; ) {
        var f2 = Cb(e3);
        null !== f2 && Ec(f2);
        f2 = Yc(a2, b2, c2, d2);
        null === f2 && hd(a2, b2, d2, id, c2);
        if (f2 === e3)
          break;
        e3 = f2;
      }
      null !== e3 && d2.stopPropagation();
    } else
      hd(a2, b2, d2, null, c2);
  }
}
var id = null;
function Yc(a2, b2, c2, d2) {
  id = null;
  a2 = xb(d2);
  a2 = Wc(a2);
  if (null !== a2)
    if (b2 = Vb(a2), null === b2)
      a2 = null;
    else if (c2 = b2.tag, 13 === c2) {
      a2 = Wb(b2);
      if (null !== a2)
        return a2;
      a2 = null;
    } else if (3 === c2) {
      if (b2.stateNode.current.memoizedState.isDehydrated)
        return 3 === b2.tag ? b2.stateNode.containerInfo : null;
      a2 = null;
    } else
      b2 !== a2 && (a2 = null);
  id = a2;
  return null;
}
function jd(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a2, b2 = ld, c2 = b2.length, d2, e3 = "value" in kd ? kd.value : kd.textContent, f2 = e3.length;
  for (a2 = 0; a2 < c2 && b2[a2] === e3[a2]; a2++)
    ;
  var g2 = c2 - a2;
  for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e3[f2 - d2]; d2++)
    ;
  return md = e3.slice(a2, 1 < d2 ? 1 - d2 : void 0);
}
function od(a2) {
  var b2 = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b2(b3, d2, e3, f2, g2) {
    this._reactName = b3;
    this._targetInst = e3;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a2)
      a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2)
    return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a2) {
  if (a2.key) {
    var b2 = Md[a2.key] || a2.key;
    if ("Unidentified" !== b2)
      return b2;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae$1 = ia && "CompositionEvent" in window, be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce = ia && "TextEvent" in window && !be$1, de = ia && (!ae$1 || be$1 && 8 < be$1 && 11 >= be$1), ee$1 = String.fromCharCode(32), fe = false;
function ge(a2, b2) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie = false;
function je$1(a2, b2) {
  switch (a2) {
    case "compositionend":
      return he(b2);
    case "keypress":
      if (32 !== b2.which)
        return null;
      fe = true;
      return ee$1;
    case "textInput":
      return a2 = b2.data, a2 === ee$1 && fe ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b2) {
  if (ie)
    return "compositionend" === a2 || !ae$1 && ge(a2, b2) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length)
          return b2.char;
        if (b2.which)
          return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b2 ? !!le$1[a2.type] : "textarea" === b2 ? true : false;
}
function ne$1(a2, b2, c2, d2) {
  Eb(d2);
  b2 = oe$1(b2, "onChange");
  0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b2 }));
}
var pe = null, qe$1 = null;
function re$1(a2) {
  se$1(a2, 0);
}
function te$1(a2) {
  var b2 = ue(a2);
  if (Wa(b2))
    return a2;
}
function ve(a2, b2) {
  if ("change" === a2)
    return b2;
}
var we = false;
if (ia) {
  var xe$1;
  if (ia) {
    var ye$1 = "oninput" in document;
    if (!ye$1) {
      var ze$1 = document.createElement("div");
      ze$1.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze$1.oninput;
    }
    xe$1 = ye$1;
  } else
    xe$1 = false;
  we = xe$1 && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be$1), qe$1 = pe = null);
}
function Be$1(a2) {
  if ("value" === a2.propertyName && te$1(qe$1)) {
    var b2 = [];
    ne$1(b2, qe$1, a2, xb(a2));
    Jb(re$1, b2);
  }
}
function Ce(a2, b2, c2) {
  "focusin" === a2 ? (Ae(), pe = b2, qe$1 = c2, pe.attachEvent("onpropertychange", Be$1)) : "focusout" === a2 && Ae();
}
function De$1(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2)
    return te$1(qe$1);
}
function Ee(a2, b2) {
  if ("click" === a2)
    return te$1(b2);
}
function Fe$1(a2, b2) {
  if ("input" === a2 || "change" === a2)
    return te$1(b2);
}
function Ge$2(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var He$2 = "function" === typeof Object.is ? Object.is : Ge$2;
function Ie(a2, b2) {
  if (He$2(a2, b2))
    return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2)
    return false;
  var c2 = Object.keys(a2), d2 = Object.keys(b2);
  if (c2.length !== d2.length)
    return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e3 = c2[d2];
    if (!ja.call(b2, e3) || !He$2(a2[e3], b2[e3]))
      return false;
  }
  return true;
}
function Je$1(a2) {
  for (; a2 && a2.firstChild; )
    a2 = a2.firstChild;
  return a2;
}
function Ke$1(a2, b2) {
  var c2 = Je$1(a2);
  a2 = 0;
  for (var d2; c2; ) {
    if (3 === c2.nodeType) {
      d2 = a2 + c2.textContent.length;
      if (a2 <= b2 && d2 >= b2)
        return { node: c2, offset: b2 - a2 };
      a2 = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je$1(c2);
  }
}
function Le$1(a2, b2) {
  return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Le$1(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b2 = Xa(); b2 instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b2.contentWindow.location.href;
    } catch (d2) {
      c2 = false;
    }
    if (c2)
      a2 = b2.contentWindow;
    else
      break;
    b2 = Xa(a2.document);
  }
  return b2;
}
function Ne$2(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
}
function Oe(a2) {
  var b2 = Me(), c2 = a2.focusedElem, d2 = a2.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Le$1(c2.ownerDocument.documentElement, c2)) {
    if (null !== d2 && Ne$2(c2)) {
      if (b2 = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2)
        c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e3 = c2.textContent.length, f2 = Math.min(d2.start, e3);
        d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e3);
        !a2.extend && f2 > d2 && (e3 = d2, d2 = f2, f2 = e3);
        e3 = Ke$1(c2, f2);
        var g2 = Ke$1(
          c2,
          d2
        );
        e3 && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e3.node || a2.anchorOffset !== e3.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e3.node, e3.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b2), a2.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a2.addRange(b2)));
      }
    }
    b2 = [];
    for (a2 = c2; a2 = a2.parentNode; )
      1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++)
      a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe$1 = ia && "documentMode" in document && 11 >= document.documentMode, Qe$1 = null, Re$1 = null, Se$1 = null, Te = false;
function Ue(a2, b2, c2) {
  var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te || null == Qe$1 || Qe$1 !== Xa(d2) || (d2 = Qe$1, "selectionStart" in d2 && Ne$2(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se$1 && Ie(Se$1, d2) || (Se$1 = d2, d2 = oe$1(Re$1, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d2 }), b2.target = Qe$1)));
}
function Ve$1(a2, b2) {
  var c2 = {};
  c2[a2.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b2;
  c2["Moz" + a2] = "moz" + b2;
  return c2;
}
var We$1 = { animationend: Ve$1("Animation", "AnimationEnd"), animationiteration: Ve$1("Animation", "AnimationIteration"), animationstart: Ve$1("Animation", "AnimationStart"), transitionend: Ve$1("Transition", "TransitionEnd") }, Xe$1 = {}, Ye$1 = {};
ia && (Ye$1 = document.createElement("div").style, "AnimationEvent" in window || (delete We$1.animationend.animation, delete We$1.animationiteration.animation, delete We$1.animationstart.animation), "TransitionEvent" in window || delete We$1.transitionend.transition);
function Ze$1(a2) {
  if (Xe$1[a2])
    return Xe$1[a2];
  if (!We$1[a2])
    return a2;
  var b2 = We$1[a2], c2;
  for (c2 in b2)
    if (b2.hasOwnProperty(c2) && c2 in Ye$1)
      return Xe$1[a2] = b2[c2];
  return a2;
}
var $e$1 = Ze$1("animationend"), af = Ze$1("animationiteration"), bf = Ze$1("animationstart"), cf = Ze$1("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b2) {
  df.set(a2, b2);
  fa(b2, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e$1, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b2, c2) {
  var d2 = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub(d2, b2, void 0, a2);
  a2.currentTarget = null;
}
function se$1(a2, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d2 = a2[c2], e3 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b2)
        for (var g2 = d2.length - 1; 0 <= g2; g2--) {
          var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e3.isPropagationStopped())
            break a;
          nf(e3, h2, l2);
          f2 = k2;
        }
      else
        for (g2 = 0; g2 < d2.length; g2++) {
          h2 = d2[g2];
          k2 = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e3.isPropagationStopped())
            break a;
          nf(e3, h2, l2);
          f2 = k2;
        }
    }
  }
  if (Qb)
    throw a2 = Rb, Qb = false, Rb = null, a2;
}
function D$1(a2, b2) {
  var c2 = b2[of];
  void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
  var d2 = a2 + "__bubble";
  c2.has(d2) || (pf(b2, a2, 2, false), c2.add(d2));
}
function qf(a2, b2, c2) {
  var d2 = 0;
  b2 && (d2 |= 4);
  pf(c2, a2, d2, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a2), qf(b3, true, a2));
    });
    var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a2, b2, c2, d2) {
  switch (jd(b2)) {
    case 1:
      var e3 = ed;
      break;
    case 4:
      e3 = gd;
      break;
    default:
      e3 = fd;
  }
  c2 = e3.bind(null, b2, c2, a2);
  e3 = void 0;
  !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e3 = true);
  d2 ? void 0 !== e3 ? a2.addEventListener(b2, c2, { capture: true, passive: e3 }) : a2.addEventListener(b2, c2, true) : void 0 !== e3 ? a2.addEventListener(b2, c2, { passive: e3 }) : a2.addEventListener(b2, c2, false);
}
function hd(a2, b2, c2, d2, e3) {
  var f2 = d2;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2)
    a:
      for (; ; ) {
        if (null === d2)
          return;
        var g2 = d2.tag;
        if (3 === g2 || 4 === g2) {
          var h2 = d2.stateNode.containerInfo;
          if (h2 === e3 || 8 === h2.nodeType && h2.parentNode === e3)
            break;
          if (4 === g2)
            for (g2 = d2.return; null !== g2; ) {
              var k2 = g2.tag;
              if (3 === k2 || 4 === k2) {
                if (k2 = g2.stateNode.containerInfo, k2 === e3 || 8 === k2.nodeType && k2.parentNode === e3)
                  return;
              }
              g2 = g2.return;
            }
          for (; null !== h2; ) {
            g2 = Wc(h2);
            if (null === g2)
              return;
            k2 = g2.tag;
            if (5 === k2 || 6 === k2) {
              d2 = f2 = g2;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d2 = d2.return;
      }
  Jb(function() {
    var d3 = f2, e4 = xb(c2), g3 = [];
    a: {
      var h3 = df.get(a2);
      if (void 0 !== h3) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2))
              break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e$1:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t4 = 0 !== (b2 & 4), J2 = !t4 && "scroll" === a2, x2 = t4 ? null !== h3 ? h3 + "Capture" : null : h3;
        t4 = [];
        for (var w2 = d3, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t4.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t4.length && (h3 = new k3(h3, n2, null, c2, e4), g3.push({ event: h3, listeners: t4 }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h3 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf]))
          break a;
        if (k3 || h3) {
          h3 = e4.window === e4 ? e4 : (h3 = e4.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
              n2 = null;
          } else
            k3 = null, n2 = d3;
          if (k3 !== n2) {
            t4 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2)
              t4 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue(k3);
            u2 = null == n2 ? h3 : ue(n2);
            h3 = new t4(F2, w2 + "leave", k3, c2, e4);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e4) === d3 && (t4 = new t4(x2, w2 + "enter", n2, c2, e4), t4.target = u2, t4.relatedTarget = J2, F2 = t4);
            J2 = F2;
            if (k3 && n2)
              b: {
                t4 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t4; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t4 = vf(t4), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t4 === x2 || null !== x2 && t4 === x2.alternate)
                    break b;
                  t4 = vf(t4);
                  x2 = vf(x2);
                }
                t4 = null;
              }
            else
              t4 = null;
            null !== k3 && wf(g3, h3, k3, t4, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t4, true);
          }
        }
      }
      a: {
        h3 = d3 ? ue(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type)
          var na = ve;
        else if (me(h3))
          if (we)
            na = Fe$1;
          else {
            na = De$1;
            var xa = Ce;
          }
        else
          (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee);
        if (na && (na = na(a2, d3))) {
          ne$1(g3, na, c2, e4);
          break a;
        }
        xa && xa(a2, h3, d3);
        "focusout" === a2 && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d3 ? ue(d3) : window;
      switch (a2) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable)
            Qe$1 = xa, Re$1 = d3, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe$1 = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g3, c2, e4);
          break;
        case "selectionchange":
          if (Pe$1)
            break;
        case "keydown":
        case "keyup":
          Ue(g3, c2, e4);
      }
      var $a;
      if (ae$1)
        b: {
          switch (a2) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e4, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe$1(d3, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e4), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
      if ($a = ce ? je$1(a2, c2) : ke(a2, c2))
        d3 = oe$1(d3, "onBeforeInput"), 0 < d3.length && (e4 = new Ld("onBeforeInput", "beforeinput", null, c2, e4), g3.push({ event: e4, listeners: d3 }), e4.data = $a);
    }
    se$1(g3, b2);
  });
}
function tf(a2, b2, c2) {
  return { instance: a2, listener: b2, currentTarget: c2 };
}
function oe$1(a2, b2) {
  for (var c2 = b2 + "Capture", d2 = []; null !== a2; ) {
    var e3 = a2, f2 = e3.stateNode;
    5 === e3.tag && null !== f2 && (e3 = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e3)), f2 = Kb(a2, b2), null != f2 && d2.push(tf(a2, f2, e3)));
    a2 = a2.return;
  }
  return d2;
}
function vf(a2) {
  if (null === a2)
    return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b2, c2, d2, e3) {
  for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d2)
      break;
    5 === h2.tag && null !== l2 && (h2 = l2, e3 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e3 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  0 !== g2.length && a2.push({ event: b2, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b2, c2) {
  b2 = zf(b2);
  if (zf(a2) !== b2 && c2)
    throw Error(p$5(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b2) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b2) {
  var c2 = b2, d2 = 0;
  do {
    var e3 = c2.nextSibling;
    a2.removeChild(c2);
    if (e3 && 8 === e3.nodeType)
      if (c2 = e3.data, "/$" === c2) {
        if (0 === d2) {
          a2.removeChild(e3);
          bd(b2);
          return;
        }
        d2--;
      } else
        "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
    c2 = e3;
  } while (c2);
  bd(b2);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b2 = a2.nodeType;
    if (1 === b2 || 3 === b2)
      break;
    if (8 === b2) {
      b2 = a2.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2)
        break;
      if ("/$" === b2)
        return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b2 = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b2)
          return a2;
        b2--;
      } else
        "/$" === c2 && b2++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a2) {
  var b2 = a2[Of];
  if (b2)
    return b2;
  for (var c2 = a2.parentNode; c2; ) {
    if (b2 = c2[uf] || c2[Of]) {
      c2 = b2.alternate;
      if (null !== b2.child || null !== c2 && null !== c2.child)
        for (a2 = Mf(a2); null !== a2; ) {
          if (c2 = a2[Of])
            return c2;
          a2 = Mf(a2);
        }
      return b2;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue(a2) {
  if (5 === a2.tag || 6 === a2.tag)
    return a2.stateNode;
  throw Error(p$5(33));
}
function Db(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E$1(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a2, b2) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b2;
}
var Vf = {}, H$1 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b2) {
  var c2 = a2.type.contextTypes;
  if (!c2)
    return Vf;
  var d2 = a2.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2)
    return d2.__reactInternalMemoizedMaskedChildContext;
  var e3 = {}, f2;
  for (f2 in c2)
    e3[f2] = b2[f2];
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e3);
  return e3;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E$1(Wf);
  E$1(H$1);
}
function ag(a2, b2, c2) {
  if (H$1.current !== Vf)
    throw Error(p$5(168));
  G(H$1, b2);
  G(Wf, c2);
}
function bg(a2, b2, c2) {
  var d2 = a2.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d2.getChildContext)
    return c2;
  d2 = d2.getChildContext();
  for (var e3 in d2)
    if (!(e3 in b2))
      throw Error(p$5(108, Ra(a2) || "Unknown", e3));
  return A$1({}, c2, d2);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$1.current;
  G(H$1, a2);
  G(Wf, Wf.current);
  return true;
}
function dg(a2, b2, c2) {
  var d2 = a2.stateNode;
  if (!d2)
    throw Error(p$5(169));
  c2 ? (a2 = bg(a2, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E$1(Wf), E$1(H$1), G(H$1, a2)) : E$1(Wf);
  G(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b2 = C$1;
    try {
      var c2 = eg;
      for (C$1 = 1; a2 < c2.length; a2++) {
        var d2 = c2[a2];
        do
          d2 = d2(true);
        while (null !== d2);
      }
      eg = null;
      fg = false;
    } catch (e3) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e3;
    } finally {
      C$1 = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b2;
}
function ug(a2, b2, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d2 = rg;
  a2 = sg;
  var e3 = 32 - oc(d2) - 1;
  d2 &= ~(1 << e3);
  c2 += 1;
  var f2 = 32 - oc(b2) + e3;
  if (30 < f2) {
    var g2 = e3 - e3 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e3 -= g2;
    rg = 1 << 32 - oc(b2) + e3 | c2 << e3 | d2;
    sg = f2 + a2;
  } else
    rg = 1 << f2 | c2 << e3 | d2, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$2 = false, zg = null;
function Ag(a2, b2) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a2;
  b2 = a2.deletions;
  null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
}
function Cg(a2, b2) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a2.stateNode = b2, xg = a2, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, xg = a2, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I$2) {
    var b2 = yg;
    if (b2) {
      var c2 = b2;
      if (!Cg(a2, b2)) {
        if (Dg(a2))
          throw Error(p$5(418));
        b2 = Lf(c2.nextSibling);
        var d2 = xg;
        b2 && Cg(a2, b2) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I$2 = false, xg = a2);
      }
    } else {
      if (Dg(a2))
        throw Error(p$5(418));
      a2.flags = a2.flags & -4097 | 2;
      I$2 = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; )
    a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg)
    return false;
  if (!I$2)
    return Fg(a2), I$2 = true, false;
  var b2;
  (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a2.type, a2.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a2))
      throw Hg(), Error(p$5(418));
    for (; b2; )
      Ag(a2, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2)
      throw Error(p$5(317));
    a: {
      a2 = a2.nextSibling;
      for (b2 = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b2) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b2--;
          } else
            "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; )
    a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$2 = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = A$1({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      void 0 === b2[c2] && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a2) {
  var b2 = Mg.current;
  E$1(Mg);
  a2._currentValue = b2;
}
function Sg(a2, b2, c2) {
  for (; null !== a2; ) {
    var d2 = a2.alternate;
    (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
    if (a2 === c2)
      break;
    a2 = a2.return;
  }
}
function Tg(a2, b2) {
  Ng = a2;
  Pg = Og = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (Ug = true), a2.firstContext = null);
}
function Vg(a2) {
  var b2 = a2._currentValue;
  if (Pg !== a2)
    if (a2 = { context: a2, memoizedValue: b2, next: null }, null === Og) {
      if (null === Ng)
        throw Error(p$5(308));
      Og = a2;
      Ng.dependencies = { lanes: 0, firstContext: a2 };
    } else
      Og = Og.next = a2;
  return b2;
}
var Wg = null;
function Xg(a2) {
  null === Wg ? Wg = [a2] : Wg.push(a2);
}
function Yg(a2, b2, c2, d2) {
  var e3 = b2.interleaved;
  null === e3 ? (c2.next = c2, Xg(b2)) : (c2.next = e3.next, e3.next = c2);
  b2.interleaved = c2;
  return Zg(a2, d2);
}
function Zg(a2, b2) {
  a2.lanes |= b2;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b2);
  c2 = a2;
  for (a2 = a2.return; null !== a2; )
    a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var $g = false;
function ah(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(a2, b2) {
  a2 = a2.updateQueue;
  b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function ch(a2, b2) {
  return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function dh(a2, b2, c2) {
  var d2 = a2.updateQueue;
  if (null === d2)
    return null;
  d2 = d2.shared;
  if (0 !== (K & 2)) {
    var e3 = d2.pending;
    null === e3 ? b2.next = b2 : (b2.next = e3.next, e3.next = b2);
    d2.pending = b2;
    return Zg(a2, c2);
  }
  e3 = d2.interleaved;
  null === e3 ? (b2.next = b2, Xg(d2)) : (b2.next = e3.next, e3.next = b2);
  d2.interleaved = b2;
  return Zg(a2, c2);
}
function eh(a2, b2, c2) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a2, c2);
  }
}
function fh(a2, b2) {
  var c2 = a2.updateQueue, d2 = a2.alternate;
  if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
    var e3 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e3 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e3 = f2 = b2 : f2 = f2.next = b2;
    } else
      e3 = f2 = b2;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e3, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
  c2.lastBaseUpdate = b2;
}
function gh(a2, b2, c2, d2) {
  var e3 = a2.updateQueue;
  $g = false;
  var f2 = e3.firstBaseUpdate, g2 = e3.lastBaseUpdate, h2 = e3.shared.pending;
  if (null !== h2) {
    e3.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e3.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r3 = h2.lane, y2 = h2.eventTime;
      if ((d2 & r3) === r3) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a2, t4 = h2;
          r3 = b2;
          y2 = c2;
          switch (t4.tag) {
            case 1:
              n2 = t4.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r3);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t4.payload;
              r3 = "function" === typeof n2 ? n2.call(y2, q2, r3) : n2;
              if (null === r3 || void 0 === r3)
                break a;
              q2 = A$1({}, q2, r3);
              break a;
            case 2:
              $g = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, r3 = e3.effects, null === r3 ? e3.effects = [h2] : r3.push(h2));
      } else
        y2 = { eventTime: y2, lane: r3, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r3;
      h2 = h2.next;
      if (null === h2)
        if (h2 = e3.shared.pending, null === h2)
          break;
        else
          r3 = h2, h2 = r3.next, r3.next = null, e3.lastBaseUpdate = r3, e3.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e3.baseState = k2;
    e3.firstBaseUpdate = l2;
    e3.lastBaseUpdate = m2;
    b2 = e3.shared.interleaved;
    if (null !== b2) {
      e3 = b2;
      do
        g2 |= e3.lane, e3 = e3.next;
      while (e3 !== b2);
    } else
      null === f2 && (e3.shared.lanes = 0);
    hh |= g2;
    a2.lanes = g2;
    a2.memoizedState = q2;
  }
}
function ih(a2, b2, c2) {
  a2 = b2.effects;
  b2.effects = null;
  if (null !== a2)
    for (b2 = 0; b2 < a2.length; b2++) {
      var d2 = a2[b2], e3 = d2.callback;
      if (null !== e3) {
        d2.callback = null;
        d2 = c2;
        if ("function" !== typeof e3)
          throw Error(p$5(191, e3));
        e3.call(d2);
      }
    }
}
var jh = new aa.Component().refs;
function kh(a2, b2, c2, d2) {
  b2 = a2.memoizedState;
  c2 = c2(d2, b2);
  c2 = null === c2 || void 0 === c2 ? b2 : A$1({}, b2, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var nh = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
}, enqueueSetState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = L(), e3 = lh(a2), f2 = ch(d2, e3);
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = dh(a2, f2, e3);
  null !== b2 && (mh(b2, a2, e3, d2), eh(b2, a2, e3));
}, enqueueReplaceState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = L(), e3 = lh(a2), f2 = ch(d2, e3);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = dh(a2, f2, e3);
  null !== b2 && (mh(b2, a2, e3, d2), eh(b2, a2, e3));
}, enqueueForceUpdate: function(a2, b2) {
  a2 = a2._reactInternals;
  var c2 = L(), d2 = lh(a2), e3 = ch(c2, d2);
  e3.tag = 2;
  void 0 !== b2 && null !== b2 && (e3.callback = b2);
  b2 = dh(a2, e3, d2);
  null !== b2 && (mh(b2, a2, d2, c2), eh(b2, a2, d2));
} };
function oh(a2, b2, c2, d2, e3, f2, g2) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie(c2, d2) || !Ie(e3, f2) : true;
}
function ph(a2, b2, c2) {
  var d2 = false, e3 = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = Vg(f2) : (e3 = Zf(b2) ? Xf : H$1.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e3) : Vf);
  b2 = new b2(c2, f2);
  a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = nh;
  a2.stateNode = b2;
  b2._reactInternals = a2;
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e3, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function qh(a2, b2, c2, d2) {
  a2 = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
  b2.state !== a2 && nh.enqueueReplaceState(b2, b2.state, null);
}
function rh(a2, b2, c2, d2) {
  var e3 = a2.stateNode;
  e3.props = c2;
  e3.state = a2.memoizedState;
  e3.refs = jh;
  ah(a2);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e3.context = Vg(f2) : (f2 = Zf(b2) ? Xf : H$1.current, e3.context = Yf(a2, f2));
  e3.state = a2.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (kh(a2, b2, f2, c2), e3.state = a2.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e3.getSnapshotBeforeUpdate || "function" !== typeof e3.UNSAFE_componentWillMount && "function" !== typeof e3.componentWillMount || (b2 = e3.state, "function" === typeof e3.componentWillMount && e3.componentWillMount(), "function" === typeof e3.UNSAFE_componentWillMount && e3.UNSAFE_componentWillMount(), b2 !== e3.state && nh.enqueueReplaceState(e3, e3.state, null), gh(a2, c2, e3, d2), e3.state = a2.memoizedState);
  "function" === typeof e3.componentDidMount && (a2.flags |= 4194308);
}
function sh(a2, b2, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag)
          throw Error(p$5(309));
        var d2 = c2.stateNode;
      }
      if (!d2)
        throw Error(p$5(147, a2));
      var e3 = d2, f2 = "" + a2;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2)
        return b2.ref;
      b2 = function(a3) {
        var b3 = e3.refs;
        b3 === jh && (b3 = e3.refs = {});
        null === a3 ? delete b3[f2] : b3[f2] = a3;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a2)
      throw Error(p$5(284));
    if (!c2._owner)
      throw Error(p$5(290, a2));
  }
  return a2;
}
function th(a2, b2) {
  a2 = Object.prototype.toString.call(b2);
  throw Error(p$5(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
}
function uh(a2) {
  var b2 = a2._init;
  return b2(a2._payload);
}
function vh(a2) {
  function b2(b3, c3) {
    if (a2) {
      var d3 = b3.deletions;
      null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a2)
      return null;
    for (; null !== d3; )
      b2(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a3, b3) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b3; )
      null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
    return a3;
  }
  function e3(a3, b3) {
    a3 = wh(a3, b3);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b3, c3, d3) {
    b3.index = d3;
    if (!a2)
      return b3.flags |= 1048576, c3;
    d3 = b3.alternate;
    if (null !== d3)
      return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
    b3.flags |= 2;
    return c3;
  }
  function g2(b3) {
    a2 && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h2(a3, b3, c3, d3) {
    if (null === b3 || 6 !== b3.tag)
      return b3 = xh(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e3(b3, c3);
    b3.return = a3;
    return b3;
  }
  function k2(a3, b3, c3, d3) {
    var f3 = c3.type;
    if (f3 === ya)
      return m2(a3, b3, c3.props.children, d3, c3.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && uh(f3) === b3.type))
      return d3 = e3(b3, c3.props), d3.ref = sh(a3, b3, c3), d3.return = a3, d3;
    d3 = yh(c3.type, c3.key, c3.props, null, a3.mode, d3);
    d3.ref = sh(a3, b3, c3);
    d3.return = a3;
    return d3;
  }
  function l2(a3, b3, c3, d3) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
      return b3 = zh(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e3(b3, c3.children || []);
    b3.return = a3;
    return b3;
  }
  function m2(a3, b3, c3, d3, f3) {
    if (null === b3 || 7 !== b3.tag)
      return b3 = Ah(c3, a3.mode, d3, f3), b3.return = a3, b3;
    b3 = e3(b3, c3);
    b3.return = a3;
    return b3;
  }
  function q2(a3, b3, c3) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3)
      return b3 = xh("" + b3, a3.mode, c3), b3.return = a3, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va:
          return c3 = yh(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = sh(a3, null, b3), c3.return = a3, c3;
        case wa:
          return b3 = zh(b3, a3.mode, c3), b3.return = a3, b3;
        case Ha:
          var d3 = b3._init;
          return q2(a3, d3(b3._payload), c3);
      }
      if (eb(b3) || Ka(b3))
        return b3 = Ah(b3, a3.mode, c3, null), b3.return = a3, b3;
      th(a3, b3);
    }
    return null;
  }
  function r3(a3, b3, c3, d3) {
    var e4 = null !== b3 ? b3.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3)
      return null !== e4 ? null : h2(a3, b3, "" + c3, d3);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e4 ? k2(a3, b3, c3, d3) : null;
        case wa:
          return c3.key === e4 ? l2(a3, b3, c3, d3) : null;
        case Ha:
          return e4 = c3._init, r3(
            a3,
            b3,
            e4(c3._payload),
            d3
          );
      }
      if (eb(c3) || Ka(c3))
        return null !== e4 ? null : m2(a3, b3, c3, d3, null);
      th(a3, c3);
    }
    return null;
  }
  function y2(a3, b3, c3, d3, e4) {
    if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3)
      return a3 = a3.get(c3) || null, h2(b3, a3, "" + d3, e4);
    if ("object" === typeof d3 && null !== d3) {
      switch (d3.$$typeof) {
        case va:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b3, a3, d3, e4);
        case wa:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a3, d3, e4);
        case Ha:
          var f3 = d3._init;
          return y2(a3, b3, c3, f3(d3._payload), e4);
      }
      if (eb(d3) || Ka(d3))
        return a3 = a3.get(c3) || null, m2(b3, a3, d3, e4, null);
      th(b3, d3);
    }
    return null;
  }
  function n2(e4, g3, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r3(e4, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b2(e4, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length)
      return c2(e4, u2), I$2 && tg(e4, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++)
        u2 = q2(e4, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$2 && tg(e4, w2);
      return l3;
    }
    for (u2 = d2(e4, u2); w2 < h3.length; w2++)
      x2 = y2(u2, e4, w2, h3[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b2(e4, a3);
    });
    I$2 && tg(e4, w2);
    return l3;
  }
  function t4(e4, g3, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3)
      throw Error(p$5(150));
    h3 = l3.call(h3);
    if (null == h3)
      throw Error(p$5(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t5 = r3(e4, m3, n3.value, k3);
      if (null === t5) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t5.alternate && b2(e4, m3);
      g3 = f2(t5, g3, w2);
      null === u2 ? l3 = t5 : u2.sibling = t5;
      u2 = t5;
      m3 = x2;
    }
    if (n3.done)
      return c2(
        e4,
        m3
      ), I$2 && tg(e4, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next())
        n3 = q2(e4, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$2 && tg(e4, w2);
      return l3;
    }
    for (m3 = d2(e4, m3); !n3.done; w2++, n3 = h3.next())
      n3 = y2(m3, e4, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b2(e4, a3);
    });
    I$2 && tg(e4, w2);
    return l3;
  }
  function J2(a3, d3, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d3; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d3 = e3(l3, f3.props.children);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && uh(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d3 = e3(l3, f3.props);
                  d3.ref = sh(a3, l3, f3);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                }
                c2(a3, l3);
                break;
              } else
                b2(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d3 = Ah(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = yh(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = sh(a3, d3, f3), h3.return = a3, a3 = h3);
          }
          return g2(a3);
        case wa:
          a: {
            for (l3 = f3.key; null !== d3; ) {
              if (d3.key === l3)
                if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a3, d3.sibling);
                  d3 = e3(d3, f3.children || []);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                } else {
                  c2(a3, d3);
                  break;
                }
              else
                b2(a3, d3);
              d3 = d3.sibling;
            }
            d3 = zh(f3, a3.mode, h3);
            d3.return = a3;
            a3 = d3;
          }
          return g2(a3);
        case Ha:
          return l3 = f3._init, J2(a3, d3, l3(f3._payload), h3);
      }
      if (eb(f3))
        return n2(a3, d3, f3, h3);
      if (Ka(f3))
        return t4(a3, d3, f3, h3);
      th(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e3(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = xh(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
  }
  return J2;
}
var Bh = vh(true), Ch = vh(false), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(a2) {
  if (a2 === Dh)
    throw Error(p$5(174));
  return a2;
}
function Ih(a2, b2) {
  G(Gh, b2);
  G(Fh, a2);
  G(Eh, Dh);
  a2 = b2.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
      break;
    default:
      a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = lb(b2, a2);
  }
  E$1(Eh);
  G(Eh, b2);
}
function Jh() {
  E$1(Eh);
  E$1(Fh);
  E$1(Gh);
}
function Kh(a2) {
  Hh(Gh.current);
  var b2 = Hh(Eh.current);
  var c2 = lb(b2, a2.type);
  b2 !== c2 && (G(Fh, a2), G(Eh, c2));
}
function Lh(a2) {
  Fh.current === a2 && (E$1(Eh), E$1(Fh));
}
var M$5 = Uf(0);
function Mh(a2) {
  for (var b2 = a2; null !== b2; ) {
    if (13 === b2.tag) {
      var c2 = b2.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data))
        return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128))
        return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a2)
      break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a2)
        return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a2 = 0; a2 < Nh.length; a2++)
    Nh[a2]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N$2 = null, O = null, P = null, Sh = false, Th = false, Uh = 0, Vh = 0;
function Q() {
  throw Error(p$5(321));
}
function Wh(a2, b2) {
  if (null === b2)
    return false;
  for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
    if (!He$2(a2[c2], b2[c2]))
      return false;
  return true;
}
function Xh(a2, b2, c2, d2, e3, f2) {
  Rh = f2;
  N$2 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Ph.current = null === a2 || null === a2.memoizedState ? Yh : Zh;
  a2 = c2(d2, e3);
  if (Th) {
    f2 = 0;
    do {
      Th = false;
      Uh = 0;
      if (25 <= f2)
        throw Error(p$5(301));
      f2 += 1;
      P = O = null;
      b2.updateQueue = null;
      Ph.current = $h;
      a2 = c2(d2, e3);
    } while (Th);
  }
  Ph.current = ai;
  b2 = null !== O && null !== O.next;
  Rh = 0;
  P = O = N$2 = null;
  Sh = false;
  if (b2)
    throw Error(p$5(300));
  return a2;
}
function bi() {
  var a2 = 0 !== Uh;
  Uh = 0;
  return a2;
}
function ci() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === P ? N$2.memoizedState = P = a2 : P = P.next = a2;
  return P;
}
function di() {
  if (null === O) {
    var a2 = N$2.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else
    a2 = O.next;
  var b2 = null === P ? N$2.memoizedState : P.next;
  if (null !== b2)
    P = b2, O = a2;
  else {
    if (null === a2)
      throw Error(p$5(310));
    O = a2;
    a2 = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };
    null === P ? N$2.memoizedState = P = a2 : P = P.next = a2;
  }
  return P;
}
function ei(a2, b2) {
  return "function" === typeof b2 ? b2(a2) : b2;
}
function fi(a2) {
  var b2 = di(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$5(311));
  c2.lastRenderedReducer = a2;
  var d2 = O, e3 = d2.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e3) {
      var g2 = e3.next;
      e3.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e3 = f2;
    c2.pending = null;
  }
  if (null !== e3) {
    f2 = e3.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Rh & m2) === m2)
        null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
        N$2.lanes |= m2;
        hh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d2 : k2.next = h2;
    He$2(d2, b2.memoizedState) || (Ug = true);
    b2.memoizedState = d2;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e3 = a2;
    do
      f2 = e3.lane, N$2.lanes |= f2, hh |= f2, e3 = e3.next;
    while (e3 !== a2);
  } else
    null === e3 && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function gi(a2) {
  var b2 = di(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$5(311));
  c2.lastRenderedReducer = a2;
  var d2 = c2.dispatch, e3 = c2.pending, f2 = b2.memoizedState;
  if (null !== e3) {
    c2.pending = null;
    var g2 = e3 = e3.next;
    do
      f2 = a2(f2, g2.action), g2 = g2.next;
    while (g2 !== e3);
    He$2(f2, b2.memoizedState) || (Ug = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function hi() {
}
function ii(a2, b2) {
  var c2 = N$2, d2 = di(), e3 = b2(), f2 = !He$2(d2.memoizedState, e3);
  f2 && (d2.memoizedState = e3, Ug = true);
  d2 = d2.queue;
  ji(ki.bind(null, c2, d2, a2), [a2]);
  if (d2.getSnapshot !== b2 || f2 || null !== P && P.memoizedState.tag & 1) {
    c2.flags |= 2048;
    li(9, mi.bind(null, c2, d2, e3, b2), void 0, null);
    if (null === R$1)
      throw Error(p$5(349));
    0 !== (Rh & 30) || ni(c2, b2, e3);
  }
  return e3;
}
function ni(a2, b2, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b2, value: c2 };
  b2 = N$2.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, N$2.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
}
function mi(a2, b2, c2, d2) {
  b2.value = c2;
  b2.getSnapshot = d2;
  oi(b2) && pi(a2);
}
function ki(a2, b2, c2) {
  return c2(function() {
    oi(b2) && pi(a2);
  });
}
function oi(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b2();
    return !He$2(a2, c2);
  } catch (d2) {
    return true;
  }
}
function pi(a2) {
  var b2 = Zg(a2, 1);
  null !== b2 && mh(b2, a2, 1, -1);
}
function qi(a2) {
  var b2 = ci();
  "function" === typeof a2 && (a2 = a2());
  b2.memoizedState = b2.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a2 };
  b2.queue = a2;
  a2 = a2.dispatch = ri.bind(null, N$2, a2);
  return [b2.memoizedState, a2];
}
function li(a2, b2, c2, d2) {
  a2 = { tag: a2, create: b2, destroy: c2, deps: d2, next: null };
  b2 = N$2.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, N$2.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b2.lastEffect = a2));
  return a2;
}
function si() {
  return di().memoizedState;
}
function ti(a2, b2, c2, d2) {
  var e3 = ci();
  N$2.flags |= a2;
  e3.memoizedState = li(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
}
function ui(a2, b2, c2, d2) {
  var e3 = di();
  d2 = void 0 === d2 ? null : d2;
  var f2 = void 0;
  if (null !== O) {
    var g2 = O.memoizedState;
    f2 = g2.destroy;
    if (null !== d2 && Wh(d2, g2.deps)) {
      e3.memoizedState = li(b2, c2, f2, d2);
      return;
    }
  }
  N$2.flags |= a2;
  e3.memoizedState = li(1 | b2, c2, f2, d2);
}
function vi(a2, b2) {
  return ti(8390656, 8, a2, b2);
}
function ji(a2, b2) {
  return ui(2048, 8, a2, b2);
}
function wi(a2, b2) {
  return ui(4, 2, a2, b2);
}
function xi(a2, b2) {
  return ui(4, 4, a2, b2);
}
function yi(a2, b2) {
  if ("function" === typeof b2)
    return a2 = a2(), b2(a2), function() {
      b2(null);
    };
  if (null !== b2 && void 0 !== b2)
    return a2 = a2(), b2.current = a2, function() {
      b2.current = null;
    };
}
function zi(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ui(4, 4, yi.bind(null, b2, a2), c2);
}
function Ai() {
}
function Bi(a2, b2) {
  var c2 = di();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Wh(b2, d2[1]))
    return d2[0];
  c2.memoizedState = [a2, b2];
  return a2;
}
function Ci(a2, b2) {
  var c2 = di();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Wh(b2, d2[1]))
    return d2[0];
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}
function Di(a2, b2, c2) {
  if (0 === (Rh & 21))
    return a2.baseState && (a2.baseState = false, Ug = true), a2.memoizedState = c2;
  He$2(c2, b2) || (c2 = yc(), N$2.lanes |= c2, hh |= c2, a2.baseState = true);
  return b2;
}
function Ei(a2, b2) {
  var c2 = C$1;
  C$1 = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d2 = Qh.transition;
  Qh.transition = {};
  try {
    a2(false), b2();
  } finally {
    C$1 = c2, Qh.transition = d2;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a2, b2, c2) {
  var d2 = lh(a2);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a2))
    Ii(b2, c2);
  else if (c2 = Yg(a2, b2, c2, d2), null !== c2) {
    var e3 = L();
    mh(c2, a2, d2, e3);
    Ji(c2, b2, d2);
  }
}
function ri(a2, b2, c2) {
  var d2 = lh(a2), e3 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a2))
    Ii(b2, e3);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2))
      try {
        var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
        e3.hasEagerState = true;
        e3.eagerState = h2;
        if (He$2(h2, g2)) {
          var k2 = b2.interleaved;
          null === k2 ? (e3.next = e3, Xg(b2)) : (e3.next = k2.next, k2.next = e3);
          b2.interleaved = e3;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c2 = Yg(a2, b2, e3, d2);
    null !== c2 && (e3 = L(), mh(c2, a2, d2, e3), Ji(c2, b2, d2));
  }
}
function Hi(a2) {
  var b2 = a2.alternate;
  return a2 === N$2 || null !== b2 && b2 === N$2;
}
function Ii(a2, b2) {
  Th = Sh = true;
  var c2 = a2.pending;
  null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a2.pending = b2;
}
function Ji(a2, b2, c2) {
  if (0 !== (c2 & 4194240)) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a2, c2);
  }
}
var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: false }, Yh = { readContext: Vg, useCallback: function(a2, b2) {
  ci().memoizedState = [a2, void 0 === b2 ? null : b2];
  return a2;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ti(
    4194308,
    4,
    yi.bind(null, b2, a2),
    c2
  );
}, useLayoutEffect: function(a2, b2) {
  return ti(4194308, 4, a2, b2);
}, useInsertionEffect: function(a2, b2) {
  return ti(4, 2, a2, b2);
}, useMemo: function(a2, b2) {
  var c2 = ci();
  b2 = void 0 === b2 ? null : b2;
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}, useReducer: function(a2, b2, c2) {
  var d2 = ci();
  b2 = void 0 !== c2 ? c2(b2) : b2;
  d2.memoizedState = d2.baseState = b2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
  d2.queue = a2;
  a2 = a2.dispatch = Gi.bind(null, N$2, a2);
  return [d2.memoizedState, a2];
}, useRef: function(a2) {
  var b2 = ci();
  a2 = { current: a2 };
  return b2.memoizedState = a2;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(a2) {
  return ci().memoizedState = a2;
}, useTransition: function() {
  var a2 = qi(false), b2 = a2[0];
  a2 = Ei.bind(null, a2[1]);
  ci().memoizedState = a2;
  return [b2, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b2, c2) {
  var d2 = N$2, e3 = ci();
  if (I$2) {
    if (void 0 === c2)
      throw Error(p$5(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (null === R$1)
      throw Error(p$5(349));
    0 !== (Rh & 30) || ni(d2, b2, c2);
  }
  e3.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e3.queue = f2;
  vi(ki.bind(
    null,
    d2,
    f2,
    a2
  ), [a2]);
  d2.flags |= 2048;
  li(9, mi.bind(null, d2, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a2 = ci(), b2 = R$1.identifierPrefix;
  if (I$2) {
    var c2 = sg;
    var d2 = rg;
    c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Uh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else
    c2 = Vh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b2;
}, unstable_isNewReconciler: false }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(a2) {
    var b2 = di();
    return Di(b2, O.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = fi(ei)[0], b2 = di().memoizedState;
    return [a2, b2];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: false
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(a2) {
  var b2 = di();
  return null === O ? b2.memoizedState = a2 : Di(b2, O.memoizedState, a2);
}, useTransition: function() {
  var a2 = gi(ei)[0], b2 = di().memoizedState;
  return [a2, b2];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
function Ki(a2, b2) {
  try {
    var c2 = "", d2 = b2;
    do
      c2 += Pa(d2), d2 = d2.return;
    while (d2);
    var e3 = c2;
  } catch (f2) {
    e3 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b2, stack: e3, digest: null };
}
function Li(a2, b2, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
}
function Mi(a2, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a2, b2, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b2.value;
  c2.callback = function() {
    Pi || (Pi = true, Qi = d2);
    Mi(a2, b2);
  };
  return c2;
}
function Ri(a2, b2, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  var d2 = a2.type.getDerivedStateFromError;
  if ("function" === typeof d2) {
    var e3 = b2.value;
    c2.payload = function() {
      return d2(e3);
    };
    c2.callback = function() {
      Mi(a2, b2);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Mi(a2, b2);
    "function" !== typeof d2 && (null === Si ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Ti(a2, b2, c2) {
  var d2 = a2.pingCache;
  if (null === d2) {
    d2 = a2.pingCache = new Ni();
    var e3 = /* @__PURE__ */ new Set();
    d2.set(b2, e3);
  } else
    e3 = d2.get(b2), void 0 === e3 && (e3 = /* @__PURE__ */ new Set(), d2.set(b2, e3));
  e3.has(c2) || (e3.add(c2), a2 = Ui.bind(null, a2, b2, c2), b2.then(a2, a2));
}
function Vi(a2) {
  do {
    var b2;
    if (b2 = 13 === a2.tag)
      b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2)
      return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Wi(a2, b2, c2, d2, e3) {
  if (0 === (a2.mode & 1))
    return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = ch(-1, 1), b2.tag = 2, dh(c2, b2, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e3;
  return a2;
}
var Xi = ua.ReactCurrentOwner, Ug = false;
function Yi(a2, b2, c2, d2) {
  b2.child = null === a2 ? Ch(b2, null, c2, d2) : Bh(b2, a2.child, c2, d2);
}
function Zi(a2, b2, c2, d2, e3) {
  c2 = c2.render;
  var f2 = b2.ref;
  Tg(b2, e3);
  d2 = Xh(a2, b2, c2, d2, f2, e3);
  c2 = bi();
  if (null !== a2 && !Ug)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e3, $i(a2, b2, e3);
  I$2 && c2 && vg(b2);
  b2.flags |= 1;
  Yi(a2, b2, d2, e3);
  return b2.child;
}
function aj(a2, b2, c2, d2, e3) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !bj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps)
      return b2.tag = 15, b2.type = f2, cj(a2, b2, f2, d2, e3);
    a2 = yh(c2.type, null, d2, b2, b2.mode, e3);
    a2.ref = b2.ref;
    a2.return = b2;
    return b2.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e3)) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie;
    if (c2(g2, d2) && a2.ref === b2.ref)
      return $i(a2, b2, e3);
  }
  b2.flags |= 1;
  a2 = wh(f2, d2);
  a2.ref = b2.ref;
  a2.return = b2;
  return b2.child = a2;
}
function cj(a2, b2, c2, d2, e3) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie(f2, d2) && a2.ref === b2.ref)
      if (Ug = false, b2.pendingProps = d2 = f2, 0 !== (a2.lanes & e3))
        0 !== (a2.flags & 131072) && (Ug = true);
      else
        return b2.lanes = a2.lanes, $i(a2, b2, e3);
  }
  return dj(a2, b2, c2, d2, e3);
}
function ej(a2, b2, c2) {
  var d2 = b2.pendingProps, e3 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d2.mode)
    if (0 === (b2.mode & 1))
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= c2;
    else {
      if (0 === (c2 & 1073741824))
        return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G(fj, gj), gj |= a2, null;
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d2 = null !== f2 ? f2.baseLanes : c2;
      G(fj, gj);
      gj |= d2;
    }
  else
    null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G(fj, gj), gj |= d2;
  Yi(a2, b2, e3, c2);
  return b2.child;
}
function hj(a2, b2) {
  var c2 = b2.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2)
    b2.flags |= 512, b2.flags |= 2097152;
}
function dj(a2, b2, c2, d2, e3) {
  var f2 = Zf(c2) ? Xf : H$1.current;
  f2 = Yf(b2, f2);
  Tg(b2, e3);
  c2 = Xh(a2, b2, c2, d2, f2, e3);
  d2 = bi();
  if (null !== a2 && !Ug)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e3, $i(a2, b2, e3);
  I$2 && d2 && vg(b2);
  b2.flags |= 1;
  Yi(a2, b2, c2, e3);
  return b2.child;
}
function ij(a2, b2, c2, d2, e3) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b2);
  } else
    f2 = false;
  Tg(b2, e3);
  if (null === b2.stateNode)
    jj(a2, b2), ph(b2, c2, d2), rh(b2, c2, d2, e3), d2 = true;
  else if (null === a2) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = Vg(l2) : (l2 = Zf(c2) ? Xf : H$1.current, l2 = Yf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && qh(b2, g2, d2, l2);
    $g = false;
    var r3 = b2.memoizedState;
    g2.state = r3;
    gh(b2, d2, g2, e3);
    k2 = b2.memoizedState;
    h2 !== d2 || r3 !== k2 || Wf.current || $g ? ("function" === typeof m2 && (kh(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = $g || oh(b2, c2, h2, d2, r3, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
  } else {
    g2 = b2.stateNode;
    bh(a2, b2);
    h2 = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h2 : Lg(b2.type, h2);
    g2.props = l2;
    q2 = b2.pendingProps;
    r3 = g2.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = Vg(k2) : (k2 = Zf(c2) ? Xf : H$1.current, k2 = Yf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r3 !== k2) && qh(b2, g2, d2, k2);
    $g = false;
    r3 = b2.memoizedState;
    g2.state = r3;
    gh(b2, d2, g2, e3);
    var n2 = b2.memoizedState;
    h2 !== q2 || r3 !== n2 || Wf.current || $g ? ("function" === typeof y2 && (kh(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = $g || oh(b2, c2, l2, d2, r3, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r3 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r3 === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r3 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r3 === a2.memoizedState || (b2.flags |= 1024), d2 = false);
  }
  return kj(a2, b2, c2, d2, f2, e3);
}
function kj(a2, b2, c2, d2, e3, f2) {
  hj(a2, b2);
  var g2 = 0 !== (b2.flags & 128);
  if (!d2 && !g2)
    return e3 && dg(b2, c2, false), $i(a2, b2, f2);
  d2 = b2.stateNode;
  Xi.current = b2;
  var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
  b2.flags |= 1;
  null !== a2 && g2 ? (b2.child = Bh(b2, a2.child, null, f2), b2.child = Bh(b2, null, h2, f2)) : Yi(a2, b2, h2, f2);
  b2.memoizedState = d2.state;
  e3 && dg(b2, c2, true);
  return b2.child;
}
function lj(a2) {
  var b2 = a2.stateNode;
  b2.pendingContext ? ag(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a2, b2.context, false);
  Ih(a2, b2.containerInfo);
}
function mj(a2, b2, c2, d2, e3) {
  Ig();
  Jg(e3);
  b2.flags |= 256;
  Yi(a2, b2, c2, d2);
  return b2.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function pj(a2, b2, c2) {
  var d2 = b2.pendingProps, e3 = M$5.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e3 & 2));
  if (h2)
    f2 = true, b2.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState)
    e3 |= 1;
  G(M$5, e3 & 1);
  if (null === a2) {
    Eg(b2);
    a2 = b2.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2))
      return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g2 = d2.children;
    a2 = d2.fallback;
    return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = qj(g2, d2, 0, null), a2 = Ah(a2, d2, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = oj(c2), b2.memoizedState = nj, a2) : rj(b2, g2);
  }
  e3 = a2.memoizedState;
  if (null !== e3 && (h2 = e3.dehydrated, null !== h2))
    return sj(a2, b2, g2, d2, h2, e3, c2);
  if (f2) {
    f2 = d2.fallback;
    g2 = b2.mode;
    e3 = a2.child;
    h2 = e3.sibling;
    var k2 = { mode: "hidden", children: d2.children };
    0 === (g2 & 1) && b2.child !== e3 ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k2, b2.deletions = null) : (d2 = wh(e3, k2), d2.subtreeFlags = e3.subtreeFlags & 14680064);
    null !== h2 ? f2 = wh(h2, f2) : (f2 = Ah(f2, g2, c2, null), f2.flags |= 2);
    f2.return = b2;
    d2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    d2 = f2;
    f2 = b2.child;
    g2 = a2.child.memoizedState;
    g2 = null === g2 ? oj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a2.childLanes & ~c2;
    b2.memoizedState = nj;
    return d2;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d2 = wh(f2, { mode: "visible", children: d2.children });
  0 === (b2.mode & 1) && (d2.lanes = c2);
  d2.return = b2;
  d2.sibling = null;
  null !== a2 && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a2], b2.flags |= 16) : c2.push(a2));
  b2.child = d2;
  b2.memoizedState = null;
  return d2;
}
function rj(a2, b2) {
  b2 = qj({ mode: "visible", children: b2 }, a2.mode, 0, null);
  b2.return = a2;
  return a2.child = b2;
}
function tj(a2, b2, c2, d2) {
  null !== d2 && Jg(d2);
  Bh(b2, a2.child, null, c2);
  a2 = rj(b2, b2.pendingProps.children);
  a2.flags |= 2;
  b2.memoizedState = null;
  return a2;
}
function sj(a2, b2, c2, d2, e3, f2, g2) {
  if (c2) {
    if (b2.flags & 256)
      return b2.flags &= -257, d2 = Li(Error(p$5(422))), tj(a2, b2, g2, d2);
    if (null !== b2.memoizedState)
      return b2.child = a2.child, b2.flags |= 128, null;
    f2 = d2.fallback;
    e3 = b2.mode;
    d2 = qj({ mode: "visible", children: d2.children }, e3, 0, null);
    f2 = Ah(f2, e3, g2, null);
    f2.flags |= 2;
    d2.return = b2;
    f2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    0 !== (b2.mode & 1) && Bh(b2, a2.child, null, g2);
    b2.child.memoizedState = oj(g2);
    b2.memoizedState = nj;
    return f2;
  }
  if (0 === (b2.mode & 1))
    return tj(a2, b2, g2, null);
  if ("$!" === e3.data) {
    d2 = e3.nextSibling && e3.nextSibling.dataset;
    if (d2)
      var h2 = d2.dgst;
    d2 = h2;
    f2 = Error(p$5(419));
    d2 = Li(f2, d2, void 0);
    return tj(a2, b2, g2, d2);
  }
  h2 = 0 !== (g2 & a2.childLanes);
  if (Ug || h2) {
    d2 = R$1;
    if (null !== d2) {
      switch (g2 & -g2) {
        case 4:
          e3 = 2;
          break;
        case 16:
          e3 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e3 = 32;
          break;
        case 536870912:
          e3 = 268435456;
          break;
        default:
          e3 = 0;
      }
      e3 = 0 !== (e3 & (d2.suspendedLanes | g2)) ? 0 : e3;
      0 !== e3 && e3 !== f2.retryLane && (f2.retryLane = e3, Zg(a2, e3), mh(d2, a2, e3, -1));
    }
    uj();
    d2 = Li(Error(p$5(421)));
    return tj(a2, b2, g2, d2);
  }
  if ("$?" === e3.data)
    return b2.flags |= 128, b2.child = a2.child, b2 = vj.bind(null, a2), e3._reactRetry = b2, null;
  a2 = f2.treeContext;
  yg = Lf(e3.nextSibling);
  xg = b2;
  I$2 = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b2);
  b2 = rj(b2, d2.children);
  b2.flags |= 4096;
  return b2;
}
function wj(a2, b2, c2) {
  a2.lanes |= b2;
  var d2 = a2.alternate;
  null !== d2 && (d2.lanes |= b2);
  Sg(a2.return, b2, c2);
}
function xj(a2, b2, c2, d2, e3) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e3 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e3);
}
function yj(a2, b2, c2) {
  var d2 = b2.pendingProps, e3 = d2.revealOrder, f2 = d2.tail;
  Yi(a2, b2, d2.children, c2);
  d2 = M$5.current;
  if (0 !== (d2 & 2))
    d2 = d2 & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128))
      a:
        for (a2 = b2.child; null !== a2; ) {
          if (13 === a2.tag)
            null !== a2.memoizedState && wj(a2, c2, b2);
          else if (19 === a2.tag)
            wj(a2, c2, b2);
          else if (null !== a2.child) {
            a2.child.return = a2;
            a2 = a2.child;
            continue;
          }
          if (a2 === b2)
            break a;
          for (; null === a2.sibling; ) {
            if (null === a2.return || a2.return === b2)
              break a;
            a2 = a2.return;
          }
          a2.sibling.return = a2.return;
          a2 = a2.sibling;
        }
    d2 &= 1;
  }
  G(M$5, d2);
  if (0 === (b2.mode & 1))
    b2.memoizedState = null;
  else
    switch (e3) {
      case "forwards":
        c2 = b2.child;
        for (e3 = null; null !== c2; )
          a2 = c2.alternate, null !== a2 && null === Mh(a2) && (e3 = c2), c2 = c2.sibling;
        c2 = e3;
        null === c2 ? (e3 = b2.child, b2.child = null) : (e3 = c2.sibling, c2.sibling = null);
        xj(b2, false, e3, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e3 = b2.child;
        for (b2.child = null; null !== e3; ) {
          a2 = e3.alternate;
          if (null !== a2 && null === Mh(a2)) {
            b2.child = e3;
            break;
          }
          a2 = e3.sibling;
          e3.sibling = c2;
          c2 = e3;
          e3 = a2;
        }
        xj(b2, true, c2, null, f2);
        break;
      case "together":
        xj(b2, false, null, null, void 0);
        break;
      default:
        b2.memoizedState = null;
    }
  return b2.child;
}
function jj(a2, b2) {
  0 === (b2.mode & 1) && null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function $i(a2, b2, c2) {
  null !== a2 && (b2.dependencies = a2.dependencies);
  hh |= b2.lanes;
  if (0 === (c2 & b2.childLanes))
    return null;
  if (null !== a2 && b2.child !== a2.child)
    throw Error(p$5(153));
  if (null !== b2.child) {
    a2 = b2.child;
    c2 = wh(a2, a2.pendingProps);
    b2.child = c2;
    for (c2.return = b2; null !== a2.sibling; )
      a2 = a2.sibling, c2 = c2.sibling = wh(a2, a2.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function zj(a2, b2, c2) {
  switch (b2.tag) {
    case 3:
      lj(b2);
      Ig();
      break;
    case 5:
      Kh(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      Ih(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b2.type._context, e3 = b2.memoizedProps.value;
      G(Mg, d2._currentValue);
      d2._currentValue = e3;
      break;
    case 13:
      d2 = b2.memoizedState;
      if (null !== d2) {
        if (null !== d2.dehydrated)
          return G(M$5, M$5.current & 1), b2.flags |= 128, null;
        if (0 !== (c2 & b2.child.childLanes))
          return pj(a2, b2, c2);
        G(M$5, M$5.current & 1);
        a2 = $i(a2, b2, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G(M$5, M$5.current & 1);
      break;
    case 19:
      d2 = 0 !== (c2 & b2.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d2)
          return yj(a2, b2, c2);
        b2.flags |= 128;
      }
      e3 = b2.memoizedState;
      null !== e3 && (e3.rendering = null, e3.tail = null, e3.lastEffect = null);
      G(M$5, M$5.current);
      if (d2)
        break;
      else
        return null;
    case 22:
    case 23:
      return b2.lanes = 0, ej(a2, b2, c2);
  }
  return $i(a2, b2, c2);
}
var Aj, Bj, Cj, Dj;
Aj = function(a2, b2) {
  for (var c2 = b2.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag)
      a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2)
      break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b2)
        return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Bj = function() {
};
Cj = function(a2, b2, c2, d2) {
  var e3 = a2.memoizedProps;
  if (e3 !== d2) {
    a2 = b2.stateNode;
    Hh(Eh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e3 = Ya(a2, e3);
        d2 = Ya(a2, d2);
        f2 = [];
        break;
      case "select":
        e3 = A$1({}, e3, { value: void 0 });
        d2 = A$1({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e3 = gb(a2, e3);
        d2 = gb(a2, d2);
        f2 = [];
        break;
      default:
        "function" !== typeof e3.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
    }
    ub(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e3)
      if (!d2.hasOwnProperty(l2) && e3.hasOwnProperty(l2) && null != e3[l2])
        if ("style" === l2) {
          var h2 = e3[l2];
          for (g2 in h2)
            h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = null != e3 ? e3[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2))
        if ("style" === l2)
          if (h2) {
            for (g2 in h2)
              !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
            for (g2 in k2)
              k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
          } else
            c2 || (f2 || (f2 = []), f2.push(
              l2,
              c2
            )), c2 = k2;
        else
          "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2)
      b2.flags |= 4;
  }
};
Dj = function(a2, b2, c2, d2) {
  c2 !== d2 && (b2.flags |= 4);
};
function Ej(a2, b2) {
  if (!I$2)
    switch (a2.tailMode) {
      case "hidden":
        b2 = a2.tail;
        for (var c2 = null; null !== b2; )
          null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
        null === c2 ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d2 = null; null !== c2; )
          null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
        null === d2 ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
    }
}
function S$3(a2) {
  var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
  if (b2)
    for (var e3 = a2.child; null !== e3; )
      c2 |= e3.lanes | e3.childLanes, d2 |= e3.subtreeFlags & 14680064, d2 |= e3.flags & 14680064, e3.return = a2, e3 = e3.sibling;
  else
    for (e3 = a2.child; null !== e3; )
      c2 |= e3.lanes | e3.childLanes, d2 |= e3.subtreeFlags, d2 |= e3.flags, e3.return = a2, e3 = e3.sibling;
  a2.subtreeFlags |= d2;
  a2.childLanes = c2;
  return b2;
}
function Fj(a2, b2, c2) {
  var d2 = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$3(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S$3(b2), null;
    case 3:
      d2 = b2.stateNode;
      Jh();
      E$1(Wf);
      E$1(H$1);
      Oh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (null === a2 || null === a2.child)
        Gg(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a2, b2);
      S$3(b2);
      return null;
    case 5:
      Lh(b2);
      var e3 = Hh(Gh.current);
      c2 = b2.type;
      if (null !== a2 && null != b2.stateNode)
        Cj(a2, b2, c2, d2, e3), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d2) {
          if (null === b2.stateNode)
            throw Error(p$5(166));
          S$3(b2);
          return null;
        }
        a2 = Hh(Eh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d2[Of] = b2;
          d2[Pf] = f2;
          a2 = 0 !== (b2.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d2);
              D$1("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d2);
              break;
            case "video":
            case "audio":
              for (e3 = 0; e3 < lf.length; e3++)
                D$1(lf[e3], d2);
              break;
            case "source":
              D$1("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d2
              );
              D$1("load", d2);
              break;
            case "details":
              D$1("toggle", d2);
              break;
            case "input":
              Za(d2, f2);
              D$1("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d2);
              break;
            case "textarea":
              hb(d2, f2), D$1("invalid", d2);
          }
          ub(c2, f2);
          e3 = null;
          for (var g2 in f2)
            if (f2.hasOwnProperty(g2)) {
              var h2 = f2[g2];
              "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a2), e3 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
                d2.textContent,
                h2,
                a2
              ), e3 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D$1("scroll", d2);
            }
          switch (c2) {
            case "input":
              Va(d2);
              db(d2, f2, true);
              break;
            case "textarea":
              Va(d2);
              jb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d2.onclick = Bf);
          }
          d2 = e3;
          b2.updateQueue = d2;
          null !== d2 && (b2.flags |= 4);
        } else {
          g2 = 9 === e3.nodeType ? e3 : e3.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
          a2[Of] = b2;
          a2[Pf] = d2;
          Aj(a2, b2, false, false);
          b2.stateNode = a2;
          a: {
            g2 = vb(c2, d2);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e3 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e3 = d2;
                break;
              case "video":
              case "audio":
                for (e3 = 0; e3 < lf.length; e3++)
                  D$1(lf[e3], a2);
                e3 = d2;
                break;
              case "source":
                D$1("error", a2);
                e3 = d2;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a2
                );
                D$1("load", a2);
                e3 = d2;
                break;
              case "details":
                D$1("toggle", a2);
                e3 = d2;
                break;
              case "input":
                Za(a2, d2);
                e3 = Ya(a2, d2);
                D$1("invalid", a2);
                break;
              case "option":
                e3 = d2;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d2.multiple };
                e3 = A$1({}, d2, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb(a2, d2);
                e3 = gb(a2, d2);
                D$1("invalid", a2);
                break;
              default:
                e3 = d2;
            }
            ub(c2, e3);
            h2 = e3;
            for (f2 in h2)
              if (h2.hasOwnProperty(f2)) {
                var k2 = h2[f2];
                "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a2) : null != k2 && ta(a2, f2, k2, g2));
              }
            switch (c2) {
              case "input":
                Va(a2);
                db(a2, d2, false);
                break;
              case "textarea":
                Va(a2);
                jb(a2);
                break;
              case "option":
                null != d2.value && a2.setAttribute("value", "" + Sa(d2.value));
                break;
              case "select":
                a2.multiple = !!d2.multiple;
                f2 = d2.value;
                null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                  a2,
                  !!d2.multiple,
                  d2.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e3.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S$3(b2);
      return null;
    case 6:
      if (a2 && null != b2.stateNode)
        Dj(a2, b2, a2.memoizedProps, d2);
      else {
        if ("string" !== typeof d2 && null === b2.stateNode)
          throw Error(p$5(166));
        c2 = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.memoizedProps;
          d2[Of] = b2;
          if (f2 = d2.nodeValue !== c2) {
            if (a2 = xg, null !== a2)
              switch (a2.tag) {
                case 3:
                  Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                  break;
                case 5:
                  true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
              }
          }
          f2 && (b2.flags |= 4);
        } else
          d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
      }
      S$3(b2);
      return null;
    case 13:
      E$1(M$5);
      d2 = b2.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I$2 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128))
          Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
          if (null === a2) {
            if (!f2)
              throw Error(p$5(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2)
              throw Error(p$5(317));
            f2[Of] = b2;
          } else
            Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S$3(b2);
          f2 = false;
        } else
          null !== zg && (Gj(zg), zg = null), f2 = true;
        if (!f2)
          return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128))
        return b2.lanes = c2, b2;
      d2 = null !== d2;
      d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (M$5.current & 1) ? 0 === T$2 && (T$2 = 3) : uj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S$3(b2);
      return null;
    case 4:
      return Jh(), Bj(a2, b2), null === a2 && sf(b2.stateNode.containerInfo), S$3(b2), null;
    case 10:
      return Rg(b2.type._context), S$3(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S$3(b2), null;
    case 19:
      E$1(M$5);
      f2 = b2.memoizedState;
      if (null === f2)
        return S$3(b2), null;
      d2 = 0 !== (b2.flags & 128);
      g2 = f2.rendering;
      if (null === g2)
        if (d2)
          Ej(f2, false);
        else {
          if (0 !== T$2 || null !== a2 && 0 !== (a2.flags & 128))
            for (a2 = b2.child; null !== a2; ) {
              g2 = Mh(a2);
              if (null !== g2) {
                b2.flags |= 128;
                Ej(f2, false);
                d2 = g2.updateQueue;
                null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
                b2.subtreeFlags = 0;
                d2 = c2;
                for (c2 = b2.child; null !== c2; )
                  f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                G(M$5, M$5.current & 1 | 2);
                return b2.child;
              }
              a2 = a2.sibling;
            }
          null !== f2.tail && B() > Hj && (b2.flags |= 128, d2 = true, Ej(f2, false), b2.lanes = 4194304);
        }
      else {
        if (!d2)
          if (a2 = Mh(g2), null !== a2) {
            if (b2.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Ej(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I$2)
              return S$3(b2), null;
          } else
            2 * B() - f2.renderingStartTime > Hj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Ej(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (null !== f2.tail)
        return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B(), b2.sibling = null, c2 = M$5.current, G(M$5, d2 ? c2 & 1 | 2 : c2 & 1), b2;
      S$3(b2);
      return null;
    case 22:
    case 23:
      return Ij(), d2 = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (gj & 1073741824) && (S$3(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S$3(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$5(156, b2.tag));
}
function Jj(a2, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 3:
      return Jh(), E$1(Wf), E$1(H$1), Oh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 5:
      return Lh(b2), null;
    case 13:
      E$1(M$5);
      a2 = b2.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b2.alternate)
          throw Error(p$5(340));
        Ig();
      }
      a2 = b2.flags;
      return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 19:
      return E$1(M$5), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b2.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = false, U$2 = false, Lj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Mj(a2, b2) {
  var c2 = a2.ref;
  if (null !== c2)
    if ("function" === typeof c2)
      try {
        c2(null);
      } catch (d2) {
        W$1(a2, b2, d2);
      }
    else
      c2.current = null;
}
function Nj(a2, b2, c2) {
  try {
    c2();
  } catch (d2) {
    W$1(a2, b2, d2);
  }
}
var Oj = false;
function Pj(a2, b2) {
  Cf = dd;
  a2 = Me();
  if (Ne$2(a2)) {
    if ("selectionStart" in a2)
      var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else
      a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && 0 !== d2.rangeCount) {
          c2 = d2.anchorNode;
          var e3 = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r3 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c2 || 0 !== e3 && 3 !== q2.nodeType || (h2 = g2 + e3);
                q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
                3 === q2.nodeType && (g2 += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild))
                  break;
                r3 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a2)
                  break b;
                r3 === c2 && ++l2 === e3 && (h2 = g2);
                r3 === f2 && ++m2 === d2 && (k2 = g2);
                if (null !== (y2 = q2.nextSibling))
                  break;
                q2 = r3;
                r3 = q2.parentNode;
              }
              q2 = y2;
            }
          c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
        } else
          c2 = null;
      }
    c2 = c2 || { start: 0, end: 0 };
  } else
    c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd = false;
  for (V = b2; null !== V; )
    if (b2 = V, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2)
      a2.return = b2, V = a2;
    else
      for (; null !== V; ) {
        b2 = V;
        try {
          var n2 = b2.alternate;
          if (0 !== (b2.flags & 1024))
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n2) {
                  var t4 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t4 : Lg(b2.type, t4), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b2.stateNode.containerInfo;
                1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$5(163));
            }
        } catch (F2) {
          W$1(b2, b2.return, F2);
        }
        a2 = b2.sibling;
        if (null !== a2) {
          a2.return = b2.return;
          V = a2;
          break;
        }
        V = b2.return;
      }
  n2 = Oj;
  Oj = false;
  return n2;
}
function Qj(a2, b2, c2) {
  var d2 = b2.updateQueue;
  d2 = null !== d2 ? d2.lastEffect : null;
  if (null !== d2) {
    var e3 = d2 = d2.next;
    do {
      if ((e3.tag & a2) === a2) {
        var f2 = e3.destroy;
        e3.destroy = void 0;
        void 0 !== f2 && Nj(b2, c2, f2);
      }
      e3 = e3.next;
    } while (e3 !== d2);
  }
}
function Rj(a2, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Sj(a2) {
  var b2 = a2.ref;
  if (null !== b2) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b2 ? b2(a2) : b2.current = a2;
  }
}
function Tj(a2) {
  var b2 = a2.alternate;
  null !== b2 && (a2.alternate = null, Tj(b2));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Uj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Vj(a2) {
  a:
    for (; ; ) {
      for (; null === a2.sibling; ) {
        if (null === a2.return || Uj(a2.return))
          return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
        if (a2.flags & 2)
          continue a;
        if (null === a2.child || 4 === a2.tag)
          continue a;
        else
          a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2))
        return a2.stateNode;
    }
}
function Wj(a2, b2, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2)
    a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d2 && (a2 = a2.child, null !== a2))
    for (Wj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
      Wj(a2, b2, c2), a2 = a2.sibling;
}
function Xj(a2, b2, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2)
    a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
  else if (4 !== d2 && (a2 = a2.child, null !== a2))
    for (Xj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
      Xj(a2, b2, c2), a2 = a2.sibling;
}
var X$1 = null, Yj = false;
function Zj(a2, b2, c2) {
  for (c2 = c2.child; null !== c2; )
    ak(a2, b2, c2), c2 = c2.sibling;
}
function ak(a2, b2, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount)
    try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h2) {
    }
  switch (c2.tag) {
    case 5:
      U$2 || Mj(c2, b2);
    case 6:
      var d2 = X$1, e3 = Yj;
      X$1 = null;
      Zj(a2, b2, c2);
      X$1 = d2;
      Yj = e3;
      null !== X$1 && (Yj ? (a2 = X$1, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X$1.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X$1 && (Yj ? (a2 = X$1, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X$1, c2.stateNode));
      break;
    case 4:
      d2 = X$1;
      e3 = Yj;
      X$1 = c2.stateNode.containerInfo;
      Yj = true;
      Zj(a2, b2, c2);
      X$1 = d2;
      Yj = e3;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$2 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
        e3 = d2 = d2.next;
        do {
          var f2 = e3, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Nj(c2, b2, g2) : 0 !== (f2 & 4) && Nj(c2, b2, g2));
          e3 = e3.next;
        } while (e3 !== d2);
      }
      Zj(a2, b2, c2);
      break;
    case 1:
      if (!U$2 && (Mj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount))
        try {
          d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
        } catch (h2) {
          W$1(c2, b2, h2);
        }
      Zj(a2, b2, c2);
      break;
    case 21:
      Zj(a2, b2, c2);
      break;
    case 22:
      c2.mode & 1 ? (U$2 = (d2 = U$2) || null !== c2.memoizedState, Zj(a2, b2, c2), U$2 = d2) : Zj(a2, b2, c2);
      break;
    default:
      Zj(a2, b2, c2);
  }
}
function bk(a2) {
  var b2 = a2.updateQueue;
  if (null !== b2) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Lj());
    b2.forEach(function(b3) {
      var d2 = ck.bind(null, a2, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
    });
  }
}
function dk(a2, b2) {
  var c2 = b2.deletions;
  if (null !== c2)
    for (var d2 = 0; d2 < c2.length; d2++) {
      var e3 = c2[d2];
      try {
        var f2 = a2, g2 = b2, h2 = g2;
        a:
          for (; null !== h2; ) {
            switch (h2.tag) {
              case 5:
                X$1 = h2.stateNode;
                Yj = false;
                break a;
              case 3:
                X$1 = h2.stateNode.containerInfo;
                Yj = true;
                break a;
              case 4:
                X$1 = h2.stateNode.containerInfo;
                Yj = true;
                break a;
            }
            h2 = h2.return;
          }
        if (null === X$1)
          throw Error(p$5(160));
        ak(f2, g2, e3);
        X$1 = null;
        Yj = false;
        var k2 = e3.alternate;
        null !== k2 && (k2.return = null);
        e3.return = null;
      } catch (l2) {
        W$1(e3, b2, l2);
      }
    }
  if (b2.subtreeFlags & 12854)
    for (b2 = b2.child; null !== b2; )
      ek(b2, a2), b2 = b2.sibling;
}
function ek(a2, b2) {
  var c2 = a2.alternate, d2 = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b2, a2);
      fk(a2);
      if (d2 & 4) {
        try {
          Qj(3, a2, a2.return), Rj(3, a2);
        } catch (t4) {
          W$1(a2, a2.return, t4);
        }
        try {
          Qj(5, a2, a2.return);
        } catch (t4) {
          W$1(a2, a2.return, t4);
        }
      }
      break;
    case 1:
      dk(b2, a2);
      fk(a2);
      d2 & 512 && null !== c2 && Mj(c2, c2.return);
      break;
    case 5:
      dk(b2, a2);
      fk(a2);
      d2 & 512 && null !== c2 && Mj(c2, c2.return);
      if (a2.flags & 32) {
        var e3 = a2.stateNode;
        try {
          ob(e3, "");
        } catch (t4) {
          W$1(a2, a2.return, t4);
        }
      }
      if (d2 & 4 && (e3 = a2.stateNode, null != e3)) {
        var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2)
          try {
            "input" === h2 && "radio" === f2.type && null != f2.name && ab(e3, f2);
            vb(h2, g2);
            var l2 = vb(h2, f2);
            for (g2 = 0; g2 < k2.length; g2 += 2) {
              var m2 = k2[g2], q2 = k2[g2 + 1];
              "style" === m2 ? sb(e3, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e3, q2) : "children" === m2 ? ob(e3, q2) : ta(e3, m2, q2, l2);
            }
            switch (h2) {
              case "input":
                bb(e3, f2);
                break;
              case "textarea":
                ib(e3, f2);
                break;
              case "select":
                var r3 = e3._wrapperState.wasMultiple;
                e3._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e3, !!f2.multiple, y2, false) : r3 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e3,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e3, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e3[Pf] = f2;
          } catch (t4) {
            W$1(a2, a2.return, t4);
          }
      }
      break;
    case 6:
      dk(b2, a2);
      fk(a2);
      if (d2 & 4) {
        if (null === a2.stateNode)
          throw Error(p$5(162));
        e3 = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e3.nodeValue = f2;
        } catch (t4) {
          W$1(a2, a2.return, t4);
        }
      }
      break;
    case 3:
      dk(b2, a2);
      fk(a2);
      if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated)
        try {
          bd(b2.containerInfo);
        } catch (t4) {
          W$1(a2, a2.return, t4);
        }
      break;
    case 4:
      dk(b2, a2);
      fk(a2);
      break;
    case 13:
      dk(b2, a2);
      fk(a2);
      e3 = a2.child;
      e3.flags & 8192 && (f2 = null !== e3.memoizedState, e3.stateNode.isHidden = f2, !f2 || null !== e3.alternate && null !== e3.alternate.memoizedState || (gk = B()));
      d2 & 4 && bk(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U$2 = (l2 = U$2) || m2, dk(b2, a2), U$2 = l2) : dk(b2, a2);
      fk(a2);
      if (d2 & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1))
          for (V = a2, m2 = a2.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r3 = V;
              y2 = r3.child;
              switch (r3.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, r3, r3.return);
                  break;
                case 1:
                  Mj(r3, r3.return);
                  var n2 = r3.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d2 = r3;
                    c2 = r3.return;
                    try {
                      b2 = d2, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                    } catch (t4) {
                      W$1(d2, c2, t4);
                    }
                  }
                  break;
                case 5:
                  Mj(r3, r3.return);
                  break;
                case 22:
                  if (null !== r3.memoizedState) {
                    hk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r3, V = y2) : hk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a2; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e3 = q2.stateNode, l2 ? (f2 = e3.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
                } catch (t4) {
                  W$1(a2, a2.return, t4);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t4) {
                  W$1(a2, a2.return, t4);
                }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a2)
              break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a2)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      dk(b2, a2);
      fk(a2);
      d2 & 4 && bk(a2);
      break;
    case 21:
      break;
    default:
      dk(
        b2,
        a2
      ), fk(a2);
  }
}
function fk(a2) {
  var b2 = a2.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Uj(c2)) {
            var d2 = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$5(160));
      }
      switch (d2.tag) {
        case 5:
          var e3 = d2.stateNode;
          d2.flags & 32 && (ob(e3, ""), d2.flags &= -33);
          var f2 = Vj(a2);
          Xj(a2, f2, e3);
          break;
        case 3:
        case 4:
          var g2 = d2.stateNode.containerInfo, h2 = Vj(a2);
          Wj(a2, h2, g2);
          break;
        default:
          throw Error(p$5(161));
      }
    } catch (k2) {
      W$1(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b2 & 4096 && (a2.flags &= -4097);
}
function ik(a2, b2, c2) {
  V = a2;
  jk(a2);
}
function jk(a2, b2, c2) {
  for (var d2 = 0 !== (a2.mode & 1); null !== V; ) {
    var e3 = V, f2 = e3.child;
    if (22 === e3.tag && d2) {
      var g2 = null !== e3.memoizedState || Kj;
      if (!g2) {
        var h2 = e3.alternate, k2 = null !== h2 && null !== h2.memoizedState || U$2;
        h2 = Kj;
        var l2 = U$2;
        Kj = g2;
        if ((U$2 = k2) && !l2)
          for (V = e3; null !== V; )
            g2 = V, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? kk(e3) : null !== k2 ? (k2.return = g2, V = k2) : kk(e3);
        for (; null !== f2; )
          V = f2, jk(f2), f2 = f2.sibling;
        V = e3;
        Kj = h2;
        U$2 = l2;
      }
      lk(a2);
    } else
      0 !== (e3.subtreeFlags & 8772) && null !== f2 ? (f2.return = e3, V = f2) : lk(a2);
  }
}
function lk(a2) {
  for (; null !== V; ) {
    var b2 = V;
    if (0 !== (b2.flags & 8772)) {
      var c2 = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772))
          switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              U$2 || Rj(5, b2);
              break;
            case 1:
              var d2 = b2.stateNode;
              if (b2.flags & 4 && !U$2)
                if (null === c2)
                  d2.componentDidMount();
                else {
                  var e3 = b2.elementType === b2.type ? c2.memoizedProps : Lg(b2.type, c2.memoizedProps);
                  d2.componentDidUpdate(e3, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b2.updateQueue;
              null !== f2 && ih(b2, f2, d2);
              break;
            case 3:
              var g2 = b2.updateQueue;
              if (null !== g2) {
                c2 = null;
                if (null !== b2.child)
                  switch (b2.child.tag) {
                    case 5:
                      c2 = b2.child.stateNode;
                      break;
                    case 1:
                      c2 = b2.child.stateNode;
                  }
                ih(b2, g2, c2);
              }
              break;
            case 5:
              var h2 = b2.stateNode;
              if (null === c2 && b2.flags & 4) {
                c2 = h2;
                var k2 = b2.memoizedProps;
                switch (b2.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b2.memoizedState) {
                var l2 = b2.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$5(163));
          }
        U$2 || b2.flags & 512 && Sj(b2);
      } catch (r3) {
        W$1(b2, b2.return, r3);
      }
    }
    if (b2 === a2) {
      V = null;
      break;
    }
    c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V = c2;
      break;
    }
    V = b2.return;
  }
}
function hk(a2) {
  for (; null !== V; ) {
    var b2 = V;
    if (b2 === a2) {
      V = null;
      break;
    }
    var c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V = c2;
      break;
    }
    V = b2.return;
  }
}
function kk(a2) {
  for (; null !== V; ) {
    var b2 = V;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Rj(4, b2);
          } catch (k2) {
            W$1(b2, c2, k2);
          }
          break;
        case 1:
          var d2 = b2.stateNode;
          if ("function" === typeof d2.componentDidMount) {
            var e3 = b2.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              W$1(b2, e3, k2);
            }
          }
          var f2 = b2.return;
          try {
            Sj(b2);
          } catch (k2) {
            W$1(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Sj(b2);
          } catch (k2) {
            W$1(b2, g2, k2);
          }
      }
    } catch (k2) {
      W$1(b2, b2.return, k2);
    }
    if (b2 === a2) {
      V = null;
      break;
    }
    var h2 = b2.sibling;
    if (null !== h2) {
      h2.return = b2.return;
      V = h2;
      break;
    }
    V = b2.return;
  }
}
var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K = 0, R$1 = null, Y$1 = null, Z$1 = 0, gj = 0, fj = Uf(0), T$2 = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = Infinity, vk = null, Pi = false, Qi = null, Si = null, wk = false, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L() {
  return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();
}
function lh(a2) {
  if (0 === (a2.mode & 1))
    return 1;
  if (0 !== (K & 2) && 0 !== Z$1)
    return Z$1 & -Z$1;
  if (null !== Kg.transition)
    return 0 === Ck && (Ck = yc()), Ck;
  a2 = C$1;
  if (0 !== a2)
    return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd(a2.type);
  return a2;
}
function mh(a2, b2, c2, d2) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p$5(185));
  Ac(a2, c2, d2);
  if (0 === (K & 2) || a2 !== R$1)
    a2 === R$1 && (0 === (K & 2) && (rk |= c2), 4 === T$2 && Dk(a2, Z$1)), Ek(a2, d2), 1 === c2 && 0 === K && 0 === (b2.mode & 1) && (Hj = B() + 500, fg && jg());
}
function Ek(a2, b2) {
  var c2 = a2.callbackNode;
  wc(a2, b2);
  var d2 = uc(a2, a2 === R$1 ? Z$1 : 0);
  if (0 === d2)
    null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b2 = d2 & -d2, a2.callbackPriority !== b2) {
    null != c2 && bc(c2);
    if (1 === b2)
      0 === a2.tag ? ig(Fk.bind(null, a2)) : hg(Fk.bind(null, a2)), Jf(function() {
        0 === (K & 6) && jg();
      }), c2 = null;
    else {
      switch (Dc(d2)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Gk(c2, Hk.bind(null, a2));
    }
    a2.callbackPriority = b2;
    a2.callbackNode = c2;
  }
}
function Hk(a2, b2) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K & 6))
    throw Error(p$5(327));
  var c2 = a2.callbackNode;
  if (Ik() && a2.callbackNode !== c2)
    return null;
  var d2 = uc(a2, a2 === R$1 ? Z$1 : 0);
  if (0 === d2)
    return null;
  if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b2)
    b2 = Jk(a2, d2);
  else {
    b2 = d2;
    var e3 = K;
    K |= 2;
    var f2 = Kk();
    if (R$1 !== a2 || Z$1 !== b2)
      vk = null, Hj = B() + 500, Lk(a2, b2);
    do
      try {
        Mk();
        break;
      } catch (h2) {
        Nk(a2, h2);
      }
    while (1);
    Qg();
    nk.current = f2;
    K = e3;
    null !== Y$1 ? b2 = 0 : (R$1 = null, Z$1 = 0, b2 = T$2);
  }
  if (0 !== b2) {
    2 === b2 && (e3 = xc(a2), 0 !== e3 && (d2 = e3, b2 = Ok(a2, e3)));
    if (1 === b2)
      throw c2 = qk, Lk(a2, 0), Dk(a2, d2), Ek(a2, B()), c2;
    if (6 === b2)
      Dk(a2, d2);
    else {
      e3 = a2.current.alternate;
      if (0 === (d2 & 30) && !Pk(e3) && (b2 = Jk(a2, d2), 2 === b2 && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b2 = Ok(a2, f2))), 1 === b2))
        throw c2 = qk, Lk(a2, 0), Dk(a2, d2), Ek(a2, B()), c2;
      a2.finishedWork = e3;
      a2.finishedLanes = d2;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$5(345));
        case 2:
          Qk(a2, uk, vk);
          break;
        case 3:
          Dk(a2, d2);
          if ((d2 & 130023424) === d2 && (b2 = gk + 500 - B(), 10 < b2)) {
            if (0 !== uc(a2, 0))
              break;
            e3 = a2.suspendedLanes;
            if ((e3 & d2) !== d2) {
              L();
              a2.pingedLanes |= a2.suspendedLanes & e3;
              break;
            }
            a2.timeoutHandle = Ff(Qk.bind(null, a2, uk, vk), b2);
            break;
          }
          Qk(a2, uk, vk);
          break;
        case 4:
          Dk(a2, d2);
          if ((d2 & 4194240) === d2)
            break;
          b2 = a2.eventTimes;
          for (e3 = -1; 0 < d2; ) {
            var g2 = 31 - oc(d2);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e3 && (e3 = g2);
            d2 &= ~f2;
          }
          d2 = e3;
          d2 = B() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * mk(d2 / 1960)) - d2;
          if (10 < d2) {
            a2.timeoutHandle = Ff(Qk.bind(null, a2, uk, vk), d2);
            break;
          }
          Qk(a2, uk, vk);
          break;
        case 5:
          Qk(a2, uk, vk);
          break;
        default:
          throw Error(p$5(329));
      }
    }
  }
  Ek(a2, B());
  return a2.callbackNode === c2 ? Hk.bind(null, a2) : null;
}
function Ok(a2, b2) {
  var c2 = tk;
  a2.current.memoizedState.isDehydrated && (Lk(a2, b2).flags |= 256);
  a2 = Jk(a2, b2);
  2 !== a2 && (b2 = uk, uk = c2, null !== b2 && Gj(b2));
  return a2;
}
function Gj(a2) {
  null === uk ? uk = a2 : uk.push.apply(uk, a2);
}
function Pk(a2) {
  for (var b2 = a2; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2))
        for (var d2 = 0; d2 < c2.length; d2++) {
          var e3 = c2[d2], f2 = e3.getSnapshot;
          e3 = e3.value;
          try {
            if (!He$2(f2(), e3))
              return false;
          } catch (g2) {
            return false;
          }
        }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c2)
      c2.return = b2, b2 = c2;
    else {
      if (b2 === a2)
        break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a2)
          return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Dk(a2, b2) {
  b2 &= ~sk;
  b2 &= ~rk;
  a2.suspendedLanes |= b2;
  a2.pingedLanes &= ~b2;
  for (a2 = a2.expirationTimes; 0 < b2; ) {
    var c2 = 31 - oc(b2), d2 = 1 << c2;
    a2[c2] = -1;
    b2 &= ~d2;
  }
}
function Fk(a2) {
  if (0 !== (K & 6))
    throw Error(p$5(327));
  Ik();
  var b2 = uc(a2, 0);
  if (0 === (b2 & 1))
    return Ek(a2, B()), null;
  var c2 = Jk(a2, b2);
  if (0 !== a2.tag && 2 === c2) {
    var d2 = xc(a2);
    0 !== d2 && (b2 = d2, c2 = Ok(a2, d2));
  }
  if (1 === c2)
    throw c2 = qk, Lk(a2, 0), Dk(a2, b2), Ek(a2, B()), c2;
  if (6 === c2)
    throw Error(p$5(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b2;
  Qk(a2, uk, vk);
  Ek(a2, B());
  return null;
}
function Rk(a2, b2) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b2);
  } finally {
    K = c2, 0 === K && (Hj = B() + 500, fg && jg());
  }
}
function Sk(a2) {
  null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();
  var b2 = K;
  K |= 1;
  var c2 = pk.transition, d2 = C$1;
  try {
    if (pk.transition = null, C$1 = 1, a2)
      return a2();
  } finally {
    C$1 = d2, pk.transition = c2, K = b2, 0 === (K & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E$1(fj);
}
function Lk(a2, b2) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y$1)
    for (c2 = Y$1.return; null !== c2; ) {
      var d2 = c2;
      wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          null !== d2 && void 0 !== d2 && $f();
          break;
        case 3:
          Jh();
          E$1(Wf);
          E$1(H$1);
          Oh();
          break;
        case 5:
          Lh(d2);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E$1(M$5);
          break;
        case 19:
          E$1(M$5);
          break;
        case 10:
          Rg(d2.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      c2 = c2.return;
    }
  R$1 = a2;
  Y$1 = a2 = wh(a2.current, null);
  Z$1 = gj = b2;
  T$2 = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b2 = 0; b2 < Wg.length; b2++)
      if (c2 = Wg[b2], d2 = c2.interleaved, null !== d2) {
        c2.interleaved = null;
        var e3 = d2.next, f2 = c2.pending;
        if (null !== f2) {
          var g2 = f2.next;
          f2.next = e3;
          d2.next = g2;
        }
        c2.pending = d2;
      }
    Wg = null;
  }
  return a2;
}
function Nk(a2, b2) {
  do {
    var c2 = Y$1;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d2 = N$2.memoizedState; null !== d2; ) {
          var e3 = d2.queue;
          null !== e3 && (e3.pending = null);
          d2 = d2.next;
        }
        Sh = false;
      }
      Rh = 0;
      P = O = N$2 = null;
      Th = false;
      Uh = 0;
      ok.current = null;
      if (null === c2 || null === c2.return) {
        T$2 = 1;
        qk = b2;
        Y$1 = null;
        break;
      }
      a: {
        var f2 = a2, g2 = c2.return, h2 = c2, k2 = b2;
        b2 = Z$1;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r3 = m2.alternate;
            r3 ? (m2.updateQueue = r3.updateQueue, m2.memoizedState = r3.memoizedState, m2.lanes = r3.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Vi(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Wi(y2, g2, h2, f2, b2);
            y2.mode & 1 && Ti(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t4 = /* @__PURE__ */ new Set();
              t4.add(k2);
              b2.updateQueue = t4;
            } else
              n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Ti(f2, l2, b2);
              uj();
              break a;
            }
            k2 = Error(p$5(426));
          }
        } else if (I$2 && h2.mode & 1) {
          var J2 = Vi(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Wi(J2, g2, h2, f2, b2);
            Jg(Ki(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ki(k2, h2);
        4 !== T$2 && (T$2 = 2);
        null === tk ? tk = [f2] : tk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Oi(f2, k2, b2);
              fh(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Si || !Si.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Ri(f2, h2, b2);
                fh(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Tk(c2);
    } catch (na) {
      b2 = na;
      Y$1 === c2 && null !== c2 && (Y$1 = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a2 = nk.current;
  nk.current = ai;
  return null === a2 ? ai : a2;
}
function uj() {
  if (0 === T$2 || 3 === T$2 || 2 === T$2)
    T$2 = 4;
  null === R$1 || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R$1, Z$1);
}
function Jk(a2, b2) {
  var c2 = K;
  K |= 2;
  var d2 = Kk();
  if (R$1 !== a2 || Z$1 !== b2)
    vk = null, Lk(a2, b2);
  do
    try {
      Uk();
      break;
    } catch (e3) {
      Nk(a2, e3);
    }
  while (1);
  Qg();
  K = c2;
  nk.current = d2;
  if (null !== Y$1)
    throw Error(p$5(261));
  R$1 = null;
  Z$1 = 0;
  return T$2;
}
function Uk() {
  for (; null !== Y$1; )
    Vk(Y$1);
}
function Mk() {
  for (; null !== Y$1 && !cc(); )
    Vk(Y$1);
}
function Vk(a2) {
  var b2 = Wk(a2.alternate, a2, gj);
  a2.memoizedProps = a2.pendingProps;
  null === b2 ? Tk(a2) : Y$1 = b2;
  ok.current = null;
}
function Tk(a2) {
  var b2 = a2;
  do {
    var c2 = b2.alternate;
    a2 = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c2 = Fj(c2, b2, gj), null !== c2) {
        Y$1 = c2;
        return;
      }
    } else {
      c2 = Jj(c2, b2);
      if (null !== c2) {
        c2.flags &= 32767;
        Y$1 = c2;
        return;
      }
      if (null !== a2)
        a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T$2 = 6;
        Y$1 = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y$1 = b2;
      return;
    }
    Y$1 = b2 = a2;
  } while (null !== b2);
  0 === T$2 && (T$2 = 5);
}
function Qk(a2, b2, c2) {
  var d2 = C$1, e3 = pk.transition;
  try {
    pk.transition = null, C$1 = 1, Xk(a2, b2, c2, d2);
  } finally {
    pk.transition = e3, C$1 = d2;
  }
  return null;
}
function Xk(a2, b2, c2, d2) {
  do
    Ik();
  while (null !== xk);
  if (0 !== (K & 6))
    throw Error(p$5(327));
  c2 = a2.finishedWork;
  var e3 = a2.finishedLanes;
  if (null === c2)
    return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current)
    throw Error(p$5(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a2, f2);
  a2 === R$1 && (Y$1 = R$1 = null, Z$1 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || wk || (wk = true, Gk(hc, function() {
    Ik();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = pk.transition;
    pk.transition = null;
    var g2 = C$1;
    C$1 = 1;
    var h2 = K;
    K |= 4;
    ok.current = null;
    Pj(a2, c2);
    ek(c2, a2);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    ik(c2);
    dc();
    K = h2;
    C$1 = g2;
    pk.transition = f2;
  } else
    a2.current = c2;
  wk && (wk = false, xk = a2, yk = e3);
  f2 = a2.pendingLanes;
  0 === f2 && (Si = null);
  mc(c2.stateNode);
  Ek(a2, B());
  if (null !== b2)
    for (d2 = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++)
      e3 = b2[c2], d2(e3.value, { componentStack: e3.stack, digest: e3.digest });
  if (Pi)
    throw Pi = false, a2 = Qi, Qi = null, a2;
  0 !== (yk & 1) && 0 !== a2.tag && Ik();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === Ak ? zk++ : (zk = 0, Ak = a2) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a2 = Dc(yk), b2 = pk.transition, c2 = C$1;
    try {
      pk.transition = null;
      C$1 = 16 > a2 ? 16 : a2;
      if (null === xk)
        var d2 = false;
      else {
        a2 = xk;
        xk = null;
        yk = 0;
        if (0 !== (K & 6))
          throw Error(p$5(331));
        var e3 = K;
        K |= 4;
        for (V = a2.current; null !== V; ) {
          var f2 = V, g2 = f2.child;
          if (0 !== (V.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2)
                    q2.return = m2, V = q2;
                  else
                    for (; null !== V; ) {
                      m2 = V;
                      var r3 = m2.sibling, y2 = m2.return;
                      Tj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r3) {
                        r3.return = y2;
                        V = r3;
                        break;
                      }
                      V = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t4 = n2.child;
                if (null !== t4) {
                  n2.child = null;
                  do {
                    var J2 = t4.sibling;
                    t4.sibling = null;
                    t4 = J2;
                  } while (null !== t4);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2)
            g2.return = f2, V = g2;
          else
            b:
              for (; null !== V; ) {
                f2 = V;
                if (0 !== (f2.flags & 2048))
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V = x2;
                  break b;
                }
                V = f2.return;
              }
        }
        var w2 = a2.current;
        for (V = w2; null !== V; ) {
          g2 = V;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2)
            u2.return = g2, V = u2;
          else
            b:
              for (g2 = w2; null !== V; ) {
                h2 = V;
                if (0 !== (h2.flags & 2048))
                  try {
                    switch (h2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, h2);
                    }
                  } catch (na) {
                    W$1(h2, h2.return, na);
                  }
                if (h2 === g2) {
                  V = null;
                  break b;
                }
                var F2 = h2.sibling;
                if (null !== F2) {
                  F2.return = h2.return;
                  V = F2;
                  break b;
                }
                V = h2.return;
              }
        }
        K = e3;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot)
          try {
            lc.onPostCommitFiberRoot(kc, a2);
          } catch (na) {
          }
        d2 = true;
      }
      return d2;
    } finally {
      C$1 = c2, pk.transition = b2;
    }
  }
  return false;
}
function Yk(a2, b2, c2) {
  b2 = Ki(c2, b2);
  b2 = Oi(a2, b2, 1);
  a2 = dh(a2, b2, 1);
  b2 = L();
  null !== a2 && (Ac(a2, 1, b2), Ek(a2, b2));
}
function W$1(a2, b2, c2) {
  if (3 === a2.tag)
    Yk(a2, a2, c2);
  else
    for (; null !== b2; ) {
      if (3 === b2.tag) {
        Yk(b2, a2, c2);
        break;
      } else if (1 === b2.tag) {
        var d2 = b2.stateNode;
        if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Si || !Si.has(d2))) {
          a2 = Ki(c2, a2);
          a2 = Ri(b2, a2, 1);
          b2 = dh(b2, a2, 1);
          a2 = L();
          null !== b2 && (Ac(b2, 1, a2), Ek(b2, a2));
          break;
        }
      }
      b2 = b2.return;
    }
}
function Ui(a2, b2, c2) {
  var d2 = a2.pingCache;
  null !== d2 && d2.delete(b2);
  b2 = L();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  R$1 === a2 && (Z$1 & c2) === c2 && (4 === T$2 || 3 === T$2 && (Z$1 & 130023424) === Z$1 && 500 > B() - gk ? Lk(a2, 0) : sk |= c2);
  Ek(a2, b2);
}
function Zk(a2, b2) {
  0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = L();
  a2 = Zg(a2, b2);
  null !== a2 && (Ac(a2, b2, c2), Ek(a2, c2));
}
function vj(a2) {
  var b2 = a2.memoizedState, c2 = 0;
  null !== b2 && (c2 = b2.retryLane);
  Zk(a2, c2);
}
function ck(a2, b2) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d2 = a2.stateNode;
      var e3 = a2.memoizedState;
      null !== e3 && (c2 = e3.retryLane);
      break;
    case 19:
      d2 = a2.stateNode;
      break;
    default:
      throw Error(p$5(314));
  }
  null !== d2 && d2.delete(b2);
  Zk(a2, c2);
}
var Wk;
Wk = function(a2, b2, c2) {
  if (null !== a2)
    if (a2.memoizedProps !== b2.pendingProps || Wf.current)
      Ug = true;
    else {
      if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128))
        return Ug = false, zj(a2, b2, c2);
      Ug = 0 !== (a2.flags & 131072) ? true : false;
    }
  else
    Ug = false, I$2 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d2 = b2.type;
      jj(a2, b2);
      a2 = b2.pendingProps;
      var e3 = Yf(b2, H$1.current);
      Tg(b2, c2);
      e3 = Xh(null, b2, d2, a2, e3, c2);
      var f2 = bi();
      b2.flags |= 1;
      "object" === typeof e3 && null !== e3 && "function" === typeof e3.render && void 0 === e3.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e3.state && void 0 !== e3.state ? e3.state : null, ah(b2), e3.updater = nh, b2.stateNode = e3, e3._reactInternals = b2, rh(b2, d2, a2, c2), b2 = kj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I$2 && f2 && vg(b2), Yi(null, b2, e3, c2), b2 = b2.child);
      return b2;
    case 16:
      d2 = b2.elementType;
      a: {
        jj(a2, b2);
        a2 = b2.pendingProps;
        e3 = d2._init;
        d2 = e3(d2._payload);
        b2.type = d2;
        e3 = b2.tag = $k(d2);
        a2 = Lg(d2, a2);
        switch (e3) {
          case 0:
            b2 = dj(null, b2, d2, a2, c2);
            break a;
          case 1:
            b2 = ij(null, b2, d2, a2, c2);
            break a;
          case 11:
            b2 = Zi(null, b2, d2, a2, c2);
            break a;
          case 14:
            b2 = aj(null, b2, d2, Lg(d2.type, a2), c2);
            break a;
        }
        throw Error(p$5(
          306,
          d2,
          ""
        ));
      }
      return b2;
    case 0:
      return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Lg(d2, e3), dj(a2, b2, d2, e3, c2);
    case 1:
      return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Lg(d2, e3), ij(a2, b2, d2, e3, c2);
    case 3:
      a: {
        lj(b2);
        if (null === a2)
          throw Error(p$5(387));
        d2 = b2.pendingProps;
        f2 = b2.memoizedState;
        e3 = f2.element;
        bh(a2, b2);
        gh(b2, d2, null, c2);
        var g2 = b2.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated)
          if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
            e3 = Ki(Error(p$5(423)), b2);
            b2 = mj(a2, b2, d2, c2, e3);
            break a;
          } else if (d2 !== e3) {
            e3 = Ki(Error(p$5(424)), b2);
            b2 = mj(a2, b2, d2, c2, e3);
            break a;
          } else
            for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I$2 = true, zg = null, c2 = Ch(b2, null, d2, c2), b2.child = c2; c2; )
              c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d2 === e3) {
            b2 = $i(a2, b2, c2);
            break a;
          }
          Yi(a2, b2, d2, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Kh(b2), null === a2 && Eg(b2), d2 = b2.type, e3 = b2.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e3.children, Ef(d2, e3) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), hj(a2, b2), Yi(a2, b2, g2, c2), b2.child;
    case 6:
      return null === a2 && Eg(b2), null;
    case 13:
      return pj(a2, b2, c2);
    case 4:
      return Ih(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a2 ? b2.child = Bh(b2, null, d2, c2) : Yi(a2, b2, d2, c2), b2.child;
    case 11:
      return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Lg(d2, e3), Zi(a2, b2, d2, e3, c2);
    case 7:
      return Yi(a2, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Yi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Yi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d2 = b2.type._context;
        e3 = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e3.value;
        G(Mg, d2._currentValue);
        d2._currentValue = g2;
        if (null !== f2)
          if (He$2(f2.value, g2)) {
            if (f2.children === e3.children && !Wf.current) {
              b2 = $i(a2, b2, c2);
              break a;
            }
          } else
            for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
              var h2 = f2.dependencies;
              if (null !== h2) {
                g2 = f2.child;
                for (var k2 = h2.firstContext; null !== k2; ) {
                  if (k2.context === d2) {
                    if (1 === f2.tag) {
                      k2 = ch(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c2);
                    Sg(
                      f2.return,
                      c2,
                      b2
                    );
                    h2.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag)
                g2 = f2.type === b2.type ? null : f2.child;
              else if (18 === f2.tag) {
                g2 = f2.return;
                if (null === g2)
                  throw Error(p$5(341));
                g2.lanes |= c2;
                h2 = g2.alternate;
                null !== h2 && (h2.lanes |= c2);
                Sg(g2, c2, b2);
                g2 = f2.sibling;
              } else
                g2 = f2.child;
              if (null !== g2)
                g2.return = f2;
              else
                for (g2 = f2; null !== g2; ) {
                  if (g2 === b2) {
                    g2 = null;
                    break;
                  }
                  f2 = g2.sibling;
                  if (null !== f2) {
                    f2.return = g2.return;
                    g2 = f2;
                    break;
                  }
                  g2 = g2.return;
                }
              f2 = g2;
            }
        Yi(a2, b2, e3.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e3 = b2.type, d2 = b2.pendingProps.children, Tg(b2, c2), e3 = Vg(e3), d2 = d2(e3), b2.flags |= 1, Yi(a2, b2, d2, c2), b2.child;
    case 14:
      return d2 = b2.type, e3 = Lg(d2, b2.pendingProps), e3 = Lg(d2.type, e3), aj(a2, b2, d2, e3, c2);
    case 15:
      return cj(a2, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d2 = b2.type, e3 = b2.pendingProps, e3 = b2.elementType === d2 ? e3 : Lg(d2, e3), jj(a2, b2), b2.tag = 1, Zf(d2) ? (a2 = true, cg(b2)) : a2 = false, Tg(b2, c2), ph(b2, d2, e3), rh(b2, d2, e3, c2), kj(null, b2, d2, true, a2, c2);
    case 19:
      return yj(a2, b2, c2);
    case 22:
      return ej(a2, b2, c2);
  }
  throw Error(p$5(156, b2.tag));
};
function Gk(a2, b2) {
  return ac(a2, b2);
}
function al(a2, b2, c2, d2) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b2, c2, d2) {
  return new al(a2, b2, c2, d2);
}
function bj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function $k(a2) {
  if ("function" === typeof a2)
    return bj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da)
      return 11;
    if (a2 === Ga)
      return 14;
  }
  return 2;
}
function wh(a2, b2) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b2 = a2.dependencies;
  c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function yh(a2, b2, c2, d2, e3, f2) {
  var g2 = 2;
  d2 = a2;
  if ("function" === typeof a2)
    bj(a2) && (g2 = 1);
  else if ("string" === typeof a2)
    g2 = 5;
  else
    a:
      switch (a2) {
        case ya:
          return Ah(c2.children, e3, f2, b2);
        case za:
          g2 = 8;
          e3 |= 8;
          break;
        case Aa:
          return a2 = Bg(12, c2, b2, e3 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
        case Ea:
          return a2 = Bg(13, c2, b2, e3), a2.elementType = Ea, a2.lanes = f2, a2;
        case Fa:
          return a2 = Bg(19, c2, b2, e3), a2.elementType = Fa, a2.lanes = f2, a2;
        case Ia:
          return qj(c2, e3, f2, b2);
        default:
          if ("object" === typeof a2 && null !== a2)
            switch (a2.$$typeof) {
              case Ba:
                g2 = 10;
                break a;
              case Ca:
                g2 = 9;
                break a;
              case Da:
                g2 = 11;
                break a;
              case Ga:
                g2 = 14;
                break a;
              case Ha:
                g2 = 16;
                d2 = null;
                break a;
            }
          throw Error(p$5(130, null == a2 ? a2 : typeof a2, ""));
      }
  b2 = Bg(g2, c2, b2, e3);
  b2.elementType = a2;
  b2.type = d2;
  b2.lanes = f2;
  return b2;
}
function Ah(a2, b2, c2, d2) {
  a2 = Bg(7, a2, d2, b2);
  a2.lanes = c2;
  return a2;
}
function qj(a2, b2, c2, d2) {
  a2 = Bg(22, a2, d2, b2);
  a2.elementType = Ia;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function xh(a2, b2, c2) {
  a2 = Bg(6, a2, null, b2);
  a2.lanes = c2;
  return a2;
}
function zh(a2, b2, c2) {
  b2 = Bg(4, null !== a2.children ? a2.children : [], a2.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b2;
}
function bl(a2, b2, c2, d2, e3) {
  this.tag = b2;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e3;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
  a2 = new bl(a2, b2, c2, h2, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg(3, null, null, b2);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  ah(f2);
  return a2;
}
function dl(a2, b2, c2) {
  var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b2, implementation: c2 };
}
function el(a2) {
  if (!a2)
    return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb(a2) !== a2 || 1 !== a2.tag)
      throw Error(p$5(170));
    var b2 = a2;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p$5(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2))
      return bg(a2, c2, b2);
  }
  return b2;
}
function fl(a2, b2, c2, d2, e3, f2, g2, h2, k2) {
  a2 = cl(c2, d2, true, a2, e3, f2, g2, h2, k2);
  a2.context = el(null);
  c2 = a2.current;
  d2 = L();
  e3 = lh(c2);
  f2 = ch(d2, e3);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  dh(c2, f2, e3);
  a2.current.lanes = e3;
  Ac(a2, e3, d2);
  Ek(a2, d2);
  return a2;
}
function gl(a2, b2, c2, d2) {
  var e3 = b2.current, f2 = L(), g2 = lh(e3);
  c2 = el(c2);
  null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
  b2 = ch(f2, g2);
  b2.payload = { element: a2 };
  d2 = void 0 === d2 ? null : d2;
  null !== d2 && (b2.callback = d2);
  a2 = dh(e3, b2, g2);
  null !== a2 && (mh(a2, e3, g2, f2), eh(a2, e3, g2));
  return g2;
}
function hl(a2) {
  a2 = a2.current;
  if (!a2.child)
    return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function il(a2, b2) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
  }
}
function jl(a2, b2) {
  il(a2, b2);
  (a2 = a2.alternate) && il(a2, b2);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ml(a2) {
  this._internalRoot = a2;
}
nl.prototype.render = ml.prototype.render = function(a2) {
  var b2 = this._internalRoot;
  if (null === b2)
    throw Error(p$5(409));
  gl(a2, b2, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b2 = a2.containerInfo;
    Sk(function() {
      gl(null, a2, null, null);
    });
    b2[uf] = null;
  }
};
function nl(a2) {
  this._internalRoot = a2;
}
nl.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b2 = Hc();
    a2 = { blockedOn: null, target: a2, priority: b2 };
    for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++)
      ;
    Qc.splice(c2, 0, a2);
    0 === c2 && Vc(a2);
  }
};
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function pl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function ql() {
}
function rl(a2, b2, c2, d2, e3) {
  if (e3) {
    if ("function" === typeof d2) {
      var f2 = d2;
      d2 = function() {
        var a3 = hl(g2);
        f2.call(a3);
      };
    }
    var g2 = fl(b2, d2, a2, 0, null, false, false, "", ql);
    a2._reactRootContainer = g2;
    a2[uf] = g2.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Sk();
    return g2;
  }
  for (; e3 = a2.lastChild; )
    a2.removeChild(e3);
  if ("function" === typeof d2) {
    var h2 = d2;
    d2 = function() {
      var a3 = hl(k2);
      h2.call(a3);
    };
  }
  var k2 = cl(a2, 0, false, null, null, false, false, "", ql);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Sk(function() {
    gl(b2, k2, c2, d2);
  });
  return k2;
}
function sl(a2, b2, c2, d2, e3) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e3) {
      var h2 = e3;
      e3 = function() {
        var a3 = hl(g2);
        h2.call(a3);
      };
    }
    gl(b2, g2, a2, e3);
  } else
    g2 = rl(c2, b2, a2, e3, d2);
  return hl(g2);
}
Ec = function(a2) {
  switch (a2.tag) {
    case 3:
      var b2 = a2.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = tc(b2.pendingLanes);
        0 !== c2 && (Cc(b2, c2 | 1), Ek(b2, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var b3 = Zg(a2, 1);
        if (null !== b3) {
          var c3 = L();
          mh(b3, a2, 1, c3);
        }
      }), jl(a2, 1);
  }
};
Fc = function(a2) {
  if (13 === a2.tag) {
    var b2 = Zg(a2, 134217728);
    if (null !== b2) {
      var c2 = L();
      mh(b2, a2, 134217728, c2);
    }
    jl(a2, 134217728);
  }
};
Gc = function(a2) {
  if (13 === a2.tag) {
    var b2 = lh(a2), c2 = Zg(a2, b2);
    if (null !== c2) {
      var d2 = L();
      mh(c2, a2, b2, d2);
    }
    jl(a2, b2);
  }
};
Hc = function() {
  return C$1;
};
Ic = function(a2, b2) {
  var c2 = C$1;
  try {
    return C$1 = a2, b2();
  } finally {
    C$1 = c2;
  }
};
yb = function(a2, b2, c2) {
  switch (b2) {
    case "input":
      bb(a2, c2);
      b2 = c2.name;
      if ("radio" === c2.type && null != b2) {
        for (c2 = a2; c2.parentNode; )
          c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d2 = c2[b2];
          if (d2 !== a2 && d2.form === a2.form) {
            var e3 = Db(d2);
            if (!e3)
              throw Error(p$5(90));
            Wa(d2);
            bb(d2, e3);
          }
        }
      }
      break;
    case "textarea":
      ib(a2, c2);
      break;
    case "select":
      b2 = c2.value, null != b2 && fb(a2, !!c2.multiple, b2, false);
  }
};
Gb = Rk;
Hb = Sk;
var tl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Rk] }, ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc = wl.inject(vl), lc = wl;
    } catch (a2) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function(a2, b2) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b2))
    throw Error(p$5(200));
  return dl(a2, b2, null, c2);
};
reactDom_production_min.createRoot = function(a2, b2) {
  if (!ol(a2))
    throw Error(p$5(299));
  var c2 = false, d2 = "", e3 = ll;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e3 = b2.onRecoverableError));
  b2 = cl(a2, 1, false, null, null, c2, false, d2, e3);
  a2[uf] = b2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ml(b2);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2)
    return null;
  if (1 === a2.nodeType)
    return a2;
  var b2 = a2._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a2.render)
      throw Error(p$5(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$5(268, a2));
  }
  a2 = Zb(b2);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Sk(a2);
};
reactDom_production_min.hydrate = function(a2, b2, c2) {
  if (!pl(b2))
    throw Error(p$5(200));
  return sl(null, a2, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b2, c2) {
  if (!ol(a2))
    throw Error(p$5(405));
  var d2 = null != c2 && c2.hydratedSources || null, e3 = false, f2 = "", g2 = ll;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e3 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
  b2 = fl(b2, null, a2, 1, null != c2 ? c2 : null, e3, false, f2, g2);
  a2[uf] = b2.current;
  sf(a2);
  if (d2)
    for (a2 = 0; a2 < d2.length; a2++)
      c2 = d2[a2], e3 = c2._getVersion, e3 = e3(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e3] : b2.mutableSourceEagerHydrationData.push(
        c2,
        e3
      );
  return new nl(b2);
};
reactDom_production_min.render = function(a2, b2, c2) {
  if (!pl(b2))
    throw Error(p$5(200));
  return sl(null, a2, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!pl(a2))
    throw Error(p$5(40));
  return a2._reactRootContainer ? (Sk(function() {
    sl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d2) {
  if (!pl(c2))
    throw Error(p$5(200));
  if (null == a2 || void 0 === a2._reactInternals)
    throw Error(p$5(38));
  return sl(a2, b2, c2, false, d2);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m$1 = reactDomExports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
const index = "";
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if (({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
const createStore$1 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var withSelector = { exports: {} };
var withSelector_production_min = {};
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e$4 = reactExports;
function h$5(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var k = "function" === typeof Object.is ? Object.is : h$5, l$3 = e$4.useState, m = e$4.useEffect, n$2 = e$4.useLayoutEffect, p$4 = e$4.useDebugValue;
function q$2(a2, b2) {
  var d2 = b2(), f2 = l$3({ inst: { value: d2, getSnapshot: b2 } }), c2 = f2[0].inst, g2 = f2[1];
  n$2(function() {
    c2.value = d2;
    c2.getSnapshot = b2;
    r$4(c2) && g2({ inst: c2 });
  }, [a2, d2, b2]);
  m(function() {
    r$4(c2) && g2({ inst: c2 });
    return a2(function() {
      r$4(c2) && g2({ inst: c2 });
    });
  }, [a2]);
  p$4(d2);
  return d2;
}
function r$4(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var d2 = b2();
    return !k(a2, d2);
  } catch (f2) {
    return true;
  }
}
function t$6(a2, b2) {
  return b2();
}
var u$5 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$6 : q$2;
useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e$4.useSyncExternalStore ? e$4.useSyncExternalStore : u$5;
{
  shim.exports = useSyncExternalStoreShim_production_min;
}
var shimExports = shim.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h$4 = reactExports, n$1 = shimExports;
function p$3(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var q$1 = "function" === typeof Object.is ? Object.is : p$3, r$3 = n$1.useSyncExternalStore, t$5 = h$4.useRef, u$4 = h$4.useEffect, v$2 = h$4.useMemo, w$2 = h$4.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a2, b2, e3, l2, g2) {
  var c2 = t$5(null);
  if (null === c2.current) {
    var f2 = { hasValue: false, value: null };
    c2.current = f2;
  } else
    f2 = c2.current;
  c2 = v$2(function() {
    function a3(a4) {
      if (!c3) {
        c3 = true;
        d3 = a4;
        a4 = l2(a4);
        if (void 0 !== g2 && f2.hasValue) {
          var b3 = f2.value;
          if (g2(b3, a4))
            return k2 = b3;
        }
        return k2 = a4;
      }
      b3 = k2;
      if (q$1(d3, a4))
        return b3;
      var e4 = l2(a4);
      if (void 0 !== g2 && g2(b3, e4))
        return b3;
      d3 = a4;
      return k2 = e4;
    }
    var c3 = false, d3, k2, m2 = void 0 === e3 ? null : e3;
    return [function() {
      return a3(b2());
    }, null === m2 ? void 0 : function() {
      return a3(m2());
    }];
  }, [b2, e3, l2, g2]);
  var d2 = r$3(a2, c2[0], c2[1]);
  u$4(function() {
    f2.hasValue = true;
    f2.value = d2;
  }, [d2]);
  w$2(d2);
  return d2;
};
{
  withSelector.exports = withSelector_production_min;
}
var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
function useStore(api, selector = api.getState, equalityFn) {
  if (({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  reactExports.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if (({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore$1(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
function e$3(e3, t4, s3, i3) {
  return new (s3 || (s3 = Promise))(function(r3, n2) {
    function o3(e4) {
      try {
        c2(i3.next(e4));
      } catch (e5) {
        n2(e5);
      }
    }
    function a2(e4) {
      try {
        c2(i3.throw(e4));
      } catch (e5) {
        n2(e5);
      }
    }
    function c2(e4) {
      var t5;
      e4.done ? r3(e4.value) : (t5 = e4.value, t5 instanceof s3 ? t5 : new s3(function(e5) {
        e5(t5);
      })).then(o3, a2);
    }
    c2((i3 = i3.apply(e3, t4 || [])).next());
  });
}
"function" == typeof SuppressedError && SuppressedError;
let t$4 = class t {
  constructor() {
    this.listeners = {};
  }
  on(e3, t4) {
    return this.listeners[e3] || (this.listeners[e3] = /* @__PURE__ */ new Set()), this.listeners[e3].add(t4), () => this.un(e3, t4);
  }
  once(e3, t4) {
    const s3 = this.on(e3, t4), i3 = this.on(e3, () => {
      s3(), i3();
    });
    return s3;
  }
  un(e3, t4) {
    this.listeners[e3] && (t4 ? this.listeners[e3].delete(t4) : delete this.listeners[e3]);
  }
  unAll() {
    this.listeners = {};
  }
  emit(e3, ...t4) {
    this.listeners[e3] && this.listeners[e3].forEach((e4) => e4(...t4));
  }
};
let s$7 = class s extends t$4 {
  constructor(e3) {
    super(), this.subscriptions = [], this.options = e3;
  }
  onInit() {
  }
  init(e3) {
    this.wavesurfer = e3, this.onInit();
  }
  destroy() {
    this.emit("destroy"), this.subscriptions.forEach((e3) => e3());
  }
};
const i$5 = ["audio/webm", "audio/wav", "audio/mpeg", "audio/mp4", "audio/mp3"];
let r$2 = class r extends s$7 {
  constructor() {
    super(...arguments), this.stream = null, this.mediaRecorder = null;
  }
  static create(e3) {
    return new r(e3 || {});
  }
  renderMicStream(e3) {
    const t4 = new AudioContext(), s3 = t4.createMediaStreamSource(e3), i3 = t4.createAnalyser();
    s3.connect(i3);
    const r3 = i3.frequencyBinCount, n2 = new Float32Array(r3), o3 = r3 / t4.sampleRate;
    let a2;
    const c2 = () => {
      i3.getFloatTimeDomainData(n2), this.wavesurfer && (this.wavesurfer.options.cursorWidth = 0, this.wavesurfer.options.interact = false, this.wavesurfer.load("", [n2], o3)), a2 = requestAnimationFrame(c2);
    };
    return c2(), () => {
      cancelAnimationFrame(a2), null == s3 || s3.disconnect(), null == t4 || t4.close();
    };
  }
  startMic() {
    return e$3(this, void 0, void 0, function* () {
      let e3;
      try {
        e3 = yield navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e4) {
        throw new Error("Error accessing the microphone: " + e4.message);
      }
      const t4 = this.renderMicStream(e3);
      return this.subscriptions.push(this.once("destroy", t4)), this.stream = e3, e3;
    });
  }
  stopMic() {
    this.stream && (this.stream.getTracks().forEach((e3) => e3.stop()), this.stream = null);
  }
  startRecording() {
    return e$3(this, void 0, void 0, function* () {
      const e3 = this.stream || (yield this.startMic()), t4 = this.mediaRecorder || new MediaRecorder(e3, { mimeType: this.options.mimeType || i$5.find((e4) => MediaRecorder.isTypeSupported(e4)), audioBitsPerSecond: this.options.audioBitsPerSecond });
      this.mediaRecorder = t4, this.stopRecording();
      const s3 = [];
      t4.ondataavailable = (e4) => {
        e4.data.size > 0 && s3.push(e4.data);
      }, t4.onstop = () => {
        var e4;
        const i3 = new Blob(s3, { type: t4.mimeType });
        this.emit("record-end", i3), false !== this.options.renderRecordedAudio && (null === (e4 = this.wavesurfer) || void 0 === e4 || e4.load(URL.createObjectURL(i3)));
      }, t4.start(), this.emit("record-start");
    });
  }
  isRecording() {
    var e3;
    return "recording" === (null === (e3 = this.mediaRecorder) || void 0 === e3 ? void 0 : e3.state);
  }
  stopRecording() {
    var e3;
    this.isRecording() && (null === (e3 = this.mediaRecorder) || void 0 === e3 || e3.stop());
  }
  destroy() {
    super.destroy(), this.stopRecording(), this.stopMic();
  }
};
class MyRecorder {
  constructor(recordingMimeType) {
    __publicField(this, "r");
    __publicField(this, "recodingStatus");
    __publicField(this, "onStartF");
    __publicField(this, "onDoneF");
    __publicField(this, "onCancelF");
    this.r = r$2.create({
      mimeType: recordingMimeType == null ? void 0 : recordingMimeType.mimeType,
      audioBitsPerSecond: 1e5
    });
    this.recodingStatus = "init-idle";
    this.onStartF = () => {
    };
    this.onDoneF = (_blob) => {
    };
    this.onCancelF = (_blob) => {
    };
    this.r.on("record-start", () => {
      var _a;
      switch (this.recodingStatus) {
        case "recording":
          (_a = this.onStartF) == null ? void 0 : _a.call(this);
          break;
        case "init-idle":
        case "done":
        case "canceled":
          throw new Error("recorder has not started");
      }
    });
    this.r.on("record-end", (blob) => {
      var _a, _b;
      switch (this.recodingStatus) {
        case "recording":
          throw new Error("recorder has not stopped");
        case "init-idle":
          throw new Error("recorder is at illegal state");
        case "done":
          (_a = this.onDoneF) == null ? void 0 : _a.call(this, blob);
          break;
        case "canceled":
          (_b = this.onCancelF) == null ? void 0 : _b.call(this, blob);
          break;
      }
    });
  }
  onStart(f2) {
    this.onStartF = f2;
  }
  onDone(f2) {
    this.onDoneF = f2;
  }
  onCancel(f2) {
    this.onCancelF = f2;
  }
  start() {
    this.recodingStatus = "recording";
    return this.r.startRecording();
  }
  done() {
    this.recodingStatus = "done";
    this.r.stopRecording();
  }
  cancel() {
    this.recodingStatus = "canceled";
    this.r.stopRecording();
  }
  toggleRecord(c2) {
    if (this.r.isRecording()) {
      this.done();
    } else {
      this.start().catch(c2);
    }
  }
}
const base64ToBlob = (base64String, mimeType) => {
  console.debug("decoding base64(truncated to 100 chars)", base64String.slice(0, 100));
  const byteCharacters = atob(base64String);
  const byteNumbers = [];
  for (let i3 = 0; i3 < byteCharacters.length; i3++) {
    byteNumbers.push(byteCharacters.charCodeAt(i3));
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
const timeElapsedMMSS = (duration) => {
  let seconds = Math.floor(duration / 1e3);
  const minutes = Math.floor(seconds % 3600 / 60);
  seconds = seconds % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
};
const padZero = (num) => {
  return num.toString().padStart(2, "0");
};
const historyMessages = (qaSlice, maxHistory) => {
  if (maxHistory <= 0) {
    return [];
  }
  let messages = [];
  qaSlice.map((qa2) => qa2.que.text).filter((t4) => t4.status == "received").forEach((t4) => messages.push({ role: "user", content: t4.text }));
  qaSlice.map((qa2) => qa2.ans.text).filter((t4) => t4.status == "received").forEach((t4) => messages.push({ role: "assistant", content: t4.text }));
  messages = messages.slice(-maxHistory);
  return messages;
};
function currentProtocolHostPortPath() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  const path = window.location.pathname;
  return `${protocol}//${hostname}:${port}/${path}`;
}
function joinUrl(...parts) {
  return parts.map((part) => part.replace(/^\/+|\/+$/g, "")).join("/");
}
function randomHash(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "";
  for (let i3 = 0; i3 < length; i3++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters.charAt(randomIndex);
  }
  return hash;
}
const popularMimeTypes = [
  { mimeType: "audio/webm; codecs=vp9", fileName: "audio.webm" },
  { mimeType: "audio/webm; codecs=opus", fileName: "audio.webm" },
  { mimeType: "audio/webm", fileName: "audio.webm" },
  { mimeType: "audio/mp4", fileName: "audio.mp4" }
];
function chooseAudioMimeType() {
  const find = popularMimeTypes.find((m2) => MediaRecorder.isTypeSupported(m2.mimeType));
  console.debug("found mimeType: ", find);
  return find;
}
function timeDiffSecond(isoTime) {
  const isoDate = new Date(isoTime);
  const currentDate = /* @__PURE__ */ new Date();
  const difference = currentDate.getTime() - isoDate.getTime();
  return Math.floor(difference / 1e3);
}
function joinClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const useRecorderStore = create(
  (set2) => ({
    isRecording: false,
    duration: 0,
    recordingMimeType: chooseAudioMimeType(),
    recorder: new MyRecorder(chooseAudioMimeType()),
    setIsRecording: (isRecording) => set2((state) => ({
      ...state,
      isRecording
    })),
    setDuration: (duration) => set2((state) => ({
      ...state,
      duration
    })),
    incrDuration: (incr) => set2((state) => ({
      ...state,
      duration: state.duration + incr
    }))
  })
);
const useTextAreaStore = create(() => ({ inputAreaIsLarge: false }));
const useInputStore = create(() => ({ inputText: "" }));
const useSendingTextStore = create(() => ({ sendingText: "" }));
const emptyBlob = new Blob([], { type: "audio/mp3" });
const useSendingAudioStore = create(() => ({ sendingAudio: emptyBlob }));
const Recorder = () => {
  const isRecording = useRecorderStore((state) => state.isRecording);
  const recorder = useRecorderStore((state) => state.recorder);
  const setIsRecording = useRecorderStore((state) => state.setIsRecording);
  const recordDuration = useRecorderStore((state) => state.duration);
  reactExports.useEffect(() => {
    recorder.onDone((blob) => {
      setIsRecording(false);
      useSendingAudioStore.setState({ sendingAudio: blob });
    });
    recorder.onStart(() => {
      setIsRecording(true);
    });
    recorder.onCancel(() => {
      setIsRecording(false);
    });
  }, []);
  const handleClick = () => {
    recorder.toggleRecord((e3) => {
      console.error("failed to start recorder", e3);
    });
  };
  const handleTouchStart = () => {
    console.log("handleTouchStart");
    recorder.start().catch(
      (e3) => {
        console.error("failed to start recorder", e3);
      }
    );
  };
  const handleTouchEnd = () => {
    console.log("handleTouchEnd");
    recorder.done();
  };
  const handleTouchCancel = () => {
    console.log("handleTouchCancel");
    recorder.cancel();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: handleClick,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
      className: "rounded-lg p-1 gap-2 w-full h-10 bg-equal-100 select-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: joinClassNames("flex gap-3 justify-center items-center", isRecording ? "hidden" : ""), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: "1.5",
              stroke: "currentColor",
              className: "w-6 h-6 text-neutral-900",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose text-equal-500", children: [
            "Hold ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "border rounded-md bg-white px-1.5 py-0.5", children: "Spacebar" }),
            " to speak"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: joinClassNames("flex justify-evenly items-center", isRecording ? "" : "hidden"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-500 text-sm bg-white rounded-full px-2", children: [
            "Press any key to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline text-red-300", children: "cancel" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "w-6 h-6 text-red-400",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose text-2xl  text-red-400 bg-white rounded-lg px-2", children: timeElapsedMMSS(recordDuration) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-500 text-sm bg-white rounded-full px-2", children: [
            "Release to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline text-blue-500", children: "send" })
          ] })
        ] })
      ]
    }
  );
};
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api)
    return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
const extractConnectionInformation = (store, extensionConnector, options2) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options2)
    };
  }
  const existingConnection = trackedConnections.get(options2.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options2),
    stores: {}
  };
  trackedConnections.set(options2.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
const devtoolsImpl = (fn, devtoolsOptions = {}) => (set2, get2, api) => {
  const { enabled, anonymousActionType, store, ...options2 } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : ({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e3) {
  }
  if (!extensionConnector) {
    if (({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && enabled) {
      console.warn(
        "[zustand devtools middleware] Please install/enable Redux devtools extension"
      );
    }
    return fn(set2, get2, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options2);
  let isRecording = true;
  api.setState = (state, replace, nameOrAction) => {
    const r3 = set2(state, replace);
    if (!isRecording)
      return r3;
    const action = nameOrAction === void 0 ? { type: anonymousActionType || "anonymous" } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get2());
      return r3;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options2.name),
        [store]: api.getState()
      }
    );
    return r3;
  };
  const setStateFromDevtools = (...a2) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set2(...a2);
    isRecording = originalIsRecording;
  };
  const initialState = fn(api.setState, get2, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...a2) => {
      if (({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && a2[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...a2);
    };
  }
  connection.subscribe((message) => {
    var _a;
    switch (message.type) {
      case "ACTION":
        if (typeof message.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message.payload,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (!api.dispatchFromDevtools)
              return;
            if (typeof api.dispatch !== "function")
              return;
            api.dispatch(action);
          }
        );
      case "DISPATCH":
        switch (message.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options2.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options2.name));
          case "ROLLBACK":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options2.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState)
              return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, f2) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e3) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e3
    );
  }
  if (parsed !== void 0)
    f2(parsed);
};
function createJSONStorage(getStorage, options2) {
  let storage;
  try {
    storage = getStorage();
  } catch (e3) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options2 == null ? void 0 : options2.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, options2 == null ? void 0 : options2.replacer)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e3) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e3);
      }
    };
  }
};
const oldImpl = (config, baseOptions) => (set2, get2, api) => {
  let options2 = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options2.getStorage();
  } catch (e3) {
  }
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options2.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get2,
      api
    );
  }
  const thenableSerialize = toThenable(options2.serialize);
  const setItem = () => {
    const state = options2.partialize({ ...get2() });
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options2.version }).then(
      (serializedValue) => storage.setItem(options2.name, serializedValue)
    ).catch((e3) => {
      errorInSync = e3;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set2(...args);
      void setItem();
    },
    get2,
    api
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage)
      return;
    hasHydrated = false;
    hydrationListeners.forEach((cb2) => cb2(get2()));
    const postRehydrationCallback = ((_a = options2.onRehydrateStorage) == null ? void 0 : _a.call(options2, get2())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options2.name).then((storageValue) => {
      if (storageValue) {
        return options2.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options2.version) {
          if (options2.migrate) {
            return options2.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options2.merge(
        migratedState,
        (_a2 = get2()) != null ? _a2 : configResult
      );
      set2(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb2) => cb2(stateFromStorage));
    }).catch((e3) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e3);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options2 = {
        ...options2,
        ...newOptions
      };
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options2.name);
    },
    getOptions: () => options2,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb2) => {
      hydrationListeners.add(cb2);
      return () => {
        hydrationListeners.delete(cb2);
      };
    },
    onFinishHydration: (cb2) => {
      finishHydrationListeners.add(cb2);
      return () => {
        finishHydrationListeners.delete(cb2);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};
const newImpl = (config, baseOptions) => (set2, get2, api) => {
  let options2 = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options2.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options2.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get2,
      api
    );
  }
  const setItem = () => {
    const state = options2.partialize({ ...get2() });
    return storage.setItem(options2.name, {
      state,
      version: options2.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set2(...args);
      void setItem();
    },
    get2,
    api
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage)
      return;
    hasHydrated = false;
    hydrationListeners.forEach((cb2) => {
      var _a2;
      return cb2((_a2 = get2()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options2.onRehydrateStorage) == null ? void 0 : _b.call(options2, (_a = get2()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options2.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options2.version) {
          if (options2.migrate) {
            return options2.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options2.merge(
        migratedState,
        (_a2 = get2()) != null ? _a2 : configResult
      );
      set2(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get2();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb2) => cb2(stateFromStorage));
    }).catch((e3) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e3);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options2 = {
        ...options2,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options2.name);
    },
    getOptions: () => options2,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb2) => {
      hydrationListeners.add(cb2);
      return () => {
        hydrationListeners.delete(cb2);
      };
    },
    onFinishHydration: (cb2) => {
      finishHydrationListeners.add(cb2);
      return () => {
        finishHydrationListeners.delete(cb2);
      };
    }
  };
  if (!options2.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persistImpl = (config, baseOptions) => {
  if ("getStorage" in baseOptions || "serialize" in baseOptions || "deserialize" in baseOptions) {
    if (({ "BASE_URL": "./", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
      );
    }
    return oldImpl(config, baseOptions);
  }
  return newImpl(config, baseOptions);
};
const persist = persistImpl;
function promisifyRequest$1(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName2, storeName2) {
  const request = indexedDB.open(dbName2);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName2);
  const dbp = promisifyRequest$1(request);
  return (txMode, callback) => dbp.then((db2) => callback(db2.transaction(storeName2, txMode).objectStore(storeName2)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest$1(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest$1(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest$1(store.transaction);
  });
}
const zustandStorage = {
  getItem: async (name) => {
    console.log("[Persist] retrieving", name);
    return await get(name) || null;
  },
  setItem: async (name, value) => {
    console.log("[Persist]", "saving value(truncated to 100)", value.slice(0, 100), "to", name);
    await set(name, value);
  },
  removeItem: async (name) => {
    console.log("[Persist] deleting ", name);
    await del(name);
  }
};
const useConvStore = create()(
  devtools(
    persist((set2, get2) => ({
      qaSlice: [],
      pushQueAns: (queAns) => set2((state) => ({ qaSlice: [...state.qaSlice, queAns] })),
      removeQueAns: (queAns) => set2((state) => ({
        qaSlice: state.qaSlice.filter((qa2) => qa2.id !== queAns.id)
      })),
      updateQueAns: (queAns) => set2((state) => ({
        qaSlice: state.qaSlice.map((qa2) => qa2.id === queAns.id ? queAns : qa2)
      })),
      updateQueText: (id2, myText) => set2((state) => ({
        qaSlice: state.qaSlice.map((qa2) => qa2.id === id2 ? {
          ...qa2,
          que: {
            ...qa2.que,
            text: myText
          }
        } : qa2)
      })),
      updateQueAudio: (id2, audio) => set2((state) => ({
        qaSlice: state.qaSlice.map((qa2) => qa2.id === id2 ? {
          ...qa2,
          que: {
            ...qa2.que,
            audio
          }
        } : qa2)
      })),
      updateAnsText: (id2, myText) => set2((state) => ({
        qaSlice: state.qaSlice.map((qa2) => qa2.id === id2 ? {
          ...qa2,
          ans: {
            ...qa2.ans,
            text: myText
          }
        } : qa2)
      })),
      updateAnsAudio: (id2, audio) => set2((state) => ({
        qaSlice: state.qaSlice.map((qa2) => qa2.id === id2 ? {
          ...qa2,
          ans: {
            ...qa2.ans,
            audio
          }
        } : qa2)
      })),
      getQueText: (id2) => get2().qaSlice.find((qa2) => qa2.id === id2).que.text,
      getQueAudio: (id2) => get2().qaSlice.find((qa2) => qa2.id === id2).que.audio,
      getAnsText: (id2) => get2().qaSlice.find((qa2) => qa2.id === id2).ans.text,
      getAnsAudio: (id2) => get2().qaSlice.find((qa2) => qa2.id === id2).ans.audio
    }), {
      name: "conversation",
      storage: createJSONStorage(() => zustandStorage)
      // (optional) by default the 'localStorage' is used
    })
  )
);
var __awaiter$2 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function decode(audioData, sampleRate) {
  return __awaiter$2(this, void 0, void 0, function* () {
    const audioCtx = new AudioContext({ sampleRate });
    const decode2 = audioCtx.decodeAudioData(audioData);
    return decode2.finally(() => audioCtx.close());
  });
}
function normalize(channelData) {
  const firstChannel = channelData[0];
  if (firstChannel.some((n2) => n2 > 1 || n2 < -1)) {
    const length = firstChannel.length;
    let max = 0;
    for (let i3 = 0; i3 < length; i3++) {
      const absN = Math.abs(firstChannel[i3]);
      if (absN > max)
        max = absN;
    }
    for (const channel of channelData) {
      for (let i3 = 0; i3 < length; i3++) {
        channel[i3] /= max;
      }
    }
  }
  return channelData;
}
function createBuffer(channelData, duration) {
  if (typeof channelData[0] === "number")
    channelData = [channelData];
  normalize(channelData);
  return {
    duration,
    length: channelData[0].length,
    sampleRate: channelData[0].length / duration,
    numberOfChannels: channelData.length,
    getChannelData: (i3) => channelData === null || channelData === void 0 ? void 0 : channelData[i3],
    copyFromChannel: AudioBuffer.prototype.copyFromChannel,
    copyToChannel: AudioBuffer.prototype.copyToChannel
  };
}
const Decoder = {
  decode,
  createBuffer
};
var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function fetchBlob(url, progressCallback, requestInit) {
  var _a, _b;
  return __awaiter$1(this, void 0, void 0, function* () {
    const response = yield fetch(url, requestInit);
    {
      const reader = (_a = response.clone().body) === null || _a === void 0 ? void 0 : _a.getReader();
      const contentLength = Number((_b = response.headers) === null || _b === void 0 ? void 0 : _b.get("Content-Length"));
      let receivedLength = 0;
      const processChunk = (done, value) => __awaiter$1(this, void 0, void 0, function* () {
        if (done)
          return;
        receivedLength += (value === null || value === void 0 ? void 0 : value.length) || 0;
        const percentage = Math.round(receivedLength / contentLength * 100);
        progressCallback(percentage);
        return reader === null || reader === void 0 ? void 0 : reader.read().then(({ done: done2, value: value2 }) => processChunk(done2, value2));
      });
      reader === null || reader === void 0 ? void 0 : reader.read().then(({ done, value }) => processChunk(done, value));
    }
    return response.blob();
  });
}
const Fetcher = {
  fetchBlob
};
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  /** Subscribe to an event. Returns an unsubscribe function. */
  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = /* @__PURE__ */ new Set();
    }
    this.listeners[eventName].add(listener);
    return () => this.un(eventName, listener);
  }
  /** Subscribe to an event only once */
  once(eventName, listener) {
    const unsubscribe = this.on(eventName, listener);
    const unsubscribeOnce = this.on(eventName, () => {
      unsubscribe();
      unsubscribeOnce();
    });
    return unsubscribe;
  }
  /** Unsubscribe from an event */
  un(eventName, listener) {
    if (this.listeners[eventName]) {
      if (listener) {
        this.listeners[eventName].delete(listener);
      } else {
        delete this.listeners[eventName];
      }
    }
  }
  /** Clear all events */
  unAll() {
    this.listeners = {};
  }
  /** Emit an event */
  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(...args));
    }
  }
}
class Player extends EventEmitter {
  constructor(options2) {
    super();
    if (options2.media) {
      this.media = options2.media;
    } else {
      this.media = document.createElement("audio");
    }
    if (options2.mediaControls) {
      this.media.controls = true;
    }
    if (options2.autoplay) {
      this.media.autoplay = true;
    }
    if (options2.playbackRate != null) {
      this.onceMediaEvent("canplay", () => {
        if (options2.playbackRate != null) {
          this.media.playbackRate = options2.playbackRate;
        }
      });
    }
  }
  onMediaEvent(event, callback, options2) {
    this.media.addEventListener(event, callback, options2);
    return () => this.media.removeEventListener(event, callback);
  }
  onceMediaEvent(event, callback) {
    return this.onMediaEvent(event, callback, { once: true });
  }
  getSrc() {
    return this.media.currentSrc || this.media.src || "";
  }
  revokeSrc() {
    const src = this.getSrc();
    if (src.startsWith("blob:")) {
      URL.revokeObjectURL(src);
    }
  }
  setSrc(url, blob) {
    const src = this.getSrc();
    if (src === url)
      return;
    this.revokeSrc();
    const newSrc = blob instanceof Blob ? URL.createObjectURL(blob) : url;
    this.media.src = newSrc;
    this.media.load();
  }
  destroy() {
    this.media.pause();
    this.revokeSrc();
    this.media.src = "";
    this.media.load();
  }
  /** Start playing the audio */
  play() {
    return this.media.play();
  }
  /** Pause the audio */
  pause() {
    this.media.pause();
  }
  /** Check if the audio is playing */
  isPlaying() {
    return this.media.currentTime > 0 && !this.media.paused && !this.media.ended;
  }
  /** Jumpt to a specific time in the audio (in seconds) */
  setTime(time) {
    this.media.currentTime = time;
  }
  /** Get the duration of the audio in seconds */
  getDuration() {
    return this.media.duration;
  }
  /** Get the current audio position in seconds */
  getCurrentTime() {
    return this.media.currentTime;
  }
  /** Get the audio volume */
  getVolume() {
    return this.media.volume;
  }
  /** Set the audio volume */
  setVolume(volume) {
    this.media.volume = volume;
  }
  /** Get the audio muted state */
  getMuted() {
    return this.media.muted;
  }
  /** Mute or unmute the audio */
  setMuted(muted) {
    this.media.muted = muted;
  }
  /** Get the playback speed */
  getPlaybackRate() {
    return this.media.playbackRate;
  }
  /** Set the playback speed, pass an optional false to NOT preserve the pitch */
  setPlaybackRate(rate, preservePitch) {
    if (preservePitch != null) {
      this.media.preservesPitch = preservePitch;
    }
    this.media.playbackRate = rate;
  }
  /** Get the HTML media element */
  getMediaElement() {
    return this.media;
  }
  /** Set a sink id to change the audio output device */
  setSinkId(sinkId) {
    const media = this.media;
    return media.setSinkId(sinkId);
  }
}
function makeDraggable(element, onDrag, onStart, onEnd, threshold = 5) {
  let unsub = () => {
    return;
  };
  if (!element)
    return unsub;
  const down = (e3) => {
    if (e3.button === 2)
      return;
    e3.preventDefault();
    e3.stopPropagation();
    let startX = e3.clientX;
    let startY = e3.clientY;
    let isDragging = false;
    const move = (e4) => {
      e4.preventDefault();
      e4.stopPropagation();
      const x2 = e4.clientX;
      const y2 = e4.clientY;
      if (isDragging || Math.abs(x2 - startX) >= threshold || Math.abs(y2 - startY) >= threshold) {
        const { left, top } = element.getBoundingClientRect();
        if (!isDragging) {
          isDragging = true;
          onStart === null || onStart === void 0 ? void 0 : onStart(startX - left, startY - top);
        }
        onDrag(x2 - startX, y2 - startY, x2 - left, y2 - top);
        startX = x2;
        startY = y2;
      }
    };
    const click = (e4) => {
      if (isDragging) {
        e4.preventDefault();
        e4.stopPropagation();
      }
    };
    const up = () => {
      if (isDragging) {
        onEnd === null || onEnd === void 0 ? void 0 : onEnd();
      }
      unsub();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", up);
    document.addEventListener("click", click, true);
    unsub = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", up);
      setTimeout(() => {
        document.removeEventListener("click", click, true);
      }, 10);
    };
  };
  element.addEventListener("pointerdown", down);
  return () => {
    unsub();
    element.removeEventListener("pointerdown", down);
  };
}
class Renderer extends EventEmitter {
  constructor(options2, audioElement) {
    super();
    this.timeouts = [];
    this.isScrolling = false;
    this.audioData = null;
    this.resizeObserver = null;
    this.isDragging = false;
    this.options = options2;
    let parent;
    if (typeof options2.container === "string") {
      parent = document.querySelector(options2.container);
    } else if (options2.container instanceof HTMLElement) {
      parent = options2.container;
    }
    if (!parent) {
      throw new Error("Container not found");
    }
    this.parent = parent;
    const [div, shadow] = this.initHtml();
    parent.appendChild(div);
    this.container = div;
    this.scrollContainer = shadow.querySelector(".scroll");
    this.wrapper = shadow.querySelector(".wrapper");
    this.canvasWrapper = shadow.querySelector(".canvases");
    this.progressWrapper = shadow.querySelector(".progress");
    this.cursor = shadow.querySelector(".cursor");
    if (audioElement) {
      shadow.appendChild(audioElement);
    }
    this.initEvents();
  }
  initEvents() {
    this.wrapper.addEventListener("click", (e3) => {
      const rect = this.wrapper.getBoundingClientRect();
      const x2 = e3.clientX - rect.left;
      const relativeX = x2 / rect.width;
      this.emit("click", relativeX);
    });
    this.initDrag();
    this.scrollContainer.addEventListener("scroll", () => {
      const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
      const startX = scrollLeft / scrollWidth;
      const endX = (scrollLeft + clientWidth) / scrollWidth;
      this.emit("scroll", startX, endX);
    });
    const delay = this.createDelay(100);
    this.resizeObserver = new ResizeObserver(() => {
      delay(() => this.reRender());
    });
    this.resizeObserver.observe(this.scrollContainer);
  }
  initDrag() {
    makeDraggable(
      this.wrapper,
      // On drag
      (_2, __, x2) => {
        this.emit("drag", Math.max(0, Math.min(1, x2 / this.wrapper.clientWidth)));
      },
      // On start drag
      () => this.isDragging = true,
      // On end drag
      () => this.isDragging = false
    );
  }
  getHeight() {
    const defaultHeight = 128;
    if (this.options.height == null)
      return defaultHeight;
    if (!isNaN(Number(this.options.height)))
      return Number(this.options.height);
    if (this.options.height === "auto")
      return this.parent.clientHeight || defaultHeight;
    return defaultHeight;
  }
  initHtml() {
    const div = document.createElement("div");
    const shadow = div.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          user-select: none;
        }
        :host audio {
          display: block;
          width: 100%;
        }
        :host .scroll {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          position: relative;
          touch-action: none;
        }
        :host .noScrollbar {
          scrollbar-color: transparent;
          scrollbar-width: none;
        }
        :host .noScrollbar::-webkit-scrollbar {
          display: none;
          -webkit-appearance: none;
        }
        :host .wrapper {
          position: relative;
          overflow: visible;
          z-index: 2;
        }
        :host .canvases {
          min-height: ${this.getHeight()}px;
        }
        :host .canvases > div {
          position: relative;
        }
        :host canvas {
          display: block;
          position: absolute;
          top: 0;
          image-rendering: pixelated;
        }
        :host .progress {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          overflow: hidden;
        }
        :host .progress > div {
          position: relative;
        }
        :host .cursor {
          pointer-events: none;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 2px;
        }
      </style>

      <div class="scroll" part="scroll">
        <div class="wrapper">
          <div class="canvases"></div>
          <div class="progress" part="progress"></div>
          <div class="cursor" part="cursor"></div>
        </div>
      </div>
    `;
    return [div, shadow];
  }
  setOptions(options2) {
    this.options = options2;
    this.reRender();
  }
  getWrapper() {
    return this.wrapper;
  }
  getScroll() {
    return this.scrollContainer.scrollLeft;
  }
  destroy() {
    var _a;
    this.container.remove();
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  createDelay(delayMs = 10) {
    const context = {};
    this.timeouts.push(context);
    return (callback) => {
      context.timeout && clearTimeout(context.timeout);
      context.timeout = setTimeout(callback, delayMs);
    };
  }
  // Convert array of color values to linear gradient
  convertColorValues(color) {
    if (!Array.isArray(color))
      return color || "";
    if (color.length < 2)
      return color[0] || "";
    const canvasElement = document.createElement("canvas");
    const ctx = canvasElement.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasElement.height);
    const colorStopPercentage = 1 / (color.length - 1);
    color.forEach((color2, index2) => {
      const offset = index2 * colorStopPercentage;
      gradient.addColorStop(offset, color2);
    });
    return gradient;
  }
  renderBarWaveform(channelData, options2, ctx, vScale) {
    const topChannel = channelData[0];
    const bottomChannel = channelData[1] || channelData[0];
    const length = topChannel.length;
    const { width, height } = ctx.canvas;
    const halfHeight = height / 2;
    const pixelRatio = window.devicePixelRatio || 1;
    const barWidth = options2.barWidth ? options2.barWidth * pixelRatio : 1;
    const barGap = options2.barGap ? options2.barGap * pixelRatio : options2.barWidth ? barWidth / 2 : 0;
    const barRadius = options2.barRadius || 0;
    const barIndexScale = width / (barWidth + barGap) / length;
    const rectFn = barRadius && "roundRect" in ctx ? "roundRect" : "rect";
    ctx.beginPath();
    let prevX = 0;
    let maxTop = 0;
    let maxBottom = 0;
    for (let i3 = 0; i3 <= length; i3++) {
      const x2 = Math.round(i3 * barIndexScale);
      if (x2 > prevX) {
        const topBarHeight = Math.round(maxTop * halfHeight * vScale);
        const bottomBarHeight = Math.round(maxBottom * halfHeight * vScale);
        const barHeight = topBarHeight + bottomBarHeight || 1;
        let y2 = halfHeight - topBarHeight;
        if (options2.barAlign === "top") {
          y2 = 0;
        } else if (options2.barAlign === "bottom") {
          y2 = height - barHeight;
        }
        ctx[rectFn](prevX * (barWidth + barGap), y2, barWidth, barHeight, barRadius);
        prevX = x2;
        maxTop = 0;
        maxBottom = 0;
      }
      const magnitudeTop = Math.abs(topChannel[i3] || 0);
      const magnitudeBottom = Math.abs(bottomChannel[i3] || 0);
      if (magnitudeTop > maxTop)
        maxTop = magnitudeTop;
      if (magnitudeBottom > maxBottom)
        maxBottom = magnitudeBottom;
    }
    ctx.fill();
    ctx.closePath();
  }
  renderLineWaveform(channelData, _options, ctx, vScale) {
    const drawChannel = (index2) => {
      const channel = channelData[index2] || channelData[0];
      const length = channel.length;
      const { height } = ctx.canvas;
      const halfHeight = height / 2;
      const hScale = ctx.canvas.width / length;
      ctx.moveTo(0, halfHeight);
      let prevX = 0;
      let max = 0;
      for (let i3 = 0; i3 <= length; i3++) {
        const x2 = Math.round(i3 * hScale);
        if (x2 > prevX) {
          const h2 = Math.round(max * halfHeight * vScale) || 1;
          const y2 = halfHeight + h2 * (index2 === 0 ? -1 : 1);
          ctx.lineTo(prevX, y2);
          prevX = x2;
          max = 0;
        }
        const value = Math.abs(channel[i3] || 0);
        if (value > max)
          max = value;
      }
      ctx.lineTo(prevX, halfHeight);
    };
    ctx.beginPath();
    drawChannel(0);
    drawChannel(1);
    ctx.fill();
    ctx.closePath();
  }
  renderWaveform(channelData, options2, ctx) {
    ctx.fillStyle = this.convertColorValues(options2.waveColor);
    if (options2.renderFunction) {
      options2.renderFunction(channelData, ctx);
      return;
    }
    let vScale = options2.barHeight || 1;
    if (options2.normalize) {
      const max = Array.from(channelData[0]).reduce((max2, value) => Math.max(max2, Math.abs(value)), 0);
      vScale = max ? 1 / max : 1;
    }
    if (options2.barWidth || options2.barGap || options2.barAlign) {
      this.renderBarWaveform(channelData, options2, ctx, vScale);
      return;
    }
    this.renderLineWaveform(channelData, options2, ctx, vScale);
  }
  renderSingleCanvas(channelData, options2, width, height, start, end, canvasContainer, progressContainer) {
    const pixelRatio = window.devicePixelRatio || 1;
    const canvas = document.createElement("canvas");
    const length = channelData[0].length;
    canvas.width = Math.round(width * (end - start) / length);
    canvas.height = height * pixelRatio;
    canvas.style.width = `${Math.floor(canvas.width / pixelRatio)}px`;
    canvas.style.height = `${height}px`;
    canvas.style.left = `${Math.floor(start * width / pixelRatio / length)}px`;
    canvasContainer.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    this.renderWaveform(channelData.map((channel) => channel.slice(start, end)), options2, ctx);
    const progressCanvas = canvas.cloneNode();
    progressContainer.appendChild(progressCanvas);
    const progressCtx = progressCanvas.getContext("2d");
    if (canvas.width > 0 && canvas.height > 0) {
      progressCtx.drawImage(canvas, 0, 0);
    }
    progressCtx.globalCompositeOperation = "source-in";
    progressCtx.fillStyle = this.convertColorValues(options2.progressColor);
    progressCtx.fillRect(0, 0, canvas.width, canvas.height);
  }
  renderChannel(channelData, options2, width) {
    const canvasContainer = document.createElement("div");
    const height = this.getHeight();
    canvasContainer.style.height = `${height}px`;
    this.canvasWrapper.style.minHeight = `${height}px`;
    this.canvasWrapper.appendChild(canvasContainer);
    const progressContainer = canvasContainer.cloneNode();
    this.progressWrapper.appendChild(progressContainer);
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
    const len = channelData[0].length;
    const scale = len / scrollWidth;
    let viewportWidth = Math.min(Renderer.MAX_CANVAS_WIDTH, clientWidth);
    if (options2.barWidth || options2.barGap) {
      const barWidth = options2.barWidth || 0.5;
      const barGap = options2.barGap || barWidth / 2;
      const totalBarWidth = barWidth + barGap;
      if (viewportWidth % totalBarWidth !== 0) {
        viewportWidth = Math.floor(viewportWidth / totalBarWidth) * totalBarWidth;
      }
    }
    const start = Math.floor(Math.abs(scrollLeft) * scale);
    const end = Math.floor(start + viewportWidth * scale);
    const viewportLen = end - start;
    const draw = (start2, end2) => {
      this.renderSingleCanvas(channelData, options2, width, height, Math.max(0, start2), Math.min(end2, len), canvasContainer, progressContainer);
    };
    const headDelay = this.createDelay();
    const tailDelay = this.createDelay();
    const renderHead = (fromIndex, toIndex) => {
      draw(fromIndex, toIndex);
      if (fromIndex > 0) {
        headDelay(() => {
          renderHead(fromIndex - viewportLen, toIndex - viewportLen);
        });
      }
    };
    const renderTail = (fromIndex, toIndex) => {
      draw(fromIndex, toIndex);
      if (toIndex < len) {
        tailDelay(() => {
          renderTail(fromIndex + viewportLen, toIndex + viewportLen);
        });
      }
    };
    renderHead(start, end);
    if (end < len) {
      renderTail(end, end + viewportLen);
    }
  }
  render(audioData) {
    this.timeouts.forEach((context) => context.timeout && clearTimeout(context.timeout));
    this.timeouts = [];
    this.canvasWrapper.innerHTML = "";
    this.progressWrapper.innerHTML = "";
    this.wrapper.style.width = "";
    const pixelRatio = window.devicePixelRatio || 1;
    const parentWidth = this.scrollContainer.clientWidth;
    const scrollWidth = Math.ceil(audioData.duration * (this.options.minPxPerSec || 0));
    this.isScrolling = scrollWidth > parentWidth;
    const useParentWidth = this.options.fillParent && !this.isScrolling;
    const width = (useParentWidth ? parentWidth : scrollWidth) * pixelRatio;
    this.wrapper.style.width = useParentWidth ? "100%" : `${scrollWidth}px`;
    this.scrollContainer.style.overflowX = this.isScrolling ? "auto" : "hidden";
    this.scrollContainer.classList.toggle("noScrollbar", !!this.options.hideScrollbar);
    this.cursor.style.backgroundColor = `${this.options.cursorColor || this.options.progressColor}`;
    this.cursor.style.width = `${this.options.cursorWidth}px`;
    if (this.options.splitChannels) {
      for (let i3 = 0; i3 < audioData.numberOfChannels; i3++) {
        const options2 = Object.assign(Object.assign({}, this.options), this.options.splitChannels[i3]);
        this.renderChannel([audioData.getChannelData(i3)], options2, width);
      }
    } else {
      const channels = [audioData.getChannelData(0)];
      if (audioData.numberOfChannels > 1)
        channels.push(audioData.getChannelData(1));
      this.renderChannel(channels, this.options, width);
    }
    this.audioData = audioData;
    this.emit("render");
  }
  reRender() {
    if (!this.audioData)
      return;
    const oldCursorPosition = this.progressWrapper.clientWidth;
    this.render(this.audioData);
    const newCursortPosition = this.progressWrapper.clientWidth;
    this.scrollContainer.scrollLeft += newCursortPosition - oldCursorPosition;
  }
  zoom(minPxPerSec) {
    this.options.minPxPerSec = minPxPerSec;
    this.reRender();
  }
  scrollIntoView(progress, isPlaying = false) {
    const { clientWidth, scrollLeft, scrollWidth } = this.scrollContainer;
    const progressWidth = scrollWidth * progress;
    const center = clientWidth / 2;
    const minScroll = isPlaying && this.options.autoCenter && !this.isDragging ? center : clientWidth;
    if (progressWidth > scrollLeft + minScroll || progressWidth < scrollLeft) {
      if (this.options.autoCenter && !this.isDragging) {
        const minDiff = center / 20;
        if (progressWidth - (scrollLeft + center) >= minDiff && progressWidth < scrollLeft + clientWidth) {
          this.scrollContainer.scrollLeft += minDiff;
        } else {
          this.scrollContainer.scrollLeft = progressWidth - center;
        }
      } else if (this.isDragging) {
        const gap = 10;
        this.scrollContainer.scrollLeft = progressWidth < scrollLeft ? progressWidth - gap : progressWidth - clientWidth + gap;
      } else {
        this.scrollContainer.scrollLeft = progressWidth;
      }
    }
    {
      const { scrollLeft: scrollLeft2 } = this.scrollContainer;
      const startX = scrollLeft2 / scrollWidth;
      const endX = (scrollLeft2 + clientWidth) / scrollWidth;
      this.emit("scroll", startX, endX);
    }
  }
  renderProgress(progress, isPlaying) {
    if (isNaN(progress))
      return;
    this.progressWrapper.style.width = `${progress * 100}%`;
    this.cursor.style.left = `${progress * 100}%`;
    this.cursor.style.marginLeft = Math.round(progress * 100) === 100 ? `-${this.options.cursorWidth}px` : "";
    if (this.isScrolling && this.options.autoScroll) {
      this.scrollIntoView(progress, isPlaying);
    }
  }
}
Renderer.MAX_CANVAS_WIDTH = 4e3;
class Timer extends EventEmitter {
  constructor() {
    super(...arguments);
    this.unsubscribe = () => void 0;
  }
  start() {
    this.unsubscribe = this.on("tick", () => {
      requestAnimationFrame(() => {
        this.emit("tick");
      });
    });
    this.emit("tick");
  }
  stop() {
    this.unsubscribe();
  }
  destroy() {
    this.unsubscribe();
  }
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const defaultOptions = {
  waveColor: "#999",
  progressColor: "#555",
  cursorWidth: 1,
  minPxPerSec: 0,
  fillParent: true,
  interact: true,
  autoScroll: true,
  autoCenter: true,
  sampleRate: 8e3
};
class WaveSurfer extends Player {
  /** Create a new WaveSurfer instance */
  static create(options2) {
    return new WaveSurfer(options2);
  }
  /** Create a new WaveSurfer instance */
  constructor(options2) {
    var _a, _b;
    super({
      media: options2.media,
      mediaControls: options2.mediaControls,
      autoplay: options2.autoplay,
      playbackRate: options2.audioRate
    });
    this.plugins = [];
    this.decodedData = null;
    this.subscriptions = [];
    this.options = Object.assign({}, defaultOptions, options2);
    this.timer = new Timer();
    const audioElement = !options2.media ? this.getMediaElement() : void 0;
    this.renderer = new Renderer(this.options, audioElement);
    this.initPlayerEvents();
    this.initRendererEvents();
    this.initTimerEvents();
    this.initPlugins();
    const url = this.options.url || ((_a = this.options.media) === null || _a === void 0 ? void 0 : _a.currentSrc) || ((_b = this.options.media) === null || _b === void 0 ? void 0 : _b.src);
    if (url) {
      this.load(url, this.options.peaks, this.options.duration);
    }
  }
  initTimerEvents() {
    this.subscriptions.push(this.timer.on("tick", () => {
      const currentTime = this.getCurrentTime();
      this.renderer.renderProgress(currentTime / this.getDuration(), true);
      this.emit("timeupdate", currentTime);
      this.emit("audioprocess", currentTime);
    }));
  }
  initPlayerEvents() {
    this.subscriptions.push(this.onMediaEvent("timeupdate", () => {
      const currentTime = this.getCurrentTime();
      this.renderer.renderProgress(currentTime / this.getDuration(), this.isPlaying());
      this.emit("timeupdate", currentTime);
    }), this.onMediaEvent("play", () => {
      this.emit("play");
      this.timer.start();
    }), this.onMediaEvent("pause", () => {
      this.emit("pause");
      this.timer.stop();
    }), this.onMediaEvent("emptied", () => {
      this.timer.stop();
    }), this.onMediaEvent("ended", () => {
      this.emit("finish");
    }), this.onMediaEvent("seeking", () => {
      this.emit("seeking", this.getCurrentTime());
    }));
  }
  initRendererEvents() {
    this.subscriptions.push(
      // Seek on click
      this.renderer.on("click", (relativeX) => {
        if (this.options.interact) {
          this.seekTo(relativeX);
          this.emit("interaction", relativeX * this.getDuration());
          this.emit("click", relativeX);
        }
      }),
      // Scroll
      this.renderer.on("scroll", (startX, endX) => {
        const duration = this.getDuration();
        this.emit("scroll", startX * duration, endX * duration);
      }),
      // Redraw
      this.renderer.on("render", () => {
        this.emit("redraw");
      })
    );
    {
      let debounce;
      this.subscriptions.push(this.renderer.on("drag", (relativeX) => {
        if (!this.options.interact)
          return;
        this.renderer.renderProgress(relativeX);
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          this.seekTo(relativeX);
        }, this.isPlaying() ? 0 : 200);
        this.emit("interaction", relativeX * this.getDuration());
        this.emit("drag", relativeX);
      }));
    }
  }
  initPlugins() {
    var _a;
    if (!((_a = this.options.plugins) === null || _a === void 0 ? void 0 : _a.length))
      return;
    this.options.plugins.forEach((plugin) => {
      this.registerPlugin(plugin);
    });
  }
  /** Set new wavesurfer options and re-render it */
  setOptions(options2) {
    this.options = Object.assign({}, this.options, options2);
    this.renderer.setOptions(this.options);
    if (options2.audioRate) {
      this.setPlaybackRate(options2.audioRate);
    }
    if (options2.mediaControls != null) {
      this.getMediaElement().controls = options2.mediaControls;
    }
  }
  /** Register a wavesurfer.js plugin */
  registerPlugin(plugin) {
    plugin.init(this);
    this.plugins.push(plugin);
    this.subscriptions.push(plugin.once("destroy", () => {
      this.plugins = this.plugins.filter((p2) => p2 !== plugin);
    }));
    return plugin;
  }
  /** For plugins only: get the waveform wrapper div */
  getWrapper() {
    return this.renderer.getWrapper();
  }
  /** Get the current scroll position in pixels */
  getScroll() {
    return this.renderer.getScroll();
  }
  /** Get all registered plugins */
  getActivePlugins() {
    return this.plugins;
  }
  loadAudio(url, blob, channelData, duration) {
    return __awaiter(this, void 0, void 0, function* () {
      this.emit("load", url);
      if (this.isPlaying())
        this.pause();
      this.decodedData = null;
      if (!blob && !channelData) {
        const onProgress = (percentage) => this.emit("loading", percentage);
        blob = yield Fetcher.fetchBlob(url, onProgress, this.options.fetchParams);
      }
      this.setSrc(url, blob);
      if (channelData) {
        duration = (yield Promise.resolve(duration || this.getDuration())) || (yield new Promise((resolve) => {
          this.onceMediaEvent("loadedmetadata", () => resolve(this.getDuration()));
        })) || (yield Promise.resolve(0));
        this.decodedData = Decoder.createBuffer(channelData, duration);
      } else if (blob) {
        const arrayBuffer = yield blob.arrayBuffer();
        this.decodedData = yield Decoder.decode(arrayBuffer, this.options.sampleRate);
      }
      this.emit("decode", this.getDuration());
      if (this.decodedData) {
        this.renderer.render(this.decodedData);
      }
      this.emit("ready", this.getDuration());
    });
  }
  /** Load an audio file by URL, with optional pre-decoded audio data */
  load(url, channelData, duration) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.loadAudio(url, void 0, channelData, duration);
    });
  }
  /** Load an audio blob */
  loadBlob(blob, channelData, duration) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.loadAudio("blob", blob, channelData, duration);
    });
  }
  /** Zoom the waveform by a given pixels-per-second factor */
  zoom(minPxPerSec) {
    if (!this.decodedData) {
      throw new Error("No audio loaded");
    }
    this.renderer.zoom(minPxPerSec);
    this.emit("zoom", minPxPerSec);
  }
  /** Get the decoded audio data */
  getDecodedData() {
    return this.decodedData;
  }
  /** Get decoded peaks */
  exportPeaks({ channels = 1, maxLength = 8e3, precision = 1e4 } = {}) {
    if (!this.decodedData) {
      throw new Error("The audio has not been decoded yet");
    }
    const channelsLen = Math.min(channels, this.decodedData.numberOfChannels);
    const peaks = [];
    for (let i3 = 0; i3 < channelsLen; i3++) {
      const data = this.decodedData.getChannelData(i3);
      const length = Math.min(data.length, maxLength);
      const scale = data.length / length;
      const sampledData = [];
      for (let j2 = 0; j2 < length; j2++) {
        const n2 = Math.round(j2 * scale);
        const val = data[n2];
        sampledData.push(Math.round(val * precision) / precision);
      }
      peaks.push(sampledData);
    }
    return peaks;
  }
  /** Get the duration of the audio in seconds */
  getDuration() {
    let duration = super.getDuration() || 0;
    if ((duration === 0 || duration === Infinity) && this.decodedData) {
      duration = this.decodedData.duration;
    }
    return duration;
  }
  /** Toggle if the waveform should react to clicks */
  toggleInteraction(isInteractive) {
    this.options.interact = isInteractive;
  }
  /** Seek to a percentage of audio as [0..1] (0 = beginning, 1 = end) */
  seekTo(progress) {
    const time = this.getDuration() * progress;
    this.setTime(time);
  }
  /** Play or pause the audio */
  playPause() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.isPlaying() ? this.pause() : this.play();
    });
  }
  /** Stop the audio and go to the beginning */
  stop() {
    this.pause();
    this.setTime(0);
  }
  /** Skip N or -N seconds from the current position */
  skip(seconds) {
    this.setTime(this.getCurrentTime() + seconds);
  }
  /** Empty the waveform by loading a tiny silent audio */
  empty() {
    this.load("", [[0]], 1e-3);
  }
  /** Unmount wavesurfer */
  destroy() {
    this.emit("destroy");
    this.plugins.forEach((plugin) => plugin.destroy());
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.timer.destroy();
    this.renderer.destroy();
    super.destroy();
  }
}
let t$3 = class t2 {
  constructor() {
    this.listeners = {};
  }
  on(t4, e3) {
    return this.listeners[t4] || (this.listeners[t4] = /* @__PURE__ */ new Set()), this.listeners[t4].add(e3), () => this.un(t4, e3);
  }
  once(t4, e3) {
    const s3 = this.on(t4, e3), i3 = this.on(t4, () => {
      s3(), i3();
    });
    return s3;
  }
  un(t4, e3) {
    this.listeners[t4] && (e3 ? this.listeners[t4].delete(e3) : delete this.listeners[t4]);
  }
  unAll() {
    this.listeners = {};
  }
  emit(t4, ...e3) {
    this.listeners[t4] && this.listeners[t4].forEach((t5) => t5(...e3));
  }
};
let e$2 = class e extends t$3 {
  constructor(t4) {
    super(), this.subscriptions = [], this.options = t4;
  }
  onInit() {
  }
  init(t4) {
    this.wavesurfer = t4, this.onInit();
  }
  destroy() {
    this.emit("destroy"), this.subscriptions.forEach((t4) => t4());
  }
};
const s$6 = { lineWidth: 1, labelSize: 11 };
let i$4 = class i extends e$2 {
  constructor(t4) {
    super(t4 || {}), this.unsubscribe = () => {
    }, this.onPointerMove = (t5) => {
      if (!this.wavesurfer)
        return;
      const e3 = this.wavesurfer.getWrapper().getBoundingClientRect(), { width: s3 } = e3, i3 = t5.clientX - e3.left, r3 = Math.min(1, Math.max(0, i3 / s3)), n2 = Math.min(s3 - this.options.lineWidth - 1, i3);
      this.wrapper.style.transform = `translateX(${n2}px)`, this.wrapper.style.opacity = "1";
      const o3 = this.wavesurfer.getDuration() || 0;
      this.label.textContent = this.formatTime(o3 * r3);
      const a2 = this.label.offsetWidth;
      this.label.style.transform = n2 + a2 > s3 ? `translateX(-${a2 + this.options.lineWidth}px)` : "", this.emit("hover", r3);
    }, this.onPointerLeave = () => {
      this.wrapper.style.opacity = "0";
    }, this.options = Object.assign({}, s$6, t4), this.wrapper = document.createElement("div"), this.label = document.createElement("span"), this.wrapper.appendChild(this.label);
  }
  static create(t4) {
    return new i(t4);
  }
  addUnits(t4) {
    return `${t4}${"number" == typeof t4 ? "px" : ""}`;
  }
  onInit() {
    if (!this.wavesurfer)
      throw Error("WaveSurfer is not initialized");
    const t4 = this.wavesurfer.options, e3 = this.options.lineColor || t4.cursorColor || t4.progressColor;
    this.wrapper.setAttribute("part", "hover"), Object.assign(this.wrapper.style, { position: "absolute", zIndex: 10, left: 0, top: 0, height: "100%", pointerEvents: "none", borderLeft: `${this.addUnits(this.options.lineWidth)} solid ${e3}`, opacity: "0", transition: "opacity .1s ease-in" }), this.label.setAttribute("part", "hover-label"), Object.assign(this.label.style, { display: "block", backgroundColor: this.options.labelBackground, color: this.options.labelColor, fontSize: `${this.addUnits(this.options.labelSize)}`, transition: "transform .1s ease-in", padding: "2px 3px" });
    const s3 = this.wavesurfer.getWrapper();
    s3.appendChild(this.wrapper), s3.addEventListener("pointermove", this.onPointerMove), s3.addEventListener("pointerleave", this.onPointerLeave), this.unsubscribe = () => {
      s3.removeEventListener("pointermove", this.onPointerMove), s3.removeEventListener("pointerleave", this.onPointerLeave);
    };
  }
  formatTime(t4) {
    return `${Math.floor(t4 / 60)}:${`0${Math.floor(t4) % 60}`.slice(-2)}`;
  }
  destroy() {
    super.destroy(), this.unsubscribe(), this.wrapper.remove();
  }
};
const instanceOfAny = (object, constructors) => constructors.some((c2) => object instanceof c2);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const cursorRequestMap = /* @__PURE__ */ new WeakMap();
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error2);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error2 = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error2);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error2);
      tx.removeEventListener("abort", error2);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error2 = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error2);
    tx.addEventListener("abort", error2);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db2) => {
    if (terminated)
      db2.addEventListener("close", () => terminated());
    if (blocking) {
      db2.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName2, ...args) {
    const tx = this.transaction(storeName2, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const dbName = "audio";
const storeName = "blobs";
async function newDB() {
  return await openDB(dbName, 1, {
    upgrade(db2) {
      db2.createObjectStore(storeName, { keyPath: "id" });
    }
  });
}
async function getBlob(id2) {
  const db2 = await newDB();
  const tx = db2.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  return await store.get(id2);
}
async function addBlob(blogEntry) {
  const db2 = await newDB();
  const tx = db2.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.add(blogEntry);
  await tx.done;
}
const Spin = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className: "animate-spin h-5 w-5 text-gray-500",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  ) });
};
const usePlayingStore = create(
  (set2, get2) => ({
    playingAudioIndex: void 0,
    forceLock: (audioIndex) => set2((state) => ({
      ...state,
      playingAudioIndex: audioIndex
    })),
    unLock: (audioIndex) => {
      if (get2().playingAudioIndex === audioIndex) {
        set2((state) => ({ ...state, playingAudioIndex: void 0 }));
      } else {
        throw new Error("failed to unLock: you haven't lock, audioIndex:" + audioIndex);
      }
    }
  })
);
const selfColor = {
  boxBg: "bg-blue-600",
  playBg: "bg-blue-grey",
  play: "white",
  pause: "text-white",
  wave: "rgb(128, 154, 241)",
  progress: "rgb(213, 221, 250)",
  hoverLine: "white",
  labelBg: "#94a3b8",
  label: "white"
};
const assistantColor = {
  boxBg: "bg-equal-200",
  playBg: "bg-white",
  play: "#5e5e5e",
  pause: "text-gray-500",
  wave: "#8c8c8c",
  progress: "#2f2f2f",
  hoverLine: "black",
  labelBg: "#d1d5db",
  label: "black"
};
const Audio = ({ audio, self: self2 }) => {
  const [audioUrl, setAudioUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!audio) {
      return;
    }
    if (audioUrl) {
      return;
    }
    if (["sent", "received"].includes(audio.status)) {
      if (audio.audioId) {
        getBlob(audio.audioId).then((r3) => {
          if (r3) {
            const url = URL.createObjectURL(r3.blob);
            setAudioUrl(url);
          } else {
            console.error("audio blob not found");
          }
        }).catch((e3) => {
          console.error("failed to get audio blob", audio.audioId, e3);
        });
      }
    }
  }, [audio]);
  if (!audio) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
  }
  switch (audio.status) {
    case "sending":
    case "receiving":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-auto px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {}) });
    case "sent":
    case "received":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Wave, { url: audioUrl, audioIndex: audio.audioId, self: self2 });
    case "error":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        " ",
        audio.errorMessage
      ] });
    default:
      console.log("impossible audio status", audio.status);
      break;
  }
};
const Wave = ({ url, audioIndex, self: self2 }) => {
  const waveformRef = reactExports.useRef(null);
  const wavesurfer = reactExports.useRef();
  const playingAudioIndex = usePlayingStore((state) => state.playingAudioIndex);
  const forceLock = usePlayingStore((state) => state.forceLock);
  const unLock = usePlayingStore((state) => state.unLock);
  const color = self2 ? selfColor : assistantColor;
  reactExports.useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: color.wave,
      progressColor: color.progress,
      cursorWidth: 0,
      barWidth: 4,
      barGap: 2,
      barRadius: 10,
      height: "auto",
      url,
      plugins: [
        i$4.create({
          lineColor: color.hoverLine,
          lineWidth: 1,
          labelBackground: color.labelBg,
          labelColor: color.label,
          labelSize: "11px"
        })
      ]
    });
    wavesurfer.current.on("interaction", () => {
      wavesurfer.current.play().then(() => {
        forceLock(audioIndex);
      }).catch((e3) => {
        console.error("can't play", e3);
      });
    });
    wavesurfer.current.on("finish", () => {
      unLock(audioIndex);
    });
    return () => {
      wavesurfer.current && wavesurfer.current.destroy();
    };
  }, [url, audioIndex]);
  const playPause = () => {
    if (wavesurfer.current.isPlaying()) {
      wavesurfer.current.pause();
      unLock(audioIndex);
    } else {
      wavesurfer.current.play().catch((e3) => {
        console.error("can't play", e3);
      });
      forceLock(audioIndex);
    }
  };
  reactExports.useEffect(() => {
    var _a;
    if (playingAudioIndex !== audioIndex && ((_a = wavesurfer.current) == null ? void 0 : _a.isPlaying())) {
      wavesurfer.current.pause();
    }
  }, [playingAudioIndex, audioIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-2xl items-center p-1 gap-2 " + color.boxBg, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex justify-center items-center rounded-full w-10 h-10 shrink-0 " + color.playBg,
        onClick: playPause,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { hidden: playingAudioIndex === audioIndex, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: color.play,
              viewBox: "0 0 24 24",
              className: "w-6 h-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { hidden: playingAudioIndex !== audioIndex, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              strokeWidth: 4,
              stroke: "currentColor",
              className: "w-6 h-6 " + color.pause,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 5.25v13.5m-7.5-13.5v13.5" })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: waveformRef, className: "w-full h-10" })
  ] });
};
var Component = {};
var toggleSelection = function() {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function() {
    };
  }
  var active = document.activeElement;
  var ranges = [];
  for (var i3 = 0; i3 < selection.rangeCount; i3++) {
    ranges.push(selection.getRangeAt(i3));
  }
  switch (active.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      active.blur();
      break;
    default:
      active = null;
      break;
  }
  selection.removeAllRanges();
  return function() {
    selection.type === "Caret" && selection.removeAllRanges();
    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }
    active && active.focus();
  };
};
var deselectCurrent = toggleSelection;
var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options2) {
  var debug, message, reselectPrevious, range, selection, mark, success = false;
  if (!options2) {
    options2 = {};
  }
  debug = options2.debug || false;
  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text;
    mark.ariaHidden = "true";
    mark.style.all = "unset";
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    mark.style.whiteSpace = "pre";
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e3) {
      e3.stopPropagation();
      if (options2.format) {
        e3.preventDefault();
        if (typeof e3.clipboardData === "undefined") {
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format2 = clipboardToIE11Formatting[options2.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format2, text);
        } else {
          e3.clipboardData.clearData();
          e3.clipboardData.setData(options2.format, text);
        }
      }
      if (options2.onCopy) {
        e3.preventDefault();
        options2.onCopy(e3.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options2.format || "text", text);
      options2.onCopy && options2.onCopy(window.clipboardData);
      success = true;
    } catch (err2) {
      debug && console.error("unable to copy using clipboardData: ", err2);
      debug && console.error("falling back to prompt");
      message = format("message" in options2 ? options2.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }
    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }
  return success;
}
var copyToClipboard = copy;
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
Object.defineProperty(Component, "__esModule", {
  value: true
});
Component.CopyToClipboard = void 0;
var _react = _interopRequireDefault(reactExports);
var _copyToClipboard = _interopRequireDefault(copyToClipboard);
var _excluded = ["text", "onCopy", "options", "children"];
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i3;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i3 = 0; i3 < sourceSymbolKeys.length; i3++) {
      key = sourceSymbolKeys[i3];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i3;
  for (i3 = 0; i3 < sourceKeys.length; i3++) {
    key = sourceKeys[i3];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o3, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o4, p3) {
    o4.__proto__ = p3;
    return o4;
  };
  return _setPrototypeOf(o3, p2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}
function _getPrototypeOf(o3) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o4) {
    return o4.__proto__ || Object.getPrototypeOf(o4);
  };
  return _getPrototypeOf(o3);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var CopyToClipboard$1 = /* @__PURE__ */ function(_React$PureComponent) {
  _inherits(CopyToClipboard2, _React$PureComponent);
  var _super = _createSuper(CopyToClipboard2);
  function CopyToClipboard2() {
    var _this;
    _classCallCheck(this, CopyToClipboard2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onClick", function(event) {
      var _this$props = _this.props, text = _this$props.text, onCopy = _this$props.onCopy, children = _this$props.children, options2 = _this$props.options;
      var elem = _react["default"].Children.only(children);
      var result = (0, _copyToClipboard["default"])(text, options2);
      if (onCopy) {
        onCopy(text, result);
      }
      if (elem && elem.props && typeof elem.props.onClick === "function") {
        elem.props.onClick(event);
      }
    });
    return _this;
  }
  _createClass(CopyToClipboard2, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props;
      _this$props2.text;
      _this$props2.onCopy;
      _this$props2.options;
      var children = _this$props2.children, props = _objectWithoutProperties(_this$props2, _excluded);
      var elem = _react["default"].Children.only(children);
      return /* @__PURE__ */ _react["default"].cloneElement(elem, _objectSpread(_objectSpread({}, props), {}, {
        onClick: this.onClick
      }));
    }
  }]);
  return CopyToClipboard2;
}(_react["default"].PureComponent);
Component.CopyToClipboard = CopyToClipboard$1;
_defineProperty(CopyToClipboard$1, "defaultProps", {
  onCopy: void 0,
  options: void 0
});
var _require = Component, CopyToClipboard = _require.CopyToClipboard;
CopyToClipboard.CopyToClipboard = CopyToClipboard;
var lib = CopyToClipboard;
var reactConfetti_min = { exports: {} };
(function(module, exports) {
  !function(t4, e3) {
    module.exports = e3(reactExports);
  }("undefined" != typeof self ? self : commonjsGlobal, function(t4) {
    return function(t5) {
      var e3 = {};
      function n2(r3) {
        if (e3[r3])
          return e3[r3].exports;
        var i3 = e3[r3] = { i: r3, l: false, exports: {} };
        return t5[r3].call(i3.exports, i3, i3.exports, n2), i3.l = true, i3.exports;
      }
      return n2.m = t5, n2.c = e3, n2.d = function(t6, e4, r3) {
        n2.o(t6, e4) || Object.defineProperty(t6, e4, { enumerable: true, get: r3 });
      }, n2.r = function(t6) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t6, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t6, "__esModule", { value: true });
      }, n2.t = function(t6, e4) {
        if (1 & e4 && (t6 = n2(t6)), 8 & e4)
          return t6;
        if (4 & e4 && "object" == typeof t6 && t6 && t6.__esModule)
          return t6;
        var r3 = /* @__PURE__ */ Object.create(null);
        if (n2.r(r3), Object.defineProperty(r3, "default", { enumerable: true, value: t6 }), 2 & e4 && "string" != typeof t6)
          for (var i3 in t6)
            n2.d(r3, i3, (function(e5) {
              return t6[e5];
            }).bind(null, i3));
        return r3;
      }, n2.n = function(t6) {
        var e4 = t6 && t6.__esModule ? function() {
          return t6.default;
        } : function() {
          return t6;
        };
        return n2.d(e4, "a", e4), e4;
      }, n2.o = function(t6, e4) {
        return Object.prototype.hasOwnProperty.call(t6, e4);
      }, n2.p = "", n2(n2.s = 2);
    }([function(e3, n2) {
      e3.exports = t4;
    }, function(t5, e3, n2) {
      var r3 = { linear: function(t6, e4, n3, r4) {
        return (n3 - e4) * t6 / r4 + e4;
      }, easeInQuad: function(t6, e4, n3, r4) {
        return (n3 - e4) * (t6 /= r4) * t6 + e4;
      }, easeOutQuad: function(t6, e4, n3, r4) {
        return -(n3 - e4) * (t6 /= r4) * (t6 - 2) + e4;
      }, easeInOutQuad: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return (t6 /= r4 / 2) < 1 ? i3 / 2 * t6 * t6 + e4 : -i3 / 2 * (--t6 * (t6 - 2) - 1) + e4;
      }, easeInCubic: function(t6, e4, n3, r4) {
        return (n3 - e4) * (t6 /= r4) * t6 * t6 + e4;
      }, easeOutCubic: function(t6, e4, n3, r4) {
        return (n3 - e4) * ((t6 = t6 / r4 - 1) * t6 * t6 + 1) + e4;
      }, easeInOutCubic: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return (t6 /= r4 / 2) < 1 ? i3 / 2 * t6 * t6 * t6 + e4 : i3 / 2 * ((t6 -= 2) * t6 * t6 + 2) + e4;
      }, easeInQuart: function(t6, e4, n3, r4) {
        return (n3 - e4) * (t6 /= r4) * t6 * t6 * t6 + e4;
      }, easeOutQuart: function(t6, e4, n3, r4) {
        return -(n3 - e4) * ((t6 = t6 / r4 - 1) * t6 * t6 * t6 - 1) + e4;
      }, easeInOutQuart: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return (t6 /= r4 / 2) < 1 ? i3 / 2 * t6 * t6 * t6 * t6 + e4 : -i3 / 2 * ((t6 -= 2) * t6 * t6 * t6 - 2) + e4;
      }, easeInQuint: function(t6, e4, n3, r4) {
        return (n3 - e4) * (t6 /= r4) * t6 * t6 * t6 * t6 + e4;
      }, easeOutQuint: function(t6, e4, n3, r4) {
        return (n3 - e4) * ((t6 = t6 / r4 - 1) * t6 * t6 * t6 * t6 + 1) + e4;
      }, easeInOutQuint: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return (t6 /= r4 / 2) < 1 ? i3 / 2 * t6 * t6 * t6 * t6 * t6 + e4 : i3 / 2 * ((t6 -= 2) * t6 * t6 * t6 * t6 + 2) + e4;
      }, easeInSine: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return -i3 * Math.cos(t6 / r4 * (Math.PI / 2)) + i3 + e4;
      }, easeOutSine: function(t6, e4, n3, r4) {
        return (n3 - e4) * Math.sin(t6 / r4 * (Math.PI / 2)) + e4;
      }, easeInOutSine: function(t6, e4, n3, r4) {
        return -(n3 - e4) / 2 * (Math.cos(Math.PI * t6 / r4) - 1) + e4;
      }, easeInExpo: function(t6, e4, n3, r4) {
        return 0 == t6 ? e4 : (n3 - e4) * Math.pow(2, 10 * (t6 / r4 - 1)) + e4;
      }, easeOutExpo: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return t6 == r4 ? e4 + i3 : i3 * (1 - Math.pow(2, -10 * t6 / r4)) + e4;
      }, easeInOutExpo: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return 0 === t6 ? e4 : t6 === r4 ? e4 + i3 : (t6 /= r4 / 2) < 1 ? i3 / 2 * Math.pow(2, 10 * (t6 - 1)) + e4 : i3 / 2 * (2 - Math.pow(2, -10 * --t6)) + e4;
      }, easeInCirc: function(t6, e4, n3, r4) {
        return -(n3 - e4) * (Math.sqrt(1 - (t6 /= r4) * t6) - 1) + e4;
      }, easeOutCirc: function(t6, e4, n3, r4) {
        return (n3 - e4) * Math.sqrt(1 - (t6 = t6 / r4 - 1) * t6) + e4;
      }, easeInOutCirc: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return (t6 /= r4 / 2) < 1 ? -i3 / 2 * (Math.sqrt(1 - t6 * t6) - 1) + e4 : i3 / 2 * (Math.sqrt(1 - (t6 -= 2) * t6) + 1) + e4;
      }, easeInElastic: function(t6, e4, n3, r4) {
        var i3, o3, a2, c2 = n3 - e4;
        return a2 = 1.70158, 0 === t6 ? e4 : 1 == (t6 /= r4) ? e4 + c2 : ((o3 = 0) || (o3 = 0.3 * r4), (i3 = c2) < Math.abs(c2) ? (i3 = c2, a2 = o3 / 4) : a2 = o3 / (2 * Math.PI) * Math.asin(c2 / i3), -i3 * Math.pow(2, 10 * (t6 -= 1)) * Math.sin((t6 * r4 - a2) * (2 * Math.PI) / o3) + e4);
      }, easeOutElastic: function(t6, e4, n3, r4) {
        var i3, o3, a2, c2 = n3 - e4;
        return a2 = 1.70158, 0 === t6 ? e4 : 1 == (t6 /= r4) ? e4 + c2 : ((o3 = 0) || (o3 = 0.3 * r4), (i3 = c2) < Math.abs(c2) ? (i3 = c2, a2 = o3 / 4) : a2 = o3 / (2 * Math.PI) * Math.asin(c2 / i3), i3 * Math.pow(2, -10 * t6) * Math.sin((t6 * r4 - a2) * (2 * Math.PI) / o3) + c2 + e4);
      }, easeInOutElastic: function(t6, e4, n3, r4) {
        var i3, o3, a2, c2 = n3 - e4;
        return a2 = 1.70158, 0 === t6 ? e4 : 2 == (t6 /= r4 / 2) ? e4 + c2 : ((o3 = 0) || (o3 = r4 * (0.3 * 1.5)), (i3 = c2) < Math.abs(c2) ? (i3 = c2, a2 = o3 / 4) : a2 = o3 / (2 * Math.PI) * Math.asin(c2 / i3), t6 < 1 ? i3 * Math.pow(2, 10 * (t6 -= 1)) * Math.sin((t6 * r4 - a2) * (2 * Math.PI) / o3) * -0.5 + e4 : i3 * Math.pow(2, -10 * (t6 -= 1)) * Math.sin((t6 * r4 - a2) * (2 * Math.PI) / o3) * 0.5 + c2 + e4);
      }, easeInBack: function(t6, e4, n3, r4, i3) {
        return void 0 === i3 && (i3 = 1.70158), (n3 - e4) * (t6 /= r4) * t6 * ((i3 + 1) * t6 - i3) + e4;
      }, easeOutBack: function(t6, e4, n3, r4, i3) {
        return void 0 === i3 && (i3 = 1.70158), (n3 - e4) * ((t6 = t6 / r4 - 1) * t6 * ((i3 + 1) * t6 + i3) + 1) + e4;
      }, easeInOutBack: function(t6, e4, n3, r4, i3) {
        var o3 = n3 - e4;
        return void 0 === i3 && (i3 = 1.70158), (t6 /= r4 / 2) < 1 ? o3 / 2 * (t6 * t6 * ((1 + (i3 *= 1.525)) * t6 - i3)) + e4 : o3 / 2 * ((t6 -= 2) * t6 * ((1 + (i3 *= 1.525)) * t6 + i3) + 2) + e4;
      }, easeInBounce: function(t6, e4, n3, i3) {
        var o3 = n3 - e4;
        return o3 - r3.easeOutBounce(i3 - t6, 0, o3, i3) + e4;
      }, easeOutBounce: function(t6, e4, n3, r4) {
        var i3 = n3 - e4;
        return (t6 /= r4) < 1 / 2.75 ? i3 * (7.5625 * t6 * t6) + e4 : t6 < 2 / 2.75 ? i3 * (7.5625 * (t6 -= 1.5 / 2.75) * t6 + 0.75) + e4 : t6 < 2.5 / 2.75 ? i3 * (7.5625 * (t6 -= 2.25 / 2.75) * t6 + 0.9375) + e4 : i3 * (7.5625 * (t6 -= 2.625 / 2.75) * t6 + 0.984375) + e4;
      }, easeInOutBounce: function(t6, e4, n3, i3) {
        var o3 = n3 - e4;
        return t6 < i3 / 2 ? 0.5 * r3.easeInBounce(2 * t6, 0, o3, i3) + e4 : 0.5 * r3.easeOutBounce(2 * t6 - i3, 0, o3, i3) + 0.5 * o3 + e4;
      } };
      t5.exports = r3;
    }, function(t5, e3, n2) {
      t5.exports = n2(3);
    }, function(t5, e3, n2) {
      n2.r(e3), n2.d(e3, "ReactConfetti", function() {
        return Q2;
      });
      var r3, i3, o3 = n2(0), a2 = n2.n(o3), c2 = n2(1), s3 = n2.n(c2);
      function u2(t6, e4) {
        return t6 + Math.random() * (e4 - t6);
      }
      function f2(t6, e4) {
        for (var n3 = 0; n3 < e4.length; n3++) {
          var r4 = e4[n3];
          r4.enumerable = r4.enumerable || false, r4.configurable = true, "value" in r4 && (r4.writable = true), Object.defineProperty(t6, r4.key, r4);
        }
      }
      function h2(t6, e4, n3) {
        return e4 in t6 ? Object.defineProperty(t6, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t6[e4] = n3, t6;
      }
      !function(t6) {
        t6[t6.Circle = 0] = "Circle", t6[t6.Square = 1] = "Square", t6[t6.Strip = 2] = "Strip";
      }(r3 || (r3 = {})), function(t6) {
        t6[t6.Positive = 1] = "Positive", t6[t6.Negative = -1] = "Negative";
      }(i3 || (i3 = {}));
      var l2 = function() {
        function t6(e5, n4, r4, o4) {
          !function(t7, e6) {
            if (!(t7 instanceof e6))
              throw new TypeError("Cannot call a class as a function");
          }(this, t6), h2(this, "context", void 0), h2(this, "radius", void 0), h2(this, "x", void 0), h2(this, "y", void 0), h2(this, "w", void 0), h2(this, "h", void 0), h2(this, "vx", void 0), h2(this, "vy", void 0), h2(this, "shape", void 0), h2(this, "angle", void 0), h2(this, "angularSpin", void 0), h2(this, "color", void 0), h2(this, "rotateY", void 0), h2(this, "rotationDirection", void 0), h2(this, "getOptions", void 0), this.getOptions = n4;
          var a3, c3, s4 = this.getOptions(), f3 = s4.colors, l3 = s4.initialVelocityX, p3 = s4.initialVelocityY;
          this.context = e5, this.x = r4, this.y = o4, this.w = u2(5, 20), this.h = u2(5, 20), this.radius = u2(5, 10), this.vx = "number" == typeof l3 ? u2(-l3, l3) : u2(l3.min, l3.max), this.vy = "number" == typeof p3 ? u2(-p3, 0) : u2(p3.min, p3.max), this.shape = (a3 = 0, c3 = 2, Math.floor(a3 + Math.random() * (c3 - a3 + 1))), this.angle = u2(0, 360) * Math.PI / 180, this.angularSpin = u2(-0.2, 0.2), this.color = f3[Math.floor(Math.random() * f3.length)], this.rotateY = u2(0, 1), this.rotationDirection = u2(0, 1) ? i3.Positive : i3.Negative;
        }
        var e4, n3;
        return e4 = t6, (n3 = [{ key: "update", value: function() {
          var t7 = this.getOptions(), e5 = t7.gravity, n4 = t7.wind, o4 = t7.friction, a3 = t7.opacity, c3 = t7.drawShape;
          this.x += this.vx, this.y += this.vy, this.vy += e5, this.vx += n4, this.vx *= o4, this.vy *= o4, this.rotateY >= 1 && this.rotationDirection === i3.Positive ? this.rotationDirection = i3.Negative : this.rotateY <= -1 && this.rotationDirection === i3.Negative && (this.rotationDirection = i3.Positive);
          var s4 = 0.1 * this.rotationDirection;
          if (this.rotateY += s4, this.angle += this.angularSpin, this.context.save(), this.context.translate(this.x, this.y), this.context.rotate(this.angle), this.context.scale(1, this.rotateY), this.context.rotate(this.angle), this.context.beginPath(), this.context.fillStyle = this.color, this.context.strokeStyle = this.color, this.context.globalAlpha = a3, this.context.lineCap = "round", this.context.lineWidth = 2, c3 && "function" == typeof c3)
            c3.call(this, this.context);
          else
            switch (this.shape) {
              case r3.Circle:
                this.context.beginPath(), this.context.arc(0, 0, this.radius, 0, 2 * Math.PI), this.context.fill();
                break;
              case r3.Square:
                this.context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                break;
              case r3.Strip:
                this.context.fillRect(-this.w / 6, -this.h / 2, this.w / 3, this.h);
            }
          this.context.closePath(), this.context.restore();
        } }]) && f2(e4.prototype, n3), t6;
      }();
      function p2(t6, e4, n3) {
        return e4 in t6 ? Object.defineProperty(t6, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t6[e4] = n3, t6;
      }
      var v2 = function t6(e4, n3) {
        var r4 = this;
        !function(t7, e5) {
          if (!(t7 instanceof e5))
            throw new TypeError("Cannot call a class as a function");
        }(this, t6), p2(this, "canvas", void 0), p2(this, "context", void 0), p2(this, "getOptions", void 0), p2(this, "x", 0), p2(this, "y", 0), p2(this, "w", 0), p2(this, "h", 0), p2(this, "lastNumberOfPieces", 0), p2(this, "tweenInitTime", Date.now()), p2(this, "particles", []), p2(this, "particlesGenerated", 0), p2(this, "removeParticleAt", function(t7) {
          r4.particles.splice(t7, 1);
        }), p2(this, "getParticle", function() {
          var t7 = u2(r4.x, r4.w + r4.x), e5 = u2(r4.y, r4.h + r4.y);
          return new l2(r4.context, r4.getOptions, t7, e5);
        }), p2(this, "animate", function() {
          var t7 = r4.canvas, e5 = r4.context, n4 = r4.particlesGenerated, i5 = r4.lastNumberOfPieces, o4 = r4.getOptions(), a3 = o4.run, c3 = o4.recycle, s4 = o4.numberOfPieces, u3 = o4.debug, f3 = o4.tweenFunction, h3 = o4.tweenDuration;
          if (!a3)
            return false;
          var l3 = r4.particles.length, p3 = c3 ? l3 : n4, v3 = Date.now();
          if (p3 < s4) {
            i5 !== s4 && (r4.tweenInitTime = v3, r4.lastNumberOfPieces = s4);
            for (var y3 = r4.tweenInitTime, d3 = f3(v3 - y3 > h3 ? h3 : Math.max(0, v3 - y3), p3, s4, h3), b3 = Math.round(d3 - p3), g3 = 0; g3 < b3; g3++)
              r4.particles.push(r4.getParticle());
            r4.particlesGenerated += b3;
          }
          return u3 && (e5.font = "12px sans-serif", e5.fillStyle = "#333", e5.textAlign = "right", e5.fillText("Particles: ".concat(l3), t7.width - 10, t7.height - 20)), r4.particles.forEach(function(e6, n5) {
            e6.update(), (e6.y > t7.height || e6.y < -100 || e6.x > t7.width + 100 || e6.x < -100) && (c3 && p3 <= s4 ? r4.particles[n5] = r4.getParticle() : r4.removeParticleAt(n5));
          }), l3 > 0 || p3 < s4;
        }), this.canvas = e4;
        var i4 = this.canvas.getContext("2d");
        if (!i4)
          throw new Error("Could not get canvas context");
        this.context = i4, this.getOptions = n3;
      };
      function y2(t6, e4) {
        var n3 = Object.keys(t6);
        if (Object.getOwnPropertySymbols) {
          var r4 = Object.getOwnPropertySymbols(t6);
          e4 && (r4 = r4.filter(function(e5) {
            return Object.getOwnPropertyDescriptor(t6, e5).enumerable;
          })), n3.push.apply(n3, r4);
        }
        return n3;
      }
      function d2(t6) {
        for (var e4 = 1; e4 < arguments.length; e4++) {
          var n3 = null != arguments[e4] ? arguments[e4] : {};
          e4 % 2 ? y2(Object(n3), true).forEach(function(e5) {
            g2(t6, e5, n3[e5]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t6, Object.getOwnPropertyDescriptors(n3)) : y2(Object(n3)).forEach(function(e5) {
            Object.defineProperty(t6, e5, Object.getOwnPropertyDescriptor(n3, e5));
          });
        }
        return t6;
      }
      function b2(t6, e4) {
        for (var n3 = 0; n3 < e4.length; n3++) {
          var r4 = e4[n3];
          r4.enumerable = r4.enumerable || false, r4.configurable = true, "value" in r4 && (r4.writable = true), Object.defineProperty(t6, r4.key, r4);
        }
      }
      function g2(t6, e4, n3) {
        return e4 in t6 ? Object.defineProperty(t6, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t6[e4] = n3, t6;
      }
      var O2 = { width: "undefined" != typeof window ? window.innerWidth : 300, height: "undefined" != typeof window ? window.innerHeight : 200, numberOfPieces: 200, friction: 0.99, wind: 0, gravity: 0.1, initialVelocityX: 4, initialVelocityY: 10, colors: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"], opacity: 1, debug: false, tweenFunction: s3.a.easeInOutQuad, tweenDuration: 5e3, recycle: true, run: true }, w2 = function() {
        function t6(e5, n4) {
          var r4 = this;
          !function(t7, e6) {
            if (!(t7 instanceof e6))
              throw new TypeError("Cannot call a class as a function");
          }(this, t6), g2(this, "canvas", void 0), g2(this, "context", void 0), g2(this, "_options", void 0), g2(this, "generator", void 0), g2(this, "rafId", void 0), g2(this, "setOptionsWithDefaults", function(t7) {
            var e6 = { confettiSource: { x: 0, y: 0, w: r4.canvas.width, h: 0 } };
            r4._options = d2(d2(d2({}, e6), O2), t7), Object.assign(r4, t7.confettiSource);
          }), g2(this, "update", function() {
            var t7 = r4.options, e6 = t7.run, n5 = t7.onConfettiComplete, i5 = r4.canvas, o4 = r4.context;
            e6 && (o4.fillStyle = "white", o4.clearRect(0, 0, i5.width, i5.height)), r4.generator.animate() ? r4.rafId = requestAnimationFrame(r4.update) : (n5 && "function" == typeof n5 && r4.generator.particlesGenerated > 0 && n5.call(r4, r4), r4._options.run = false);
          }), g2(this, "reset", function() {
            r4.generator && r4.generator.particlesGenerated > 0 && (r4.generator.particlesGenerated = 0, r4.generator.particles = [], r4.generator.lastNumberOfPieces = 0);
          }), g2(this, "stop", function() {
            r4.options = { run: false }, r4.rafId && (cancelAnimationFrame(r4.rafId), r4.rafId = void 0);
          }), this.canvas = e5;
          var i4 = this.canvas.getContext("2d");
          if (!i4)
            throw new Error("Could not get canvas context");
          this.context = i4, this.generator = new v2(this.canvas, function() {
            return r4.options;
          }), this.options = n4, this.update();
        }
        var e4, n3;
        return e4 = t6, (n3 = [{ key: "options", get: function() {
          return this._options;
        }, set: function(t7) {
          var e5 = this._options && this._options.run, n4 = this._options && this._options.recycle;
          this.setOptionsWithDefaults(t7), this.generator && (Object.assign(this.generator, this.options.confettiSource), "boolean" == typeof t7.recycle && t7.recycle && false === n4 && (this.generator.lastNumberOfPieces = this.generator.particles.length)), "boolean" == typeof t7.run && t7.run && false === e5 && this.update();
        } }]) && b2(e4.prototype, n3), t6;
      }();
      function m2(t6) {
        return function(t7) {
          if (Array.isArray(t7))
            return C2(t7);
        }(t6) || function(t7) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t7))
            return Array.from(t7);
        }(t6) || S2(t6) || function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function x2(t6) {
        return (x2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t7) {
          return typeof t7;
        } : function(t7) {
          return t7 && "function" == typeof Symbol && t7.constructor === Symbol && t7 !== Symbol.prototype ? "symbol" : typeof t7;
        })(t6);
      }
      function P2() {
        return (P2 = Object.assign || function(t6) {
          for (var e4 = 1; e4 < arguments.length; e4++) {
            var n3 = arguments[e4];
            for (var r4 in n3)
              Object.prototype.hasOwnProperty.call(n3, r4) && (t6[r4] = n3[r4]);
          }
          return t6;
        }).apply(this, arguments);
      }
      function j2(t6, e4) {
        var n3 = Object.keys(t6);
        if (Object.getOwnPropertySymbols) {
          var r4 = Object.getOwnPropertySymbols(t6);
          e4 && (r4 = r4.filter(function(e5) {
            return Object.getOwnPropertyDescriptor(t6, e5).enumerable;
          })), n3.push.apply(n3, r4);
        }
        return n3;
      }
      function M2(t6) {
        for (var e4 = 1; e4 < arguments.length; e4++) {
          var n3 = null != arguments[e4] ? arguments[e4] : {};
          e4 % 2 ? j2(Object(n3), true).forEach(function(e5) {
            T2(t6, e5, n3[e5]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t6, Object.getOwnPropertyDescriptors(n3)) : j2(Object(n3)).forEach(function(e5) {
            Object.defineProperty(t6, e5, Object.getOwnPropertyDescriptor(n3, e5));
          });
        }
        return t6;
      }
      function I2(t6, e4) {
        return function(t7) {
          if (Array.isArray(t7))
            return t7;
        }(t6) || function(t7, e5) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t7)))
            return;
          var n3 = [], r4 = true, i4 = false, o4 = void 0;
          try {
            for (var a3, c3 = t7[Symbol.iterator](); !(r4 = (a3 = c3.next()).done) && (n3.push(a3.value), !e5 || n3.length !== e5); r4 = true)
              ;
          } catch (t8) {
            i4 = true, o4 = t8;
          } finally {
            try {
              r4 || null == c3.return || c3.return();
            } finally {
              if (i4)
                throw o4;
            }
          }
          return n3;
        }(t6, e4) || S2(t6, e4) || function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function S2(t6, e4) {
        if (t6) {
          if ("string" == typeof t6)
            return C2(t6, e4);
          var n3 = Object.prototype.toString.call(t6).slice(8, -1);
          return "Object" === n3 && t6.constructor && (n3 = t6.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(t6) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? C2(t6, e4) : void 0;
        }
      }
      function C2(t6, e4) {
        (null == e4 || e4 > t6.length) && (e4 = t6.length);
        for (var n3 = 0, r4 = new Array(e4); n3 < e4; n3++)
          r4[n3] = t6[n3];
        return r4;
      }
      function D2(t6, e4) {
        if (!(t6 instanceof e4))
          throw new TypeError("Cannot call a class as a function");
      }
      function E2(t6, e4) {
        for (var n3 = 0; n3 < e4.length; n3++) {
          var r4 = e4[n3];
          r4.enumerable = r4.enumerable || false, r4.configurable = true, "value" in r4 && (r4.writable = true), Object.defineProperty(t6, r4.key, r4);
        }
      }
      function _2(t6, e4) {
        return (_2 = Object.setPrototypeOf || function(t7, e5) {
          return t7.__proto__ = e5, t7;
        })(t6, e4);
      }
      function R2(t6) {
        var e4 = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if ("function" == typeof Proxy)
            return true;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), true;
          } catch (t7) {
            return false;
          }
        }();
        return function() {
          var n3, r4 = F2(t6);
          if (e4) {
            var i4 = F2(this).constructor;
            n3 = Reflect.construct(r4, arguments, i4);
          } else
            n3 = r4.apply(this, arguments);
          return k2(this, n3);
        };
      }
      function k2(t6, e4) {
        return !e4 || "object" !== x2(e4) && "function" != typeof e4 ? A2(t6) : e4;
      }
      function A2(t6) {
        if (void 0 === t6)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t6;
      }
      function F2(t6) {
        return (F2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t7) {
          return t7.__proto__ || Object.getPrototypeOf(t7);
        })(t6);
      }
      function T2(t6, e4, n3) {
        return e4 in t6 ? Object.defineProperty(t6, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t6[e4] = n3, t6;
      }
      var B2 = a2.a.createRef(), N2 = function(t6) {
        !function(t7, e5) {
          if ("function" != typeof e5 && null !== e5)
            throw new TypeError("Super expression must either be null or a function");
          t7.prototype = Object.create(e5 && e5.prototype, { constructor: { value: t7, writable: true, configurable: true } }), e5 && _2(t7, e5);
        }(o4, t6);
        var e4, n3, i4 = R2(o4);
        function o4(t7) {
          var e5;
          D2(this, o4);
          for (var n4 = arguments.length, r4 = new Array(n4 > 1 ? n4 - 1 : 0), c3 = 1; c3 < n4; c3++)
            r4[c3 - 1] = arguments[c3];
          return T2(A2(e5 = i4.call.apply(i4, [this, t7].concat(r4))), "canvas", a2.a.createRef()), T2(A2(e5), "confetti", void 0), e5.canvas = t7.canvasRef || B2, e5;
        }
        return e4 = o4, (n3 = [{ key: "componentDidMount", value: function() {
          if (this.canvas.current) {
            var t7 = q2(this.props)[0];
            this.confetti = new w2(this.canvas.current, t7);
          }
        } }, { key: "componentDidUpdate", value: function() {
          var t7 = q2(this.props)[0];
          this.confetti && (this.confetti.options = t7);
        } }, { key: "componentWillUnmount", value: function() {
          this.confetti && this.confetti.stop(), this.confetti = void 0;
        } }, { key: "render", value: function() {
          var t7 = I2(q2(this.props), 2), e5 = t7[0], n4 = t7[1], r4 = M2({ zIndex: 2, position: "absolute", pointerEvents: "none", top: 0, left: 0, bottom: 0, right: 0 }, n4.style);
          return a2.a.createElement("canvas", P2({ width: e5.width, height: e5.height, ref: this.canvas }, n4, { style: r4 }));
        } }]) && E2(e4.prototype, n3), o4;
      }(o3.Component);
      function q2(t6) {
        var e4 = {}, n3 = {}, r4 = [].concat(m2(Object.keys(O2)), ["confettiSource", "drawShape", "onConfettiComplete"]), i4 = ["canvasRef"];
        for (var o4 in t6) {
          var a3 = t6[o4];
          r4.includes(o4) ? e4[o4] = a3 : i4.includes(o4) ? i4[o4] = a3 : n3[o4] = a3;
        }
        return [e4, n3, {}];
      }
      T2(N2, "defaultProps", M2({}, O2)), T2(N2, "displayName", "ReactConfetti");
      var Q2 = a2.a.forwardRef(function(t6, e4) {
        return a2.a.createElement(N2, P2({ canvasRef: e4 }, t6));
      });
      e3.default = Q2;
    }]).default;
  });
})(reactConfetti_min);
var reactConfetti_minExports = reactConfetti_min.exports;
const Confetti = /* @__PURE__ */ getDefaultExportFromCjs(reactConfetti_minExports);
const RichOpText = ({ text }) => {
  const [hovering, setHovering] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const [confettiCount, setConfettiCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1e3);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onMouseOver: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
      className: "relative rounded-lg self-end max-w-3/4 whitespace-pre-wrap text-violet-100 bg-blue-600 px-2 py-1.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: text.text }),
        confettiCount === 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, { numberOfPieces: 500, wind: 0.02, recycle: false }, confettiCount),
        hovering && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-center rounded-lg overflow-hidden items-center pointer-events-none absolute inset-x-0 -top-8 z-10 left-auto bg-black bg-opacity-0 backdrop-blur backdrop-filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                lib.CopyToClipboard,
                {
                  text: text.text,
                  onCopy: () => {
                    setCopied(true);
                    setConfettiCount(confettiCount + 1);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "bg-slate-400 bg-opacity-10 hover:bg-opacity-20 pointer-events-auto relative px-4 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "Copy" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "bg-slate-400 bg-opacity-10 hover:bg-opacity-20 pointer-events-auto relative px-4 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sky-400", children: "Retry" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "bg-slate-400 bg-opacity-10 hover:bg-opacity-20 pointer-events-auto relative px-4 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "Delete" })
                }
              )
            ]
          }
        )
      ]
    }
  );
};
const AssistantText = ({ text }) => {
  switch (text.status) {
    case "sending":
    case "receiving":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-auto p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {}) });
    case "sent":
    case "received":
    case "half-received":
    case "typing":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-lg max-w-3/4 mr-auto whitespace-pre-wrap text-neutral-900 bg-equal-200 p-2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: text.text })
        }
      );
    case "error":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        " ",
        text.errorMessage
      ] });
    default:
      console.error("impossible text status", text.status);
      return null;
  }
};
const SelfText = ({ text }) => {
  switch (text.status) {
    case "sending":
    case "receiving":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-end w-auto px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {}) });
    case "sent":
    case "received":
    case "half-received":
    case "typing":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(RichOpText, { text });
    case "error":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        " ",
        text.errorMessage
      ] });
    default:
      console.error("impossible text status", text.status);
      return null;
  }
};
const MessageList = () => {
  const qaSlice = useConvStore((state) => state.qaSlice);
  const scrollRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight } = scrollRef.current;
      scrollRef.current.scrollTop = scrollHeight;
    }
  }, [qaSlice]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto  overflow-x-hidden w-full", ref: scrollRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5 rounded-lg w-full justify-end", children: qaSlice.map(
    (qa2) => qaDiv(qa2)
  ) }) });
};
function qaDiv(qa2) {
  var _a;
  const renderOrder = ["queText", "queAudio", "ansText", "ansAudio"];
  const statusSlice = [qa2.que.text.status, ((_a = qa2.que.audio) == null ? void 0 : _a.status) ?? "", qa2.ans.text.status, qa2.ans.audio.status];
  let thereIsAPendingAlready = false;
  for (let i3 = 0; i3 < statusSlice.length; i3++) {
    if (["sending", "receiving", "error"].includes(statusSlice[i3])) {
      if (thereIsAPendingAlready) {
        renderOrder[i3] = void 0;
      } else {
        thereIsAPendingAlready = true;
      }
    }
  }
  if (!qa2.que.textFirst) {
    [renderOrder[0], renderOrder[1]] = [renderOrder[1], renderOrder[0]];
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 mr-2", id: "message-list", children: renderOrder.map(
    (render) => {
      switch (render) {
        case "queText":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SelfText, { text: qa2.que.text });
        case "queAudio":
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg max-w-1/2 md:max-w-2/5 w-full text-neutral-900 self-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Audio, { audio: qa2.que.audio, self: true }) });
        case "ansText":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AssistantText, { text: qa2.ans.text });
        case "ansAudio":
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg max-w-1/2 md:max-w-2/5 w-full text-neutral-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Audio, { audio: qa2.ans.audio, self: false }) });
      }
    }
  ) }, qa2.id);
}
const TextArea = () => {
  const inputAreaIsLarge = useTextAreaStore((state) => state.inputAreaIsLarge);
  const stopPropagation = (event) => {
    console.log("stopPropagation", event.code);
    event.stopPropagation();
  };
  const inputText = useInputStore((state) => state.inputText);
  const [isComposing, setIsComposing] = reactExports.useState(false);
  const sendAndClearText = () => {
    const it2 = useInputStore.getState().inputText;
    if (it2) {
      useSendingTextStore.setState({ sendingText: it2 });
    }
    useInputStore.setState({ inputText: "" });
  };
  const handleKeyDown = reactExports.useCallback((event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && !isComposing) {
      event.preventDefault();
      sendAndClearText();
    } else {
      event.stopPropagation();
    }
  }, []);
  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full mt-auto bottom-0 max-w-4xl backdrop-blur bg-opacity-75", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "rounded-full bg-equal-200 flex items-center justify-center w-10 -mb-1 ",
        onClick: () => useTextAreaStore.setState({ inputAreaIsLarge: !inputAreaIsLarge }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "text-equal-400 w-6 h-6 mb-0.5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: inputAreaIsLarge ? "M19.5 8.25l-7.5 7.5-7.5-7.5" : "M4.5 15.75l7.5-7.5 7.5 7.5"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "w-full outline-0 rounded-lg resize-none bg-equal-200 pl-2 py-1 mt-auto ",
          rows: inputAreaIsLarge ? 8 : 2,
          onKeyUp: stopPropagation,
          value: inputText,
          onChange: (e3) => useInputStore.setState({ inputText: e3.target.value }),
          onKeyDown: handleKeyDown,
          onCompositionStart: handleCompositionStart,
          onCompositionEnd: handleCompositionEnd,
          placeholder: "Message"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "-ml-8 mb-1 self-end capitalize text-equal-700 ",
          onClick: sendAndClearText,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: "2",
              stroke: "currentColor",
              className: "w-6 h-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                }
              )
            }
          )
        }
      )
    ] })
  ] });
};
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i3 = 0; i3 < 256; ++i3) {
  byteToHex.push((i3 + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options2, buf, offset) {
  if (native.randomUUID && !buf && !options2) {
    return native.randomUUID();
  }
  options2 = options2 || {};
  const rnds = options2.random || (options2.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i3 = 0; i3 < 16; ++i3) {
      buf[offset + i3] = rnds[i3];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
const useSettingStore = create(
  (set2) => ({
    historyEnabled: true,
    setHistoryEnabled: (historyEnabled) => set2((state) => ({
      ...state,
      historyEnabled
    })),
    maxHistory: 4,
    setMaxHistory: (maxHistory) => set2((state) => ({
      ...state,
      maxHistory
    }))
  })
);
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
function formatISO(date, options2) {
  var _options$format, _options$representati;
  requiredArgs(1, arguments);
  var originalDate = toDate(date);
  if (isNaN(originalDate.getTime())) {
    throw new RangeError("Invalid time value");
  }
  var format2 = String((_options$format = options2 === null || options2 === void 0 ? void 0 : options2.format) !== null && _options$format !== void 0 ? _options$format : "extended");
  var representation = String((_options$representati = options2 === null || options2 === void 0 ? void 0 : options2.representation) !== null && _options$representati !== void 0 ? _options$representati : "complete");
  if (format2 !== "extended" && format2 !== "basic") {
    throw new RangeError("format must be 'extended' or 'basic'");
  }
  if (representation !== "date" && representation !== "time" && representation !== "complete") {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }
  var result = "";
  var tzOffset = "";
  var dateDelimiter = format2 === "extended" ? "-" : "";
  var timeDelimiter = format2 === "extended" ? ":" : "";
  if (representation !== "time") {
    var day = addLeadingZeros(originalDate.getDate(), 2);
    var month = addLeadingZeros(originalDate.getMonth() + 1, 2);
    var year = addLeadingZeros(originalDate.getFullYear(), 4);
    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  }
  if (representation !== "date") {
    var offset = originalDate.getTimezoneOffset();
    if (offset !== 0) {
      var absoluteOffset = Math.abs(offset);
      var hourOffset = addLeadingZeros(Math.floor(absoluteOffset / 60), 2);
      var minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
      var sign = offset < 0 ? "+" : "-";
      tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
    } else {
      tzOffset = "Z";
    }
    var hour = addLeadingZeros(originalDate.getHours(), 2);
    var minute = addLeadingZeros(originalDate.getMinutes(), 2);
    var second = addLeadingZeros(originalDate.getSeconds(), 2);
    var separator = result === "" ? "" : "T";
    var time = [hour, minute, second].join(timeDelimiter);
    result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
  }
  return result;
}
const newMyText = (status, text) => {
  return {
    status,
    text
  };
};
const sent$1 = (prev) => {
  switch (prev.status) {
    case "sending":
      return {
        ...prev,
        status: "sent"
      };
    case "sent":
    case "receiving":
    case "typing":
    case "half-received":
    case "received":
    case "error":
      return { ...prev };
  }
};
const newText = (prev, newText2, eof) => {
  switch (prev.status) {
    case "sending":
    case "sent":
    case "receiving":
    case "typing":
      return {
        ...prev,
        text: prev.text + newText2,
        textLastUpdatedAt: formatISO(/* @__PURE__ */ new Date()),
        status: eof ? "received" : "typing"
      };
    case "half-received":
      console.warn("bad state: updating a half-received text", prev.text, newText2);
      return { ...prev };
    case "received":
    case "error":
      console.error("invalid text state ", prev.status, newText2);
      return { ...prev };
  }
};
const error$1 = (prev, errMsg) => {
  switch (prev.status) {
    case "sending":
    case "sent":
    case "receiving":
    case "typing":
    case "half-received":
      return {
        ...prev,
        errorMessage: errMsg,
        status: "error"
      };
    case "received":
      console.error("invalid state, errMsg:" + errMsg);
      return { ...prev };
    case "error":
      console.error("invalid state, errMsg:" + errMsg);
      return { ...prev };
  }
};
const newAudio = (status, audioId) => {
  return {
    status,
    audioId
  };
};
const sent = (prev) => {
  switch (prev.status) {
    case "sending":
      return {
        ...prev,
        status: "sent"
      };
    case "sent":
    case "receiving":
    case "received":
    case "error":
      return { ...prev };
  }
};
const newAudioId = (prev, audioId) => {
  switch (prev.status) {
    case "sending":
    case "sent":
      return {
        ...prev,
        audioId
        // do not update status because audio may have not been sent to server
      };
    case "receiving":
      return {
        ...prev,
        audioId,
        status: "received"
      };
    case "received":
      console.error("invalid state:" + prev.status);
      return { ...prev };
    case "error":
      console.error("invalid state:" + prev.status);
      return { ...prev };
  }
};
const error = (prev, errMsg) => {
  switch (prev.status) {
    case "sending":
    case "receiving":
      return {
        ...prev,
        errorMessage: errMsg,
        status: "error"
      };
    case "sent":
    case "received":
      console.error("invalid state:" + prev.status);
      return { ...prev };
    case "error":
      console.error("invalid state:" + prev.status);
      return { ...prev };
  }
};
const newQueAns = (id2, textFirst, queText, audio) => {
  return {
    id: id2,
    que: {
      text: queText,
      audio,
      textFirst
    },
    ans: {
      text: newMyText("receiving", ""),
      audio: newAudio("receiving")
    },
    createdAt: formatISO(/* @__PURE__ */ new Date())
  };
};
const streamIdLength = 32;
const audioPlayerMimeType = "audio/mpeg";
const contentTimeoutSeconds = 30;
const minSpeakTimeMillis = 500;
const historyOptions = [
  { value: 1, mark: "1" },
  { value: 2, mark: "2" },
  { value: 3, mark: "3" },
  { value: 4, mark: "4" },
  { value: 5, mark: "5" },
  { value: 6, mark: "6" },
  { value: 7, mark: "7" },
  { value: 8, mark: "8" },
  { value: 9, mark: "9" },
  { value: 10, mark: "10" },
  { value: 20, mark: "20" },
  { value: 30, mark: "30" },
  { value: 40, mark: "40" },
  { value: 50, mark: "50" },
  { value: 100, mark: "100" }
];
const useSSEStore = create()(
  devtools(
    persist(
      () => ({
        streamId: randomHash(streamIdLength)
      }),
      {
        name: "sse",
        storage: createJSONStorage(() => zustandStorage)
        // (optional) by default the 'localStorage' is used
      }
    )
  )
);
function bind(fn, thisArg) {
  return function wrap2() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i3;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i3 = 0, l2 = obj.length; i3 < l2; i3++) {
      fn.call(null, obj[i3], i3, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i3 = 0; i3 < len; i3++) {
      key = keys[i3];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i3 = keys.length;
  let _key;
  while (i3-- > 0) {
    _key = keys[i3];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i3 = 0, l2 = arguments.length; i3 < l2; i3++) {
    arguments[i3] && forEach(arguments[i3], assignValue);
  }
  return result;
}
const extend = (a2, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a2[key] = bind(val, thisArg);
    } else {
      a2[key] = val;
    }
  }, { allOwnKeys });
  return a2;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i3;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i3 = props.length;
    while (i3-- > 0) {
      prop = props[i3];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing)
    return null;
  if (isArray(thing))
    return thing;
  let i3 = thing.length;
  if (!isNumber(i3))
    return null;
  const arr = new Array(i3);
  while (i3-- > 0) {
    arr[i3] = thing[i3];
  }
  return arr;
};
const isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i3) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i3] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i3 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i3] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}
utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype$1 = AxiosError.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError.from = (error2, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils.toFlatObject(error2, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error2.message, code, config, request, response);
  axiosError.cause = error2;
  axiosError.name = error2.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}
function removeBrackets(key) {
  return utils.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i3) {
    token = removeBrackets(token);
    return !dots && i3 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options2) {
  if (!utils.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options2 = utils.toFlatObject(options2, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils.isUndefined(source[option]);
  });
  const metaTokens = options2.metaTokens;
  const visitor = options2.visitor || defaultVisitor;
  const dots = options2.dots;
  const indexes = options2.indexes;
  const _Blob = options2.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);
  if (!utils.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    }
    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el2, index2) {
          !(utils.isUndefined(el2) || el2 === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index2, dots) : indexes === null ? key : key + "[]",
            convertValue(el2)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils.forEach(value, function each(el2, key) {
      const result = !(utils.isUndefined(el2) || el2 === null) && visitor.call(
        formData,
        el2,
        utils.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el2, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options2) {
  this._pairs = [];
  params && toFormData(params, this, options2);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options2) {
  if (!params) {
    return url;
  }
  const _encode = options2 && options2.encode || encode;
  const serializeFn = options2 && options2.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options2);
  } else {
    serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options2).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options2) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options2 ? options2.synchronous : false,
      runWhen: options2 ? options2.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const InterceptorManager$1 = InterceptorManager;
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
})();
const isStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function toURLEncodedForm(data, options2) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options2));
}
function parsePropPath(name) {
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i3;
  const len = keys.length;
  let key;
  for (i3 = 0; i3 < len; i3++) {
    key = keys[i3];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index2) {
    let name = path[index2++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index2 >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index2);
    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};
    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e3) {
      if (e3.name !== "SyntaxError") {
        throw e3;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: platform.isNode ? "http" : "xhr",
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils.isObject(data);
    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils.isFormData(data);
    if (isFormData2) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e3) {
        if (strictJSONParsing) {
          if (e3.name === "SyntaxError") {
            throw AxiosError.from(e3, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e3;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const defaults$1 = defaults;
const ignoreDuplicateOf = utils.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i3;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i3 = line.indexOf(":");
    key = line.substring(0, i3).trim().toLowerCase();
    val = line.substring(i3 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils.isString(value))
    return;
  if (utils.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i3 = keys.length;
    let deleted = false;
    while (i3--) {
      const key = keys[i3];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format2) {
    const self2 = this;
    const headers = {};
    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format2 ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError(message, config, request) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      "Request failed with status code " + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
const cookies = platform.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove() {
      }
    };
  }()
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const isURLSameOrigin = platform.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv2() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url) {
      let href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv2() {
    return function isURLSameOrigin2() {
      return true;
    };
  }()
);
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i3 = tail;
    let bytesCount = 0;
    while (i3 !== head) {
      bytesCount += bytes[i3++];
      i3 = i3 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return (e3) => {
    const loaded = e3.loaded;
    const total = e3.lengthComputable ? e3.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e3
    };
    data[isDownloadStream ? "download" : "upload"] = true;
    listener(data);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false);
      } else {
        requestHeaders.setContentType("multipart/form-data;", false);
      }
    }
    let request = new XMLHttpRequest();
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
    }
    const fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    if (platform.isStandardBrowserEnv) {
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
    }
    if (typeof config.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
    }
    if (config.cancelToken || config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(fullPath);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};
utils.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e3) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    for (let i3 = 0; i3 < length; i3++) {
      nameOrAdapter = adapters2[i3];
      if (adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
        break;
      }
    }
    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          "ERR_NOT_SUPPORT"
        );
      }
      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
      );
    }
    if (!utils.isFunction(adapter)) {
      throw new TypeError("adapter is not a function");
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({ caseless }, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a2, b2, caseless) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(a2, b2, caseless);
    } else if (!utils.isUndefined(a2)) {
      return getMergedValue(void 0, a2, caseless);
    }
  }
  function valueFromConfig2(a2, b2) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a2, b2) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils.isUndefined(a2)) {
      return getMergedValue(void 0, a2);
    }
  }
  function mergeDirectKeys(a2, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a2, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a2);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a2, b2) => mergeDeepProperties(headersToObject(a2), headersToObject(b2), true)
  };
  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const VERSION = "1.5.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i3) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i3 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options2, schema, allowUnknown) {
  if (typeof options2 !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options2);
  let i3 = keys.length;
  while (i3-- > 0) {
    const opt = keys[i3];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options2[opt];
      const result = value === void 0 || validator2(value, opt, options2);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i3 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i3 < len) {
        promise = promise.then(chain[i3++], chain[i3++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i3 = 0;
    while (i3 < len) {
      const onFulfilled = requestInterceptorChain[i3++];
      const onRejected = requestInterceptorChain[i3++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error2) {
        onRejected.call(this, error2);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error2) {
      return Promise.reject(error2);
    }
    i3 = 0;
    len = responseInterceptorChain.length;
    while (i3 < len) {
      promise = promise.then(responseInterceptorChain[i3++], responseInterceptorChain[i3++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
const Axios$1 = Axios;
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i3 = token._listeners.length;
      while (i3-- > 0) {
        token._listeners[i3](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
}
const CancelToken$1 = CancelToken;
function spread(callback) {
  return function wrap2(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults$1);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const axios$1 = axios;
function SSEEndpoint() {
  let ep = {}.VITE_REACT_APP_SSE_ENDPOINT;
  if (!ep) {
    ep = joinUrl(currentProtocolHostPortPath(), "events");
  }
  ep = ep + "?stream=" + useSSEStore.getState().streamId;
  console.debug("SSEEndpoint:", ep);
  return ep;
}
function RestfulEndpoint() {
  let ep = {}.VITE_REACT_APP_RESTFUL_ENDPOINT;
  if (ep) {
    return ep;
  }
  ep = joinUrl(currentProtocolHostPortPath(), "api");
  console.debug("RestfulEndpoint:", ep);
  return ep;
}
const axiosInstance = axios$1.create({
  baseURL: RestfulEndpoint(),
  timeout: 5e3,
  headers: { "stream-id": useSSEStore.getState().streamId }
});
const postConv = async (conv) => {
  return axiosInstance.post("conversation", conv);
};
const postAudioConv = async (audio, fileName, conv) => {
  const formData = new FormData();
  formData.append("audio", audio, fileName);
  formData.append("conversation", JSON.stringify(conv));
  return axiosInstance.postForm("audio-conversation", formData);
};
const systemMessage$1 = {
  role: "system",
  content: "You are a helpful assistant!"
};
const SubscribeSendingAudio = () => {
  const qaSlice = useConvStore((state) => state.qaSlice);
  const maxHistory = useSettingStore((state) => state.maxHistory);
  const pushQueAns = useConvStore((state) => state.pushQueAns);
  const updateQueAudio = useConvStore((state) => state.updateQueAudio);
  const getQueAudio = useConvStore((state) => state.getQueAudio);
  const sendingAudio = useSendingAudioStore((state) => state.sendingAudio);
  const recordDuration = useRecorderStore((state) => state.duration);
  const recordingMimeType = useRecorderStore((state) => state.recordingMimeType);
  reactExports.useEffect(() => {
    if (sendingAudio.length === 0) {
      console.warn("audio blob is empty");
      return;
    }
    if (recordDuration < minSpeakTimeMillis) {
      console.info("audio is less than ms", minSpeakTimeMillis);
      return;
    }
    const id2 = v4();
    let messages = historyMessages(qaSlice, maxHistory);
    messages = [systemMessage$1, ...messages];
    const qa2 = newQueAns(id2, false, newMyText("receiving", ""), newAudio("sending"));
    pushQueAns(qa2);
    postAudioConv(sendingAudio, (recordingMimeType == null ? void 0 : recordingMimeType.fileName) ?? "audio.webm", { id: id2, ms: messages }).then(
      (r3) => {
        if (r3.status >= 200 && r3.status < 300) {
          updateQueAudio(id2, sent(getQueAudio(id2)));
        } else {
          updateQueAudio(id2, error(getQueAudio(id2), r3.statusText));
        }
      }
    ).catch((e3) => {
      updateQueAudio(id2, error(getQueAudio(id2), e3));
    });
    const audioId = v4();
    addBlob({ id: audioId, blob: sendingAudio }).then(() => {
      console.debug("saved audio blob, audioId: ", audioId);
      updateQueAudio(id2, newAudioId(getQueAudio(id2), audioId));
    }).catch((e3) => {
      console.error("saved audio blob, audioId:", id2, e3);
    });
  }, [sendingAudio]);
  return null;
};
const systemMessage = {
  role: "system",
  content: "You are a helpful assistant!"
};
const SubscriberSendingText = () => {
  const qaSlice = useConvStore((state) => state.qaSlice);
  const pushQueAns = useConvStore((state) => state.pushQueAns);
  const updateQueText = useConvStore((state) => state.updateQueText);
  const getQueText = useConvStore((state) => state.getQueText);
  const maxHistory = useSettingStore((state) => state.maxHistory);
  const sendingText = useSendingTextStore((state) => state.sendingText);
  reactExports.useEffect(() => {
    if (!sendingText) {
      return;
    }
    let messages = historyMessages(qaSlice, maxHistory);
    messages = [systemMessage, ...messages, { role: "user", content: sendingText }];
    const id2 = v4();
    const qa2 = newQueAns(id2, true, newMyText("sending", sendingText));
    pushQueAns(qa2);
    postConv({ id: id2, ms: messages }).then(
      (r3) => {
        if (r3.status >= 200 && r3.status < 300) {
          updateQueText(id2, sent$1(getQueText(id2)));
        } else {
          updateQueText(id2, error$1(getQueText(id2), r3.statusText));
        }
        console.debug(useConvStore.getState());
      }
    ).catch((e3) => {
      updateQueText(id2, error$1(getQueText(id2), e3));
    });
  }, [sendingText]);
  return null;
};
const timeoutCheckStatus = ["sending", "receiving"];
const TimeoutContentDetection = () => {
  const updateQueText = useConvStore((state) => state.updateQueText);
  const updateQueAudio = useConvStore((state) => state.updateQueAudio);
  const updateAnsText = useConvStore((state) => state.updateAnsText);
  const updateAnsAudio = useConvStore((state) => state.updateAnsAudio);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      var _a, _b;
      const state = useConvStore.getState();
      for (const qa2 of state.qaSlice.slice(-60)) {
        if (timeDiffSecond(qa2.createdAt) < contentTimeoutSeconds) {
          continue;
        }
        if (timeoutCheckStatus.includes(qa2.que.text.status)) {
          updateQueText(qa2.id, error$1(qa2.que.text, "timeout"));
        }
        if (timeoutCheckStatus.includes(((_a = qa2.que.audio) == null ? void 0 : _a.status) ?? "")) {
          updateQueAudio(qa2.id, error(qa2.que.audio, "timeout"));
        }
        if (timeoutCheckStatus.includes(qa2.ans.text.status)) {
          updateAnsText(qa2.id, error$1(qa2.ans.text, "timeout"));
        }
        if (timeoutCheckStatus.includes(((_b = qa2.ans.audio) == null ? void 0 : _b.status) ?? "")) {
          updateAnsAudio(qa2.id, error(qa2.ans.audio, "timeout"));
        }
      }
    }, 2);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
  return null;
};
const Workers = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriberSendingText, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubscribeSendingAudio, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TimeoutContentDetection, {})
  ] });
};
const EventAudio = "audio";
const EventAnswer = "answer";
const EventTrans = "trans";
const SSE = () => {
  const getQueText = useConvStore((state) => state.getQueText);
  const updateQueText = useConvStore((state) => state.updateQueText);
  const getAnsText = useConvStore((state) => state.getAnsText);
  const updateAnsText = useConvStore((state) => state.updateAnsText);
  const getAnsAudio = useConvStore((state) => state.getAnsAudio);
  const updateAnsAudio = useConvStore((state) => state.updateAnsAudio);
  reactExports.useEffect(() => {
    const ep = SSEEndpoint();
    console.info("connecting to SSE: ", ep);
    const eventSource = new EventSource(ep);
    eventSource.onopen = (event) => {
      console.info("EventSource connected to server: ", event);
    };
    eventSource.onerror = (event) => {
      console.error("EventSource error: ", event);
    };
    eventSource.addEventListener(EventAnswer, (event) => {
      const answer = JSON.parse(event.data);
      const prev = getAnsText(answer.convId);
      const now = answer.eMsg ? error$1(prev, answer.eMsg) : newText(prev, answer.text, answer.eof);
      updateAnsText(answer.convId, now);
    });
    eventSource.addEventListener(EventTrans, (event) => {
      const trans = JSON.parse(event.data);
      const prev = getQueText(trans.convId);
      const now = trans.eMsg ? error$1(prev, trans.eMsg) : newText(prev, trans.text, true);
      updateQueText(trans.convId, now);
    });
    eventSource.addEventListener(EventAudio, (event) => {
      const audio = JSON.parse(event.data);
      if (audio.eMsg) {
        updateAnsAudio(audio.convId, error(getAnsAudio(audio.convId), audio.eMsg));
      } else {
        const blob = base64ToBlob(audio.audio, audioPlayerMimeType);
        const blobId = v4();
        addBlob({ id: blobId, blob }).then(() => {
          console.debug("saved audio, blobId:", blobId);
          updateAnsAudio(audio.convId, newAudioId(getAnsAudio(audio.convId), blobId));
        }).catch((e3) => {
          updateAnsAudio(audio.convId, error(getAnsAudio(audio.convId), e3));
          console.error("failed to save audio blobId", blobId, e3);
        });
      }
    });
    return () => {
      eventSource.close();
    };
  }, []);
  return null;
};
var i$3 = Object.defineProperty;
var d$4 = (t4, e3, n2) => e3 in t4 ? i$3(t4, e3, { enumerable: true, configurable: true, writable: true, value: n2 }) : t4[e3] = n2;
var r$1 = (t4, e3, n2) => (d$4(t4, typeof e3 != "symbol" ? e3 + "" : e3, n2), n2);
let o$6 = class o {
  constructor() {
    r$1(this, "current", this.detect());
    r$1(this, "handoffState", "pending");
    r$1(this, "currentId", 0);
  }
  set(e3) {
    this.current !== e3 && (this.handoffState = "pending", this.currentId = 0, this.current = e3);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
let s$5 = new o$6();
let l$2 = (e3, f2) => {
  s$5.isServer ? reactExports.useEffect(e3, f2) : reactExports.useLayoutEffect(e3, f2);
};
function s$4(e3) {
  let r3 = reactExports.useRef(e3);
  return l$2(() => {
    r3.current = e3;
  }, [e3]), r3;
}
function i$2(e3, o3) {
  let [u2, t4] = reactExports.useState(e3), r3 = s$4(e3);
  return l$2(() => t4(r3.current), [r3, t4, ...o3]), u2;
}
function t$2(e3) {
  typeof queueMicrotask == "function" ? queueMicrotask(e3) : Promise.resolve().then(e3).catch((o3) => setTimeout(() => {
    throw o3;
  }));
}
function o$5() {
  let n2 = [], r3 = { addEventListener(e3, t4, s3, a2) {
    return e3.addEventListener(t4, s3, a2), r3.add(() => e3.removeEventListener(t4, s3, a2));
  }, requestAnimationFrame(...e3) {
    let t4 = requestAnimationFrame(...e3);
    return r3.add(() => cancelAnimationFrame(t4));
  }, nextFrame(...e3) {
    return r3.requestAnimationFrame(() => r3.requestAnimationFrame(...e3));
  }, setTimeout(...e3) {
    let t4 = setTimeout(...e3);
    return r3.add(() => clearTimeout(t4));
  }, microTask(...e3) {
    let t4 = { current: true };
    return t$2(() => {
      t4.current && e3[0]();
    }), r3.add(() => {
      t4.current = false;
    });
  }, style(e3, t4, s3) {
    let a2 = e3.style.getPropertyValue(t4);
    return Object.assign(e3.style, { [t4]: s3 }), this.add(() => {
      Object.assign(e3.style, { [t4]: a2 });
    });
  }, group(e3) {
    let t4 = o$5();
    return e3(t4), this.add(() => t4.dispose());
  }, add(e3) {
    return n2.push(e3), () => {
      let t4 = n2.indexOf(e3);
      if (t4 >= 0)
        for (let s3 of n2.splice(t4, 1))
          s3();
    };
  }, dispose() {
    for (let e3 of n2.splice(0))
      e3();
  } };
  return r3;
}
function p$2() {
  let [e3] = reactExports.useState(o$5);
  return reactExports.useEffect(() => () => e3.dispose(), [e3]), e3;
}
let o$4 = function(t4) {
  let e3 = s$4(t4);
  return React.useCallback((...r3) => e3.current(...r3), [e3]);
};
function s$3() {
  let r3 = typeof document == "undefined";
  return "useSyncExternalStore" in e$5 ? ((o3) => o3.useSyncExternalStore)(e$5)(() => () => {
  }, () => false, () => !r3) : false;
}
function l$1() {
  let r3 = s$3(), [e3, n2] = reactExports.useState(s$5.isHandoffComplete);
  return e3 && s$5.isHandoffComplete === false && n2(false), reactExports.useEffect(() => {
    e3 !== true && n2(true);
  }, [e3]), reactExports.useEffect(() => s$5.handoff(), []), r3 ? false : e3;
}
var o$3;
let I$1 = (o$3 = React.useId) != null ? o$3 : function() {
  let n2 = l$1(), [e3, u2] = React.useState(n2 ? () => s$5.nextId() : null);
  return l$2(() => {
    e3 === null && u2(s$5.nextId());
  }, [e3]), e3 != null ? "" + e3 : void 0;
};
function u$3(r3, n2, ...a2) {
  if (r3 in n2) {
    let e3 = n2[r3];
    return typeof e3 == "function" ? e3(...a2) : e3;
  }
  let t4 = new Error(`Tried to handle "${r3}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e3) => `"${e3}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t4, u$3), t4;
}
function e$1(r3) {
  return s$5.isServer ? null : r3 instanceof Node ? r3.ownerDocument : r3 != null && r3.hasOwnProperty("current") && r3.current instanceof Node ? r3.current.ownerDocument : document;
}
let c$4 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e3) => `${e3}:not([tabindex='-1'])`).join(",");
var M$4 = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(M$4 || {}), N$1 = ((o3) => (o3[o3.Error = 0] = "Error", o3[o3.Overflow = 1] = "Overflow", o3[o3.Success = 2] = "Success", o3[o3.Underflow = 3] = "Underflow", o3))(N$1 || {}), F = ((t4) => (t4[t4.Previous = -1] = "Previous", t4[t4.Next = 1] = "Next", t4))(F || {});
var T$1 = ((t4) => (t4[t4.Strict = 0] = "Strict", t4[t4.Loose = 1] = "Loose", t4))(T$1 || {});
function h$3(e3, r3 = 0) {
  var t4;
  return e3 === ((t4 = e$1(e3)) == null ? void 0 : t4.body) ? false : u$3(r3, { [0]() {
    return e3.matches(c$4);
  }, [1]() {
    let l2 = e3;
    for (; l2 !== null; ) {
      if (l2.matches(c$4))
        return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
var w$1 = ((t4) => (t4[t4.Keyboard = 0] = "Keyboard", t4[t4.Mouse = 1] = "Mouse", t4))(w$1 || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e3) => {
  e3.metaKey || e3.altKey || e3.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true), document.addEventListener("click", (e3) => {
  e3.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e3.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true));
function I(e3, r3 = (t4) => t4) {
  return e3.slice().sort((t4, l2) => {
    let o3 = r3(t4), i3 = r3(l2);
    if (o3 === null || i3 === null)
      return 0;
    let n2 = o3.compareDocumentPosition(i3);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function d$3(e3, r3, n2) {
  let o3 = s$4(r3);
  reactExports.useEffect(() => {
    function t4(u2) {
      o3.current(u2);
    }
    return document.addEventListener(e3, t4, n2), () => document.removeEventListener(e3, t4, n2);
  }, [e3, n2]);
}
function s$2(e3, r3, n2) {
  let o3 = s$4(r3);
  reactExports.useEffect(() => {
    function t4(i3) {
      o3.current(i3);
    }
    return window.addEventListener(e3, t4, n2), () => window.removeEventListener(e3, t4, n2);
  }, [e3, n2]);
}
function h$2(s3, m2, a2 = true) {
  let i3 = reactExports.useRef(false);
  reactExports.useEffect(() => {
    requestAnimationFrame(() => {
      i3.current = a2;
    });
  }, [a2]);
  function c2(e3, r3) {
    if (!i3.current || e3.defaultPrevented)
      return;
    let t4 = r3(e3);
    if (t4 === null || !t4.getRootNode().contains(t4) || !t4.isConnected)
      return;
    let E2 = function u2(n2) {
      return typeof n2 == "function" ? u2(n2()) : Array.isArray(n2) || n2 instanceof Set ? n2 : [n2];
    }(s3);
    for (let u2 of E2) {
      if (u2 === null)
        continue;
      let n2 = u2 instanceof HTMLElement ? u2 : u2.current;
      if (n2 != null && n2.contains(t4) || e3.composed && e3.composedPath().includes(n2))
        return;
    }
    return !h$3(t4, T$1.Loose) && t4.tabIndex !== -1 && e3.preventDefault(), m2(e3, t4);
  }
  let o3 = reactExports.useRef(null);
  d$3("pointerdown", (e3) => {
    var r3, t4;
    i3.current && (o3.current = ((t4 = (r3 = e3.composedPath) == null ? void 0 : r3.call(e3)) == null ? void 0 : t4[0]) || e3.target);
  }, true), d$3("mousedown", (e3) => {
    var r3, t4;
    i3.current && (o3.current = ((t4 = (r3 = e3.composedPath) == null ? void 0 : r3.call(e3)) == null ? void 0 : t4[0]) || e3.target);
  }, true), d$3("click", (e3) => {
    o3.current && (c2(e3, () => o3.current), o3.current = null);
  }, true), d$3("touchend", (e3) => c2(e3, () => e3.target instanceof HTMLElement ? e3.target : null), true), s$2("blur", (e3) => c2(e3, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}
function i$1(t4) {
  var n2;
  if (t4.type)
    return t4.type;
  let e3 = (n2 = t4.as) != null ? n2 : "button";
  if (typeof e3 == "string" && e3.toLowerCase() === "button")
    return "button";
}
function s$1(t4, e3) {
  let [n2, u2] = reactExports.useState(() => i$1(t4));
  return l$2(() => {
    u2(i$1(t4));
  }, [t4.type, t4.as]), l$2(() => {
    n2 || e3.current && e3.current instanceof HTMLButtonElement && !e3.current.hasAttribute("type") && u2("button");
  }, [n2, e3]), n2;
}
let u$2 = Symbol();
function y$2(...t4) {
  let n2 = reactExports.useRef(t4);
  reactExports.useEffect(() => {
    n2.current = t4;
  }, [t4]);
  let c2 = o$4((e3) => {
    for (let o3 of n2.current)
      o3 != null && (typeof o3 == "function" ? o3(e3) : o3.current = e3);
  });
  return t4.every((e3) => e3 == null || (e3 == null ? void 0 : e3[u$2])) ? void 0 : c2;
}
function f$3(r3) {
  throw new Error("Unexpected object: " + r3);
}
var a$2 = ((e3) => (e3[e3.First = 0] = "First", e3[e3.Previous = 1] = "Previous", e3[e3.Next = 2] = "Next", e3[e3.Last = 3] = "Last", e3[e3.Specific = 4] = "Specific", e3[e3.Nothing = 5] = "Nothing", e3))(a$2 || {});
function x(r3, n2) {
  let t4 = n2.resolveItems();
  if (t4.length <= 0)
    return null;
  let l2 = n2.resolveActiveIndex(), s3 = l2 != null ? l2 : -1, d2 = (() => {
    switch (r3.focus) {
      case 0:
        return t4.findIndex((e3) => !n2.resolveDisabled(e3));
      case 1: {
        let e3 = t4.slice().reverse().findIndex((i3, c2, u2) => s3 !== -1 && u2.length - c2 - 1 >= s3 ? false : !n2.resolveDisabled(i3));
        return e3 === -1 ? e3 : t4.length - 1 - e3;
      }
      case 2:
        return t4.findIndex((e3, i3) => i3 <= s3 ? false : !n2.resolveDisabled(e3));
      case 3: {
        let e3 = t4.slice().reverse().findIndex((i3) => !n2.resolveDisabled(i3));
        return e3 === -1 ? e3 : t4.length - 1 - e3;
      }
      case 4:
        return t4.findIndex((e3) => n2.resolveId(e3) === r3.id);
      case 5:
        return null;
      default:
        f$3(r3);
    }
  })();
  return d2 === -1 ? l2 : d2;
}
function t$1(...r3) {
  return Array.from(new Set(r3.flatMap((n2) => typeof n2 == "string" ? n2.split(" ") : []))).filter(Boolean).join(" ");
}
var S$2 = ((a2) => (a2[a2.None = 0] = "None", a2[a2.RenderStrategy = 1] = "RenderStrategy", a2[a2.Static = 2] = "Static", a2))(S$2 || {}), j = ((e3) => (e3[e3.Unmount = 0] = "Unmount", e3[e3.Hidden = 1] = "Hidden", e3))(j || {});
function X({ ourProps: r3, theirProps: t4, slot: e3, defaultTag: a2, features: s3, visible: n2 = true, name: f2 }) {
  let o3 = N(t4, r3);
  if (n2)
    return c$3(o3, e3, a2, f2);
  let u2 = s3 != null ? s3 : 0;
  if (u2 & 2) {
    let { static: l2 = false, ...p2 } = o3;
    if (l2)
      return c$3(p2, e3, a2, f2);
  }
  if (u2 & 1) {
    let { unmount: l2 = true, ...p2 } = o3;
    return u$3(l2 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return c$3({ ...p2, hidden: true, style: { display: "none" } }, e3, a2, f2);
    } });
  }
  return c$3(o3, e3, a2, f2);
}
function c$3(r3, t4 = {}, e3, a2) {
  let { as: s3 = e3, children: n2, refName: f2 = "ref", ...o3 } = g$2(r3, ["unmount", "static"]), u2 = r3.ref !== void 0 ? { [f2]: r3.ref } : {}, l2 = typeof n2 == "function" ? n2(t4) : n2;
  "className" in o3 && o3.className && typeof o3.className == "function" && (o3.className = o3.className(t4));
  let p2 = {};
  if (t4) {
    let i3 = false, m2 = [];
    for (let [y2, d2] of Object.entries(t4))
      typeof d2 == "boolean" && (i3 = true), d2 === true && m2.push(y2);
    i3 && (p2["data-headlessui-state"] = m2.join(" "));
  }
  if (s3 === reactExports.Fragment && Object.keys(R(o3)).length > 0) {
    if (!reactExports.isValidElement(l2) || Array.isArray(l2) && l2.length > 1)
      throw new Error(['Passing props on "Fragment"!', "", `The current component <${a2} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(o3).map((d2) => `  - ${d2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d2) => `  - ${d2}`).join(`
`)].join(`
`));
    let i3 = l2.props, m2 = typeof (i3 == null ? void 0 : i3.className) == "function" ? (...d2) => t$1(i3 == null ? void 0 : i3.className(...d2), o3.className) : t$1(i3 == null ? void 0 : i3.className, o3.className), y2 = m2 ? { className: m2 } : {};
    return reactExports.cloneElement(l2, Object.assign({}, N(l2.props, R(g$2(o3, ["ref"]))), p2, u2, w(l2.ref, u2.ref), y2));
  }
  return reactExports.createElement(s3, Object.assign({}, g$2(o3, ["ref"]), s3 !== reactExports.Fragment && u2, s3 !== reactExports.Fragment && p2), l2);
}
function w(...r3) {
  return { ref: r3.every((t4) => t4 == null) ? void 0 : (t4) => {
    for (let e3 of r3)
      e3 != null && (typeof e3 == "function" ? e3(t4) : e3.current = t4);
  } };
}
function N(...r3) {
  if (r3.length === 0)
    return {};
  if (r3.length === 1)
    return r3[0];
  let t4 = {}, e3 = {};
  for (let s3 of r3)
    for (let n2 in s3)
      n2.startsWith("on") && typeof s3[n2] == "function" ? (e3[n2] != null || (e3[n2] = []), e3[n2].push(s3[n2])) : t4[n2] = s3[n2];
  if (t4.disabled || t4["aria-disabled"])
    return Object.assign(t4, Object.fromEntries(Object.keys(e3).map((s3) => [s3, void 0])));
  for (let s3 in e3)
    Object.assign(t4, { [s3](n2, ...f2) {
      let o3 = e3[s3];
      for (let u2 of o3) {
        if ((n2 instanceof Event || (n2 == null ? void 0 : n2.nativeEvent) instanceof Event) && n2.defaultPrevented)
          return;
        u2(n2, ...f2);
      }
    } });
  return t4;
}
function D(r3) {
  var t4;
  return Object.assign(reactExports.forwardRef(r3), { displayName: (t4 = r3.displayName) != null ? t4 : r3.name });
}
function R(r3) {
  let t4 = Object.assign({}, r3);
  for (let e3 in t4)
    t4[e3] === void 0 && delete t4[e3];
  return t4;
}
function g$2(r3, t4 = []) {
  let e3 = Object.assign({}, r3);
  for (let a2 of t4)
    a2 in e3 && delete e3[a2];
  return e3;
}
function r2(n2) {
  let e3 = n2.parentElement, l2 = null;
  for (; e3 && !(e3 instanceof HTMLFieldSetElement); )
    e3 instanceof HTMLLegendElement && (l2 = e3), e3 = e3.parentElement;
  let t4 = (e3 == null ? void 0 : e3.getAttribute("disabled")) === "";
  return t4 && i2(l2) ? false : t4;
}
function i2(n2) {
  if (!n2)
    return false;
  let e3 = n2.previousElementSibling;
  for (; e3 !== null; ) {
    if (e3 instanceof HTMLLegendElement)
      return false;
    e3 = e3.previousElementSibling;
  }
  return true;
}
function e2(i3 = {}, s3 = null, t4 = []) {
  for (let [r3, n2] of Object.entries(i3))
    o$2(t4, f$2(s3, r3), n2);
  return t4;
}
function f$2(i3, s3) {
  return i3 ? i3 + "[" + s3 + "]" : s3;
}
function o$2(i3, s3, t4) {
  if (Array.isArray(t4))
    for (let [r3, n2] of t4.entries())
      o$2(i3, f$2(s3, r3.toString()), n2);
  else
    t4 instanceof Date ? i3.push([s3, t4.toISOString()]) : typeof t4 == "boolean" ? i3.push([s3, t4 ? "1" : "0"]) : typeof t4 == "string" ? i3.push([s3, t4]) : typeof t4 == "number" ? i3.push([s3, `${t4}`]) : t4 == null ? i3.push([s3, ""]) : e2(t4, s3, i3);
}
function p$1(i3) {
  var t4, r3;
  let s3 = (t4 = i3 == null ? void 0 : i3.form) != null ? t4 : i3.closest("form");
  if (s3) {
    for (let n2 of s3.elements)
      if (n2 !== i3 && (n2.tagName === "INPUT" && n2.type === "submit" || n2.tagName === "BUTTON" && n2.type === "submit" || n2.nodeName === "INPUT" && n2.type === "image")) {
        n2.click();
        return;
      }
    (r3 = s3.requestSubmit) == null || r3.call(s3);
  }
}
let a$1 = "div";
var p = ((e3) => (e3[e3.None = 1] = "None", e3[e3.Focusable = 2] = "Focusable", e3[e3.Hidden = 4] = "Hidden", e3))(p || {});
function s2(t4, o3) {
  let { features: n2 = 1, ...e3 } = t4, d2 = { ref: o3, "aria-hidden": (n2 & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n2 & 4) === 4 && (n2 & 2) !== 2 && { display: "none" } } };
  return X({ ourProps: d2, theirProps: e3, slot: {}, defaultTag: a$1, name: "Hidden" });
}
let c$2 = D(s2);
let n = reactExports.createContext(null);
n.displayName = "OpenClosedContext";
var d$2 = ((e3) => (e3[e3.Open = 1] = "Open", e3[e3.Closed = 2] = "Closed", e3[e3.Closing = 4] = "Closing", e3[e3.Opening = 8] = "Opening", e3))(d$2 || {});
function C() {
  return reactExports.useContext(n);
}
function c$1({ value: o3, children: r3 }) {
  return React.createElement(n.Provider, { value: o3 }, r3);
}
var o$1 = ((r3) => (r3.Space = " ", r3.Enter = "Enter", r3.Escape = "Escape", r3.Backspace = "Backspace", r3.Delete = "Delete", r3.ArrowLeft = "ArrowLeft", r3.ArrowUp = "ArrowUp", r3.ArrowRight = "ArrowRight", r3.ArrowDown = "ArrowDown", r3.Home = "Home", r3.End = "End", r3.PageUp = "PageUp", r3.PageDown = "PageDown", r3.Tab = "Tab", r3))(o$1 || {});
function T(l2, r3, c2) {
  let [i3, s3] = reactExports.useState(c2), e3 = l2 !== void 0, t4 = reactExports.useRef(e3), u2 = reactExports.useRef(false), d2 = reactExports.useRef(false);
  return e3 && !t4.current && !u2.current ? (u2.current = true, t4.current = e3, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !e3 && t4.current && !d2.current && (d2.current = true, t4.current = e3, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [e3 ? l2 : i3, o$4((n2) => (e3 || s3(n2), r3 == null ? void 0 : r3(n2)))];
}
function t3(e3) {
  return [e3.screenX, e3.screenY];
}
function u$1() {
  let e3 = reactExports.useRef([-1, -1]);
  return { wasMoved(r3) {
    let n2 = t3(r3);
    return e3.current[0] === n2[0] && e3.current[1] === n2[1] ? false : (e3.current = n2, true);
  }, update(r3) {
    e3.current = t3(r3);
  } };
}
function f$1() {
  let e3 = reactExports.useRef(false);
  return l$2(() => (e3.current = true, () => {
    e3.current = false;
  }), []), e3;
}
let d$1 = reactExports.createContext(null);
function f() {
  let r3 = reactExports.useContext(d$1);
  if (r3 === null) {
    let t4 = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t4, f), t4;
  }
  return r3;
}
function M$3() {
  let [r3, t4] = reactExports.useState([]);
  return [r3.length > 0 ? r3.join(" ") : void 0, reactExports.useMemo(() => function(e3) {
    let i3 = o$4((s3) => (t4((o3) => [...o3, s3]), () => t4((o3) => {
      let p2 = o3.slice(), c2 = p2.indexOf(s3);
      return c2 !== -1 && p2.splice(c2, 1), p2;
    }))), n2 = reactExports.useMemo(() => ({ register: i3, slot: e3.slot, name: e3.name, props: e3.props }), [i3, e3.slot, e3.name, e3.props]);
    return React.createElement(d$1.Provider, { value: n2 }, e3.children);
  }, [t4])];
}
let S$1 = "p";
function h$1(r3, t4) {
  let a2 = I$1(), { id: e3 = `headlessui-description-${a2}`, ...i3 } = r3, n2 = f(), s3 = y$2(t4);
  l$2(() => n2.register(e3), [e3, n2.register]);
  let o3 = { ref: s3, ...n2.props, id: e3 };
  return X({ ourProps: o3, theirProps: i3, slot: n2.slot || {}, defaultTag: S$1, name: n2.name || "Description" });
}
let y$1 = D(h$1), b$2 = Object.assign(y$1, {});
let a = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o2(e3) {
  var r3, i3;
  let n2 = (r3 = e3.innerText) != null ? r3 : "", t4 = e3.cloneNode(true);
  if (!(t4 instanceof HTMLElement))
    return n2;
  let u2 = false;
  for (let f2 of t4.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))
    f2.remove(), u2 = true;
  let l2 = u2 ? (i3 = t4.innerText) != null ? i3 : "" : n2;
  return a.test(l2) && (l2 = l2.replace(a, "")), l2;
}
function g$1(e3) {
  let n2 = e3.getAttribute("aria-label");
  if (typeof n2 == "string")
    return n2.trim();
  let t4 = e3.getAttribute("aria-labelledby");
  if (t4) {
    let u2 = t4.split(" ").map((l2) => {
      let r3 = document.getElementById(l2);
      if (r3) {
        let i3 = r3.getAttribute("aria-label");
        return typeof i3 == "string" ? i3.trim() : o2(r3).trim();
      }
      return null;
    }).filter(Boolean);
    if (u2.length > 0)
      return u2.join(", ");
  }
  return o2(e3).trim();
}
function b$1(c2) {
  let t4 = reactExports.useRef(""), r3 = reactExports.useRef("");
  return o$4(() => {
    let e3 = c2.current;
    if (!e3)
      return "";
    let u2 = e3.innerText;
    if (t4.current === u2)
      return r3.current;
    let n2 = g$1(e3).trim().toLowerCase();
    return t4.current = u2, r3.current = n2, n2;
  });
}
var Be = ((n2) => (n2[n2.Open = 0] = "Open", n2[n2.Closed = 1] = "Closed", n2))(Be || {}), He$1 = ((n2) => (n2[n2.Single = 0] = "Single", n2[n2.Multi = 1] = "Multi", n2))(He$1 || {}), Ge$1 = ((n2) => (n2[n2.Pointer = 0] = "Pointer", n2[n2.Other = 1] = "Other", n2))(Ge$1 || {}), Ne$1 = ((i3) => (i3[i3.OpenListbox = 0] = "OpenListbox", i3[i3.CloseListbox = 1] = "CloseListbox", i3[i3.GoToOption = 2] = "GoToOption", i3[i3.Search = 3] = "Search", i3[i3.ClearSearch = 4] = "ClearSearch", i3[i3.RegisterOption = 5] = "RegisterOption", i3[i3.UnregisterOption = 6] = "UnregisterOption", i3[i3.RegisterLabel = 7] = "RegisterLabel", i3))(Ne$1 || {});
function z(e3, a2 = (n2) => n2) {
  let n2 = e3.activeOptionIndex !== null ? e3.options[e3.activeOptionIndex] : null, r3 = I(a2(e3.options.slice()), (t4) => t4.dataRef.current.domRef.current), l2 = n2 ? r3.indexOf(n2) : null;
  return l2 === -1 && (l2 = null), { options: r3, activeOptionIndex: l2 };
}
let je = { [1](e3) {
  return e3.dataRef.current.disabled || e3.listboxState === 1 ? e3 : { ...e3, activeOptionIndex: null, listboxState: 1 };
}, [0](e3) {
  if (e3.dataRef.current.disabled || e3.listboxState === 0)
    return e3;
  let a2 = e3.activeOptionIndex, { isSelected: n2 } = e3.dataRef.current, r3 = e3.options.findIndex((l2) => n2(l2.dataRef.current.value));
  return r3 !== -1 && (a2 = r3), { ...e3, listboxState: 0, activeOptionIndex: a2 };
}, [2](e3, a2) {
  var l2;
  if (e3.dataRef.current.disabled || e3.listboxState === 1)
    return e3;
  let n2 = z(e3), r3 = x(a2, { resolveItems: () => n2.options, resolveActiveIndex: () => n2.activeOptionIndex, resolveId: (t4) => t4.id, resolveDisabled: (t4) => t4.dataRef.current.disabled });
  return { ...e3, ...n2, searchQuery: "", activeOptionIndex: r3, activationTrigger: (l2 = a2.trigger) != null ? l2 : 1 };
}, [3]: (e3, a2) => {
  if (e3.dataRef.current.disabled || e3.listboxState === 1)
    return e3;
  let r3 = e3.searchQuery !== "" ? 0 : 1, l2 = e3.searchQuery + a2.value.toLowerCase(), p2 = (e3.activeOptionIndex !== null ? e3.options.slice(e3.activeOptionIndex + r3).concat(e3.options.slice(0, e3.activeOptionIndex + r3)) : e3.options).find((i3) => {
    var b2;
    return !i3.dataRef.current.disabled && ((b2 = i3.dataRef.current.textValue) == null ? void 0 : b2.startsWith(l2));
  }), u2 = p2 ? e3.options.indexOf(p2) : -1;
  return u2 === -1 || u2 === e3.activeOptionIndex ? { ...e3, searchQuery: l2 } : { ...e3, searchQuery: l2, activeOptionIndex: u2, activationTrigger: 1 };
}, [4](e3) {
  return e3.dataRef.current.disabled || e3.listboxState === 1 || e3.searchQuery === "" ? e3 : { ...e3, searchQuery: "" };
}, [5]: (e3, a2) => {
  let n2 = { id: a2.id, dataRef: a2.dataRef }, r3 = z(e3, (l2) => [...l2, n2]);
  return e3.activeOptionIndex === null && e3.dataRef.current.isSelected(a2.dataRef.current.value) && (r3.activeOptionIndex = r3.options.indexOf(n2)), { ...e3, ...r3 };
}, [6]: (e3, a2) => {
  let n2 = z(e3, (r3) => {
    let l2 = r3.findIndex((t4) => t4.id === a2.id);
    return l2 !== -1 && r3.splice(l2, 1), r3;
  });
  return { ...e3, ...n2, activationTrigger: 1 };
}, [7]: (e3, a2) => ({ ...e3, labelId: a2.id }) }, J = reactExports.createContext(null);
J.displayName = "ListboxActionsContext";
function _$1(e3) {
  let a2 = reactExports.useContext(J);
  if (a2 === null) {
    let n2 = new Error(`<${e3} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n2, _$1), n2;
  }
  return a2;
}
let q = reactExports.createContext(null);
q.displayName = "ListboxDataContext";
function U$1(e3) {
  let a2 = reactExports.useContext(q);
  if (a2 === null) {
    let n2 = new Error(`<${e3} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n2, U$1), n2;
  }
  return a2;
}
function Ve(e3, a2) {
  return u$3(a2.type, je, e3, a2);
}
let Ke = reactExports.Fragment;
function Qe(e$12, a2) {
  let { value: n2, defaultValue: r3, form: l2, name: t4, onChange: p$12, by: u2 = (s3, c2) => s3 === c2, disabled: i3 = false, horizontal: b2 = false, multiple: R$12 = false, ...m2 } = e$12;
  const P2 = b2 ? "horizontal" : "vertical";
  let S2 = y$2(a2), [L2 = R$12 ? [] : void 0, y2] = T(n2, p$12, r3), [T$22, o3] = reactExports.useReducer(Ve, { dataRef: reactExports.createRef(), listboxState: 1, options: [], searchQuery: "", labelId: null, activeOptionIndex: null, activationTrigger: 1 }), x2 = reactExports.useRef({ static: false, hold: false }), E2 = reactExports.useRef(null), B2 = reactExports.useRef(null), W2 = reactExports.useRef(null), C2 = o$4(typeof u2 == "string" ? (s3, c2) => {
    let O2 = u2;
    return (s3 == null ? void 0 : s3[O2]) === (c2 == null ? void 0 : c2[O2]);
  } : u2), A2 = reactExports.useCallback((s3) => u$3(d2.mode, { [1]: () => L2.some((c2) => C2(c2, s3)), [0]: () => C2(L2, s3) }), [L2]), d2 = reactExports.useMemo(() => ({ ...T$22, value: L2, disabled: i3, mode: R$12 ? 1 : 0, orientation: P2, compare: C2, isSelected: A2, optionsPropsRef: x2, labelRef: E2, buttonRef: B2, optionsRef: W2 }), [L2, i3, R$12, T$22]);
  l$2(() => {
    T$22.dataRef.current = d2;
  }, [d2]), h$2([d2.buttonRef, d2.optionsRef], (s3, c2) => {
    var O2;
    o3({ type: 1 }), h$3(c2, T$1.Loose) || (s3.preventDefault(), (O2 = d2.buttonRef.current) == null || O2.focus());
  }, d2.listboxState === 0);
  let H2 = reactExports.useMemo(() => ({ open: d2.listboxState === 0, disabled: i3, value: L2 }), [d2, i3, L2]), ie2 = o$4((s3) => {
    let c2 = d2.options.find((O2) => O2.id === s3);
    c2 && X$12(c2.dataRef.current.value);
  }), re2 = o$4(() => {
    if (d2.activeOptionIndex !== null) {
      let { dataRef: s3, id: c2 } = d2.options[d2.activeOptionIndex];
      X$12(s3.current.value), o3({ type: 2, focus: a$2.Specific, id: c2 });
    }
  }), ae2 = o$4(() => o3({ type: 0 })), le2 = o$4(() => o3({ type: 1 })), se2 = o$4((s3, c2, O2) => s3 === a$2.Specific ? o3({ type: 2, focus: a$2.Specific, id: c2, trigger: O2 }) : o3({ type: 2, focus: s3, trigger: O2 })), pe2 = o$4((s3, c2) => (o3({ type: 5, id: s3, dataRef: c2 }), () => o3({ type: 6, id: s3 }))), ue2 = o$4((s3) => (o3({ type: 7, id: s3 }), () => o3({ type: 7, id: null }))), X$12 = o$4((s3) => u$3(d2.mode, { [0]() {
    return y2 == null ? void 0 : y2(s3);
  }, [1]() {
    let c2 = d2.value.slice(), O2 = c2.findIndex((F2) => C2(F2, s3));
    return O2 === -1 ? c2.push(s3) : c2.splice(O2, 1), y2 == null ? void 0 : y2(c2);
  } })), de2 = o$4((s3) => o3({ type: 3, value: s3 })), ce2 = o$4(() => o3({ type: 4 })), fe2 = reactExports.useMemo(() => ({ onChange: X$12, registerOption: pe2, registerLabel: ue2, goToOption: se2, closeListbox: le2, openListbox: ae2, selectActiveOption: re2, selectOption: ie2, search: de2, clearSearch: ce2 }), []), Te2 = { ref: S2 }, G2 = reactExports.useRef(null), be2 = p$2();
  return reactExports.useEffect(() => {
    G2.current && r3 !== void 0 && be2.addEventListener(G2.current, "reset", () => {
      y2 == null || y2(r3);
    });
  }, [G2, y2]), React.createElement(J.Provider, { value: fe2 }, React.createElement(q.Provider, { value: d2 }, React.createElement(c$1, { value: u$3(d2.listboxState, { [0]: d$2.Open, [1]: d$2.Closed }) }, t4 != null && L2 != null && e2({ [t4]: L2 }).map(([s3, c2], O2) => React.createElement(c$2, { features: p.Hidden, ref: O2 === 0 ? (F2) => {
    var Y2;
    G2.current = (Y2 = F2 == null ? void 0 : F2.closest("form")) != null ? Y2 : null;
  } : void 0, ...R({ key: s3, as: "input", type: "hidden", hidden: true, readOnly: true, form: l2, name: s3, value: c2 }) })), X({ ourProps: Te2, theirProps: m2, slot: H2, defaultTag: Ke, name: "Listbox" }))));
}
let We = "button";
function Xe(e3, a2) {
  var y2;
  let n2 = I$1(), { id: r$12 = `headlessui-listbox-button-${n2}`, ...l2 } = e3, t4 = U$1("Listbox.Button"), p2 = _$1("Listbox.Button"), u2 = y$2(t4.buttonRef, a2), i3 = p$2(), b2 = o$4((T2) => {
    switch (T2.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        T2.preventDefault(), p2.openListbox(), i3.nextFrame(() => {
          t4.value || p2.goToOption(a$2.First);
        });
        break;
      case o$1.ArrowUp:
        T2.preventDefault(), p2.openListbox(), i3.nextFrame(() => {
          t4.value || p2.goToOption(a$2.Last);
        });
        break;
    }
  }), R2 = o$4((T2) => {
    switch (T2.key) {
      case o$1.Space:
        T2.preventDefault();
        break;
    }
  }), m2 = o$4((T2) => {
    if (r2(T2.currentTarget))
      return T2.preventDefault();
    t4.listboxState === 0 ? (p2.closeListbox(), i3.nextFrame(() => {
      var o3;
      return (o3 = t4.buttonRef.current) == null ? void 0 : o3.focus({ preventScroll: true });
    })) : (T2.preventDefault(), p2.openListbox());
  }), P2 = i$2(() => {
    if (t4.labelId)
      return [t4.labelId, r$12].join(" ");
  }, [t4.labelId, r$12]), S2 = reactExports.useMemo(() => ({ open: t4.listboxState === 0, disabled: t4.disabled, value: t4.value }), [t4]), L2 = { ref: u2, id: r$12, type: s$1(e3, t4.buttonRef), "aria-haspopup": "listbox", "aria-controls": (y2 = t4.optionsRef.current) == null ? void 0 : y2.id, "aria-expanded": t4.listboxState === 0, "aria-labelledby": P2, disabled: t4.disabled, onKeyDown: b2, onKeyUp: R2, onClick: m2 };
  return X({ ourProps: L2, theirProps: l2, slot: S2, defaultTag: We, name: "Listbox.Button" });
}
let $e = "label";
function ze(e3, a2) {
  let n2 = I$1(), { id: r3 = `headlessui-listbox-label-${n2}`, ...l2 } = e3, t4 = U$1("Listbox.Label"), p2 = _$1("Listbox.Label"), u2 = y$2(t4.labelRef, a2);
  l$2(() => p2.registerLabel(r3), [r3]);
  let i3 = o$4(() => {
    var m2;
    return (m2 = t4.buttonRef.current) == null ? void 0 : m2.focus({ preventScroll: true });
  }), b2 = reactExports.useMemo(() => ({ open: t4.listboxState === 0, disabled: t4.disabled }), [t4]);
  return X({ ourProps: { ref: u2, id: r3, onClick: i3 }, theirProps: l2, slot: b2, defaultTag: $e, name: "Listbox.Label" });
}
let Je = "ul", qe = S$2.RenderStrategy | S$2.Static;
function Ye(e3, a2) {
  var T2;
  let n2 = I$1(), { id: r3 = `headlessui-listbox-options-${n2}`, ...l2 } = e3, t4 = U$1("Listbox.Options"), p2 = _$1("Listbox.Options"), u2 = y$2(t4.optionsRef, a2), i3 = p$2(), b2 = p$2(), R2 = C(), m2 = (() => R2 !== null ? (R2 & d$2.Open) === d$2.Open : t4.listboxState === 0)();
  reactExports.useEffect(() => {
    var x2;
    let o3 = t4.optionsRef.current;
    o3 && t4.listboxState === 0 && o3 !== ((x2 = e$1(o3)) == null ? void 0 : x2.activeElement) && o3.focus({ preventScroll: true });
  }, [t4.listboxState, t4.optionsRef]);
  let P2 = o$4((o3) => {
    switch (b2.dispose(), o3.key) {
      case o$1.Space:
        if (t4.searchQuery !== "")
          return o3.preventDefault(), o3.stopPropagation(), p2.search(o3.key);
      case o$1.Enter:
        if (o3.preventDefault(), o3.stopPropagation(), t4.activeOptionIndex !== null) {
          let { dataRef: x2 } = t4.options[t4.activeOptionIndex];
          p2.onChange(x2.current.value);
        }
        t4.mode === 0 && (p2.closeListbox(), o$5().nextFrame(() => {
          var x2;
          return (x2 = t4.buttonRef.current) == null ? void 0 : x2.focus({ preventScroll: true });
        }));
        break;
      case u$3(t4.orientation, { vertical: o$1.ArrowDown, horizontal: o$1.ArrowRight }):
        return o3.preventDefault(), o3.stopPropagation(), p2.goToOption(a$2.Next);
      case u$3(t4.orientation, { vertical: o$1.ArrowUp, horizontal: o$1.ArrowLeft }):
        return o3.preventDefault(), o3.stopPropagation(), p2.goToOption(a$2.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return o3.preventDefault(), o3.stopPropagation(), p2.goToOption(a$2.First);
      case o$1.End:
      case o$1.PageDown:
        return o3.preventDefault(), o3.stopPropagation(), p2.goToOption(a$2.Last);
      case o$1.Escape:
        return o3.preventDefault(), o3.stopPropagation(), p2.closeListbox(), i3.nextFrame(() => {
          var x2;
          return (x2 = t4.buttonRef.current) == null ? void 0 : x2.focus({ preventScroll: true });
        });
      case o$1.Tab:
        o3.preventDefault(), o3.stopPropagation();
        break;
      default:
        o3.key.length === 1 && (p2.search(o3.key), b2.setTimeout(() => p2.clearSearch(), 350));
        break;
    }
  }), S2 = i$2(() => {
    var o3, x2, E2;
    return (E2 = (o3 = t4.labelRef.current) == null ? void 0 : o3.id) != null ? E2 : (x2 = t4.buttonRef.current) == null ? void 0 : x2.id;
  }, [t4.labelRef.current, t4.buttonRef.current]), L2 = reactExports.useMemo(() => ({ open: t4.listboxState === 0 }), [t4]), y2 = { "aria-activedescendant": t4.activeOptionIndex === null || (T2 = t4.options[t4.activeOptionIndex]) == null ? void 0 : T2.id, "aria-multiselectable": t4.mode === 1 ? true : void 0, "aria-labelledby": S2, "aria-orientation": t4.orientation, id: r3, onKeyDown: P2, role: "listbox", tabIndex: 0, ref: u2 };
  return X({ ourProps: y2, theirProps: l2, slot: L2, defaultTag: Je, features: qe, visible: m2, name: "Listbox.Options" });
}
let Ze = "li";
function et(e3, a2) {
  let n2 = I$1(), { id: r3 = `headlessui-listbox-option-${n2}`, disabled: l2 = false, value: t4, ...p2 } = e3, u2 = U$1("Listbox.Option"), i3 = _$1("Listbox.Option"), b2 = u2.activeOptionIndex !== null ? u2.options[u2.activeOptionIndex].id === r3 : false, R2 = u2.isSelected(t4), m2 = reactExports.useRef(null), P2 = b$1(m2), S2 = s$4({ disabled: l2, value: t4, domRef: m2, get textValue() {
    return P2();
  } }), L2 = y$2(a2, m2);
  l$2(() => {
    if (u2.listboxState !== 0 || !b2 || u2.activationTrigger === 0)
      return;
    let A2 = o$5();
    return A2.requestAnimationFrame(() => {
      var d2, H2;
      (H2 = (d2 = m2.current) == null ? void 0 : d2.scrollIntoView) == null || H2.call(d2, { block: "nearest" });
    }), A2.dispose;
  }, [m2, b2, u2.listboxState, u2.activationTrigger, u2.activeOptionIndex]), l$2(() => i3.registerOption(r3, S2), [S2, r3]);
  let y2 = o$4((A2) => {
    if (l2)
      return A2.preventDefault();
    i3.onChange(t4), u2.mode === 0 && (i3.closeListbox(), o$5().nextFrame(() => {
      var d2;
      return (d2 = u2.buttonRef.current) == null ? void 0 : d2.focus({ preventScroll: true });
    }));
  }), T2 = o$4(() => {
    if (l2)
      return i3.goToOption(a$2.Nothing);
    i3.goToOption(a$2.Specific, r3);
  }), o3 = u$1(), x2 = o$4((A2) => o3.update(A2)), E2 = o$4((A2) => {
    o3.wasMoved(A2) && (l2 || b2 || i3.goToOption(a$2.Specific, r3, 0));
  }), B2 = o$4((A2) => {
    o3.wasMoved(A2) && (l2 || b2 && i3.goToOption(a$2.Nothing));
  }), W2 = reactExports.useMemo(() => ({ active: b2, selected: R2, disabled: l2 }), [b2, R2, l2]);
  return X({ ourProps: { id: r3, ref: L2, role: "option", tabIndex: l2 === true ? void 0 : -1, "aria-disabled": l2 === true ? true : void 0, "aria-selected": R2, disabled: void 0, onClick: y2, onFocus: T2, onPointerEnter: x2, onMouseEnter: x2, onPointerMove: E2, onMouseMove: E2, onPointerLeave: B2, onMouseLeave: B2 }, theirProps: p2, slot: W2, defaultTag: Ze, name: "Listbox.Option" });
}
let tt$1 = D(Qe), ot = D(Xe), nt = D(ze), it = D(Ye), rt = D(et), Nt = Object.assign(tt$1, { Button: ot, Label: nt, Options: it, Option: rt });
function c(a2 = 0) {
  let [l2, r3] = reactExports.useState(a2), t4 = f$1(), o3 = reactExports.useCallback((e3) => {
    t4.current && r3((u2) => u2 | e3);
  }, [l2, t4]), m2 = reactExports.useCallback((e3) => Boolean(l2 & e3), [l2]), s3 = reactExports.useCallback((e3) => {
    t4.current && r3((u2) => u2 & ~e3);
  }, [r3, t4]), g2 = reactExports.useCallback((e3) => {
    t4.current && r3((u2) => u2 ^ e3);
  }, [r3]);
  return { flags: l2, addFlag: o3, hasFlag: m2, removeFlag: s3, toggleFlag: g2 };
}
let d = reactExports.createContext(null);
function u() {
  let o3 = reactExports.useContext(d);
  if (o3 === null) {
    let t4 = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t4, u), t4;
  }
  return o3;
}
function H() {
  let [o3, t4] = reactExports.useState([]);
  return [o3.length > 0 ? o3.join(" ") : void 0, reactExports.useMemo(() => function(e3) {
    let s3 = o$4((r3) => (t4((l2) => [...l2, r3]), () => t4((l2) => {
      let n2 = l2.slice(), p2 = n2.indexOf(r3);
      return p2 !== -1 && n2.splice(p2, 1), n2;
    }))), a2 = reactExports.useMemo(() => ({ register: s3, slot: e3.slot, name: e3.name, props: e3.props }), [s3, e3.slot, e3.name, e3.props]);
    return React.createElement(d.Provider, { value: a2 }, e3.children);
  }, [t4])];
}
let A = "label";
function h(o3, t4) {
  let i3 = I$1(), { id: e3 = `headlessui-label-${i3}`, passive: s3 = false, ...a2 } = o3, r3 = u(), l2 = y$2(t4);
  l$2(() => r3.register(e3), [e3, r3.register]);
  let n2 = { ref: l2, ...r3.props, id: e3 };
  return s3 && ("onClick" in n2 && (delete n2.htmlFor, delete n2.onClick), "onClick" in a2 && delete a2.onClick), X({ ourProps: n2, theirProps: a2, slot: r3.slot || {}, defaultTag: A, name: r3.name || "Label" });
}
let v$1 = D(h), M$2 = Object.assign(v$1, {});
let y = reactExports.createContext(null);
y.displayName = "GroupContext";
let Y = reactExports.Fragment;
function Z(s3) {
  var d2;
  let [n2, p2] = reactExports.useState(null), [c2, f2] = H(), [r3, h2] = M$3(), l2 = reactExports.useMemo(() => ({ switch: n2, setSwitch: p2, labelledby: c2, describedby: r3 }), [n2, p2, c2, r3]), T2 = {}, b2 = s3;
  return React.createElement(h2, { name: "Switch.Description" }, React.createElement(f2, { name: "Switch.Label", props: { htmlFor: (d2 = l2.switch) == null ? void 0 : d2.id, onClick(t4) {
    n2 && (t4.currentTarget.tagName === "LABEL" && t4.preventDefault(), n2.click(), n2.focus({ preventScroll: true }));
  } } }, React.createElement(y.Provider, { value: l2 }, X({ ourProps: T2, theirProps: b2, defaultTag: Y, name: "Switch.Group" }))));
}
let ee = "button";
function te(s3, n2) {
  let p$32 = I$1(), { id: c2 = `headlessui-switch-${p$32}`, checked: f2, defaultChecked: r$12 = false, onChange: h2, name: l2, value: T$12, form: b2, ...d2 } = s3, t4 = reactExports.useContext(y), u2 = reactExports.useRef(null), D2 = y$2(u2, n2, t4 === null ? null : t4.setSwitch), [o3, a2] = T(f2, h2, r$12), S2 = o$4(() => a2 == null ? void 0 : a2(!o3)), C2 = o$4((e3) => {
    if (r2(e3.currentTarget))
      return e3.preventDefault();
    e3.preventDefault(), S2();
  }), L2 = o$4((e3) => {
    e3.key === o$1.Space ? (e3.preventDefault(), S2()) : e3.key === o$1.Enter && p$1(e3.currentTarget);
  }), v2 = o$4((e3) => e3.preventDefault()), G2 = reactExports.useMemo(() => ({ checked: o3 }), [o3]), R$12 = { id: c2, ref: D2, role: "switch", type: s$1(s3, u2), tabIndex: 0, "aria-checked": o3, "aria-labelledby": t4 == null ? void 0 : t4.labelledby, "aria-describedby": t4 == null ? void 0 : t4.describedby, onClick: C2, onKeyUp: L2, onKeyPress: v2 }, k2 = p$2();
  return reactExports.useEffect(() => {
    var w2;
    let e3 = (w2 = u2.current) == null ? void 0 : w2.closest("form");
    e3 && r$12 !== void 0 && k2.addEventListener(e3, "reset", () => {
      a2(r$12);
    });
  }, [u2, a2]), React.createElement(React.Fragment, null, l2 != null && o3 && React.createElement(c$2, { features: p.Hidden, ...R({ as: "input", type: "checkbox", hidden: true, readOnly: true, form: b2, checked: o3, name: l2, value: T$12 }) }), X({ ourProps: R$12, theirProps: d2, slot: G2, defaultTag: ee, name: "Switch" }));
}
let ne = D(te), re = Z, Ge = Object.assign(ne, { Group: re, Label: M$2, Description: b$2 });
function l(r3) {
  let e3 = { called: false };
  return (...t4) => {
    if (!e3.called)
      return e3.called = true, r3(...t4);
  };
}
function g(t4, ...e3) {
  t4 && e3.length > 0 && t4.classList.add(...e3);
}
function v(t4, ...e3) {
  t4 && e3.length > 0 && t4.classList.remove(...e3);
}
function b(t4, e3) {
  let n2 = o$5();
  if (!t4)
    return n2.dispose;
  let { transitionDuration: m2, transitionDelay: a2 } = getComputedStyle(t4), [u2, p2] = [m2, a2].map((l2) => {
    let [r3 = 0] = l2.split(",").filter(Boolean).map((i3) => i3.includes("ms") ? parseFloat(i3) : parseFloat(i3) * 1e3).sort((i3, T2) => T2 - i3);
    return r3;
  }), o3 = u2 + p2;
  if (o3 !== 0) {
    n2.group((r3) => {
      r3.setTimeout(() => {
        e3(), r3.dispose();
      }, o3), r3.addEventListener(t4, "transitionrun", (i3) => {
        i3.target === i3.currentTarget && r3.dispose();
      });
    });
    let l2 = n2.addEventListener(t4, "transitionend", (r3) => {
      r3.target === r3.currentTarget && (e3(), l2());
    });
  } else
    e3();
  return n2.add(() => e3()), n2.dispose;
}
function M$1(t4, e3, n2, m2) {
  let a2 = n2 ? "enter" : "leave", u2 = o$5(), p2 = m2 !== void 0 ? l(m2) : () => {
  };
  a2 === "enter" && (t4.removeAttribute("hidden"), t4.style.display = "");
  let o3 = u$3(a2, { enter: () => e3.enter, leave: () => e3.leave }), l$12 = u$3(a2, { enter: () => e3.enterTo, leave: () => e3.leaveTo }), r3 = u$3(a2, { enter: () => e3.enterFrom, leave: () => e3.leaveFrom });
  return v(t4, ...e3.base, ...e3.enter, ...e3.enterTo, ...e3.enterFrom, ...e3.leave, ...e3.leaveFrom, ...e3.leaveTo, ...e3.entered), g(t4, ...e3.base, ...o3, ...r3), u2.nextFrame(() => {
    v(t4, ...e3.base, ...o3, ...r3), g(t4, ...e3.base, ...o3, ...l$12), b(t4, () => (v(t4, ...e3.base, ...o3), g(t4, ...e3.base, ...e3.entered), p2()));
  }), u2.dispose;
}
function E({ immediate: t4, container: s3, direction: n2, classes: u2, onStart: a2, onStop: c2 }) {
  let l2 = f$1(), d2 = p$2(), e3 = s$4(n2);
  l$2(() => {
    t4 && (e3.current = "enter");
  }, [t4]), l$2(() => {
    let r3 = o$5();
    d2.add(r3.dispose);
    let i3 = s3.current;
    if (i3 && e3.current !== "idle" && l2.current)
      return r3.dispose(), a2.current(e3.current), r3.add(M$1(i3, u2.current, e3.current === "enter", () => {
        r3.dispose(), c2.current(e3.current);
      })), r3.dispose;
  }, [n2]);
}
function S(t4 = "") {
  return t4.split(" ").filter((n2) => n2.trim().length > 1);
}
let _ = reactExports.createContext(null);
_.displayName = "TransitionContext";
var be = ((r3) => (r3.Visible = "visible", r3.Hidden = "hidden", r3))(be || {});
function Se() {
  let t4 = reactExports.useContext(_);
  if (t4 === null)
    throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t4;
}
function Ne() {
  let t4 = reactExports.useContext(M);
  if (t4 === null)
    throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t4;
}
let M = reactExports.createContext(null);
M.displayName = "NestingContext";
function U(t4) {
  return "children" in t4 ? U(t4.children) : t4.current.filter(({ el: n2 }) => n2.current !== null).filter(({ state: n2 }) => n2 === "visible").length > 0;
}
function oe(t4, n2) {
  let r3 = s$4(t4), s3 = reactExports.useRef([]), y2 = f$1(), D2 = p$2(), c2 = o$4((i3, e3 = j.Hidden) => {
    let a2 = s3.current.findIndex(({ el: o3 }) => o3 === i3);
    a2 !== -1 && (u$3(e3, { [j.Unmount]() {
      s3.current.splice(a2, 1);
    }, [j.Hidden]() {
      s3.current[a2].state = "hidden";
    } }), D2.microTask(() => {
      var o3;
      !U(s3) && y2.current && ((o3 = r3.current) == null || o3.call(r3));
    }));
  }), x2 = o$4((i3) => {
    let e3 = s3.current.find(({ el: a2 }) => a2 === i3);
    return e3 ? e3.state !== "visible" && (e3.state = "visible") : s3.current.push({ el: i3, state: "visible" }), () => c2(i3, j.Unmount);
  }), p2 = reactExports.useRef([]), h2 = reactExports.useRef(Promise.resolve()), u2 = reactExports.useRef({ enter: [], leave: [], idle: [] }), v2 = o$4((i3, e3, a2) => {
    p2.current.splice(0), n2 && (n2.chains.current[e3] = n2.chains.current[e3].filter(([o3]) => o3 !== i3)), n2 == null || n2.chains.current[e3].push([i3, new Promise((o3) => {
      p2.current.push(o3);
    })]), n2 == null || n2.chains.current[e3].push([i3, new Promise((o3) => {
      Promise.all(u2.current[e3].map(([f2, P2]) => P2)).then(() => o3());
    })]), e3 === "enter" ? h2.current = h2.current.then(() => n2 == null ? void 0 : n2.wait.current).then(() => a2(e3)) : a2(e3);
  }), d2 = o$4((i3, e3, a2) => {
    Promise.all(u2.current[e3].splice(0).map(([o3, f2]) => f2)).then(() => {
      var o3;
      (o3 = p2.current.shift()) == null || o3();
    }).then(() => a2(e3));
  });
  return reactExports.useMemo(() => ({ children: s3, register: x2, unregister: c2, onStart: v2, onStop: d2, wait: h2, chains: u2 }), [x2, c2, s3, v2, d2, u2, h2]);
}
function xe() {
}
let Pe = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function se(t4) {
  var r3;
  let n2 = {};
  for (let s3 of Pe)
    n2[s3] = (r3 = t4[s3]) != null ? r3 : xe;
  return n2;
}
function Re(t4) {
  let n2 = reactExports.useRef(se(t4));
  return reactExports.useEffect(() => {
    n2.current = se(t4);
  }, [t4]), n2;
}
let ye = "div", ae = S$2.RenderStrategy;
function De(t4, n2) {
  var K2, Q2;
  let { beforeEnter: r3, afterEnter: s3, beforeLeave: y2, afterLeave: D2, enter: c$22, enterFrom: x2, enterTo: p2, entered: h2, leave: u2, leaveFrom: v2, leaveTo: d2, ...i3 } = t4, e3 = reactExports.useRef(null), a2 = y$2(e3, n2), o3 = (K2 = i3.unmount) == null || K2 ? j.Unmount : j.Hidden, { show: f2, appear: P2, initial: T2 } = Se(), [l2, j$1] = reactExports.useState(f2 ? "visible" : "hidden"), q2 = Ne(), { register: O2, unregister: V2 } = q2;
  reactExports.useEffect(() => O2(e3), [O2, e3]), reactExports.useEffect(() => {
    if (o3 === j.Hidden && e3.current) {
      if (f2 && l2 !== "visible") {
        j$1("visible");
        return;
      }
      return u$3(l2, { ["hidden"]: () => V2(e3), ["visible"]: () => O2(e3) });
    }
  }, [l2, e3, O2, V2, f2, o3]);
  let k2 = s$4({ base: S(i3.className), enter: S(c$22), enterFrom: S(x2), enterTo: S(p2), entered: S(h2), leave: S(u2), leaveFrom: S(v2), leaveTo: S(d2) }), w2 = Re({ beforeEnter: r3, afterEnter: s3, beforeLeave: y2, afterLeave: D2 }), G2 = l$1();
  reactExports.useEffect(() => {
    if (G2 && l2 === "visible" && e3.current === null)
      throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [e3, l2, G2]);
  let ue2 = T2 && !P2, z2 = P2 && f2 && T2, Te2 = (() => !G2 || ue2 ? "idle" : f2 ? "enter" : "leave")(), H2 = c(0), de2 = o$4((g2) => u$3(g2, { enter: () => {
    H2.addFlag(d$2.Opening), w2.current.beforeEnter();
  }, leave: () => {
    H2.addFlag(d$2.Closing), w2.current.beforeLeave();
  }, idle: () => {
  } })), fe2 = o$4((g2) => u$3(g2, { enter: () => {
    H2.removeFlag(d$2.Opening), w2.current.afterEnter();
  }, leave: () => {
    H2.removeFlag(d$2.Closing), w2.current.afterLeave();
  }, idle: () => {
  } })), A2 = oe(() => {
    j$1("hidden"), V2(e3);
  }, q2);
  E({ immediate: z2, container: e3, classes: k2, direction: Te2, onStart: s$4((g2) => {
    A2.onStart(e3, g2, de2);
  }), onStop: s$4((g2) => {
    A2.onStop(e3, g2, fe2), g2 === "leave" && !U(A2) && (j$1("hidden"), V2(e3));
  }) });
  let R2 = i3, me2 = { ref: a2 };
  return z2 ? R2 = { ...R2, className: t$1(i3.className, ...k2.current.enter, ...k2.current.enterFrom) } : (R2.className = t$1(i3.className, (Q2 = e3.current) == null ? void 0 : Q2.className), R2.className === "" && delete R2.className), React.createElement(M.Provider, { value: A2 }, React.createElement(c$1, { value: u$3(l2, { ["visible"]: d$2.Open, ["hidden"]: d$2.Closed }) | H2.flags }, X({ ourProps: me2, theirProps: R2, defaultTag: ye, features: ae, visible: l2 === "visible", name: "Transition.Child" })));
}
function He(t4, n2) {
  let { show: r3, appear: s3 = false, unmount: y2 = true, ...D2 } = t4, c2 = reactExports.useRef(null), x2 = y$2(c2, n2);
  l$1();
  let p2 = C();
  if (r3 === void 0 && p2 !== null && (r3 = (p2 & d$2.Open) === d$2.Open), ![true, false].includes(r3))
    throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [h2, u2] = reactExports.useState(r3 ? "visible" : "hidden"), v2 = oe(() => {
    u2("hidden");
  }), [d2, i3] = reactExports.useState(true), e3 = reactExports.useRef([r3]);
  l$2(() => {
    d2 !== false && e3.current[e3.current.length - 1] !== r3 && (e3.current.push(r3), i3(false));
  }, [e3, r3]);
  let a2 = reactExports.useMemo(() => ({ show: r3, appear: s3, initial: d2 }), [r3, s3, d2]);
  reactExports.useEffect(() => {
    if (r3)
      u2("visible");
    else if (!U(v2))
      u2("hidden");
    else {
      let T2 = c2.current;
      if (!T2)
        return;
      let l2 = T2.getBoundingClientRect();
      l2.x === 0 && l2.y === 0 && l2.width === 0 && l2.height === 0 && u2("hidden");
    }
  }, [r3, v2]);
  let o3 = { unmount: y2 }, f2 = o$4(() => {
    var T2;
    d2 && i3(false), (T2 = t4.beforeEnter) == null || T2.call(t4);
  }), P2 = o$4(() => {
    var T2;
    d2 && i3(false), (T2 = t4.beforeLeave) == null || T2.call(t4);
  });
  return React.createElement(M.Provider, { value: v2 }, React.createElement(_.Provider, { value: a2 }, X({ ourProps: { ...o3, as: reactExports.Fragment, children: React.createElement(le, { ref: x2, ...o3, ...D2, beforeEnter: f2, beforeLeave: P2 }) }, theirProps: {}, defaultTag: reactExports.Fragment, features: ae, visible: h2 === "visible", name: "Transition" })));
}
function Fe(t4, n2) {
  let r3 = reactExports.useContext(_) !== null, s3 = C() !== null;
  return React.createElement(React.Fragment, null, !r3 && s3 ? React.createElement(W, { ref: n2, ...t4 }) : React.createElement(le, { ref: n2, ...t4 }));
}
let W = D(He), le = D(De), Le = D(Fe), tt = Object.assign(W, { Child: Le, Root: W });
const MySwitch = ({ switchColor, enabled, setEnabled }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Ge,
    {
      checked: enabled,
      onChange: setEnabled,
      className: `${enabled ? switchColor : "bg-gray-200"}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Use setting" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": "true",
            className: `${enabled ? "translate-x-5" : "translate-x-0"}
             pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-2xl ring-0 transition duration-200 ease-in-out`
          }
        )
      ]
    }
  ) });
};
const useMouseStore = create(
  (set2) => ({
    isMouseDown: true,
    setMouseDown: (down) => set2(() => ({
      isMouseDown: down
    }))
  })
);
const DiscreteRange = ({ options: options2, value, setValue, bgColor }) => {
  const [opColors, setOpColors] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const res = [];
    for (let i3 = 0; i3 < options2.length; i3++) {
      res.push({
        index: i3,
        option: options2[i3],
        // only render color when div is in selected range
        inRange: value !== void 0 && options2[i3].value <= value
      });
    }
    setOpColors(res);
    return () => {
      setOpColors([]);
    };
  }, [options2, bgColor, value, setValue]);
  const handleMouseLeaveFirstElement = (event) => {
    if (useMouseStore.getState().isMouseDown) {
      event.currentTarget.getBoundingClientRect();
    }
  };
  const handleMouseEnterChild = (oc2) => {
    if (useMouseStore.getState().isMouseDown) {
      setValue(oc2.option.value);
    }
  };
  const handleMouseDownChild = (oc2) => {
    setValue(oc2.option.value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-grow items-center divide-x h-full bg-white", children: opColors.map(
    (oc2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center items-center w-full " + (oc2.inRange ? bgColor : ""),
        onMouseLeave: oc2.index == 0 ? handleMouseLeaveFirstElement : () => {
        },
        onMouseDown: () => handleMouseDownChild(oc2),
        onMouseEnter: () => handleMouseEnterChild(oc2),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose text-center px-0.5  " + (oc2.inRange ? "text-equal-100" : ""), children: oc2.option.mark })
      },
      oc2.index
    )
  ) });
};
function CheckIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$1 = reactExports.forwardRef(CheckIcon);
const CheckIcon$1 = ForwardRef$1;
function ChevronUpDownIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = reactExports.forwardRef(ChevronUpDownIcon);
const ChevronUpDownIcon$1 = ForwardRef;
function ListBox() {
  const [selected, setSelected] = reactExports.useState(options[3]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Nt, { value: selected, onChange: setSelected, children: ({ open }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Nt.Button,
      {
        className: "relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm sm:leading-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 block truncate", children: selected.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUpDownIcon$1, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      tt,
      {
        show: open,
        as: reactExports.Fragment,
        leave: "transition ease-in duration-100",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Nt.Options,
          {
            className: "absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
            children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Nt.Option,
              {
                value: option,
                className: ({ active }) => joinClassNames(
                  active ? "bg-blue-600 text-white" : "text-gray-900",
                  "relative cursor-default select-none py-0.5 pl-3 pr-0.5"
                ),
                children: ({ selected: selected2, active }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  selected2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon$1, { className: joinClassNames(
                    active ? "text-white" : "text-gray-900",
                    "absolute inset-x-0 left-0 h-5 w-5"
                  ), "aria-hidden": "true" }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: joinClassNames(selected2 ? "font-semibold" : "font-normal", "flex justify-between w-full items-center ml-3 truncate"),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "", children: option.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center gap-1 ", children: option.tags.map(
                          (tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "bg-gray-400 text-white rounded-full px-1 text-xs",
                              children: tag
                            }
                          )
                        ) })
                      ]
                    }
                  ) })
                ] })
              },
              option.id
            ))
          }
        )
      }
    )
  ] }) });
}
const options = [
  {
    id: 1,
    name: "Wade Cooper",
    tags: ["male", "US"]
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    tags: ["male", "US"]
  },
  {
    id: 3,
    name: "Devon Webb",
    tags: ["female", "GB"]
  },
  {
    id: 4,
    name: "Tom Cook",
    tags: ["female", "GB"]
  },
  {
    id: 5,
    name: "Tanya Fox",
    tags: ["female", "GB"]
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    tags: ["female", "GB"]
  },
  {
    id: 7,
    name: "Caroline Schultz",
    tags: ["female", "GB"]
  },
  {
    id: 8,
    name: "Mason Heaney",
    tags: []
  },
  {
    id: 9,
    name: "Claudie Smitham",
    tags: ["female", "GB", "warm"]
  },
  {
    id: 10,
    name: "Emil Schaefer",
    tags: ["female", "GB"]
  }
];
const Setting = () => {
  const historyEnabled = useSettingStore((state) => state.historyEnabled);
  const setHistoryEnabled = useSettingStore((state) => state.setHistoryEnabled);
  const maxHistory = useSettingStore((state) => state.maxHistory);
  const setMaxHistory = useSettingStore((state) => state.setMaxHistory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full items-end justify-center gap-5 p-1 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full items-center justify-between gap-2 px-3 pt-2 pb-4 rounded-lg bg-blue-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose text-lg text-equal-600", children: "LLM" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-white rounded-lg w-full px-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose", children: "Send History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MySwitch, { enabled: historyEnabled, setEnabled: setHistoryEnabled, switchColor: "bg-blue-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-full w-full overflow-hidden " + (historyEnabled ? "" : "hidden"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        DiscreteRange,
        {
          options: historyOptions,
          setValue: setMaxHistory,
          value: maxHistory,
          bgColor: "bg-blue-600"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-white rounded-lg w-full px-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose", children: "Model" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full ml-3 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListBox, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full items-center justify-between gap-2 px-3 pt-2 pb-4 rounded-lg bg-blue-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose text-lg text-equal-600", children: "Text to Speech" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center bg-white rounded-lg w-full px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose", children: "Language" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center bg-white rounded-lg w-full px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose", children: "Speed" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
  ] });
};
function App() {
  const isRecording = useRecorderStore((state) => state.isRecording);
  const recorder = useRecorderStore((state) => state.recorder);
  const incrRecordDuration = useRecorderStore((state) => state.incrDuration);
  const setRecordDuration = useRecorderStore((state) => state.setDuration);
  const [spacePressed, setSpacePressed] = reactExports.useState(false);
  const spacePressedRef = reactExports.useRef(spacePressed);
  const setMouseDown = useMouseStore((state) => state.setMouseDown);
  reactExports.useEffect(() => {
    if (isRecording) {
      setRecordDuration(0);
    }
    const interval = setInterval(() => {
      incrRecordDuration(50);
    }, 50);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);
  reactExports.useEffect(() => {
    spacePressedRef.current = spacePressed;
  }, [spacePressed]);
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      console.debug("handleKeyDown", event.code);
      if (event.code === "Space") {
        if (event.repeat) {
          console.debug("handleKeyDown skip repeated space");
          return;
        }
        setSpacePressed(true);
        recorder.start().catch((e3) => {
          console.error("failed to start recorder", e3);
        });
      } else {
        if (spacePressedRef.current) {
          recorder.cancel();
        }
      }
    };
    const handleKeyUp = (event) => {
      console.debug("handleKeyUp", event.code);
      if (event.code == "Space") {
        setSpacePressed(false);
        recorder.done();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", () => setMouseDown(true));
    window.addEventListener("mouseup", () => setMouseDown(false));
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center h-screen w-screen overflow-hidden divide-x bg-equal-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center max-w-4xl w-full h-full rounded-l-lg justify-between gap-1 p-2 bg-white",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageList, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center w-full mt-auto bottom-0 backdrop-blur bg-opacity-75",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center w-full mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Recorder, {}) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SSE, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Workers, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-end h-full max-w-1/4 w-full rounded-r-lg bg-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Setting, {}) })
  ] });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
