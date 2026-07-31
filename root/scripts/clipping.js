// Render Lucide icons
if (window.lucide) window.lucide.createIcons();

// Scroll reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// Clipping demo — animated typing
(function () {
  var queries = [
    { text: 'Immunity idol is presented to contestant', label: 'S2023 · E11', tc: 'TC 00:31:08', img: 'assets/clipping_example1.png', title: '<b>Immunity idol</b> presented to contestant', metaEp: 'S2023 · E11', metaTC: 'TC 00:31:08' },
    { text: 'Wide angles of the storm', label: 'S2023 · E11', tc: 'WIDE B-ROLL', img: 'assets/clipping_example2.png', title: '<b>Wide angle</b> shot of the storm approaching', metaEp: 'S2023 · E11', metaTC: 'WIDE B-ROLL' },
    { text: 'Contestants sheltering from the rain', label: 'S2023 · E11', tc: 'TC 00:54:15', img: 'assets/clipping_example3.png', title: 'Contestants <b>sheltering from the rain</b> under tarp', metaEp: 'S2023 · E11', metaTC: 'TC 00:54:15' },
    { text: 'Votes at the island council for Maxim', label: 'S2023 · E11', tc: 'TC 01:01:20', img: 'assets/clipping_example4.png', title: 'Island council votes: <b>Maxim</b> is eliminated', metaEp: 'S2023 · E11', metaTC: 'TC 01:01:20' }
  ];
  var current = 0;
  var typingTimer = null, cycleTimer = null;
  var typedEl   = document.getElementById('clipTyped');
  var cursorEl  = document.getElementById('clipCursor');
  var resultEl  = document.getElementById('clipResult');
  var thumbEl   = document.getElementById('clipThumb');
  var imgEl     = document.getElementById('clipImg');
  var tcEl      = document.getElementById('clipTC');
  var titleEl   = document.getElementById('clipTitle');
  var metaEl    = document.getElementById('clipMeta');
  if (!typedEl) return;



    function clearTimers() { clearTimeout(typingTimer); clearTimeout(cycleTimer); }

      function hideResult() {
        resultEl.classList.remove('visible');
        [titleEl, metaEl].forEach(function (el) { el.classList.remove('visible'); });
        tcEl.classList.remove('visible');
        imgEl.classList.remove('loaded');
      }

      function showResult(q) {
        titleEl.innerHTML = q.title;
        metaEl.innerHTML = '<strong>' + q.metaEp + '</strong> &nbsp;&middot;&nbsp; ' + q.metaTC;
        tcEl.textContent = q.tc;
        imgEl.src = q.img;
        imgEl.onload = function () { imgEl.classList.add('loaded'); };
        imgEl.onerror = function () { thumbEl.style.background = 'linear-gradient(135deg,#2a2a2a 0%,#111 100%)'; imgEl.style.display = 'none'; };
        resultEl.classList.add('visible');
        requestAnimationFrame(function () {
          [titleEl, metaEl].forEach(function (el) { el.classList.add('visible'); });
          tcEl.classList.add('visible');
        });
      }

      

      function typeQuery(q, onDone) {
        cursorEl.style.display = 'inline-block';
        var full = q.text, pos = 0;
        (function tick() {
          if (pos <= full.length) {
            typedEl.textContent = full.slice(0, pos++);
            typingTimer = setTimeout(tick, pos < 4 ? 60 : 38 + Math.random() * 40);
          } else { onDone(); }
        })();
      }

      function eraseQuery(onDone) {
        var len = typedEl.textContent.length;
        var str = typedEl.textContent;
        (function tick() {
          if (len >= 0) {
            typedEl.textContent = str.slice(0, len--);
            typingTimer = setTimeout(tick, 22 + Math.random() * 18);
          } else { onDone(); }
        })();
      }

      function scheduleCycle() {
        cycleTimer = setTimeout(function () {
          cursorEl.style.display = 'inline-block';
          switchTo((current + 1) % queries.length);
        }, 3800);
      }

      function switchTo(idx) {
        current = idx;
        var q = queries[idx];
        hideResult();
        eraseQuery(function () {
          typingTimer = setTimeout(function () {
            typeQuery(q, function () {
              typingTimer = setTimeout(function () { cursorEl.style.display = 'none'; showResult(q); scheduleCycle(); }, 600);
            });
          }, 300);
        });
      }

      setTimeout(function () {
        typeQuery(queries[0], function () {
          typingTimer = setTimeout(function () { cursorEl.style.display = 'none'; showResult(queries[0]); scheduleCycle(); }, 600);
        });
      }, 600);
    })();

    // Demo modal
    (function () {
      var overlay = document.getElementById('demoModal');
      var form    = document.getElementById('demoForm');
      var success = document.getElementById('demoSuccess');

      function openModal() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.lucide) window.lucide.createIcons();
        var first = overlay.querySelector('input');
        if (first) setTimeout(function () { first.focus(); }, 50);
      }

      function closeModal() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('[data-modal="demo"]').forEach(function (btn) {
        btn.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
      });

      overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
      overlay.querySelector('.modal-close').addEventListener('click', closeModal);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.hidden = true;
        success.hidden = false;
        if (window.lucide) window.lucide.createIcons();
      });
    })();


