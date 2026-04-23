document.addEventListener("DOMContentLoaded", () => {
  a(), i(), r();
});
function a() {
  const e = document.querySelector(".admin-navigation"), t = e == null ? void 0 : e.querySelector(".nav-toggle");
  !e || !t || t.addEventListener("click", () => {
    e.classList.toggle("nav-open");
  });
}
function i() {
  document.querySelectorAll(".input-field.password").forEach(c);
}
function c(e) {
  const t = e.querySelector("input"), n = e.querySelector(".show-password");
  if (!t || !n)
    return;
  let s = !1;
  n.addEventListener("click", function() {
    s ? (t.type = "password", n.classList.remove("active")) : (t.type = "text", n.classList.add("active")), s = !s;
  });
}
function r() {
  const e = {};
  let t = "";
  const n = {
    ace: "Ace is cleaner than Mr. Clean",
    sar: "Mama Sarah is the coolest"
  };
  window.addEventListener("keyup", function(s) {
    const o = s.key.toLowerCase();
    delete e[o], e.shift && e.p && t.length < 3 ? (o !== "p" && o.length === 1 && (t += o), t.length === 3 && n[t] && alert(n[t])) : t.length && (t = "");
  }), window.addEventListener("keydown", function(s) {
    const o = s.key.toLowerCase();
    e[o] = !0;
  });
}
