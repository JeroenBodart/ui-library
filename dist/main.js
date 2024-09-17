import './assets/main.css';/**
* @vue/shared v3.5.6
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Dn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const T = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Rn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], te = () => {
}, Tn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), V = Object.assign, Cn = Object.prototype.hasOwnProperty, v = (e, t) => Cn.call(e, t), E = Array.isArray, ne = (e) => Fe(e) === "[object Map]", In = (e) => Fe(e) === "[object Set]", b = (e) => typeof e == "function", P = (e) => typeof e == "string", he = (e) => typeof e == "symbol", S = (e) => e !== null && typeof e == "object", $n = (e) => (S(e) || b(e)) && b(e.then) && b(e.catch), Pn = Object.prototype.toString, Fe = (e) => Pn.call(e), Mt = (e) => Fe(e).slice(8, -1), An = (e) => Fe(e) === "[object Object]", rt = (e) => P(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ht = Ft((e) => e.charAt(0).toUpperCase() + e.slice(1)), Mn = Ft(
  (e) => e ? `on${Ht(e)}` : ""
), G = (e, t) => !Object.is(e, t), Fn = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
};
let Nt;
const jt = () => Nt || (Nt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function st(e) {
  if (E(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = P(r) ? Wn(r) : st(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (P(e) || S(e))
    return e;
}
const Hn = /;(?![^(]*\))/g, jn = /:([^]+)/, Ln = /\/\*[^]*?\*\//g;
function Wn(e) {
  const t = {};
  return e.replace(Ln, "").split(Hn).forEach((n) => {
    if (n) {
      const r = n.split(jn);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function ot(e) {
  let t = "";
  if (P(e))
    t = e;
  else if (E(e))
    for (let n = 0; n < e.length; n++) {
      const r = ot(e[n]);
      r && (t += r + " ");
    }
  else if (S(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.5.6
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function j(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let h;
const Ke = /* @__PURE__ */ new WeakSet();
class Kn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ke.has(this) && (Ke.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Wt(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, yt(this), Kt(this);
    const t = h, n = $;
    h = this, $ = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && h !== this && j(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), zt(this), h = t, $ = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        lt(t);
      this.deps = this.depsTail = void 0, yt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ke.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ge(this) && this.run();
  }
  get dirty() {
    return Ge(this);
  }
}
let Lt = 0, ae;
function Wt(e) {
  e.flags |= 8, e.next = ae, ae = e;
}
function it() {
  Lt++;
}
function ct() {
  if (--Lt > 0)
    return;
  let e;
  for (; ae; ) {
    let t = ae;
    for (ae = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Kt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function zt(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), lt(r), zn(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  e.deps = t, e.depsTail = n;
}
function Ge(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ut(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ut(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === fe))
    return;
  e.globalVersion = fe;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Ge(e)) {
    e.flags &= -3;
    return;
  }
  const n = h, r = $;
  h = e, $ = !0;
  try {
    Kt(e);
    const s = e.fn(e._value);
    (t.version === 0 || G(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    h = n, $ = r, zt(e), e.flags &= -3;
  }
}
function lt(e) {
  const { dep: t, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), t.subs === e && (t.subs = n), !t.subs && t.computed) {
    t.computed.flags &= -5;
    for (let s = t.computed.deps; s; s = s.nextDep)
      lt(s);
  }
}
function zn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let $ = !0;
const Bt = [];
function _e() {
  Bt.push($), $ = !1;
}
function ge() {
  const e = Bt.pop();
  $ = e === void 0 ? !0 : e;
}
function yt(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = h;
    h = void 0;
    try {
      t();
    } finally {
      h = n;
    }
  }
}
let fe = 0;
class Un {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Jt {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!h || !$ || h === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== h)
      n = this.activeLink = new Un(h, this), h.deps ? (n.prevDep = h.depsTail, h.depsTail.nextDep = n, h.depsTail = n) : h.deps = h.depsTail = n, h.flags & 4 && Yt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = h.depsTail, n.nextDep = void 0, h.depsTail.nextDep = n, h.depsTail = n, h.deps === n && (h.deps = r);
    }
    return process.env.NODE_ENV !== "production" && h.onTrack && h.onTrack(
      V(
        {
          effect: h
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, fe++, this.notify(t);
  }
  notify(t) {
    it();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            V(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ct();
    }
  }
}
function Yt(e) {
  const t = e.dep.computed;
  if (t && !e.dep.subs) {
    t.flags |= 20;
    for (let r = t.deps; r; r = r.nextDep)
      Yt(r);
  }
  const n = e.dep.subs;
  n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
}
const Xe = /* @__PURE__ */ new WeakMap(), Y = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Qe = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), pe = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function w(e, t, n) {
  if ($ && h) {
    let r = Xe.get(e);
    r || Xe.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = new Jt()), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function z(e, t, n, r, s, o) {
  const i = Xe.get(e);
  if (!i) {
    fe++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: r,
      oldValue: s,
      oldTarget: o
    }) : a.trigger());
  };
  if (it(), t === "clear")
    i.forEach(c);
  else {
    const a = E(e), f = a && rt(n);
    if (a && n === "length") {
      const _ = Number(r);
      i.forEach((l, u) => {
        (u === "length" || u === pe || !he(u) && u >= _) && c(l);
      });
    } else
      switch (n !== void 0 && c(i.get(n)), f && c(i.get(pe)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(Y)), ne(e) && c(i.get(Qe)));
          break;
        case "delete":
          a || (c(i.get(Y)), ne(e) && c(i.get(Qe)));
          break;
        case "set":
          ne(e) && c(i.get(Y));
          break;
      }
  }
  ct();
}
function Z(e) {
  const t = p(e);
  return t === e ? t : (w(t, "iterate", pe), R(e) ? t : t.map(D));
}
function at(e) {
  return w(e = p(e), "iterate", pe), e;
}
const Bn = {
  __proto__: null,
  [Symbol.iterator]() {
    return ze(this, Symbol.iterator, D);
  },
  concat(...e) {
    return Z(this).concat(
      ...e.map((t) => E(t) ? Z(t) : t)
    );
  },
  entries() {
    return ze(this, "entries", (e) => (e[1] = D(e[1]), e));
  },
  every(e, t) {
    return F(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return F(this, "filter", e, t, (n) => n.map(D), arguments);
  },
  find(e, t) {
    return F(this, "find", e, t, D, arguments);
  },
  findIndex(e, t) {
    return F(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return F(this, "findLast", e, t, D, arguments);
  },
  findLastIndex(e, t) {
    return F(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return F(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ue(this, "includes", e);
  },
  indexOf(...e) {
    return Ue(this, "indexOf", e);
  },
  join(e) {
    return Z(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Ue(this, "lastIndexOf", e);
  },
  map(e, t) {
    return F(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ce(this, "pop");
  },
  push(...e) {
    return ce(this, "push", e);
  },
  reduce(e, ...t) {
    return Ot(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ot(this, "reduceRight", e, t);
  },
  shift() {
    return ce(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return F(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ce(this, "splice", e);
  },
  toReversed() {
    return Z(this).toReversed();
  },
  toSorted(e) {
    return Z(this).toSorted(e);
  },
  toSpliced(...e) {
    return Z(this).toSpliced(...e);
  },
  unshift(...e) {
    return ce(this, "unshift", e);
  },
  values() {
    return ze(this, "values", D);
  }
};
function ze(e, t, n) {
  const r = at(e), s = r[t]();
  return r !== e && !R(e) && (s._next = s.next, s.next = () => {
    const o = s._next();
    return o.value && (o.value = n(o.value)), o;
  }), s;
}
const Jn = Array.prototype;
function F(e, t, n, r, s, o) {
  const i = at(e), c = i !== e && !R(e), a = i[t];
  if (a !== Jn[t]) {
    const l = a.apply(e, o);
    return c ? D(l) : l;
  }
  let f = n;
  i !== e && (c ? f = function(l, u) {
    return n.call(this, D(l), u, e);
  } : n.length > 2 && (f = function(l, u) {
    return n.call(this, l, u, e);
  }));
  const _ = a.call(i, f, r);
  return c && s ? s(_) : _;
}
function Ot(e, t, n, r) {
  const s = at(e);
  let o = n;
  return s !== e && (R(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, D(c), a, e);
  }), s[t](o, ...r);
}
function Ue(e, t, n) {
  const r = p(e);
  w(r, "iterate", pe);
  const s = r[t](...n);
  return (s === -1 || s === !1) && Re(n[0]) ? (n[0] = p(n[0]), r[t](...n)) : s;
}
function ce(e, t, n = []) {
  _e(), it();
  const r = p(e)[t].apply(e, n);
  return ct(), ge(), r;
}
const Yn = /* @__PURE__ */ Dn("__proto__,__v_isRef,__isVue"), qt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(he)
);
function qn(e) {
  he(e) || (e = String(e));
  const t = p(this);
  return w(t, "has", e), t.hasOwnProperty(e);
}
class Gt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (s ? o ? en : kt : o ? cr : Zt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = E(t);
    if (!s) {
      let a;
      if (i && (a = Bn[n]))
        return a;
      if (n === "hasOwnProperty")
        return qn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      x(t) ? t : r
    );
    return (he(n) ? qt.has(n) : Yn(n)) || (s || w(t, "get", n), o) ? c : x(c) ? i && rt(n) ? c : c.value : S(c) ? s ? nn(c) : tn(c) : c;
  }
}
class Gn extends Gt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const a = U(o);
      if (!R(r) && !U(r) && (o = p(o), r = p(r)), !E(t) && x(o) && !x(r))
        return a ? !1 : (o.value = r, !0);
    }
    const i = E(t) && rt(n) ? Number(n) < t.length : v(t, n), c = Reflect.set(
      t,
      n,
      r,
      x(t) ? t : s
    );
    return t === p(s) && (i ? G(r, o) && z(t, "set", n, r, o) : z(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = v(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && z(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!he(n) || !qt.has(n)) && w(t, "has", n), r;
  }
  ownKeys(t) {
    return w(
      t,
      "iterate",
      E(t) ? "length" : Y
    ), Reflect.ownKeys(t);
  }
}
class Xt extends Gt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && j(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && j(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Xn = /* @__PURE__ */ new Gn(), Qn = /* @__PURE__ */ new Xt(), Zn = /* @__PURE__ */ new Xt(!0), ut = (e) => e, He = (e) => Reflect.getPrototypeOf(e);
function ve(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (G(t, o) && w(s, "get", t), w(s, "get", o));
  const { has: i } = He(s), c = r ? ut : n ? dt : D;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function be(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (G(e, s) && w(r, "has", e), w(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function we(e, t = !1) {
  return e = e.__v_raw, !t && w(p(e), "iterate", Y), Reflect.get(e, "size", e);
}
function St(e, t = !1) {
  !t && !R(e) && !U(e) && (e = p(e));
  const n = p(this);
  return He(n).has.call(n, e) || (n.add(e), z(n, "add", e, e)), this;
}
function xt(e, t, n = !1) {
  !n && !R(t) && !U(t) && (t = p(t));
  const r = p(this), { has: s, get: o } = He(r);
  let i = s.call(r, e);
  i ? process.env.NODE_ENV !== "production" && Qt(r, s, e) : (e = p(e), i = s.call(r, e));
  const c = o.call(r, e);
  return r.set(e, t), i ? G(t, c) && z(r, "set", e, t, c) : z(r, "add", e, t), this;
}
function Vt(e) {
  const t = p(this), { has: n, get: r } = He(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Qt(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && z(t, "delete", e, void 0, o), i;
}
function Dt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? ne(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && z(e, "clear", void 0, void 0, n), r;
}
function Ne(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = p(i), a = t ? ut : e ? dt : D;
    return !e && w(c, "iterate", Y), i.forEach((f, _) => r.call(s, a(f), a(_), o));
  };
}
function ye(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = ne(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = s[e](...r), _ = n ? ut : t ? dt : D;
    return !t && w(
      o,
      "iterate",
      a ? Qe : Y
    ), {
      // iterator protocol
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [_(l[0]), _(l[1])] : _(l),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function L(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      j(
        `${Ht(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function kn() {
  const e = {
    get(o) {
      return ve(this, o);
    },
    get size() {
      return we(this);
    },
    has: be,
    add: St,
    set: xt,
    delete: Vt,
    clear: Dt,
    forEach: Ne(!1, !1)
  }, t = {
    get(o) {
      return ve(this, o, !1, !0);
    },
    get size() {
      return we(this);
    },
    has: be,
    add(o) {
      return St.call(this, o, !0);
    },
    set(o, i) {
      return xt.call(this, o, i, !0);
    },
    delete: Vt,
    clear: Dt,
    forEach: Ne(!1, !0)
  }, n = {
    get(o) {
      return ve(this, o, !0);
    },
    get size() {
      return we(this, !0);
    },
    has(o) {
      return be.call(this, o, !0);
    },
    add: L("add"),
    set: L("set"),
    delete: L("delete"),
    clear: L("clear"),
    forEach: Ne(!0, !1)
  }, r = {
    get(o) {
      return ve(this, o, !0, !0);
    },
    get size() {
      return we(this, !0);
    },
    has(o) {
      return be.call(this, o, !0);
    },
    add: L("add"),
    set: L("set"),
    delete: L("delete"),
    clear: L("clear"),
    forEach: Ne(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = ye(o, !1, !1), n[o] = ye(o, !0, !1), t[o] = ye(o, !1, !0), r[o] = ye(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  er,
  tr,
  nr,
  rr
] = /* @__PURE__ */ kn();
function ft(e, t) {
  const n = t ? e ? rr : nr : e ? tr : er;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    v(n, s) && s in r ? n : r,
    s,
    o
  );
}
const sr = {
  get: /* @__PURE__ */ ft(!1, !1)
}, or = {
  get: /* @__PURE__ */ ft(!0, !1)
}, ir = {
  get: /* @__PURE__ */ ft(!0, !0)
};
function Qt(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = Mt(e);
    j(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Zt = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap();
function lr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ar(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : lr(Mt(e));
}
function tn(e) {
  return U(e) ? e : pt(
    e,
    !1,
    Xn,
    sr,
    Zt
  );
}
function nn(e) {
  return pt(
    e,
    !0,
    Qn,
    or,
    kt
  );
}
function Oe(e) {
  return pt(
    e,
    !0,
    Zn,
    ir,
    en
  );
}
function pt(e, t, n, r, s) {
  if (!S(e))
    return process.env.NODE_ENV !== "production" && j(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = ar(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, c), c;
}
function re(e) {
  return U(e) ? re(e.__v_raw) : !!(e && e.__v_isReactive);
}
function U(e) {
  return !!(e && e.__v_isReadonly);
}
function R(e) {
  return !!(e && e.__v_isShallow);
}
function Re(e) {
  return e ? !!e.__v_raw : !1;
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function ur(e) {
  return !v(e, "__v_skip") && Object.isExtensible(e) && Fn(e, "__v_skip", !0), e;
}
const D = (e) => S(e) ? tn(e) : e, dt = (e) => S(e) ? nn(e) : e;
function x(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function fr(e) {
  return x(e) ? e.value : e;
}
const pr = {
  get: (e, t, n) => t === "__v_raw" ? e : fr(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return x(s) && !x(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function dr(e) {
  return re(e) ? e : new Proxy(e, pr);
}
class hr {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Jt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = fe - 1, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    h !== this)
      return Wt(this), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Ut(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && j("Write operation failed: computed value is readonly");
  }
}
function _r(e, t, n = !1) {
  let r, s;
  b(e) ? r = e : (r = e.get, s = e.set);
  const o = new hr(r, s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (o.onTrack = t.onTrack, o.onTrigger = t.onTrigger), o;
}
const Se = {}, Te = /* @__PURE__ */ new WeakMap();
let J;
function gr(e, t = !1, n = J) {
  if (n) {
    let r = Te.get(n);
    r || Te.set(n, r = []), r.push(e);
  } else process.env.NODE_ENV !== "production" && !t && j(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function mr(e, t, n = T) {
  const { immediate: r, deep: s, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (d) => {
    (n.onWarn || j)(
      "Invalid watch source: ",
      d,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, _ = (d) => s ? d : R(d) || s === !1 || s === 0 ? K(d, 1) : K(d);
  let l, u, g, N, A = !1, me = !1;
  if (x(e) ? (u = () => e.value, A = R(e)) : re(e) ? (u = () => _(e), A = !0) : E(e) ? (me = !0, A = e.some((d) => re(d) || R(d)), u = () => e.map((d) => {
    if (x(d))
      return d.value;
    if (re(d))
      return _(d);
    if (b(d))
      return a ? a(d, 2) : d();
    process.env.NODE_ENV !== "production" && f(d);
  })) : b(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (g) {
      _e();
      try {
        g();
      } finally {
        ge();
      }
    }
    const d = J;
    J = l;
    try {
      return a ? a(e, 3, [N]) : e(N);
    } finally {
      J = d;
    }
  } : (u = te, process.env.NODE_ENV !== "production" && f(e)), t && s) {
    const d = u, M = s === !0 ? 1 / 0 : s;
    u = () => K(d(), M);
  }
  const Q = () => {
    l.stop();
  };
  if (o && t) {
    const d = t;
    t = (...M) => {
      d(...M), Q();
    };
  }
  let B = me ? new Array(e.length).fill(Se) : Se;
  const ie = (d) => {
    if (!(!(l.flags & 1) || !l.dirty && !d))
      if (t) {
        const M = l.run();
        if (s || A || (me ? M.some((We, Ee) => G(We, B[Ee])) : G(M, B))) {
          g && g();
          const We = J;
          J = l;
          try {
            const Ee = [
              M,
              // pass undefined as the old value when it's changed for the first time
              B === Se ? void 0 : me && B[0] === Se ? [] : B,
              N
            ];
            a ? a(t, 3, Ee) : (
              // @ts-expect-error
              t(...Ee)
            ), B = M;
          } finally {
            J = We;
          }
        }
      } else
        l.run();
  };
  return c && c(ie), l = new Kn(u), l.scheduler = i ? () => i(ie, !1) : ie, N = (d) => gr(d, !1, l), g = l.onStop = () => {
    const d = Te.get(l);
    if (d) {
      if (a)
        a(d, 4);
      else
        for (const M of d) M();
      Te.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? r ? ie(!0) : B = l.run() : i ? i(ie.bind(null, !0), !0) : l.run(), Q.pause = l.pause.bind(l), Q.resume = l.resume.bind(l), Q.stop = Q, Q;
}
function K(e, t = 1 / 0, n) {
  if (t <= 0 || !S(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    K(e.value, t, n);
  else if (E(e))
    for (let r = 0; r < e.length; r++)
      K(e[r], t, n);
  else if (In(e) || ne(e))
    e.forEach((r) => {
      K(r, t, n);
    });
  else if (An(e)) {
    for (const r in e)
      K(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && K(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.6
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const q = [];
function Er(e) {
  q.push(e);
}
function vr() {
  q.pop();
}
let Be = !1;
function m(e, ...t) {
  if (Be) return;
  Be = !0, _e();
  const n = q.length ? q[q.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = br();
  if (r)
    je(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${Sn(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...wr(s)), console.warn(...o);
  }
  ge(), Be = !1;
}
function br() {
  let e = q[q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function wr(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Nr(n));
  }), t;
}
function Nr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Sn(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...yr(e.props), o] : [s + o];
}
function yr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...rn(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function rn(e, t, n) {
  return P(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = rn(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : b(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const ht = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function je(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    gt(s, t, n);
  }
}
function _t(e, t, n, r) {
  if (b(e)) {
    const s = je(e, t, n, r);
    return s && $n(s) && s.catch((o) => {
      gt(o, t, n);
    }), s;
  }
  if (E(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++)
      s.push(_t(e[o], t, n, r));
    return s;
  } else process.env.NODE_ENV !== "production" && m(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function gt(e, t, n, r = !0) {
  const s = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || T;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? ht[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const _ = c.ec;
      if (_) {
        for (let l = 0; l < _.length; l++)
          if (_[l](e, a, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      _e(), je(o, null, 10, [
        e,
        a,
        f
      ]), ge();
      return;
    }
  }
  Or(e, n, s, r, i);
}
function Or(e, t, n, r = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = ht[t];
    if (n && Er(n), m(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && vr(), r)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
let Ce = !1, Ze = !1;
const C = [];
let H = 0;
const se = [];
let W = null, k = 0;
const sn = /* @__PURE__ */ Promise.resolve();
let mt = null;
const Sr = 100;
function xr(e) {
  const t = mt || sn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Vr(e) {
  let t = Ce ? H + 1 : 0, n = C.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = C[r], o = de(s);
    o < e || o === e && s.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Et(e) {
  if (!(e.flags & 1)) {
    const t = de(e), n = C[C.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= de(n) ? C.push(e) : C.splice(Vr(t), 0, e), e.flags |= 1, on();
  }
}
function on() {
  !Ce && !Ze && (Ze = !0, mt = sn.then(ln));
}
function cn(e) {
  E(e) ? se.push(...e) : W && e.id === -1 ? W.splice(k + 1, 0, e) : e.flags & 1 || (se.push(e), e.flags |= 1), on();
}
function Dr(e) {
  if (se.length) {
    const t = [...new Set(se)].sort(
      (n, r) => de(n) - de(r)
    );
    if (se.length = 0, W) {
      W.push(...t);
      return;
    }
    for (W = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), k = 0; k < W.length; k++) {
      const n = W[k];
      process.env.NODE_ENV !== "production" && an(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    W = null, k = 0;
  }
}
const de = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ln(e) {
  Ze = !1, Ce = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => an(e, n) : te;
  try {
    for (H = 0; H < C.length; H++) {
      const n = C[H];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), je(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags &= -2;
      }
    }
  } finally {
    for (; H < C.length; H++) {
      const n = C[H];
      n && (n.flags &= -2);
    }
    H = 0, C.length = 0, Dr(e), Ce = !1, mt = null, (C.length || se.length) && ln(e);
  }
}
function an(e, t) {
  const n = e.get(t) || 0;
  if (n > Sr) {
    const r = t.i, s = r && On(r.type);
    return gt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Je = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (jt().__VUE_HMR_RUNTIME__ = {
  createRecord: Ye(Rr),
  rerender: Ye(Tr),
  reload: Ye(Cr)
});
const Ie = /* @__PURE__ */ new Map();
function Rr(e, t) {
  return Ie.has(e) ? !1 : (Ie.set(e, {
    initialDef: $e(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function $e(e) {
  return xn(e) ? e.__vccOpts : e;
}
function Tr(e, t) {
  const n = Ie.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, $e(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function Cr(e, t) {
  const n = Ie.get(e);
  if (!n) return;
  t = $e(t), Rt(n.initialDef, t);
  const r = [...n.instances];
  for (let s = 0; s < r.length; s++) {
    const o = r[s], i = $e(o.type);
    let c = Je.get(i);
    c || (i !== n.initialDef && Rt(i, t), Je.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? Et(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  cn(() => {
    Je.clear();
  });
}
function Rt(e, t) {
  V(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ye(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ee, xe = [];
function un(e, t) {
  var n, r;
  ee = e, ee ? (ee.enabled = !0, xe.forEach(({ event: s, args: o }) => ee.emit(s, ...o)), xe = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    un(o, t);
  }), setTimeout(() => {
    ee || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, xe = []);
  }, 3e3)) : xe = [];
}
let O = null, Ir = null;
const $r = (e) => e.__isTeleport;
function fn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, fn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
  return b(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    V({ name: e.name }, t, { setup: e })
  ) : e;
}
const Ar = (e) => !!e.type.__asyncLoader;
function Mr(e, t, n = X, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      _e();
      const c = yn(n), a = _t(t, n, e, i);
      return c(), ge(), a;
    });
    return r ? s.unshift(o) : s.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const s = Mn(ht[e].replace(/ hook$/, ""));
    m(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const vt = (e) => (t, n = X) => {
  (!Le || e === "sp") && Mr(e, (...r) => t(...r), n);
}, Fr = vt("bm"), Hr = vt("m"), jr = vt("um"), Lr = Symbol.for("v-ndc");
function Wr(e, t, n = {}, r, s) {
  if (O.ce || O.parent && Ar(O.parent) && O.parent.ce)
    return et(), Pt(
      oe,
      null,
      [bt("slot", n, r)],
      64
    );
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (m(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), et();
  const i = o && pn(o(n)), c = Pt(
    oe,
    {
      key: (n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && r ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function pn(e) {
  return e.some((t) => mn(t) ? !(t.type === _n || t.type === oe && !pn(t.children)) : !0) ? e : null;
}
const ke = (e) => e ? ds(e) ? hs(e) : ke(e.parent) : null, ue = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ V(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Oe(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Oe(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Oe(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Oe(e.refs) : e.refs,
    $parent: (e) => ke(e.parent),
    $root: (e) => ke(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ur(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Et(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = xr.bind(e.proxy)),
    $watch: (e) => ts.bind(e)
  })
), Kr = (e) => e === "_" || e === "$", qe = (e, t) => e !== T && !e.__isScriptSetup && v(e, t), zr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const g = i[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (qe(r, t))
          return i[t] = 1, r[t];
        if (s !== T && v(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && v(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== T && v(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const _ = ue[t];
    let l, u;
    if (_)
      return t === "$attrs" ? (w(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && w(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== T && v(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, v(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && O && (!P(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== T && Kr(t[0]) && v(s, t) ? m(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === O && m(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return qe(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && v(s, t) ? (m(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== T && v(r, t) ? (r[t] = n, !0) : v(e.props, t) ? (process.env.NODE_ENV !== "production" && m(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && m(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== T && v(e, i) || qe(t, i) || (c = o[0]) && v(c, i) || v(r, i) || v(ue, i) || v(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : v(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (zr.ownKeys = (e) => (m(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Tt(e) {
  return E(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Ur(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(
    (f) => Pe(a, f, i, !0)
  ), Pe(a, t, i)), S(t) && o.set(t, a), a;
}
function Pe(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Pe(e, o, n, !0), s && s.forEach(
    (i) => Pe(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && m(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Br[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Br = {
  data: Ct,
  props: $t,
  emits: $t,
  // objects
  methods: le,
  computed: le,
  // lifecycle
  beforeCreate: y,
  created: y,
  beforeMount: y,
  mounted: y,
  beforeUpdate: y,
  updated: y,
  beforeDestroy: y,
  beforeUnmount: y,
  destroyed: y,
  unmounted: y,
  activated: y,
  deactivated: y,
  errorCaptured: y,
  serverPrefetch: y,
  // assets
  components: le,
  directives: le,
  // watch
  watch: Yr,
  // provide / inject
  provide: Ct,
  inject: Jr
};
function Ct(e, t) {
  return t ? e ? function() {
    return V(
      b(e) ? e.call(this, this) : e,
      b(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Jr(e, t) {
  return le(It(e), It(t));
}
function It(e) {
  if (E(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function y(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function le(e, t) {
  return e ? V(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function $t(e, t) {
  return e ? E(e) && E(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : V(
    /* @__PURE__ */ Object.create(null),
    Tt(e),
    Tt(t ?? {})
  ) : t;
}
function Yr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = V(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = y(e[r], t[r]);
  return n;
}
let qr = null;
function Gr(e, t, n = !1) {
  const r = X || O;
  if (r || qr) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && b(t) ? t.call(r && r.proxy) : t;
    process.env.NODE_ENV !== "production" && m(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && m("inject() can only be used inside setup() or functional components.");
}
const Xr = {}, dn = (e) => Object.getPrototypeOf(e) === Xr, Qr = ss, Zr = Symbol.for("v-scx"), kr = () => {
  {
    const e = Gr(Zr);
    return e || process.env.NODE_ENV !== "production" && m(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function es(e, t) {
  return hn(
    e,
    null,
    process.env.NODE_ENV !== "production" ? V({}, t, { flush: "post" }) : { flush: "post" }
  );
}
function hn(e, t, n = T) {
  const { immediate: r, deep: s, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (r !== void 0 && m(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && m(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && m(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = V({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = m);
  let a;
  if (Le)
    if (o === "sync") {
      const u = kr();
      a = u.__watcherHandles || (u.__watcherHandles = []);
    } else if (!t || r)
      c.once = !0;
    else {
      const u = () => {
      };
      return u.stop = te, u.resume = te, u.pause = te, u;
    }
  const f = X;
  c.call = (u, g, N) => _t(u, f, g, N);
  let _ = !1;
  o === "post" ? c.scheduler = (u) => {
    Qr(u, f && f.suspense);
  } : o !== "sync" && (_ = !0, c.scheduler = (u, g) => {
    g ? u() : Et(u);
  }), c.augmentJob = (u) => {
    t && (u.flags |= 4), _ && (u.flags |= 2, f && (u.id = f.uid, u.i = f));
  };
  const l = mr(e, t, c);
  return a && a.push(l), l;
}
function ts(e, t, n) {
  const r = this.proxy, s = P(e) ? e.includes(".") ? ns(r, e) : () => r[e] : e.bind(r, r);
  let o;
  b(t) ? o = t : (o = t.handler, n = t);
  const i = yn(this), c = hn(s, o.bind(r), n);
  return i(), c;
}
function ns(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
const rs = (e) => e.__isSuspense;
function ss(e, t) {
  t && t.pendingBranch ? E(e) ? t.effects.push(...e) : t.effects.push(e) : cn(e);
}
const oe = Symbol.for("v-fgt"), os = Symbol.for("v-txt"), _n = Symbol.for("v-cmt"), is = Symbol.for("v-stc"), Ve = [];
let I = null;
function et(e = !1) {
  Ve.push(I = e ? null : []);
}
function cs() {
  Ve.pop(), I = Ve[Ve.length - 1] || null;
}
function gn(e) {
  return e.dynamicChildren = I || Rn, cs(), I && I.push(e), e;
}
function ls(e, t, n, r, s, o) {
  return gn(
    vn(
      e,
      t,
      n,
      r,
      s,
      o,
      !0
    )
  );
}
function Pt(e, t, n, r, s) {
  return gn(
    bt(
      e,
      t,
      n,
      r,
      s,
      !0
    )
  );
}
function mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const as = (...e) => bn(
  ...e
), En = ({ key: e }) => e ?? null, De = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? P(e) || x(e) || b(e) ? { i: O, r: e, k: t, f: !!n } : e : null);
function vn(e, t = null, n = null, r = 0, s = null, o = e === oe ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && En(t),
    ref: t && De(t),
    scopeId: Ir,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: O
  };
  return c ? (wt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= P(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && m("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  I && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && I.push(a), a;
}
const bt = process.env.NODE_ENV !== "production" ? as : bn;
function bn(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === Lr) && (process.env.NODE_ENV !== "production" && !e && m(`Invalid vnode type when creating vnode: ${e}.`), e = _n), mn(e)) {
    const c = Ae(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && wt(c, n), !o && I && (c.shapeFlag & 6 ? I[I.indexOf(e)] = c : I.push(c)), c.patchFlag = -2, c;
  }
  if (xn(e) && (e = e.__vccOpts), t) {
    t = us(t);
    let { class: c, style: a } = t;
    c && !P(c) && (t.class = ot(c)), S(a) && (Re(a) && !E(a) && (a = V({}, a)), t.style = st(a));
  }
  const i = P(e) ? 1 : rs(e) ? 128 : $r(e) ? 64 : S(e) ? 4 : b(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Re(e) && (e = p(e), m(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), vn(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function us(e) {
  return e ? Re(e) || dn(e) ? V({}, e) : e : null;
}
function Ae(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? ps(s || {}, t) : s, _ = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && En(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? E(o) ? o.concat(De(t)) : [o, De(t)] : De(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && E(c) ? c.map(wn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== oe ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ae(e.ssContent),
    ssFallback: e.ssFallback && Ae(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && fn(
    _,
    a.clone(_)
  ), _;
}
function wn(e) {
  const t = Ae(e);
  return E(e.children) && (t.children = e.children.map(wn)), t;
}
function fs(e = " ", t = 0) {
  return bt(os, null, e, t);
}
function wt(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (E(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), wt(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !dn(t) ? t._ctx = O : s === 3 && O && (O.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else b(t) ? (t = { default: t, _ctx: O }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [fs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ps(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = ot([t.class, r.class]));
      else if (s === "style")
        t.style = st([t.style, r.style]);
      else if (Tn(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(E(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
let X = null;
const Nn = () => X || O;
let tt;
{
  const e = jt(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
      s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
    };
  };
  tt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => X = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Le = n
  );
}
const yn = (e) => {
  const t = X;
  return tt(e), e.scope.on(), () => {
    e.scope.off(), tt(t);
  };
};
function ds(e) {
  return e.vnode.shapeFlag & 4;
}
let Le = !1;
process.env.NODE_ENV;
function hs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(dr(ur(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ue)
        return ue[n](e);
    },
    has(t, n) {
      return n in t || n in ue;
    }
  })) : e.proxy;
}
const _s = /(?:^|[-_])(\w)/g, gs = (e) => e.replace(_s, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function On(e, t = !0) {
  return b(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Sn(e, t, n = !1) {
  let r = On(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? gs(r) : n ? "App" : "Anonymous";
}
function xn(e) {
  return b(e) && "__vccOpts" in e;
}
const ms = (e, t) => {
  const n = _r(e, t, Le);
  if (process.env.NODE_ENV !== "production") {
    const r = Nn();
    r && r.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Es() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(l) {
      return S(l) ? l.__isVue ? ["div", e, "VueInstance"] : x(l) ? [
        "div",
        {},
        ["span", e, _(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : re(l) ? [
        "div",
        {},
        ["span", e, R(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${U(l) ? " (readonly)" : ""}`
      ] : U(l) ? [
        "div",
        {},
        ["span", e, R(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", p(l.props))), l.setupState !== T && u.push(i("setup", l.setupState)), l.data !== T && u.push(i("data", p(l.data)));
    const g = a(l, "computed");
    g && u.push(i("computed", g));
    const N = a(l, "inject");
    return N && u.push(i("injected", N)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = V({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((g) => [
          "div",
          {},
          ["span", r, g + ": "],
          c(u[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : S(l) ? ["object", { object: u ? p(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const g = l.type;
    if (b(g))
      return;
    const N = {};
    for (const A in l.ctx)
      f(g, A, u) && (N[A] = l.ctx[A]);
    return N;
  }
  function f(l, u, g) {
    const N = l[g];
    if (E(N) && N.includes(u) || S(N) && u in N || l.extends && f(l.extends, u, g) || l.mixins && l.mixins.some((A) => f(A, u, g)))
      return !0;
  }
  function _(l) {
    return R(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const Vn = process.env.NODE_ENV !== "production" ? m : te;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.6
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let vs;
const At = typeof window < "u" && window.trustedTypes;
if (At)
  try {
    vs = /* @__PURE__ */ At.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Vn(`Error creating trusted types policy: ${e}`);
  }
process.env.NODE_ENV;
const bs = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function ws(e) {
  const t = Nn();
  if (!t) {
    process.env.NODE_ENV !== "production" && Vn("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (s = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((o) => Me(o, s));
  };
  process.env.NODE_ENV !== "production" && (t.getCssVars = () => e(t.proxy));
  const r = () => {
    const s = e(t.proxy);
    t.ce ? Me(t.ce, s) : nt(t.subTree, s), n(s);
  };
  Fr(() => {
    es(r);
  }), Hr(() => {
    const s = new MutationObserver(r);
    s.observe(t.subTree.el.parentNode, { childList: !0 }), jr(() => s.disconnect());
  });
}
function nt(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      nt(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Me(e.el, t);
  else if (e.type === oe)
    e.children.forEach((n) => nt(n, t));
  else if (e.type === is) {
    let { el: n, anchor: r } = e;
    for (; n && (Me(n, t), n !== r); )
      n = n.nextSibling;
  }
}
function Me(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let r = "";
    for (const s in t)
      n.setProperty(`--${s}`, t[s]), r += `--${s}: ${t[s]};`;
    n[bs] = r;
  }
}
/**
* vue v3.5.6
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ns() {
  Es();
}
process.env.NODE_ENV !== "production" && Ns();
const ys = { id: "appButton" }, Os = /* @__PURE__ */ Pr({
  __name: "AppButton",
  props: {
    size: { default: 16 },
    color: { default: "skyblue" }
  },
  setup(e) {
    ws((r) => ({
      "98e5bef4": r.color,
      "613a0e26": n.value
    }));
    const t = e, n = ms(() => `${t.size}px`);
    return (r, s) => (et(), ls("button", ys, [
      Wr(r.$slots, "default")
    ]));
  }
});
function Ss(e) {
  return `Hello ${e}!`;
}
export {
  Os as Button,
  Ss as helloAnything
};
