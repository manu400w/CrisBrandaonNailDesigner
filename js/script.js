const linhas = document.querySelectorAll('.linha');

linhas.forEach(linha => {
    const carousel = linha.querySelector('.carousel');
    const setaEsquerda = linha.querySelector('.seta.esquerda');
    const setaDireita = linha.querySelector('.seta.direita');

    if (!carousel || !setaEsquerda || !setaDireita) return;

    const passo = carousel.clientWidth * 0.8;

    setaEsquerda.addEventListener('click', () => {
        carousel.scrollBy({
            left: -passo,
            behavior: 'smooth'
        });
    });

    setaDireita.addEventListener('click', () => {
        carousel.scrollBy({
            left: passo,
            behavior: 'smooth'
        });
    });
});

// Depoimentos carousel: autoplay, navigation, indicators
(function setupDepoimentos() {
    const wrap = document.querySelector('.carrossel-depoimentos');
    if (!wrap) return;
    const container = wrap.querySelector('.carrossel');
    const slides = Array.from(container.querySelectorAll('.slide'));
    const prev = wrap.querySelector('.depo-prev');
    const next = wrap.querySelector('.depo-next');
    const dotsContainer = document.querySelector('.depo-dots');
    if (!container || slides.length === 0) return;

    let current = 0;
    let autoplayInterval = null;
    const AUTOPLAY_MS = 4000;

    // create dots
    const dots = slides.map((s, i) => {
        const d = document.createElement('button');
        d.className = 'depo-dot';
        d.setAttribute('aria-label', `Ir para depoimento ${i+1}`);
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
        return d;
    });

    function updateDots() {
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        const slide = slides[current];
        container.scrollTo({ left: slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' });
        updateDots();
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    if (next) next.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });
    if (prev) prev.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });

    // update current on manual scroll (snap)
    let scrollTimeout = null;
    container.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const center = container.scrollLeft + container.clientWidth / 2;
            let nearest = 0;
            let minDist = Infinity;
            slides.forEach((s, i) => {
                const sCenter = s.offsetLeft + s.clientWidth / 2;
                const dist = Math.abs(center - sCenter);
                if (dist < minDist) { minDist = dist; nearest = i; }
            });
            current = nearest;
            updateDots();
        }, 100);
    });

    function startAutoplay() {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_MS);
    }

    function stopAutoplay() {
        if (!autoplayInterval) return;
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }

    // pause on hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // init
    updateDots();
    goTo(0);
    startAutoplay();
})();
