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
