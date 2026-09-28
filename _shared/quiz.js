/* quiz.js: runs any emotion quiz. The words come from window.QUIZ (quizzes/<emotion>.js);
   nothing here needs changing for a new emotion.
   Privacy: her answers live only in this page's memory. They are never saved to the
   browser, sent anywhere or passed to tracking, and they vanish when she closes the page. */
(function(){
  var W = window.QUIZ;
  var app = document.getElementById('app');
  var HERO = 'assets/still.jpg?v=3';
  var N = W.statements.length;
  var TOTAL = N + 3;                 // statements + age now + age then + where
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ManyChat links end in ?from=mc: ManyChat already has her email, so skip the email box
  var fromManyChat = new URLSearchParams(location.search).get('from') === 'mc';
  var a;                             // her answers, in memory only

  function reset(){ a = { scores: [], ageNow: null, ageThen: null, where: null }; }
  function fill(t, o){ return t.replace(/\{(\w+)\}/g, function(m, k){ return o[k] != null ? o[k] : m; }); }
  function pad(n){ return (n < 10 ? '0' : '') + n; }
  function el(tag, cls, html){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function button(cls, html, onClick){
    var b = el('button', cls, html);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }
  function show(node){
    app.innerHTML = '';
    app.appendChild(node);
    window.scrollTo(0, 0);
    reveal(node);
  }

  // Same fade-in as the homepage: premium2.css animates [data-reveal] once .in is added,
  // using premium2.js's observer settings (these sections are built after it has run)
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .15 }) : null;
  function reveal(root){
    root.querySelectorAll('[data-reveal]').forEach(function(n){ if (io) io.observe(n); else n.classList.add('in'); });
  }
  function add(parent, tag, cls, html){
    var n = el(tag, cls, html);
    n.setAttribute('data-reveal', '');
    parent.appendChild(n);
    return n;
  }

  // ---------- fixed progress line: fills as she answers ----------
  var prog = el('div', 'aprog');
  var progFill = prog.appendChild(el('span'));
  prog.setAttribute('aria-hidden', 'true');
  document.body.appendChild(prog);
  function valid(key){
    var q = W[key], n = a[key];
    if (n == null || n < q.min || n > q.max) return false;
    return key !== 'ageThen' || a.ageNow == null || n <= a.ageNow;
  }
  function answered(){
    var c = a.scores.filter(function(s){ return s != null; }).length;
    return c + (valid('ageNow') ? 1 : 0) + (valid('ageThen') ? 1 : 0) + (a.where != null ? 1 : 0);
  }
  function updateProgress(){ progFill.style.width = (answered() / TOTAL * 100) + '%'; }

  // ---------- scoring ----------
  function score(){
    var rows = W.archetypes.map(function(t, order){
      var total = t.statements.reduce(function(s, n){ return s + a.scores[n - 1]; }, 0) + (6 - a.scores[t.flip - 1]);
      return { t: t, order: order, total: total, pct: Math.round((total - 4) / 16 * 100) };
    });
    // highest first; equal totals keep table order
    rows.sort(function(x, y){ return y.total - x.total || x.order - y.order; });
    return { rows: rows, main: rows[0], second: rows[1], mix: rows[0].total === rows[1].total };
  }
  window.QuizScore = function(scores){ var keep = a; a = { scores: scores }; var r = score(); a = keep; return r; };

  // ---------- the quiz: one scrolling page ----------
  function item(num, text){
    var it = el('div', 'item');
    it.setAttribute('data-reveal', '');
    it.appendChild(el('p', 'inum', pad(num)));
    var h = it.appendChild(el('p', 'stmt', text));
    h.id = 'q' + num;
    return it;
  }
  function settle(it){ it.classList.remove('flag'); updateProgress(); }

  function renderQuiz(){
    var page = el('div', 'screen');

    // intro
    var hero = el('section', 'dusk');
    var img = el('img');
    img.src = HERO; img.alt = ''; img.setAttribute('aria-hidden', 'true');
    hero.appendChild(img);
    var v = el('div', 'vin');
    v.appendChild(el('p', 'eyebrow', W.intro.eyebrow));
    v.appendChild(el('h1', 'dtitle', W.intro.headline));
    v.appendChild(el('p', 'dmeta', W.intro.meta));
    v.appendChild(el('p', 'dsub', W.intro.text));
    hero.appendChild(v);
    page.appendChild(hero);

    var qs = el('section', 'band band-dark quiz');
    var w = el('div', 'wrap');
    qs.appendChild(w);
    add(w, 'p', 'lead', W.instruction);
    var items = [];

    // the 24 statements, each with five circles
    W.statements.forEach(function(text, i){
      var it = item(i + 1, text);
      var dots = el('div', 'dots');
      dots.setAttribute('role', 'radiogroup');
      dots.setAttribute('aria-labelledby', 'q' + (i + 1));
      W.scale.forEach(function(o){
        var d = button('dot', '', function(){
          dots.querySelectorAll('.dot').forEach(function(x){ x.setAttribute('aria-checked', 'false'); });
          d.setAttribute('aria-checked', 'true');
          a.scores[i] = o.score;
          settle(it);
        });
        d.setAttribute('role', 'radio');
        d.setAttribute('aria-label', o.label);
        d.setAttribute('aria-checked', 'false');
        dots.appendChild(d);
      });
      var scale = el('div', 'scale');
      scale.appendChild(dots);
      var ends = scale.appendChild(el('div', 'ends'));
      ends.setAttribute('aria-hidden', 'true');
      ends.appendChild(el('span', null, W.scale[0].label));
      ends.appendChild(el('span', null, W.scale[W.scale.length - 1].label));
      it.appendChild(scale);
      it.check = function(){ return a.scores[i] != null; };
      items.push(it);
      w.appendChild(it);
    });

    // the two ages
    ['ageNow', 'ageThen'].forEach(function(key, k){
      var q = W[key];
      var it = item(N + 1 + k, q.q);
      var input = el('input', 'num-input');
      input.type = 'number';
      input.inputMode = 'numeric';
      input.pattern = '[0-9]*';
      input.min = q.min; input.max = q.max;
      input.setAttribute('aria-labelledby', 'q' + (N + 1 + k));
      var msg = el('p', 'msg');
      msg.setAttribute('role', 'status');
      input.addEventListener('input', function(){
        var n = input.value.trim() === '' ? null : Number(input.value);
        a[key] = Number.isInteger(n) ? n : null;
        msg.textContent = '';
        if (valid(key)) settle(it); else updateProgress();
      });
      it.appendChild(input);
      it.appendChild(msg);
      it.check = function(){
        var n = a[key];
        if (n == null || n < q.min || n > q.max){ if (n != null) msg.textContent = fill(W.rangeCheck, q); return false; }
        if (key === 'ageThen' && a.ageNow != null && n > a.ageNow){ msg.textContent = W.ageCheck; return false; }
        return true;
      };
      it.focusTarget = input;
      items.push(it);
      w.appendChild(it);
    });

    // where she was
    var wi = item(N + 3, W.where.q);
    var opts = el('div', 'opts');
    opts.setAttribute('role', 'radiogroup');
    opts.setAttribute('aria-labelledby', 'q' + (N + 3));
    W.where.options.forEach(function(o, k){
      var b = button('opt', o.shown, function(){
        opts.querySelectorAll('.opt').forEach(function(x){ x.setAttribute('aria-checked', 'false'); });
        b.setAttribute('aria-checked', 'true');
        a.where = k;
        settle(wi);
      });
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      opts.appendChild(b);
    });
    wi.appendChild(opts);
    wi.check = function(){ return a.where != null; };
    items.push(wi);
    w.appendChild(wi);

    // See my result: if anything's missing, glide to the first gap and highlight it
    var submit = add(w, 'div', 'submit');
    submit.appendChild(button('btn', W.submit + ' →', function(){
      for (var k = 0; k < items.length; k++){
        if (!items[k].check()){
          var it = items[k];
          it.classList.add('in');
          it.classList.remove('flag');
          void it.offsetWidth;          // restart the highlight if she presses again
          it.classList.add('flag');
          it.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
          // if the glide didn't happen (older browsers), jump there instead
          setTimeout(function(t){
            var r = t.getBoundingClientRect();
            if (r.bottom < 0 || r.top > innerHeight) t.scrollIntoView({ block: 'center' });
          }, 900, it);
          if (it.focusTarget) setTimeout(function(t){ t.focus({ preventScroll: true }); }, reduce ? 0 : 600, it.focusTarget);
          return;
        }
      }
      // no email box for ManyChat visitors, or until the email connection is set up
      if (fromManyChat || !W.emailWebhook) renderReading(); else renderEmailBox();
    }));
    page.appendChild(qs);

    page.appendChild(aboutSection(false));
    show(page);
    prog.hidden = false;
    updateProgress();
  }

  // ---------- optional email box (never shown to ManyChat visitors) ----------
  // Sends ONLY her first name, email and email choice. Never her answers or result.
  function renderEmailBox(){
    prog.hidden = true;
    var E = W.emailBox;
    var s = el('section', 'mailbox screen');
    var w = el('div', 'wrap');
    s.appendChild(w);
    w.appendChild(el('h2', 'rh', E.title));
    w.appendChild(el('p', 'mtext', E.text));

    function field(type, label, auto){
      var f = el('input', 'field');
      f.type = type; f.placeholder = label; f.autocomplete = auto;
      f.setAttribute('aria-label', label);
      f.addEventListener('input', function(){ f.classList.remove('flag'); });
      w.appendChild(f);
      return f;
    }
    var name = field('text', E.name, 'given-name');
    var email = field('email', E.email, 'email');
    email.inputMode = 'email';

    w.appendChild(el('p', 'optin', E.optIn));
    var choice = null;
    var pick = el('div', 'pick');
    pick.setAttribute('role', 'radiogroup');
    pick.setAttribute('aria-label', E.optIn);
    [[true, E.yes], [false, E.no]].forEach(function(c){
      var b = button('opt', c[1], function(){
        pick.querySelectorAll('.opt').forEach(function(x){ x.setAttribute('aria-checked', 'false'); });
        b.setAttribute('aria-checked', 'true');
        choice = c[0];
        pick.classList.remove('flag');
      });
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');     // neither ticked to start with
      pick.appendChild(b);
    });
    w.appendChild(pick);

    function flag(n){
      n.classList.remove('flag'); void n.offsetWidth; n.classList.add('flag');
      if (n.focus && n.tagName === 'INPUT') n.focus();
    }
    w.appendChild(el('div', 'row')).appendChild(button('btn', E.send + ' →', function(){
      var nm = name.value.trim(), em = email.value.trim();
      if (!nm) return flag(name);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return flag(email);
      if (choice === null) return flag(pick);
      if (W.emailWebhook){
        fetch(W.emailWebhook, {
          method: 'POST', keepalive: true,     // Make's webhook allows JSON from any site
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emotion: W.emotion,
            first_name: nm,
            email: em,
            marketing: choice ? 'yes' : 'no',
            source: 'website',
            quiz_url: W.quizUrl
          })
        }).catch(function(){});
      }
      renderReading();
    }));
    w.appendChild(el('div', 'row')).appendChild(button('back', E.skip, renderReading));
    var pp = w.appendChild(el('p', 'plink'));
    var link = pp.appendChild(el('a', null, E.privacy));
    link.href = W.privacyUrl; link.target = '_blank'; link.rel = 'noopener';

    show(s);
  }

  function renderReading(){
    prog.hidden = true;
    var s = el('section', 'reading screen');
    s.appendChild(el('p', null, W.reading));
    s.appendChild(el('div', 'qline')).appendChild(el('span'));
    show(s);
    setTimeout(renderResults, 2000);
  }

  // ---------- results ----------
  var tone = 0;
  function band(eyebrow, extra){
    var s = el('section', 'band rsec ' + (tone++ % 2 ? 'band-cream' : 'band-dark') + (extra ? ' ' + extra : ''));
    var w = el('div', 'wrap');
    s.appendChild(w);
    if (eyebrow) add(w, 'p', 'eyebrow', eyebrow);
    s.w = w;
    return s;
  }
  function yearsText(n){ return n < 1 ? 'less than a year' : n + (n === 1 ? ' year' : ' years'); }

  function renderResults(){
    var r = score(), R = W.result;
    var main = r.main.t, second = r.second.t;
    var where = W.where.options[a.where].phrase;
    var vals = { ageThen: a.ageThen, years: yearsText(a.ageNow - a.ageThen), lesson: main.lesson, where: where };
    var page = el('article', 'screen');
    tone = 0;

    // 1. Headline + 2. chart (dark)
    var s1 = band(R.eyebrow, 'rhead');
    if (r.mix){
      add(s1.w, 'h1', null, fill(R.mix, { a: main.name, b: second.name }));
    } else {
      add(s1.w, 'h1', null, fill(R.mostly, { main: main.name }));
      add(s1.w, 'p', 'streak', fill(R.streak, { second: second.name }));
    }
    add(s1.w, 'p', 'stage', R.stage);
    var bars = add(s1.w, 'ul', 'bars');
    bars.setAttribute('aria-label', 'Your roles, strongest first');
    r.rows.forEach(function(row, i){
      var li = el('li', i === 0 || (r.mix && i === 1) ? 'top' : '');
      li.appendChild(el('span', 'bl', row.t.name));
      var track = el('span', 'bt');
      var f = el('span', 'bf');
      f.style.width = row.pct + '%';
      track.appendChild(f);
      li.appendChild(track);
      bars.appendChild(li);
    });
    page.appendChild(s1);

    // 3. Summary (cream)
    var s2 = band(null);
    add(s2.w, 'h2', 'rh', main.name);
    add(s2.w, 'p', 'serif', main.summary);
    page.appendChild(s2);

    // 4. What to know (dark)
    var s3 = band(R.knowEyebrow);
    var ul = add(s3.w, 'ul', 'points');
    ul.appendChild(el('li', null, fill(where ? R.firstPoint : R.firstPointNoWhere, vals)));
    main.points.forEach(function(p){ ul.appendChild(el('li', null, p)); });
    add(s3.w, 'p', 'also', second.streak);
    add(s3.w, 'p', 'closing', fill(R.ending, vals));
    page.appendChild(s3);

    // 5. Make change now (cream)
    var s4 = band(R.changeEyebrow);
    add(s4.w, 'h2', 'rh', R.resetTitle);
    add(s4.w, 'p', null, R.resetText);
    var watch = add(s4.w, 'a', 'btn', R.resetButton + ' →');
    if (W.resetVideoUrl){ watch.href = W.resetVideoUrl; watch.target = '_blank'; watch.rel = 'noopener'; }
    else watch.setAttribute('aria-disabled', 'true');
    page.appendChild(s4);

    // 6. Next steps (dark)
    var s5 = band(R.nextEyebrow);
    add(s5.w, 'p', 'serif', main.nextSteps);
    var book = add(s5.w, 'a', 'btn', R.bookButton + ' →');
    book.href = W.bookUrl;
    page.appendChild(s5);

    // 7. Take it again + the privacy note (cream)
    page.appendChild(aboutSection(true));
    show(page);
  }

  // ---------- bottom of the page ----------
  // quiz page: the about blocks + privacy note; results page: take it again + privacy note
  function aboutSection(results){
    var s = el('section', 'band-cream about-quiz');
    var w = el('div', 'wrap');
    s.appendChild(w);
    if (results){
      // share the quiz (never her result): phone share sheet, or copy the link on a computer
      var R = W.result;
      var copied = el('p', 'copied');
      copied.setAttribute('role', 'status');
      w.appendChild(el('div', 'row')).appendChild(button('btn', R.share + ' →', function(){
        var text = R.shareMessage, url = W.quizUrl;
        if (navigator.share && matchMedia('(pointer: coarse)').matches){
          navigator.share({ text: text, url: url }).catch(function(){});
          return;
        }
        var all = text + ' ' + url;
        function done(){ copied.textContent = R.copied; setTimeout(function(){ copied.textContent = ''; }, 3000); }
        if (navigator.clipboard && window.isSecureContext){
          navigator.clipboard.writeText(all).then(done, fallback);
        } else fallback();
        function fallback(){
          var t = el('textarea'); t.value = all; t.setAttribute('readonly', '');
          t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          t.remove();
        }
      }));
      w.appendChild(copied);
      w.appendChild(el('div', 'row')).appendChild(button('back', R.again, function(){ reset(); renderQuiz(); }));
    } else {
      W.about.forEach(function(b){
        var blk = add(w, 'div', 'blk');
        blk.appendChild(el('h3', null, b.title));
        blk.appendChild(el('p', null, b.text));
      });
    }
    add(w, 'p', 'privacy', W.privacy);
    return s;
  }

  reset();
  renderQuiz();
})();
