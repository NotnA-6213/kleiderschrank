/*
  Mini-Laufzeit für die Design-Entwürfe.
  Sie macht die Screen-Dateien im Browser lauffähig (Platzhalter {{…}},
  Schleifen <sc-for>, Bedingungen <sc-if>, Klick-Handler).
  Nur für die Entwürfe gedacht – die echte App braucht diese Datei nicht.
*/
(function () {
  window.DCLogic = class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      const p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
      this.state = Object.assign({}, this.state, p);
      if (this.__render) this.__render();
    }
    forceUpdate() { if (this.__render) this.__render(); }
  };

  const WHOLE = /^\s*\{\{([^}]+)\}\}\s*$/;
  const ANY = /\{\{([^}]+)\}\}/g;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    let v = scope;
    for (const k of path.split('.')) { if (v == null) return undefined; v = v[k]; }
    return v;
  }

  function interp(str, scope) {
    return str.replace(ANY, (_, p) => { const v = lookup(p, scope); return v == null ? '' : String(v); });
  }

  function renderNodes(nodes, scope, out) { for (const n of Array.from(nodes)) renderNode(n, scope, out); }

  function renderNode(n, scope, out) {
    if (n.nodeType === 3) { out.appendChild(document.createTextNode(interp(n.nodeValue, scope))); return; }
    if (n.nodeType !== 1) return;
    const tag = n.localName;
    if (tag === 'helmet') return;
    if (tag === 'sc-for') {
      const m = (n.getAttribute('list') || '').match(WHOLE);
      const list = m ? lookup(m[1], scope) : [];
      const as = n.getAttribute('as') || 'item';
      (list || []).forEach((item, i) => {
        const s = Object.create(scope);
        s[as] = item; s.$index = i;
        renderNodes(n.childNodes, s, out);
      });
      return;
    }
    if (tag === 'sc-if') {
      const m = (n.getAttribute('value') || '').match(WHOLE);
      if (m && lookup(m[1], scope)) renderNodes(n.childNodes, scope, out);
      return;
    }
    const el = n.namespaceURI === SVG_NS ? document.createElementNS(SVG_NS, n.tagName) : document.createElement(tag);
    for (const a of Array.from(n.attributes)) {
      if (a.name.startsWith('hint-')) continue;
      const m = a.value.match(WHOLE);
      if (a.name.startsWith('on') && m) {
        const fn = lookup(m[1], scope);
        if (typeof fn === 'function') el.addEventListener(a.name.slice(2).toLowerCase(), fn);
        continue;
      }
      el.setAttribute(a.name, interp(a.value, scope));
    }
    renderNodes(n.childNodes, scope, el);
    out.appendChild(el);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const host = document.querySelector('x-dc');
    const script = document.querySelector('script[data-dc-script]');
    if (!host || !script) return;
    host.style.display = 'block';

    const tpl = document.createElement('template');
    tpl.innerHTML = host.innerHTML;
    host.innerHTML = '';

    const helmet = tpl.content.querySelector('helmet');
    if (helmet) for (const c of Array.from(helmet.children)) document.head.appendChild(document.importNode(c, true));

    let meta = {};
    try { meta = JSON.parse(script.getAttribute('data-props') || '{}'); } catch (e) { meta = {}; }
    const props = {};
    for (const k in meta) if (k[0] !== '$' && meta[k] && 'default' in meta[k]) props[k] = meta[k].default;
    new URLSearchParams(location.search).forEach((v, k) => { props[k] = isNaN(+v) ? v : +v; });

    const Component = new Function('DCLogic', script.textContent + '\nreturn Component;')(window.DCLogic);
    const inst = new Component(props);
    if (!inst.state) inst.state = {};
    inst.__render = () => {
      const frag = document.createDocumentFragment();
      renderNodes(tpl.content.childNodes, inst.renderVals() || {}, frag);
      host.replaceChildren(frag);
    };
    inst.__render();
    if (inst.componentDidMount) inst.componentDidMount();
  });
})();
