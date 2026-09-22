(() => {
    'use strict';

    const OPENING_HOURS = { 0: [7, 21], 1: [7, 21], 2: [7, 21], 3: [7, 21], 4: [7, 21], 5: [7, 21], 6: [7, 21] };
    const TIME_ZONE = 'America/Fortaleza';
    const DESKTOP_MQ = '(min-width: 861px)';

    const matches = query => window.matchMedia(query).matches;

    function initNav() {
        const nav = document.getElementById('nav');
        const menuBtn = document.getElementById('menu-btn');
        if (!nav || !menuBtn) return;

        const isOpen = () => nav.classList.contains('open');
        const setMenu = open => {
            nav.classList.toggle('open', open);
            menuBtn.setAttribute('aria-expanded', open);
            menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            document.documentElement.style.overflow = open ? 'hidden' : '';
            document.body.style.overflow = open ? 'hidden' : '';
        };

        menuBtn.addEventListener('click', () => setMenu(!isOpen()));
        document.querySelectorAll('#mobile-panel a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && isOpen()) { setMenu(false); menuBtn.focus(); }
        });

        const closeMenuOnDesktop = () => { if (isOpen() && matches(DESKTOP_MQ)) setMenu(false); };
        window.addEventListener('resize', closeMenuOnDesktop);
        window.addEventListener('orientationchange', closeMenuOnDesktop);

        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function initStickyOrder() {
        const sticky = document.getElementById('sticky-order');
        const pedir = document.getElementById('pedir');
        if (!sticky || !pedir) return;

        const update = () => {
            const pedirTop = pedir.getBoundingClientRect().top;
            sticky.classList.toggle('show', window.scrollY > 600 && pedirTop > window.innerHeight);
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('load', update);
        window.addEventListener('resize', update);
        update();
    }

    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
        els.forEach(el => io.observe(el));
    }

    function initTilt() {
        if (!matches('(hover: hover) and (pointer: fine)') || matches('(prefers-reduced-motion: reduce)')) return;

        document.querySelectorAll('.moment-img').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - .5;
                const y = (e.clientY - rect.top) / rect.height - .5;
                card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    function initOpenStatus() {
        const el = document.getElementById('status');
        if (!el) return;
        const label = el.querySelector('span');

        // Só mexe no DOM quando o texto muda, para o aria-live não repetir o anúncio a cada minuto.
        const setLabel = text => { if (label.textContent !== text) label.textContent = text; };

        const update = () => {
            try {
                const parts = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
                const get = type => parts.find(p => p.type === type).value;
                const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
                const now = (parseInt(get('hour'), 10) % 24) + parseInt(get('minute'), 10) / 60;
                const [open, close] = OPENING_HOURS[day];
                const isOpen = now >= open && now < close;

                el.classList.toggle('closed', !isOpen);
                if (isOpen) {
                    setLabel(`Aberto agora · até as ${close}h`);
                } else {
                    const nextOpen = now < open ? open : OPENING_HOURS[(day + 1) % 7][0];
                    setLabel(`Fechado agora · abrimos ${now < open ? 'hoje' : 'amanhã'} às ${nextOpen}h`);
                }
            } catch (err) {
                // Sem suporte a Intl/fuso horário: mantém o texto padrão do HTML.
            }
        };
        update();
        setInterval(update, 60000);
    }

    function initYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    initNav();
    initStickyOrder();
    initReveal();
    initTilt();
    initOpenStatus();
    initYear();
})();
