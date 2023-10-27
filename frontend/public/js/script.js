window.sr = ScrollReveal({reset: true});

sr.reveal('.titulo-principal', {duration:1000});
sr.reveal('.cabecalho', {duration:1000});
sr.reveal('.cta', {duration:1000});
sr.reveal('.linhas', {duration:2000});
sr.reveal('.mapa', {duration:2000});
sr.reveal('.recarga', {duration:2000});
sr.reveal('.formulario', {duration:2000});

document.getElementById('btn-send').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    alert('Recarga com sucesso. Aproveite seu cartão Smart!'); 
});

document.getElementById('menu').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Evita o comportamento padrão do link

        const targetId = event.target.getAttribute('href').substring(2); // Obtém o ID da seção alvo

        const targetElement = document.getElementById(targetId); // Obtém o elemento alvo

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // Rolagem suave
            });
        }
    }
});



