var Pr = Object.defineProperty;
var jr = (A, I, _) => I in A ? Pr(A, I, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : A[I] = _;
var Yt = (A, I, _) => (jr(A, typeof I != "symbol" ? I + "" : I, _), _);
var Ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xn(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
var dr = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function(A, I) {
  (function(h, v) {
    A.exports = v();
  })(typeof self < "u" ? self : Ft, function() {
    return (
      /******/
      function(_) {
        var h = {};
        function v(g) {
          if (h[g])
            return h[g].exports;
          var b = h[g] = {
            /******/
            i: g,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return _[g].call(b.exports, b, b.exports, v), b.l = !0, b.exports;
        }
        return v.m = _, v.c = h, v.d = function(g, b, p) {
          v.o(g, b) || Object.defineProperty(g, b, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: p
            /******/
          });
        }, v.n = function(g) {
          var b = g && g.__esModule ? (
            /******/
            function() {
              return g.default;
            }
          ) : (
            /******/
            function() {
              return g;
            }
          );
          return v.d(b, "a", b), b;
        }, v.o = function(g, b) {
          return Object.prototype.hasOwnProperty.call(g, b);
        }, v.p = "", v(v.s = 109);
      }([
        /* 0 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(17), b = v(18), p = v(19), f = v(45), d = v(46), u = v(47), n = v(48), t = v(49), e = v(12), o = v(32), l = v(33), i = v(31), r = v(1), a = {
            Scope: r.Scope,
            create: r.create,
            find: r.find,
            query: r.query,
            register: r.register,
            Container: g.default,
            Format: b.default,
            Leaf: p.default,
            Embed: n.default,
            Scroll: f.default,
            Block: u.default,
            Inline: d.default,
            Text: t.default,
            Attributor: {
              Attribute: e.default,
              Class: o.default,
              Style: l.default,
              Store: i.default
            }
          };
          h.default = a;
        },
        /* 1 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
              r.__proto__ = a;
            } || function(r, a) {
              for (var c in a)
                a.hasOwnProperty(c) && (r[c] = a[c]);
            };
            return function(r, a) {
              i(r, a);
              function c() {
                this.constructor = r;
              }
              r.prototype = a === null ? Object.create(a) : (c.prototype = a.prototype, new c());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = (
            /** @class */
            function(i) {
              g(r, i);
              function r(a) {
                var c = this;
                return a = "[Parchment] " + a, c = i.call(this, a) || this, c.message = a, c.name = c.constructor.name, c;
              }
              return r;
            }(Error)
          );
          h.ParchmentError = b;
          var p = {}, f = {}, d = {}, u = {};
          h.DATA_KEY = "__blot";
          var n;
          (function(i) {
            i[i.TYPE = 3] = "TYPE", i[i.LEVEL = 12] = "LEVEL", i[i.ATTRIBUTE = 13] = "ATTRIBUTE", i[i.BLOT = 14] = "BLOT", i[i.INLINE = 7] = "INLINE", i[i.BLOCK = 11] = "BLOCK", i[i.BLOCK_BLOT = 10] = "BLOCK_BLOT", i[i.INLINE_BLOT = 6] = "INLINE_BLOT", i[i.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", i[i.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", i[i.ANY = 15] = "ANY";
          })(n = h.Scope || (h.Scope = {}));
          function t(i, r) {
            var a = o(i);
            if (a == null)
              throw new b("Unable to create " + i + " blot");
            var c = a, s = (
              // @ts-ignore
              i instanceof Node || i.nodeType === Node.TEXT_NODE ? i : c.create(r)
            );
            return new c(s, r);
          }
          h.create = t;
          function e(i, r) {
            return r === void 0 && (r = !1), i == null ? null : i[h.DATA_KEY] != null ? i[h.DATA_KEY].blot : r ? e(i.parentNode, r) : null;
          }
          h.find = e;
          function o(i, r) {
            r === void 0 && (r = n.ANY);
            var a;
            if (typeof i == "string")
              a = u[i] || p[i];
            else if (i instanceof Text || i.nodeType === Node.TEXT_NODE)
              a = u.text;
            else if (typeof i == "number")
              i & n.LEVEL & n.BLOCK ? a = u.block : i & n.LEVEL & n.INLINE && (a = u.inline);
            else if (i instanceof HTMLElement) {
              var c = (i.getAttribute("class") || "").split(/\s+/);
              for (var s in c)
                if (a = f[c[s]], a)
                  break;
              a = a || d[i.tagName];
            }
            return a == null ? null : r & n.LEVEL & a.scope && r & n.TYPE & a.scope ? a : null;
          }
          h.query = o;
          function l() {
            for (var i = [], r = 0; r < arguments.length; r++)
              i[r] = arguments[r];
            if (i.length > 1)
              return i.map(function(s) {
                return l(s);
              });
            var a = i[0];
            if (typeof a.blotName != "string" && typeof a.attrName != "string")
              throw new b("Invalid definition");
            if (a.blotName === "abstract")
              throw new b("Cannot register abstract class");
            if (u[a.blotName || a.attrName] = a, typeof a.keyName == "string")
              p[a.keyName] = a;
            else if (a.className != null && (f[a.className] = a), a.tagName != null) {
              Array.isArray(a.tagName) ? a.tagName = a.tagName.map(function(s) {
                return s.toUpperCase();
              }) : a.tagName = a.tagName.toUpperCase();
              var c = Array.isArray(a.tagName) ? a.tagName : [a.tagName];
              c.forEach(function(s) {
                (d[s] == null || a.className == null) && (d[s] = a);
              });
            }
            return a;
          }
          h.register = l;
        },
        /* 2 */
        /***/
        function(_, h, v) {
          var g = v(51), b = v(11), p = v(3), f = v(20), d = "\0", u = function(n) {
            Array.isArray(n) ? this.ops = n : n != null && Array.isArray(n.ops) ? this.ops = n.ops : this.ops = [];
          };
          u.prototype.insert = function(n, t) {
            var e = {};
            return n.length === 0 ? this : (e.insert = n, t != null && typeof t == "object" && Object.keys(t).length > 0 && (e.attributes = t), this.push(e));
          }, u.prototype.delete = function(n) {
            return n <= 0 ? this : this.push({ delete: n });
          }, u.prototype.retain = function(n, t) {
            if (n <= 0)
              return this;
            var e = { retain: n };
            return t != null && typeof t == "object" && Object.keys(t).length > 0 && (e.attributes = t), this.push(e);
          }, u.prototype.push = function(n) {
            var t = this.ops.length, e = this.ops[t - 1];
            if (n = p(!0, {}, n), typeof e == "object") {
              if (typeof n.delete == "number" && typeof e.delete == "number")
                return this.ops[t - 1] = { delete: e.delete + n.delete }, this;
              if (typeof e.delete == "number" && n.insert != null && (t -= 1, e = this.ops[t - 1], typeof e != "object"))
                return this.ops.unshift(n), this;
              if (b(n.attributes, e.attributes)) {
                if (typeof n.insert == "string" && typeof e.insert == "string")
                  return this.ops[t - 1] = { insert: e.insert + n.insert }, typeof n.attributes == "object" && (this.ops[t - 1].attributes = n.attributes), this;
                if (typeof n.retain == "number" && typeof e.retain == "number")
                  return this.ops[t - 1] = { retain: e.retain + n.retain }, typeof n.attributes == "object" && (this.ops[t - 1].attributes = n.attributes), this;
              }
            }
            return t === this.ops.length ? this.ops.push(n) : this.ops.splice(t, 0, n), this;
          }, u.prototype.chop = function() {
            var n = this.ops[this.ops.length - 1];
            return n && n.retain && !n.attributes && this.ops.pop(), this;
          }, u.prototype.filter = function(n) {
            return this.ops.filter(n);
          }, u.prototype.forEach = function(n) {
            this.ops.forEach(n);
          }, u.prototype.map = function(n) {
            return this.ops.map(n);
          }, u.prototype.partition = function(n) {
            var t = [], e = [];
            return this.forEach(function(o) {
              var l = n(o) ? t : e;
              l.push(o);
            }), [t, e];
          }, u.prototype.reduce = function(n, t) {
            return this.ops.reduce(n, t);
          }, u.prototype.changeLength = function() {
            return this.reduce(function(n, t) {
              return t.insert ? n + f.length(t) : t.delete ? n - t.delete : n;
            }, 0);
          }, u.prototype.length = function() {
            return this.reduce(function(n, t) {
              return n + f.length(t);
            }, 0);
          }, u.prototype.slice = function(n, t) {
            n = n || 0, typeof t != "number" && (t = 1 / 0);
            for (var e = [], o = f.iterator(this.ops), l = 0; l < t && o.hasNext(); ) {
              var i;
              l < n ? i = o.next(n - l) : (i = o.next(t - l), e.push(i)), l += f.length(i);
            }
            return new u(e);
          }, u.prototype.compose = function(n) {
            var t = f.iterator(this.ops), e = f.iterator(n.ops), o = [], l = e.peek();
            if (l != null && typeof l.retain == "number" && l.attributes == null) {
              for (var i = l.retain; t.peekType() === "insert" && t.peekLength() <= i; )
                i -= t.peekLength(), o.push(t.next());
              l.retain - i > 0 && e.next(l.retain - i);
            }
            for (var r = new u(o); t.hasNext() || e.hasNext(); )
              if (e.peekType() === "insert")
                r.push(e.next());
              else if (t.peekType() === "delete")
                r.push(t.next());
              else {
                var a = Math.min(t.peekLength(), e.peekLength()), c = t.next(a), s = e.next(a);
                if (typeof s.retain == "number") {
                  var y = {};
                  typeof c.retain == "number" ? y.retain = a : y.insert = c.insert;
                  var E = f.attributes.compose(c.attributes, s.attributes, typeof c.retain == "number");
                  if (E && (y.attributes = E), r.push(y), !e.hasNext() && b(r.ops[r.ops.length - 1], y)) {
                    var O = new u(t.rest());
                    return r.concat(O).chop();
                  }
                } else
                  typeof s.delete == "number" && typeof c.retain == "number" && r.push(s);
              }
            return r.chop();
          }, u.prototype.concat = function(n) {
            var t = new u(this.ops.slice());
            return n.ops.length > 0 && (t.push(n.ops[0]), t.ops = t.ops.concat(n.ops.slice(1))), t;
          }, u.prototype.diff = function(n, t) {
            if (this.ops === n.ops)
              return new u();
            var e = [this, n].map(function(a) {
              return a.map(function(c) {
                if (c.insert != null)
                  return typeof c.insert == "string" ? c.insert : d;
                var s = a === n ? "on" : "with";
                throw new Error("diff() called " + s + " non-document");
              }).join("");
            }), o = new u(), l = g(e[0], e[1], t), i = f.iterator(this.ops), r = f.iterator(n.ops);
            return l.forEach(function(a) {
              for (var c = a[1].length; c > 0; ) {
                var s = 0;
                switch (a[0]) {
                  case g.INSERT:
                    s = Math.min(r.peekLength(), c), o.push(r.next(s));
                    break;
                  case g.DELETE:
                    s = Math.min(c, i.peekLength()), i.next(s), o.delete(s);
                    break;
                  case g.EQUAL:
                    s = Math.min(i.peekLength(), r.peekLength(), c);
                    var y = i.next(s), E = r.next(s);
                    b(y.insert, E.insert) ? o.retain(s, f.attributes.diff(y.attributes, E.attributes)) : o.push(E).delete(s);
                    break;
                }
                c -= s;
              }
            }), o.chop();
          }, u.prototype.eachLine = function(n, t) {
            t = t || `
`;
            for (var e = f.iterator(this.ops), o = new u(), l = 0; e.hasNext(); ) {
              if (e.peekType() !== "insert")
                return;
              var i = e.peek(), r = f.length(i) - e.peekLength(), a = typeof i.insert == "string" ? i.insert.indexOf(t, r) - r : -1;
              if (a < 0)
                o.push(e.next());
              else if (a > 0)
                o.push(e.next(a));
              else {
                if (n(o, e.next(1).attributes || {}, l) === !1)
                  return;
                l += 1, o = new u();
              }
            }
            o.length() > 0 && n(o, {}, l);
          }, u.prototype.transform = function(n, t) {
            if (t = !!t, typeof n == "number")
              return this.transformPosition(n, t);
            for (var e = f.iterator(this.ops), o = f.iterator(n.ops), l = new u(); e.hasNext() || o.hasNext(); )
              if (e.peekType() === "insert" && (t || o.peekType() !== "insert"))
                l.retain(f.length(e.next()));
              else if (o.peekType() === "insert")
                l.push(o.next());
              else {
                var i = Math.min(e.peekLength(), o.peekLength()), r = e.next(i), a = o.next(i);
                if (r.delete)
                  continue;
                a.delete ? l.push(a) : l.retain(i, f.attributes.transform(r.attributes, a.attributes, t));
              }
            return l.chop();
          }, u.prototype.transformPosition = function(n, t) {
            t = !!t;
            for (var e = f.iterator(this.ops), o = 0; e.hasNext() && o <= n; ) {
              var l = e.peekLength(), i = e.peekType();
              if (e.next(), i === "delete") {
                n -= Math.min(l, n - o);
                continue;
              } else
                i === "insert" && (o < n || !t) && (n += l);
              o += l;
            }
            return n;
          }, _.exports = u;
        },
        /* 3 */
        /***/
        function(_, h) {
          var v = Object.prototype.hasOwnProperty, g = Object.prototype.toString, b = Object.defineProperty, p = Object.getOwnPropertyDescriptor, f = function(e) {
            return typeof Array.isArray == "function" ? Array.isArray(e) : g.call(e) === "[object Array]";
          }, d = function(e) {
            if (!e || g.call(e) !== "[object Object]")
              return !1;
            var o = v.call(e, "constructor"), l = e.constructor && e.constructor.prototype && v.call(e.constructor.prototype, "isPrototypeOf");
            if (e.constructor && !o && !l)
              return !1;
            var i;
            for (i in e)
              ;
            return typeof i > "u" || v.call(e, i);
          }, u = function(e, o) {
            b && o.name === "__proto__" ? b(e, o.name, {
              enumerable: !0,
              configurable: !0,
              value: o.newValue,
              writable: !0
            }) : e[o.name] = o.newValue;
          }, n = function(e, o) {
            if (o === "__proto__")
              if (v.call(e, o)) {
                if (p)
                  return p(e, o).value;
              } else
                return;
            return e[o];
          };
          _.exports = function t() {
            var e, o, l, i, r, a, c = arguments[0], s = 1, y = arguments.length, E = !1;
            for (typeof c == "boolean" && (E = c, c = arguments[1] || {}, s = 2), (c == null || typeof c != "object" && typeof c != "function") && (c = {}); s < y; ++s)
              if (e = arguments[s], e != null)
                for (o in e)
                  l = n(c, o), i = n(e, o), c !== i && (E && i && (d(i) || (r = f(i))) ? (r ? (r = !1, a = l && f(l) ? l : []) : a = l && d(l) ? l : {}, u(c, { name: o, newValue: t(E, a, i) })) : typeof i < "u" && u(c, { name: o, newValue: i }));
            return c;
          };
        },
        /* 4 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.BlockEmbed = h.bubbleFormats = void 0;
          var g = /* @__PURE__ */ function() {
            function w(T, k) {
              for (var j = 0; j < k.length; j++) {
                var D = k[j];
                D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(T, D.key, D);
              }
            }
            return function(T, k, j) {
              return k && w(T.prototype, k), j && w(T, j), T;
            };
          }(), b = function w(T, k, j) {
            T === null && (T = Function.prototype);
            var D = Object.getOwnPropertyDescriptor(T, k);
            if (D === void 0) {
              var z = Object.getPrototypeOf(T);
              return z === null ? void 0 : w(z, k, j);
            } else {
              if ("value" in D)
                return D.value;
              var $ = D.get;
              return $ === void 0 ? void 0 : $.call(j);
            }
          }, p = v(3), f = c(p), d = v(2), u = c(d), n = v(0), t = c(n), e = v(16), o = c(e), l = v(6), i = c(l), r = v(7), a = c(r);
          function c(w) {
            return w && w.__esModule ? w : { default: w };
          }
          function s(w, T) {
            if (!(w instanceof T))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(w, T) {
            if (!w)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return T && (typeof T == "object" || typeof T == "function") ? T : w;
          }
          function E(w, T) {
            if (typeof T != "function" && T !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof T);
            w.prototype = Object.create(T && T.prototype, { constructor: { value: w, enumerable: !1, writable: !0, configurable: !0 } }), T && (Object.setPrototypeOf ? Object.setPrototypeOf(w, T) : w.__proto__ = T);
          }
          var O = 1, N = function(w) {
            E(T, w);
            function T() {
              return s(this, T), y(this, (T.__proto__ || Object.getPrototypeOf(T)).apply(this, arguments));
            }
            return g(T, [{
              key: "attach",
              value: function() {
                b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "attach", this).call(this), this.attributes = new t.default.Attributor.Store(this.domNode);
              }
            }, {
              key: "delta",
              value: function() {
                return new u.default().insert(this.value(), (0, f.default)(this.formats(), this.attributes.values()));
              }
            }, {
              key: "format",
              value: function(j, D) {
                var z = t.default.query(j, t.default.Scope.BLOCK_ATTRIBUTE);
                z != null && this.attributes.attribute(z, D);
              }
            }, {
              key: "formatAt",
              value: function(j, D, z, $) {
                this.format(z, $);
              }
            }, {
              key: "insertAt",
              value: function(j, D, z) {
                if (typeof D == "string" && D.endsWith(`
`)) {
                  var $ = t.default.create(P.blotName);
                  this.parent.insertBefore($, j === 0 ? this : this.next), $.insertAt(0, D.slice(0, -1));
                } else
                  b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "insertAt", this).call(this, j, D, z);
              }
            }]), T;
          }(t.default.Embed);
          N.scope = t.default.Scope.BLOCK_BLOT;
          var P = function(w) {
            E(T, w);
            function T(k) {
              s(this, T);
              var j = y(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, k));
              return j.cache = {}, j;
            }
            return g(T, [{
              key: "delta",
              value: function() {
                return this.cache.delta == null && (this.cache.delta = this.descendants(t.default.Leaf).reduce(function(j, D) {
                  return D.length() === 0 ? j : j.insert(D.value(), x(D));
                }, new u.default()).insert(`
`, x(this))), this.cache.delta;
              }
            }, {
              key: "deleteAt",
              value: function(j, D) {
                b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "deleteAt", this).call(this, j, D), this.cache = {};
              }
            }, {
              key: "formatAt",
              value: function(j, D, z, $) {
                D <= 0 || (t.default.query(z, t.default.Scope.BLOCK) ? j + D === this.length() && this.format(z, $) : b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "formatAt", this).call(this, j, Math.min(D, this.length() - j - 1), z, $), this.cache = {});
              }
            }, {
              key: "insertAt",
              value: function(j, D, z) {
                if (z != null)
                  return b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "insertAt", this).call(this, j, D, z);
                if (D.length !== 0) {
                  var $ = D.split(`
`), J = $.shift();
                  J.length > 0 && (j < this.length() - 1 || this.children.tail == null ? b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "insertAt", this).call(this, Math.min(j, this.length() - 1), J) : this.children.tail.insertAt(this.children.tail.length(), J), this.cache = {});
                  var H = this;
                  $.reduce(function(M, S) {
                    return H = H.split(M, !0), H.insertAt(0, S), S.length;
                  }, j + J.length);
                }
              }
            }, {
              key: "insertBefore",
              value: function(j, D) {
                var z = this.children.head;
                b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "insertBefore", this).call(this, j, D), z instanceof o.default && z.remove(), this.cache = {};
              }
            }, {
              key: "length",
              value: function() {
                return this.cache.length == null && (this.cache.length = b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "length", this).call(this) + O), this.cache.length;
              }
            }, {
              key: "moveChildren",
              value: function(j, D) {
                b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "moveChildren", this).call(this, j, D), this.cache = {};
              }
            }, {
              key: "optimize",
              value: function(j) {
                b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "optimize", this).call(this, j), this.cache = {};
              }
            }, {
              key: "path",
              value: function(j) {
                return b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "path", this).call(this, j, !0);
              }
            }, {
              key: "removeChild",
              value: function(j) {
                b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "removeChild", this).call(this, j), this.cache = {};
              }
            }, {
              key: "split",
              value: function(j) {
                var D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (D && (j === 0 || j >= this.length() - O)) {
                  var z = this.clone();
                  return j === 0 ? (this.parent.insertBefore(z, this), this) : (this.parent.insertBefore(z, this.next), z);
                } else {
                  var $ = b(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "split", this).call(this, j, D);
                  return this.cache = {}, $;
                }
              }
            }]), T;
          }(t.default.Block);
          P.blotName = "block", P.tagName = "P", P.defaultChild = "break", P.allowedChildren = [i.default, t.default.Embed, a.default];
          function x(w) {
            var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return w == null || (typeof w.formats == "function" && (T = (0, f.default)(T, w.formats())), w.parent == null || w.parent.blotName == "scroll" || w.parent.statics.scope !== w.statics.scope) ? T : x(w.parent, T);
          }
          h.bubbleFormats = x, h.BlockEmbed = N, h.default = P;
        },
        /* 5 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.overload = h.expandConfig = void 0;
          var g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(H) {
            return typeof H;
          } : function(H) {
            return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
          }, b = /* @__PURE__ */ function() {
            function H(M, S) {
              var q = [], B = !0, K = !1, U = void 0;
              try {
                for (var R = M[Symbol.iterator](), F; !(B = (F = R.next()).done) && (q.push(F.value), !(S && q.length === S)); B = !0)
                  ;
              } catch (W) {
                K = !0, U = W;
              } finally {
                try {
                  !B && R.return && R.return();
                } finally {
                  if (K)
                    throw U;
                }
              }
              return q;
            }
            return function(M, S) {
              if (Array.isArray(M))
                return M;
              if (Symbol.iterator in Object(M))
                return H(M, S);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), p = /* @__PURE__ */ function() {
            function H(M, S) {
              for (var q = 0; q < S.length; q++) {
                var B = S[q];
                B.enumerable = B.enumerable || !1, B.configurable = !0, "value" in B && (B.writable = !0), Object.defineProperty(M, B.key, B);
              }
            }
            return function(M, S, q) {
              return S && H(M.prototype, S), q && H(M, q), M;
            };
          }();
          v(50);
          var f = v(2), d = x(f), u = v(14), n = x(u), t = v(8), e = x(t), o = v(9), l = x(o), i = v(0), r = x(i), a = v(15), c = x(a), s = v(3), y = x(s), E = v(10), O = x(E), N = v(34), P = x(N);
          function x(H) {
            return H && H.__esModule ? H : { default: H };
          }
          function w(H, M, S) {
            return M in H ? Object.defineProperty(H, M, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : H[M] = S, H;
          }
          function T(H, M) {
            if (!(H instanceof M))
              throw new TypeError("Cannot call a class as a function");
          }
          var k = (0, O.default)("quill"), j = function() {
            p(H, null, [{
              key: "debug",
              value: function(S) {
                S === !0 && (S = "log"), O.default.level(S);
              }
            }, {
              key: "find",
              value: function(S) {
                return S.__quill || r.default.find(S);
              }
            }, {
              key: "import",
              value: function(S) {
                return this.imports[S] == null && k.error("Cannot import " + S + ". Are you sure it was registered?"), this.imports[S];
              }
            }, {
              key: "register",
              value: function(S, q) {
                var B = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                if (typeof S != "string") {
                  var U = S.attrName || S.blotName;
                  typeof U == "string" ? this.register("formats/" + U, S, q) : Object.keys(S).forEach(function(R) {
                    B.register(R, S[R], q);
                  });
                } else
                  this.imports[S] != null && !K && k.warn("Overwriting " + S + " with", q), this.imports[S] = q, (S.startsWith("blots/") || S.startsWith("formats/")) && q.blotName !== "abstract" ? r.default.register(q) : S.startsWith("modules") && typeof q.register == "function" && q.register();
              }
            }]);
            function H(M) {
              var S = this, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (T(this, H), this.options = D(M, q), this.container = this.options.container, this.container == null)
                return k.error("Invalid Quill container", M);
              this.options.debug && H.debug(this.options.debug);
              var B = this.container.innerHTML.trim();
              this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new e.default(), this.scroll = r.default.create(this.root, {
                emitter: this.emitter,
                whitelist: this.options.formats
              }), this.editor = new n.default(this.scroll), this.selection = new c.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(e.default.events.EDITOR_CHANGE, function(U) {
                U === e.default.events.TEXT_CHANGE && S.root.classList.toggle("ql-blank", S.editor.isBlank());
              }), this.emitter.on(e.default.events.SCROLL_UPDATE, function(U, R) {
                var F = S.selection.lastRange, W = F && F.length === 0 ? F.index : void 0;
                z.call(S, function() {
                  return S.editor.update(null, R, W);
                }, U);
              });
              var K = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + B + "<p><br></p></div>");
              this.setContents(K), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
            }
            return p(H, [{
              key: "addContainer",
              value: function(S) {
                var q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (typeof S == "string") {
                  var B = S;
                  S = document.createElement("div"), S.classList.add(B);
                }
                return this.container.insertBefore(S, q), S;
              }
            }, {
              key: "blur",
              value: function() {
                this.selection.setRange(null);
              }
            }, {
              key: "deleteText",
              value: function(S, q, B) {
                var K = this, U = $(S, q, B), R = b(U, 4);
                return S = R[0], q = R[1], B = R[3], z.call(this, function() {
                  return K.editor.deleteText(S, q);
                }, B, S, -1 * q);
              }
            }, {
              key: "disable",
              value: function() {
                this.enable(!1);
              }
            }, {
              key: "enable",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.scroll.enable(S), this.container.classList.toggle("ql-disabled", !S);
              }
            }, {
              key: "focus",
              value: function() {
                var S = this.scrollingContainer.scrollTop;
                this.selection.focus(), this.scrollingContainer.scrollTop = S, this.scrollIntoView();
              }
            }, {
              key: "format",
              value: function(S, q) {
                var B = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.default.sources.API;
                return z.call(this, function() {
                  var U = B.getSelection(!0), R = new d.default();
                  if (U == null)
                    return R;
                  if (r.default.query(S, r.default.Scope.BLOCK))
                    R = B.editor.formatLine(U.index, U.length, w({}, S, q));
                  else {
                    if (U.length === 0)
                      return B.selection.format(S, q), R;
                    R = B.editor.formatText(U.index, U.length, w({}, S, q));
                  }
                  return B.setSelection(U, e.default.sources.SILENT), R;
                }, K);
              }
            }, {
              key: "formatLine",
              value: function(S, q, B, K, U) {
                var R = this, F = void 0, W = $(S, q, B, K, U), G = b(W, 4);
                return S = G[0], q = G[1], F = G[2], U = G[3], z.call(this, function() {
                  return R.editor.formatLine(S, q, F);
                }, U, S, 0);
              }
            }, {
              key: "formatText",
              value: function(S, q, B, K, U) {
                var R = this, F = void 0, W = $(S, q, B, K, U), G = b(W, 4);
                return S = G[0], q = G[1], F = G[2], U = G[3], z.call(this, function() {
                  return R.editor.formatText(S, q, F);
                }, U, S, 0);
              }
            }, {
              key: "getBounds",
              value: function(S) {
                var q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, B = void 0;
                typeof S == "number" ? B = this.selection.getBounds(S, q) : B = this.selection.getBounds(S.index, S.length);
                var K = this.container.getBoundingClientRect();
                return {
                  bottom: B.bottom - K.top,
                  height: B.height,
                  left: B.left - K.left,
                  right: B.right - K.left,
                  top: B.top - K.top,
                  width: B.width
                };
              }
            }, {
              key: "getContents",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - S, B = $(S, q), K = b(B, 2);
                return S = K[0], q = K[1], this.editor.getContents(S, q);
              }
            }, {
              key: "getFormat",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                return typeof S == "number" ? this.editor.getFormat(S, q) : this.editor.getFormat(S.index, S.length);
              }
            }, {
              key: "getIndex",
              value: function(S) {
                return S.offset(this.scroll);
              }
            }, {
              key: "getLength",
              value: function() {
                return this.scroll.length();
              }
            }, {
              key: "getLeaf",
              value: function(S) {
                return this.scroll.leaf(S);
              }
            }, {
              key: "getLine",
              value: function(S) {
                return this.scroll.line(S);
              }
            }, {
              key: "getLines",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
                return typeof S != "number" ? this.scroll.lines(S.index, S.length) : this.scroll.lines(S, q);
              }
            }, {
              key: "getModule",
              value: function(S) {
                return this.theme.modules[S];
              }
            }, {
              key: "getSelection",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return S && this.focus(), this.update(), this.selection.getRange()[0];
              }
            }, {
              key: "getText",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - S, B = $(S, q), K = b(B, 2);
                return S = K[0], q = K[1], this.editor.getText(S, q);
              }
            }, {
              key: "hasFocus",
              value: function() {
                return this.selection.hasFocus();
              }
            }, {
              key: "insertEmbed",
              value: function(S, q, B) {
                var K = this, U = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : H.sources.API;
                return z.call(this, function() {
                  return K.editor.insertEmbed(S, q, B);
                }, U, S);
              }
            }, {
              key: "insertText",
              value: function(S, q, B, K, U) {
                var R = this, F = void 0, W = $(S, 0, B, K, U), G = b(W, 4);
                return S = G[0], F = G[2], U = G[3], z.call(this, function() {
                  return R.editor.insertText(S, q, F);
                }, U, S, q.length);
              }
            }, {
              key: "isEnabled",
              value: function() {
                return !this.container.classList.contains("ql-disabled");
              }
            }, {
              key: "off",
              value: function() {
                return this.emitter.off.apply(this.emitter, arguments);
              }
            }, {
              key: "on",
              value: function() {
                return this.emitter.on.apply(this.emitter, arguments);
              }
            }, {
              key: "once",
              value: function() {
                return this.emitter.once.apply(this.emitter, arguments);
              }
            }, {
              key: "pasteHTML",
              value: function(S, q, B) {
                this.clipboard.dangerouslyPasteHTML(S, q, B);
              }
            }, {
              key: "removeFormat",
              value: function(S, q, B) {
                var K = this, U = $(S, q, B), R = b(U, 4);
                return S = R[0], q = R[1], B = R[3], z.call(this, function() {
                  return K.editor.removeFormat(S, q);
                }, B, S);
              }
            }, {
              key: "scrollIntoView",
              value: function() {
                this.selection.scrollIntoView(this.scrollingContainer);
              }
            }, {
              key: "setContents",
              value: function(S) {
                var q = this, B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API;
                return z.call(this, function() {
                  S = new d.default(S);
                  var K = q.getLength(), U = q.editor.deleteText(0, K), R = q.editor.applyDelta(S), F = R.ops[R.ops.length - 1];
                  F != null && typeof F.insert == "string" && F.insert[F.insert.length - 1] === `
` && (q.editor.deleteText(q.getLength() - 1, 1), R.delete(1));
                  var W = U.compose(R);
                  return W;
                }, B);
              }
            }, {
              key: "setSelection",
              value: function(S, q, B) {
                if (S == null)
                  this.selection.setRange(null, q || H.sources.API);
                else {
                  var K = $(S, q, B), U = b(K, 4);
                  S = U[0], q = U[1], B = U[3], this.selection.setRange(new a.Range(S, q), B), B !== e.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                }
              }
            }, {
              key: "setText",
              value: function(S) {
                var q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API, B = new d.default().insert(S);
                return this.setContents(B, q);
              }
            }, {
              key: "update",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.default.sources.USER, q = this.scroll.update(S);
                return this.selection.update(S), q;
              }
            }, {
              key: "updateContents",
              value: function(S) {
                var q = this, B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API;
                return z.call(this, function() {
                  return S = new d.default(S), q.editor.applyDelta(S, B);
                }, B, !0);
              }
            }]), H;
          }();
          j.DEFAULTS = {
            bounds: null,
            formats: null,
            modules: {},
            placeholder: "",
            readOnly: !1,
            scrollingContainer: null,
            strict: !0,
            theme: "default"
          }, j.events = e.default.events, j.sources = e.default.sources, j.version = "1.3.7", j.imports = {
            delta: d.default,
            parchment: r.default,
            "core/module": l.default,
            "core/theme": P.default
          };
          function D(H, M) {
            if (M = (0, y.default)(!0, {
              container: H,
              modules: {
                clipboard: !0,
                keyboard: !0,
                history: !0
              }
            }, M), !M.theme || M.theme === j.DEFAULTS.theme)
              M.theme = P.default;
            else if (M.theme = j.import("themes/" + M.theme), M.theme == null)
              throw new Error("Invalid theme " + M.theme + ". Did you register it?");
            var S = (0, y.default)(!0, {}, M.theme.DEFAULTS);
            [S, M].forEach(function(K) {
              K.modules = K.modules || {}, Object.keys(K.modules).forEach(function(U) {
                K.modules[U] === !0 && (K.modules[U] = {});
              });
            });
            var q = Object.keys(S.modules).concat(Object.keys(M.modules)), B = q.reduce(function(K, U) {
              var R = j.import("modules/" + U);
              return R == null ? k.error("Cannot load " + U + " module. Are you sure you registered it?") : K[U] = R.DEFAULTS || {}, K;
            }, {});
            return M.modules != null && M.modules.toolbar && M.modules.toolbar.constructor !== Object && (M.modules.toolbar = {
              container: M.modules.toolbar
            }), M = (0, y.default)(!0, {}, j.DEFAULTS, { modules: B }, S, M), ["bounds", "container", "scrollingContainer"].forEach(function(K) {
              typeof M[K] == "string" && (M[K] = document.querySelector(M[K]));
            }), M.modules = Object.keys(M.modules).reduce(function(K, U) {
              return M.modules[U] && (K[U] = M.modules[U]), K;
            }, {}), M;
          }
          function z(H, M, S, q) {
            if (this.options.strict && !this.isEnabled() && M === e.default.sources.USER)
              return new d.default();
            var B = S == null ? null : this.getSelection(), K = this.editor.delta, U = H();
            if (B != null && (S === !0 && (S = B.index), q == null ? B = J(B, U, M) : q !== 0 && (B = J(B, S, q, M)), this.setSelection(B, e.default.sources.SILENT)), U.length() > 0) {
              var R, F = [e.default.events.TEXT_CHANGE, U, K, M];
              if ((R = this.emitter).emit.apply(R, [e.default.events.EDITOR_CHANGE].concat(F)), M !== e.default.sources.SILENT) {
                var W;
                (W = this.emitter).emit.apply(W, F);
              }
            }
            return U;
          }
          function $(H, M, S, q, B) {
            var K = {};
            return typeof H.index == "number" && typeof H.length == "number" ? typeof M != "number" ? (B = q, q = S, S = M, M = H.length, H = H.index) : (M = H.length, H = H.index) : typeof M != "number" && (B = q, q = S, S = M, M = 0), (typeof S > "u" ? "undefined" : g(S)) === "object" ? (K = S, B = q) : typeof S == "string" && (q != null ? K[S] = q : B = S), B = B || e.default.sources.API, [H, M, K, B];
          }
          function J(H, M, S, q) {
            if (H == null)
              return null;
            var B = void 0, K = void 0;
            if (M instanceof d.default) {
              var U = [H.index, H.index + H.length].map(function(G) {
                return M.transformPosition(G, q !== e.default.sources.USER);
              }), R = b(U, 2);
              B = R[0], K = R[1];
            } else {
              var F = [H.index, H.index + H.length].map(function(G) {
                return G < M || G === M && q === e.default.sources.USER ? G : S >= 0 ? G + S : Math.max(M, G + S);
              }), W = b(F, 2);
              B = W[0], K = W[1];
            }
            return new a.Range(B, K - B);
          }
          h.expandConfig = D, h.overload = $, h.default = j;
        },
        /* 6 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function i(r, a) {
              for (var c = 0; c < a.length; c++) {
                var s = a[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
              }
            }
            return function(r, a, c) {
              return a && i(r.prototype, a), c && i(r, c), r;
            };
          }(), b = function i(r, a, c) {
            r === null && (r = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(r, a);
            if (s === void 0) {
              var y = Object.getPrototypeOf(r);
              return y === null ? void 0 : i(y, a, c);
            } else {
              if ("value" in s)
                return s.value;
              var E = s.get;
              return E === void 0 ? void 0 : E.call(c);
            }
          }, p = v(7), f = n(p), d = v(0), u = n(d);
          function n(i) {
            return i && i.__esModule ? i : { default: i };
          }
          function t(i, r) {
            if (!(i instanceof r))
              throw new TypeError("Cannot call a class as a function");
          }
          function e(i, r) {
            if (!i)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return r && (typeof r == "object" || typeof r == "function") ? r : i;
          }
          function o(i, r) {
            if (typeof r != "function" && r !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            i.prototype = Object.create(r && r.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(i, r) : i.__proto__ = r);
          }
          var l = function(i) {
            o(r, i);
            function r() {
              return t(this, r), e(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
            }
            return g(r, [{
              key: "formatAt",
              value: function(c, s, y, E) {
                if (r.compare(this.statics.blotName, y) < 0 && u.default.query(y, u.default.Scope.BLOT)) {
                  var O = this.isolate(c, s);
                  E && O.wrap(y, E);
                } else
                  b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "formatAt", this).call(this, c, s, y, E);
              }
            }, {
              key: "optimize",
              value: function(c) {
                if (b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "optimize", this).call(this, c), this.parent instanceof r && r.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                  var s = this.parent.isolate(this.offset(), this.length());
                  this.moveChildren(s), s.wrap(this);
                }
              }
            }], [{
              key: "compare",
              value: function(c, s) {
                var y = r.order.indexOf(c), E = r.order.indexOf(s);
                return y >= 0 || E >= 0 ? y - E : c === s ? 0 : c < s ? -1 : 1;
              }
            }]), r;
          }(u.default.Inline);
          l.allowedChildren = [l, u.default.Embed, f.default], l.order = [
            "cursor",
            "inline",
            // Must be lower
            "underline",
            "strike",
            "italic",
            "bold",
            "script",
            "link",
            "code"
            // Must be higher
          ], h.default = l;
        },
        /* 7 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(0), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          function f(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(t, e) {
            if (!t)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e && (typeof e == "object" || typeof e == "function") ? e : t;
          }
          function u(t, e) {
            if (typeof e != "function" && e !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
          }
          var n = function(t) {
            u(e, t);
            function e() {
              return f(this, e), d(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
            }
            return e;
          }(b.default.Text);
          h.default = n;
        },
        /* 8 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function a(c, s) {
              for (var y = 0; y < s.length; y++) {
                var E = s[y];
                E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(c, E.key, E);
              }
            }
            return function(c, s, y) {
              return s && a(c.prototype, s), y && a(c, y), c;
            };
          }(), b = function a(c, s, y) {
            c === null && (c = Function.prototype);
            var E = Object.getOwnPropertyDescriptor(c, s);
            if (E === void 0) {
              var O = Object.getPrototypeOf(c);
              return O === null ? void 0 : a(O, s, y);
            } else {
              if ("value" in E)
                return E.value;
              var N = E.get;
              return N === void 0 ? void 0 : N.call(y);
            }
          }, p = v(54), f = n(p), d = v(10), u = n(d);
          function n(a) {
            return a && a.__esModule ? a : { default: a };
          }
          function t(a, c) {
            if (!(a instanceof c))
              throw new TypeError("Cannot call a class as a function");
          }
          function e(a, c) {
            if (!a)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return c && (typeof c == "object" || typeof c == "function") ? c : a;
          }
          function o(a, c) {
            if (typeof c != "function" && c !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof c);
            a.prototype = Object.create(c && c.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), c && (Object.setPrototypeOf ? Object.setPrototypeOf(a, c) : a.__proto__ = c);
          }
          var l = (0, u.default)("quill:events"), i = ["selectionchange", "mousedown", "mouseup", "click"];
          i.forEach(function(a) {
            document.addEventListener(a, function() {
              for (var c = arguments.length, s = Array(c), y = 0; y < c; y++)
                s[y] = arguments[y];
              [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(E) {
                if (E.__quill && E.__quill.emitter) {
                  var O;
                  (O = E.__quill.emitter).handleDOM.apply(O, s);
                }
              });
            });
          });
          var r = function(a) {
            o(c, a);
            function c() {
              t(this, c);
              var s = e(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this));
              return s.listeners = {}, s.on("error", l.error), s;
            }
            return g(c, [{
              key: "emit",
              value: function() {
                l.log.apply(l, arguments), b(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "emit", this).apply(this, arguments);
              }
            }, {
              key: "handleDOM",
              value: function(y) {
                for (var E = arguments.length, O = Array(E > 1 ? E - 1 : 0), N = 1; N < E; N++)
                  O[N - 1] = arguments[N];
                (this.listeners[y.type] || []).forEach(function(P) {
                  var x = P.node, w = P.handler;
                  (y.target === x || x.contains(y.target)) && w.apply(void 0, [y].concat(O));
                });
              }
            }, {
              key: "listenDOM",
              value: function(y, E, O) {
                this.listeners[y] || (this.listeners[y] = []), this.listeners[y].push({ node: E, handler: O });
              }
            }]), c;
          }(f.default);
          r.events = {
            EDITOR_CHANGE: "editor-change",
            SCROLL_BEFORE_UPDATE: "scroll-before-update",
            SCROLL_OPTIMIZE: "scroll-optimize",
            SCROLL_UPDATE: "scroll-update",
            SELECTION_CHANGE: "selection-change",
            TEXT_CHANGE: "text-change"
          }, r.sources = {
            API: "api",
            SILENT: "silent",
            USER: "user"
          }, h.default = r;
        },
        /* 9 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          function g(p, f) {
            if (!(p instanceof f))
              throw new TypeError("Cannot call a class as a function");
          }
          var b = function p(f) {
            var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            g(this, p), this.quill = f, this.options = d;
          };
          b.DEFAULTS = {}, h.default = b;
        },
        /* 10 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = ["error", "warn", "log", "info"], b = "warn";
          function p(d) {
            if (g.indexOf(d) <= g.indexOf(b)) {
              for (var u, n = arguments.length, t = Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++)
                t[e - 1] = arguments[e];
              (u = console)[d].apply(u, t);
            }
          }
          function f(d) {
            return g.reduce(function(u, n) {
              return u[n] = p.bind(console, n, d), u;
            }, {});
          }
          p.level = f.level = function(d) {
            b = d;
          }, h.default = f;
        },
        /* 11 */
        /***/
        function(_, h, v) {
          var g = Array.prototype.slice, b = v(52), p = v(53), f = _.exports = function(t, e, o) {
            return o || (o = {}), t === e ? !0 : t instanceof Date && e instanceof Date ? t.getTime() === e.getTime() : !t || !e || typeof t != "object" && typeof e != "object" ? o.strict ? t === e : t == e : n(t, e, o);
          };
          function d(t) {
            return t == null;
          }
          function u(t) {
            return !(!t || typeof t != "object" || typeof t.length != "number" || typeof t.copy != "function" || typeof t.slice != "function" || t.length > 0 && typeof t[0] != "number");
          }
          function n(t, e, o) {
            var l, i;
            if (d(t) || d(e) || t.prototype !== e.prototype)
              return !1;
            if (p(t))
              return p(e) ? (t = g.call(t), e = g.call(e), f(t, e, o)) : !1;
            if (u(t)) {
              if (!u(e) || t.length !== e.length)
                return !1;
              for (l = 0; l < t.length; l++)
                if (t[l] !== e[l])
                  return !1;
              return !0;
            }
            try {
              var r = b(t), a = b(e);
            } catch {
              return !1;
            }
            if (r.length != a.length)
              return !1;
            for (r.sort(), a.sort(), l = r.length - 1; l >= 0; l--)
              if (r[l] != a[l])
                return !1;
            for (l = r.length - 1; l >= 0; l--)
              if (i = r[l], !f(t[i], e[i], o))
                return !1;
            return typeof t == typeof e;
          }
        },
        /* 12 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(1), b = (
            /** @class */
            function() {
              function p(f, d, u) {
                u === void 0 && (u = {}), this.attrName = f, this.keyName = d;
                var n = g.Scope.TYPE & g.Scope.ATTRIBUTE;
                u.scope != null ? this.scope = u.scope & g.Scope.LEVEL | n : this.scope = g.Scope.ATTRIBUTE, u.whitelist != null && (this.whitelist = u.whitelist);
              }
              return p.keys = function(f) {
                return [].map.call(f.attributes, function(d) {
                  return d.name;
                });
              }, p.prototype.add = function(f, d) {
                return this.canAdd(f, d) ? (f.setAttribute(this.keyName, d), !0) : !1;
              }, p.prototype.canAdd = function(f, d) {
                var u = g.query(f, g.Scope.BLOT & (this.scope | g.Scope.TYPE));
                return u == null ? !1 : this.whitelist == null ? !0 : typeof d == "string" ? this.whitelist.indexOf(d.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(d) > -1;
              }, p.prototype.remove = function(f) {
                f.removeAttribute(this.keyName);
              }, p.prototype.value = function(f) {
                var d = f.getAttribute(this.keyName);
                return this.canAdd(f, d) && d ? d : "";
              }, p;
            }()
          );
          h.default = b;
        },
        /* 13 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.Code = void 0;
          var g = /* @__PURE__ */ function() {
            function N(P, x) {
              var w = [], T = !0, k = !1, j = void 0;
              try {
                for (var D = P[Symbol.iterator](), z; !(T = (z = D.next()).done) && (w.push(z.value), !(x && w.length === x)); T = !0)
                  ;
              } catch ($) {
                k = !0, j = $;
              } finally {
                try {
                  !T && D.return && D.return();
                } finally {
                  if (k)
                    throw j;
                }
              }
              return w;
            }
            return function(P, x) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return N(P, x);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), b = /* @__PURE__ */ function() {
            function N(P, x) {
              for (var w = 0; w < x.length; w++) {
                var T = x[w];
                T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(P, T.key, T);
              }
            }
            return function(P, x, w) {
              return x && N(P.prototype, x), w && N(P, w), P;
            };
          }(), p = function N(P, x, w) {
            P === null && (P = Function.prototype);
            var T = Object.getOwnPropertyDescriptor(P, x);
            if (T === void 0) {
              var k = Object.getPrototypeOf(P);
              return k === null ? void 0 : N(k, x, w);
            } else {
              if ("value" in T)
                return T.value;
              var j = T.get;
              return j === void 0 ? void 0 : j.call(w);
            }
          }, f = v(2), d = a(f), u = v(0), n = a(u), t = v(4), e = a(t), o = v(6), l = a(o), i = v(7), r = a(i);
          function a(N) {
            return N && N.__esModule ? N : { default: N };
          }
          function c(N, P) {
            if (!(N instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(N, P) {
            if (!N)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return P && (typeof P == "object" || typeof P == "function") ? P : N;
          }
          function y(N, P) {
            if (typeof P != "function" && P !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof P);
            N.prototype = Object.create(P && P.prototype, { constructor: { value: N, enumerable: !1, writable: !0, configurable: !0 } }), P && (Object.setPrototypeOf ? Object.setPrototypeOf(N, P) : N.__proto__ = P);
          }
          var E = function(N) {
            y(P, N);
            function P() {
              return c(this, P), s(this, (P.__proto__ || Object.getPrototypeOf(P)).apply(this, arguments));
            }
            return P;
          }(l.default);
          E.blotName = "code", E.tagName = "CODE";
          var O = function(N) {
            y(P, N);
            function P() {
              return c(this, P), s(this, (P.__proto__ || Object.getPrototypeOf(P)).apply(this, arguments));
            }
            return b(P, [{
              key: "delta",
              value: function() {
                var w = this, T = this.domNode.textContent;
                return T.endsWith(`
`) && (T = T.slice(0, -1)), T.split(`
`).reduce(function(k, j) {
                  return k.insert(j).insert(`
`, w.formats());
                }, new d.default());
              }
            }, {
              key: "format",
              value: function(w, T) {
                if (!(w === this.statics.blotName && T)) {
                  var k = this.descendant(r.default, this.length() - 1), j = g(k, 1), D = j[0];
                  D != null && D.deleteAt(D.length() - 1, 1), p(P.prototype.__proto__ || Object.getPrototypeOf(P.prototype), "format", this).call(this, w, T);
                }
              }
            }, {
              key: "formatAt",
              value: function(w, T, k, j) {
                if (T !== 0 && !(n.default.query(k, n.default.Scope.BLOCK) == null || k === this.statics.blotName && j === this.statics.formats(this.domNode))) {
                  var D = this.newlineIndex(w);
                  if (!(D < 0 || D >= w + T)) {
                    var z = this.newlineIndex(w, !0) + 1, $ = D - z + 1, J = this.isolate(z, $), H = J.next;
                    J.format(k, j), H instanceof P && H.formatAt(0, w - z + T - $, k, j);
                  }
                }
              }
            }, {
              key: "insertAt",
              value: function(w, T, k) {
                if (k == null) {
                  var j = this.descendant(r.default, w), D = g(j, 2), z = D[0], $ = D[1];
                  z.insertAt($, T);
                }
              }
            }, {
              key: "length",
              value: function() {
                var w = this.domNode.textContent.length;
                return this.domNode.textContent.endsWith(`
`) ? w : w + 1;
              }
            }, {
              key: "newlineIndex",
              value: function(w) {
                var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (T)
                  return this.domNode.textContent.slice(0, w).lastIndexOf(`
`);
                var k = this.domNode.textContent.slice(w).indexOf(`
`);
                return k > -1 ? w + k : -1;
              }
            }, {
              key: "optimize",
              value: function(w) {
                this.domNode.textContent.endsWith(`
`) || this.appendChild(n.default.create("text", `
`)), p(P.prototype.__proto__ || Object.getPrototypeOf(P.prototype), "optimize", this).call(this, w);
                var T = this.next;
                T != null && T.prev === this && T.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === T.statics.formats(T.domNode) && (T.optimize(w), T.moveChildren(this), T.remove());
              }
            }, {
              key: "replace",
              value: function(w) {
                p(P.prototype.__proto__ || Object.getPrototypeOf(P.prototype), "replace", this).call(this, w), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(T) {
                  var k = n.default.find(T);
                  k == null ? T.parentNode.removeChild(T) : k instanceof n.default.Embed ? k.remove() : k.unwrap();
                });
              }
            }], [{
              key: "create",
              value: function(w) {
                var T = p(P.__proto__ || Object.getPrototypeOf(P), "create", this).call(this, w);
                return T.setAttribute("spellcheck", !1), T;
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), P;
          }(e.default);
          O.blotName = "code-block", O.tagName = "PRE", O.TAB = "  ", h.Code = E, h.default = O;
        },
        /* 14 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(H) {
            return typeof H;
          } : function(H) {
            return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
          }, b = /* @__PURE__ */ function() {
            function H(M, S) {
              var q = [], B = !0, K = !1, U = void 0;
              try {
                for (var R = M[Symbol.iterator](), F; !(B = (F = R.next()).done) && (q.push(F.value), !(S && q.length === S)); B = !0)
                  ;
              } catch (W) {
                K = !0, U = W;
              } finally {
                try {
                  !B && R.return && R.return();
                } finally {
                  if (K)
                    throw U;
                }
              }
              return q;
            }
            return function(M, S) {
              if (Array.isArray(M))
                return M;
              if (Symbol.iterator in Object(M))
                return H(M, S);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), p = /* @__PURE__ */ function() {
            function H(M, S) {
              for (var q = 0; q < S.length; q++) {
                var B = S[q];
                B.enumerable = B.enumerable || !1, B.configurable = !0, "value" in B && (B.writable = !0), Object.defineProperty(M, B.key, B);
              }
            }
            return function(M, S, q) {
              return S && H(M.prototype, S), q && H(M, q), M;
            };
          }(), f = v(2), d = T(f), u = v(20), n = T(u), t = v(0), e = T(t), o = v(13), l = T(o), i = v(24), r = T(i), a = v(4), c = T(a), s = v(16), y = T(s), E = v(21), O = T(E), N = v(11), P = T(N), x = v(3), w = T(x);
          function T(H) {
            return H && H.__esModule ? H : { default: H };
          }
          function k(H, M, S) {
            return M in H ? Object.defineProperty(H, M, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : H[M] = S, H;
          }
          function j(H, M) {
            if (!(H instanceof M))
              throw new TypeError("Cannot call a class as a function");
          }
          var D = /^[ -~]*$/, z = function() {
            function H(M) {
              j(this, H), this.scroll = M, this.delta = this.getDelta();
            }
            return p(H, [{
              key: "applyDelta",
              value: function(S) {
                var q = this, B = !1;
                this.scroll.update();
                var K = this.scroll.length();
                return this.scroll.batchStart(), S = J(S), S.reduce(function(U, R) {
                  var F = R.retain || R.delete || R.insert.length || 1, W = R.attributes || {};
                  if (R.insert != null) {
                    if (typeof R.insert == "string") {
                      var G = R.insert;
                      G.endsWith(`
`) && B && (B = !1, G = G.slice(0, -1)), U >= K && !G.endsWith(`
`) && (B = !0), q.scroll.insertAt(U, G);
                      var X = q.scroll.line(U), nt = b(X, 2), it = nt[0], at = nt[1], ft = (0, w.default)({}, (0, a.bubbleFormats)(it));
                      if (it instanceof c.default) {
                        var ht = it.descendant(e.default.Leaf, at), mt = b(ht, 1), gt = mt[0];
                        ft = (0, w.default)(ft, (0, a.bubbleFormats)(gt));
                      }
                      W = n.default.attributes.diff(ft, W) || {};
                    } else if (g(R.insert) === "object") {
                      var Y = Object.keys(R.insert)[0];
                      if (Y == null)
                        return U;
                      q.scroll.insertAt(U, Y, R.insert[Y]);
                    }
                    K += F;
                  }
                  return Object.keys(W).forEach(function(Z) {
                    q.scroll.formatAt(U, F, Z, W[Z]);
                  }), U + F;
                }, 0), S.reduce(function(U, R) {
                  return typeof R.delete == "number" ? (q.scroll.deleteAt(U, R.delete), U) : U + (R.retain || R.insert.length || 1);
                }, 0), this.scroll.batchEnd(), this.update(S);
              }
            }, {
              key: "deleteText",
              value: function(S, q) {
                return this.scroll.deleteAt(S, q), this.update(new d.default().retain(S).delete(q));
              }
            }, {
              key: "formatLine",
              value: function(S, q) {
                var B = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return this.scroll.update(), Object.keys(K).forEach(function(U) {
                  if (!(B.scroll.whitelist != null && !B.scroll.whitelist[U])) {
                    var R = B.scroll.lines(S, Math.max(q, 1)), F = q;
                    R.forEach(function(W) {
                      var G = W.length();
                      if (!(W instanceof l.default))
                        W.format(U, K[U]);
                      else {
                        var X = S - W.offset(B.scroll), nt = W.newlineIndex(X + F) - X + 1;
                        W.formatAt(X, nt, U, K[U]);
                      }
                      F -= G;
                    });
                  }
                }), this.scroll.optimize(), this.update(new d.default().retain(S).retain(q, (0, O.default)(K)));
              }
            }, {
              key: "formatText",
              value: function(S, q) {
                var B = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return Object.keys(K).forEach(function(U) {
                  B.scroll.formatAt(S, q, U, K[U]);
                }), this.update(new d.default().retain(S).retain(q, (0, O.default)(K)));
              }
            }, {
              key: "getContents",
              value: function(S, q) {
                return this.delta.slice(S, S + q);
              }
            }, {
              key: "getDelta",
              value: function() {
                return this.scroll.lines().reduce(function(S, q) {
                  return S.concat(q.delta());
                }, new d.default());
              }
            }, {
              key: "getFormat",
              value: function(S) {
                var q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, B = [], K = [];
                q === 0 ? this.scroll.path(S).forEach(function(R) {
                  var F = b(R, 1), W = F[0];
                  W instanceof c.default ? B.push(W) : W instanceof e.default.Leaf && K.push(W);
                }) : (B = this.scroll.lines(S, q), K = this.scroll.descendants(e.default.Leaf, S, q));
                var U = [B, K].map(function(R) {
                  if (R.length === 0)
                    return {};
                  for (var F = (0, a.bubbleFormats)(R.shift()); Object.keys(F).length > 0; ) {
                    var W = R.shift();
                    if (W == null)
                      return F;
                    F = $((0, a.bubbleFormats)(W), F);
                  }
                  return F;
                });
                return w.default.apply(w.default, U);
              }
            }, {
              key: "getText",
              value: function(S, q) {
                return this.getContents(S, q).filter(function(B) {
                  return typeof B.insert == "string";
                }).map(function(B) {
                  return B.insert;
                }).join("");
              }
            }, {
              key: "insertEmbed",
              value: function(S, q, B) {
                return this.scroll.insertAt(S, q, B), this.update(new d.default().retain(S).insert(k({}, q, B)));
              }
            }, {
              key: "insertText",
              value: function(S, q) {
                var B = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return q = q.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(S, q), Object.keys(K).forEach(function(U) {
                  B.scroll.formatAt(S, q.length, U, K[U]);
                }), this.update(new d.default().retain(S).insert(q, (0, O.default)(K)));
              }
            }, {
              key: "isBlank",
              value: function() {
                if (this.scroll.children.length == 0)
                  return !0;
                if (this.scroll.children.length > 1)
                  return !1;
                var S = this.scroll.children.head;
                return S.statics.blotName !== c.default.blotName || S.children.length > 1 ? !1 : S.children.head instanceof y.default;
              }
            }, {
              key: "removeFormat",
              value: function(S, q) {
                var B = this.getText(S, q), K = this.scroll.line(S + q), U = b(K, 2), R = U[0], F = U[1], W = 0, G = new d.default();
                R != null && (R instanceof l.default ? W = R.newlineIndex(F) - F + 1 : W = R.length() - F, G = R.delta().slice(F, F + W - 1).insert(`
`));
                var X = this.getContents(S, q + W), nt = X.diff(new d.default().insert(B).concat(G)), it = new d.default().retain(S).concat(nt);
                return this.applyDelta(it);
              }
            }, {
              key: "update",
              value: function(S) {
                var q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], B = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, K = this.delta;
                if (q.length === 1 && q[0].type === "characterData" && q[0].target.data.match(D) && e.default.find(q[0].target)) {
                  var U = e.default.find(q[0].target), R = (0, a.bubbleFormats)(U), F = U.offset(this.scroll), W = q[0].oldValue.replace(r.default.CONTENTS, ""), G = new d.default().insert(W), X = new d.default().insert(U.value()), nt = new d.default().retain(F).concat(G.diff(X, B));
                  S = nt.reduce(function(it, at) {
                    return at.insert ? it.insert(at.insert, R) : it.push(at);
                  }, new d.default()), this.delta = K.compose(S);
                } else
                  this.delta = this.getDelta(), (!S || !(0, P.default)(K.compose(S), this.delta)) && (S = K.diff(this.delta, B));
                return S;
              }
            }]), H;
          }();
          function $(H, M) {
            return Object.keys(M).reduce(function(S, q) {
              return H[q] == null || (M[q] === H[q] ? S[q] = M[q] : Array.isArray(M[q]) ? M[q].indexOf(H[q]) < 0 && (S[q] = M[q].concat([H[q]])) : S[q] = [M[q], H[q]]), S;
            }, {});
          }
          function J(H) {
            return H.reduce(function(M, S) {
              if (S.insert === 1) {
                var q = (0, O.default)(S.attributes);
                return delete q.image, M.insert({ image: S.attributes.image }, q);
              }
              if (S.attributes != null && (S.attributes.list === !0 || S.attributes.bullet === !0) && (S = (0, O.default)(S), S.attributes.list ? S.attributes.list = "ordered" : (S.attributes.list = "bullet", delete S.attributes.bullet)), typeof S.insert == "string") {
                var B = S.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
                return M.insert(B, S.attributes);
              }
              return M.push(S);
            }, new d.default());
          }
          h.default = z;
        },
        /* 15 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.Range = void 0;
          var g = /* @__PURE__ */ function() {
            function N(P, x) {
              var w = [], T = !0, k = !1, j = void 0;
              try {
                for (var D = P[Symbol.iterator](), z; !(T = (z = D.next()).done) && (w.push(z.value), !(x && w.length === x)); T = !0)
                  ;
              } catch ($) {
                k = !0, j = $;
              } finally {
                try {
                  !T && D.return && D.return();
                } finally {
                  if (k)
                    throw j;
                }
              }
              return w;
            }
            return function(P, x) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return N(P, x);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), b = /* @__PURE__ */ function() {
            function N(P, x) {
              for (var w = 0; w < x.length; w++) {
                var T = x[w];
                T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(P, T.key, T);
              }
            }
            return function(P, x, w) {
              return x && N(P.prototype, x), w && N(P, w), P;
            };
          }(), p = v(0), f = r(p), d = v(21), u = r(d), n = v(11), t = r(n), e = v(8), o = r(e), l = v(10), i = r(l);
          function r(N) {
            return N && N.__esModule ? N : { default: N };
          }
          function a(N) {
            if (Array.isArray(N)) {
              for (var P = 0, x = Array(N.length); P < N.length; P++)
                x[P] = N[P];
              return x;
            } else
              return Array.from(N);
          }
          function c(N, P) {
            if (!(N instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var s = (0, i.default)("quill:selection"), y = function N(P) {
            var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            c(this, N), this.index = P, this.length = x;
          }, E = function() {
            function N(P, x) {
              var w = this;
              c(this, N), this.emitter = x, this.scroll = P, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = f.default.create("cursor", this), this.lastRange = this.savedRange = new y(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
                w.mouseDown || setTimeout(w.update.bind(w, o.default.sources.USER), 1);
              }), this.emitter.on(o.default.events.EDITOR_CHANGE, function(T, k) {
                T === o.default.events.TEXT_CHANGE && k.length() > 0 && w.update(o.default.sources.SILENT);
              }), this.emitter.on(o.default.events.SCROLL_BEFORE_UPDATE, function() {
                if (w.hasFocus()) {
                  var T = w.getNativeRange();
                  T != null && T.start.node !== w.cursor.textNode && w.emitter.once(o.default.events.SCROLL_UPDATE, function() {
                    try {
                      w.setNativeRange(T.start.node, T.start.offset, T.end.node, T.end.offset);
                    } catch {
                    }
                  });
                }
              }), this.emitter.on(o.default.events.SCROLL_OPTIMIZE, function(T, k) {
                if (k.range) {
                  var j = k.range, D = j.startNode, z = j.startOffset, $ = j.endNode, J = j.endOffset;
                  w.setNativeRange(D, z, $, J);
                }
              }), this.update(o.default.sources.SILENT);
            }
            return b(N, [{
              key: "handleComposition",
              value: function() {
                var x = this;
                this.root.addEventListener("compositionstart", function() {
                  x.composing = !0;
                }), this.root.addEventListener("compositionend", function() {
                  if (x.composing = !1, x.cursor.parent) {
                    var w = x.cursor.restore();
                    if (!w)
                      return;
                    setTimeout(function() {
                      x.setNativeRange(w.startNode, w.startOffset, w.endNode, w.endOffset);
                    }, 1);
                  }
                });
              }
            }, {
              key: "handleDragging",
              value: function() {
                var x = this;
                this.emitter.listenDOM("mousedown", document.body, function() {
                  x.mouseDown = !0;
                }), this.emitter.listenDOM("mouseup", document.body, function() {
                  x.mouseDown = !1, x.update(o.default.sources.USER);
                });
              }
            }, {
              key: "focus",
              value: function() {
                this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
              }
            }, {
              key: "format",
              value: function(x, w) {
                if (!(this.scroll.whitelist != null && !this.scroll.whitelist[x])) {
                  this.scroll.update();
                  var T = this.getNativeRange();
                  if (!(T == null || !T.native.collapsed || f.default.query(x, f.default.Scope.BLOCK))) {
                    if (T.start.node !== this.cursor.textNode) {
                      var k = f.default.find(T.start.node, !1);
                      if (k == null)
                        return;
                      if (k instanceof f.default.Leaf) {
                        var j = k.split(T.start.offset);
                        k.parent.insertBefore(this.cursor, j);
                      } else
                        k.insertBefore(this.cursor, T.start.node);
                      this.cursor.attach();
                    }
                    this.cursor.format(x, w), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                  }
                }
              }
            }, {
              key: "getBounds",
              value: function(x) {
                var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, T = this.scroll.length();
                x = Math.min(x, T - 1), w = Math.min(x + w, T - 1) - x;
                var k = void 0, j = this.scroll.leaf(x), D = g(j, 2), z = D[0], $ = D[1];
                if (z == null)
                  return null;
                var J = z.position($, !0), H = g(J, 2);
                k = H[0], $ = H[1];
                var M = document.createRange();
                if (w > 0) {
                  M.setStart(k, $);
                  var S = this.scroll.leaf(x + w), q = g(S, 2);
                  if (z = q[0], $ = q[1], z == null)
                    return null;
                  var B = z.position($, !0), K = g(B, 2);
                  return k = K[0], $ = K[1], M.setEnd(k, $), M.getBoundingClientRect();
                } else {
                  var U = "left", R = void 0;
                  return k instanceof Text ? ($ < k.data.length ? (M.setStart(k, $), M.setEnd(k, $ + 1)) : (M.setStart(k, $ - 1), M.setEnd(k, $), U = "right"), R = M.getBoundingClientRect()) : (R = z.domNode.getBoundingClientRect(), $ > 0 && (U = "right")), {
                    bottom: R.top + R.height,
                    height: R.height,
                    left: R[U],
                    right: R[U],
                    top: R.top,
                    width: 0
                  };
                }
              }
            }, {
              key: "getNativeRange",
              value: function() {
                var x = document.getSelection();
                if (x == null || x.rangeCount <= 0)
                  return null;
                var w = x.getRangeAt(0);
                if (w == null)
                  return null;
                var T = this.normalizeNative(w);
                return s.info("getNativeRange", T), T;
              }
            }, {
              key: "getRange",
              value: function() {
                var x = this.getNativeRange();
                if (x == null)
                  return [null, null];
                var w = this.normalizedToRange(x);
                return [w, x];
              }
            }, {
              key: "hasFocus",
              value: function() {
                return document.activeElement === this.root;
              }
            }, {
              key: "normalizedToRange",
              value: function(x) {
                var w = this, T = [[x.start.node, x.start.offset]];
                x.native.collapsed || T.push([x.end.node, x.end.offset]);
                var k = T.map(function(z) {
                  var $ = g(z, 2), J = $[0], H = $[1], M = f.default.find(J, !0), S = M.offset(w.scroll);
                  return H === 0 ? S : M instanceof f.default.Container ? S + M.length() : S + M.index(J, H);
                }), j = Math.min(Math.max.apply(Math, a(k)), this.scroll.length() - 1), D = Math.min.apply(Math, [j].concat(a(k)));
                return new y(D, j - D);
              }
            }, {
              key: "normalizeNative",
              value: function(x) {
                if (!O(this.root, x.startContainer) || !x.collapsed && !O(this.root, x.endContainer))
                  return null;
                var w = {
                  start: { node: x.startContainer, offset: x.startOffset },
                  end: { node: x.endContainer, offset: x.endOffset },
                  native: x
                };
                return [w.start, w.end].forEach(function(T) {
                  for (var k = T.node, j = T.offset; !(k instanceof Text) && k.childNodes.length > 0; )
                    if (k.childNodes.length > j)
                      k = k.childNodes[j], j = 0;
                    else if (k.childNodes.length === j)
                      k = k.lastChild, j = k instanceof Text ? k.data.length : k.childNodes.length + 1;
                    else
                      break;
                  T.node = k, T.offset = j;
                }), w;
              }
            }, {
              key: "rangeToNative",
              value: function(x) {
                var w = this, T = x.collapsed ? [x.index] : [x.index, x.index + x.length], k = [], j = this.scroll.length();
                return T.forEach(function(D, z) {
                  D = Math.min(j - 1, D);
                  var $ = void 0, J = w.scroll.leaf(D), H = g(J, 2), M = H[0], S = H[1], q = M.position(S, z !== 0), B = g(q, 2);
                  $ = B[0], S = B[1], k.push($, S);
                }), k.length < 2 && (k = k.concat(k)), k;
              }
            }, {
              key: "scrollIntoView",
              value: function(x) {
                var w = this.lastRange;
                if (w != null) {
                  var T = this.getBounds(w.index, w.length);
                  if (T != null) {
                    var k = this.scroll.length() - 1, j = this.scroll.line(Math.min(w.index, k)), D = g(j, 1), z = D[0], $ = z;
                    if (w.length > 0) {
                      var J = this.scroll.line(Math.min(w.index + w.length, k)), H = g(J, 1);
                      $ = H[0];
                    }
                    if (!(z == null || $ == null)) {
                      var M = x.getBoundingClientRect();
                      T.top < M.top ? x.scrollTop -= M.top - T.top : T.bottom > M.bottom && (x.scrollTop += T.bottom - M.bottom);
                    }
                  }
                }
              }
            }, {
              key: "setNativeRange",
              value: function(x, w) {
                var T = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : x, k = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : w, j = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
                if (s.info("setNativeRange", x, w, T, k), !(x != null && (this.root.parentNode == null || x.parentNode == null || T.parentNode == null))) {
                  var D = document.getSelection();
                  if (D != null)
                    if (x != null) {
                      this.hasFocus() || this.root.focus();
                      var z = (this.getNativeRange() || {}).native;
                      if (z == null || j || x !== z.startContainer || w !== z.startOffset || T !== z.endContainer || k !== z.endOffset) {
                        x.tagName == "BR" && (w = [].indexOf.call(x.parentNode.childNodes, x), x = x.parentNode), T.tagName == "BR" && (k = [].indexOf.call(T.parentNode.childNodes, T), T = T.parentNode);
                        var $ = document.createRange();
                        $.setStart(x, w), $.setEnd(T, k), D.removeAllRanges(), D.addRange($);
                      }
                    } else
                      D.removeAllRanges(), this.root.blur(), document.body.focus();
                }
              }
            }, {
              key: "setRange",
              value: function(x) {
                var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, T = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : o.default.sources.API;
                if (typeof w == "string" && (T = w, w = !1), s.info("setRange", x), x != null) {
                  var k = this.rangeToNative(x);
                  this.setNativeRange.apply(this, a(k).concat([w]));
                } else
                  this.setNativeRange(null);
                this.update(T);
              }
            }, {
              key: "update",
              value: function() {
                var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : o.default.sources.USER, w = this.lastRange, T = this.getRange(), k = g(T, 2), j = k[0], D = k[1];
                if (this.lastRange = j, this.lastRange != null && (this.savedRange = this.lastRange), !(0, t.default)(w, this.lastRange)) {
                  var z;
                  !this.composing && D != null && D.native.collapsed && D.start.node !== this.cursor.textNode && this.cursor.restore();
                  var $ = [o.default.events.SELECTION_CHANGE, (0, u.default)(this.lastRange), (0, u.default)(w), x];
                  if ((z = this.emitter).emit.apply(z, [o.default.events.EDITOR_CHANGE].concat($)), x !== o.default.sources.SILENT) {
                    var J;
                    (J = this.emitter).emit.apply(J, $);
                  }
                }
              }
            }]), N;
          }();
          function O(N, P) {
            try {
              P.parentNode;
            } catch {
              return !1;
            }
            return P instanceof Text && (P = P.parentNode), N.contains(P);
          }
          h.Range = y, h.default = E;
        },
        /* 16 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function o(l, i) {
              for (var r = 0; r < i.length; r++) {
                var a = i[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(l, a.key, a);
              }
            }
            return function(l, i, r) {
              return i && o(l.prototype, i), r && o(l, r), l;
            };
          }(), b = function o(l, i, r) {
            l === null && (l = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(l, i);
            if (a === void 0) {
              var c = Object.getPrototypeOf(l);
              return c === null ? void 0 : o(c, i, r);
            } else {
              if ("value" in a)
                return a.value;
              var s = a.get;
              return s === void 0 ? void 0 : s.call(r);
            }
          }, p = v(0), f = d(p);
          function d(o) {
            return o && o.__esModule ? o : { default: o };
          }
          function u(o, l) {
            if (!(o instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(o, l) {
            if (!o)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : o;
          }
          function t(o, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            o.prototype = Object.create(l && l.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : o.__proto__ = l);
          }
          var e = function(o) {
            t(l, o);
            function l() {
              return u(this, l), n(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return g(l, [{
              key: "insertInto",
              value: function(r, a) {
                r.children.length === 0 ? b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "insertInto", this).call(this, r, a) : this.remove();
              }
            }, {
              key: "length",
              value: function() {
                return 0;
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }], [{
              key: "value",
              value: function() {
              }
            }]), l;
          }(f.default.Embed);
          e.blotName = "break", e.tagName = "BR", h.default = e;
        },
        /* 17 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
              t.__proto__ = e;
            } || function(t, e) {
              for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            };
            return function(t, e) {
              n(t, e);
              function o() {
                this.constructor = t;
              }
              t.prototype = e === null ? Object.create(e) : (o.prototype = e.prototype, new o());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(44), p = v(30), f = v(1), d = (
            /** @class */
            function(n) {
              g(t, n);
              function t(e) {
                var o = n.call(this, e) || this;
                return o.build(), o;
              }
              return t.prototype.appendChild = function(e) {
                this.insertBefore(e);
              }, t.prototype.attach = function() {
                n.prototype.attach.call(this), this.children.forEach(function(e) {
                  e.attach();
                });
              }, t.prototype.build = function() {
                var e = this;
                this.children = new b.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(o) {
                  try {
                    var l = u(o);
                    e.insertBefore(l, e.children.head || void 0);
                  } catch (i) {
                    if (i instanceof f.ParchmentError)
                      return;
                    throw i;
                  }
                });
              }, t.prototype.deleteAt = function(e, o) {
                if (e === 0 && o === this.length())
                  return this.remove();
                this.children.forEachAt(e, o, function(l, i, r) {
                  l.deleteAt(i, r);
                });
              }, t.prototype.descendant = function(e, o) {
                var l = this.children.find(o), i = l[0], r = l[1];
                return e.blotName == null && e(i) || e.blotName != null && i instanceof e ? [i, r] : i instanceof t ? i.descendant(e, r) : [null, -1];
              }, t.prototype.descendants = function(e, o, l) {
                o === void 0 && (o = 0), l === void 0 && (l = Number.MAX_VALUE);
                var i = [], r = l;
                return this.children.forEachAt(o, l, function(a, c, s) {
                  (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && i.push(a), a instanceof t && (i = i.concat(a.descendants(e, c, r))), r -= s;
                }), i;
              }, t.prototype.detach = function() {
                this.children.forEach(function(e) {
                  e.detach();
                }), n.prototype.detach.call(this);
              }, t.prototype.formatAt = function(e, o, l, i) {
                this.children.forEachAt(e, o, function(r, a, c) {
                  r.formatAt(a, c, l, i);
                });
              }, t.prototype.insertAt = function(e, o, l) {
                var i = this.children.find(e), r = i[0], a = i[1];
                if (r)
                  r.insertAt(a, o, l);
                else {
                  var c = l == null ? f.create("text", o) : f.create(o, l);
                  this.appendChild(c);
                }
              }, t.prototype.insertBefore = function(e, o) {
                if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(l) {
                  return e instanceof l;
                }))
                  throw new f.ParchmentError("Cannot insert " + e.statics.blotName + " into " + this.statics.blotName);
                e.insertInto(this, o);
              }, t.prototype.length = function() {
                return this.children.reduce(function(e, o) {
                  return e + o.length();
                }, 0);
              }, t.prototype.moveChildren = function(e, o) {
                this.children.forEach(function(l) {
                  e.insertBefore(l, o);
                });
              }, t.prototype.optimize = function(e) {
                if (n.prototype.optimize.call(this, e), this.children.length === 0)
                  if (this.statics.defaultChild != null) {
                    var o = f.create(this.statics.defaultChild);
                    this.appendChild(o), o.optimize(e);
                  } else
                    this.remove();
              }, t.prototype.path = function(e, o) {
                o === void 0 && (o = !1);
                var l = this.children.find(e, o), i = l[0], r = l[1], a = [[this, e]];
                return i instanceof t ? a.concat(i.path(r, o)) : (i != null && a.push([i, r]), a);
              }, t.prototype.removeChild = function(e) {
                this.children.remove(e);
              }, t.prototype.replace = function(e) {
                e instanceof t && e.moveChildren(this), n.prototype.replace.call(this, e);
              }, t.prototype.split = function(e, o) {
                if (o === void 0 && (o = !1), !o) {
                  if (e === 0)
                    return this;
                  if (e === this.length())
                    return this.next;
                }
                var l = this.clone();
                return this.parent.insertBefore(l, this.next), this.children.forEachAt(e, this.length(), function(i, r, a) {
                  i = i.split(r, o), l.appendChild(i);
                }), l;
              }, t.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next), this.remove();
              }, t.prototype.update = function(e, o) {
                var l = this, i = [], r = [];
                e.forEach(function(a) {
                  a.target === l.domNode && a.type === "childList" && (i.push.apply(i, a.addedNodes), r.push.apply(r, a.removedNodes));
                }), r.forEach(function(a) {
                  if (!(a.parentNode != null && // @ts-ignore
                  a.tagName !== "IFRAME" && document.body.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                    var c = f.find(a);
                    c != null && (c.domNode.parentNode == null || c.domNode.parentNode === l.domNode) && c.detach();
                  }
                }), i.filter(function(a) {
                  return a.parentNode == l.domNode;
                }).sort(function(a, c) {
                  return a === c ? 0 : a.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                }).forEach(function(a) {
                  var c = null;
                  a.nextSibling != null && (c = f.find(a.nextSibling));
                  var s = u(a);
                  (s.next != c || s.next == null) && (s.parent != null && s.parent.removeChild(l), l.insertBefore(s, c || void 0));
                });
              }, t;
            }(p.default)
          );
          function u(n) {
            var t = f.find(n);
            if (t == null)
              try {
                t = f.create(n);
              } catch {
                t = f.create(f.Scope.INLINE), [].slice.call(n.childNodes).forEach(function(o) {
                  t.domNode.appendChild(o);
                }), n.parentNode && n.parentNode.replaceChild(t.domNode, n), t.attach();
              }
            return t;
          }
          h.default = d;
        },
        /* 18 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
              t.__proto__ = e;
            } || function(t, e) {
              for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            };
            return function(t, e) {
              n(t, e);
              function o() {
                this.constructor = t;
              }
              t.prototype = e === null ? Object.create(e) : (o.prototype = e.prototype, new o());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(12), p = v(31), f = v(17), d = v(1), u = (
            /** @class */
            function(n) {
              g(t, n);
              function t(e) {
                var o = n.call(this, e) || this;
                return o.attributes = new p.default(o.domNode), o;
              }
              return t.formats = function(e) {
                if (typeof this.tagName == "string")
                  return !0;
                if (Array.isArray(this.tagName))
                  return e.tagName.toLowerCase();
              }, t.prototype.format = function(e, o) {
                var l = d.query(e);
                l instanceof b.default ? this.attributes.attribute(l, o) : o && l != null && (e !== this.statics.blotName || this.formats()[e] !== o) && this.replaceWith(e, o);
              }, t.prototype.formats = function() {
                var e = this.attributes.values(), o = this.statics.formats(this.domNode);
                return o != null && (e[this.statics.blotName] = o), e;
              }, t.prototype.replaceWith = function(e, o) {
                var l = n.prototype.replaceWith.call(this, e, o);
                return this.attributes.copy(l), l;
              }, t.prototype.update = function(e, o) {
                var l = this;
                n.prototype.update.call(this, e, o), e.some(function(i) {
                  return i.target === l.domNode && i.type === "attributes";
                }) && this.attributes.build();
              }, t.prototype.wrap = function(e, o) {
                var l = n.prototype.wrap.call(this, e, o);
                return l instanceof t && l.statics.scope === this.statics.scope && this.attributes.move(l), l;
              }, t;
            }(f.default)
          );
          h.default = u;
        },
        /* 19 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(30), p = v(1), f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.value = function(n) {
                return !0;
              }, u.prototype.index = function(n, t) {
                return this.domNode === n || this.domNode.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
              }, u.prototype.position = function(n, t) {
                var e = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return n > 0 && (e += 1), [this.parent.domNode, e];
              }, u.prototype.value = function() {
                var n;
                return n = {}, n[this.statics.blotName] = this.statics.value(this.domNode) || !0, n;
              }, u.scope = p.Scope.INLINE_BLOT, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 20 */
        /***/
        function(_, h, v) {
          var g = v(11), b = v(3), p = {
            attributes: {
              compose: function(d, u, n) {
                typeof d != "object" && (d = {}), typeof u != "object" && (u = {});
                var t = b(!0, {}, u);
                n || (t = Object.keys(t).reduce(function(o, l) {
                  return t[l] != null && (o[l] = t[l]), o;
                }, {}));
                for (var e in d)
                  d[e] !== void 0 && u[e] === void 0 && (t[e] = d[e]);
                return Object.keys(t).length > 0 ? t : void 0;
              },
              diff: function(d, u) {
                typeof d != "object" && (d = {}), typeof u != "object" && (u = {});
                var n = Object.keys(d).concat(Object.keys(u)).reduce(function(t, e) {
                  return g(d[e], u[e]) || (t[e] = u[e] === void 0 ? null : u[e]), t;
                }, {});
                return Object.keys(n).length > 0 ? n : void 0;
              },
              transform: function(d, u, n) {
                if (typeof d != "object")
                  return u;
                if (typeof u == "object") {
                  if (!n)
                    return u;
                  var t = Object.keys(u).reduce(function(e, o) {
                    return d[o] === void 0 && (e[o] = u[o]), e;
                  }, {});
                  return Object.keys(t).length > 0 ? t : void 0;
                }
              }
            },
            iterator: function(d) {
              return new f(d);
            },
            length: function(d) {
              return typeof d.delete == "number" ? d.delete : typeof d.retain == "number" ? d.retain : typeof d.insert == "string" ? d.insert.length : 1;
            }
          };
          function f(d) {
            this.ops = d, this.index = 0, this.offset = 0;
          }
          f.prototype.hasNext = function() {
            return this.peekLength() < 1 / 0;
          }, f.prototype.next = function(d) {
            d || (d = 1 / 0);
            var u = this.ops[this.index];
            if (u) {
              var n = this.offset, t = p.length(u);
              if (d >= t - n ? (d = t - n, this.index += 1, this.offset = 0) : this.offset += d, typeof u.delete == "number")
                return { delete: d };
              var e = {};
              return u.attributes && (e.attributes = u.attributes), typeof u.retain == "number" ? e.retain = d : typeof u.insert == "string" ? e.insert = u.insert.substr(n, d) : e.insert = u.insert, e;
            } else
              return { retain: 1 / 0 };
          }, f.prototype.peek = function() {
            return this.ops[this.index];
          }, f.prototype.peekLength = function() {
            return this.ops[this.index] ? p.length(this.ops[this.index]) - this.offset : 1 / 0;
          }, f.prototype.peekType = function() {
            return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
          }, f.prototype.rest = function() {
            if (this.hasNext()) {
              if (this.offset === 0)
                return this.ops.slice(this.index);
              var d = this.offset, u = this.index, n = this.next(), t = this.ops.slice(this.index);
              return this.offset = d, this.index = u, [n].concat(t);
            } else
              return [];
          }, _.exports = p;
        },
        /* 21 */
        /***/
        function(_, h) {
          var v = function() {
            function g(l, i) {
              return i != null && l instanceof i;
            }
            var b;
            try {
              b = Map;
            } catch {
              b = function() {
              };
            }
            var p;
            try {
              p = Set;
            } catch {
              p = function() {
              };
            }
            var f;
            try {
              f = Promise;
            } catch {
              f = function() {
              };
            }
            function d(l, i, r, a, c) {
              typeof i == "object" && (r = i.depth, a = i.prototype, c = i.includeNonEnumerable, i = i.circular);
              var s = [], y = [], E = typeof Buffer < "u";
              typeof i > "u" && (i = !0), typeof r > "u" && (r = 1 / 0);
              function O(N, P) {
                if (N === null)
                  return null;
                if (P === 0)
                  return N;
                var x, w;
                if (typeof N != "object")
                  return N;
                if (g(N, b))
                  x = new b();
                else if (g(N, p))
                  x = new p();
                else if (g(N, f))
                  x = new f(function(M, S) {
                    N.then(function(q) {
                      M(O(q, P - 1));
                    }, function(q) {
                      S(O(q, P - 1));
                    });
                  });
                else if (d.__isArray(N))
                  x = [];
                else if (d.__isRegExp(N))
                  x = new RegExp(N.source, o(N)), N.lastIndex && (x.lastIndex = N.lastIndex);
                else if (d.__isDate(N))
                  x = new Date(N.getTime());
                else {
                  if (E && Buffer.isBuffer(N))
                    return Buffer.allocUnsafe ? x = Buffer.allocUnsafe(N.length) : x = new Buffer(N.length), N.copy(x), x;
                  g(N, Error) ? x = Object.create(N) : typeof a > "u" ? (w = Object.getPrototypeOf(N), x = Object.create(w)) : (x = Object.create(a), w = a);
                }
                if (i) {
                  var T = s.indexOf(N);
                  if (T != -1)
                    return y[T];
                  s.push(N), y.push(x);
                }
                g(N, b) && N.forEach(function(M, S) {
                  var q = O(S, P - 1), B = O(M, P - 1);
                  x.set(q, B);
                }), g(N, p) && N.forEach(function(M) {
                  var S = O(M, P - 1);
                  x.add(S);
                });
                for (var k in N) {
                  var j;
                  w && (j = Object.getOwnPropertyDescriptor(w, k)), !(j && j.set == null) && (x[k] = O(N[k], P - 1));
                }
                if (Object.getOwnPropertySymbols)
                  for (var D = Object.getOwnPropertySymbols(N), k = 0; k < D.length; k++) {
                    var z = D[k], $ = Object.getOwnPropertyDescriptor(N, z);
                    $ && !$.enumerable && !c || (x[z] = O(N[z], P - 1), $.enumerable || Object.defineProperty(x, z, {
                      enumerable: !1
                    }));
                  }
                if (c)
                  for (var J = Object.getOwnPropertyNames(N), k = 0; k < J.length; k++) {
                    var H = J[k], $ = Object.getOwnPropertyDescriptor(N, H);
                    $ && $.enumerable || (x[H] = O(N[H], P - 1), Object.defineProperty(x, H, {
                      enumerable: !1
                    }));
                  }
                return x;
              }
              return O(l, r);
            }
            d.clonePrototype = function(i) {
              if (i === null)
                return null;
              var r = function() {
              };
              return r.prototype = i, new r();
            };
            function u(l) {
              return Object.prototype.toString.call(l);
            }
            d.__objToStr = u;
            function n(l) {
              return typeof l == "object" && u(l) === "[object Date]";
            }
            d.__isDate = n;
            function t(l) {
              return typeof l == "object" && u(l) === "[object Array]";
            }
            d.__isArray = t;
            function e(l) {
              return typeof l == "object" && u(l) === "[object RegExp]";
            }
            d.__isRegExp = e;
            function o(l) {
              var i = "";
              return l.global && (i += "g"), l.ignoreCase && (i += "i"), l.multiline && (i += "m"), i;
            }
            return d.__getRegExpFlags = o, d;
          }();
          typeof _ == "object" && _.exports && (_.exports = v);
        },
        /* 22 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function x(w, T) {
              var k = [], j = !0, D = !1, z = void 0;
              try {
                for (var $ = w[Symbol.iterator](), J; !(j = (J = $.next()).done) && (k.push(J.value), !(T && k.length === T)); j = !0)
                  ;
              } catch (H) {
                D = !0, z = H;
              } finally {
                try {
                  !j && $.return && $.return();
                } finally {
                  if (D)
                    throw z;
                }
              }
              return k;
            }
            return function(w, T) {
              if (Array.isArray(w))
                return w;
              if (Symbol.iterator in Object(w))
                return x(w, T);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), b = /* @__PURE__ */ function() {
            function x(w, T) {
              for (var k = 0; k < T.length; k++) {
                var j = T[k];
                j.enumerable = j.enumerable || !1, j.configurable = !0, "value" in j && (j.writable = !0), Object.defineProperty(w, j.key, j);
              }
            }
            return function(w, T, k) {
              return T && x(w.prototype, T), k && x(w, k), w;
            };
          }(), p = function x(w, T, k) {
            w === null && (w = Function.prototype);
            var j = Object.getOwnPropertyDescriptor(w, T);
            if (j === void 0) {
              var D = Object.getPrototypeOf(w);
              return D === null ? void 0 : x(D, T, k);
            } else {
              if ("value" in j)
                return j.value;
              var z = j.get;
              return z === void 0 ? void 0 : z.call(k);
            }
          }, f = v(0), d = s(f), u = v(8), n = s(u), t = v(4), e = s(t), o = v(16), l = s(o), i = v(13), r = s(i), a = v(25), c = s(a);
          function s(x) {
            return x && x.__esModule ? x : { default: x };
          }
          function y(x, w) {
            if (!(x instanceof w))
              throw new TypeError("Cannot call a class as a function");
          }
          function E(x, w) {
            if (!x)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return w && (typeof w == "object" || typeof w == "function") ? w : x;
          }
          function O(x, w) {
            if (typeof w != "function" && w !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof w);
            x.prototype = Object.create(w && w.prototype, { constructor: { value: x, enumerable: !1, writable: !0, configurable: !0 } }), w && (Object.setPrototypeOf ? Object.setPrototypeOf(x, w) : x.__proto__ = w);
          }
          function N(x) {
            return x instanceof e.default || x instanceof t.BlockEmbed;
          }
          var P = function(x) {
            O(w, x);
            function w(T, k) {
              y(this, w);
              var j = E(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, T));
              return j.emitter = k.emitter, Array.isArray(k.whitelist) && (j.whitelist = k.whitelist.reduce(function(D, z) {
                return D[z] = !0, D;
              }, {})), j.domNode.addEventListener("DOMNodeInserted", function() {
              }), j.optimize(), j.enable(), j;
            }
            return b(w, [{
              key: "batchStart",
              value: function() {
                this.batch = !0;
              }
            }, {
              key: "batchEnd",
              value: function() {
                this.batch = !1, this.optimize();
              }
            }, {
              key: "deleteAt",
              value: function(k, j) {
                var D = this.line(k), z = g(D, 2), $ = z[0], J = z[1], H = this.line(k + j), M = g(H, 1), S = M[0];
                if (p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "deleteAt", this).call(this, k, j), S != null && $ !== S && J > 0) {
                  if ($ instanceof t.BlockEmbed || S instanceof t.BlockEmbed) {
                    this.optimize();
                    return;
                  }
                  if ($ instanceof r.default) {
                    var q = $.newlineIndex($.length(), !0);
                    if (q > -1 && ($ = $.split(q + 1), $ === S)) {
                      this.optimize();
                      return;
                    }
                  } else if (S instanceof r.default) {
                    var B = S.newlineIndex(0);
                    B > -1 && S.split(B + 1);
                  }
                  var K = S.children.head instanceof l.default ? null : S.children.head;
                  $.moveChildren(S, K), $.remove();
                }
                this.optimize();
              }
            }, {
              key: "enable",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.domNode.setAttribute("contenteditable", k);
              }
            }, {
              key: "formatAt",
              value: function(k, j, D, z) {
                this.whitelist != null && !this.whitelist[D] || (p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "formatAt", this).call(this, k, j, D, z), this.optimize());
              }
            }, {
              key: "insertAt",
              value: function(k, j, D) {
                if (!(D != null && this.whitelist != null && !this.whitelist[j])) {
                  if (k >= this.length())
                    if (D == null || d.default.query(j, d.default.Scope.BLOCK) == null) {
                      var z = d.default.create(this.statics.defaultChild);
                      this.appendChild(z), D == null && j.endsWith(`
`) && (j = j.slice(0, -1)), z.insertAt(0, j, D);
                    } else {
                      var $ = d.default.create(j, D);
                      this.appendChild($);
                    }
                  else
                    p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "insertAt", this).call(this, k, j, D);
                  this.optimize();
                }
              }
            }, {
              key: "insertBefore",
              value: function(k, j) {
                if (k.statics.scope === d.default.Scope.INLINE_BLOT) {
                  var D = d.default.create(this.statics.defaultChild);
                  D.appendChild(k), k = D;
                }
                p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "insertBefore", this).call(this, k, j);
              }
            }, {
              key: "leaf",
              value: function(k) {
                return this.path(k).pop() || [null, -1];
              }
            }, {
              key: "line",
              value: function(k) {
                return k === this.length() ? this.line(k - 1) : this.descendant(N, k);
              }
            }, {
              key: "lines",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, D = function z($, J, H) {
                  var M = [], S = H;
                  return $.children.forEachAt(J, H, function(q, B, K) {
                    N(q) ? M.push(q) : q instanceof d.default.Container && (M = M.concat(z(q, B, S))), S -= K;
                  }), M;
                };
                return D(this, k, j);
              }
            }, {
              key: "optimize",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                this.batch !== !0 && (p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "optimize", this).call(this, k, j), k.length > 0 && this.emitter.emit(n.default.events.SCROLL_OPTIMIZE, k, j));
              }
            }, {
              key: "path",
              value: function(k) {
                return p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "path", this).call(this, k).slice(1);
              }
            }, {
              key: "update",
              value: function(k) {
                if (this.batch !== !0) {
                  var j = n.default.sources.USER;
                  typeof k == "string" && (j = k), Array.isArray(k) || (k = this.observer.takeRecords()), k.length > 0 && this.emitter.emit(n.default.events.SCROLL_BEFORE_UPDATE, j, k), p(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "update", this).call(this, k.concat([])), k.length > 0 && this.emitter.emit(n.default.events.SCROLL_UPDATE, j, k);
                }
              }
            }]), w;
          }(d.default.Scroll);
          P.blotName = "scroll", P.className = "ql-editor", P.tagName = "DIV", P.defaultChild = "block", P.allowedChildren = [e.default, t.BlockEmbed, c.default], h.default = P;
        },
        /* 23 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.SHORTKEY = h.default = void 0;
          var g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(R) {
            return typeof R;
          } : function(R) {
            return R && typeof Symbol == "function" && R.constructor === Symbol && R !== Symbol.prototype ? "symbol" : typeof R;
          }, b = /* @__PURE__ */ function() {
            function R(F, W) {
              var G = [], X = !0, nt = !1, it = void 0;
              try {
                for (var at = F[Symbol.iterator](), ft; !(X = (ft = at.next()).done) && (G.push(ft.value), !(W && G.length === W)); X = !0)
                  ;
              } catch (ht) {
                nt = !0, it = ht;
              } finally {
                try {
                  !X && at.return && at.return();
                } finally {
                  if (nt)
                    throw it;
                }
              }
              return G;
            }
            return function(F, W) {
              if (Array.isArray(F))
                return F;
              if (Symbol.iterator in Object(F))
                return R(F, W);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), p = /* @__PURE__ */ function() {
            function R(F, W) {
              for (var G = 0; G < W.length; G++) {
                var X = W[G];
                X.enumerable = X.enumerable || !1, X.configurable = !0, "value" in X && (X.writable = !0), Object.defineProperty(F, X.key, X);
              }
            }
            return function(F, W, G) {
              return W && R(F.prototype, W), G && R(F, G), F;
            };
          }(), f = v(21), d = x(f), u = v(11), n = x(u), t = v(3), e = x(t), o = v(2), l = x(o), i = v(20), r = x(i), a = v(0), c = x(a), s = v(5), y = x(s), E = v(10), O = x(E), N = v(9), P = x(N);
          function x(R) {
            return R && R.__esModule ? R : { default: R };
          }
          function w(R, F, W) {
            return F in R ? Object.defineProperty(R, F, { value: W, enumerable: !0, configurable: !0, writable: !0 }) : R[F] = W, R;
          }
          function T(R, F) {
            if (!(R instanceof F))
              throw new TypeError("Cannot call a class as a function");
          }
          function k(R, F) {
            if (!R)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return F && (typeof F == "object" || typeof F == "function") ? F : R;
          }
          function j(R, F) {
            if (typeof F != "function" && F !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof F);
            R.prototype = Object.create(F && F.prototype, { constructor: { value: R, enumerable: !1, writable: !0, configurable: !0 } }), F && (Object.setPrototypeOf ? Object.setPrototypeOf(R, F) : R.__proto__ = F);
          }
          var D = (0, O.default)("quill:keyboard"), z = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", $ = function(R) {
            j(F, R), p(F, null, [{
              key: "match",
              value: function(G, X) {
                return X = U(X), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(nt) {
                  return !!X[nt] !== G[nt] && X[nt] !== null;
                }) ? !1 : X.key === (G.which || G.keyCode);
              }
            }]);
            function F(W, G) {
              T(this, F);
              var X = k(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this, W, G));
              return X.bindings = {}, Object.keys(X.options.bindings).forEach(function(nt) {
                nt === "list autofill" && W.scroll.whitelist != null && !W.scroll.whitelist.list || X.options.bindings[nt] && X.addBinding(X.options.bindings[nt]);
              }), X.addBinding({ key: F.keys.ENTER, shiftKey: null }, q), X.addBinding({ key: F.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
              }), /Firefox/i.test(navigator.userAgent) ? (X.addBinding({ key: F.keys.BACKSPACE }, { collapsed: !0 }, H), X.addBinding({ key: F.keys.DELETE }, { collapsed: !0 }, M)) : (X.addBinding({ key: F.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, H), X.addBinding({ key: F.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, M)), X.addBinding({ key: F.keys.BACKSPACE }, { collapsed: !1 }, S), X.addBinding({ key: F.keys.DELETE }, { collapsed: !1 }, S), X.addBinding({ key: F.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, H), X.listen(), X;
            }
            return p(F, [{
              key: "addBinding",
              value: function(G) {
                var X = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, nt = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, it = U(G);
                if (it == null || it.key == null)
                  return D.warn("Attempted to add invalid keyboard binding", it);
                typeof X == "function" && (X = { handler: X }), typeof nt == "function" && (nt = { handler: nt }), it = (0, e.default)(it, X, nt), this.bindings[it.key] = this.bindings[it.key] || [], this.bindings[it.key].push(it);
              }
            }, {
              key: "listen",
              value: function() {
                var G = this;
                this.quill.root.addEventListener("keydown", function(X) {
                  if (!X.defaultPrevented) {
                    var nt = X.which || X.keyCode, it = (G.bindings[nt] || []).filter(function(dt) {
                      return F.match(X, dt);
                    });
                    if (it.length !== 0) {
                      var at = G.quill.getSelection();
                      if (!(at == null || !G.quill.hasFocus())) {
                        var ft = G.quill.getLine(at.index), ht = b(ft, 2), mt = ht[0], gt = ht[1], Y = G.quill.getLeaf(at.index), Z = b(Y, 2), tt = Z[0], et = Z[1], Q = at.length === 0 ? [tt, et] : G.quill.getLeaf(at.index + at.length), st = b(Q, 2), ot = st[0], lt = st[1], Tt = tt instanceof c.default.Text ? tt.value().slice(0, et) : "", Et = ot instanceof c.default.Text ? ot.value().slice(lt) : "", vt = {
                          collapsed: at.length === 0,
                          empty: at.length === 0 && mt.length() <= 1,
                          format: G.quill.getFormat(at),
                          offset: gt,
                          prefix: Tt,
                          suffix: Et
                        }, Xt = it.some(function(dt) {
                          if (dt.collapsed != null && dt.collapsed !== vt.collapsed || dt.empty != null && dt.empty !== vt.empty || dt.offset != null && dt.offset !== vt.offset)
                            return !1;
                          if (Array.isArray(dt.format)) {
                            if (dt.format.every(function(Rt) {
                              return vt.format[Rt] == null;
                            }))
                              return !1;
                          } else if (g(dt.format) === "object" && !Object.keys(dt.format).every(function(Rt) {
                            return dt.format[Rt] === !0 ? vt.format[Rt] != null : dt.format[Rt] === !1 ? vt.format[Rt] == null : (0, n.default)(dt.format[Rt], vt.format[Rt]);
                          }))
                            return !1;
                          return dt.prefix != null && !dt.prefix.test(vt.prefix) || dt.suffix != null && !dt.suffix.test(vt.suffix) ? !1 : dt.handler.call(G, at, vt) !== !0;
                        });
                        Xt && X.preventDefault();
                      }
                    }
                  }
                });
              }
            }]), F;
          }(P.default);
          $.keys = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
          }, $.DEFAULTS = {
            bindings: {
              bold: K("bold"),
              italic: K("italic"),
              underline: K("underline"),
              indent: {
                // highlight tab or tab at beginning of list, indent or blockquote
                key: $.keys.TAB,
                format: ["blockquote", "indent", "list"],
                handler: function(F, W) {
                  if (W.collapsed && W.offset !== 0)
                    return !0;
                  this.quill.format("indent", "+1", y.default.sources.USER);
                }
              },
              outdent: {
                key: $.keys.TAB,
                shiftKey: !0,
                format: ["blockquote", "indent", "list"],
                // highlight tab or tab at beginning of list, indent or blockquote
                handler: function(F, W) {
                  if (W.collapsed && W.offset !== 0)
                    return !0;
                  this.quill.format("indent", "-1", y.default.sources.USER);
                }
              },
              "outdent backspace": {
                key: $.keys.BACKSPACE,
                collapsed: !0,
                shiftKey: null,
                metaKey: null,
                ctrlKey: null,
                altKey: null,
                format: ["indent", "list"],
                offset: 0,
                handler: function(F, W) {
                  W.format.indent != null ? this.quill.format("indent", "-1", y.default.sources.USER) : W.format.list != null && this.quill.format("list", !1, y.default.sources.USER);
                }
              },
              "indent code-block": B(!0),
              "outdent code-block": B(!1),
              "remove tab": {
                key: $.keys.TAB,
                shiftKey: !0,
                collapsed: !0,
                prefix: /\t$/,
                handler: function(F) {
                  this.quill.deleteText(F.index - 1, 1, y.default.sources.USER);
                }
              },
              tab: {
                key: $.keys.TAB,
                handler: function(F) {
                  this.quill.history.cutoff();
                  var W = new l.default().retain(F.index).delete(F.length).insert("	");
                  this.quill.updateContents(W, y.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(F.index + 1, y.default.sources.SILENT);
                }
              },
              "list empty enter": {
                key: $.keys.ENTER,
                collapsed: !0,
                format: ["list"],
                empty: !0,
                handler: function(F, W) {
                  this.quill.format("list", !1, y.default.sources.USER), W.format.indent && this.quill.format("indent", !1, y.default.sources.USER);
                }
              },
              "checklist enter": {
                key: $.keys.ENTER,
                collapsed: !0,
                format: { list: "checked" },
                handler: function(F) {
                  var W = this.quill.getLine(F.index), G = b(W, 2), X = G[0], nt = G[1], it = (0, e.default)({}, X.formats(), { list: "checked" }), at = new l.default().retain(F.index).insert(`
`, it).retain(X.length() - nt - 1).retain(1, { list: "unchecked" });
                  this.quill.updateContents(at, y.default.sources.USER), this.quill.setSelection(F.index + 1, y.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "header enter": {
                key: $.keys.ENTER,
                collapsed: !0,
                format: ["header"],
                suffix: /^$/,
                handler: function(F, W) {
                  var G = this.quill.getLine(F.index), X = b(G, 2), nt = X[0], it = X[1], at = new l.default().retain(F.index).insert(`
`, W.format).retain(nt.length() - it - 1).retain(1, { header: null });
                  this.quill.updateContents(at, y.default.sources.USER), this.quill.setSelection(F.index + 1, y.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "list autofill": {
                key: " ",
                collapsed: !0,
                format: { list: !1 },
                prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                handler: function(F, W) {
                  var G = W.prefix.length, X = this.quill.getLine(F.index), nt = b(X, 2), it = nt[0], at = nt[1];
                  if (at > G)
                    return !0;
                  var ft = void 0;
                  switch (W.prefix.trim()) {
                    case "[]":
                    case "[ ]":
                      ft = "unchecked";
                      break;
                    case "[x]":
                      ft = "checked";
                      break;
                    case "-":
                    case "*":
                      ft = "bullet";
                      break;
                    default:
                      ft = "ordered";
                  }
                  this.quill.insertText(F.index, " ", y.default.sources.USER), this.quill.history.cutoff();
                  var ht = new l.default().retain(F.index - at).delete(G + 1).retain(it.length() - 2 - at).retain(1, { list: ft });
                  this.quill.updateContents(ht, y.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(F.index - G, y.default.sources.SILENT);
                }
              },
              "code exit": {
                key: $.keys.ENTER,
                collapsed: !0,
                format: ["code-block"],
                prefix: /\n\n$/,
                suffix: /^\s+$/,
                handler: function(F) {
                  var W = this.quill.getLine(F.index), G = b(W, 2), X = G[0], nt = G[1], it = new l.default().retain(F.index + X.length() - nt - 2).retain(1, { "code-block": null }).delete(1);
                  this.quill.updateContents(it, y.default.sources.USER);
                }
              },
              "embed left": J($.keys.LEFT, !1),
              "embed left shift": J($.keys.LEFT, !0),
              "embed right": J($.keys.RIGHT, !1),
              "embed right shift": J($.keys.RIGHT, !0)
            }
          };
          function J(R, F) {
            var W, G = R === $.keys.LEFT ? "prefix" : "suffix";
            return W = {
              key: R,
              shiftKey: F,
              altKey: null
            }, w(W, G, /^$/), w(W, "handler", function(nt) {
              var it = nt.index;
              R === $.keys.RIGHT && (it += nt.length + 1);
              var at = this.quill.getLeaf(it), ft = b(at, 1), ht = ft[0];
              return ht instanceof c.default.Embed ? (R === $.keys.LEFT ? F ? this.quill.setSelection(nt.index - 1, nt.length + 1, y.default.sources.USER) : this.quill.setSelection(nt.index - 1, y.default.sources.USER) : F ? this.quill.setSelection(nt.index, nt.length + 1, y.default.sources.USER) : this.quill.setSelection(nt.index + nt.length + 1, y.default.sources.USER), !1) : !0;
            }), W;
          }
          function H(R, F) {
            if (!(R.index === 0 || this.quill.getLength() <= 1)) {
              var W = this.quill.getLine(R.index), G = b(W, 1), X = G[0], nt = {};
              if (F.offset === 0) {
                var it = this.quill.getLine(R.index - 1), at = b(it, 1), ft = at[0];
                if (ft != null && ft.length() > 1) {
                  var ht = X.formats(), mt = this.quill.getFormat(R.index - 1, 1);
                  nt = r.default.attributes.diff(ht, mt) || {};
                }
              }
              var gt = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(F.prefix) ? 2 : 1;
              this.quill.deleteText(R.index - gt, gt, y.default.sources.USER), Object.keys(nt).length > 0 && this.quill.formatLine(R.index - gt, gt, nt, y.default.sources.USER), this.quill.focus();
            }
          }
          function M(R, F) {
            var W = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(F.suffix) ? 2 : 1;
            if (!(R.index >= this.quill.getLength() - W)) {
              var G = {}, X = 0, nt = this.quill.getLine(R.index), it = b(nt, 1), at = it[0];
              if (F.offset >= at.length() - 1) {
                var ft = this.quill.getLine(R.index + 1), ht = b(ft, 1), mt = ht[0];
                if (mt) {
                  var gt = at.formats(), Y = this.quill.getFormat(R.index, 1);
                  G = r.default.attributes.diff(gt, Y) || {}, X = mt.length();
                }
              }
              this.quill.deleteText(R.index, W, y.default.sources.USER), Object.keys(G).length > 0 && this.quill.formatLine(R.index + X - 1, W, G, y.default.sources.USER);
            }
          }
          function S(R) {
            var F = this.quill.getLines(R), W = {};
            if (F.length > 1) {
              var G = F[0].formats(), X = F[F.length - 1].formats();
              W = r.default.attributes.diff(X, G) || {};
            }
            this.quill.deleteText(R, y.default.sources.USER), Object.keys(W).length > 0 && this.quill.formatLine(R.index, 1, W, y.default.sources.USER), this.quill.setSelection(R.index, y.default.sources.SILENT), this.quill.focus();
          }
          function q(R, F) {
            var W = this;
            R.length > 0 && this.quill.scroll.deleteAt(R.index, R.length);
            var G = Object.keys(F.format).reduce(function(X, nt) {
              return c.default.query(nt, c.default.Scope.BLOCK) && !Array.isArray(F.format[nt]) && (X[nt] = F.format[nt]), X;
            }, {});
            this.quill.insertText(R.index, `
`, G, y.default.sources.USER), this.quill.setSelection(R.index + 1, y.default.sources.SILENT), this.quill.focus(), Object.keys(F.format).forEach(function(X) {
              G[X] == null && (Array.isArray(F.format[X]) || X !== "link" && W.quill.format(X, F.format[X], y.default.sources.USER));
            });
          }
          function B(R) {
            return {
              key: $.keys.TAB,
              shiftKey: !R,
              format: { "code-block": !0 },
              handler: function(W) {
                var G = c.default.query("code-block"), X = W.index, nt = W.length, it = this.quill.scroll.descendant(G, X), at = b(it, 2), ft = at[0], ht = at[1];
                if (ft != null) {
                  var mt = this.quill.getIndex(ft), gt = ft.newlineIndex(ht, !0) + 1, Y = ft.newlineIndex(mt + ht + nt), Z = ft.domNode.textContent.slice(gt, Y).split(`
`);
                  ht = 0, Z.forEach(function(tt, et) {
                    R ? (ft.insertAt(gt + ht, G.TAB), ht += G.TAB.length, et === 0 ? X += G.TAB.length : nt += G.TAB.length) : tt.startsWith(G.TAB) && (ft.deleteAt(gt + ht, G.TAB.length), ht -= G.TAB.length, et === 0 ? X -= G.TAB.length : nt -= G.TAB.length), ht += tt.length + 1;
                  }), this.quill.update(y.default.sources.USER), this.quill.setSelection(X, nt, y.default.sources.SILENT);
                }
              }
            };
          }
          function K(R) {
            return {
              key: R[0].toUpperCase(),
              shortKey: !0,
              handler: function(W, G) {
                this.quill.format(R, !G.format[R], y.default.sources.USER);
              }
            };
          }
          function U(R) {
            if (typeof R == "string" || typeof R == "number")
              return U({ key: R });
            if ((typeof R > "u" ? "undefined" : g(R)) === "object" && (R = (0, d.default)(R, !1)), typeof R.key == "string")
              if ($.keys[R.key.toUpperCase()] != null)
                R.key = $.keys[R.key.toUpperCase()];
              else if (R.key.length === 1)
                R.key = R.key.toUpperCase().charCodeAt(0);
              else
                return null;
            return R.shortKey && (R[z] = R.shortKey, delete R.shortKey), R;
          }
          h.default = $, h.SHORTKEY = z;
        },
        /* 24 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function r(a, c) {
              var s = [], y = !0, E = !1, O = void 0;
              try {
                for (var N = a[Symbol.iterator](), P; !(y = (P = N.next()).done) && (s.push(P.value), !(c && s.length === c)); y = !0)
                  ;
              } catch (x) {
                E = !0, O = x;
              } finally {
                try {
                  !y && N.return && N.return();
                } finally {
                  if (E)
                    throw O;
                }
              }
              return s;
            }
            return function(a, c) {
              if (Array.isArray(a))
                return a;
              if (Symbol.iterator in Object(a))
                return r(a, c);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), b = function r(a, c, s) {
            a === null && (a = Function.prototype);
            var y = Object.getOwnPropertyDescriptor(a, c);
            if (y === void 0) {
              var E = Object.getPrototypeOf(a);
              return E === null ? void 0 : r(E, c, s);
            } else {
              if ("value" in y)
                return y.value;
              var O = y.get;
              return O === void 0 ? void 0 : O.call(s);
            }
          }, p = /* @__PURE__ */ function() {
            function r(a, c) {
              for (var s = 0; s < c.length; s++) {
                var y = c[s];
                y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(a, y.key, y);
              }
            }
            return function(a, c, s) {
              return c && r(a.prototype, c), s && r(a, s), a;
            };
          }(), f = v(0), d = t(f), u = v(7), n = t(u);
          function t(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function e(r, a) {
            if (!(r instanceof a))
              throw new TypeError("Cannot call a class as a function");
          }
          function o(r, a) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a && (typeof a == "object" || typeof a == "function") ? a : r;
          }
          function l(r, a) {
            if (typeof a != "function" && a !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof a);
            r.prototype = Object.create(a && a.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(r, a) : r.__proto__ = a);
          }
          var i = function(r) {
            l(a, r), p(a, null, [{
              key: "value",
              value: function() {
              }
            }]);
            function a(c, s) {
              e(this, a);
              var y = o(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, c));
              return y.selection = s, y.textNode = document.createTextNode(a.CONTENTS), y.domNode.appendChild(y.textNode), y._length = 0, y;
            }
            return p(a, [{
              key: "detach",
              value: function() {
                this.parent != null && this.parent.removeChild(this);
              }
            }, {
              key: "format",
              value: function(s, y) {
                if (this._length !== 0)
                  return b(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "format", this).call(this, s, y);
                for (var E = this, O = 0; E != null && E.statics.scope !== d.default.Scope.BLOCK_BLOT; )
                  O += E.offset(E.parent), E = E.parent;
                E != null && (this._length = a.CONTENTS.length, E.optimize(), E.formatAt(O, a.CONTENTS.length, s, y), this._length = 0);
              }
            }, {
              key: "index",
              value: function(s, y) {
                return s === this.textNode ? 0 : b(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "index", this).call(this, s, y);
              }
            }, {
              key: "length",
              value: function() {
                return this._length;
              }
            }, {
              key: "position",
              value: function() {
                return [this.textNode, this.textNode.data.length];
              }
            }, {
              key: "remove",
              value: function() {
                b(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "remove", this).call(this), this.parent = null;
              }
            }, {
              key: "restore",
              value: function() {
                if (!(this.selection.composing || this.parent == null)) {
                  var s = this.textNode, y = this.selection.getNativeRange(), E = void 0, O = void 0, N = void 0;
                  if (y != null && y.start.node === s && y.end.node === s) {
                    var P = [s, y.start.offset, y.end.offset];
                    E = P[0], O = P[1], N = P[2];
                  }
                  for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                    this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                  if (this.textNode.data !== a.CONTENTS) {
                    var x = this.textNode.data.split(a.CONTENTS).join("");
                    this.next instanceof n.default ? (E = this.next.domNode, this.next.insertAt(0, x), this.textNode.data = a.CONTENTS) : (this.textNode.data = x, this.parent.insertBefore(d.default.create(this.textNode), this), this.textNode = document.createTextNode(a.CONTENTS), this.domNode.appendChild(this.textNode));
                  }
                  if (this.remove(), O != null) {
                    var w = [O, N].map(function(k) {
                      return Math.max(0, Math.min(E.data.length, k - 1));
                    }), T = g(w, 2);
                    return O = T[0], N = T[1], {
                      startNode: E,
                      startOffset: O,
                      endNode: E,
                      endOffset: N
                    };
                  }
                }
              }
            }, {
              key: "update",
              value: function(s, y) {
                var E = this;
                if (s.some(function(N) {
                  return N.type === "characterData" && N.target === E.textNode;
                })) {
                  var O = this.restore();
                  O && (y.range = O);
                }
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }]), a;
          }(d.default.Embed);
          i.blotName = "cursor", i.className = "ql-cursor", i.tagName = "span", i.CONTENTS = "\uFEFF", h.default = i;
        },
        /* 25 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(0), b = d(g), p = v(4), f = d(p);
          function d(o) {
            return o && o.__esModule ? o : { default: o };
          }
          function u(o, l) {
            if (!(o instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(o, l) {
            if (!o)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : o;
          }
          function t(o, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            o.prototype = Object.create(l && l.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : o.__proto__ = l);
          }
          var e = function(o) {
            t(l, o);
            function l() {
              return u(this, l), n(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return l;
          }(b.default.Container);
          e.allowedChildren = [f.default, p.BlockEmbed, e], h.default = e;
        },
        /* 26 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.ColorStyle = h.ColorClass = h.ColorAttributor = void 0;
          var g = /* @__PURE__ */ function() {
            function i(r, a) {
              for (var c = 0; c < a.length; c++) {
                var s = a[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
              }
            }
            return function(r, a, c) {
              return a && i(r.prototype, a), c && i(r, c), r;
            };
          }(), b = function i(r, a, c) {
            r === null && (r = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(r, a);
            if (s === void 0) {
              var y = Object.getPrototypeOf(r);
              return y === null ? void 0 : i(y, a, c);
            } else {
              if ("value" in s)
                return s.value;
              var E = s.get;
              return E === void 0 ? void 0 : E.call(c);
            }
          }, p = v(0), f = d(p);
          function d(i) {
            return i && i.__esModule ? i : { default: i };
          }
          function u(i, r) {
            if (!(i instanceof r))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(i, r) {
            if (!i)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return r && (typeof r == "object" || typeof r == "function") ? r : i;
          }
          function t(i, r) {
            if (typeof r != "function" && r !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            i.prototype = Object.create(r && r.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(i, r) : i.__proto__ = r);
          }
          var e = function(i) {
            t(r, i);
            function r() {
              return u(this, r), n(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
            }
            return g(r, [{
              key: "value",
              value: function(c) {
                var s = b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "value", this).call(this, c);
                return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + s.split(",").map(function(y) {
                  return ("00" + parseInt(y).toString(16)).slice(-2);
                }).join("")) : s;
              }
            }]), r;
          }(f.default.Attributor.Style), o = new f.default.Attributor.Class("color", "ql-color", {
            scope: f.default.Scope.INLINE
          }), l = new e("color", "color", {
            scope: f.default.Scope.INLINE
          });
          h.ColorAttributor = e, h.ColorClass = o, h.ColorStyle = l;
        },
        /* 27 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.sanitize = h.default = void 0;
          var g = /* @__PURE__ */ function() {
            function l(i, r) {
              for (var a = 0; a < r.length; a++) {
                var c = r[a];
                c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(i, c.key, c);
              }
            }
            return function(i, r, a) {
              return r && l(i.prototype, r), a && l(i, a), i;
            };
          }(), b = function l(i, r, a) {
            i === null && (i = Function.prototype);
            var c = Object.getOwnPropertyDescriptor(i, r);
            if (c === void 0) {
              var s = Object.getPrototypeOf(i);
              return s === null ? void 0 : l(s, r, a);
            } else {
              if ("value" in c)
                return c.value;
              var y = c.get;
              return y === void 0 ? void 0 : y.call(a);
            }
          }, p = v(6), f = d(p);
          function d(l) {
            return l && l.__esModule ? l : { default: l };
          }
          function u(l, i) {
            if (!(l instanceof i))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(l, i) {
            if (!l)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return i && (typeof i == "object" || typeof i == "function") ? i : l;
          }
          function t(l, i) {
            if (typeof i != "function" && i !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof i);
            l.prototype = Object.create(i && i.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(l, i) : l.__proto__ = i);
          }
          var e = function(l) {
            t(i, l);
            function i() {
              return u(this, i), n(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
            }
            return g(i, [{
              key: "format",
              value: function(a, c) {
                if (a !== this.statics.blotName || !c)
                  return b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "format", this).call(this, a, c);
                c = this.constructor.sanitize(c), this.domNode.setAttribute("href", c);
              }
            }], [{
              key: "create",
              value: function(a) {
                var c = b(i.__proto__ || Object.getPrototypeOf(i), "create", this).call(this, a);
                return a = this.sanitize(a), c.setAttribute("href", a), c.setAttribute("rel", "noopener noreferrer"), c.setAttribute("target", "_blank"), c;
              }
            }, {
              key: "formats",
              value: function(a) {
                return a.getAttribute("href");
              }
            }, {
              key: "sanitize",
              value: function(a) {
                return o(a, this.PROTOCOL_WHITELIST) ? a : this.SANITIZED_URL;
              }
            }]), i;
          }(f.default);
          e.blotName = "link", e.tagName = "A", e.SANITIZED_URL = "about:blank", e.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
          function o(l, i) {
            var r = document.createElement("a");
            r.href = l;
            var a = r.href.slice(0, r.href.indexOf(":"));
            return i.indexOf(a) > -1;
          }
          h.default = e, h.sanitize = o;
        },
        /* 28 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
            return typeof i;
          } : function(i) {
            return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
          }, b = /* @__PURE__ */ function() {
            function i(r, a) {
              for (var c = 0; c < a.length; c++) {
                var s = a[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
              }
            }
            return function(r, a, c) {
              return a && i(r.prototype, a), c && i(r, c), r;
            };
          }(), p = v(23), f = n(p), d = v(107), u = n(d);
          function n(i) {
            return i && i.__esModule ? i : { default: i };
          }
          function t(i, r) {
            if (!(i instanceof r))
              throw new TypeError("Cannot call a class as a function");
          }
          var e = 0;
          function o(i, r) {
            i.setAttribute(r, i.getAttribute(r) !== "true");
          }
          var l = function() {
            function i(r) {
              var a = this;
              t(this, i), this.select = r, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
                a.togglePicker();
              }), this.label.addEventListener("keydown", function(c) {
                switch (c.keyCode) {
                  case f.default.keys.ENTER:
                    a.togglePicker();
                    break;
                  case f.default.keys.ESCAPE:
                    a.escape(), c.preventDefault();
                    break;
                }
              }), this.select.addEventListener("change", this.update.bind(this));
            }
            return b(i, [{
              key: "togglePicker",
              value: function() {
                this.container.classList.toggle("ql-expanded"), o(this.label, "aria-expanded"), o(this.options, "aria-hidden");
              }
            }, {
              key: "buildItem",
              value: function(a) {
                var c = this, s = document.createElement("span");
                return s.tabIndex = "0", s.setAttribute("role", "button"), s.classList.add("ql-picker-item"), a.hasAttribute("value") && s.setAttribute("data-value", a.getAttribute("value")), a.textContent && s.setAttribute("data-label", a.textContent), s.addEventListener("click", function() {
                  c.selectItem(s, !0);
                }), s.addEventListener("keydown", function(y) {
                  switch (y.keyCode) {
                    case f.default.keys.ENTER:
                      c.selectItem(s, !0), y.preventDefault();
                      break;
                    case f.default.keys.ESCAPE:
                      c.escape(), y.preventDefault();
                      break;
                  }
                }), s;
              }
            }, {
              key: "buildLabel",
              value: function() {
                var a = document.createElement("span");
                return a.classList.add("ql-picker-label"), a.innerHTML = u.default, a.tabIndex = "0", a.setAttribute("role", "button"), a.setAttribute("aria-expanded", "false"), this.container.appendChild(a), a;
              }
            }, {
              key: "buildOptions",
              value: function() {
                var a = this, c = document.createElement("span");
                c.classList.add("ql-picker-options"), c.setAttribute("aria-hidden", "true"), c.tabIndex = "-1", c.id = "ql-picker-options-" + e, e += 1, this.label.setAttribute("aria-controls", c.id), this.options = c, [].slice.call(this.select.options).forEach(function(s) {
                  var y = a.buildItem(s);
                  c.appendChild(y), s.selected === !0 && a.selectItem(y);
                }), this.container.appendChild(c);
              }
            }, {
              key: "buildPicker",
              value: function() {
                var a = this;
                [].slice.call(this.select.attributes).forEach(function(c) {
                  a.container.setAttribute(c.name, c.value);
                }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
              }
            }, {
              key: "escape",
              value: function() {
                var a = this;
                this.close(), setTimeout(function() {
                  return a.label.focus();
                }, 1);
              }
            }, {
              key: "close",
              value: function() {
                this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
              }
            }, {
              key: "selectItem",
              value: function(a) {
                var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.container.querySelector(".ql-selected");
                if (a !== s && (s != null && s.classList.remove("ql-selected"), a != null && (a.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(a.parentNode.children, a), a.hasAttribute("data-value") ? this.label.setAttribute("data-value", a.getAttribute("data-value")) : this.label.removeAttribute("data-value"), a.hasAttribute("data-label") ? this.label.setAttribute("data-label", a.getAttribute("data-label")) : this.label.removeAttribute("data-label"), c))) {
                  if (typeof Event == "function")
                    this.select.dispatchEvent(new Event("change"));
                  else if ((typeof Event > "u" ? "undefined" : g(Event)) === "object") {
                    var y = document.createEvent("Event");
                    y.initEvent("change", !0, !0), this.select.dispatchEvent(y);
                  }
                  this.close();
                }
              }
            }, {
              key: "update",
              value: function() {
                var a = void 0;
                if (this.select.selectedIndex > -1) {
                  var c = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                  a = this.select.options[this.select.selectedIndex], this.selectItem(c);
                } else
                  this.selectItem(null);
                var s = a != null && a !== this.select.querySelector("option[selected]");
                this.label.classList.toggle("ql-active", s);
              }
            }]), i;
          }();
          h.default = l;
        },
        /* 29 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(0), b = D(g), p = v(5), f = D(p), d = v(4), u = D(d), n = v(16), t = D(n), e = v(25), o = D(e), l = v(24), i = D(l), r = v(35), a = D(r), c = v(6), s = D(c), y = v(22), E = D(y), O = v(7), N = D(O), P = v(55), x = D(P), w = v(42), T = D(w), k = v(23), j = D(k);
          function D(z) {
            return z && z.__esModule ? z : { default: z };
          }
          f.default.register({
            "blots/block": u.default,
            "blots/block/embed": d.BlockEmbed,
            "blots/break": t.default,
            "blots/container": o.default,
            "blots/cursor": i.default,
            "blots/embed": a.default,
            "blots/inline": s.default,
            "blots/scroll": E.default,
            "blots/text": N.default,
            "modules/clipboard": x.default,
            "modules/history": T.default,
            "modules/keyboard": j.default
          }), b.default.register(u.default, t.default, i.default, s.default, E.default, N.default), h.default = f.default;
        },
        /* 30 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(1), b = (
            /** @class */
            function() {
              function p(f) {
                this.domNode = f, this.domNode[g.DATA_KEY] = { blot: this };
              }
              return Object.defineProperty(p.prototype, "statics", {
                // Hack for accessing inherited static methods
                get: function() {
                  return this.constructor;
                },
                enumerable: !0,
                configurable: !0
              }), p.create = function(f) {
                if (this.tagName == null)
                  throw new g.ParchmentError("Blot definition missing tagName");
                var d;
                return Array.isArray(this.tagName) ? (typeof f == "string" && (f = f.toUpperCase(), parseInt(f).toString() === f && (f = parseInt(f))), typeof f == "number" ? d = document.createElement(this.tagName[f - 1]) : this.tagName.indexOf(f) > -1 ? d = document.createElement(f) : d = document.createElement(this.tagName[0])) : d = document.createElement(this.tagName), this.className && d.classList.add(this.className), d;
              }, p.prototype.attach = function() {
                this.parent != null && (this.scroll = this.parent.scroll);
              }, p.prototype.clone = function() {
                var f = this.domNode.cloneNode(!1);
                return g.create(f);
              }, p.prototype.detach = function() {
                this.parent != null && this.parent.removeChild(this), delete this.domNode[g.DATA_KEY];
              }, p.prototype.deleteAt = function(f, d) {
                var u = this.isolate(f, d);
                u.remove();
              }, p.prototype.formatAt = function(f, d, u, n) {
                var t = this.isolate(f, d);
                if (g.query(u, g.Scope.BLOT) != null && n)
                  t.wrap(u, n);
                else if (g.query(u, g.Scope.ATTRIBUTE) != null) {
                  var e = g.create(this.statics.scope);
                  t.wrap(e), e.format(u, n);
                }
              }, p.prototype.insertAt = function(f, d, u) {
                var n = u == null ? g.create("text", d) : g.create(d, u), t = this.split(f);
                this.parent.insertBefore(n, t);
              }, p.prototype.insertInto = function(f, d) {
                d === void 0 && (d = null), this.parent != null && this.parent.children.remove(this);
                var u = null;
                f.children.insertBefore(this, d), d != null && (u = d.domNode), (this.domNode.parentNode != f.domNode || this.domNode.nextSibling != u) && f.domNode.insertBefore(this.domNode, u), this.parent = f, this.attach();
              }, p.prototype.isolate = function(f, d) {
                var u = this.split(f);
                return u.split(d), u;
              }, p.prototype.length = function() {
                return 1;
              }, p.prototype.offset = function(f) {
                return f === void 0 && (f = this.parent), this.parent == null || this == f ? 0 : this.parent.children.offset(this) + this.parent.offset(f);
              }, p.prototype.optimize = function(f) {
                this.domNode[g.DATA_KEY] != null && delete this.domNode[g.DATA_KEY].mutations;
              }, p.prototype.remove = function() {
                this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
              }, p.prototype.replace = function(f) {
                f.parent != null && (f.parent.insertBefore(this, f.next), f.remove());
              }, p.prototype.replaceWith = function(f, d) {
                var u = typeof f == "string" ? g.create(f, d) : f;
                return u.replace(this), u;
              }, p.prototype.split = function(f, d) {
                return f === 0 ? this : this.next;
              }, p.prototype.update = function(f, d) {
              }, p.prototype.wrap = function(f, d) {
                var u = typeof f == "string" ? g.create(f, d) : f;
                return this.parent != null && this.parent.insertBefore(u, this.next), u.appendChild(this), u;
              }, p.blotName = "abstract", p;
            }()
          );
          h.default = b;
        },
        /* 31 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(12), b = v(32), p = v(33), f = v(1), d = (
            /** @class */
            function() {
              function u(n) {
                this.attributes = {}, this.domNode = n, this.build();
              }
              return u.prototype.attribute = function(n, t) {
                t ? n.add(this.domNode, t) && (n.value(this.domNode) != null ? this.attributes[n.attrName] = n : delete this.attributes[n.attrName]) : (n.remove(this.domNode), delete this.attributes[n.attrName]);
              }, u.prototype.build = function() {
                var n = this;
                this.attributes = {};
                var t = g.default.keys(this.domNode), e = b.default.keys(this.domNode), o = p.default.keys(this.domNode);
                t.concat(e).concat(o).forEach(function(l) {
                  var i = f.query(l, f.Scope.ATTRIBUTE);
                  i instanceof g.default && (n.attributes[i.attrName] = i);
                });
              }, u.prototype.copy = function(n) {
                var t = this;
                Object.keys(this.attributes).forEach(function(e) {
                  var o = t.attributes[e].value(t.domNode);
                  n.format(e, o);
                });
              }, u.prototype.move = function(n) {
                var t = this;
                this.copy(n), Object.keys(this.attributes).forEach(function(e) {
                  t.attributes[e].remove(t.domNode);
                }), this.attributes = {};
              }, u.prototype.values = function() {
                var n = this;
                return Object.keys(this.attributes).reduce(function(t, e) {
                  return t[e] = n.attributes[e].value(n.domNode), t;
                }, {});
              }, u;
            }()
          );
          h.default = d;
        },
        /* 32 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(12);
          function p(d, u) {
            var n = d.getAttribute("class") || "";
            return n.split(/\s+/).filter(function(t) {
              return t.indexOf(u + "-") === 0;
            });
          }
          var f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.keys = function(n) {
                return (n.getAttribute("class") || "").split(/\s+/).map(function(t) {
                  return t.split("-").slice(0, -1).join("-");
                });
              }, u.prototype.add = function(n, t) {
                return this.canAdd(n, t) ? (this.remove(n), n.classList.add(this.keyName + "-" + t), !0) : !1;
              }, u.prototype.remove = function(n) {
                var t = p(n, this.keyName);
                t.forEach(function(e) {
                  n.classList.remove(e);
                }), n.classList.length === 0 && n.removeAttribute("class");
              }, u.prototype.value = function(n) {
                var t = p(n, this.keyName)[0] || "", e = t.slice(this.keyName.length + 1);
                return this.canAdd(n, e) ? e : "";
              }, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 33 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(12);
          function p(d) {
            var u = d.split("-"), n = u.slice(1).map(function(t) {
              return t[0].toUpperCase() + t.slice(1);
            }).join("");
            return u[0] + n;
          }
          var f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.keys = function(n) {
                return (n.getAttribute("style") || "").split(";").map(function(t) {
                  var e = t.split(":");
                  return e[0].trim();
                });
              }, u.prototype.add = function(n, t) {
                return this.canAdd(n, t) ? (n.style[p(this.keyName)] = t, !0) : !1;
              }, u.prototype.remove = function(n) {
                n.style[p(this.keyName)] = "", n.getAttribute("style") || n.removeAttribute("style");
              }, u.prototype.value = function(n) {
                var t = n.style[p(this.keyName)];
                return this.canAdd(n, t) ? t : "";
              }, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 34 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function f(d, u) {
              for (var n = 0; n < u.length; n++) {
                var t = u[n];
                t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(d, t.key, t);
              }
            }
            return function(d, u, n) {
              return u && f(d.prototype, u), n && f(d, n), d;
            };
          }();
          function b(f, d) {
            if (!(f instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          var p = function() {
            function f(d, u) {
              b(this, f), this.quill = d, this.options = u, this.modules = {};
            }
            return g(f, [{
              key: "init",
              value: function() {
                var u = this;
                Object.keys(this.options.modules).forEach(function(n) {
                  u.modules[n] == null && u.addModule(n);
                });
              }
            }, {
              key: "addModule",
              value: function(u) {
                var n = this.quill.constructor.import("modules/" + u);
                return this.modules[u] = new n(this.quill, this.options.modules[u] || {}), this.modules[u];
              }
            }]), f;
          }();
          p.DEFAULTS = {
            modules: {}
          }, p.themes = {
            default: p
          }, h.default = p;
        },
        /* 35 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function r(a, c) {
              for (var s = 0; s < c.length; s++) {
                var y = c[s];
                y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(a, y.key, y);
              }
            }
            return function(a, c, s) {
              return c && r(a.prototype, c), s && r(a, s), a;
            };
          }(), b = function r(a, c, s) {
            a === null && (a = Function.prototype);
            var y = Object.getOwnPropertyDescriptor(a, c);
            if (y === void 0) {
              var E = Object.getPrototypeOf(a);
              return E === null ? void 0 : r(E, c, s);
            } else {
              if ("value" in y)
                return y.value;
              var O = y.get;
              return O === void 0 ? void 0 : O.call(s);
            }
          }, p = v(0), f = n(p), d = v(7), u = n(d);
          function n(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function t(r, a) {
            if (!(r instanceof a))
              throw new TypeError("Cannot call a class as a function");
          }
          function e(r, a) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a && (typeof a == "object" || typeof a == "function") ? a : r;
          }
          function o(r, a) {
            if (typeof a != "function" && a !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof a);
            r.prototype = Object.create(a && a.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(r, a) : r.__proto__ = a);
          }
          var l = "\uFEFF", i = function(r) {
            o(a, r);
            function a(c) {
              t(this, a);
              var s = e(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, c));
              return s.contentNode = document.createElement("span"), s.contentNode.setAttribute("contenteditable", !1), [].slice.call(s.domNode.childNodes).forEach(function(y) {
                s.contentNode.appendChild(y);
              }), s.leftGuard = document.createTextNode(l), s.rightGuard = document.createTextNode(l), s.domNode.appendChild(s.leftGuard), s.domNode.appendChild(s.contentNode), s.domNode.appendChild(s.rightGuard), s;
            }
            return g(a, [{
              key: "index",
              value: function(s, y) {
                return s === this.leftGuard ? 0 : s === this.rightGuard ? 1 : b(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "index", this).call(this, s, y);
              }
            }, {
              key: "restore",
              value: function(s) {
                var y = void 0, E = void 0, O = s.data.split(l).join("");
                if (s === this.leftGuard)
                  if (this.prev instanceof u.default) {
                    var N = this.prev.length();
                    this.prev.insertAt(N, O), y = {
                      startNode: this.prev.domNode,
                      startOffset: N + O.length
                    };
                  } else
                    E = document.createTextNode(O), this.parent.insertBefore(f.default.create(E), this), y = {
                      startNode: E,
                      startOffset: O.length
                    };
                else
                  s === this.rightGuard && (this.next instanceof u.default ? (this.next.insertAt(0, O), y = {
                    startNode: this.next.domNode,
                    startOffset: O.length
                  }) : (E = document.createTextNode(O), this.parent.insertBefore(f.default.create(E), this.next), y = {
                    startNode: E,
                    startOffset: O.length
                  }));
                return s.data = l, y;
              }
            }, {
              key: "update",
              value: function(s, y) {
                var E = this;
                s.forEach(function(O) {
                  if (O.type === "characterData" && (O.target === E.leftGuard || O.target === E.rightGuard)) {
                    var N = E.restore(O.target);
                    N && (y.range = N);
                  }
                });
              }
            }]), a;
          }(f.default.Embed);
          h.default = i;
        },
        /* 36 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.AlignStyle = h.AlignClass = h.AlignAttribute = void 0;
          var g = v(0), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var f = {
            scope: b.default.Scope.BLOCK,
            whitelist: ["right", "center", "justify"]
          }, d = new b.default.Attributor.Attribute("align", "align", f), u = new b.default.Attributor.Class("align", "ql-align", f), n = new b.default.Attributor.Style("align", "text-align", f);
          h.AlignAttribute = d, h.AlignClass = u, h.AlignStyle = n;
        },
        /* 37 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.BackgroundStyle = h.BackgroundClass = void 0;
          var g = v(0), b = f(g), p = v(26);
          function f(n) {
            return n && n.__esModule ? n : { default: n };
          }
          var d = new b.default.Attributor.Class("background", "ql-bg", {
            scope: b.default.Scope.INLINE
          }), u = new p.ColorAttributor("background", "background-color", {
            scope: b.default.Scope.INLINE
          });
          h.BackgroundClass = d, h.BackgroundStyle = u;
        },
        /* 38 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.DirectionStyle = h.DirectionClass = h.DirectionAttribute = void 0;
          var g = v(0), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var f = {
            scope: b.default.Scope.BLOCK,
            whitelist: ["rtl"]
          }, d = new b.default.Attributor.Attribute("direction", "dir", f), u = new b.default.Attributor.Class("direction", "ql-direction", f), n = new b.default.Attributor.Style("direction", "direction", f);
          h.DirectionAttribute = d, h.DirectionClass = u, h.DirectionStyle = n;
        },
        /* 39 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.FontClass = h.FontStyle = void 0;
          var g = /* @__PURE__ */ function() {
            function r(a, c) {
              for (var s = 0; s < c.length; s++) {
                var y = c[s];
                y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(a, y.key, y);
              }
            }
            return function(a, c, s) {
              return c && r(a.prototype, c), s && r(a, s), a;
            };
          }(), b = function r(a, c, s) {
            a === null && (a = Function.prototype);
            var y = Object.getOwnPropertyDescriptor(a, c);
            if (y === void 0) {
              var E = Object.getPrototypeOf(a);
              return E === null ? void 0 : r(E, c, s);
            } else {
              if ("value" in y)
                return y.value;
              var O = y.get;
              return O === void 0 ? void 0 : O.call(s);
            }
          }, p = v(0), f = d(p);
          function d(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function u(r, a) {
            if (!(r instanceof a))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(r, a) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a && (typeof a == "object" || typeof a == "function") ? a : r;
          }
          function t(r, a) {
            if (typeof a != "function" && a !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof a);
            r.prototype = Object.create(a && a.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(r, a) : r.__proto__ = a);
          }
          var e = {
            scope: f.default.Scope.INLINE,
            whitelist: ["serif", "monospace"]
          }, o = new f.default.Attributor.Class("font", "ql-font", e), l = function(r) {
            t(a, r);
            function a() {
              return u(this, a), n(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
            }
            return g(a, [{
              key: "value",
              value: function(s) {
                return b(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "value", this).call(this, s).replace(/["']/g, "");
              }
            }]), a;
          }(f.default.Attributor.Style), i = new l("font", "font-family", e);
          h.FontStyle = i, h.FontClass = o;
        },
        /* 40 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.SizeStyle = h.SizeClass = void 0;
          var g = v(0), b = p(g);
          function p(u) {
            return u && u.__esModule ? u : { default: u };
          }
          var f = new b.default.Attributor.Class("size", "ql-size", {
            scope: b.default.Scope.INLINE,
            whitelist: ["small", "large", "huge"]
          }), d = new b.default.Attributor.Style("size", "font-size", {
            scope: b.default.Scope.INLINE,
            whitelist: ["10px", "18px", "32px"]
          });
          h.SizeClass = f, h.SizeStyle = d;
        },
        /* 41 */
        /***/
        function(_, h, v) {
          _.exports = {
            align: {
              "": v(76),
              center: v(77),
              right: v(78),
              justify: v(79)
            },
            background: v(80),
            blockquote: v(81),
            bold: v(82),
            clean: v(83),
            code: v(58),
            "code-block": v(58),
            color: v(84),
            direction: {
              "": v(85),
              rtl: v(86)
            },
            float: {
              center: v(87),
              full: v(88),
              left: v(89),
              right: v(90)
            },
            formula: v(91),
            header: {
              1: v(92),
              2: v(93)
            },
            italic: v(94),
            image: v(95),
            indent: {
              "+1": v(96),
              "-1": v(97)
            },
            link: v(98),
            list: {
              ordered: v(99),
              bullet: v(100),
              check: v(101)
            },
            script: {
              sub: v(102),
              super: v(103)
            },
            strike: v(104),
            underline: v(105),
            video: v(106)
          };
        },
        /* 42 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.getLastChangeIndex = h.default = void 0;
          var g = /* @__PURE__ */ function() {
            function c(s, y) {
              for (var E = 0; E < y.length; E++) {
                var O = y[E];
                O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(s, O.key, O);
              }
            }
            return function(s, y, E) {
              return y && c(s.prototype, y), E && c(s, E), s;
            };
          }(), b = v(0), p = t(b), f = v(5), d = t(f), u = v(9), n = t(u);
          function t(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function e(c, s) {
            if (!(c instanceof s))
              throw new TypeError("Cannot call a class as a function");
          }
          function o(c, s) {
            if (!c)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return s && (typeof s == "object" || typeof s == "function") ? s : c;
          }
          function l(c, s) {
            if (typeof s != "function" && s !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof s);
            c.prototype = Object.create(s && s.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(c, s) : c.__proto__ = s);
          }
          var i = function(c) {
            l(s, c);
            function s(y, E) {
              e(this, s);
              var O = o(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, y, E));
              return O.lastRecorded = 0, O.ignoreChange = !1, O.clear(), O.quill.on(d.default.events.EDITOR_CHANGE, function(N, P, x, w) {
                N !== d.default.events.TEXT_CHANGE || O.ignoreChange || (!O.options.userOnly || w === d.default.sources.USER ? O.record(P, x) : O.transform(P));
              }), O.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, O.undo.bind(O)), O.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, O.redo.bind(O)), /Win/i.test(navigator.platform) && O.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, O.redo.bind(O)), O;
            }
            return g(s, [{
              key: "change",
              value: function(E, O) {
                if (this.stack[E].length !== 0) {
                  var N = this.stack[E].pop();
                  this.stack[O].push(N), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(N[E], d.default.sources.USER), this.ignoreChange = !1;
                  var P = a(N[E]);
                  this.quill.setSelection(P);
                }
              }
            }, {
              key: "clear",
              value: function() {
                this.stack = { undo: [], redo: [] };
              }
            }, {
              key: "cutoff",
              value: function() {
                this.lastRecorded = 0;
              }
            }, {
              key: "record",
              value: function(E, O) {
                if (E.ops.length !== 0) {
                  this.stack.redo = [];
                  var N = this.quill.getContents().diff(O), P = Date.now();
                  if (this.lastRecorded + this.options.delay > P && this.stack.undo.length > 0) {
                    var x = this.stack.undo.pop();
                    N = N.compose(x.undo), E = x.redo.compose(E);
                  } else
                    this.lastRecorded = P;
                  this.stack.undo.push({
                    redo: E,
                    undo: N
                  }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
                }
              }
            }, {
              key: "redo",
              value: function() {
                this.change("redo", "undo");
              }
            }, {
              key: "transform",
              value: function(E) {
                this.stack.undo.forEach(function(O) {
                  O.undo = E.transform(O.undo, !0), O.redo = E.transform(O.redo, !0);
                }), this.stack.redo.forEach(function(O) {
                  O.undo = E.transform(O.undo, !0), O.redo = E.transform(O.redo, !0);
                });
              }
            }, {
              key: "undo",
              value: function() {
                this.change("undo", "redo");
              }
            }]), s;
          }(n.default);
          i.DEFAULTS = {
            delay: 1e3,
            maxStack: 100,
            userOnly: !1
          };
          function r(c) {
            var s = c.ops[c.ops.length - 1];
            return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some(function(y) {
              return p.default.query(y, p.default.Scope.BLOCK) != null;
            }) : !1;
          }
          function a(c) {
            var s = c.reduce(function(E, O) {
              return E += O.delete || 0, E;
            }, 0), y = c.length() - s;
            return r(c) && (y -= 1), y;
          }
          h.default = i, h.getLastChangeIndex = a;
        },
        /* 43 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.BaseTooltip = void 0;
          var g = /* @__PURE__ */ function() {
            function q(B, K) {
              for (var U = 0; U < K.length; U++) {
                var R = K[U];
                R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(B, R.key, R);
              }
            }
            return function(B, K, U) {
              return K && q(B.prototype, K), U && q(B, U), B;
            };
          }(), b = function q(B, K, U) {
            B === null && (B = Function.prototype);
            var R = Object.getOwnPropertyDescriptor(B, K);
            if (R === void 0) {
              var F = Object.getPrototypeOf(B);
              return F === null ? void 0 : q(F, K, U);
            } else {
              if ("value" in R)
                return R.value;
              var W = R.get;
              return W === void 0 ? void 0 : W.call(U);
            }
          }, p = v(3), f = P(p), d = v(2), u = P(d), n = v(8), t = P(n), e = v(23), o = P(e), l = v(34), i = P(l), r = v(59), a = P(r), c = v(60), s = P(c), y = v(28), E = P(y), O = v(61), N = P(O);
          function P(q) {
            return q && q.__esModule ? q : { default: q };
          }
          function x(q, B) {
            if (!(q instanceof B))
              throw new TypeError("Cannot call a class as a function");
          }
          function w(q, B) {
            if (!q)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return B && (typeof B == "object" || typeof B == "function") ? B : q;
          }
          function T(q, B) {
            if (typeof B != "function" && B !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof B);
            q.prototype = Object.create(B && B.prototype, { constructor: { value: q, enumerable: !1, writable: !0, configurable: !0 } }), B && (Object.setPrototypeOf ? Object.setPrototypeOf(q, B) : q.__proto__ = B);
          }
          var k = [!1, "center", "right", "justify"], j = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], D = [!1, "serif", "monospace"], z = ["1", "2", "3", !1], $ = ["small", !1, "large", "huge"], J = function(q) {
            T(B, q);
            function B(K, U) {
              x(this, B);
              var R = w(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this, K, U)), F = function W(G) {
                if (!document.body.contains(K.root))
                  return document.body.removeEventListener("click", W);
                R.tooltip != null && !R.tooltip.root.contains(G.target) && document.activeElement !== R.tooltip.textbox && !R.quill.hasFocus() && R.tooltip.hide(), R.pickers != null && R.pickers.forEach(function(X) {
                  X.container.contains(G.target) || X.close();
                });
              };
              return K.emitter.listenDOM("click", document.body, F), R;
            }
            return g(B, [{
              key: "addModule",
              value: function(U) {
                var R = b(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), "addModule", this).call(this, U);
                return U === "toolbar" && this.extendToolbar(R), R;
              }
            }, {
              key: "buildButtons",
              value: function(U, R) {
                U.forEach(function(F) {
                  var W = F.getAttribute("class") || "";
                  W.split(/\s+/).forEach(function(G) {
                    if (G.startsWith("ql-") && (G = G.slice(3), R[G] != null))
                      if (G === "direction")
                        F.innerHTML = R[G][""] + R[G].rtl;
                      else if (typeof R[G] == "string")
                        F.innerHTML = R[G];
                      else {
                        var X = F.value || "";
                        X != null && R[G][X] && (F.innerHTML = R[G][X]);
                      }
                  });
                });
              }
            }, {
              key: "buildPickers",
              value: function(U, R) {
                var F = this;
                this.pickers = U.map(function(G) {
                  if (G.classList.contains("ql-align"))
                    return G.querySelector("option") == null && S(G, k), new s.default(G, R.align);
                  if (G.classList.contains("ql-background") || G.classList.contains("ql-color")) {
                    var X = G.classList.contains("ql-background") ? "background" : "color";
                    return G.querySelector("option") == null && S(G, j, X === "background" ? "#ffffff" : "#000000"), new a.default(G, R[X]);
                  } else
                    return G.querySelector("option") == null && (G.classList.contains("ql-font") ? S(G, D) : G.classList.contains("ql-header") ? S(G, z) : G.classList.contains("ql-size") && S(G, $)), new E.default(G);
                });
                var W = function() {
                  F.pickers.forEach(function(X) {
                    X.update();
                  });
                };
                this.quill.on(t.default.events.EDITOR_CHANGE, W);
              }
            }]), B;
          }(i.default);
          J.DEFAULTS = (0, f.default)(!0, {}, i.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  formula: function() {
                    this.quill.theme.tooltip.edit("formula");
                  },
                  image: function() {
                    var B = this, K = this.container.querySelector("input.ql-image[type=file]");
                    K == null && (K = document.createElement("input"), K.setAttribute("type", "file"), K.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), K.classList.add("ql-image"), K.addEventListener("change", function() {
                      if (K.files != null && K.files[0] != null) {
                        var U = new FileReader();
                        U.onload = function(R) {
                          var F = B.quill.getSelection(!0);
                          B.quill.updateContents(new u.default().retain(F.index).delete(F.length).insert({ image: R.target.result }), t.default.sources.USER), B.quill.setSelection(F.index + 1, t.default.sources.SILENT), K.value = "";
                        }, U.readAsDataURL(K.files[0]);
                      }
                    }), this.container.appendChild(K)), K.click();
                  },
                  video: function() {
                    this.quill.theme.tooltip.edit("video");
                  }
                }
              }
            }
          });
          var H = function(q) {
            T(B, q);
            function B(K, U) {
              x(this, B);
              var R = w(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this, K, U));
              return R.textbox = R.root.querySelector('input[type="text"]'), R.listen(), R;
            }
            return g(B, [{
              key: "listen",
              value: function() {
                var U = this;
                this.textbox.addEventListener("keydown", function(R) {
                  o.default.match(R, "enter") ? (U.save(), R.preventDefault()) : o.default.match(R, "escape") && (U.cancel(), R.preventDefault());
                });
              }
            }, {
              key: "cancel",
              value: function() {
                this.hide();
              }
            }, {
              key: "edit",
              value: function() {
                var U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), R != null ? this.textbox.value = R : U !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + U) || ""), this.root.setAttribute("data-mode", U);
              }
            }, {
              key: "restoreFocus",
              value: function() {
                var U = this.quill.scrollingContainer.scrollTop;
                this.quill.focus(), this.quill.scrollingContainer.scrollTop = U;
              }
            }, {
              key: "save",
              value: function() {
                var U = this.textbox.value;
                switch (this.root.getAttribute("data-mode")) {
                  case "link": {
                    var R = this.quill.root.scrollTop;
                    this.linkRange ? (this.quill.formatText(this.linkRange, "link", U, t.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", U, t.default.sources.USER)), this.quill.root.scrollTop = R;
                    break;
                  }
                  case "video":
                    U = M(U);
                  case "formula": {
                    if (!U)
                      break;
                    var F = this.quill.getSelection(!0);
                    if (F != null) {
                      var W = F.index + F.length;
                      this.quill.insertEmbed(W, this.root.getAttribute("data-mode"), U, t.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(W + 1, " ", t.default.sources.USER), this.quill.setSelection(W + 2, t.default.sources.USER);
                    }
                    break;
                  }
                }
                this.textbox.value = "", this.hide();
              }
            }]), B;
          }(N.default);
          function M(q) {
            var B = q.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || q.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
            return B ? (B[1] || "https") + "://www.youtube.com/embed/" + B[2] + "?showinfo=0" : (B = q.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (B[1] || "https") + "://player.vimeo.com/video/" + B[2] + "/" : q;
          }
          function S(q, B) {
            var K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            B.forEach(function(U) {
              var R = document.createElement("option");
              U === K ? R.setAttribute("selected", "selected") : R.setAttribute("value", U), q.appendChild(R);
            });
          }
          h.BaseTooltip = H, h.default = J;
        },
        /* 44 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = (
            /** @class */
            function() {
              function b() {
                this.head = this.tail = null, this.length = 0;
              }
              return b.prototype.append = function() {
                for (var p = [], f = 0; f < arguments.length; f++)
                  p[f] = arguments[f];
                this.insertBefore(p[0], null), p.length > 1 && this.append.apply(this, p.slice(1));
              }, b.prototype.contains = function(p) {
                for (var f, d = this.iterator(); f = d(); )
                  if (f === p)
                    return !0;
                return !1;
              }, b.prototype.insertBefore = function(p, f) {
                p && (p.next = f, f != null ? (p.prev = f.prev, f.prev != null && (f.prev.next = p), f.prev = p, f === this.head && (this.head = p)) : this.tail != null ? (this.tail.next = p, p.prev = this.tail, this.tail = p) : (p.prev = null, this.head = this.tail = p), this.length += 1);
              }, b.prototype.offset = function(p) {
                for (var f = 0, d = this.head; d != null; ) {
                  if (d === p)
                    return f;
                  f += d.length(), d = d.next;
                }
                return -1;
              }, b.prototype.remove = function(p) {
                this.contains(p) && (p.prev != null && (p.prev.next = p.next), p.next != null && (p.next.prev = p.prev), p === this.head && (this.head = p.next), p === this.tail && (this.tail = p.prev), this.length -= 1);
              }, b.prototype.iterator = function(p) {
                return p === void 0 && (p = this.head), function() {
                  var f = p;
                  return p != null && (p = p.next), f;
                };
              }, b.prototype.find = function(p, f) {
                f === void 0 && (f = !1);
                for (var d, u = this.iterator(); d = u(); ) {
                  var n = d.length();
                  if (p < n || f && p === n && (d.next == null || d.next.length() !== 0))
                    return [d, p];
                  p -= n;
                }
                return [null, 0];
              }, b.prototype.forEach = function(p) {
                for (var f, d = this.iterator(); f = d(); )
                  p(f);
              }, b.prototype.forEachAt = function(p, f, d) {
                if (!(f <= 0))
                  for (var u = this.find(p), n = u[0], t = u[1], e, o = p - t, l = this.iterator(n); (e = l()) && o < p + f; ) {
                    var i = e.length();
                    p > o ? d(e, p - o, Math.min(f, o + i - p)) : d(e, 0, Math.min(i, p + f - o)), o += i;
                  }
              }, b.prototype.map = function(p) {
                return this.reduce(function(f, d) {
                  return f.push(p(d)), f;
                }, []);
              }, b.prototype.reduce = function(p, f) {
                for (var d, u = this.iterator(); d = u(); )
                  f = p(f, d);
                return f;
              }, b;
            }()
          );
          h.default = g;
        },
        /* 45 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
              t.__proto__ = e;
            } || function(t, e) {
              for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            };
            return function(t, e) {
              n(t, e);
              function o() {
                this.constructor = t;
              }
              t.prototype = e === null ? Object.create(e) : (o.prototype = e.prototype, new o());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(17), p = v(1), f = {
            attributes: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
          }, d = 100, u = (
            /** @class */
            function(n) {
              g(t, n);
              function t(e) {
                var o = n.call(this, e) || this;
                return o.scroll = o, o.observer = new MutationObserver(function(l) {
                  o.update(l);
                }), o.observer.observe(o.domNode, f), o.attach(), o;
              }
              return t.prototype.detach = function() {
                n.prototype.detach.call(this), this.observer.disconnect();
              }, t.prototype.deleteAt = function(e, o) {
                this.update(), e === 0 && o === this.length() ? this.children.forEach(function(l) {
                  l.remove();
                }) : n.prototype.deleteAt.call(this, e, o);
              }, t.prototype.formatAt = function(e, o, l, i) {
                this.update(), n.prototype.formatAt.call(this, e, o, l, i);
              }, t.prototype.insertAt = function(e, o, l) {
                this.update(), n.prototype.insertAt.call(this, e, o, l);
              }, t.prototype.optimize = function(e, o) {
                var l = this;
                e === void 0 && (e = []), o === void 0 && (o = {}), n.prototype.optimize.call(this, o);
                for (var i = [].slice.call(this.observer.takeRecords()); i.length > 0; )
                  e.push(i.pop());
                for (var r = function(y, E) {
                  E === void 0 && (E = !0), !(y == null || y === l) && y.domNode.parentNode != null && (y.domNode[p.DATA_KEY].mutations == null && (y.domNode[p.DATA_KEY].mutations = []), E && r(y.parent));
                }, a = function(y) {
                  // @ts-ignore
                  y.domNode[p.DATA_KEY] == null || // @ts-ignore
                  y.domNode[p.DATA_KEY].mutations == null || (y instanceof b.default && y.children.forEach(a), y.optimize(o));
                }, c = e, s = 0; c.length > 0; s += 1) {
                  if (s >= d)
                    throw new Error("[Parchment] Maximum optimize iterations reached");
                  for (c.forEach(function(y) {
                    var E = p.find(y.target, !0);
                    E != null && (E.domNode === y.target && (y.type === "childList" ? (r(p.find(y.previousSibling, !1)), [].forEach.call(y.addedNodes, function(O) {
                      var N = p.find(O, !1);
                      r(N, !1), N instanceof b.default && N.children.forEach(function(P) {
                        r(P, !1);
                      });
                    })) : y.type === "attributes" && r(E.prev)), r(E));
                  }), this.children.forEach(a), c = [].slice.call(this.observer.takeRecords()), i = c.slice(); i.length > 0; )
                    e.push(i.pop());
                }
              }, t.prototype.update = function(e, o) {
                var l = this;
                o === void 0 && (o = {}), e = e || this.observer.takeRecords(), e.map(function(i) {
                  var r = p.find(i.target, !0);
                  return r == null ? null : r.domNode[p.DATA_KEY].mutations == null ? (r.domNode[p.DATA_KEY].mutations = [i], r) : (r.domNode[p.DATA_KEY].mutations.push(i), null);
                }).forEach(function(i) {
                  i == null || i === l || //@ts-ignore
                  i.domNode[p.DATA_KEY] == null || i.update(i.domNode[p.DATA_KEY].mutations || [], o);
                }), this.domNode[p.DATA_KEY].mutations != null && n.prototype.update.call(this, this.domNode[p.DATA_KEY].mutations, o), this.optimize(e, o);
              }, t.blotName = "scroll", t.defaultChild = "block", t.scope = p.Scope.BLOCK_BLOT, t.tagName = "DIV", t;
            }(b.default)
          );
          h.default = u;
        },
        /* 46 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, t) {
              n.__proto__ = t;
            } || function(n, t) {
              for (var e in t)
                t.hasOwnProperty(e) && (n[e] = t[e]);
            };
            return function(n, t) {
              u(n, t);
              function e() {
                this.constructor = n;
              }
              n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(18), p = v(1);
          function f(u, n) {
            if (Object.keys(u).length !== Object.keys(n).length)
              return !1;
            for (var t in u)
              if (u[t] !== n[t])
                return !1;
            return !0;
          }
          var d = (
            /** @class */
            function(u) {
              g(n, u);
              function n() {
                return u !== null && u.apply(this, arguments) || this;
              }
              return n.formats = function(t) {
                if (t.tagName !== n.tagName)
                  return u.formats.call(this, t);
              }, n.prototype.format = function(t, e) {
                var o = this;
                t === this.statics.blotName && !e ? (this.children.forEach(function(l) {
                  l instanceof b.default || (l = l.wrap(n.blotName, !0)), o.attributes.copy(l);
                }), this.unwrap()) : u.prototype.format.call(this, t, e);
              }, n.prototype.formatAt = function(t, e, o, l) {
                if (this.formats()[o] != null || p.query(o, p.Scope.ATTRIBUTE)) {
                  var i = this.isolate(t, e);
                  i.format(o, l);
                } else
                  u.prototype.formatAt.call(this, t, e, o, l);
              }, n.prototype.optimize = function(t) {
                u.prototype.optimize.call(this, t);
                var e = this.formats();
                if (Object.keys(e).length === 0)
                  return this.unwrap();
                var o = this.next;
                o instanceof n && o.prev === this && f(e, o.formats()) && (o.moveChildren(this), o.remove());
              }, n.blotName = "inline", n.scope = p.Scope.INLINE_BLOT, n.tagName = "SPAN", n;
            }(b.default)
          );
          h.default = d;
        },
        /* 47 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(18), p = v(1), f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.formats = function(n) {
                var t = p.query(u.blotName).tagName;
                if (n.tagName !== t)
                  return d.formats.call(this, n);
              }, u.prototype.format = function(n, t) {
                p.query(n, p.Scope.BLOCK) != null && (n === this.statics.blotName && !t ? this.replaceWith(u.blotName) : d.prototype.format.call(this, n, t));
              }, u.prototype.formatAt = function(n, t, e, o) {
                p.query(e, p.Scope.BLOCK) != null ? this.format(e, o) : d.prototype.formatAt.call(this, n, t, e, o);
              }, u.prototype.insertAt = function(n, t, e) {
                if (e == null || p.query(t, p.Scope.INLINE) != null)
                  d.prototype.insertAt.call(this, n, t, e);
                else {
                  var o = this.split(n), l = p.create(t, e);
                  o.parent.insertBefore(l, o);
                }
              }, u.prototype.update = function(n, t) {
                navigator.userAgent.match(/Trident/) ? this.build() : d.prototype.update.call(this, n, t);
              }, u.blotName = "block", u.scope = p.Scope.BLOCK_BLOT, u.tagName = "P", u;
            }(b.default)
          );
          h.default = f;
        },
        /* 48 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, u) {
              d.__proto__ = u;
            } || function(d, u) {
              for (var n in u)
                u.hasOwnProperty(n) && (d[n] = u[n]);
            };
            return function(d, u) {
              f(d, u);
              function n() {
                this.constructor = d;
              }
              d.prototype = u === null ? Object.create(u) : (n.prototype = u.prototype, new n());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(19), p = (
            /** @class */
            function(f) {
              g(d, f);
              function d() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return d.formats = function(u) {
              }, d.prototype.format = function(u, n) {
                f.prototype.formatAt.call(this, 0, this.length(), u, n);
              }, d.prototype.formatAt = function(u, n, t, e) {
                u === 0 && n === this.length() ? this.format(t, e) : f.prototype.formatAt.call(this, u, n, t, e);
              }, d.prototype.formats = function() {
                return this.statics.formats(this.domNode);
              }, d;
            }(b.default)
          );
          h.default = p;
        },
        /* 49 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(19), p = v(1), f = (
            /** @class */
            function(d) {
              g(u, d);
              function u(n) {
                var t = d.call(this, n) || this;
                return t.text = t.statics.value(t.domNode), t;
              }
              return u.create = function(n) {
                return document.createTextNode(n);
              }, u.value = function(n) {
                var t = n.data;
                return t.normalize && (t = t.normalize()), t;
              }, u.prototype.deleteAt = function(n, t) {
                this.domNode.data = this.text = this.text.slice(0, n) + this.text.slice(n + t);
              }, u.prototype.index = function(n, t) {
                return this.domNode === n ? t : -1;
              }, u.prototype.insertAt = function(n, t, e) {
                e == null ? (this.text = this.text.slice(0, n) + t + this.text.slice(n), this.domNode.data = this.text) : d.prototype.insertAt.call(this, n, t, e);
              }, u.prototype.length = function() {
                return this.text.length;
              }, u.prototype.optimize = function(n) {
                d.prototype.optimize.call(this, n), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof u && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
              }, u.prototype.position = function(n, t) {
                return [this.domNode, n];
              }, u.prototype.split = function(n, t) {
                if (t === void 0 && (t = !1), !t) {
                  if (n === 0)
                    return this;
                  if (n === this.length())
                    return this.next;
                }
                var e = p.create(this.domNode.splitText(n));
                return this.parent.insertBefore(e, this.next), this.text = this.statics.value(this.domNode), e;
              }, u.prototype.update = function(n, t) {
                var e = this;
                n.some(function(o) {
                  return o.type === "characterData" && o.target === e.domNode;
                }) && (this.text = this.statics.value(this.domNode));
              }, u.prototype.value = function() {
                return this.text;
              }, u.blotName = "text", u.scope = p.Scope.INLINE_BLOT, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 50 */
        /***/
        function(_, h, v) {
          var g = document.createElement("div");
          if (g.classList.toggle("test-class", !1), g.classList.contains("test-class")) {
            var b = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(p, f) {
              return arguments.length > 1 && !this.contains(p) == !f ? f : b.call(this, p);
            };
          }
          String.prototype.startsWith || (String.prototype.startsWith = function(p, f) {
            return f = f || 0, this.substr(f, p.length) === p;
          }), String.prototype.endsWith || (String.prototype.endsWith = function(p, f) {
            var d = this.toString();
            (typeof f != "number" || !isFinite(f) || Math.floor(f) !== f || f > d.length) && (f = d.length), f -= p.length;
            var u = d.indexOf(p, f);
            return u !== -1 && u === f;
          }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(f) {
              if (this === null)
                throw new TypeError("Array.prototype.find called on null or undefined");
              if (typeof f != "function")
                throw new TypeError("predicate must be a function");
              for (var d = Object(this), u = d.length >>> 0, n = arguments[1], t, e = 0; e < u; e++)
                if (t = d[e], f.call(n, t, e, d))
                  return t;
            }
          }), document.addEventListener("DOMContentLoaded", function() {
            document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
          });
        },
        /* 51 */
        /***/
        function(_, h) {
          var v = -1, g = 1, b = 0;
          function p(s, y, E) {
            if (s == y)
              return s ? [[b, s]] : [];
            (E < 0 || s.length < E) && (E = null);
            var O = n(s, y), N = s.substring(0, O);
            s = s.substring(O), y = y.substring(O), O = t(s, y);
            var P = s.substring(s.length - O);
            s = s.substring(0, s.length - O), y = y.substring(0, y.length - O);
            var x = f(s, y);
            return N && x.unshift([b, N]), P && x.push([b, P]), o(x), E != null && (x = r(x, E)), x = a(x), x;
          }
          function f(s, y) {
            var E;
            if (!s)
              return [[g, y]];
            if (!y)
              return [[v, s]];
            var O = s.length > y.length ? s : y, N = s.length > y.length ? y : s, P = O.indexOf(N);
            if (P != -1)
              return E = [
                [g, O.substring(0, P)],
                [b, N],
                [g, O.substring(P + N.length)]
              ], s.length > y.length && (E[0][0] = E[2][0] = v), E;
            if (N.length == 1)
              return [[v, s], [g, y]];
            var x = e(s, y);
            if (x) {
              var w = x[0], T = x[1], k = x[2], j = x[3], D = x[4], z = p(w, k), $ = p(T, j);
              return z.concat([[b, D]], $);
            }
            return d(s, y);
          }
          function d(s, y) {
            for (var E = s.length, O = y.length, N = Math.ceil((E + O) / 2), P = N, x = 2 * N, w = new Array(x), T = new Array(x), k = 0; k < x; k++)
              w[k] = -1, T[k] = -1;
            w[P + 1] = 0, T[P + 1] = 0;
            for (var j = E - O, D = j % 2 != 0, z = 0, $ = 0, J = 0, H = 0, M = 0; M < N; M++) {
              for (var S = -M + z; S <= M - $; S += 2) {
                var q = P + S, B;
                S == -M || S != M && w[q - 1] < w[q + 1] ? B = w[q + 1] : B = w[q - 1] + 1;
                for (var K = B - S; B < E && K < O && s.charAt(B) == y.charAt(K); )
                  B++, K++;
                if (w[q] = B, B > E)
                  $ += 2;
                else if (K > O)
                  z += 2;
                else if (D) {
                  var U = P + j - S;
                  if (U >= 0 && U < x && T[U] != -1) {
                    var R = E - T[U];
                    if (B >= R)
                      return u(s, y, B, K);
                  }
                }
              }
              for (var F = -M + J; F <= M - H; F += 2) {
                var U = P + F, R;
                F == -M || F != M && T[U - 1] < T[U + 1] ? R = T[U + 1] : R = T[U - 1] + 1;
                for (var W = R - F; R < E && W < O && s.charAt(E - R - 1) == y.charAt(O - W - 1); )
                  R++, W++;
                if (T[U] = R, R > E)
                  H += 2;
                else if (W > O)
                  J += 2;
                else if (!D) {
                  var q = P + j - F;
                  if (q >= 0 && q < x && w[q] != -1) {
                    var B = w[q], K = P + B - q;
                    if (R = E - R, B >= R)
                      return u(s, y, B, K);
                  }
                }
              }
            }
            return [[v, s], [g, y]];
          }
          function u(s, y, E, O) {
            var N = s.substring(0, E), P = y.substring(0, O), x = s.substring(E), w = y.substring(O), T = p(N, P), k = p(x, w);
            return T.concat(k);
          }
          function n(s, y) {
            if (!s || !y || s.charAt(0) != y.charAt(0))
              return 0;
            for (var E = 0, O = Math.min(s.length, y.length), N = O, P = 0; E < N; )
              s.substring(P, N) == y.substring(P, N) ? (E = N, P = E) : O = N, N = Math.floor((O - E) / 2 + E);
            return N;
          }
          function t(s, y) {
            if (!s || !y || s.charAt(s.length - 1) != y.charAt(y.length - 1))
              return 0;
            for (var E = 0, O = Math.min(s.length, y.length), N = O, P = 0; E < N; )
              s.substring(s.length - N, s.length - P) == y.substring(y.length - N, y.length - P) ? (E = N, P = E) : O = N, N = Math.floor((O - E) / 2 + E);
            return N;
          }
          function e(s, y) {
            var E = s.length > y.length ? s : y, O = s.length > y.length ? y : s;
            if (E.length < 4 || O.length * 2 < E.length)
              return null;
            function N($, J, H) {
              for (var M = $.substring(H, H + Math.floor($.length / 4)), S = -1, q = "", B, K, U, R; (S = J.indexOf(M, S + 1)) != -1; ) {
                var F = n(
                  $.substring(H),
                  J.substring(S)
                ), W = t(
                  $.substring(0, H),
                  J.substring(0, S)
                );
                q.length < W + F && (q = J.substring(S - W, S) + J.substring(S, S + F), B = $.substring(0, H - W), K = $.substring(H + F), U = J.substring(0, S - W), R = J.substring(S + F));
              }
              return q.length * 2 >= $.length ? [
                B,
                K,
                U,
                R,
                q
              ] : null;
            }
            var P = N(
              E,
              O,
              Math.ceil(E.length / 4)
            ), x = N(
              E,
              O,
              Math.ceil(E.length / 2)
            ), w;
            if (!P && !x)
              return null;
            x ? P ? w = P[4].length > x[4].length ? P : x : w = x : w = P;
            var T, k, j, D;
            s.length > y.length ? (T = w[0], k = w[1], j = w[2], D = w[3]) : (j = w[0], D = w[1], T = w[2], k = w[3]);
            var z = w[4];
            return [T, k, j, D, z];
          }
          function o(s) {
            s.push([b, ""]);
            for (var y = 0, E = 0, O = 0, N = "", P = "", x; y < s.length; )
              switch (s[y][0]) {
                case g:
                  O++, P += s[y][1], y++;
                  break;
                case v:
                  E++, N += s[y][1], y++;
                  break;
                case b:
                  E + O > 1 ? (E !== 0 && O !== 0 && (x = n(P, N), x !== 0 && (y - E - O > 0 && s[y - E - O - 1][0] == b ? s[y - E - O - 1][1] += P.substring(0, x) : (s.splice(0, 0, [
                    b,
                    P.substring(0, x)
                  ]), y++), P = P.substring(x), N = N.substring(x)), x = t(P, N), x !== 0 && (s[y][1] = P.substring(P.length - x) + s[y][1], P = P.substring(0, P.length - x), N = N.substring(0, N.length - x))), E === 0 ? s.splice(
                    y - O,
                    E + O,
                    [g, P]
                  ) : O === 0 ? s.splice(
                    y - E,
                    E + O,
                    [v, N]
                  ) : s.splice(
                    y - E - O,
                    E + O,
                    [v, N],
                    [g, P]
                  ), y = y - E - O + (E ? 1 : 0) + (O ? 1 : 0) + 1) : y !== 0 && s[y - 1][0] == b ? (s[y - 1][1] += s[y][1], s.splice(y, 1)) : y++, O = 0, E = 0, N = "", P = "";
                  break;
              }
            s[s.length - 1][1] === "" && s.pop();
            var w = !1;
            for (y = 1; y < s.length - 1; )
              s[y - 1][0] == b && s[y + 1][0] == b && (s[y][1].substring(s[y][1].length - s[y - 1][1].length) == s[y - 1][1] ? (s[y][1] = s[y - 1][1] + s[y][1].substring(0, s[y][1].length - s[y - 1][1].length), s[y + 1][1] = s[y - 1][1] + s[y + 1][1], s.splice(y - 1, 1), w = !0) : s[y][1].substring(0, s[y + 1][1].length) == s[y + 1][1] && (s[y - 1][1] += s[y + 1][1], s[y][1] = s[y][1].substring(s[y + 1][1].length) + s[y + 1][1], s.splice(y + 1, 1), w = !0)), y++;
            w && o(s);
          }
          var l = p;
          l.INSERT = g, l.DELETE = v, l.EQUAL = b, _.exports = l;
          function i(s, y) {
            if (y === 0)
              return [b, s];
            for (var E = 0, O = 0; O < s.length; O++) {
              var N = s[O];
              if (N[0] === v || N[0] === b) {
                var P = E + N[1].length;
                if (y === P)
                  return [O + 1, s];
                if (y < P) {
                  s = s.slice();
                  var x = y - E, w = [N[0], N[1].slice(0, x)], T = [N[0], N[1].slice(x)];
                  return s.splice(O, 1, w, T), [O + 1, s];
                } else
                  E = P;
              }
            }
            throw new Error("cursor_pos is out of bounds!");
          }
          function r(s, y) {
            var E = i(s, y), O = E[1], N = E[0], P = O[N], x = O[N + 1];
            if (P == null)
              return s;
            if (P[0] !== b)
              return s;
            if (x != null && P[1] + x[1] === x[1] + P[1])
              return O.splice(N, 2, x, P), c(O, N, 2);
            if (x != null && x[1].indexOf(P[1]) === 0) {
              O.splice(N, 2, [x[0], P[1]], [0, P[1]]);
              var w = x[1].slice(P[1].length);
              return w.length > 0 && O.splice(N + 2, 0, [x[0], w]), c(O, N, 3);
            } else
              return s;
          }
          function a(s) {
            for (var y = !1, E = function(x) {
              return x.charCodeAt(0) >= 56320 && x.charCodeAt(0) <= 57343;
            }, O = function(x) {
              return x.charCodeAt(x.length - 1) >= 55296 && x.charCodeAt(x.length - 1) <= 56319;
            }, N = 2; N < s.length; N += 1)
              s[N - 2][0] === b && O(s[N - 2][1]) && s[N - 1][0] === v && E(s[N - 1][1]) && s[N][0] === g && E(s[N][1]) && (y = !0, s[N - 1][1] = s[N - 2][1].slice(-1) + s[N - 1][1], s[N][1] = s[N - 2][1].slice(-1) + s[N][1], s[N - 2][1] = s[N - 2][1].slice(0, -1));
            if (!y)
              return s;
            for (var P = [], N = 0; N < s.length; N += 1)
              s[N][1].length > 0 && P.push(s[N]);
            return P;
          }
          function c(s, y, E) {
            for (var O = y + E - 1; O >= 0 && O >= y - 1; O--)
              if (O + 1 < s.length) {
                var N = s[O], P = s[O + 1];
                N[0] === P[1] && s.splice(O, 2, [N[0], N[1] + P[1]]);
              }
            return s;
          }
        },
        /* 52 */
        /***/
        function(_, h) {
          h = _.exports = typeof Object.keys == "function" ? Object.keys : v, h.shim = v;
          function v(g) {
            var b = [];
            for (var p in g)
              b.push(p);
            return b;
          }
        },
        /* 53 */
        /***/
        function(_, h) {
          var v = function() {
            return Object.prototype.toString.call(arguments);
          }() == "[object Arguments]";
          h = _.exports = v ? g : b, h.supported = g;
          function g(p) {
            return Object.prototype.toString.call(p) == "[object Arguments]";
          }
          h.unsupported = b;
          function b(p) {
            return p && typeof p == "object" && typeof p.length == "number" && Object.prototype.hasOwnProperty.call(p, "callee") && !Object.prototype.propertyIsEnumerable.call(p, "callee") || !1;
          }
        },
        /* 54 */
        /***/
        function(_, h) {
          var v = Object.prototype.hasOwnProperty, g = "~";
          function b() {
          }
          Object.create && (b.prototype = /* @__PURE__ */ Object.create(null), new b().__proto__ || (g = !1));
          function p(d, u, n) {
            this.fn = d, this.context = u, this.once = n || !1;
          }
          function f() {
            this._events = new b(), this._eventsCount = 0;
          }
          f.prototype.eventNames = function() {
            var u = [], n, t;
            if (this._eventsCount === 0)
              return u;
            for (t in n = this._events)
              v.call(n, t) && u.push(g ? t.slice(1) : t);
            return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(n)) : u;
          }, f.prototype.listeners = function(u, n) {
            var t = g ? g + u : u, e = this._events[t];
            if (n)
              return !!e;
            if (!e)
              return [];
            if (e.fn)
              return [e.fn];
            for (var o = 0, l = e.length, i = new Array(l); o < l; o++)
              i[o] = e[o].fn;
            return i;
          }, f.prototype.emit = function(u, n, t, e, o, l) {
            var i = g ? g + u : u;
            if (!this._events[i])
              return !1;
            var r = this._events[i], a = arguments.length, c, s;
            if (r.fn) {
              switch (r.once && this.removeListener(u, r.fn, void 0, !0), a) {
                case 1:
                  return r.fn.call(r.context), !0;
                case 2:
                  return r.fn.call(r.context, n), !0;
                case 3:
                  return r.fn.call(r.context, n, t), !0;
                case 4:
                  return r.fn.call(r.context, n, t, e), !0;
                case 5:
                  return r.fn.call(r.context, n, t, e, o), !0;
                case 6:
                  return r.fn.call(r.context, n, t, e, o, l), !0;
              }
              for (s = 1, c = new Array(a - 1); s < a; s++)
                c[s - 1] = arguments[s];
              r.fn.apply(r.context, c);
            } else {
              var y = r.length, E;
              for (s = 0; s < y; s++)
                switch (r[s].once && this.removeListener(u, r[s].fn, void 0, !0), a) {
                  case 1:
                    r[s].fn.call(r[s].context);
                    break;
                  case 2:
                    r[s].fn.call(r[s].context, n);
                    break;
                  case 3:
                    r[s].fn.call(r[s].context, n, t);
                    break;
                  case 4:
                    r[s].fn.call(r[s].context, n, t, e);
                    break;
                  default:
                    if (!c)
                      for (E = 1, c = new Array(a - 1); E < a; E++)
                        c[E - 1] = arguments[E];
                    r[s].fn.apply(r[s].context, c);
                }
            }
            return !0;
          }, f.prototype.on = function(u, n, t) {
            var e = new p(n, t || this), o = g ? g + u : u;
            return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], e] : this._events[o].push(e) : (this._events[o] = e, this._eventsCount++), this;
          }, f.prototype.once = function(u, n, t) {
            var e = new p(n, t || this, !0), o = g ? g + u : u;
            return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], e] : this._events[o].push(e) : (this._events[o] = e, this._eventsCount++), this;
          }, f.prototype.removeListener = function(u, n, t, e) {
            var o = g ? g + u : u;
            if (!this._events[o])
              return this;
            if (!n)
              return --this._eventsCount === 0 ? this._events = new b() : delete this._events[o], this;
            var l = this._events[o];
            if (l.fn)
              l.fn === n && (!e || l.once) && (!t || l.context === t) && (--this._eventsCount === 0 ? this._events = new b() : delete this._events[o]);
            else {
              for (var i = 0, r = [], a = l.length; i < a; i++)
                (l[i].fn !== n || e && !l[i].once || t && l[i].context !== t) && r.push(l[i]);
              r.length ? this._events[o] = r.length === 1 ? r[0] : r : --this._eventsCount === 0 ? this._events = new b() : delete this._events[o];
            }
            return this;
          }, f.prototype.removeAllListeners = function(u) {
            var n;
            return u ? (n = g ? g + u : u, this._events[n] && (--this._eventsCount === 0 ? this._events = new b() : delete this._events[n])) : (this._events = new b(), this._eventsCount = 0), this;
          }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prototype.setMaxListeners = function() {
            return this;
          }, f.prefixed = g, f.EventEmitter = f, typeof _ < "u" && (_.exports = f);
        },
        /* 55 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.matchText = h.matchSpacing = h.matchNewline = h.matchBlot = h.matchAttributor = h.default = void 0;
          var g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(Y) {
            return typeof Y;
          } : function(Y) {
            return Y && typeof Symbol == "function" && Y.constructor === Symbol && Y !== Symbol.prototype ? "symbol" : typeof Y;
          }, b = /* @__PURE__ */ function() {
            function Y(Z, tt) {
              var et = [], Q = !0, st = !1, ot = void 0;
              try {
                for (var lt = Z[Symbol.iterator](), Tt; !(Q = (Tt = lt.next()).done) && (et.push(Tt.value), !(tt && et.length === tt)); Q = !0)
                  ;
              } catch (Et) {
                st = !0, ot = Et;
              } finally {
                try {
                  !Q && lt.return && lt.return();
                } finally {
                  if (st)
                    throw ot;
                }
              }
              return et;
            }
            return function(Z, tt) {
              if (Array.isArray(Z))
                return Z;
              if (Symbol.iterator in Object(Z))
                return Y(Z, tt);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), p = /* @__PURE__ */ function() {
            function Y(Z, tt) {
              for (var et = 0; et < tt.length; et++) {
                var Q = tt[et];
                Q.enumerable = Q.enumerable || !1, Q.configurable = !0, "value" in Q && (Q.writable = !0), Object.defineProperty(Z, Q.key, Q);
              }
            }
            return function(Z, tt, et) {
              return tt && Y(Z.prototype, tt), et && Y(Z, et), Z;
            };
          }(), f = v(3), d = T(f), u = v(2), n = T(u), t = v(0), e = T(t), o = v(5), l = T(o), i = v(10), r = T(i), a = v(9), c = T(a), s = v(36), y = v(37), E = v(13), O = T(E), N = v(26), P = v(38), x = v(39), w = v(40);
          function T(Y) {
            return Y && Y.__esModule ? Y : { default: Y };
          }
          function k(Y, Z, tt) {
            return Z in Y ? Object.defineProperty(Y, Z, { value: tt, enumerable: !0, configurable: !0, writable: !0 }) : Y[Z] = tt, Y;
          }
          function j(Y, Z) {
            if (!(Y instanceof Z))
              throw new TypeError("Cannot call a class as a function");
          }
          function D(Y, Z) {
            if (!Y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return Z && (typeof Z == "object" || typeof Z == "function") ? Z : Y;
          }
          function z(Y, Z) {
            if (typeof Z != "function" && Z !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof Z);
            Y.prototype = Object.create(Z && Z.prototype, { constructor: { value: Y, enumerable: !1, writable: !0, configurable: !0 } }), Z && (Object.setPrototypeOf ? Object.setPrototypeOf(Y, Z) : Y.__proto__ = Z);
          }
          var $ = (0, r.default)("quill:clipboard"), J = "__ql-matcher", H = [[Node.TEXT_NODE, gt], [Node.TEXT_NODE, ft], ["br", nt], [Node.ELEMENT_NODE, ft], [Node.ELEMENT_NODE, X], [Node.ELEMENT_NODE, ht], [Node.ELEMENT_NODE, G], [Node.ELEMENT_NODE, mt], ["li", at], ["b", W.bind(W, "bold")], ["i", W.bind(W, "italic")], ["style", it]], M = [s.AlignAttribute, P.DirectionAttribute].reduce(function(Y, Z) {
            return Y[Z.keyName] = Z, Y;
          }, {}), S = [s.AlignStyle, y.BackgroundStyle, N.ColorStyle, P.DirectionStyle, x.FontStyle, w.SizeStyle].reduce(function(Y, Z) {
            return Y[Z.keyName] = Z, Y;
          }, {}), q = function(Y) {
            z(Z, Y);
            function Z(tt, et) {
              j(this, Z);
              var Q = D(this, (Z.__proto__ || Object.getPrototypeOf(Z)).call(this, tt, et));
              return Q.quill.root.addEventListener("paste", Q.onPaste.bind(Q)), Q.container = Q.quill.addContainer("ql-clipboard"), Q.container.setAttribute("contenteditable", !0), Q.container.setAttribute("tabindex", -1), Q.matchers = [], H.concat(Q.options.matchers).forEach(function(st) {
                var ot = b(st, 2), lt = ot[0], Tt = ot[1];
                !et.matchVisual && Tt === ht || Q.addMatcher(lt, Tt);
              }), Q;
            }
            return p(Z, [{
              key: "addMatcher",
              value: function(et, Q) {
                this.matchers.push([et, Q]);
              }
            }, {
              key: "convert",
              value: function(et) {
                if (typeof et == "string")
                  return this.container.innerHTML = et.replace(/\>\r?\n +\</g, "><"), this.convert();
                var Q = this.quill.getFormat(this.quill.selection.savedRange.index);
                if (Q[O.default.blotName]) {
                  var st = this.container.innerText;
                  return this.container.innerHTML = "", new n.default().insert(st, k({}, O.default.blotName, Q[O.default.blotName]));
                }
                var ot = this.prepareMatching(), lt = b(ot, 2), Tt = lt[0], Et = lt[1], vt = F(this.container, Tt, Et);
                return U(vt, `
`) && vt.ops[vt.ops.length - 1].attributes == null && (vt = vt.compose(new n.default().retain(vt.length() - 1).delete(1))), $.log("convert", this.container.innerHTML, vt), this.container.innerHTML = "", vt;
              }
            }, {
              key: "dangerouslyPasteHTML",
              value: function(et, Q) {
                var st = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : l.default.sources.API;
                if (typeof et == "string")
                  this.quill.setContents(this.convert(et), Q), this.quill.setSelection(0, l.default.sources.SILENT);
                else {
                  var ot = this.convert(Q);
                  this.quill.updateContents(new n.default().retain(et).concat(ot), st), this.quill.setSelection(et + ot.length(), l.default.sources.SILENT);
                }
              }
            }, {
              key: "onPaste",
              value: function(et) {
                var Q = this;
                if (!(et.defaultPrevented || !this.quill.isEnabled())) {
                  var st = this.quill.getSelection(), ot = new n.default().retain(st.index), lt = this.quill.scrollingContainer.scrollTop;
                  this.container.focus(), this.quill.selection.update(l.default.sources.SILENT), setTimeout(function() {
                    ot = ot.concat(Q.convert()).delete(st.length), Q.quill.updateContents(ot, l.default.sources.USER), Q.quill.setSelection(ot.length() - st.length, l.default.sources.SILENT), Q.quill.scrollingContainer.scrollTop = lt, Q.quill.focus();
                  }, 1);
                }
              }
            }, {
              key: "prepareMatching",
              value: function() {
                var et = this, Q = [], st = [];
                return this.matchers.forEach(function(ot) {
                  var lt = b(ot, 2), Tt = lt[0], Et = lt[1];
                  switch (Tt) {
                    case Node.TEXT_NODE:
                      st.push(Et);
                      break;
                    case Node.ELEMENT_NODE:
                      Q.push(Et);
                      break;
                    default:
                      [].forEach.call(et.container.querySelectorAll(Tt), function(vt) {
                        vt[J] = vt[J] || [], vt[J].push(Et);
                      });
                      break;
                  }
                }), [Q, st];
              }
            }]), Z;
          }(c.default);
          q.DEFAULTS = {
            matchers: [],
            matchVisual: !0
          };
          function B(Y, Z, tt) {
            return (typeof Z > "u" ? "undefined" : g(Z)) === "object" ? Object.keys(Z).reduce(function(et, Q) {
              return B(et, Q, Z[Q]);
            }, Y) : Y.reduce(function(et, Q) {
              return Q.attributes && Q.attributes[Z] ? et.push(Q) : et.insert(Q.insert, (0, d.default)({}, k({}, Z, tt), Q.attributes));
            }, new n.default());
          }
          function K(Y) {
            if (Y.nodeType !== Node.ELEMENT_NODE)
              return {};
            var Z = "__ql-computed-style";
            return Y[Z] || (Y[Z] = window.getComputedStyle(Y));
          }
          function U(Y, Z) {
            for (var tt = "", et = Y.ops.length - 1; et >= 0 && tt.length < Z.length; --et) {
              var Q = Y.ops[et];
              if (typeof Q.insert != "string")
                break;
              tt = Q.insert + tt;
            }
            return tt.slice(-1 * Z.length) === Z;
          }
          function R(Y) {
            if (Y.childNodes.length === 0)
              return !1;
            var Z = K(Y);
            return ["block", "list-item"].indexOf(Z.display) > -1;
          }
          function F(Y, Z, tt) {
            return Y.nodeType === Y.TEXT_NODE ? tt.reduce(function(et, Q) {
              return Q(Y, et);
            }, new n.default()) : Y.nodeType === Y.ELEMENT_NODE ? [].reduce.call(Y.childNodes || [], function(et, Q) {
              var st = F(Q, Z, tt);
              return Q.nodeType === Y.ELEMENT_NODE && (st = Z.reduce(function(ot, lt) {
                return lt(Q, ot);
              }, st), st = (Q[J] || []).reduce(function(ot, lt) {
                return lt(Q, ot);
              }, st)), et.concat(st);
            }, new n.default()) : new n.default();
          }
          function W(Y, Z, tt) {
            return B(tt, Y, !0);
          }
          function G(Y, Z) {
            var tt = e.default.Attributor.Attribute.keys(Y), et = e.default.Attributor.Class.keys(Y), Q = e.default.Attributor.Style.keys(Y), st = {};
            return tt.concat(et).concat(Q).forEach(function(ot) {
              var lt = e.default.query(ot, e.default.Scope.ATTRIBUTE);
              lt != null && (st[lt.attrName] = lt.value(Y), st[lt.attrName]) || (lt = M[ot], lt != null && (lt.attrName === ot || lt.keyName === ot) && (st[lt.attrName] = lt.value(Y) || void 0), lt = S[ot], lt != null && (lt.attrName === ot || lt.keyName === ot) && (lt = S[ot], st[lt.attrName] = lt.value(Y) || void 0));
            }), Object.keys(st).length > 0 && (Z = B(Z, st)), Z;
          }
          function X(Y, Z) {
            var tt = e.default.query(Y);
            if (tt == null)
              return Z;
            if (tt.prototype instanceof e.default.Embed) {
              var et = {}, Q = tt.value(Y);
              Q != null && (et[tt.blotName] = Q, Z = new n.default().insert(et, tt.formats(Y)));
            } else
              typeof tt.formats == "function" && (Z = B(Z, tt.blotName, tt.formats(Y)));
            return Z;
          }
          function nt(Y, Z) {
            return U(Z, `
`) || Z.insert(`
`), Z;
          }
          function it() {
            return new n.default();
          }
          function at(Y, Z) {
            var tt = e.default.query(Y);
            if (tt == null || tt.blotName !== "list-item" || !U(Z, `
`))
              return Z;
            for (var et = -1, Q = Y.parentNode; !Q.classList.contains("ql-clipboard"); )
              (e.default.query(Q) || {}).blotName === "list" && (et += 1), Q = Q.parentNode;
            return et <= 0 ? Z : Z.compose(new n.default().retain(Z.length() - 1).retain(1, { indent: et }));
          }
          function ft(Y, Z) {
            return U(Z, `
`) || (R(Y) || Z.length() > 0 && Y.nextSibling && R(Y.nextSibling)) && Z.insert(`
`), Z;
          }
          function ht(Y, Z) {
            if (R(Y) && Y.nextElementSibling != null && !U(Z, `

`)) {
              var tt = Y.offsetHeight + parseFloat(K(Y).marginTop) + parseFloat(K(Y).marginBottom);
              Y.nextElementSibling.offsetTop > Y.offsetTop + tt * 1.5 && Z.insert(`
`);
            }
            return Z;
          }
          function mt(Y, Z) {
            var tt = {}, et = Y.style || {};
            return et.fontStyle && K(Y).fontStyle === "italic" && (tt.italic = !0), et.fontWeight && (K(Y).fontWeight.startsWith("bold") || parseInt(K(Y).fontWeight) >= 700) && (tt.bold = !0), Object.keys(tt).length > 0 && (Z = B(Z, tt)), parseFloat(et.textIndent || 0) > 0 && (Z = new n.default().insert("	").concat(Z)), Z;
          }
          function gt(Y, Z) {
            var tt = Y.data;
            if (Y.parentNode.tagName === "O:P")
              return Z.insert(tt.trim());
            if (tt.trim().length === 0 && Y.parentNode.classList.contains("ql-clipboard"))
              return Z;
            if (!K(Y.parentNode).whiteSpace.startsWith("pre")) {
              var et = function(st, ot) {
                return ot = ot.replace(/[^\u00a0]/g, ""), ot.length < 1 && st ? " " : ot;
              };
              tt = tt.replace(/\r\n/g, " ").replace(/\n/g, " "), tt = tt.replace(/\s\s+/g, et.bind(et, !0)), (Y.previousSibling == null && R(Y.parentNode) || Y.previousSibling != null && R(Y.previousSibling)) && (tt = tt.replace(/^\s+/, et.bind(et, !1))), (Y.nextSibling == null && R(Y.parentNode) || Y.nextSibling != null && R(Y.nextSibling)) && (tt = tt.replace(/\s+$/, et.bind(et, !1)));
            }
            return Z.insert(tt);
          }
          h.default = q, h.matchAttributor = G, h.matchBlot = X, h.matchNewline = ft, h.matchSpacing = ht, h.matchText = gt;
        },
        /* 56 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function o(l, i) {
              for (var r = 0; r < i.length; r++) {
                var a = i[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(l, a.key, a);
              }
            }
            return function(l, i, r) {
              return i && o(l.prototype, i), r && o(l, r), l;
            };
          }(), b = function o(l, i, r) {
            l === null && (l = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(l, i);
            if (a === void 0) {
              var c = Object.getPrototypeOf(l);
              return c === null ? void 0 : o(c, i, r);
            } else {
              if ("value" in a)
                return a.value;
              var s = a.get;
              return s === void 0 ? void 0 : s.call(r);
            }
          }, p = v(6), f = d(p);
          function d(o) {
            return o && o.__esModule ? o : { default: o };
          }
          function u(o, l) {
            if (!(o instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(o, l) {
            if (!o)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : o;
          }
          function t(o, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            o.prototype = Object.create(l && l.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : o.__proto__ = l);
          }
          var e = function(o) {
            t(l, o);
            function l() {
              return u(this, l), n(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return g(l, [{
              key: "optimize",
              value: function(r) {
                b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "optimize", this).call(this, r), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
              }
            }], [{
              key: "create",
              value: function() {
                return b(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this);
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), l;
          }(f.default);
          e.blotName = "bold", e.tagName = ["STRONG", "B"], h.default = e;
        },
        /* 57 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.addControls = h.default = void 0;
          var g = /* @__PURE__ */ function() {
            function w(T, k) {
              var j = [], D = !0, z = !1, $ = void 0;
              try {
                for (var J = T[Symbol.iterator](), H; !(D = (H = J.next()).done) && (j.push(H.value), !(k && j.length === k)); D = !0)
                  ;
              } catch (M) {
                z = !0, $ = M;
              } finally {
                try {
                  !D && J.return && J.return();
                } finally {
                  if (z)
                    throw $;
                }
              }
              return j;
            }
            return function(T, k) {
              if (Array.isArray(T))
                return T;
              if (Symbol.iterator in Object(T))
                return w(T, k);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), b = /* @__PURE__ */ function() {
            function w(T, k) {
              for (var j = 0; j < k.length; j++) {
                var D = k[j];
                D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(T, D.key, D);
              }
            }
            return function(T, k, j) {
              return k && w(T.prototype, k), j && w(T, j), T;
            };
          }(), p = v(2), f = r(p), d = v(0), u = r(d), n = v(5), t = r(n), e = v(10), o = r(e), l = v(9), i = r(l);
          function r(w) {
            return w && w.__esModule ? w : { default: w };
          }
          function a(w, T, k) {
            return T in w ? Object.defineProperty(w, T, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : w[T] = k, w;
          }
          function c(w, T) {
            if (!(w instanceof T))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(w, T) {
            if (!w)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return T && (typeof T == "object" || typeof T == "function") ? T : w;
          }
          function y(w, T) {
            if (typeof T != "function" && T !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof T);
            w.prototype = Object.create(T && T.prototype, { constructor: { value: w, enumerable: !1, writable: !0, configurable: !0 } }), T && (Object.setPrototypeOf ? Object.setPrototypeOf(w, T) : w.__proto__ = T);
          }
          var E = (0, o.default)("quill:toolbar"), O = function(w) {
            y(T, w);
            function T(k, j) {
              c(this, T);
              var D = s(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, k, j));
              if (Array.isArray(D.options.container)) {
                var z = document.createElement("div");
                P(z, D.options.container), k.container.parentNode.insertBefore(z, k.container), D.container = z;
              } else
                typeof D.options.container == "string" ? D.container = document.querySelector(D.options.container) : D.container = D.options.container;
              if (!(D.container instanceof HTMLElement)) {
                var $;
                return $ = E.error("Container required for toolbar", D.options), s(D, $);
              }
              return D.container.classList.add("ql-toolbar"), D.controls = [], D.handlers = {}, Object.keys(D.options.handlers).forEach(function(J) {
                D.addHandler(J, D.options.handlers[J]);
              }), [].forEach.call(D.container.querySelectorAll("button, select"), function(J) {
                D.attach(J);
              }), D.quill.on(t.default.events.EDITOR_CHANGE, function(J, H) {
                J === t.default.events.SELECTION_CHANGE && D.update(H);
              }), D.quill.on(t.default.events.SCROLL_OPTIMIZE, function() {
                var J = D.quill.selection.getRange(), H = g(J, 1), M = H[0];
                D.update(M);
              }), D;
            }
            return b(T, [{
              key: "addHandler",
              value: function(j, D) {
                this.handlers[j] = D;
              }
            }, {
              key: "attach",
              value: function(j) {
                var D = this, z = [].find.call(j.classList, function(J) {
                  return J.indexOf("ql-") === 0;
                });
                if (z) {
                  if (z = z.slice(3), j.tagName === "BUTTON" && j.setAttribute("type", "button"), this.handlers[z] == null) {
                    if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[z] == null) {
                      E.warn("ignoring attaching to disabled format", z, j);
                      return;
                    }
                    if (u.default.query(z) == null) {
                      E.warn("ignoring attaching to nonexistent format", z, j);
                      return;
                    }
                  }
                  var $ = j.tagName === "SELECT" ? "change" : "click";
                  j.addEventListener($, function(J) {
                    var H = void 0;
                    if (j.tagName === "SELECT") {
                      if (j.selectedIndex < 0)
                        return;
                      var M = j.options[j.selectedIndex];
                      M.hasAttribute("selected") ? H = !1 : H = M.value || !1;
                    } else
                      j.classList.contains("ql-active") ? H = !1 : H = j.value || !j.hasAttribute("value"), J.preventDefault();
                    D.quill.focus();
                    var S = D.quill.selection.getRange(), q = g(S, 1), B = q[0];
                    if (D.handlers[z] != null)
                      D.handlers[z].call(D, H);
                    else if (u.default.query(z).prototype instanceof u.default.Embed) {
                      if (H = prompt("Enter " + z), !H)
                        return;
                      D.quill.updateContents(new f.default().retain(B.index).delete(B.length).insert(a({}, z, H)), t.default.sources.USER);
                    } else
                      D.quill.format(z, H, t.default.sources.USER);
                    D.update(B);
                  }), this.controls.push([z, j]);
                }
              }
            }, {
              key: "update",
              value: function(j) {
                var D = j == null ? {} : this.quill.getFormat(j);
                this.controls.forEach(function(z) {
                  var $ = g(z, 2), J = $[0], H = $[1];
                  if (H.tagName === "SELECT") {
                    var M = void 0;
                    if (j == null)
                      M = null;
                    else if (D[J] == null)
                      M = H.querySelector("option[selected]");
                    else if (!Array.isArray(D[J])) {
                      var S = D[J];
                      typeof S == "string" && (S = S.replace(/\"/g, '\\"')), M = H.querySelector('option[value="' + S + '"]');
                    }
                    M == null ? (H.value = "", H.selectedIndex = -1) : M.selected = !0;
                  } else if (j == null)
                    H.classList.remove("ql-active");
                  else if (H.hasAttribute("value")) {
                    var q = D[J] === H.getAttribute("value") || D[J] != null && D[J].toString() === H.getAttribute("value") || D[J] == null && !H.getAttribute("value");
                    H.classList.toggle("ql-active", q);
                  } else
                    H.classList.toggle("ql-active", D[J] != null);
                });
              }
            }]), T;
          }(i.default);
          O.DEFAULTS = {};
          function N(w, T, k) {
            var j = document.createElement("button");
            j.setAttribute("type", "button"), j.classList.add("ql-" + T), k != null && (j.value = k), w.appendChild(j);
          }
          function P(w, T) {
            Array.isArray(T[0]) || (T = [T]), T.forEach(function(k) {
              var j = document.createElement("span");
              j.classList.add("ql-formats"), k.forEach(function(D) {
                if (typeof D == "string")
                  N(j, D);
                else {
                  var z = Object.keys(D)[0], $ = D[z];
                  Array.isArray($) ? x(j, z, $) : N(j, z, $);
                }
              }), w.appendChild(j);
            });
          }
          function x(w, T, k) {
            var j = document.createElement("select");
            j.classList.add("ql-" + T), k.forEach(function(D) {
              var z = document.createElement("option");
              D !== !1 ? z.setAttribute("value", D) : z.setAttribute("selected", "selected"), j.appendChild(z);
            }), w.appendChild(j);
          }
          O.DEFAULTS = {
            container: null,
            handlers: {
              clean: function() {
                var T = this, k = this.quill.getSelection();
                if (k != null)
                  if (k.length == 0) {
                    var j = this.quill.getFormat();
                    Object.keys(j).forEach(function(D) {
                      u.default.query(D, u.default.Scope.INLINE) != null && T.quill.format(D, !1);
                    });
                  } else
                    this.quill.removeFormat(k, t.default.sources.USER);
              },
              direction: function(T) {
                var k = this.quill.getFormat().align;
                T === "rtl" && k == null ? this.quill.format("align", "right", t.default.sources.USER) : !T && k === "right" && this.quill.format("align", !1, t.default.sources.USER), this.quill.format("direction", T, t.default.sources.USER);
              },
              indent: function(T) {
                var k = this.quill.getSelection(), j = this.quill.getFormat(k), D = parseInt(j.indent || 0);
                if (T === "+1" || T === "-1") {
                  var z = T === "+1" ? 1 : -1;
                  j.direction === "rtl" && (z *= -1), this.quill.format("indent", D + z, t.default.sources.USER);
                }
              },
              link: function(T) {
                T === !0 && (T = prompt("Enter link URL:")), this.quill.format("link", T, t.default.sources.USER);
              },
              list: function(T) {
                var k = this.quill.getSelection(), j = this.quill.getFormat(k);
                T === "check" ? j.list === "checked" || j.list === "unchecked" ? this.quill.format("list", !1, t.default.sources.USER) : this.quill.format("list", "unchecked", t.default.sources.USER) : this.quill.format("list", T, t.default.sources.USER);
              }
            }
          }, h.default = O, h.addControls = P;
        },
        /* 58 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
        },
        /* 59 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function o(l, i) {
              for (var r = 0; r < i.length; r++) {
                var a = i[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(l, a.key, a);
              }
            }
            return function(l, i, r) {
              return i && o(l.prototype, i), r && o(l, r), l;
            };
          }(), b = function o(l, i, r) {
            l === null && (l = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(l, i);
            if (a === void 0) {
              var c = Object.getPrototypeOf(l);
              return c === null ? void 0 : o(c, i, r);
            } else {
              if ("value" in a)
                return a.value;
              var s = a.get;
              return s === void 0 ? void 0 : s.call(r);
            }
          }, p = v(28), f = d(p);
          function d(o) {
            return o && o.__esModule ? o : { default: o };
          }
          function u(o, l) {
            if (!(o instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(o, l) {
            if (!o)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : o;
          }
          function t(o, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            o.prototype = Object.create(l && l.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : o.__proto__ = l);
          }
          var e = function(o) {
            t(l, o);
            function l(i, r) {
              u(this, l);
              var a = n(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, i));
              return a.label.innerHTML = r, a.container.classList.add("ql-color-picker"), [].slice.call(a.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(c) {
                c.classList.add("ql-primary");
              }), a;
            }
            return g(l, [{
              key: "buildItem",
              value: function(r) {
                var a = b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "buildItem", this).call(this, r);
                return a.style.backgroundColor = r.getAttribute("value") || "", a;
              }
            }, {
              key: "selectItem",
              value: function(r, a) {
                b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "selectItem", this).call(this, r, a);
                var c = this.label.querySelector(".ql-color-label"), s = r && r.getAttribute("data-value") || "";
                c && (c.tagName === "line" ? c.style.stroke = s : c.style.fill = s);
              }
            }]), l;
          }(f.default);
          h.default = e;
        },
        /* 60 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function o(l, i) {
              for (var r = 0; r < i.length; r++) {
                var a = i[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(l, a.key, a);
              }
            }
            return function(l, i, r) {
              return i && o(l.prototype, i), r && o(l, r), l;
            };
          }(), b = function o(l, i, r) {
            l === null && (l = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(l, i);
            if (a === void 0) {
              var c = Object.getPrototypeOf(l);
              return c === null ? void 0 : o(c, i, r);
            } else {
              if ("value" in a)
                return a.value;
              var s = a.get;
              return s === void 0 ? void 0 : s.call(r);
            }
          }, p = v(28), f = d(p);
          function d(o) {
            return o && o.__esModule ? o : { default: o };
          }
          function u(o, l) {
            if (!(o instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(o, l) {
            if (!o)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : o;
          }
          function t(o, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            o.prototype = Object.create(l && l.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : o.__proto__ = l);
          }
          var e = function(o) {
            t(l, o);
            function l(i, r) {
              u(this, l);
              var a = n(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, i));
              return a.container.classList.add("ql-icon-picker"), [].forEach.call(a.container.querySelectorAll(".ql-picker-item"), function(c) {
                c.innerHTML = r[c.getAttribute("data-value") || ""];
              }), a.defaultItem = a.container.querySelector(".ql-selected"), a.selectItem(a.defaultItem), a;
            }
            return g(l, [{
              key: "selectItem",
              value: function(r, a) {
                b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "selectItem", this).call(this, r, a), r = r || this.defaultItem, this.label.innerHTML = r.innerHTML;
              }
            }]), l;
          }(f.default);
          h.default = e;
        },
        /* 61 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function f(d, u) {
              for (var n = 0; n < u.length; n++) {
                var t = u[n];
                t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(d, t.key, t);
              }
            }
            return function(d, u, n) {
              return u && f(d.prototype, u), n && f(d, n), d;
            };
          }();
          function b(f, d) {
            if (!(f instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          var p = function() {
            function f(d, u) {
              var n = this;
              b(this, f), this.quill = d, this.boundsContainer = u || document.body, this.root = d.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                n.root.style.marginTop = -1 * n.quill.root.scrollTop + "px";
              }), this.hide();
            }
            return g(f, [{
              key: "hide",
              value: function() {
                this.root.classList.add("ql-hidden");
              }
            }, {
              key: "position",
              value: function(u) {
                var n = u.left + u.width / 2 - this.root.offsetWidth / 2, t = u.bottom + this.quill.root.scrollTop;
                this.root.style.left = n + "px", this.root.style.top = t + "px", this.root.classList.remove("ql-flip");
                var e = this.boundsContainer.getBoundingClientRect(), o = this.root.getBoundingClientRect(), l = 0;
                if (o.right > e.right && (l = e.right - o.right, this.root.style.left = n + l + "px"), o.left < e.left && (l = e.left - o.left, this.root.style.left = n + l + "px"), o.bottom > e.bottom) {
                  var i = o.bottom - o.top, r = u.bottom - u.top + i;
                  this.root.style.top = t - r + "px", this.root.classList.add("ql-flip");
                }
                return l;
              }
            }, {
              key: "show",
              value: function() {
                this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
              }
            }]), f;
          }();
          h.default = p;
        },
        /* 62 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function x(w, T) {
              var k = [], j = !0, D = !1, z = void 0;
              try {
                for (var $ = w[Symbol.iterator](), J; !(j = (J = $.next()).done) && (k.push(J.value), !(T && k.length === T)); j = !0)
                  ;
              } catch (H) {
                D = !0, z = H;
              } finally {
                try {
                  !j && $.return && $.return();
                } finally {
                  if (D)
                    throw z;
                }
              }
              return k;
            }
            return function(w, T) {
              if (Array.isArray(w))
                return w;
              if (Symbol.iterator in Object(w))
                return x(w, T);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), b = function x(w, T, k) {
            w === null && (w = Function.prototype);
            var j = Object.getOwnPropertyDescriptor(w, T);
            if (j === void 0) {
              var D = Object.getPrototypeOf(w);
              return D === null ? void 0 : x(D, T, k);
            } else {
              if ("value" in j)
                return j.value;
              var z = j.get;
              return z === void 0 ? void 0 : z.call(k);
            }
          }, p = /* @__PURE__ */ function() {
            function x(w, T) {
              for (var k = 0; k < T.length; k++) {
                var j = T[k];
                j.enumerable = j.enumerable || !1, j.configurable = !0, "value" in j && (j.writable = !0), Object.defineProperty(w, j.key, j);
              }
            }
            return function(w, T, k) {
              return T && x(w.prototype, T), k && x(w, k), w;
            };
          }(), f = v(3), d = c(f), u = v(8), n = c(u), t = v(43), e = c(t), o = v(27), l = c(o), i = v(15), r = v(41), a = c(r);
          function c(x) {
            return x && x.__esModule ? x : { default: x };
          }
          function s(x, w) {
            if (!(x instanceof w))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(x, w) {
            if (!x)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return w && (typeof w == "object" || typeof w == "function") ? w : x;
          }
          function E(x, w) {
            if (typeof w != "function" && w !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof w);
            x.prototype = Object.create(w && w.prototype, { constructor: { value: x, enumerable: !1, writable: !0, configurable: !0 } }), w && (Object.setPrototypeOf ? Object.setPrototypeOf(x, w) : x.__proto__ = w);
          }
          var O = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], N = function(x) {
            E(w, x);
            function w(T, k) {
              s(this, w), k.modules.toolbar != null && k.modules.toolbar.container == null && (k.modules.toolbar.container = O);
              var j = y(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, T, k));
              return j.quill.container.classList.add("ql-snow"), j;
            }
            return p(w, [{
              key: "extendToolbar",
              value: function(k) {
                k.container.classList.add("ql-snow"), this.buildButtons([].slice.call(k.container.querySelectorAll("button")), a.default), this.buildPickers([].slice.call(k.container.querySelectorAll("select")), a.default), this.tooltip = new P(this.quill, this.options.bounds), k.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(j, D) {
                  k.handlers.link.call(k, !D.format.link);
                });
              }
            }]), w;
          }(e.default);
          N.DEFAULTS = (0, d.default)(!0, {}, e.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(w) {
                    if (w) {
                      var T = this.quill.getSelection();
                      if (T == null || T.length == 0)
                        return;
                      var k = this.quill.getText(T);
                      /^\S+@\S+\.\S+$/.test(k) && k.indexOf("mailto:") !== 0 && (k = "mailto:" + k);
                      var j = this.quill.theme.tooltip;
                      j.edit("link", k);
                    } else
                      this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var P = function(x) {
            E(w, x);
            function w(T, k) {
              s(this, w);
              var j = y(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, T, k));
              return j.preview = j.root.querySelector("a.ql-preview"), j;
            }
            return p(w, [{
              key: "listen",
              value: function() {
                var k = this;
                b(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(j) {
                  k.root.classList.contains("ql-editing") ? k.save() : k.edit("link", k.preview.textContent), j.preventDefault();
                }), this.root.querySelector("a.ql-remove").addEventListener("click", function(j) {
                  if (k.linkRange != null) {
                    var D = k.linkRange;
                    k.restoreFocus(), k.quill.formatText(D, "link", !1, n.default.sources.USER), delete k.linkRange;
                  }
                  j.preventDefault(), k.hide();
                }), this.quill.on(n.default.events.SELECTION_CHANGE, function(j, D, z) {
                  if (j != null) {
                    if (j.length === 0 && z === n.default.sources.USER) {
                      var $ = k.quill.scroll.descendant(l.default, j.index), J = g($, 2), H = J[0], M = J[1];
                      if (H != null) {
                        k.linkRange = new i.Range(j.index - M, H.length());
                        var S = l.default.formats(H.domNode);
                        k.preview.textContent = S, k.preview.setAttribute("href", S), k.show(), k.position(k.quill.getBounds(k.linkRange));
                        return;
                      }
                    } else
                      delete k.linkRange;
                    k.hide();
                  }
                });
              }
            }, {
              key: "show",
              value: function() {
                b(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
              }
            }]), w;
          }(t.BaseTooltip);
          P.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), h.default = N;
        },
        /* 63 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(29), b = Q(g), p = v(36), f = v(38), d = v(64), u = v(65), n = Q(u), t = v(66), e = Q(t), o = v(67), l = Q(o), i = v(37), r = v(26), a = v(39), c = v(40), s = v(56), y = Q(s), E = v(68), O = Q(E), N = v(27), P = Q(N), x = v(69), w = Q(x), T = v(70), k = Q(T), j = v(71), D = Q(j), z = v(72), $ = Q(z), J = v(73), H = Q(J), M = v(13), S = Q(M), q = v(74), B = Q(q), K = v(75), U = Q(K), R = v(57), F = Q(R), W = v(41), G = Q(W), X = v(28), nt = Q(X), it = v(59), at = Q(it), ft = v(60), ht = Q(ft), mt = v(61), gt = Q(mt), Y = v(108), Z = Q(Y), tt = v(62), et = Q(tt);
          function Q(st) {
            return st && st.__esModule ? st : { default: st };
          }
          b.default.register({
            "attributors/attribute/direction": f.DirectionAttribute,
            "attributors/class/align": p.AlignClass,
            "attributors/class/background": i.BackgroundClass,
            "attributors/class/color": r.ColorClass,
            "attributors/class/direction": f.DirectionClass,
            "attributors/class/font": a.FontClass,
            "attributors/class/size": c.SizeClass,
            "attributors/style/align": p.AlignStyle,
            "attributors/style/background": i.BackgroundStyle,
            "attributors/style/color": r.ColorStyle,
            "attributors/style/direction": f.DirectionStyle,
            "attributors/style/font": a.FontStyle,
            "attributors/style/size": c.SizeStyle
          }, !0), b.default.register({
            "formats/align": p.AlignClass,
            "formats/direction": f.DirectionClass,
            "formats/indent": d.IndentClass,
            "formats/background": i.BackgroundStyle,
            "formats/color": r.ColorStyle,
            "formats/font": a.FontClass,
            "formats/size": c.SizeClass,
            "formats/blockquote": n.default,
            "formats/code-block": S.default,
            "formats/header": e.default,
            "formats/list": l.default,
            "formats/bold": y.default,
            "formats/code": M.Code,
            "formats/italic": O.default,
            "formats/link": P.default,
            "formats/script": w.default,
            "formats/strike": k.default,
            "formats/underline": D.default,
            "formats/image": $.default,
            "formats/video": H.default,
            "formats/list/item": o.ListItem,
            "modules/formula": B.default,
            "modules/syntax": U.default,
            "modules/toolbar": F.default,
            "themes/bubble": Z.default,
            "themes/snow": et.default,
            "ui/icons": G.default,
            "ui/picker": nt.default,
            "ui/icon-picker": ht.default,
            "ui/color-picker": at.default,
            "ui/tooltip": gt.default
          }, !0), h.default = b.default;
        },
        /* 64 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.IndentClass = void 0;
          var g = /* @__PURE__ */ function() {
            function l(i, r) {
              for (var a = 0; a < r.length; a++) {
                var c = r[a];
                c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(i, c.key, c);
              }
            }
            return function(i, r, a) {
              return r && l(i.prototype, r), a && l(i, a), i;
            };
          }(), b = function l(i, r, a) {
            i === null && (i = Function.prototype);
            var c = Object.getOwnPropertyDescriptor(i, r);
            if (c === void 0) {
              var s = Object.getPrototypeOf(i);
              return s === null ? void 0 : l(s, r, a);
            } else {
              if ("value" in c)
                return c.value;
              var y = c.get;
              return y === void 0 ? void 0 : y.call(a);
            }
          }, p = v(0), f = d(p);
          function d(l) {
            return l && l.__esModule ? l : { default: l };
          }
          function u(l, i) {
            if (!(l instanceof i))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(l, i) {
            if (!l)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return i && (typeof i == "object" || typeof i == "function") ? i : l;
          }
          function t(l, i) {
            if (typeof i != "function" && i !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof i);
            l.prototype = Object.create(i && i.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(l, i) : l.__proto__ = i);
          }
          var e = function(l) {
            t(i, l);
            function i() {
              return u(this, i), n(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
            }
            return g(i, [{
              key: "add",
              value: function(a, c) {
                if (c === "+1" || c === "-1") {
                  var s = this.value(a) || 0;
                  c = c === "+1" ? s + 1 : s - 1;
                }
                return c === 0 ? (this.remove(a), !0) : b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "add", this).call(this, a, c);
              }
            }, {
              key: "canAdd",
              value: function(a, c) {
                return b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "canAdd", this).call(this, a, c) || b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "canAdd", this).call(this, a, parseInt(c));
              }
            }, {
              key: "value",
              value: function(a) {
                return parseInt(b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "value", this).call(this, a)) || void 0;
              }
            }]), i;
          }(f.default.Attributor.Class), o = new e("indent", "ql-indent", {
            scope: f.default.Scope.BLOCK,
            whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
          });
          h.IndentClass = o;
        },
        /* 65 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(4), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          function f(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(t, e) {
            if (!t)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e && (typeof e == "object" || typeof e == "function") ? e : t;
          }
          function u(t, e) {
            if (typeof e != "function" && e !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
          }
          var n = function(t) {
            u(e, t);
            function e() {
              return f(this, e), d(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
            }
            return e;
          }(b.default);
          n.blotName = "blockquote", n.tagName = "blockquote", h.default = n;
        },
        /* 66 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function e(o, l) {
              for (var i = 0; i < l.length; i++) {
                var r = l[i];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, r.key, r);
              }
            }
            return function(o, l, i) {
              return l && e(o.prototype, l), i && e(o, i), o;
            };
          }(), b = v(4), p = f(b);
          function f(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function d(e, o) {
            if (!(e instanceof o))
              throw new TypeError("Cannot call a class as a function");
          }
          function u(e, o) {
            if (!e)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return o && (typeof o == "object" || typeof o == "function") ? o : e;
          }
          function n(e, o) {
            if (typeof o != "function" && o !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof o);
            e.prototype = Object.create(o && o.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o);
          }
          var t = function(e) {
            n(o, e);
            function o() {
              return d(this, o), u(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
            }
            return g(o, null, [{
              key: "formats",
              value: function(i) {
                return this.tagName.indexOf(i.tagName) + 1;
              }
            }]), o;
          }(p.default);
          t.blotName = "header", t.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], h.default = t;
        },
        /* 67 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.ListItem = void 0;
          var g = /* @__PURE__ */ function() {
            function s(y, E) {
              for (var O = 0; O < E.length; O++) {
                var N = E[O];
                N.enumerable = N.enumerable || !1, N.configurable = !0, "value" in N && (N.writable = !0), Object.defineProperty(y, N.key, N);
              }
            }
            return function(y, E, O) {
              return E && s(y.prototype, E), O && s(y, O), y;
            };
          }(), b = function s(y, E, O) {
            y === null && (y = Function.prototype);
            var N = Object.getOwnPropertyDescriptor(y, E);
            if (N === void 0) {
              var P = Object.getPrototypeOf(y);
              return P === null ? void 0 : s(P, E, O);
            } else {
              if ("value" in N)
                return N.value;
              var x = N.get;
              return x === void 0 ? void 0 : x.call(O);
            }
          }, p = v(0), f = e(p), d = v(4), u = e(d), n = v(25), t = e(n);
          function e(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function o(s, y, E) {
            return y in s ? Object.defineProperty(s, y, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : s[y] = E, s;
          }
          function l(s, y) {
            if (!(s instanceof y))
              throw new TypeError("Cannot call a class as a function");
          }
          function i(s, y) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return y && (typeof y == "object" || typeof y == "function") ? y : s;
          }
          function r(s, y) {
            if (typeof y != "function" && y !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof y);
            s.prototype = Object.create(y && y.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(s, y) : s.__proto__ = y);
          }
          var a = function(s) {
            r(y, s);
            function y() {
              return l(this, y), i(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments));
            }
            return g(y, [{
              key: "format",
              value: function(O, N) {
                O === c.blotName && !N ? this.replaceWith(f.default.create(this.statics.scope)) : b(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "format", this).call(this, O, N);
              }
            }, {
              key: "remove",
              value: function() {
                this.prev == null && this.next == null ? this.parent.remove() : b(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "remove", this).call(this);
              }
            }, {
              key: "replaceWith",
              value: function(O, N) {
                return this.parent.isolate(this.offset(this.parent), this.length()), O === this.parent.statics.blotName ? (this.parent.replaceWith(O, N), this) : (this.parent.unwrap(), b(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "replaceWith", this).call(this, O, N));
              }
            }], [{
              key: "formats",
              value: function(O) {
                return O.tagName === this.tagName ? void 0 : b(y.__proto__ || Object.getPrototypeOf(y), "formats", this).call(this, O);
              }
            }]), y;
          }(u.default);
          a.blotName = "list-item", a.tagName = "LI";
          var c = function(s) {
            r(y, s), g(y, null, [{
              key: "create",
              value: function(O) {
                var N = O === "ordered" ? "OL" : "UL", P = b(y.__proto__ || Object.getPrototypeOf(y), "create", this).call(this, N);
                return (O === "checked" || O === "unchecked") && P.setAttribute("data-checked", O === "checked"), P;
              }
            }, {
              key: "formats",
              value: function(O) {
                if (O.tagName === "OL")
                  return "ordered";
                if (O.tagName === "UL")
                  return O.hasAttribute("data-checked") ? O.getAttribute("data-checked") === "true" ? "checked" : "unchecked" : "bullet";
              }
            }]);
            function y(E) {
              l(this, y);
              var O = i(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this, E)), N = function(x) {
                if (x.target.parentNode === E) {
                  var w = O.statics.formats(E), T = f.default.find(x.target);
                  w === "checked" ? T.format("list", "unchecked") : w === "unchecked" && T.format("list", "checked");
                }
              };
              return E.addEventListener("touchstart", N), E.addEventListener("mousedown", N), O;
            }
            return g(y, [{
              key: "format",
              value: function(O, N) {
                this.children.length > 0 && this.children.tail.format(O, N);
              }
            }, {
              key: "formats",
              value: function() {
                return o({}, this.statics.blotName, this.statics.formats(this.domNode));
              }
            }, {
              key: "insertBefore",
              value: function(O, N) {
                if (O instanceof a)
                  b(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "insertBefore", this).call(this, O, N);
                else {
                  var P = N == null ? this.length() : N.offset(this), x = this.split(P);
                  x.parent.insertBefore(O, x);
                }
              }
            }, {
              key: "optimize",
              value: function(O) {
                b(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "optimize", this).call(this, O);
                var N = this.next;
                N != null && N.prev === this && N.statics.blotName === this.statics.blotName && N.domNode.tagName === this.domNode.tagName && N.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (N.moveChildren(this), N.remove());
              }
            }, {
              key: "replace",
              value: function(O) {
                if (O.statics.blotName !== this.statics.blotName) {
                  var N = f.default.create(this.statics.defaultChild);
                  O.moveChildren(N), this.appendChild(N);
                }
                b(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "replace", this).call(this, O);
              }
            }]), y;
          }(t.default);
          c.blotName = "list", c.scope = f.default.Scope.BLOCK_BLOT, c.tagName = ["OL", "UL"], c.defaultChild = "list-item", c.allowedChildren = [a], h.ListItem = a, h.default = c;
        },
        /* 68 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(56), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          function f(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(t, e) {
            if (!t)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e && (typeof e == "object" || typeof e == "function") ? e : t;
          }
          function u(t, e) {
            if (typeof e != "function" && e !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
          }
          var n = function(t) {
            u(e, t);
            function e() {
              return f(this, e), d(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
            }
            return e;
          }(b.default);
          n.blotName = "italic", n.tagName = ["EM", "I"], h.default = n;
        },
        /* 69 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function o(l, i) {
              for (var r = 0; r < i.length; r++) {
                var a = i[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(l, a.key, a);
              }
            }
            return function(l, i, r) {
              return i && o(l.prototype, i), r && o(l, r), l;
            };
          }(), b = function o(l, i, r) {
            l === null && (l = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(l, i);
            if (a === void 0) {
              var c = Object.getPrototypeOf(l);
              return c === null ? void 0 : o(c, i, r);
            } else {
              if ("value" in a)
                return a.value;
              var s = a.get;
              return s === void 0 ? void 0 : s.call(r);
            }
          }, p = v(6), f = d(p);
          function d(o) {
            return o && o.__esModule ? o : { default: o };
          }
          function u(o, l) {
            if (!(o instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function n(o, l) {
            if (!o)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : o;
          }
          function t(o, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            o.prototype = Object.create(l && l.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : o.__proto__ = l);
          }
          var e = function(o) {
            t(l, o);
            function l() {
              return u(this, l), n(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return g(l, null, [{
              key: "create",
              value: function(r) {
                return r === "super" ? document.createElement("sup") : r === "sub" ? document.createElement("sub") : b(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this, r);
              }
            }, {
              key: "formats",
              value: function(r) {
                if (r.tagName === "SUB")
                  return "sub";
                if (r.tagName === "SUP")
                  return "super";
              }
            }]), l;
          }(f.default);
          e.blotName = "script", e.tagName = ["SUB", "SUP"], h.default = e;
        },
        /* 70 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(6), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          function f(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(t, e) {
            if (!t)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e && (typeof e == "object" || typeof e == "function") ? e : t;
          }
          function u(t, e) {
            if (typeof e != "function" && e !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
          }
          var n = function(t) {
            u(e, t);
            function e() {
              return f(this, e), d(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
            }
            return e;
          }(b.default);
          n.blotName = "strike", n.tagName = "S", h.default = n;
        },
        /* 71 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = v(6), b = p(g);
          function p(t) {
            return t && t.__esModule ? t : { default: t };
          }
          function f(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(t, e) {
            if (!t)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e && (typeof e == "object" || typeof e == "function") ? e : t;
          }
          function u(t, e) {
            if (typeof e != "function" && e !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
          }
          var n = function(t) {
            u(e, t);
            function e() {
              return f(this, e), d(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
            }
            return e;
          }(b.default);
          n.blotName = "underline", n.tagName = "U", h.default = n;
        },
        /* 72 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function i(r, a) {
              for (var c = 0; c < a.length; c++) {
                var s = a[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
              }
            }
            return function(r, a, c) {
              return a && i(r.prototype, a), c && i(r, c), r;
            };
          }(), b = function i(r, a, c) {
            r === null && (r = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(r, a);
            if (s === void 0) {
              var y = Object.getPrototypeOf(r);
              return y === null ? void 0 : i(y, a, c);
            } else {
              if ("value" in s)
                return s.value;
              var E = s.get;
              return E === void 0 ? void 0 : E.call(c);
            }
          }, p = v(0), f = u(p), d = v(27);
          function u(i) {
            return i && i.__esModule ? i : { default: i };
          }
          function n(i, r) {
            if (!(i instanceof r))
              throw new TypeError("Cannot call a class as a function");
          }
          function t(i, r) {
            if (!i)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return r && (typeof r == "object" || typeof r == "function") ? r : i;
          }
          function e(i, r) {
            if (typeof r != "function" && r !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            i.prototype = Object.create(r && r.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(i, r) : i.__proto__ = r);
          }
          var o = ["alt", "height", "width"], l = function(i) {
            e(r, i);
            function r() {
              return n(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
            }
            return g(r, [{
              key: "format",
              value: function(c, s) {
                o.indexOf(c) > -1 ? s ? this.domNode.setAttribute(c, s) : this.domNode.removeAttribute(c) : b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "format", this).call(this, c, s);
              }
            }], [{
              key: "create",
              value: function(c) {
                var s = b(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, c);
                return typeof c == "string" && s.setAttribute("src", this.sanitize(c)), s;
              }
            }, {
              key: "formats",
              value: function(c) {
                return o.reduce(function(s, y) {
                  return c.hasAttribute(y) && (s[y] = c.getAttribute(y)), s;
                }, {});
              }
            }, {
              key: "match",
              value: function(c) {
                return /\.(jpe?g|gif|png)$/.test(c) || /^data:image\/.+;base64/.test(c);
              }
            }, {
              key: "sanitize",
              value: function(c) {
                return (0, d.sanitize)(c, ["http", "https", "data"]) ? c : "//:0";
              }
            }, {
              key: "value",
              value: function(c) {
                return c.getAttribute("src");
              }
            }]), r;
          }(f.default.Embed);
          l.blotName = "image", l.tagName = "IMG", h.default = l;
        },
        /* 73 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          });
          var g = /* @__PURE__ */ function() {
            function i(r, a) {
              for (var c = 0; c < a.length; c++) {
                var s = a[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(r, s.key, s);
              }
            }
            return function(r, a, c) {
              return a && i(r.prototype, a), c && i(r, c), r;
            };
          }(), b = function i(r, a, c) {
            r === null && (r = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(r, a);
            if (s === void 0) {
              var y = Object.getPrototypeOf(r);
              return y === null ? void 0 : i(y, a, c);
            } else {
              if ("value" in s)
                return s.value;
              var E = s.get;
              return E === void 0 ? void 0 : E.call(c);
            }
          }, p = v(4), f = v(27), d = u(f);
          function u(i) {
            return i && i.__esModule ? i : { default: i };
          }
          function n(i, r) {
            if (!(i instanceof r))
              throw new TypeError("Cannot call a class as a function");
          }
          function t(i, r) {
            if (!i)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return r && (typeof r == "object" || typeof r == "function") ? r : i;
          }
          function e(i, r) {
            if (typeof r != "function" && r !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            i.prototype = Object.create(r && r.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(i, r) : i.__proto__ = r);
          }
          var o = ["height", "width"], l = function(i) {
            e(r, i);
            function r() {
              return n(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
            }
            return g(r, [{
              key: "format",
              value: function(c, s) {
                o.indexOf(c) > -1 ? s ? this.domNode.setAttribute(c, s) : this.domNode.removeAttribute(c) : b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "format", this).call(this, c, s);
              }
            }], [{
              key: "create",
              value: function(c) {
                var s = b(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, c);
                return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", !0), s.setAttribute("src", this.sanitize(c)), s;
              }
            }, {
              key: "formats",
              value: function(c) {
                return o.reduce(function(s, y) {
                  return c.hasAttribute(y) && (s[y] = c.getAttribute(y)), s;
                }, {});
              }
            }, {
              key: "sanitize",
              value: function(c) {
                return d.default.sanitize(c);
              }
            }, {
              key: "value",
              value: function(c) {
                return c.getAttribute("src");
              }
            }]), r;
          }(p.BlockEmbed);
          l.blotName = "video", l.className = "ql-video", l.tagName = "IFRAME", h.default = l;
        },
        /* 74 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.FormulaBlot = void 0;
          var g = /* @__PURE__ */ function() {
            function c(s, y) {
              for (var E = 0; E < y.length; E++) {
                var O = y[E];
                O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(s, O.key, O);
              }
            }
            return function(s, y, E) {
              return y && c(s.prototype, y), E && c(s, E), s;
            };
          }(), b = function c(s, y, E) {
            s === null && (s = Function.prototype);
            var O = Object.getOwnPropertyDescriptor(s, y);
            if (O === void 0) {
              var N = Object.getPrototypeOf(s);
              return N === null ? void 0 : c(N, y, E);
            } else {
              if ("value" in O)
                return O.value;
              var P = O.get;
              return P === void 0 ? void 0 : P.call(E);
            }
          }, p = v(35), f = e(p), d = v(5), u = e(d), n = v(9), t = e(n);
          function e(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function o(c, s) {
            if (!(c instanceof s))
              throw new TypeError("Cannot call a class as a function");
          }
          function l(c, s) {
            if (!c)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return s && (typeof s == "object" || typeof s == "function") ? s : c;
          }
          function i(c, s) {
            if (typeof s != "function" && s !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof s);
            c.prototype = Object.create(s && s.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(c, s) : c.__proto__ = s);
          }
          var r = function(c) {
            i(s, c);
            function s() {
              return o(this, s), l(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments));
            }
            return g(s, null, [{
              key: "create",
              value: function(E) {
                var O = b(s.__proto__ || Object.getPrototypeOf(s), "create", this).call(this, E);
                return typeof E == "string" && (window.katex.render(E, O, {
                  throwOnError: !1,
                  errorColor: "#f00"
                }), O.setAttribute("data-value", E)), O;
              }
            }, {
              key: "value",
              value: function(E) {
                return E.getAttribute("data-value");
              }
            }]), s;
          }(f.default);
          r.blotName = "formula", r.className = "ql-formula", r.tagName = "SPAN";
          var a = function(c) {
            i(s, c), g(s, null, [{
              key: "register",
              value: function() {
                u.default.register(r, !0);
              }
            }]);
            function s() {
              o(this, s);
              var y = l(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this));
              if (window.katex == null)
                throw new Error("Formula module requires KaTeX.");
              return y;
            }
            return s;
          }(t.default);
          h.FormulaBlot = r, h.default = a;
        },
        /* 75 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.CodeToken = h.CodeBlock = void 0;
          var g = /* @__PURE__ */ function() {
            function E(O, N) {
              for (var P = 0; P < N.length; P++) {
                var x = N[P];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(O, x.key, x);
              }
            }
            return function(O, N, P) {
              return N && E(O.prototype, N), P && E(O, P), O;
            };
          }(), b = function E(O, N, P) {
            O === null && (O = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(O, N);
            if (x === void 0) {
              var w = Object.getPrototypeOf(O);
              return w === null ? void 0 : E(w, N, P);
            } else {
              if ("value" in x)
                return x.value;
              var T = x.get;
              return T === void 0 ? void 0 : T.call(P);
            }
          }, p = v(0), f = l(p), d = v(5), u = l(d), n = v(9), t = l(n), e = v(13), o = l(e);
          function l(E) {
            return E && E.__esModule ? E : { default: E };
          }
          function i(E, O) {
            if (!(E instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function r(E, O) {
            if (!E)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : E;
          }
          function a(E, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            E.prototype = Object.create(O && O.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(E, O) : E.__proto__ = O);
          }
          var c = function(E) {
            a(O, E);
            function O() {
              return i(this, O), r(this, (O.__proto__ || Object.getPrototypeOf(O)).apply(this, arguments));
            }
            return g(O, [{
              key: "replaceWith",
              value: function(P) {
                this.domNode.textContent = this.domNode.textContent, this.attach(), b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "replaceWith", this).call(this, P);
              }
            }, {
              key: "highlight",
              value: function(P) {
                var x = this.domNode.textContent;
                this.cachedText !== x && ((x.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = P(x), this.domNode.normalize(), this.attach()), this.cachedText = x);
              }
            }]), O;
          }(o.default);
          c.className = "ql-syntax";
          var s = new f.default.Attributor.Class("token", "hljs", {
            scope: f.default.Scope.INLINE
          }), y = function(E) {
            a(O, E), g(O, null, [{
              key: "register",
              value: function() {
                u.default.register(s, !0), u.default.register(c, !0);
              }
            }]);
            function O(N, P) {
              i(this, O);
              var x = r(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N, P));
              if (typeof x.options.highlight != "function")
                throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
              var w = null;
              return x.quill.on(u.default.events.SCROLL_OPTIMIZE, function() {
                clearTimeout(w), w = setTimeout(function() {
                  x.highlight(), w = null;
                }, x.options.interval);
              }), x.highlight(), x;
            }
            return g(O, [{
              key: "highlight",
              value: function() {
                var P = this;
                if (!this.quill.selection.composing) {
                  this.quill.update(u.default.sources.USER);
                  var x = this.quill.getSelection();
                  this.quill.scroll.descendants(c).forEach(function(w) {
                    w.highlight(P.options.highlight);
                  }), this.quill.update(u.default.sources.SILENT), x != null && this.quill.setSelection(x, u.default.sources.SILENT);
                }
              }
            }]), O;
          }(t.default);
          y.DEFAULTS = {
            highlight: function() {
              return window.hljs == null ? null : function(E) {
                var O = window.hljs.highlightAuto(E);
                return O.value;
              };
            }(),
            interval: 1e3
          }, h.CodeBlock = c, h.CodeToken = s, h.default = y;
        },
        /* 76 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 77 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
        },
        /* 78 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 79 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
        },
        /* 80 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
        },
        /* 81 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
        },
        /* 82 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
        },
        /* 83 */
        /***/
        function(_, h) {
          _.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
        },
        /* 84 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
        },
        /* 85 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
        },
        /* 86 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
        },
        /* 87 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 88 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 89 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 90 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
        },
        /* 91 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
        },
        /* 92 */
        /***/
        function(_, h) {
          _.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
        },
        /* 93 */
        /***/
        function(_, h) {
          _.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
        },
        /* 94 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
        },
        /* 95 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
        },
        /* 96 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
        },
        /* 97 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
        },
        /* 98 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
        },
        /* 99 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
        },
        /* 100 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
        },
        /* 101 */
        /***/
        function(_, h) {
          _.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
        },
        /* 102 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
        },
        /* 103 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
        },
        /* 104 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
        },
        /* 105 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
        },
        /* 106 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
        },
        /* 107 */
        /***/
        function(_, h) {
          _.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
        },
        /* 108 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", {
            value: !0
          }), h.default = h.BubbleTooltip = void 0;
          var g = function O(N, P, x) {
            N === null && (N = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(N, P);
            if (w === void 0) {
              var T = Object.getPrototypeOf(N);
              return T === null ? void 0 : O(T, P, x);
            } else {
              if ("value" in w)
                return w.value;
              var k = w.get;
              return k === void 0 ? void 0 : k.call(x);
            }
          }, b = /* @__PURE__ */ function() {
            function O(N, P) {
              for (var x = 0; x < P.length; x++) {
                var w = P[x];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(N, w.key, w);
              }
            }
            return function(N, P, x) {
              return P && O(N.prototype, P), x && O(N, x), N;
            };
          }(), p = v(3), f = i(p), d = v(8), u = i(d), n = v(43), t = i(n), e = v(15), o = v(41), l = i(o);
          function i(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function r(O, N) {
            if (!(O instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(O, N) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return N && (typeof N == "object" || typeof N == "function") ? N : O;
          }
          function c(O, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            O.prototype = Object.create(N && N.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(O, N) : O.__proto__ = N);
          }
          var s = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], y = function(O) {
            c(N, O);
            function N(P, x) {
              r(this, N), x.modules.toolbar != null && x.modules.toolbar.container == null && (x.modules.toolbar.container = s);
              var w = a(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this, P, x));
              return w.quill.container.classList.add("ql-bubble"), w;
            }
            return b(N, [{
              key: "extendToolbar",
              value: function(x) {
                this.tooltip = new E(this.quill, this.options.bounds), this.tooltip.root.appendChild(x.container), this.buildButtons([].slice.call(x.container.querySelectorAll("button")), l.default), this.buildPickers([].slice.call(x.container.querySelectorAll("select")), l.default);
              }
            }]), N;
          }(t.default);
          y.DEFAULTS = (0, f.default)(!0, {}, t.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(N) {
                    N ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var E = function(O) {
            c(N, O);
            function N(P, x) {
              r(this, N);
              var w = a(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this, P, x));
              return w.quill.on(u.default.events.EDITOR_CHANGE, function(T, k, j, D) {
                if (T === u.default.events.SELECTION_CHANGE)
                  if (k != null && k.length > 0 && D === u.default.sources.USER) {
                    w.show(), w.root.style.left = "0px", w.root.style.width = "", w.root.style.width = w.root.offsetWidth + "px";
                    var z = w.quill.getLines(k.index, k.length);
                    if (z.length === 1)
                      w.position(w.quill.getBounds(k));
                    else {
                      var $ = z[z.length - 1], J = w.quill.getIndex($), H = Math.min($.length() - 1, k.index + k.length - J), M = w.quill.getBounds(new e.Range(J, H));
                      w.position(M);
                    }
                  } else
                    document.activeElement !== w.textbox && w.quill.hasFocus() && w.hide();
              }), w;
            }
            return b(N, [{
              key: "listen",
              value: function() {
                var x = this;
                g(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                  x.root.classList.remove("ql-editing");
                }), this.quill.on(u.default.events.SCROLL_OPTIMIZE, function() {
                  setTimeout(function() {
                    if (!x.root.classList.contains("ql-hidden")) {
                      var w = x.quill.getSelection();
                      w != null && x.position(x.quill.getBounds(w));
                    }
                  }, 1);
                });
              }
            }, {
              key: "cancel",
              value: function() {
                this.show();
              }
            }, {
              key: "position",
              value: function(x) {
                var w = g(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "position", this).call(this, x), T = this.root.querySelector(".ql-tooltip-arrow");
                if (T.style.marginLeft = "", w === 0)
                  return w;
                T.style.marginLeft = -1 * w - T.offsetWidth / 2 + "px";
              }
            }]), N;
          }(n.BaseTooltip);
          E.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), h.BubbleTooltip = E, h.default = y;
        },
        /* 109 */
        /***/
        function(_, h, v) {
          _.exports = v(63);
        }
        /******/
      ]).default
    );
  });
})(dr);
var Ir = dr.exports;
const Wt = /* @__PURE__ */ Xn(Ir);
var pr = { exports: {} };
(function(A, I) {
  (function(_, h) {
    A.exports = h();
  })(window, function() {
    return function(_) {
      var h = {};
      function v(g) {
        if (h[g])
          return h[g].exports;
        var b = h[g] = { i: g, l: !1, exports: {} };
        return _[g].call(b.exports, b, b.exports, v), b.l = !0, b.exports;
      }
      return v.m = _, v.c = h, v.d = function(g, b, p) {
        v.o(g, b) || Object.defineProperty(g, b, { enumerable: !0, get: p });
      }, v.r = function(g) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(g, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(g, "__esModule", { value: !0 });
      }, v.t = function(g, b) {
        if (1 & b && (g = v(g)), 8 & b || 4 & b && typeof g == "object" && g && g.__esModule)
          return g;
        var p = /* @__PURE__ */ Object.create(null);
        if (v.r(p), Object.defineProperty(p, "default", { enumerable: !0, value: g }), 2 & b && typeof g != "string")
          for (var f in g)
            v.d(p, f, (function(d) {
              return g[d];
            }).bind(null, f));
        return p;
      }, v.n = function(g) {
        var b = g && g.__esModule ? function() {
          return g.default;
        } : function() {
          return g;
        };
        return v.d(b, "a", b), b;
      }, v.o = function(g, b) {
        return Object.prototype.hasOwnProperty.call(g, b);
      }, v.p = "/dist/", v(v.s = 1);
    }([function(_, h, v) {
      var g = this && this.__awaiter || function(p, f, d, u) {
        return new (d || (d = Promise))(function(n, t) {
          function e(i) {
            try {
              l(u.next(i));
            } catch (r) {
              t(r);
            }
          }
          function o(i) {
            try {
              l(u.throw(i));
            } catch (r) {
              t(r);
            }
          }
          function l(i) {
            var r;
            i.done ? n(i.value) : (r = i.value, r instanceof d ? r : new d(function(a) {
              a(r);
            })).then(e, o);
          }
          l((u = u.apply(p, f || [])).next());
        });
      }, b = this && this.__generator || function(p, f) {
        var d, u, n, t, e = { label: 0, sent: function() {
          if (1 & n[0])
            throw n[1];
          return n[1];
        }, trys: [], ops: [] };
        return t = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (t[Symbol.iterator] = function() {
          return this;
        }), t;
        function o(l) {
          return function(i) {
            return function(r) {
              if (d)
                throw new TypeError("Generator is already executing.");
              for (; t && (t = 0, r[0] && (e = 0)), e; )
                try {
                  if (d = 1, u && (n = 2 & r[0] ? u.return : r[0] ? u.throw || ((n = u.return) && n.call(u), 0) : u.next) && !(n = n.call(u, r[1])).done)
                    return n;
                  switch (u = 0, n && (r = [2 & r[0], n.value]), r[0]) {
                    case 0:
                    case 1:
                      n = r;
                      break;
                    case 4:
                      return e.label++, { value: r[1], done: !1 };
                    case 5:
                      e.label++, u = r[1], r = [0];
                      continue;
                    case 7:
                      r = e.ops.pop(), e.trys.pop();
                      continue;
                    default:
                      if (n = e.trys, !((n = n.length > 0 && n[n.length - 1]) || r[0] !== 6 && r[0] !== 2)) {
                        e = 0;
                        continue;
                      }
                      if (r[0] === 3 && (!n || r[1] > n[0] && r[1] < n[3])) {
                        e.label = r[1];
                        break;
                      }
                      if (r[0] === 6 && e.label < n[1]) {
                        e.label = n[1], n = r;
                        break;
                      }
                      if (n && e.label < n[2]) {
                        e.label = n[2], e.ops.push(r);
                        break;
                      }
                      n[2] && e.ops.pop(), e.trys.pop();
                      continue;
                  }
                  r = f.call(p, e);
                } catch (a) {
                  r = [6, a], u = 0;
                } finally {
                  d = n = 0;
                }
              if (5 & r[0])
                throw r[1];
              return { value: r[0] ? r[1] : void 0, done: !0 };
            }([l, i]);
          };
        }
      };
      Object.defineProperty(h, "__esModule", { value: !0 }), h.file2b64 = void 0, h.file2b64 = function(p) {
        return g(this, void 0, void 0, function() {
          var f, d;
          return b(this, function(u) {
            return f = new FileReader(), d = new Promise(function(n, t) {
              f.addEventListener("load", function() {
                var e, o = (e = f.result) === null || e === void 0 ? void 0 : e.toString();
                o ? n(o) : t("could not convert file to base64");
              }, !1);
            }), f.readAsDataURL(p), [2, d];
          });
        });
      };
    }, function(_, h, v) {
      var g = this && this.__awaiter || function(e, o, l, i) {
        return new (l || (l = Promise))(function(r, a) {
          function c(E) {
            try {
              y(i.next(E));
            } catch (O) {
              a(O);
            }
          }
          function s(E) {
            try {
              y(i.throw(E));
            } catch (O) {
              a(O);
            }
          }
          function y(E) {
            var O;
            E.done ? r(E.value) : (O = E.value, O instanceof l ? O : new l(function(N) {
              N(O);
            })).then(c, s);
          }
          y((i = i.apply(e, o || [])).next());
        });
      }, b = this && this.__generator || function(e, o) {
        var l, i, r, a, c = { label: 0, sent: function() {
          if (1 & r[0])
            throw r[1];
          return r[1];
        }, trys: [], ops: [] };
        return a = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
          return this;
        }), a;
        function s(y) {
          return function(E) {
            return function(O) {
              if (l)
                throw new TypeError("Generator is already executing.");
              for (; a && (a = 0, O[0] && (c = 0)), c; )
                try {
                  if (l = 1, i && (r = 2 & O[0] ? i.return : O[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, O[1])).done)
                    return r;
                  switch (i = 0, r && (O = [2 & O[0], r.value]), O[0]) {
                    case 0:
                    case 1:
                      r = O;
                      break;
                    case 4:
                      return c.label++, { value: O[1], done: !1 };
                    case 5:
                      c.label++, i = O[1], O = [0];
                      continue;
                    case 7:
                      O = c.ops.pop(), c.trys.pop();
                      continue;
                    default:
                      if (r = c.trys, !((r = r.length > 0 && r[r.length - 1]) || O[0] !== 6 && O[0] !== 2)) {
                        c = 0;
                        continue;
                      }
                      if (O[0] === 3 && (!r || O[1] > r[0] && O[1] < r[3])) {
                        c.label = O[1];
                        break;
                      }
                      if (O[0] === 6 && c.label < r[1]) {
                        c.label = r[1], r = O;
                        break;
                      }
                      if (r && c.label < r[2]) {
                        c.label = r[2], c.ops.push(O);
                        break;
                      }
                      r[2] && c.ops.pop(), c.trys.pop();
                      continue;
                  }
                  O = o.call(e, c);
                } catch (N) {
                  O = [6, N], i = 0;
                } finally {
                  l = r = 0;
                }
              if (5 & O[0])
                throw O[1];
              return { value: O[0] ? O[1] : void 0, done: !0 };
            }([y, E]);
          };
        }
      };
      Object.defineProperty(h, "__esModule", { value: !0 }), h.imageCompressor = void 0;
      var p = v(2), f = v(3), d = v(0), u = v(4), n = v(5), t = function() {
        function e(o, l) {
          var i = this;
          this.quill = o, this.options = l || {};
          var r = !!l.debug, a = !!l.suppressErrorLogging;
          this.Logger = new n.ConsoleLogger(r, a), (0, f.warnAboutOptions)(l, this.Logger), this.imageDrop = new p.ImageDrop(o, function(s) {
            return g(i, void 0, void 0, function() {
              var y;
              return b(this, function(E) {
                switch (E.label) {
                  case 0:
                    return this.Logger.log("onImageDrop", { dataUrl: s }), [4, this.downscaleImageFromUrl(s)];
                  case 1:
                    return y = E.sent(), this.insertToEditor(y, e.b64toBlob(y)), [2];
                }
              });
            });
          }, this.Logger), this.Logger.log("fileChanged", { options: l, quill: o, debug: r });
          var c = this.quill.getModule("toolbar");
          c ? c.addHandler("image", function() {
            return i.selectLocalImage();
          }) : this.Logger.error("Quill toolbar module not found! need { toolbar: // options } in Quill.modules for image icon to sit in");
        }
        return e.b64toBlob = function(o) {
          for (var l = atob(o.split(",")[1]), i = o.slice(5).split(";")[0], r = new ArrayBuffer(l.length), a = new Uint8Array(r), c = 0; c < l.length; c++)
            a[c] = l.charCodeAt(c);
          return new Blob([r], { type: i });
        }, e.prototype.selectLocalImage = function(o) {
          var l = this;
          this.range = this.quill.getSelection(), this.fileHolder = document.createElement("input"), this.fileHolder.setAttribute("type", "file"), this.fileHolder.setAttribute("accept", "image/*"), this.fileHolder.setAttribute("style", "visibility:hidden"), this.fileHolder.onchange = function() {
            return l.fileChanged().then(function() {
              return o && o();
            });
          }, document.body.appendChild(this.fileHolder), this.fileHolder.click(), window.requestAnimationFrame(function() {
            l.fileHolder && document.body.removeChild(l.fileHolder);
          });
        }, e.prototype.fileChanged = function(o) {
          var l;
          return g(this, void 0, void 0, function() {
            var i, r, a, c;
            return b(this, function(s) {
              switch (s.label) {
                case 0:
                  return (i = o || ((l = this.fileHolder) === null || l === void 0 ? void 0 : l.files)) && i.length ? (r = i[0], this.Logger.log("fileChanged", { file: r }), r ? [4, (0, d.file2b64)(r)] : [2]) : [2];
                case 1:
                  return a = s.sent(), [4, this.downscaleImageFromUrl(a)];
                case 2:
                  return c = s.sent(), this.insertToEditor(c, e.b64toBlob(c)), [2];
              }
            });
          });
        }, e.prototype.downscaleImageFromUrl = function(o) {
          return g(this, void 0, void 0, function() {
            var l;
            return b(this, function(i) {
              switch (i.label) {
                case 0:
                  return [4, (0, u.downscaleImage)(this.Logger, o, this.options.maxWidth, this.options.maxHeight, this.options.imageType, this.options.keepImageTypes, this.options.ignoreImageTypes, this.options.quality)];
                case 1:
                  return l = i.sent(), this.Logger.log("downscaleImageFromUrl", { dataUrl: o, dataUrlCompressed: l }), [2, l];
              }
            });
          });
        }, e.prototype.insertToEditor = function(o, l) {
          if (this.options.insertIntoEditor)
            this.options.insertIntoEditor(o, l, this.quill);
          else {
            this.Logger.log("insertToEditor", { url: o }), this.range = this.quill.getSelection();
            var i = this.range;
            if (!i)
              return;
            this.logFileSize(o), this.quill.insertEmbed(i.index, "image", "".concat(o), "user"), i.index++, this.quill.setSelection(i, "api");
          }
        }, e.prototype.logFileSize = function(o) {
          var l = (Math.round(3 * (o.length - 22) / 4) / 1024).toFixed(0);
          this.Logger.log("estimated img size: " + l + " kb");
        }, e;
      }();
      h.imageCompressor = t, window.imageCompressor = t, h.default = t;
    }, function(_, h, v) {
      var g = this && this.__awaiter || function(t, e, o, l) {
        return new (o || (o = Promise))(function(i, r) {
          function a(y) {
            try {
              s(l.next(y));
            } catch (E) {
              r(E);
            }
          }
          function c(y) {
            try {
              s(l.throw(y));
            } catch (E) {
              r(E);
            }
          }
          function s(y) {
            var E;
            y.done ? i(y.value) : (E = y.value, E instanceof o ? E : new o(function(O) {
              O(E);
            })).then(a, c);
          }
          s((l = l.apply(t, e || [])).next());
        });
      }, b = this && this.__generator || function(t, e) {
        var o, l, i, r, a = { label: 0, sent: function() {
          if (1 & i[0])
            throw i[1];
          return i[1];
        }, trys: [], ops: [] };
        return r = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (r[Symbol.iterator] = function() {
          return this;
        }), r;
        function c(s) {
          return function(y) {
            return function(E) {
              if (o)
                throw new TypeError("Generator is already executing.");
              for (; r && (r = 0, E[0] && (a = 0)), a; )
                try {
                  if (o = 1, l && (i = 2 & E[0] ? l.return : E[0] ? l.throw || ((i = l.return) && i.call(l), 0) : l.next) && !(i = i.call(l, E[1])).done)
                    return i;
                  switch (l = 0, i && (E = [2 & E[0], i.value]), E[0]) {
                    case 0:
                    case 1:
                      i = E;
                      break;
                    case 4:
                      return a.label++, { value: E[1], done: !1 };
                    case 5:
                      a.label++, l = E[1], E = [0];
                      continue;
                    case 7:
                      E = a.ops.pop(), a.trys.pop();
                      continue;
                    default:
                      if (i = a.trys, !((i = i.length > 0 && i[i.length - 1]) || E[0] !== 6 && E[0] !== 2)) {
                        a = 0;
                        continue;
                      }
                      if (E[0] === 3 && (!i || E[1] > i[0] && E[1] < i[3])) {
                        a.label = E[1];
                        break;
                      }
                      if (E[0] === 6 && a.label < i[1]) {
                        a.label = i[1], i = E;
                        break;
                      }
                      if (i && a.label < i[2]) {
                        a.label = i[2], a.ops.push(E);
                        break;
                      }
                      i[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  E = e.call(t, a);
                } catch (O) {
                  E = [6, O], l = 0;
                } finally {
                  o = i = 0;
                }
              if (5 & E[0])
                throw E[1];
              return { value: E[0] ? E[1] : void 0, done: !0 };
            }([s, y]);
          };
        }
      };
      Object.defineProperty(h, "__esModule", { value: !0 }), h.ImageDrop = void 0;
      var p = v(0), f = function() {
        function t(e, o, l) {
          var i = this;
          this.quill = e, this.onNewDataUrl = o, this.logger = l, this.quill.root.addEventListener("drop", function(r) {
            return i.handleDrop(r);
          }, !1), this.quill.root.addEventListener("paste", function(r) {
            return i.handlePaste(r);
          }, !1);
        }
        return t.prototype.handleDrop = function(e) {
          return g(this, void 0, void 0, function() {
            var o, l, i, r, a, c, s;
            return b(this, function(y) {
              switch (y.label) {
                case 0:
                  return e.preventDefault(), document.caretRangeFromPoint && (o = document.getSelection(), l = document.caretRangeFromPoint(e.clientX, e.clientY), o && l && o.setBaseAndExtent(l.startContainer, l.startOffset, l.startContainer, l.startOffset)), [4, u(e)];
                case 1:
                  return i = y.sent(), r = Array.from(i || []).filter(function(E) {
                    return n(E.type);
                  }), (a = r == null ? void 0 : r[0]) ? [4, (0, p.file2b64)(a)] : [3, 3];
                case 2:
                  return s = y.sent(), this.logger.log("handleNewImageFiles", { evt: e, files: i, filesFiltered: r, firstImage: a, base64ImageSrc: s }), this.onNewDataUrl(s), [2];
                case 3:
                  return [4, d(e)];
                case 4:
                  return (c = y.sent()) ? [4, (0, p.file2b64)(c)] : [3, 6];
                case 5:
                  return s = y.sent(), this.logger.log("handleNewImageFiles", { evt: e, blob: c, base64ImageSrc: s }), this.onNewDataUrl(s), [2];
                case 6:
                  return [2];
              }
            });
          });
        }, t.prototype.handlePaste = function(e) {
          var o, l;
          return g(this, void 0, void 0, function() {
            var i, r, a, c;
            return b(this, function(s) {
              switch (s.label) {
                case 0:
                  return i = Array.from(((o = e == null ? void 0 : e.clipboardData) === null || o === void 0 ? void 0 : o.items) || []), this.logger.log("handlePaste", { files: i, evt: e }), r = i.filter(function(y) {
                    return n(y.type);
                  }), this.logger.log("handlePaste", { images: r, evt: e }), r.length ? r.filter(function(y) {
                    return y.type !== "text/html";
                  }).length ? (e.preventDefault(), (a = (l = r.pop()) === null || l === void 0 ? void 0 : l.getAsFile()) ? [4, (0, p.file2b64)(a)] : [2]) : (this.logger.log("handlePaste also detected html"), [2]) : [2];
                case 1:
                  return c = s.sent(), this.logger.log("handleNewImageFiles", { base64ImageSrc: c }), this.onNewDataUrl(c), [2];
              }
            });
          });
        }, t;
      }();
      function d(t) {
        var e;
        return g(this, void 0, void 0, function() {
          var o;
          return b(this, function(l) {
            switch (l.label) {
              case 0:
                return (o = (e = t.dataTransfer) === null || e === void 0 ? void 0 : e.getData("URL")) ? [4, fetch(o)] : [3, 3];
              case 1:
                return [4, l.sent().blob()];
              case 2:
                return [2, l.sent()];
              case 3:
                return [2];
            }
          });
        });
      }
      function u(t) {
        var e;
        return g(this, void 0, void 0, function() {
          return b(this, function(o) {
            return [2, (e = t == null ? void 0 : t.dataTransfer) === null || e === void 0 ? void 0 : e.files];
          });
        });
      }
      function n(t) {
        return !!t.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i);
      }
      h.ImageDrop = f;
    }, function(_, h, v) {
      Object.defineProperty(h, "__esModule", { value: !0 }), h.warnAboutOptions = void 0, h.warnAboutOptions = function(g, b) {
        g.maxWidth = g.maxWidth || 1e3, g.maxHeight = g.maxHeight || 1e3, g.maxWidth && typeof g.maxWidth != "number" && (b.warn(`[config error] 'maxWidth' is required to be a "number" (in pixels), 
received: `.concat(g.maxWidth, `
-> using default 1000`)), g.maxWidth = 1e3), g.maxHeight && typeof g.maxHeight != "number" && (b.warn(`[config error] 'maxHeight' is required to be a "number" (in pixels), 
received: `.concat(g.maxHeight, `
-> using default 1000`)), g.maxHeight = 1e3), g.quality && typeof g.quality != "number" && (b.warn(`quill.imageCompressor: [config error] 'quality' is required to be a "number", 
received: `.concat(g.quality, `
-> using default 0.7`)), g.quality = 0.7), !g.imageType || typeof g.imageType == "string" && g.imageType.startsWith("image/") || (b.warn(`quill.imageCompressor: [config error] 'imageType' is required be in the form of "image/png" or "image/jpeg" etc ..., 
received: `.concat(g.imageType, `
-> using default image/jpeg`)), g.imageType = "image/jpeg"), g.keepImageTypes || (g.keepImageTypes = []), g.keepImageTypes && !Array.isArray(g.keepImageTypes) && (b.warn(`quill.imageCompressor: [config error] 'keepImageTypes' is required to be a "array", received: `.concat(g.keepImageTypes, " -> using default []")), g.keepImageTypes = []), g.ignoreImageTypes || (g.ignoreImageTypes = []), g.ignoreImageTypes && !Array.isArray(g.ignoreImageTypes) && (b.warn(`quill.imageCompressor: [config error] 'ignoreImageTypes' is required to be a "array", received: `.concat(g.ignoreImageTypes, " -> using default []")), g.ignoreImageTypes = []), g.insertIntoEditor && typeof g.insertIntoEditor != "function" && (b.warn(`quill.imageCompressor: [config error] 'insertIntoEditor' is required to be a "function", received: `.concat(g.insertIntoEditor, " -> using default undefined")), g.insertIntoEditor = void 0);
      };
    }, function(_, h, v) {
      var g = this && this.__awaiter || function(p, f, d, u) {
        return new (d || (d = Promise))(function(n, t) {
          function e(i) {
            try {
              l(u.next(i));
            } catch (r) {
              t(r);
            }
          }
          function o(i) {
            try {
              l(u.throw(i));
            } catch (r) {
              t(r);
            }
          }
          function l(i) {
            var r;
            i.done ? n(i.value) : (r = i.value, r instanceof d ? r : new d(function(a) {
              a(r);
            })).then(e, o);
          }
          l((u = u.apply(p, f || [])).next());
        });
      }, b = this && this.__generator || function(p, f) {
        var d, u, n, t, e = { label: 0, sent: function() {
          if (1 & n[0])
            throw n[1];
          return n[1];
        }, trys: [], ops: [] };
        return t = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (t[Symbol.iterator] = function() {
          return this;
        }), t;
        function o(l) {
          return function(i) {
            return function(r) {
              if (d)
                throw new TypeError("Generator is already executing.");
              for (; t && (t = 0, r[0] && (e = 0)), e; )
                try {
                  if (d = 1, u && (n = 2 & r[0] ? u.return : r[0] ? u.throw || ((n = u.return) && n.call(u), 0) : u.next) && !(n = n.call(u, r[1])).done)
                    return n;
                  switch (u = 0, n && (r = [2 & r[0], n.value]), r[0]) {
                    case 0:
                    case 1:
                      n = r;
                      break;
                    case 4:
                      return e.label++, { value: r[1], done: !1 };
                    case 5:
                      e.label++, u = r[1], r = [0];
                      continue;
                    case 7:
                      r = e.ops.pop(), e.trys.pop();
                      continue;
                    default:
                      if (n = e.trys, !((n = n.length > 0 && n[n.length - 1]) || r[0] !== 6 && r[0] !== 2)) {
                        e = 0;
                        continue;
                      }
                      if (r[0] === 3 && (!n || r[1] > n[0] && r[1] < n[3])) {
                        e.label = r[1];
                        break;
                      }
                      if (r[0] === 6 && e.label < n[1]) {
                        e.label = n[1], n = r;
                        break;
                      }
                      if (n && e.label < n[2]) {
                        e.label = n[2], e.ops.push(r);
                        break;
                      }
                      n[2] && e.ops.pop(), e.trys.pop();
                      continue;
                  }
                  r = f.call(p, e);
                } catch (a) {
                  r = [6, a], u = 0;
                } finally {
                  d = n = 0;
                }
              if (5 & r[0])
                throw r[1];
              return { value: r[0] ? r[1] : void 0, done: !0 };
            }([l, i]);
          };
        }
      };
      Object.defineProperty(h, "__esModule", { value: !0 }), h.downscaleImage = void 0, h.downscaleImage = function(p, f, d, u, n, t, e, o) {
        return g(this, void 0, void 0, function() {
          var l, i, r, a, c, s, y, E;
          return b(this, function(O) {
            switch (O.label) {
              case 0:
                return l = f.split(";")[0].split(":")[1], n = n || "image/jpeg", o = o || 0.7, (i = new Image()).src = f, [4, new Promise(function(N) {
                  i.onload = function() {
                    N();
                  };
                })];
              case 1:
                return O.sent(), r = function(N, P, x, w) {
                  if (x && w && N <= x && P <= w)
                    return [N, P];
                  if (x && N > x) {
                    var T = x, k = Math.floor(P / N * T);
                    if (w && k > w) {
                      var j = w;
                      return [Math.floor(N / P * j), j];
                    }
                    return [T, k];
                  }
                  return w && P > w ? (k = w, [T = Math.floor(N / P * k), k]) : [P, N];
                }(i.width, i.height, d, u), a = r[0], c = r[1], (s = document.createElement("canvas")).width = a, s.height = c, y = s.getContext("2d"), n === "image/jpeg" && (y.fillStyle = "#FFFFFF", y.fillRect(0, 0, i.width, i.height)), e != null && e.includes(l) ? [2, f] : (t != null && t.includes(l) && (n = l), y.drawImage(i, 0, 0, a, c), E = s.toDataURL(n, o), p.log("downscaling image...", { args: { dataUrl: f, maxWidth: d, maxHeight: u, imageType: n, ignoreImageTypes: e, keepImageTypes: t, imageQuality: o }, newHeight: c, newWidth: a }), [2, E]);
            }
          });
        });
      };
    }, function(_, h, v) {
      Object.defineProperty(h, "__esModule", { value: !0 }), h.ConsoleLogger = void 0;
      var g = function() {
        function b(p, f) {
          this.debug = p, this.suppressErrorLogging = f;
        }
        return b.prototype.prefixString = function() {
          return "</> quill-image-compress: ";
        }, Object.defineProperty(b.prototype, "log", { get: function() {
          return this.debug ? console.log.bind(console, this.prefixString()) : function() {
          };
        }, enumerable: !1, configurable: !0 }), Object.defineProperty(b.prototype, "error", { get: function() {
          return this.suppressErrorLogging ? function() {
          } : console.error.bind(console, this.prefixString());
        }, enumerable: !1, configurable: !0 }), Object.defineProperty(b.prototype, "warn", { get: function() {
          return this.suppressErrorLogging ? function() {
          } : console.warn.bind(console, this.prefixString());
        }, enumerable: !1, configurable: !0 }), b;
      }();
      h.ConsoleLogger = g;
    }]);
  });
})(pr);
var Rr = pr.exports;
const Mr = /* @__PURE__ */ Xn(Rr);
var Hn = { exports: {} }, Mt = -1, Pt = 1, Ot = 0;
function Le(A, I, _, h, v) {
  if (A === I)
    return A ? [[Ot, A]] : [];
  if (_ != null) {
    var g = Kr(A, I, _);
    if (g)
      return g;
  }
  var b = Qn(A, I), p = A.substring(0, b);
  A = A.substring(b), I = I.substring(b), b = Qe(A, I);
  var f = A.substring(A.length - b);
  A = A.substring(0, A.length - b), I = I.substring(0, I.length - b);
  var d = qr(A, I);
  return p && d.unshift([Ot, p]), f && d.push([Ot, f]), Jn(d, v), h && Cr(d), d;
}
function qr(A, I) {
  var _;
  if (!A)
    return [[Pt, I]];
  if (!I)
    return [[Mt, A]];
  var h = A.length > I.length ? A : I, v = A.length > I.length ? I : A, g = h.indexOf(v);
  if (g !== -1)
    return _ = [
      [Pt, h.substring(0, g)],
      [Ot, v],
      [Pt, h.substring(g + v.length)]
    ], A.length > I.length && (_[0][0] = _[2][0] = Mt), _;
  if (v.length === 1)
    return [
      [Mt, A],
      [Pt, I]
    ];
  var b = Dr(A, I);
  if (b) {
    var p = b[0], f = b[1], d = b[2], u = b[3], n = b[4], t = Le(p, d), e = Le(f, u);
    return t.concat([[Ot, n]], e);
  }
  return Br(A, I);
}
function Br(A, I) {
  for (var _ = A.length, h = I.length, v = Math.ceil((_ + h) / 2), g = v, b = 2 * v, p = new Array(b), f = new Array(b), d = 0; d < b; d++)
    p[d] = -1, f[d] = -1;
  p[g + 1] = 0, f[g + 1] = 0;
  for (var u = _ - h, n = u % 2 !== 0, t = 0, e = 0, o = 0, l = 0, i = 0; i < v; i++) {
    for (var r = -i + t; r <= i - e; r += 2) {
      var a = g + r, c;
      r === -i || r !== i && p[a - 1] < p[a + 1] ? c = p[a + 1] : c = p[a - 1] + 1;
      for (var s = c - r; c < _ && s < h && A.charAt(c) === I.charAt(s); )
        c++, s++;
      if (p[a] = c, c > _)
        e += 2;
      else if (s > h)
        t += 2;
      else if (n) {
        var y = g + u - r;
        if (y >= 0 && y < b && f[y] !== -1) {
          var E = _ - f[y];
          if (c >= E)
            return or(A, I, c, s);
        }
      }
    }
    for (var O = -i + o; O <= i - l; O += 2) {
      var y = g + O, E;
      O === -i || O !== i && f[y - 1] < f[y + 1] ? E = f[y + 1] : E = f[y - 1] + 1;
      for (var N = E - O; E < _ && N < h && A.charAt(_ - E - 1) === I.charAt(h - N - 1); )
        E++, N++;
      if (f[y] = E, E > _)
        l += 2;
      else if (N > h)
        o += 2;
      else if (!n) {
        var a = g + u - O;
        if (a >= 0 && a < b && p[a] !== -1) {
          var c = p[a], s = g + c - a;
          if (E = _ - E, c >= E)
            return or(A, I, c, s);
        }
      }
    }
  }
  return [
    [Mt, A],
    [Pt, I]
  ];
}
function or(A, I, _, h) {
  var v = A.substring(0, _), g = I.substring(0, h), b = A.substring(_), p = I.substring(h), f = Le(v, g), d = Le(b, p);
  return f.concat(d);
}
function Qn(A, I) {
  if (!A || !I || A.charAt(0) !== I.charAt(0))
    return 0;
  for (var _ = 0, h = Math.min(A.length, I.length), v = h, g = 0; _ < v; )
    A.substring(g, v) == I.substring(g, v) ? (_ = v, g = _) : h = v, v = Math.floor((h - _) / 2 + _);
  return vr(A.charCodeAt(v - 1)) && v--, v;
}
function ar(A, I) {
  var _ = A.length, h = I.length;
  if (_ == 0 || h == 0)
    return 0;
  _ > h ? A = A.substring(_ - h) : _ < h && (I = I.substring(0, _));
  var v = Math.min(_, h);
  if (A == I)
    return v;
  for (var g = 0, b = 1; ; ) {
    var p = A.substring(v - b), f = I.indexOf(p);
    if (f == -1)
      return g;
    b += f, (f == 0 || A.substring(v - b) == I.substring(0, b)) && (g = b, b++);
  }
}
function Qe(A, I) {
  if (!A || !I || A.slice(-1) !== I.slice(-1))
    return 0;
  for (var _ = 0, h = Math.min(A.length, I.length), v = h, g = 0; _ < v; )
    A.substring(A.length - v, A.length - g) == I.substring(I.length - v, I.length - g) ? (_ = v, g = _) : h = v, v = Math.floor((h - _) / 2 + _);
  return yr(A.charCodeAt(A.length - v)) && v--, v;
}
function Dr(A, I) {
  var _ = A.length > I.length ? A : I, h = A.length > I.length ? I : A;
  if (_.length < 4 || h.length * 2 < _.length)
    return null;
  function v(e, o, l) {
    for (var i = e.substring(l, l + Math.floor(e.length / 4)), r = -1, a = "", c, s, y, E; (r = o.indexOf(i, r + 1)) !== -1; ) {
      var O = Qn(
        e.substring(l),
        o.substring(r)
      ), N = Qe(
        e.substring(0, l),
        o.substring(0, r)
      );
      a.length < N + O && (a = o.substring(r - N, r) + o.substring(r, r + O), c = e.substring(0, l - N), s = e.substring(l + O), y = o.substring(0, r - N), E = o.substring(r + O));
    }
    return a.length * 2 >= e.length ? [
      c,
      s,
      y,
      E,
      a
    ] : null;
  }
  var g = v(
    _,
    h,
    Math.ceil(_.length / 4)
  ), b = v(
    _,
    h,
    Math.ceil(_.length / 2)
  ), p;
  if (!g && !b)
    return null;
  b ? g ? p = g[4].length > b[4].length ? g : b : p = b : p = g;
  var f, d, u, n;
  A.length > I.length ? (f = p[0], d = p[1], u = p[2], n = p[3]) : (u = p[0], n = p[1], f = p[2], d = p[3]);
  var t = p[4];
  return [f, d, u, n, t];
}
function Cr(A) {
  for (var I = !1, _ = [], h = 0, v = null, g = 0, b = 0, p = 0, f = 0, d = 0; g < A.length; )
    A[g][0] == Ot ? (_[h++] = g, b = f, p = d, f = 0, d = 0, v = A[g][1]) : (A[g][0] == Pt ? f += A[g][1].length : d += A[g][1].length, v && v.length <= Math.max(b, p) && v.length <= Math.max(f, d) && (A.splice(_[h - 1], 0, [
      Mt,
      v
    ]), A[_[h - 1] + 1][0] = Pt, h--, h--, g = h > 0 ? _[h - 1] : -1, b = 0, p = 0, f = 0, d = 0, v = null, I = !0)), g++;
  for (I && Jn(A), Hr(A), g = 1; g < A.length; ) {
    if (A[g - 1][0] == Mt && A[g][0] == Pt) {
      var u = A[g - 1][1], n = A[g][1], t = ar(u, n), e = ar(n, u);
      t >= e ? (t >= u.length / 2 || t >= n.length / 2) && (A.splice(g, 0, [
        Ot,
        n.substring(0, t)
      ]), A[g - 1][1] = u.substring(
        0,
        u.length - t
      ), A[g + 1][1] = n.substring(t), g++) : (e >= u.length / 2 || e >= n.length / 2) && (A.splice(g, 0, [
        Ot,
        u.substring(0, e)
      ]), A[g - 1][0] = Pt, A[g - 1][1] = n.substring(
        0,
        n.length - e
      ), A[g + 1][0] = Mt, A[g + 1][1] = u.substring(e), g++), g++;
    }
    g++;
  }
}
var lr = /[^a-zA-Z0-9]/, ur = /\s/, sr = /[\r\n]/, Ur = /\n\r?\n$/, Fr = /^\r?\n\r?\n/;
function Hr(A) {
  function I(e, o) {
    if (!e || !o)
      return 6;
    var l = e.charAt(e.length - 1), i = o.charAt(0), r = l.match(lr), a = i.match(lr), c = r && l.match(ur), s = a && i.match(ur), y = c && l.match(sr), E = s && i.match(sr), O = y && e.match(Ur), N = E && o.match(Fr);
    return O || N ? 5 : y || E ? 4 : r && !c && s ? 3 : c || s ? 2 : r || a ? 1 : 0;
  }
  for (var _ = 1; _ < A.length - 1; ) {
    if (A[_ - 1][0] == Ot && A[_ + 1][0] == Ot) {
      var h = A[_ - 1][1], v = A[_][1], g = A[_ + 1][1], b = Qe(h, v);
      if (b) {
        var p = v.substring(v.length - b);
        h = h.substring(0, h.length - b), v = p + v.substring(0, v.length - b), g = p + g;
      }
      for (var f = h, d = v, u = g, n = I(h, v) + I(v, g); v.charAt(0) === g.charAt(0); ) {
        h += v.charAt(0), v = v.substring(1) + g.charAt(0), g = g.substring(1);
        var t = I(h, v) + I(v, g);
        t >= n && (n = t, f = h, d = v, u = g);
      }
      A[_ - 1][1] != f && (f ? A[_ - 1][1] = f : (A.splice(_ - 1, 1), _--), A[_][1] = d, u ? A[_ + 1][1] = u : (A.splice(_ + 1, 1), _--));
    }
    _++;
  }
}
function Jn(A, I) {
  A.push([Ot, ""]);
  for (var _ = 0, h = 0, v = 0, g = "", b = "", p; _ < A.length; ) {
    if (_ < A.length - 1 && !A[_][1]) {
      A.splice(_, 1);
      continue;
    }
    switch (A[_][0]) {
      case Pt:
        v++, b += A[_][1], _++;
        break;
      case Mt:
        h++, g += A[_][1], _++;
        break;
      case Ot:
        var f = _ - v - h - 1;
        if (I) {
          if (f >= 0 && mr(A[f][1])) {
            var d = A[f][1].slice(-1);
            if (A[f][1] = A[f][1].slice(
              0,
              -1
            ), g = d + g, b = d + b, !A[f][1]) {
              A.splice(f, 1), _--;
              var u = f - 1;
              A[u] && A[u][0] === Pt && (v++, b = A[u][1] + b, u--), A[u] && A[u][0] === Mt && (h++, g = A[u][1] + g, u--), f = u;
            }
          }
          if (gr(A[_][1])) {
            var d = A[_][1].charAt(0);
            A[_][1] = A[_][1].slice(1), g += d, b += d;
          }
        }
        if (_ < A.length - 1 && !A[_][1]) {
          A.splice(_, 1);
          break;
        }
        if (g.length > 0 || b.length > 0) {
          g.length > 0 && b.length > 0 && (p = Qn(b, g), p !== 0 && (f >= 0 ? A[f][1] += b.substring(
            0,
            p
          ) : (A.splice(0, 0, [
            Ot,
            b.substring(0, p)
          ]), _++), b = b.substring(p), g = g.substring(p)), p = Qe(b, g), p !== 0 && (A[_][1] = b.substring(b.length - p) + A[_][1], b = b.substring(
            0,
            b.length - p
          ), g = g.substring(
            0,
            g.length - p
          )));
          var n = v + h;
          g.length === 0 && b.length === 0 ? (A.splice(_ - n, n), _ = _ - n) : g.length === 0 ? (A.splice(_ - n, n, [Pt, b]), _ = _ - n + 1) : b.length === 0 ? (A.splice(_ - n, n, [Mt, g]), _ = _ - n + 1) : (A.splice(
            _ - n,
            n,
            [Mt, g],
            [Pt, b]
          ), _ = _ - n + 2);
        }
        _ !== 0 && A[_ - 1][0] === Ot ? (A[_ - 1][1] += A[_][1], A.splice(_, 1)) : _++, v = 0, h = 0, g = "", b = "";
        break;
    }
  }
  A[A.length - 1][1] === "" && A.pop();
  var t = !1;
  for (_ = 1; _ < A.length - 1; )
    A[_ - 1][0] === Ot && A[_ + 1][0] === Ot && (A[_][1].substring(
      A[_][1].length - A[_ - 1][1].length
    ) === A[_ - 1][1] ? (A[_][1] = A[_ - 1][1] + A[_][1].substring(
      0,
      A[_][1].length - A[_ - 1][1].length
    ), A[_ + 1][1] = A[_ - 1][1] + A[_ + 1][1], A.splice(_ - 1, 1), t = !0) : A[_][1].substring(0, A[_ + 1][1].length) == A[_ + 1][1] && (A[_ - 1][1] += A[_ + 1][1], A[_][1] = A[_][1].substring(A[_ + 1][1].length) + A[_ + 1][1], A.splice(_ + 1, 1), t = !0)), _++;
  t && Jn(A, I);
}
function vr(A) {
  return A >= 55296 && A <= 56319;
}
function yr(A) {
  return A >= 56320 && A <= 57343;
}
function gr(A) {
  return yr(A.charCodeAt(0));
}
function mr(A) {
  return vr(A.charCodeAt(A.length - 1));
}
function zr(A) {
  for (var I = [], _ = 0; _ < A.length; _++)
    A[_][1].length > 0 && I.push(A[_]);
  return I;
}
function Fn(A, I, _, h) {
  return mr(A) || gr(h) ? null : zr([
    [Ot, A],
    [Mt, I],
    [Pt, _],
    [Ot, h]
  ]);
}
function Kr(A, I, _) {
  var h = typeof _ == "number" ? { index: _, length: 0 } : _.oldRange, v = typeof _ == "number" ? null : _.newRange, g = A.length, b = I.length;
  if (h.length === 0 && (v === null || v.length === 0)) {
    var p = h.index, f = A.slice(0, p), d = A.slice(p), u = v ? v.index : null;
    t: {
      var n = p + b - g;
      if (u !== null && u !== n || n < 0 || n > b)
        break t;
      var t = I.slice(0, n), e = I.slice(n);
      if (e !== d)
        break t;
      var o = Math.min(p, n), l = f.slice(0, o), i = t.slice(0, o);
      if (l !== i)
        break t;
      var r = f.slice(o), a = t.slice(o);
      return Fn(l, r, a, d);
    }
    t: {
      if (u !== null && u !== p)
        break t;
      var c = p, t = I.slice(0, c), e = I.slice(c);
      if (t !== f)
        break t;
      var s = Math.min(g - c, b - c), y = d.slice(d.length - s), E = e.slice(e.length - s);
      if (y !== E)
        break t;
      var r = d.slice(0, d.length - s), a = e.slice(0, e.length - s);
      return Fn(f, r, a, y);
    }
  }
  if (h.length > 0 && v && v.length === 0)
    t: {
      var l = A.slice(0, h.index), y = A.slice(h.index + h.length), o = l.length, s = y.length;
      if (b < o + s)
        break t;
      var i = I.slice(0, o), E = I.slice(b - s);
      if (l !== i || y !== E)
        break t;
      var r = A.slice(o, g - s), a = I.slice(o, b - s);
      return Fn(l, r, a, y);
    }
  return null;
}
function Je(A, I, _, h) {
  return Le(A, I, _, h, !0);
}
Je.INSERT = Pt;
Je.DELETE = Mt;
Je.EQUAL = Ot;
var $r = Je, Ze = { exports: {} };
Ze.exports;
(function(A, I) {
  var _ = 200, h = "__lodash_hash_undefined__", v = 9007199254740991, g = "[object Arguments]", b = "[object Array]", p = "[object Boolean]", f = "[object Date]", d = "[object Error]", u = "[object Function]", n = "[object GeneratorFunction]", t = "[object Map]", e = "[object Number]", o = "[object Object]", l = "[object Promise]", i = "[object RegExp]", r = "[object Set]", a = "[object String]", c = "[object Symbol]", s = "[object WeakMap]", y = "[object ArrayBuffer]", E = "[object DataView]", O = "[object Float32Array]", N = "[object Float64Array]", P = "[object Int8Array]", x = "[object Int16Array]", w = "[object Int32Array]", T = "[object Uint8Array]", k = "[object Uint8ClampedArray]", j = "[object Uint16Array]", D = "[object Uint32Array]", z = /[\\^$.*+?()[\]{}|]/g, $ = /\w*$/, J = /^\[object .+?Constructor\]$/, H = /^(?:0|[1-9]\d*)$/, M = {};
  M[g] = M[b] = M[y] = M[E] = M[p] = M[f] = M[O] = M[N] = M[P] = M[x] = M[w] = M[t] = M[e] = M[o] = M[i] = M[r] = M[a] = M[c] = M[T] = M[k] = M[j] = M[D] = !0, M[d] = M[u] = M[s] = !1;
  var S = typeof Ft == "object" && Ft && Ft.Object === Object && Ft, q = typeof self == "object" && self && self.Object === Object && self, B = S || q || Function("return this")(), K = I && !I.nodeType && I, U = K && !0 && A && !A.nodeType && A, R = U && U.exports === K;
  function F(m, L) {
    return m.set(L[0], L[1]), m;
  }
  function W(m, L) {
    return m.add(L), m;
  }
  function G(m, L) {
    for (var C = -1, V = m ? m.length : 0; ++C < V && L(m[C], C, m) !== !1; )
      ;
    return m;
  }
  function X(m, L) {
    for (var C = -1, V = L.length, ut = m.length; ++C < V; )
      m[ut + C] = L[C];
    return m;
  }
  function nt(m, L, C, V) {
    var ut = -1, rt = m ? m.length : 0;
    for (V && rt && (C = m[++ut]); ++ut < rt; )
      C = L(C, m[ut], ut, m);
    return C;
  }
  function it(m, L) {
    for (var C = -1, V = Array(m); ++C < m; )
      V[C] = L(C);
    return V;
  }
  function at(m, L) {
    return m == null ? void 0 : m[L];
  }
  function ft(m) {
    var L = !1;
    if (m != null && typeof m.toString != "function")
      try {
        L = !!(m + "");
      } catch {
      }
    return L;
  }
  function ht(m) {
    var L = -1, C = Array(m.size);
    return m.forEach(function(V, ut) {
      C[++L] = [ut, V];
    }), C;
  }
  function mt(m, L) {
    return function(C) {
      return m(L(C));
    };
  }
  function gt(m) {
    var L = -1, C = Array(m.size);
    return m.forEach(function(V) {
      C[++L] = V;
    }), C;
  }
  var Y = Array.prototype, Z = Function.prototype, tt = Object.prototype, et = B["__core-js_shared__"], Q = function() {
    var m = /[^.]+$/.exec(et && et.keys && et.keys.IE_PROTO || "");
    return m ? "Symbol(src)_1." + m : "";
  }(), st = Z.toString, ot = tt.hasOwnProperty, lt = tt.toString, Tt = RegExp(
    "^" + st.call(ot).replace(z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Et = R ? B.Buffer : void 0, vt = B.Symbol, Xt = B.Uint8Array, dt = mt(Object.getPrototypeOf, Object), Rt = Object.create, Pe = tt.propertyIsEnumerable, nn = Y.splice, pe = Object.getOwnPropertySymbols, oe = Et ? Et.isBuffer : void 0, je = mt(Object.keys, Object), ae = Bt(B, "DataView"), Qt = Bt(B, "Map"), qt = Bt(B, "Promise"), le = Bt(B, "Set"), ve = Bt(B, "WeakMap"), Jt = Bt(Object, "create"), ye = Lt(ae), te = Lt(Qt), ge = Lt(qt), me = Lt(le), be = Lt(ve), Gt = vt ? vt.prototype : void 0, Ie = Gt ? Gt.valueOf : void 0;
  function Ht(m) {
    var L = -1, C = m ? m.length : 0;
    for (this.clear(); ++L < C; ) {
      var V = m[L];
      this.set(V[0], V[1]);
    }
  }
  function rn() {
    this.__data__ = Jt ? Jt(null) : {};
  }
  function on(m) {
    return this.has(m) && delete this.__data__[m];
  }
  function an(m) {
    var L = this.__data__;
    if (Jt) {
      var C = L[m];
      return C === h ? void 0 : C;
    }
    return ot.call(L, m) ? L[m] : void 0;
  }
  function Re(m) {
    var L = this.__data__;
    return Jt ? L[m] !== void 0 : ot.call(L, m);
  }
  function _e(m, L) {
    var C = this.__data__;
    return C[m] = Jt && L === void 0 ? h : L, this;
  }
  Ht.prototype.clear = rn, Ht.prototype.delete = on, Ht.prototype.get = an, Ht.prototype.has = Re, Ht.prototype.set = _e;
  function wt(m) {
    var L = -1, C = m ? m.length : 0;
    for (this.clear(); ++L < C; ) {
      var V = m[L];
      this.set(V[0], V[1]);
    }
  }
  function ln() {
    this.__data__ = [];
  }
  function un(m) {
    var L = this.__data__, C = se(L, m);
    if (C < 0)
      return !1;
    var V = L.length - 1;
    return C == V ? L.pop() : nn.call(L, C, 1), !0;
  }
  function sn(m) {
    var L = this.__data__, C = se(L, m);
    return C < 0 ? void 0 : L[C][1];
  }
  function fn(m) {
    return se(this.__data__, m) > -1;
  }
  function cn(m, L) {
    var C = this.__data__, V = se(C, m);
    return V < 0 ? C.push([m, L]) : C[V][1] = L, this;
  }
  wt.prototype.clear = ln, wt.prototype.delete = un, wt.prototype.get = sn, wt.prototype.has = fn, wt.prototype.set = cn;
  function xt(m) {
    var L = -1, C = m ? m.length : 0;
    for (this.clear(); ++L < C; ) {
      var V = m[L];
      this.set(V[0], V[1]);
    }
  }
  function hn() {
    this.__data__ = {
      hash: new Ht(),
      map: new (Qt || wt)(),
      string: new Ht()
    };
  }
  function dn(m) {
    return ne(this, m).delete(m);
  }
  function pn(m) {
    return ne(this, m).get(m);
  }
  function vn(m) {
    return ne(this, m).has(m);
  }
  function yn(m, L) {
    return ne(this, m).set(m, L), this;
  }
  xt.prototype.clear = hn, xt.prototype.delete = dn, xt.prototype.get = pn, xt.prototype.has = vn, xt.prototype.set = yn;
  function jt(m) {
    this.__data__ = new wt(m);
  }
  function gn() {
    this.__data__ = new wt();
  }
  function mn(m) {
    return this.__data__.delete(m);
  }
  function bn(m) {
    return this.__data__.get(m);
  }
  function _n(m) {
    return this.__data__.has(m);
  }
  function On(m, L) {
    var C = this.__data__;
    if (C instanceof wt) {
      var V = C.__data__;
      if (!Qt || V.length < _ - 1)
        return V.push([m, L]), this;
      C = this.__data__ = new xt(V);
    }
    return C.set(m, L), this;
  }
  jt.prototype.clear = gn, jt.prototype.delete = mn, jt.prototype.get = bn, jt.prototype.has = _n, jt.prototype.set = On;
  function ue(m, L) {
    var C = Ae(m) || ce(m) ? it(m.length, String) : [], V = C.length, ut = !!V;
    for (var rt in m)
      (L || ot.call(m, rt)) && !(ut && (rt == "length" || Mn(rt, V))) && C.push(rt);
    return C;
  }
  function Me(m, L, C) {
    var V = m[L];
    (!(ot.call(m, L) && Ue(V, C)) || C === void 0 && !(L in m)) && (m[L] = C);
  }
  function se(m, L) {
    for (var C = m.length; C--; )
      if (Ue(m[C][0], L))
        return C;
    return -1;
  }
  function Dt(m, L) {
    return m && we(L, Te(L), m);
  }
  function Oe(m, L, C, V, ut, rt, ct) {
    var pt;
    if (V && (pt = rt ? V(m, ut, rt, ct) : V(m)), pt !== void 0)
      return pt;
    if (!Ut(m))
      return m;
    var bt = Ae(m);
    if (bt) {
      if (pt = In(m), !L)
        return Ln(m, pt);
    } else {
      var yt = Kt(m), St = yt == u || yt == n;
      if (Fe(m))
        return fe(m, L);
      if (yt == o || yt == g || St && !rt) {
        if (ft(m))
          return rt ? m : {};
        if (pt = Ct(St ? {} : m), !L)
          return Pn(m, Dt(pt, m));
      } else {
        if (!M[yt])
          return rt ? m : {};
        pt = Rn(m, yt, Oe, L);
      }
    }
    ct || (ct = new jt());
    var It = ct.get(m);
    if (It)
      return It;
    if (ct.set(m, pt), !bt)
      var _t = C ? jn(m) : Te(m);
    return G(_t || m, function(kt, At) {
      _t && (At = kt, kt = m[At]), Me(pt, At, Oe(kt, L, C, V, At, m, ct));
    }), pt;
  }
  function En(m) {
    return Ut(m) ? Rt(m) : {};
  }
  function wn(m, L, C) {
    var V = L(m);
    return Ae(m) ? V : X(V, C(m));
  }
  function An(m) {
    return lt.call(m);
  }
  function Nn(m) {
    if (!Ut(m) || Bn(m))
      return !1;
    var L = Ne(m) || ft(m) ? Tt : J;
    return L.test(Lt(m));
  }
  function Tn(m) {
    if (!De(m))
      return je(m);
    var L = [];
    for (var C in Object(m))
      ot.call(m, C) && C != "constructor" && L.push(C);
    return L;
  }
  function fe(m, L) {
    if (L)
      return m.slice();
    var C = new m.constructor(m.length);
    return m.copy(C), C;
  }
  function Ee(m) {
    var L = new m.constructor(m.byteLength);
    return new Xt(L).set(new Xt(m)), L;
  }
  function ee(m, L) {
    var C = L ? Ee(m.buffer) : m.buffer;
    return new m.constructor(C, m.byteOffset, m.byteLength);
  }
  function qe(m, L, C) {
    var V = L ? C(ht(m), !0) : ht(m);
    return nt(V, F, new m.constructor());
  }
  function Be(m) {
    var L = new m.constructor(m.source, $.exec(m));
    return L.lastIndex = m.lastIndex, L;
  }
  function xn(m, L, C) {
    var V = L ? C(gt(m), !0) : gt(m);
    return nt(V, W, new m.constructor());
  }
  function Sn(m) {
    return Ie ? Object(Ie.call(m)) : {};
  }
  function kn(m, L) {
    var C = L ? Ee(m.buffer) : m.buffer;
    return new m.constructor(C, m.byteOffset, m.length);
  }
  function Ln(m, L) {
    var C = -1, V = m.length;
    for (L || (L = Array(V)); ++C < V; )
      L[C] = m[C];
    return L;
  }
  function we(m, L, C, V) {
    C || (C = {});
    for (var ut = -1, rt = L.length; ++ut < rt; ) {
      var ct = L[ut], pt = V ? V(C[ct], m[ct], ct, C, m) : void 0;
      Me(C, ct, pt === void 0 ? m[ct] : pt);
    }
    return C;
  }
  function Pn(m, L) {
    return we(m, zt(m), L);
  }
  function jn(m) {
    return wn(m, Te, zt);
  }
  function ne(m, L) {
    var C = m.__data__;
    return qn(L) ? C[typeof L == "string" ? "string" : "hash"] : C.map;
  }
  function Bt(m, L) {
    var C = at(m, L);
    return Nn(C) ? C : void 0;
  }
  var zt = pe ? mt(pe, Object) : Cn, Kt = An;
  (ae && Kt(new ae(new ArrayBuffer(1))) != E || Qt && Kt(new Qt()) != t || qt && Kt(qt.resolve()) != l || le && Kt(new le()) != r || ve && Kt(new ve()) != s) && (Kt = function(m) {
    var L = lt.call(m), C = L == o ? m.constructor : void 0, V = C ? Lt(C) : void 0;
    if (V)
      switch (V) {
        case ye:
          return E;
        case te:
          return t;
        case ge:
          return l;
        case me:
          return r;
        case be:
          return s;
      }
    return L;
  });
  function In(m) {
    var L = m.length, C = m.constructor(L);
    return L && typeof m[0] == "string" && ot.call(m, "index") && (C.index = m.index, C.input = m.input), C;
  }
  function Ct(m) {
    return typeof m.constructor == "function" && !De(m) ? En(dt(m)) : {};
  }
  function Rn(m, L, C, V) {
    var ut = m.constructor;
    switch (L) {
      case y:
        return Ee(m);
      case p:
      case f:
        return new ut(+m);
      case E:
        return ee(m, V);
      case O:
      case N:
      case P:
      case x:
      case w:
      case T:
      case k:
      case j:
      case D:
        return kn(m, V);
      case t:
        return qe(m, V, C);
      case e:
      case a:
        return new ut(m);
      case i:
        return Be(m);
      case r:
        return xn(m, V, C);
      case c:
        return Sn(m);
    }
  }
  function Mn(m, L) {
    return L = L ?? v, !!L && (typeof m == "number" || H.test(m)) && m > -1 && m % 1 == 0 && m < L;
  }
  function qn(m) {
    var L = typeof m;
    return L == "string" || L == "number" || L == "symbol" || L == "boolean" ? m !== "__proto__" : m === null;
  }
  function Bn(m) {
    return !!Q && Q in m;
  }
  function De(m) {
    var L = m && m.constructor, C = typeof L == "function" && L.prototype || tt;
    return m === C;
  }
  function Lt(m) {
    if (m != null) {
      try {
        return st.call(m);
      } catch {
      }
      try {
        return m + "";
      } catch {
      }
    }
    return "";
  }
  function Ce(m) {
    return Oe(m, !0, !0);
  }
  function Ue(m, L) {
    return m === L || m !== m && L !== L;
  }
  function ce(m) {
    return Dn(m) && ot.call(m, "callee") && (!Pe.call(m, "callee") || lt.call(m) == g);
  }
  var Ae = Array.isArray;
  function he(m) {
    return m != null && He(m.length) && !Ne(m);
  }
  function Dn(m) {
    return ze(m) && he(m);
  }
  var Fe = oe || Un;
  function Ne(m) {
    var L = Ut(m) ? lt.call(m) : "";
    return L == u || L == n;
  }
  function He(m) {
    return typeof m == "number" && m > -1 && m % 1 == 0 && m <= v;
  }
  function Ut(m) {
    var L = typeof m;
    return !!m && (L == "object" || L == "function");
  }
  function ze(m) {
    return !!m && typeof m == "object";
  }
  function Te(m) {
    return he(m) ? ue(m) : Tn(m);
  }
  function Cn() {
    return [];
  }
  function Un() {
    return !1;
  }
  A.exports = Ce;
})(Ze, Ze.exports);
var br = Ze.exports, Xe = { exports: {} };
Xe.exports;
(function(A, I) {
  var _ = 200, h = "__lodash_hash_undefined__", v = 1, g = 2, b = 9007199254740991, p = "[object Arguments]", f = "[object Array]", d = "[object AsyncFunction]", u = "[object Boolean]", n = "[object Date]", t = "[object Error]", e = "[object Function]", o = "[object GeneratorFunction]", l = "[object Map]", i = "[object Number]", r = "[object Null]", a = "[object Object]", c = "[object Promise]", s = "[object Proxy]", y = "[object RegExp]", E = "[object Set]", O = "[object String]", N = "[object Symbol]", P = "[object Undefined]", x = "[object WeakMap]", w = "[object ArrayBuffer]", T = "[object DataView]", k = "[object Float32Array]", j = "[object Float64Array]", D = "[object Int8Array]", z = "[object Int16Array]", $ = "[object Int32Array]", J = "[object Uint8Array]", H = "[object Uint8ClampedArray]", M = "[object Uint16Array]", S = "[object Uint32Array]", q = /[\\^$.*+?()[\]{}|]/g, B = /^\[object .+?Constructor\]$/, K = /^(?:0|[1-9]\d*)$/, U = {};
  U[k] = U[j] = U[D] = U[z] = U[$] = U[J] = U[H] = U[M] = U[S] = !0, U[p] = U[f] = U[w] = U[u] = U[T] = U[n] = U[t] = U[e] = U[l] = U[i] = U[a] = U[y] = U[E] = U[O] = U[x] = !1;
  var R = typeof Ft == "object" && Ft && Ft.Object === Object && Ft, F = typeof self == "object" && self && self.Object === Object && self, W = R || F || Function("return this")(), G = I && !I.nodeType && I, X = G && !0 && A && !A.nodeType && A, nt = X && X.exports === G, it = nt && R.process, at = function() {
    try {
      return it && it.binding && it.binding("util");
    } catch {
    }
  }(), ft = at && at.isTypedArray;
  function ht(m, L) {
    for (var C = -1, V = m == null ? 0 : m.length, ut = 0, rt = []; ++C < V; ) {
      var ct = m[C];
      L(ct, C, m) && (rt[ut++] = ct);
    }
    return rt;
  }
  function mt(m, L) {
    for (var C = -1, V = L.length, ut = m.length; ++C < V; )
      m[ut + C] = L[C];
    return m;
  }
  function gt(m, L) {
    for (var C = -1, V = m == null ? 0 : m.length; ++C < V; )
      if (L(m[C], C, m))
        return !0;
    return !1;
  }
  function Y(m, L) {
    for (var C = -1, V = Array(m); ++C < m; )
      V[C] = L(C);
    return V;
  }
  function Z(m) {
    return function(L) {
      return m(L);
    };
  }
  function tt(m, L) {
    return m.has(L);
  }
  function et(m, L) {
    return m == null ? void 0 : m[L];
  }
  function Q(m) {
    var L = -1, C = Array(m.size);
    return m.forEach(function(V, ut) {
      C[++L] = [ut, V];
    }), C;
  }
  function st(m, L) {
    return function(C) {
      return m(L(C));
    };
  }
  function ot(m) {
    var L = -1, C = Array(m.size);
    return m.forEach(function(V) {
      C[++L] = V;
    }), C;
  }
  var lt = Array.prototype, Tt = Function.prototype, Et = Object.prototype, vt = W["__core-js_shared__"], Xt = Tt.toString, dt = Et.hasOwnProperty, Rt = function() {
    var m = /[^.]+$/.exec(vt && vt.keys && vt.keys.IE_PROTO || "");
    return m ? "Symbol(src)_1." + m : "";
  }(), Pe = Et.toString, nn = RegExp(
    "^" + Xt.call(dt).replace(q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), pe = nt ? W.Buffer : void 0, oe = W.Symbol, je = W.Uint8Array, ae = Et.propertyIsEnumerable, Qt = lt.splice, qt = oe ? oe.toStringTag : void 0, le = Object.getOwnPropertySymbols, ve = pe ? pe.isBuffer : void 0, Jt = st(Object.keys, Object), ye = zt(W, "DataView"), te = zt(W, "Map"), ge = zt(W, "Promise"), me = zt(W, "Set"), be = zt(W, "WeakMap"), Gt = zt(Object, "create"), Ie = Lt(ye), Ht = Lt(te), rn = Lt(ge), on = Lt(me), an = Lt(be), Re = oe ? oe.prototype : void 0, _e = Re ? Re.valueOf : void 0;
  function wt(m) {
    var L = -1, C = m == null ? 0 : m.length;
    for (this.clear(); ++L < C; ) {
      var V = m[L];
      this.set(V[0], V[1]);
    }
  }
  function ln() {
    this.__data__ = Gt ? Gt(null) : {}, this.size = 0;
  }
  function un(m) {
    var L = this.has(m) && delete this.__data__[m];
    return this.size -= L ? 1 : 0, L;
  }
  function sn(m) {
    var L = this.__data__;
    if (Gt) {
      var C = L[m];
      return C === h ? void 0 : C;
    }
    return dt.call(L, m) ? L[m] : void 0;
  }
  function fn(m) {
    var L = this.__data__;
    return Gt ? L[m] !== void 0 : dt.call(L, m);
  }
  function cn(m, L) {
    var C = this.__data__;
    return this.size += this.has(m) ? 0 : 1, C[m] = Gt && L === void 0 ? h : L, this;
  }
  wt.prototype.clear = ln, wt.prototype.delete = un, wt.prototype.get = sn, wt.prototype.has = fn, wt.prototype.set = cn;
  function xt(m) {
    var L = -1, C = m == null ? 0 : m.length;
    for (this.clear(); ++L < C; ) {
      var V = m[L];
      this.set(V[0], V[1]);
    }
  }
  function hn() {
    this.__data__ = [], this.size = 0;
  }
  function dn(m) {
    var L = this.__data__, C = fe(L, m);
    if (C < 0)
      return !1;
    var V = L.length - 1;
    return C == V ? L.pop() : Qt.call(L, C, 1), --this.size, !0;
  }
  function pn(m) {
    var L = this.__data__, C = fe(L, m);
    return C < 0 ? void 0 : L[C][1];
  }
  function vn(m) {
    return fe(this.__data__, m) > -1;
  }
  function yn(m, L) {
    var C = this.__data__, V = fe(C, m);
    return V < 0 ? (++this.size, C.push([m, L])) : C[V][1] = L, this;
  }
  xt.prototype.clear = hn, xt.prototype.delete = dn, xt.prototype.get = pn, xt.prototype.has = vn, xt.prototype.set = yn;
  function jt(m) {
    var L = -1, C = m == null ? 0 : m.length;
    for (this.clear(); ++L < C; ) {
      var V = m[L];
      this.set(V[0], V[1]);
    }
  }
  function gn() {
    this.size = 0, this.__data__ = {
      hash: new wt(),
      map: new (te || xt)(),
      string: new wt()
    };
  }
  function mn(m) {
    var L = Bt(this, m).delete(m);
    return this.size -= L ? 1 : 0, L;
  }
  function bn(m) {
    return Bt(this, m).get(m);
  }
  function _n(m) {
    return Bt(this, m).has(m);
  }
  function On(m, L) {
    var C = Bt(this, m), V = C.size;
    return C.set(m, L), this.size += C.size == V ? 0 : 1, this;
  }
  jt.prototype.clear = gn, jt.prototype.delete = mn, jt.prototype.get = bn, jt.prototype.has = _n, jt.prototype.set = On;
  function ue(m) {
    var L = -1, C = m == null ? 0 : m.length;
    for (this.__data__ = new jt(); ++L < C; )
      this.add(m[L]);
  }
  function Me(m) {
    return this.__data__.set(m, h), this;
  }
  function se(m) {
    return this.__data__.has(m);
  }
  ue.prototype.add = ue.prototype.push = Me, ue.prototype.has = se;
  function Dt(m) {
    var L = this.__data__ = new xt(m);
    this.size = L.size;
  }
  function Oe() {
    this.__data__ = new xt(), this.size = 0;
  }
  function En(m) {
    var L = this.__data__, C = L.delete(m);
    return this.size = L.size, C;
  }
  function wn(m) {
    return this.__data__.get(m);
  }
  function An(m) {
    return this.__data__.has(m);
  }
  function Nn(m, L) {
    var C = this.__data__;
    if (C instanceof xt) {
      var V = C.__data__;
      if (!te || V.length < _ - 1)
        return V.push([m, L]), this.size = ++C.size, this;
      C = this.__data__ = new jt(V);
    }
    return C.set(m, L), this.size = C.size, this;
  }
  Dt.prototype.clear = Oe, Dt.prototype.delete = En, Dt.prototype.get = wn, Dt.prototype.has = An, Dt.prototype.set = Nn;
  function Tn(m, L) {
    var C = ce(m), V = !C && Ue(m), ut = !C && !V && he(m), rt = !C && !V && !ut && ze(m), ct = C || V || ut || rt, pt = ct ? Y(m.length, String) : [], bt = pt.length;
    for (var yt in m)
      (L || dt.call(m, yt)) && !(ct && // Safari 9 has enumerable `arguments.length` in strict mode.
      (yt == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ut && (yt == "offset" || yt == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      rt && (yt == "buffer" || yt == "byteLength" || yt == "byteOffset") || // Skip index properties.
      Rn(yt, bt))) && pt.push(yt);
    return pt;
  }
  function fe(m, L) {
    for (var C = m.length; C--; )
      if (Ce(m[C][0], L))
        return C;
    return -1;
  }
  function Ee(m, L, C) {
    var V = L(m);
    return ce(m) ? V : mt(V, C(m));
  }
  function ee(m) {
    return m == null ? m === void 0 ? P : r : qt && qt in Object(m) ? Kt(m) : De(m);
  }
  function qe(m) {
    return Ut(m) && ee(m) == p;
  }
  function Be(m, L, C, V, ut) {
    return m === L ? !0 : m == null || L == null || !Ut(m) && !Ut(L) ? m !== m && L !== L : xn(m, L, C, V, Be, ut);
  }
  function xn(m, L, C, V, ut, rt) {
    var ct = ce(m), pt = ce(L), bt = ct ? f : Ct(m), yt = pt ? f : Ct(L);
    bt = bt == p ? a : bt, yt = yt == p ? a : yt;
    var St = bt == a, It = yt == a, _t = bt == yt;
    if (_t && he(m)) {
      if (!he(L))
        return !1;
      ct = !0, St = !1;
    }
    if (_t && !St)
      return rt || (rt = new Dt()), ct || ze(m) ? we(m, L, C, V, ut, rt) : Pn(m, L, bt, C, V, ut, rt);
    if (!(C & v)) {
      var kt = St && dt.call(m, "__wrapped__"), At = It && dt.call(L, "__wrapped__");
      if (kt || At) {
        var Vt = kt ? m.value() : m, $t = At ? L.value() : L;
        return rt || (rt = new Dt()), ut(Vt, $t, C, V, rt);
      }
    }
    return _t ? (rt || (rt = new Dt()), jn(m, L, C, V, ut, rt)) : !1;
  }
  function Sn(m) {
    if (!He(m) || qn(m))
      return !1;
    var L = Fe(m) ? nn : B;
    return L.test(Lt(m));
  }
  function kn(m) {
    return Ut(m) && Ne(m.length) && !!U[ee(m)];
  }
  function Ln(m) {
    if (!Bn(m))
      return Jt(m);
    var L = [];
    for (var C in Object(m))
      dt.call(m, C) && C != "constructor" && L.push(C);
    return L;
  }
  function we(m, L, C, V, ut, rt) {
    var ct = C & v, pt = m.length, bt = L.length;
    if (pt != bt && !(ct && bt > pt))
      return !1;
    var yt = rt.get(m);
    if (yt && rt.get(L))
      return yt == L;
    var St = -1, It = !0, _t = C & g ? new ue() : void 0;
    for (rt.set(m, L), rt.set(L, m); ++St < pt; ) {
      var kt = m[St], At = L[St];
      if (V)
        var Vt = ct ? V(At, kt, St, L, m, rt) : V(kt, At, St, m, L, rt);
      if (Vt !== void 0) {
        if (Vt)
          continue;
        It = !1;
        break;
      }
      if (_t) {
        if (!gt(L, function($t, re) {
          if (!tt(_t, re) && (kt === $t || ut(kt, $t, C, V, rt)))
            return _t.push(re);
        })) {
          It = !1;
          break;
        }
      } else if (!(kt === At || ut(kt, At, C, V, rt))) {
        It = !1;
        break;
      }
    }
    return rt.delete(m), rt.delete(L), It;
  }
  function Pn(m, L, C, V, ut, rt, ct) {
    switch (C) {
      case T:
        if (m.byteLength != L.byteLength || m.byteOffset != L.byteOffset)
          return !1;
        m = m.buffer, L = L.buffer;
      case w:
        return !(m.byteLength != L.byteLength || !rt(new je(m), new je(L)));
      case u:
      case n:
      case i:
        return Ce(+m, +L);
      case t:
        return m.name == L.name && m.message == L.message;
      case y:
      case O:
        return m == L + "";
      case l:
        var pt = Q;
      case E:
        var bt = V & v;
        if (pt || (pt = ot), m.size != L.size && !bt)
          return !1;
        var yt = ct.get(m);
        if (yt)
          return yt == L;
        V |= g, ct.set(m, L);
        var St = we(pt(m), pt(L), V, ut, rt, ct);
        return ct.delete(m), St;
      case N:
        if (_e)
          return _e.call(m) == _e.call(L);
    }
    return !1;
  }
  function jn(m, L, C, V, ut, rt) {
    var ct = C & v, pt = ne(m), bt = pt.length, yt = ne(L), St = yt.length;
    if (bt != St && !ct)
      return !1;
    for (var It = bt; It--; ) {
      var _t = pt[It];
      if (!(ct ? _t in L : dt.call(L, _t)))
        return !1;
    }
    var kt = rt.get(m);
    if (kt && rt.get(L))
      return kt == L;
    var At = !0;
    rt.set(m, L), rt.set(L, m);
    for (var Vt = ct; ++It < bt; ) {
      _t = pt[It];
      var $t = m[_t], re = L[_t];
      if (V)
        var ir = ct ? V(re, $t, _t, L, m, rt) : V($t, re, _t, m, L, rt);
      if (!(ir === void 0 ? $t === re || ut($t, re, C, V, rt) : ir)) {
        At = !1;
        break;
      }
      Vt || (Vt = _t == "constructor");
    }
    if (At && !Vt) {
      var Ke = m.constructor, $e = L.constructor;
      Ke != $e && "constructor" in m && "constructor" in L && !(typeof Ke == "function" && Ke instanceof Ke && typeof $e == "function" && $e instanceof $e) && (At = !1);
    }
    return rt.delete(m), rt.delete(L), At;
  }
  function ne(m) {
    return Ee(m, Te, In);
  }
  function Bt(m, L) {
    var C = m.__data__;
    return Mn(L) ? C[typeof L == "string" ? "string" : "hash"] : C.map;
  }
  function zt(m, L) {
    var C = et(m, L);
    return Sn(C) ? C : void 0;
  }
  function Kt(m) {
    var L = dt.call(m, qt), C = m[qt];
    try {
      m[qt] = void 0;
      var V = !0;
    } catch {
    }
    var ut = Pe.call(m);
    return V && (L ? m[qt] = C : delete m[qt]), ut;
  }
  var In = le ? function(m) {
    return m == null ? [] : (m = Object(m), ht(le(m), function(L) {
      return ae.call(m, L);
    }));
  } : Cn, Ct = ee;
  (ye && Ct(new ye(new ArrayBuffer(1))) != T || te && Ct(new te()) != l || ge && Ct(ge.resolve()) != c || me && Ct(new me()) != E || be && Ct(new be()) != x) && (Ct = function(m) {
    var L = ee(m), C = L == a ? m.constructor : void 0, V = C ? Lt(C) : "";
    if (V)
      switch (V) {
        case Ie:
          return T;
        case Ht:
          return l;
        case rn:
          return c;
        case on:
          return E;
        case an:
          return x;
      }
    return L;
  });
  function Rn(m, L) {
    return L = L ?? b, !!L && (typeof m == "number" || K.test(m)) && m > -1 && m % 1 == 0 && m < L;
  }
  function Mn(m) {
    var L = typeof m;
    return L == "string" || L == "number" || L == "symbol" || L == "boolean" ? m !== "__proto__" : m === null;
  }
  function qn(m) {
    return !!Rt && Rt in m;
  }
  function Bn(m) {
    var L = m && m.constructor, C = typeof L == "function" && L.prototype || Et;
    return m === C;
  }
  function De(m) {
    return Pe.call(m);
  }
  function Lt(m) {
    if (m != null) {
      try {
        return Xt.call(m);
      } catch {
      }
      try {
        return m + "";
      } catch {
      }
    }
    return "";
  }
  function Ce(m, L) {
    return m === L || m !== m && L !== L;
  }
  var Ue = qe(/* @__PURE__ */ function() {
    return arguments;
  }()) ? qe : function(m) {
    return Ut(m) && dt.call(m, "callee") && !ae.call(m, "callee");
  }, ce = Array.isArray;
  function Ae(m) {
    return m != null && Ne(m.length) && !Fe(m);
  }
  var he = ve || Un;
  function Dn(m, L) {
    return Be(m, L);
  }
  function Fe(m) {
    if (!He(m))
      return !1;
    var L = ee(m);
    return L == e || L == o || L == d || L == s;
  }
  function Ne(m) {
    return typeof m == "number" && m > -1 && m % 1 == 0 && m <= b;
  }
  function He(m) {
    var L = typeof m;
    return m != null && (L == "object" || L == "function");
  }
  function Ut(m) {
    return m != null && typeof m == "object";
  }
  var ze = ft ? Z(ft) : kn;
  function Te(m) {
    return Ae(m) ? Tn(m) : Ln(m);
  }
  function Cn() {
    return [];
  }
  function Un() {
    return !1;
  }
  A.exports = Dn;
})(Xe, Xe.exports);
var _r = Xe.exports, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
const Wr = br, Gr = _r;
var zn;
(function(A) {
  function I(g = {}, b = {}, p = !1) {
    typeof g != "object" && (g = {}), typeof b != "object" && (b = {});
    let f = Wr(b);
    p || (f = Object.keys(f).reduce((d, u) => (f[u] != null && (d[u] = f[u]), d), {}));
    for (const d in g)
      g[d] !== void 0 && b[d] === void 0 && (f[d] = g[d]);
    return Object.keys(f).length > 0 ? f : void 0;
  }
  A.compose = I;
  function _(g = {}, b = {}) {
    typeof g != "object" && (g = {}), typeof b != "object" && (b = {});
    const p = Object.keys(g).concat(Object.keys(b)).reduce((f, d) => (Gr(g[d], b[d]) || (f[d] = b[d] === void 0 ? null : b[d]), f), {});
    return Object.keys(p).length > 0 ? p : void 0;
  }
  A.diff = _;
  function h(g = {}, b = {}) {
    g = g || {};
    const p = Object.keys(b).reduce((f, d) => (b[d] !== g[d] && g[d] !== void 0 && (f[d] = b[d]), f), {});
    return Object.keys(g).reduce((f, d) => (g[d] !== b[d] && b[d] === void 0 && (f[d] = null), f), p);
  }
  A.invert = h;
  function v(g, b, p = !1) {
    if (typeof g != "object")
      return b;
    if (typeof b != "object")
      return;
    if (!p)
      return b;
    const f = Object.keys(b).reduce((d, u) => (g[u] === void 0 && (d[u] = b[u]), d), {});
    return Object.keys(f).length > 0 ? f : void 0;
  }
  A.transform = v;
})(zn || (zn = {}));
tr.default = zn;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
var Kn;
(function(A) {
  function I(_) {
    return typeof _.delete == "number" ? _.delete : typeof _.retain == "number" ? _.retain : typeof _.retain == "object" && _.retain !== null ? 1 : typeof _.insert == "string" ? _.insert.length : 1;
  }
  A.length = I;
})(Kn || (Kn = {}));
tn.default = Kn;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
const fr = tn;
class Vr {
  constructor(I) {
    this.ops = I, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return this.peekLength() < 1 / 0;
  }
  next(I) {
    I || (I = 1 / 0);
    const _ = this.ops[this.index];
    if (_) {
      const h = this.offset, v = fr.default.length(_);
      if (I >= v - h ? (I = v - h, this.index += 1, this.offset = 0) : this.offset += I, typeof _.delete == "number")
        return { delete: I };
      {
        const g = {};
        return _.attributes && (g.attributes = _.attributes), typeof _.retain == "number" ? g.retain = I : typeof _.retain == "object" && _.retain !== null ? g.retain = _.retain : typeof _.insert == "string" ? g.insert = _.insert.substr(h, I) : g.insert = _.insert, g;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? fr.default.length(this.ops[this.index]) - this.offset : 1 / 0;
  }
  peekType() {
    const I = this.ops[this.index];
    return I ? typeof I.delete == "number" ? "delete" : typeof I.retain == "number" || typeof I.retain == "object" && I.retain !== null ? "retain" : "insert" : "retain";
  }
  rest() {
    if (this.hasNext()) {
      if (this.offset === 0)
        return this.ops.slice(this.index);
      {
        const I = this.offset, _ = this.index, h = this.next(), v = this.ops.slice(this.index);
        return this.offset = I, this.index = _, [h].concat(v);
      }
    } else
      return [];
  }
}
er.default = Vr;
(function(A, I) {
  Object.defineProperty(I, "__esModule", { value: !0 }), I.AttributeMap = I.OpIterator = I.Op = void 0;
  const _ = $r, h = br, v = _r, g = tr;
  I.AttributeMap = g.default;
  const b = tn;
  I.Op = b.default;
  const p = er;
  I.OpIterator = p.default;
  const f = "\0", d = (n, t) => {
    if (typeof n != "object" || n === null)
      throw new Error(`cannot retain a ${typeof n}`);
    if (typeof t != "object" || t === null)
      throw new Error(`cannot retain a ${typeof t}`);
    const e = Object.keys(n)[0];
    if (!e || e !== Object.keys(t)[0])
      throw new Error(`embed types not matched: ${e} != ${Object.keys(t)[0]}`);
    return [e, n[e], t[e]];
  };
  class u {
    constructor(t) {
      Array.isArray(t) ? this.ops = t : t != null && Array.isArray(t.ops) ? this.ops = t.ops : this.ops = [];
    }
    static registerEmbed(t, e) {
      this.handlers[t] = e;
    }
    static unregisterEmbed(t) {
      delete this.handlers[t];
    }
    static getHandler(t) {
      const e = this.handlers[t];
      if (!e)
        throw new Error(`no handlers for embed type "${t}"`);
      return e;
    }
    insert(t, e) {
      const o = {};
      return typeof t == "string" && t.length === 0 ? this : (o.insert = t, e != null && typeof e == "object" && Object.keys(e).length > 0 && (o.attributes = e), this.push(o));
    }
    delete(t) {
      return t <= 0 ? this : this.push({ delete: t });
    }
    retain(t, e) {
      if (typeof t == "number" && t <= 0)
        return this;
      const o = { retain: t };
      return e != null && typeof e == "object" && Object.keys(e).length > 0 && (o.attributes = e), this.push(o);
    }
    push(t) {
      let e = this.ops.length, o = this.ops[e - 1];
      if (t = h(t), typeof o == "object") {
        if (typeof t.delete == "number" && typeof o.delete == "number")
          return this.ops[e - 1] = { delete: o.delete + t.delete }, this;
        if (typeof o.delete == "number" && t.insert != null && (e -= 1, o = this.ops[e - 1], typeof o != "object"))
          return this.ops.unshift(t), this;
        if (v(t.attributes, o.attributes)) {
          if (typeof t.insert == "string" && typeof o.insert == "string")
            return this.ops[e - 1] = { insert: o.insert + t.insert }, typeof t.attributes == "object" && (this.ops[e - 1].attributes = t.attributes), this;
          if (typeof t.retain == "number" && typeof o.retain == "number")
            return this.ops[e - 1] = { retain: o.retain + t.retain }, typeof t.attributes == "object" && (this.ops[e - 1].attributes = t.attributes), this;
        }
      }
      return e === this.ops.length ? this.ops.push(t) : this.ops.splice(e, 0, t), this;
    }
    chop() {
      const t = this.ops[this.ops.length - 1];
      return t && typeof t.retain == "number" && !t.attributes && this.ops.pop(), this;
    }
    filter(t) {
      return this.ops.filter(t);
    }
    forEach(t) {
      this.ops.forEach(t);
    }
    map(t) {
      return this.ops.map(t);
    }
    partition(t) {
      const e = [], o = [];
      return this.forEach((l) => {
        (t(l) ? e : o).push(l);
      }), [e, o];
    }
    reduce(t, e) {
      return this.ops.reduce(t, e);
    }
    changeLength() {
      return this.reduce((t, e) => e.insert ? t + b.default.length(e) : e.delete ? t - e.delete : t, 0);
    }
    length() {
      return this.reduce((t, e) => t + b.default.length(e), 0);
    }
    slice(t = 0, e = 1 / 0) {
      const o = [], l = new p.default(this.ops);
      let i = 0;
      for (; i < e && l.hasNext(); ) {
        let r;
        i < t ? r = l.next(t - i) : (r = l.next(e - i), o.push(r)), i += b.default.length(r);
      }
      return new u(o);
    }
    compose(t) {
      const e = new p.default(this.ops), o = new p.default(t.ops), l = [], i = o.peek();
      if (i != null && typeof i.retain == "number" && i.attributes == null) {
        let a = i.retain;
        for (; e.peekType() === "insert" && e.peekLength() <= a; )
          a -= e.peekLength(), l.push(e.next());
        i.retain - a > 0 && o.next(i.retain - a);
      }
      const r = new u(l);
      for (; e.hasNext() || o.hasNext(); )
        if (o.peekType() === "insert")
          r.push(o.next());
        else if (e.peekType() === "delete")
          r.push(e.next());
        else {
          const a = Math.min(e.peekLength(), o.peekLength()), c = e.next(a), s = o.next(a);
          if (s.retain) {
            const y = {};
            if (typeof c.retain == "number")
              y.retain = typeof s.retain == "number" ? a : s.retain;
            else if (typeof s.retain == "number")
              c.retain == null ? y.insert = c.insert : y.retain = c.retain;
            else {
              const O = c.retain == null ? "insert" : "retain", [N, P, x] = d(c[O], s.retain), w = u.getHandler(N);
              y[O] = {
                [N]: w.compose(P, x, O === "retain")
              };
            }
            const E = g.default.compose(c.attributes, s.attributes, typeof c.retain == "number");
            if (E && (y.attributes = E), r.push(y), !o.hasNext() && v(r.ops[r.ops.length - 1], y)) {
              const O = new u(e.rest());
              return r.concat(O).chop();
            }
          } else
            typeof s.delete == "number" && (typeof c.retain == "number" || typeof c.retain == "object" && c.retain !== null) && r.push(s);
        }
      return r.chop();
    }
    concat(t) {
      const e = new u(this.ops.slice());
      return t.ops.length > 0 && (e.push(t.ops[0]), e.ops = e.ops.concat(t.ops.slice(1))), e;
    }
    diff(t, e) {
      if (this.ops === t.ops)
        return new u();
      const o = [this, t].map((c) => c.map((s) => {
        if (s.insert != null)
          return typeof s.insert == "string" ? s.insert : f;
        const y = c === t ? "on" : "with";
        throw new Error("diff() called " + y + " non-document");
      }).join("")), l = new u(), i = _(o[0], o[1], e, !0), r = new p.default(this.ops), a = new p.default(t.ops);
      return i.forEach((c) => {
        let s = c[1].length;
        for (; s > 0; ) {
          let y = 0;
          switch (c[0]) {
            case _.INSERT:
              y = Math.min(a.peekLength(), s), l.push(a.next(y));
              break;
            case _.DELETE:
              y = Math.min(s, r.peekLength()), r.next(y), l.delete(y);
              break;
            case _.EQUAL:
              y = Math.min(r.peekLength(), a.peekLength(), s);
              const E = r.next(y), O = a.next(y);
              v(E.insert, O.insert) ? l.retain(y, g.default.diff(E.attributes, O.attributes)) : l.push(O).delete(y);
              break;
          }
          s -= y;
        }
      }), l.chop();
    }
    eachLine(t, e = `
`) {
      const o = new p.default(this.ops);
      let l = new u(), i = 0;
      for (; o.hasNext(); ) {
        if (o.peekType() !== "insert")
          return;
        const r = o.peek(), a = b.default.length(r) - o.peekLength(), c = typeof r.insert == "string" ? r.insert.indexOf(e, a) - a : -1;
        if (c < 0)
          l.push(o.next());
        else if (c > 0)
          l.push(o.next(c));
        else {
          if (t(l, o.next(1).attributes || {}, i) === !1)
            return;
          i += 1, l = new u();
        }
      }
      l.length() > 0 && t(l, {}, i);
    }
    invert(t) {
      const e = new u();
      return this.reduce((o, l) => {
        if (l.insert)
          e.delete(b.default.length(l));
        else {
          if (typeof l.retain == "number" && l.attributes == null)
            return e.retain(l.retain), o + l.retain;
          if (l.delete || typeof l.retain == "number") {
            const i = l.delete || l.retain;
            return t.slice(o, o + i).forEach((a) => {
              l.delete ? e.push(a) : l.retain && l.attributes && e.retain(b.default.length(a), g.default.invert(l.attributes, a.attributes));
            }), o + i;
          } else if (typeof l.retain == "object" && l.retain !== null) {
            const i = t.slice(o, o + 1), r = new p.default(i.ops).next(), [a, c, s] = d(l.retain, r.insert), y = u.getHandler(a);
            return e.retain({ [a]: y.invert(c, s) }, g.default.invert(l.attributes, r.attributes)), o + 1;
          }
        }
        return o;
      }, 0), e.chop();
    }
    transform(t, e = !1) {
      if (e = !!e, typeof t == "number")
        return this.transformPosition(t, e);
      const o = t, l = new p.default(this.ops), i = new p.default(o.ops), r = new u();
      for (; l.hasNext() || i.hasNext(); )
        if (l.peekType() === "insert" && (e || i.peekType() !== "insert"))
          r.retain(b.default.length(l.next()));
        else if (i.peekType() === "insert")
          r.push(i.next());
        else {
          const a = Math.min(l.peekLength(), i.peekLength()), c = l.next(a), s = i.next(a);
          if (c.delete)
            continue;
          if (s.delete)
            r.push(s);
          else {
            const y = c.retain, E = s.retain;
            let O = typeof E == "object" && E !== null ? E : a;
            if (typeof y == "object" && y !== null && typeof E == "object" && E !== null) {
              const N = Object.keys(y)[0];
              if (N === Object.keys(E)[0]) {
                const P = u.getHandler(N);
                P && (O = {
                  [N]: P.transform(y[N], E[N], e)
                });
              }
            }
            r.retain(O, g.default.transform(c.attributes, s.attributes, e));
          }
        }
      return r.chop();
    }
    transformPosition(t, e = !1) {
      e = !!e;
      const o = new p.default(this.ops);
      let l = 0;
      for (; o.hasNext() && l <= t; ) {
        const i = o.peekLength(), r = o.peekType();
        if (o.next(), r === "delete") {
          t -= Math.min(i, t - l);
          continue;
        } else
          r === "insert" && (l < t || !e) && (t += i);
        l += i;
      }
      return t;
    }
  }
  u.Op = b.default, u.OpIterator = p.default, u.AttributeMap = g.default, u.handlers = {}, I.default = u, A.exports = u, A.exports.default = u;
})(Hn, Hn.exports);
var Yr = Hn.exports;
const cr = /* @__PURE__ */ Xn(Yr);
var Zr = Object.defineProperty, Xr = (A, I, _) => I in A ? Zr(A, I, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : A[I] = _, ie = (A, I, _) => (Xr(A, typeof I != "symbol" ? I + "" : I, _), _), Or = (A, I, _) => {
  if (!I.has(A))
    throw TypeError("Cannot " + _);
}, de = (A, I, _) => (Or(A, I, "read from private field"), _ ? _.call(A) : I.get(A)), $n = (A, I, _) => {
  if (I.has(A))
    throw TypeError("Cannot add the same private member more than once");
  I instanceof WeakSet ? I.add(A) : I.set(A, _);
}, Ge = (A, I, _, h) => (Or(A, I, "write to private field"), h ? h.call(A, _) : I.set(A, _), _), Qr = Object.defineProperty, Jr = (A, I, _) => I in A ? Qr(A, I, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : A[I] = _, Wn = (A, I, _) => (Jr(A, typeof I != "symbol" ? I + "" : I, _), _);
function ti(A, I) {
  return I.reduce((_, h) => (_[h] = A[h], _), {});
}
function Er(A) {
  return Object.entries(A);
}
function ei(A) {
  return Object.fromEntries(A);
}
function ke(A) {
  return Array.isArray(A);
}
function wr(A) {
  return A === null;
}
function en(A) {
  return typeof A == "object" && !wr(A) && !ke(A);
}
function ni(A) {
  return en(A) && A instanceof Map;
}
function ri(A) {
  return typeof A == "object" && !wr(A);
}
function ii(A) {
  return en(A) && A instanceof Set;
}
function oi(A) {
  return ke(A) ? Array.from(A) : ii(A) ? new Set(A) : ni(A) ? new Map(A) : ri(A) ? ei(Er(A)) : A;
}
function ai(A) {
  return typeof A < "u";
}
function li(A, I) {
  return Object.keys(I).reduce((_, h) => (ai(_[h]) || (_[h] = I[h]), _), oi(A));
}
const xe = class {
  constructor(I = {}) {
    Wn(this, "options"), Wn(this, "groups", /* @__PURE__ */ new Set()), this.options = li(I, {
      timestamp: !0,
      out: console.log
    });
  }
  format(I, _, ...h) {
    const { namespace: v, timestamp: g, json: b } = this.options;
    if (b)
      return h = h.map((f) => f instanceof Error ? ti(f, ["name", "message", "stack", "cause"]) : f), JSON.stringify({
        timestamp: g ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        namespace: v,
        groups: this.groups.size ? Array.from(this.groups) : void 0,
        level: I,
        message: _,
        details: h
      });
    let p = [];
    return g && p.push(`<${(/* @__PURE__ */ new Date()).toISOString()}>`), v ? p.push(`[${I}:${v}]`) : p.push(`[${I}]`), this.groups.size && p.push(`{${Array.from(this.groups).join(":")}}`), `${p.join(" ")} ${_}`;
  }
  log(I, _, ...h) {
    const { namespace: v } = this.options;
    if (xe.namespaces.size && !xe.namespaces.has("*") && (!v || !xe.namespaces.has(v) && !Array.from(xe.namespaces).filter(fi).find((f) => f.test(v))))
      return;
    const { out: g, json: b } = this.options, p = this.format(I, _, ...h);
    return b ? g(p) : g(p, ...h);
  }
  info(I, ..._) {
    return this.log("INFO", I, ..._);
  }
  warn(I, ..._) {
    return this.log("WARN", I, ..._);
  }
  error(I, ..._) {
    return this.log("ERROR", I, ..._);
  }
  debug(I, ..._) {
    return this.log("DEBUG", I, ..._);
  }
  group(...I) {
    for (const _ of I)
      this.groups.add(_);
  }
  endGroup(...I) {
    for (const _ of I)
      this.groups.delete(_);
  }
};
let ui = xe;
Wn(ui, "namespaces", /* @__PURE__ */ new Set());
function Gn(A) {
  return typeof A == "string" || A instanceof String;
}
function si(A) {
  return typeof A == "function";
}
function Ar(A) {
  return A.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
}
function fi(A) {
  return en(A) && A instanceof RegExp;
}
function ci(A) {
  return en(A) && A instanceof Promise;
}
function Nt(A, I = {}, ..._) {
  const h = Gn(A) ? document.createElement(A) : document.createElement(A.tag, { is: A.is });
  return Nr(h, I), Tr(h, ..._), h;
}
function Nr(A, I) {
  for (const [_, h] of Er(I))
    _.startsWith("on") && si(h) ? A.addEventListener(_.slice(2).toLowerCase(), h) : A.setAttribute(Ar(_), h);
}
function Tr(A, ...I) {
  for (const _ of I.flat())
    A.append(_);
}
const hi = /* @__PURE__ */ function() {
  return !this;
}();
function xr(A, ...I) {
  let _ = "";
  if (Gn(A))
    _ = A;
  else
    for (const [g, b] of A.entries())
      _ += b, I[g] && (Gn(I[g]) ? _ += I[g] : _ += `<value id="${g}"></value>`);
  const h = Nt("template", {});
  h.innerHTML = _;
  const v = h.content.querySelectorAll("value");
  for (const g of v) {
    const b = parseInt(g.id);
    if (isNaN(b))
      continue;
    const p = I[b];
    p && g.replaceWith(p);
  }
  if (!hi) {
    const g = h.content.querySelectorAll("script");
    for (const b of g) {
      const p = Nt("script", {});
      for (const f of b.attributes)
        p.attributes.setNamedItem(f.cloneNode());
      b.textContent && (p.textContent = b.textContent), b.replaceWith(p);
    }
  }
  return h.content;
}
function di(A) {
  const I = A.querySelectorAll("script");
  for (const _ of I) {
    const h = Nt("script", {});
    for (const v of _.attributes)
      h.attributes.setNamedItem(v.cloneNode());
    _.textContent && (h.textContent = _.textContent), _.replaceWith(h);
  }
  return A;
}
function pi(A, ...I) {
  const _ = Nt("style");
  for (const [h, v] of A.entries())
    _.append(v), I[h] && _.append(I[h]);
  return _;
}
var Zt, Ve;
class Sr extends HTMLElement {
  constructor(I = {}, ..._) {
    super(), $n(this, Zt, !1), $n(this, Ve, void 0), ie(this, "templateURL"), ie(this, "styleURL"), ie(this, "globalStyleURL"), ie(this, "globalStyleLinks", /* @__PURE__ */ new Set()), ie(this, "UNSAFE_EVAL_TEMPLATE_SCRIPTS", !1), this.attachShadow({ mode: "open" }), Ge(this, Ve, I), new.target.inheritAttrs && Nr(this, I), Tr(this, ..._);
  }
  static get tagName() {
    return Ar(this.name);
  }
  static define(I) {
    customElements.define(I ?? this.tagName, this);
  }
  get isMounted() {
    return de(this, Zt);
  }
  get props() {
    return de(this, Ve);
  }
  get shadow() {
    return this.shadowRoot;
  }
  connectedCallback() {
    if (de(this, Zt))
      return;
    if (Ge(this, Zt, !0), this.globalStyleURL)
      if (ke(this.globalStyleURL))
        for (const h of this.globalStyleURL)
          this.attachStyleLink(h, !0);
      else
        this.attachStyleLink(this.globalStyleURL, !0);
    if (this.styleURL)
      if (ke(this.styleURL))
        for (const h of this.styleURL)
          this.attachStyleLink(h);
      else
        this.attachStyleLink(this.styleURL);
    const I = this.render(), _ = (h) => {
      if (h)
        if (ke(h))
          for (const v of h)
            v && this.shadow.append(v);
        else
          this.shadow.append(h);
      else
        return;
    };
    ci(I) ? I.then(_) : _(I), this.mounted && this.mounted();
  }
  attributeChangedCallback(I, _, h) {
    if (this.updated)
      return this.updated(I, _, h);
  }
  disconnectedCallback() {
    if (de(this, Zt)) {
      Ge(this, Zt, !1);
      for (const I of this.globalStyleLinks)
        I.remove(), this.globalStyleLinks.delete(I);
      for (const I of this.shadow.childNodes)
        I.remove();
      this.unmounted && this.unmounted();
    }
  }
  adoptedCallback() {
    de(this, Zt) && this.adopted && this.adopted();
  }
  attachStyleLink(I, _ = !1) {
    const h = Nt("link", {
      rel: "stylesheet",
      href: I.href
    });
    _ ? (this.globalStyleLinks.add(h), document.head.prepend(h)) : this.shadow.prepend(h);
  }
  render() {
    if (this.templateURL)
      return this.fetchTemplate(this.templateURL).then((I) => {
        const _ = xr(I);
        return this.UNSAFE_EVAL_TEMPLATE_SCRIPTS ? di(_) : _;
      });
  }
  async fetchTemplate(I) {
    const _ = await fetch(I.href);
    if (!_.ok)
      throw new Error(`Failed to fetch template: ${I.href}`);
    return _.text();
  }
}
Zt = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), ie(Sr, "inheritAttrs", !1);
var Ye;
const vi = class Vn extends Text {
  constructor(I, _ = /* @__PURE__ */ new Set()) {
    super(I), $n(this, Ye, !1), this.clones = _, _.add(this);
  }
  get value() {
    return this.textContent;
  }
  set value(I) {
    for (const _ of this.clones)
      _.textContent = I;
  }
  clone(I = !1) {
    return this.clones.size >= Vn.leakWarningAt && !de(this, Ye) && (console.warn(
      `TextComponent has ${this.clones.size} clones. This may be a memory leak`
    ), console.trace(`text: "${this.value}"`), Ge(this, Ye, !0)), new Vn(this.value, I ? void 0 : this.clones);
  }
  deref() {
    return this.clones.delete(this), this.clones = /* @__PURE__ */ new Set([this]), this;
  }
};
Ye = /* @__PURE__ */ new WeakMap(), ie(vi, "leakWarningAt", 100);
var yi = Object.defineProperty, gi = (A, I, _) => I in A ? yi(A, I, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : A[I] = _, Yn = (A, I, _) => (gi(A, typeof I != "symbol" ? I + "" : I, _), _);
function mi(A, I) {
  return I.reduce((_, h) => (_[h] = A[h], _), {});
}
function bi(A) {
  return Object.entries(A);
}
function _i(A) {
  return Object.fromEntries(A);
}
function kr(A) {
  return Array.isArray(A);
}
function Lr(A) {
  return A === null;
}
function nr(A) {
  return typeof A == "object" && !Lr(A) && !kr(A);
}
function Oi(A) {
  return nr(A) && A instanceof Map;
}
function Ei(A) {
  return typeof A == "object" && !Lr(A);
}
function wi(A) {
  return nr(A) && A instanceof Set;
}
function Ai(A) {
  return kr(A) ? Array.from(A) : wi(A) ? new Set(A) : Oi(A) ? new Map(A) : Ei(A) ? _i(bi(A)) : A;
}
function Ni(A) {
  return typeof A < "u";
}
function Ti(A, I) {
  return Object.keys(I).reduce((_, h) => (Ni(_[h]) || (_[h] = I[h]), _), Ai(A));
}
const Se = class {
  constructor(A = {}) {
    Yn(this, "options"), Yn(this, "groups", /* @__PURE__ */ new Set()), this.options = Ti(A, {
      timestamp: !0,
      out: console.log
    });
  }
  format(A, I, ..._) {
    const { namespace: h, timestamp: v, json: g } = this.options;
    if (g)
      return _ = _.map((p) => p instanceof Error ? mi(p, ["name", "message", "stack", "cause"]) : p), JSON.stringify({
        timestamp: v ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        namespace: h,
        groups: this.groups.size ? Array.from(this.groups) : void 0,
        level: A,
        message: I,
        details: _
      });
    let b = [];
    return v && b.push(`<${(/* @__PURE__ */ new Date()).toISOString()}>`), h ? b.push(`[${A}:${h}]`) : b.push(`[${A}]`), this.groups.size && b.push(`{${Array.from(this.groups).join(":")}}`), `${b.join(" ")} ${I}`;
  }
  log(A, I, ..._) {
    const { namespace: h } = this.options;
    if (Se.namespaces.size && !Se.namespaces.has("*") && (!h || !Se.namespaces.has(h) && !Array.from(Se.namespaces).filter(Si).find((p) => p.test(h))))
      return;
    const { out: v, json: g } = this.options, b = this.format(A, I, ..._);
    return g ? v(b) : v(b, ..._);
  }
  info(A, ...I) {
    return this.log("INFO", A, ...I);
  }
  warn(A, ...I) {
    return this.log("WARN", A, ...I);
  }
  error(A, ...I) {
    return this.log("ERROR", A, ...I);
  }
  debug(A, ...I) {
    return this.log("DEBUG", A, ...I);
  }
  group(...A) {
    for (const I of A)
      this.groups.add(I);
  }
  endGroup(...A) {
    for (const I of A)
      this.groups.delete(I);
  }
};
let xi = Se;
Yn(xi, "namespaces", /* @__PURE__ */ new Set());
function hr(A) {
  return typeof A == "string" || A instanceof String;
}
function Si(A) {
  return nr(A) && A instanceof RegExp;
}
const rr = class rr extends Sr {
  constructor() {
    super();
    Yt(this, "image", null);
    Yt(this, "x", new Text("0"));
    Yt(this, "y", new Text("0"));
    Yt(this, "width", new Text("0"));
    Yt(this, "height", new Text("0"));
  }
  setImage(_) {
    if (this.image = _, !this.image) {
      this.classList.remove("active");
      return;
    }
    this.classList.add("active"), this.updatePosition();
  }
  emit(_, h) {
    return this.dispatchEvent(new CustomEvent(_, { detail: h }));
  }
  updatePosition() {
    this.image && (this.x.textContent = `${this.image.offsetLeft}`, this.y.textContent = `${this.image.offsetTop}`, this.width.textContent = `${this.image.width}`, this.height.textContent = `${this.image.height}`);
  }
  updateAltText(_) {
    this.image && (this.image.alt = _ ?? "", this.emit("updated"));
  }
  updateTitleText(_) {
    this.image && (this.image.title = _ ?? "", this.emit("updated"));
  }
  updateFloat(_) {
    if (!this.image)
      return;
    const h = `image-float-${_}`;
    this.image.classList.contains(h) ? this.image.classList.remove(h) : (this.image.classList.remove("image-float-left", "image-float-right"), this.image.classList.add(h)), this.updatePosition(), this.emit("updated");
  }
  render() {
    const _ = pi`
            :host, :host * {
                box-sizing: border-box;
            }

            :host {
                display: none;
                position: absolute;
                left: ${this.x}px;
                top: ${this.y}px;
                width: ${this.width}px;
                height: ${this.height}px;
            }

            :host(.active) {
                display: block;
            }

            .image-actions {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 0.5em;
                flex-wrap: wrap;
                width: 100%;

                position: absolute;
                top: 100%;
                left: 0;

                background-color: white;
                padding: 0.5em;
            }

            .image-actions button {
                border: 1px solid black;
                padding: 0.5em;
                background-color: white;
                color: black;
                cursor: pointer;
            }
		`, h = Nt("button", {
      type: "button",
      onclick: () => {
        if (!this.image)
          return;
        const p = prompt("Enter alt text", this.image.alt);
        hr(p) && this.updateAltText(p);
      }
    }, "Edit Alt"), v = Nt("button", {
      type: "button",
      onclick: () => {
        if (!this.image)
          return;
        const p = prompt("Enter title text", this.image.title);
        hr(p) && this.updateTitleText(p);
      }
    }, "Edit Title"), g = Nt("button", {
      type: "button",
      onclick: () => this.updateFloat("left")
    }, "Float Left"), b = Nt("button", {
      type: "button",
      onclick: () => this.updateFloat("right")
    }, "Float Right");
    return xr`
			${_}
			<div class="image-actions">
				${h}
				${v}
				${g}
				${b}
			</div>
		`;
  }
};
rr.define("image-editor");
let Zn = rr;
var ki = { exports: {} };
(function(A, I) {
  (function(h, v) {
    A.exports = v();
  })(typeof self < "u" ? self : Ft, function() {
    return (
      /******/
      function(_) {
        var h = {};
        function v(g) {
          if (h[g])
            return h[g].exports;
          var b = h[g] = {
            /******/
            i: g,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return _[g].call(b.exports, b, b.exports, v), b.l = !0, b.exports;
        }
        return v.m = _, v.c = h, v.d = function(g, b, p) {
          v.o(g, b) || Object.defineProperty(g, b, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: p
            /******/
          });
        }, v.n = function(g) {
          var b = g && g.__esModule ? (
            /******/
            function() {
              return g.default;
            }
          ) : (
            /******/
            function() {
              return g;
            }
          );
          return v.d(b, "a", b), b;
        }, v.o = function(g, b) {
          return Object.prototype.hasOwnProperty.call(g, b);
        }, v.p = "", v(v.s = 9);
      }([
        /* 0 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, a) {
              r.__proto__ = a;
            } || function(r, a) {
              for (var c in a)
                a.hasOwnProperty(c) && (r[c] = a[c]);
            };
            return function(r, a) {
              i(r, a);
              function c() {
                this.constructor = r;
              }
              r.prototype = a === null ? Object.create(a) : (c.prototype = a.prototype, new c());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = (
            /** @class */
            function(i) {
              g(r, i);
              function r(a) {
                var c = this;
                return a = "[Parchment] " + a, c = i.call(this, a) || this, c.message = a, c.name = c.constructor.name, c;
              }
              return r;
            }(Error)
          );
          h.ParchmentError = b;
          var p = {}, f = {}, d = {}, u = {};
          h.DATA_KEY = "__blot";
          var n;
          (function(i) {
            i[i.TYPE = 3] = "TYPE", i[i.LEVEL = 12] = "LEVEL", i[i.ATTRIBUTE = 13] = "ATTRIBUTE", i[i.BLOT = 14] = "BLOT", i[i.INLINE = 7] = "INLINE", i[i.BLOCK = 11] = "BLOCK", i[i.BLOCK_BLOT = 10] = "BLOCK_BLOT", i[i.INLINE_BLOT = 6] = "INLINE_BLOT", i[i.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", i[i.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", i[i.ANY = 15] = "ANY";
          })(n = h.Scope || (h.Scope = {}));
          function t(i, r) {
            var a = o(i);
            if (a == null)
              throw new b("Unable to create " + i + " blot");
            var c = a, s = (
              // @ts-ignore
              i instanceof Node || i.nodeType === Node.TEXT_NODE ? i : c.create(r)
            );
            return new c(s, r);
          }
          h.create = t;
          function e(i, r) {
            return r === void 0 && (r = !1), i == null ? null : i[h.DATA_KEY] != null ? i[h.DATA_KEY].blot : r ? e(i.parentNode, r) : null;
          }
          h.find = e;
          function o(i, r) {
            r === void 0 && (r = n.ANY);
            var a;
            if (typeof i == "string")
              a = u[i] || p[i];
            else if (i instanceof Text || i.nodeType === Node.TEXT_NODE)
              a = u.text;
            else if (typeof i == "number")
              i & n.LEVEL & n.BLOCK ? a = u.block : i & n.LEVEL & n.INLINE && (a = u.inline);
            else if (i instanceof HTMLElement) {
              var c = (i.getAttribute("class") || "").split(/\s+/);
              for (var s in c)
                if (a = f[c[s]], a)
                  break;
              a = a || d[i.tagName];
            }
            return a == null ? null : r & n.LEVEL & a.scope && r & n.TYPE & a.scope ? a : null;
          }
          h.query = o;
          function l() {
            for (var i = [], r = 0; r < arguments.length; r++)
              i[r] = arguments[r];
            if (i.length > 1)
              return i.map(function(s) {
                return l(s);
              });
            var a = i[0];
            if (typeof a.blotName != "string" && typeof a.attrName != "string")
              throw new b("Invalid definition");
            if (a.blotName === "abstract")
              throw new b("Cannot register abstract class");
            if (u[a.blotName || a.attrName] = a, typeof a.keyName == "string")
              p[a.keyName] = a;
            else if (a.className != null && (f[a.className] = a), a.tagName != null) {
              Array.isArray(a.tagName) ? a.tagName = a.tagName.map(function(s) {
                return s.toUpperCase();
              }) : a.tagName = a.tagName.toUpperCase();
              var c = Array.isArray(a.tagName) ? a.tagName : [a.tagName];
              c.forEach(function(s) {
                (d[s] == null || a.className == null) && (d[s] = a);
              });
            }
            return a;
          }
          h.register = l;
        },
        /* 1 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(0), b = (
            /** @class */
            function() {
              function p(f, d, u) {
                u === void 0 && (u = {}), this.attrName = f, this.keyName = d;
                var n = g.Scope.TYPE & g.Scope.ATTRIBUTE;
                u.scope != null ? this.scope = u.scope & g.Scope.LEVEL | n : this.scope = g.Scope.ATTRIBUTE, u.whitelist != null && (this.whitelist = u.whitelist);
              }
              return p.keys = function(f) {
                return [].map.call(f.attributes, function(d) {
                  return d.name;
                });
              }, p.prototype.add = function(f, d) {
                return this.canAdd(f, d) ? (f.setAttribute(this.keyName, d), !0) : !1;
              }, p.prototype.canAdd = function(f, d) {
                var u = g.query(f, g.Scope.BLOT & (this.scope | g.Scope.TYPE));
                return u == null ? !1 : this.whitelist == null ? !0 : typeof d == "string" ? this.whitelist.indexOf(d.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(d) > -1;
              }, p.prototype.remove = function(f) {
                f.removeAttribute(this.keyName);
              }, p.prototype.value = function(f) {
                var d = f.getAttribute(this.keyName);
                return this.canAdd(f, d) && d ? d : "";
              }, p;
            }()
          );
          h.default = b;
        },
        /* 2 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
              t.__proto__ = e;
            } || function(t, e) {
              for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            };
            return function(t, e) {
              n(t, e);
              function o() {
                this.constructor = t;
              }
              t.prototype = e === null ? Object.create(e) : (o.prototype = e.prototype, new o());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(11), p = v(5), f = v(0), d = (
            /** @class */
            function(n) {
              g(t, n);
              function t(e) {
                var o = n.call(this, e) || this;
                return o.build(), o;
              }
              return t.prototype.appendChild = function(e) {
                this.insertBefore(e);
              }, t.prototype.attach = function() {
                n.prototype.attach.call(this), this.children.forEach(function(e) {
                  e.attach();
                });
              }, t.prototype.build = function() {
                var e = this;
                this.children = new b.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(o) {
                  try {
                    var l = u(o);
                    e.insertBefore(l, e.children.head || void 0);
                  } catch (i) {
                    if (i instanceof f.ParchmentError)
                      return;
                    throw i;
                  }
                });
              }, t.prototype.deleteAt = function(e, o) {
                if (e === 0 && o === this.length())
                  return this.remove();
                this.children.forEachAt(e, o, function(l, i, r) {
                  l.deleteAt(i, r);
                });
              }, t.prototype.descendant = function(e, o) {
                var l = this.children.find(o), i = l[0], r = l[1];
                return e.blotName == null && e(i) || e.blotName != null && i instanceof e ? [i, r] : i instanceof t ? i.descendant(e, r) : [null, -1];
              }, t.prototype.descendants = function(e, o, l) {
                o === void 0 && (o = 0), l === void 0 && (l = Number.MAX_VALUE);
                var i = [], r = l;
                return this.children.forEachAt(o, l, function(a, c, s) {
                  (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && i.push(a), a instanceof t && (i = i.concat(a.descendants(e, c, r))), r -= s;
                }), i;
              }, t.prototype.detach = function() {
                this.children.forEach(function(e) {
                  e.detach();
                }), n.prototype.detach.call(this);
              }, t.prototype.formatAt = function(e, o, l, i) {
                this.children.forEachAt(e, o, function(r, a, c) {
                  r.formatAt(a, c, l, i);
                });
              }, t.prototype.insertAt = function(e, o, l) {
                var i = this.children.find(e), r = i[0], a = i[1];
                if (r)
                  r.insertAt(a, o, l);
                else {
                  var c = l == null ? f.create("text", o) : f.create(o, l);
                  this.appendChild(c);
                }
              }, t.prototype.insertBefore = function(e, o) {
                if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(l) {
                  return e instanceof l;
                }))
                  throw new f.ParchmentError("Cannot insert " + e.statics.blotName + " into " + this.statics.blotName);
                e.insertInto(this, o);
              }, t.prototype.length = function() {
                return this.children.reduce(function(e, o) {
                  return e + o.length();
                }, 0);
              }, t.prototype.moveChildren = function(e, o) {
                this.children.forEach(function(l) {
                  e.insertBefore(l, o);
                });
              }, t.prototype.optimize = function(e) {
                if (n.prototype.optimize.call(this, e), this.children.length === 0)
                  if (this.statics.defaultChild != null) {
                    var o = f.create(this.statics.defaultChild);
                    this.appendChild(o), o.optimize(e);
                  } else
                    this.remove();
              }, t.prototype.path = function(e, o) {
                o === void 0 && (o = !1);
                var l = this.children.find(e, o), i = l[0], r = l[1], a = [[this, e]];
                return i instanceof t ? a.concat(i.path(r, o)) : (i != null && a.push([i, r]), a);
              }, t.prototype.removeChild = function(e) {
                this.children.remove(e);
              }, t.prototype.replace = function(e) {
                e instanceof t && e.moveChildren(this), n.prototype.replace.call(this, e);
              }, t.prototype.split = function(e, o) {
                if (o === void 0 && (o = !1), !o) {
                  if (e === 0)
                    return this;
                  if (e === this.length())
                    return this.next;
                }
                var l = this.clone();
                return this.parent.insertBefore(l, this.next), this.children.forEachAt(e, this.length(), function(i, r, a) {
                  i = i.split(r, o), l.appendChild(i);
                }), l;
              }, t.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next), this.remove();
              }, t.prototype.update = function(e, o) {
                var l = this, i = [], r = [];
                e.forEach(function(a) {
                  a.target === l.domNode && a.type === "childList" && (i.push.apply(i, a.addedNodes), r.push.apply(r, a.removedNodes));
                }), r.forEach(function(a) {
                  if (!(a.parentNode != null && // @ts-ignore
                  a.tagName !== "IFRAME" && document.body.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                    var c = f.find(a);
                    c != null && (c.domNode.parentNode == null || c.domNode.parentNode === l.domNode) && c.detach();
                  }
                }), i.filter(function(a) {
                  return a.parentNode == l.domNode;
                }).sort(function(a, c) {
                  return a === c ? 0 : a.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                }).forEach(function(a) {
                  var c = null;
                  a.nextSibling != null && (c = f.find(a.nextSibling));
                  var s = u(a);
                  (s.next != c || s.next == null) && (s.parent != null && s.parent.removeChild(l), l.insertBefore(s, c || void 0));
                });
              }, t;
            }(p.default)
          );
          function u(n) {
            var t = f.find(n);
            if (t == null)
              try {
                t = f.create(n);
              } catch {
                t = f.create(f.Scope.INLINE), [].slice.call(n.childNodes).forEach(function(o) {
                  t.domNode.appendChild(o);
                }), n.parentNode && n.parentNode.replaceChild(t.domNode, n), t.attach();
              }
            return t;
          }
          h.default = d;
        },
        /* 3 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
              t.__proto__ = e;
            } || function(t, e) {
              for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            };
            return function(t, e) {
              n(t, e);
              function o() {
                this.constructor = t;
              }
              t.prototype = e === null ? Object.create(e) : (o.prototype = e.prototype, new o());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(1), p = v(6), f = v(2), d = v(0), u = (
            /** @class */
            function(n) {
              g(t, n);
              function t(e) {
                var o = n.call(this, e) || this;
                return o.attributes = new p.default(o.domNode), o;
              }
              return t.formats = function(e) {
                if (typeof this.tagName == "string")
                  return !0;
                if (Array.isArray(this.tagName))
                  return e.tagName.toLowerCase();
              }, t.prototype.format = function(e, o) {
                var l = d.query(e);
                l instanceof b.default ? this.attributes.attribute(l, o) : o && l != null && (e !== this.statics.blotName || this.formats()[e] !== o) && this.replaceWith(e, o);
              }, t.prototype.formats = function() {
                var e = this.attributes.values(), o = this.statics.formats(this.domNode);
                return o != null && (e[this.statics.blotName] = o), e;
              }, t.prototype.replaceWith = function(e, o) {
                var l = n.prototype.replaceWith.call(this, e, o);
                return this.attributes.copy(l), l;
              }, t.prototype.update = function(e, o) {
                var l = this;
                n.prototype.update.call(this, e, o), e.some(function(i) {
                  return i.target === l.domNode && i.type === "attributes";
                }) && this.attributes.build();
              }, t.prototype.wrap = function(e, o) {
                var l = n.prototype.wrap.call(this, e, o);
                return l instanceof t && l.statics.scope === this.statics.scope && this.attributes.move(l), l;
              }, t;
            }(f.default)
          );
          h.default = u;
        },
        /* 4 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(5), p = v(0), f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.value = function(n) {
                return !0;
              }, u.prototype.index = function(n, t) {
                return this.domNode === n || this.domNode.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
              }, u.prototype.position = function(n, t) {
                var e = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return n > 0 && (e += 1), [this.parent.domNode, e];
              }, u.prototype.value = function() {
                return n = {}, n[this.statics.blotName] = this.statics.value(this.domNode) || !0, n;
                var n;
              }, u.scope = p.Scope.INLINE_BLOT, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 5 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(0), b = (
            /** @class */
            function() {
              function p(f) {
                this.domNode = f, this.domNode[g.DATA_KEY] = { blot: this };
              }
              return Object.defineProperty(p.prototype, "statics", {
                // Hack for accessing inherited static methods
                get: function() {
                  return this.constructor;
                },
                enumerable: !0,
                configurable: !0
              }), p.create = function(f) {
                if (this.tagName == null)
                  throw new g.ParchmentError("Blot definition missing tagName");
                var d;
                return Array.isArray(this.tagName) ? (typeof f == "string" && (f = f.toUpperCase(), parseInt(f).toString() === f && (f = parseInt(f))), typeof f == "number" ? d = document.createElement(this.tagName[f - 1]) : this.tagName.indexOf(f) > -1 ? d = document.createElement(f) : d = document.createElement(this.tagName[0])) : d = document.createElement(this.tagName), this.className && d.classList.add(this.className), d;
              }, p.prototype.attach = function() {
                this.parent != null && (this.scroll = this.parent.scroll);
              }, p.prototype.clone = function() {
                var f = this.domNode.cloneNode(!1);
                return g.create(f);
              }, p.prototype.detach = function() {
                this.parent != null && this.parent.removeChild(this), delete this.domNode[g.DATA_KEY];
              }, p.prototype.deleteAt = function(f, d) {
                var u = this.isolate(f, d);
                u.remove();
              }, p.prototype.formatAt = function(f, d, u, n) {
                var t = this.isolate(f, d);
                if (g.query(u, g.Scope.BLOT) != null && n)
                  t.wrap(u, n);
                else if (g.query(u, g.Scope.ATTRIBUTE) != null) {
                  var e = g.create(this.statics.scope);
                  t.wrap(e), e.format(u, n);
                }
              }, p.prototype.insertAt = function(f, d, u) {
                var n = u == null ? g.create("text", d) : g.create(d, u), t = this.split(f);
                this.parent.insertBefore(n, t);
              }, p.prototype.insertInto = function(f, d) {
                d === void 0 && (d = null), this.parent != null && this.parent.children.remove(this);
                var u = null;
                f.children.insertBefore(this, d), d != null && (u = d.domNode), (this.domNode.parentNode != f.domNode || this.domNode.nextSibling != u) && f.domNode.insertBefore(this.domNode, u), this.parent = f, this.attach();
              }, p.prototype.isolate = function(f, d) {
                var u = this.split(f);
                return u.split(d), u;
              }, p.prototype.length = function() {
                return 1;
              }, p.prototype.offset = function(f) {
                return f === void 0 && (f = this.parent), this.parent == null || this == f ? 0 : this.parent.children.offset(this) + this.parent.offset(f);
              }, p.prototype.optimize = function(f) {
                this.domNode[g.DATA_KEY] != null && delete this.domNode[g.DATA_KEY].mutations;
              }, p.prototype.remove = function() {
                this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
              }, p.prototype.replace = function(f) {
                f.parent != null && (f.parent.insertBefore(this, f.next), f.remove());
              }, p.prototype.replaceWith = function(f, d) {
                var u = typeof f == "string" ? g.create(f, d) : f;
                return u.replace(this), u;
              }, p.prototype.split = function(f, d) {
                return f === 0 ? this : this.next;
              }, p.prototype.update = function(f, d) {
              }, p.prototype.wrap = function(f, d) {
                var u = typeof f == "string" ? g.create(f, d) : f;
                return this.parent != null && this.parent.insertBefore(u, this.next), u.appendChild(this), u;
              }, p.blotName = "abstract", p;
            }()
          );
          h.default = b;
        },
        /* 6 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(1), b = v(7), p = v(8), f = v(0), d = (
            /** @class */
            function() {
              function u(n) {
                this.attributes = {}, this.domNode = n, this.build();
              }
              return u.prototype.attribute = function(n, t) {
                t ? n.add(this.domNode, t) && (n.value(this.domNode) != null ? this.attributes[n.attrName] = n : delete this.attributes[n.attrName]) : (n.remove(this.domNode), delete this.attributes[n.attrName]);
              }, u.prototype.build = function() {
                var n = this;
                this.attributes = {};
                var t = g.default.keys(this.domNode), e = b.default.keys(this.domNode), o = p.default.keys(this.domNode);
                t.concat(e).concat(o).forEach(function(l) {
                  var i = f.query(l, f.Scope.ATTRIBUTE);
                  i instanceof g.default && (n.attributes[i.attrName] = i);
                });
              }, u.prototype.copy = function(n) {
                var t = this;
                Object.keys(this.attributes).forEach(function(e) {
                  var o = t.attributes[e].value(t.domNode);
                  n.format(e, o);
                });
              }, u.prototype.move = function(n) {
                var t = this;
                this.copy(n), Object.keys(this.attributes).forEach(function(e) {
                  t.attributes[e].remove(t.domNode);
                }), this.attributes = {};
              }, u.prototype.values = function() {
                var n = this;
                return Object.keys(this.attributes).reduce(function(t, e) {
                  return t[e] = n.attributes[e].value(n.domNode), t;
                }, {});
              }, u;
            }()
          );
          h.default = d;
        },
        /* 7 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(1);
          function p(d, u) {
            var n = d.getAttribute("class") || "";
            return n.split(/\s+/).filter(function(t) {
              return t.indexOf(u + "-") === 0;
            });
          }
          var f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.keys = function(n) {
                return (n.getAttribute("class") || "").split(/\s+/).map(function(t) {
                  return t.split("-").slice(0, -1).join("-");
                });
              }, u.prototype.add = function(n, t) {
                return this.canAdd(n, t) ? (this.remove(n), n.classList.add(this.keyName + "-" + t), !0) : !1;
              }, u.prototype.remove = function(n) {
                var t = p(n, this.keyName);
                t.forEach(function(e) {
                  n.classList.remove(e);
                }), n.classList.length === 0 && n.removeAttribute("class");
              }, u.prototype.value = function(n) {
                var t = p(n, this.keyName)[0] || "", e = t.slice(this.keyName.length + 1);
                return this.canAdd(n, e) ? e : "";
              }, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 8 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(1);
          function p(d) {
            var u = d.split("-"), n = u.slice(1).map(function(t) {
              return t[0].toUpperCase() + t.slice(1);
            }).join("");
            return u[0] + n;
          }
          var f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.keys = function(n) {
                return (n.getAttribute("style") || "").split(";").map(function(t) {
                  var e = t.split(":");
                  return e[0].trim();
                });
              }, u.prototype.add = function(n, t) {
                return this.canAdd(n, t) ? (n.style[p(this.keyName)] = t, !0) : !1;
              }, u.prototype.remove = function(n) {
                n.style[p(this.keyName)] = "", n.getAttribute("style") || n.removeAttribute("style");
              }, u.prototype.value = function(n) {
                var t = n.style[p(this.keyName)];
                return this.canAdd(n, t) ? t : "";
              }, u;
            }(b.default)
          );
          h.default = f;
        },
        /* 9 */
        /***/
        function(_, h, v) {
          _.exports = v(10);
        },
        /* 10 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = v(2), b = v(3), p = v(4), f = v(12), d = v(13), u = v(14), n = v(15), t = v(16), e = v(1), o = v(7), l = v(8), i = v(6), r = v(0), a = {
            Scope: r.Scope,
            create: r.create,
            find: r.find,
            query: r.query,
            register: r.register,
            Container: g.default,
            Format: b.default,
            Leaf: p.default,
            Embed: n.default,
            Scroll: f.default,
            Block: u.default,
            Inline: d.default,
            Text: t.default,
            Attributor: {
              Attribute: e.default,
              Class: o.default,
              Style: l.default,
              Store: i.default
            }
          };
          h.default = a;
        },
        /* 11 */
        /***/
        function(_, h, v) {
          Object.defineProperty(h, "__esModule", { value: !0 });
          var g = (
            /** @class */
            function() {
              function b() {
                this.head = this.tail = null, this.length = 0;
              }
              return b.prototype.append = function() {
                for (var p = [], f = 0; f < arguments.length; f++)
                  p[f] = arguments[f];
                this.insertBefore(p[0], null), p.length > 1 && this.append.apply(this, p.slice(1));
              }, b.prototype.contains = function(p) {
                for (var f, d = this.iterator(); f = d(); )
                  if (f === p)
                    return !0;
                return !1;
              }, b.prototype.insertBefore = function(p, f) {
                p && (p.next = f, f != null ? (p.prev = f.prev, f.prev != null && (f.prev.next = p), f.prev = p, f === this.head && (this.head = p)) : this.tail != null ? (this.tail.next = p, p.prev = this.tail, this.tail = p) : (p.prev = null, this.head = this.tail = p), this.length += 1);
              }, b.prototype.offset = function(p) {
                for (var f = 0, d = this.head; d != null; ) {
                  if (d === p)
                    return f;
                  f += d.length(), d = d.next;
                }
                return -1;
              }, b.prototype.remove = function(p) {
                this.contains(p) && (p.prev != null && (p.prev.next = p.next), p.next != null && (p.next.prev = p.prev), p === this.head && (this.head = p.next), p === this.tail && (this.tail = p.prev), this.length -= 1);
              }, b.prototype.iterator = function(p) {
                return p === void 0 && (p = this.head), function() {
                  var f = p;
                  return p != null && (p = p.next), f;
                };
              }, b.prototype.find = function(p, f) {
                f === void 0 && (f = !1);
                for (var d, u = this.iterator(); d = u(); ) {
                  var n = d.length();
                  if (p < n || f && p === n && (d.next == null || d.next.length() !== 0))
                    return [d, p];
                  p -= n;
                }
                return [null, 0];
              }, b.prototype.forEach = function(p) {
                for (var f, d = this.iterator(); f = d(); )
                  p(f);
              }, b.prototype.forEachAt = function(p, f, d) {
                if (!(f <= 0))
                  for (var u = this.find(p), n = u[0], t = u[1], e, o = p - t, l = this.iterator(n); (e = l()) && o < p + f; ) {
                    var i = e.length();
                    p > o ? d(e, p - o, Math.min(f, o + i - p)) : d(e, 0, Math.min(i, p + f - o)), o += i;
                  }
              }, b.prototype.map = function(p) {
                return this.reduce(function(f, d) {
                  return f.push(p(d)), f;
                }, []);
              }, b.prototype.reduce = function(p, f) {
                for (var d, u = this.iterator(); d = u(); )
                  f = p(f, d);
                return f;
              }, b;
            }()
          );
          h.default = g;
        },
        /* 12 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
              t.__proto__ = e;
            } || function(t, e) {
              for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            };
            return function(t, e) {
              n(t, e);
              function o() {
                this.constructor = t;
              }
              t.prototype = e === null ? Object.create(e) : (o.prototype = e.prototype, new o());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(2), p = v(0), f = {
            attributes: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
          }, d = 100, u = (
            /** @class */
            function(n) {
              g(t, n);
              function t(e) {
                var o = n.call(this, e) || this;
                return o.scroll = o, o.observer = new MutationObserver(function(l) {
                  o.update(l);
                }), o.observer.observe(o.domNode, f), o.attach(), o;
              }
              return t.prototype.detach = function() {
                n.prototype.detach.call(this), this.observer.disconnect();
              }, t.prototype.deleteAt = function(e, o) {
                this.update(), e === 0 && o === this.length() ? this.children.forEach(function(l) {
                  l.remove();
                }) : n.prototype.deleteAt.call(this, e, o);
              }, t.prototype.formatAt = function(e, o, l, i) {
                this.update(), n.prototype.formatAt.call(this, e, o, l, i);
              }, t.prototype.insertAt = function(e, o, l) {
                this.update(), n.prototype.insertAt.call(this, e, o, l);
              }, t.prototype.optimize = function(e, o) {
                var l = this;
                e === void 0 && (e = []), o === void 0 && (o = {}), n.prototype.optimize.call(this, o);
                for (var i = [].slice.call(this.observer.takeRecords()); i.length > 0; )
                  e.push(i.pop());
                for (var r = function(y, E) {
                  E === void 0 && (E = !0), !(y == null || y === l) && y.domNode.parentNode != null && (y.domNode[p.DATA_KEY].mutations == null && (y.domNode[p.DATA_KEY].mutations = []), E && r(y.parent));
                }, a = function(y) {
                  // @ts-ignore
                  y.domNode[p.DATA_KEY] == null || // @ts-ignore
                  y.domNode[p.DATA_KEY].mutations == null || (y instanceof b.default && y.children.forEach(a), y.optimize(o));
                }, c = e, s = 0; c.length > 0; s += 1) {
                  if (s >= d)
                    throw new Error("[Parchment] Maximum optimize iterations reached");
                  for (c.forEach(function(y) {
                    var E = p.find(y.target, !0);
                    E != null && (E.domNode === y.target && (y.type === "childList" ? (r(p.find(y.previousSibling, !1)), [].forEach.call(y.addedNodes, function(O) {
                      var N = p.find(O, !1);
                      r(N, !1), N instanceof b.default && N.children.forEach(function(P) {
                        r(P, !1);
                      });
                    })) : y.type === "attributes" && r(E.prev)), r(E));
                  }), this.children.forEach(a), c = [].slice.call(this.observer.takeRecords()), i = c.slice(); i.length > 0; )
                    e.push(i.pop());
                }
              }, t.prototype.update = function(e, o) {
                var l = this;
                o === void 0 && (o = {}), e = e || this.observer.takeRecords(), e.map(function(i) {
                  var r = p.find(i.target, !0);
                  return r == null ? null : r.domNode[p.DATA_KEY].mutations == null ? (r.domNode[p.DATA_KEY].mutations = [i], r) : (r.domNode[p.DATA_KEY].mutations.push(i), null);
                }).forEach(function(i) {
                  i == null || i === l || //@ts-ignore
                  i.domNode[p.DATA_KEY] == null || i.update(i.domNode[p.DATA_KEY].mutations || [], o);
                }), this.domNode[p.DATA_KEY].mutations != null && n.prototype.update.call(this, this.domNode[p.DATA_KEY].mutations, o), this.optimize(e, o);
              }, t.blotName = "scroll", t.defaultChild = "block", t.scope = p.Scope.BLOCK_BLOT, t.tagName = "DIV", t;
            }(b.default)
          );
          h.default = u;
        },
        /* 13 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, t) {
              n.__proto__ = t;
            } || function(n, t) {
              for (var e in t)
                t.hasOwnProperty(e) && (n[e] = t[e]);
            };
            return function(n, t) {
              u(n, t);
              function e() {
                this.constructor = n;
              }
              n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(3), p = v(0);
          function f(u, n) {
            if (Object.keys(u).length !== Object.keys(n).length)
              return !1;
            for (var t in u)
              if (u[t] !== n[t])
                return !1;
            return !0;
          }
          var d = (
            /** @class */
            function(u) {
              g(n, u);
              function n() {
                return u !== null && u.apply(this, arguments) || this;
              }
              return n.formats = function(t) {
                if (t.tagName !== n.tagName)
                  return u.formats.call(this, t);
              }, n.prototype.format = function(t, e) {
                var o = this;
                t === this.statics.blotName && !e ? (this.children.forEach(function(l) {
                  l instanceof b.default || (l = l.wrap(n.blotName, !0)), o.attributes.copy(l);
                }), this.unwrap()) : u.prototype.format.call(this, t, e);
              }, n.prototype.formatAt = function(t, e, o, l) {
                if (this.formats()[o] != null || p.query(o, p.Scope.ATTRIBUTE)) {
                  var i = this.isolate(t, e);
                  i.format(o, l);
                } else
                  u.prototype.formatAt.call(this, t, e, o, l);
              }, n.prototype.optimize = function(t) {
                u.prototype.optimize.call(this, t);
                var e = this.formats();
                if (Object.keys(e).length === 0)
                  return this.unwrap();
                var o = this.next;
                o instanceof n && o.prev === this && f(e, o.formats()) && (o.moveChildren(this), o.remove());
              }, n.blotName = "inline", n.scope = p.Scope.INLINE_BLOT, n.tagName = "SPAN", n;
            }(b.default)
          );
          h.default = d;
        },
        /* 14 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(3), p = v(0), f = (
            /** @class */
            function(d) {
              g(u, d);
              function u() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return u.formats = function(n) {
                var t = p.query(u.blotName).tagName;
                if (n.tagName !== t)
                  return d.formats.call(this, n);
              }, u.prototype.format = function(n, t) {
                p.query(n, p.Scope.BLOCK) != null && (n === this.statics.blotName && !t ? this.replaceWith(u.blotName) : d.prototype.format.call(this, n, t));
              }, u.prototype.formatAt = function(n, t, e, o) {
                p.query(e, p.Scope.BLOCK) != null ? this.format(e, o) : d.prototype.formatAt.call(this, n, t, e, o);
              }, u.prototype.insertAt = function(n, t, e) {
                if (e == null || p.query(t, p.Scope.INLINE) != null)
                  d.prototype.insertAt.call(this, n, t, e);
                else {
                  var o = this.split(n), l = p.create(t, e);
                  o.parent.insertBefore(l, o);
                }
              }, u.prototype.update = function(n, t) {
                navigator.userAgent.match(/Trident/) ? this.build() : d.prototype.update.call(this, n, t);
              }, u.blotName = "block", u.scope = p.Scope.BLOCK_BLOT, u.tagName = "P", u;
            }(b.default)
          );
          h.default = f;
        },
        /* 15 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, u) {
              d.__proto__ = u;
            } || function(d, u) {
              for (var n in u)
                u.hasOwnProperty(n) && (d[n] = u[n]);
            };
            return function(d, u) {
              f(d, u);
              function n() {
                this.constructor = d;
              }
              d.prototype = u === null ? Object.create(u) : (n.prototype = u.prototype, new n());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(4), p = (
            /** @class */
            function(f) {
              g(d, f);
              function d() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return d.formats = function(u) {
              }, d.prototype.format = function(u, n) {
                f.prototype.formatAt.call(this, 0, this.length(), u, n);
              }, d.prototype.formatAt = function(u, n, t, e) {
                u === 0 && n === this.length() ? this.format(t, e) : f.prototype.formatAt.call(this, u, n, t, e);
              }, d.prototype.formats = function() {
                return this.statics.formats(this.domNode);
              }, d;
            }(b.default)
          );
          h.default = p;
        },
        /* 16 */
        /***/
        function(_, h, v) {
          var g = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, n) {
              u.__proto__ = n;
            } || function(u, n) {
              for (var t in n)
                n.hasOwnProperty(t) && (u[t] = n[t]);
            };
            return function(u, n) {
              d(u, n);
              function t() {
                this.constructor = u;
              }
              u.prototype = n === null ? Object.create(n) : (t.prototype = n.prototype, new t());
            };
          }();
          Object.defineProperty(h, "__esModule", { value: !0 });
          var b = v(4), p = v(0), f = (
            /** @class */
            function(d) {
              g(u, d);
              function u(n) {
                var t = d.call(this, n) || this;
                return t.text = t.statics.value(t.domNode), t;
              }
              return u.create = function(n) {
                return document.createTextNode(n);
              }, u.value = function(n) {
                var t = n.data;
                return t.normalize && (t = t.normalize()), t;
              }, u.prototype.deleteAt = function(n, t) {
                this.domNode.data = this.text = this.text.slice(0, n) + this.text.slice(n + t);
              }, u.prototype.index = function(n, t) {
                return this.domNode === n ? t : -1;
              }, u.prototype.insertAt = function(n, t, e) {
                e == null ? (this.text = this.text.slice(0, n) + t + this.text.slice(n), this.domNode.data = this.text) : d.prototype.insertAt.call(this, n, t, e);
              }, u.prototype.length = function() {
                return this.text.length;
              }, u.prototype.optimize = function(n) {
                d.prototype.optimize.call(this, n), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof u && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
              }, u.prototype.position = function(n, t) {
                return [this.domNode, n];
              }, u.prototype.split = function(n, t) {
                if (t === void 0 && (t = !1), !t) {
                  if (n === 0)
                    return this;
                  if (n === this.length())
                    return this.next;
                }
                var e = p.create(this.domNode.splitText(n));
                return this.parent.insertBefore(e, this.next), this.text = this.statics.value(this.domNode), e;
              }, u.prototype.update = function(n, t) {
                var e = this;
                n.some(function(o) {
                  return o.type === "characterData" && o.target === e.domNode;
                }) && (this.text = this.statics.value(this.domNode));
              }, u.prototype.value = function() {
                return this.text;
              }, u.blotName = "text", u.scope = p.Scope.INLINE_BLOT, u;
            }(b.default)
          );
          h.default = f;
        }
        /******/
      ])
    );
  });
})(ki);
const Li = Wt.import("formats/image");
class Pi extends Li {
  static formats(I) {
    const _ = {};
    for (const h of I.attributes)
      _[h.name] = h.value;
    return _;
  }
  format(I, _) {
    this.domNode instanceof HTMLImageElement ? this.domNode.setAttribute(I, _) : super.format(I, _);
  }
}
const ji = Wt.import("formats/link");
class Ii extends ji {
  static create(I) {
    const _ = super.create(I);
    if (_ instanceof HTMLElement && _.hasAttribute("target")) {
      const h = _.getAttribute("href");
      if (!h)
        return _;
      new URL(h).hostname === location.hostname && (_.removeAttribute("target"), _.removeAttribute("rel"));
    }
    return _;
  }
}
const { Embed: Ri } = Wt.import("parchment");
Wt.register("formats/image", Pi, !0);
Wt.register("formats/link", Ii, !0);
Wt.register("modules/imageCompressor", Mr);
var We;
Wt.register((We = class extends Ri {
}, Yt(We, "blotName", "ShiftEnter"), Yt(We, "tagName", "br"), We));
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".post-editor").forEach(Mi);
});
function Mi(A) {
  const I = A.querySelector(".post-editor-toolbar"), _ = A.querySelector(".post-editor-content"), h = A.querySelector(".post-editor-textarea");
  if (!I) {
    console.warn("No .editor-toolbar element found in editor container", A);
    return;
  }
  if (!_) {
    console.warn("No .editor-content element found in editor container", A);
    return;
  }
  if (!h) {
    console.warn("No .editor-textarea element found in editor container", A);
    return;
  }
  const v = document.getElementById("delete-post");
  v && v.addEventListener("click", (p) => {
    confirm("Are you sure you want to delete this post?") || p.preventDefault();
  });
  const g = {
    newLineBreak: {
      key: 13,
      shiftKey: !0,
      handler(p) {
        const f = new cr().retain(p.index).delete(p.length).insert({ ShiftEnter: !0 });
        if (b.updateContents(f, "user"), !b.getLeaf(p.index + 1)[0].next) {
          const d = new cr().retain(p.index + 1).delete(0).insert({ ShiftEnter: !0 });
          b.updateContents(d, "user");
        }
        b.setSelection(p.index + 1, Wt.sources.SILENT);
      }
    }
  }, b = new Wt(_, {
    theme: "snow",
    modules: {
      keyboard: { bindings: g },
      toolbar: {
        container: I
      },
      imageCompressor: {
        quality: 0.9,
        imageType: "image/webp"
      }
    }
  });
  b.on("text-change", () => {
    console.log("text change"), h.value = b.root.innerHTML;
  }), qi(b, h), Bi(A, b.root, h), Di(A);
}
function qi(A, I) {
  var h;
  const _ = new Zn();
  (h = A.root.parentElement) == null || h.append(_), _.addEventListener("updated", () => {
    I.value = A.root.innerHTML;
  }), A.root.addEventListener("click", (v) => {
    if (!(v.target instanceof HTMLImageElement)) {
      _.setImage(null);
      return;
    }
    _.setImage(v.target);
  });
}
function Bi(A, I, _) {
  const h = A.querySelector("button.view-source");
  if (!h)
    return;
  const v = Nt("textarea"), g = Nt("dialog", {
    class: "view-source-editor"
  }, Nt("div", {
    class: "view-source-editor-content"
  }, [
    Nt("h3", {}, "Edit HTML"),
    Nt("pre", {}, v),
    Nt("div", {
      class: "view-source-editor-actions"
    }, [
      Nt("button", {
        class: "button",
        type: "button",
        onclick() {
          g.close();
        }
      }, "Close"),
      Nt("button", {
        class: "button",
        type: "button",
        onclick() {
          I.innerHTML = v.value, _.value = v.value, g.close();
        }
      }, "Save")
    ])
  ]));
  document.body.append(g), h.addEventListener("click", (b) => {
    b.preventDefault(), v.value = _.value, g.showModal();
  });
}
function Di(A) {
  const I = A.querySelector("button.fullscreen");
  I && I.addEventListener("click", (_) => {
    _.preventDefault(), A.classList.toggle("fullscreen");
  });
}
