/* quiz.js: runs any emotion quiz. The words come from window.QUIZ (quizzes/<emotion>.js);
   nothing here needs changing for a new emotion.
   Privacy: her answers live only in this page's memory and are never saved or tracked.
   Only if she submits the email box are her email, her choice and her two role names sent to Make.
   Her result link holds only the six role totals (never her email, ages or where). */
(function(){
  var W = window.QUIZ;
  var app = document.getElementById('app');
  var HERO = 'assets/still.jpg?v=3';
  var VIDEO = 'assets/hero.mp4?v=3';
  var N = W.statements.length;
  var TOTAL = N + 3;                 // statements + age now + age then + where
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  // Same seamless loop as the homepage hero: a second copy fades in just before the first ends
  function crossfadeLoop(a, b){
    var FADE = 1.0, active = a, idle = b, swapping = false;
    function onTime(){
      if (swapping || !active.duration) return;
      if (active.duration - active.currentTime <= FADE){
        swapping = true;
        idle.currentTime = 0;
        idle.play().catch(function(){});
        idle.classList.add('on');
        active.classList.remove('on');
        var prev = active;
        active = idle; idle = prev;
        prev.removeEventListener('timeupdate', onTime);
        active.addEventListener('timeupdate', onTime);
        setTimeout(function(){ idle.pause(); idle.currentTime = 0; swapping = false; }, FADE * 1000 + 80);
      }
    }
    active.addEventListener('timeupdate', onTime);
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
  // the six role totals (4 to 20), in table order
  function totalsFromAnswers(){
    return W.archetypes.map(function(t){
      return t.statements.reduce(function(s, n){ return s + a.scores[n - 1]; }, 0) + (6 - a.scores[t.flip - 1]);
    });
  }
  function score(totals){
    var rows = W.archetypes.map(function(t, order){
      return { t: t, order: order, total: totals[order], pct: Math.round((totals[order] - 4) / 16 * 100) };
    });
    // highest first; equal totals keep table order
    rows.sort(function(x, y){ return y.total - x.total || x.order - y.order; });
    return { rows: rows, main: rows[0], second: rows[1], mix: rows[0].total === rows[1].total, totals: totals };
  }
  window.QuizScore = function(scores){ var keep = a; a = { scores: scores }; var r = score(totalsFromAnswers()); a = keep; return r; };

  // ---------- her result link: ?r= and the six totals, e.g. ?r=17-9-12-8-11-6 ----------
  function resultUrl(totals){ return W.quizUrl + '?r=' + totals.join('-'); }
  function totalsFromLink(v){
    if (!v || !/^\d{1,2}(-\d{1,2}){5}$/.test(v)) return null;
    var t = v.split('-').map(Number);
    return t.length === W.archetypes.length && t.every(function(n){ return n >= 4 && n <= 20; }) ? t : null;
  }

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
    // the homepage hero video, looped with the homepage's crossfade (the still sits behind it)
    var hero = el('section', 'dusk');
    var vids = [0, 1].map(function(k){
      var v = document.createElement('video');
      v.muted = true; v.playsInline = true; v.preload = 'auto';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      v.src = VIDEO;
      if (k === 0){ v.poster = HERO; v.className = 'on'; if (!reduce) v.autoplay = true; }
      hero.appendChild(v);
      return v;
    });
    if (!reduce) crossfadeLoop(vids[0], vids[1]);
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
      renderReading();
    }));
    page.appendChild(qs);

    page.appendChild(aboutSection(false));
    show(page);
    prog.hidden = false;
    updateProgress();
  }

  function renderReading(){
    prog.hidden = true;
    var s = el('section', 'reading screen');
    s.appendChild(el('p', null, W.reading));
    s.appendChild(el('div', 'qline')).appendChild(el('span'));
    show(s);
    setTimeout(function(){ renderResults(score(totalsFromAnswers()), false); }, 2000);
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

  // fromLink: opened from her result link, which has no ages or where
  function renderResults(r, fromLink){
    prog.hidden = true;
    var R = W.result;
    var main = r.main.t, second = r.second.t;
    var where = fromLink ? null : W.where.options[a.where].phrase;
    var vals = fromLink ? { lesson: main.lesson }
      : { ageThen: a.ageThen, years: yearsText(a.ageNow - a.ageThen), lesson: main.lesson, where: where };
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
    // b. the email box straight after the reveal
    var showBox = !fromLink && W.emailWebhook;
    boxes = [];
    if (showBox) s1.w.appendChild(emailBox(r));
    page.appendChild(s1);

    // 3. Summary (cream)
    var s2 = band(null);
    add(s2.w, 'h2', 'rh', main.name);
    add(s2.w, 'p', 'serif', main.summary);
    page.appendChild(s2);

    // 4. What to know (dark)
    var s3 = band(R.knowEyebrow);
    var ul = add(s3.w, 'ul', 'points');
    ul.appendChild(el('li', null, fill(fromLink ? R.firstPointLink : where ? R.firstPoint : R.firstPointNoWhere, vals)));
    main.points.forEach(function(p){ ul.appendChild(el('li', null, p)); });
    add(s3.w, 'p', 'also', second.streak);
    add(s3.w, 'p', 'closing', fill(fromLink ? R.endingLink : R.ending, vals));
    page.appendChild(s3);

    // 5. Make change now (cream)
    var s4 = band(R.changeEyebrow);
    add(s4.w, 'h2', 'rh', R.resetTitle);
    add(s4.w, 'p', null, R.resetText);
    var watch = add(s4.w, 'a', 'btn', R.resetButton + ' →');
    if (W.resetVideoId){
      watch.href = W.resetVideoUrl;          // fallback if the pop-up can't run
      watch.addEventListener('click', function(e){ e.preventDefault(); openVideo(watch); });
    } else watch.setAttribute('aria-disabled', 'true');
    page.appendChild(s4);

    // 6. Next steps (dark)
    var s5 = band(R.nextEyebrow);
    add(s5.w, 'p', 'serif', main.nextSteps);
    var book = add(s5.w, 'a', 'btn', R.bookButton + ' →');
    book.href = W.bookUrl;
    // g. the email box once more, if she hasn't used it
    if (showBox) s5.w.appendChild(emailBox(r));
    page.appendChild(s5);

    // h. Divider, share, take it again + the privacy note (cream)
    page.appendChild(aboutSection(true));
    show(page);
  }

  // ---------- the Reset video, in a pop-up on the same page ----------
  // Dark overlay, video in the centre, × or a tap outside closes it and she's back where she was.
  var modal, frameBox, lastFocus;
  function openVideo(from){
    lastFocus = from;
    if (!modal){
      modal = el('div', 'vmodal');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', W.result.resetTitle);
      var box = modal.appendChild(el('div', 'vbox'));
      box.appendChild(button('vclose', '✕', closeVideo)).setAttribute('aria-label', 'Close video');
      frameBox = box.appendChild(el('div', 'vframe'));
      modal.addEventListener('click', function(e){ if (e.target === modal) closeVideo(); });
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo(); });
      document.body.appendChild(modal);
    }
    var f = document.createElement('iframe');
    // privacy-friendly player; rel=0 keeps end-of-video suggestions to Nicky's own channel
    f.src = 'https://www.youtube-nocookie.com/embed/' + W.resetVideoId + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';
    f.title = W.result.resetTitle;
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.allowFullscreen = true;
    frameBox.innerHTML = '';
    frameBox.appendChild(f);
    modal.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    modal.querySelector('.vclose').focus({ preventScroll: true });
  }
  function closeVideo(){
    modal.classList.remove('open');
    document.documentElement.style.overflow = '';
    frameBox.innerHTML = '';                 // stops the video
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function copyText(all, status){
    function done(){ status.textContent = W.result.copied; setTimeout(function(){ status.textContent = ''; }, 3000); }
    function fallback(){
      var t = el('textarea'); t.value = all; t.setAttribute('readonly', '');
      t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      t.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(all).then(done, fallback);
    else fallback();
  }

  // ---------- email box: the only thing that sends anything to Make ----------
  // Shown twice on the results page (after the chart, and after Next steps). Sends her email,
  // her marketing choice, the two role names and her result link. Never her answers, ages or where.
  var boxes = [];
  function emailBox(r){
    var E = W.emailBox, R = W.result;
    var box = el('form', 'ebox');
    box.noValidate = true;
    box.setAttribute('data-reveal', '');
    box.appendChild(el('h3', null, E.title));
    box.appendChild(el('p', 'etext', E.text));
    var email = box.appendChild(el('input', 'cfield'));
    email.type = 'email'; email.inputMode = 'email'; email.autocomplete = 'email';
    email.placeholder = E.email; email.setAttribute('aria-label', E.email);
    email.addEventListener('input', function(){ email.classList.remove('flag'); });
    var go = box.appendChild(el('div', 'row')).appendChild(el('button', 'btn', E.button));
    go.type = 'submit';
    // the optional tick box: never ticked for her
    var opt = box.appendChild(el('label', 'optbox'));
    var tick = opt.appendChild(el('input'));
    tick.type = 'checkbox'; tick.checked = false;
    opt.appendChild(el('span', null, E.optIn));
    var pp = box.appendChild(el('p', 'plink'));
    var link = pp.appendChild(el('a', null, E.privacy));
    link.href = W.privacyUrl; link.target = '_blank'; link.rel = 'noopener';

    box.addEventListener('submit', function(e){
      e.preventDefault();
      var em = email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){
        email.classList.remove('flag'); void email.offsetWidth; email.classList.add('flag');
        return email.focus();
      }
      var mainName = r.mix ? fill(R.mixRole, { a: r.main.t.name, b: r.second.t.name }) : r.main.t.name;
      fetch(W.emailWebhook, {
        method: 'POST', keepalive: true,     // Make's webhook allows JSON from any site
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emotion: W.emotion,
          email: em,
          marketing: tick.checked ? 'yes' : 'no',
          source: 'website',
          quiz_url: W.quizUrl,
          main_role: mainName,
          second_role: r.mix ? '' : r.second.t.name,
          result_url: resultUrl(r.totals)
        })
      }).catch(function(){});
      // both boxes become the thank-you line
      boxes.forEach(function(b){
        var done = el('p', 'edone', E.done);
        if (b === box) done.setAttribute('role', 'status');
        b.replaceWith(done);
      });
      boxes = [];
    });
    boxes.push(box);
    return box;
  }

  // ---------- bottom of the page ----------
  // quiz page: the about blocks + privacy note; results page: take it again + privacy note
  function aboutSection(results){
    var s = el('section', 'band-cream about-quiz');
    var w = el('div', 'wrap');
    s.appendChild(w);
    if (results){
      w.appendChild(el('div', 'divider'));
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
        copyText(text + ' ' + url, copied);
      }));
      // WhatsApp · Facebook · Email · Copy link, on every device (the quiz page, never her result)
      var msg = R.shareMessage, url = W.quizUrl, V = R.shareVia;
      var row = w.appendChild(el('p', 'shares'));
      function via(label, href){
        var l = row.appendChild(el('a', null, label));
        l.href = href;
        if (href.indexOf('http') === 0){ l.target = '_blank'; l.rel = 'noopener'; }
      }
      via(V.whatsapp, 'https://wa.me/?text=' + encodeURIComponent(msg + ' ' + url));
      via(V.facebook, 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
      via(V.email, 'mailto:?subject=' + encodeURIComponent(R.shareSubject) + '&body=' + encodeURIComponent(msg + '\n\n' + url));
      row.appendChild(button('linkish', V.copy, function(){ copyText(msg + ' ' + url, copied); }));
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

  // A result link (?r=) opens her result straight away. dreadquiz.html reads it into
  // window.QUIZ_R and tidies the address bar before the Meta Pixel starts.
  reset();
  var fromLink = totalsFromLink(window.QUIZ_R || new URLSearchParams(location.search).get('r'));
  if (fromLink) renderResults(score(fromLink), true); else renderQuiz();
})();
