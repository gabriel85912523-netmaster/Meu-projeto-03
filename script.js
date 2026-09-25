
document.addEventListener("DOMContentLoaded", () => {

    const botaoQuiz = document.querySelector(".quiz .botao");

    const niveis = {

        facil: [
            {
                pergunta: "1. Quem é o protagonista de Red Dead Redemption 2?",
                alternativas: ["John Marston", "Arthur Morgan", "Dutch", "Micah Bell"],
                correta: 1
            },
            {
                pergunta: "2. Qual é o nome da gangue de Arthur?",
                alternativas: ["Gangue de Blackwater", "Gangue dos O'Driscoll", "Gangue Van der Linde", "Gangue de Saint Denis"],
                correta: 2
            },
            {
                pergunta: "3. Em que ano se passa a história principal?",
                alternativas: ["1875", "1899", "1907", "1911"],
                correta: 1
            },
            {
                pergunta: "4. Quem é o líder da gangue Van der Linde?",
                alternativas: ["Hosea Matthews", "Arthur Morgan", "John Marston", "Dutch van der Linde"],
                correta: 3
            },
            {
                pergunta: "5. Qual é o nome do protagonista?",
                alternativas: ["Arthur Morgan", "Buell", "Rufus", "Jack Marston"],
                correta: 0
            }
        ],

        medio: [
            {
                pergunta: "1. Qual é o nome do acampamento da gangue no início do jogo?",
                alternativas: ["Horseshoe Overlook", "Colter", "Shady Belle", "Clemens Point"],
                correta: 1
            },
            {
                pergunta: "2. Qual é o nome do irmão de John Marston?",
                alternativas: ["Sean MacGuire", "Javier Escuella", "John não tem irmão mencionado na história", "Lenny Summers"],
                correta: 2
            },
            {
                pergunta: "3. Quem é o velho amigo e conselheiro de Dutch?",
                alternativas: ["Micah Bell", "Hosea Matthews", "Bill Williamson", "Charles Smith"],
                correta: 1
            },
            {
                pergunta: "4. Qual é o nome da cidade onde ocorre o grande assalto que dá errado?",
                alternativas: ["Valentine", "Rhodes", "Blackwater", "Annesburg"],
                correta: 2
            },
            {
                pergunta: "5. Qual é o nome do filho de John Marston?",
                alternativas: ["Jack Marston", "Isaac Morgan", "Lenny Marston", "Sean Marston"],
                correta: 0
            }
        ],

        dificil: [
            {
                pergunta: "1. Qual é o nome da ilha onde Arthur e alguns membros da gangue ficam após o assalto ao banco de Saint Denis?",
                alternativas: ["Guarma", "Cuba", "Sisika", "New Austin"],
                correta: 0
            },
            {
                pergunta: "2. Qual é o nome do cavalo especial associado à missão de Hamish Sinclair?",
                alternativas: ["Rufus", "Buell", "Rachel", "Old Boy"],
                correta: 1
            },
            {
                pergunta: "3. Qual é o nome do banco que a gangue tenta assaltar em Saint Denis?",
                alternativas: ["Lemoyne National Bank", "Valentine Bank", "Blackwater Bank", "Rhodes Bank"],
                correta: 0
            },
            {
                pergunta: "4. Qual é o nome do médico que atende Arthur em Saint Denis?",
                alternativas: ["Dr. Barnes", "Dr. Smith", "Dr. Joseph R. Barnes", "O jogo não informa o nome dele"],
                correta: 3
            },
            {
                pergunta: "5. Qual é o nome da esposa de John Marston?",
                alternativas: ["Mary Linton", "Abigail Roberts", "Molly O'Shea", "Karen Jones"],
                correta: 1
            }
        ]

    };

    let nivelAtual = "";
    let perguntas = [];
    let perguntaAtual = 0;
    let pontuacao = 0;
    const modal = document.createElement("div");

    modal.id = "modal-quiz";

    modal.innerHTML = `
        <div class="quiz-caixa">

            <button class="quiz-fechar" aria-label="Fechar quiz">
                &times;
            </button>

            <p class="subtitulo">DESAFIO SOBRE RED DEAD REDEMPTION 2</p>

            <div id="quiz-niveis">

                <h2>Escolha a dificuldade</h2>

                <p class="quiz-instrucao">
                    Selecione um nível para começar seu desafio.
                </p>

                <button class="quiz-nivel" data-nivel="facil">
                    Fácil
                    <span>5 perguntas</span>
                </button>

                <button class="quiz-nivel" data-nivel="medio">
                    Médio
                    <span>5 perguntas</span>
                </button>

                <button class="quiz-nivel" data-nivel="dificil">
                    Difícil
                    <span>5 perguntas</span>
                </button>

            </div>

            <div id="quiz-jogo" style="display:none;">

                <h2 id="quiz-pergunta"></h2>

                <p id="quiz-progresso"></p>

                <div id="quiz-alternativas"></div>

                <p id="quiz-feedback" aria-live="polite"></p>

                <button id="quiz-proximo" class="botao" disabled>
                    Próxima pergunta
                </button>

            </div>

            <div id="quiz-resultado" style="display:none;">

                <h2>Quiz concluído!</h2>

                <p id="quiz-pontuacao"></p>

                <p id="quiz-mensagem"></p>

                <button id="quiz-reiniciar" class="botao">
                    Jogar novamente
                </button>

                <button id="quiz-voltar" class="botao">
                    Escolher outro nível
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    
    const telaNiveis = document.querySelector("#quiz-niveis");
    const telaJogo = document.querySelector("#quiz-jogo");
    const telaResultado = document.querySelector("#quiz-resultado");

    const perguntaElemento = document.querySelector("#quiz-pergunta");
    const progressoElemento = document.querySelector("#quiz-progresso");
    const alternativasElemento = document.querySelector("#quiz-alternativas");
    const feedbackElemento = document.querySelector("#quiz-feedback");

    const botaoProximo = document.querySelector("#quiz-proximo");
    const botaoFechar = document.querySelector(".quiz-fechar");
    const botaoReiniciar = document.querySelector("#quiz-reiniciar");
    const botaoVoltar = document.querySelector("#quiz-voltar");

    const estilo = document.createElement("style");

    estilo.textContent = `
        #modal-quiz {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .quiz-caixa {
            position: relative;
            background: #161616;
            border: 1px solid #d32f2f;
            border-radius: 8px;
            padding: 35px;
            width: 100%;
            max-width: 650px;
            max-height: 90vh;
            overflow-y: auto;
            text-align: center;
            box-shadow: 0 0 30px rgba(211, 47, 47, 0.2);
        }

        .quiz-caixa h2 {
            font-size: 1.7rem;
            margin: 15px 0;
            color: white;
        }

        .quiz-instrucao {
            color: #bbb;
            margin-bottom: 25px;
        }

        .quiz-nivel {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 18px;
            margin-bottom: 15px;
            background: #252525;
            border: 1px solid #444;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.3s;
        }

        .quiz-nivel span {
            font-size: 0.85rem;
            color: #aaa;
            font-weight: normal;
            margin-top: 5px;
        }

        .quiz-nivel:hover {
            background: #8b0000;
            border-color: #d32f2f;
            transform: translateY(-3px);
        }

        #quiz-progresso {
            color: #aaa;
            margin-bottom: 20px;
        }

        #quiz-alternativas {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .quiz-alternativa {
            background: #252525;
            border: 1px solid #444;
            color: white;
            padding: 14px;
            cursor: pointer;
            font-size: 1rem;
            text-align: left;
            border-radius: 4px;
            transition: 0.3s;
        }

        .quiz-alternativa:hover:not(:disabled) {
            background: #8b0000;
            border-color: #d32f2f;
        }

        .quiz-alternativa:disabled {
            cursor: default;
        }

        .quiz-alternativa.correta {
            background: #14532d;
            border-color: #22c55e;
        }

        .quiz-alternativa.errada {
            background: #7f1d1d;
            border-color: #ef4444;
        }

        #quiz-feedback {
            margin: 20px 0;
            font-weight: bold;
        }

        .quiz-fechar {
            position: absolute;
            right: 15px;
            top: 10px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }

        #quiz-pontuacao {
            color: #d32f2f;
            font-size: 1.5rem;
            font-weight: bold;
            margin: 20px 0;
        }

        #quiz-mensagem {
            color: #ccc;
            margin-bottom: 25px;
        }

        #quiz-reiniciar,
        #quiz-voltar {
            margin: 5px;
        }

        #quiz-proximo:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            transform: none;
        }

        @media (max-width: 500px) {
            .quiz-caixa {
                padding: 25px 18px;
            }

            .quiz-caixa h2 {
                font-size: 1.3rem;
            }
        }
    `;

    document.head.appendChild(estilo);

    document.querySelectorAll(".quiz-nivel").forEach(botao => {

        botao.addEventListener("click", () => {

            nivelAtual = botao.dataset.nivel;

            perguntas = niveis[nivelAtual];

            perguntaAtual = 0;
            pontuacao = 0;

            telaNiveis.style.display = "none";
            telaResultado.style.display = "none";
            telaJogo.style.display = "block";

            mostrarPergunta();

        });

    });

    function mostrarPergunta() {

        const pergunta = perguntas[perguntaAtual];

        perguntaElemento.textContent = pergunta.pergunta;

        progressoElemento.textContent =
            `Nível ${nivelAtual.toUpperCase()} | Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

        alternativasElemento.innerHTML = "";

        feedbackElemento.textContent = "";

        botaoProximo.disabled = true;

        botaoProximo.textContent =
            perguntaAtual === perguntas.length - 1
                ? "Ver resultado"
                : "Próxima pergunta";

        pergunta.alternativas.forEach((alternativa, indice) => {

            const botao = document.createElement("button");

            botao.classList.add("quiz-alternativa");

            botao.textContent = alternativa;

            botao.addEventListener("click", () => {
                responderPergunta(indice);
            });

            alternativasElemento.appendChild(botao);

        });

    }

    function responderPergunta(indiceEscolhido) {

        const pergunta = perguntas[perguntaAtual];

        const botoes = document.querySelectorAll(
            ".quiz-alternativa"
        );

        botoes.forEach((botao, indice) => {

            botao.disabled = true;

            if (indice === pergunta.correta) {
                botao.classList.add("correta");
            }

            if (
                indice === indiceEscolhido &&
                indice !== pergunta.correta
            ) {
                botao.classList.add("errada");
            }

        });

        if (indiceEscolhido === pergunta.correta) {

            pontuacao++;

            feedbackElemento.textContent = "Resposta correta!";

            feedbackElemento.style.color = "#22c55e";

        } else {

            feedbackElemento.textContent =
                "Resposta incorreta! A resposta certa está em verde.";

            feedbackElemento.style.color = "#ef4444";

        }

        botaoProximo.disabled = false;

    }

    botaoProximo.addEventListener("click", () => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    });
    function mostrarResultado() {

        telaJogo.style.display = "none";
        telaResultado.style.display = "block";

        document.querySelector("#quiz-pontuacao").textContent =
            `Você acertou ${pontuacao} de ${perguntas.length}!`;

        let mensagem = "";

        if (pontuacao === 5) {

            mensagem = "Lendário! Você domina esse nível do Velho Oeste!";

        } else if (pontuacao >= 3) {

            mensagem = "Muito bem! Você conhece bastante o jogo!";

        } else {

            mensagem = "Continue explorando o universo de Red Dead Redemption 2!";

        }

        document.querySelector("#quiz-mensagem").textContent = mensagem;

    }


    botaoReiniciar.addEventListener("click", () => {

        perguntaAtual = 0;
        pontuacao = 0;

        telaResultado.style.display = "none";
        telaJogo.style.display = "block";

        mostrarPergunta();

    });

    botaoVoltar.addEventListener("click", () => {

        telaResultado.style.display = "none";
        telaJogo.style.display = "none";
        telaNiveis.style.display = "block";

    });

    botaoQuiz.addEventListener("click", () => {

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";

        telaNiveis.style.display = "block";
        telaJogo.style.display = "none";
        telaResultado.style.display = "none";

    });

    function fecharQuiz() {

        modal.style.display = "none";

        document.body.style.overflow = "";

    }

    botaoFechar.addEventListener("click", fecharQuiz);

    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {
            fecharQuiz();
        }

    });

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {
            fecharQuiz();
        }

    });

});