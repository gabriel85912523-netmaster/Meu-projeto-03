
document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        ".hero-conteudo, .titulo-secao, .jogo, .destaque-conteudo"
    );

    const observador = new IntersectionObserver((entradas, observer) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

                observer.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elementos.forEach(elemento => {
        elemento.classList.add("animar-entrada");
        observador.observe(elemento);
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", evento => {

            const destino = document.querySelector(
                link.getAttribute("href")
            );

            if (destino) {

                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    const cabecalho = document.querySelector(".cabecalho");

    function atualizarCabecalho() {

        if (!cabecalho) return;

        if (window.scrollY > 50) {
            cabecalho.classList.add("rolagem");
        } else {
            cabecalho.classList.remove("rolagem");
        }

    }

    window.addEventListener("scroll", atualizarCabecalho);

    atualizarCabecalho();

    const secoes = document.querySelectorAll("main section[id]");

    const linksMenu = document.querySelectorAll(".menu a");

    const observadorMenu = new IntersectionObserver(entradas => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                linksMenu.forEach(link => {

                    link.classList.remove("ativo");

                    if (
                        link.getAttribute("href") ===
                        `#${entrada.target.id}`
                    ) {
                        link.classList.add("ativo");
                    }

                });

            }

        });

    }, {
        threshold: 0.5
    });

    secoes.forEach(secao => {
        observadorMenu.observe(secao);
    });


    
    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Meus Games. Todos os direitos reservados.`;

    }

    const imagens = document.querySelectorAll(".imagem-jogo img");

    imagens.forEach(imagem => {

        imagem.addEventListener("error", () => {

            imagem.classList.add("imagem-erro");

            console.warn(
                "Não foi possível carregar a imagem:",
                imagem.src
            );

        });

    });
    const botoes = document.querySelectorAll(".botao");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            botao.classList.add("botao-clicado");

            setTimeout(() => {
                botao.classList.remove("botao-clicado");
            }, 300);

        });

    });


    console.log("Meus Games carregado com sucesso!");

})