window.sr = ScrollReveal({reset: true});

sr.reveal('.titulo-principal', {duration:1000});
sr.reveal('.cabecalho', {duration:1000});
sr.reveal('.cta', {duration:1000});
sr.reveal('.linhas', {duration:2000});
sr.reveal('.mapa', {duration:2000});
sr.reveal('.recarga', {duration:2000});
sr.reveal('.formulario', {duration:2000});
sr.reveal('.contato', {duration:2000});


const backToTopButton= document.querySelector('button')

backToTopButton.onclick=()=>{
    document.documentElement.scroll({
        top: 0,
        behavior: "smooth"
    })
}
window.onscroll = ()=>{
    backToTopButton.hidden=!(document.documentElement.scrollTop>200)}


    document.addEventListener('DOMContentLoaded', function() {
        const msg = document.getElementById('btn');
    
        msg.addEventListener('click', function() {
            alert `Dados enviados com sucesso!`;
        });
    });

