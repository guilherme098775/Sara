 // Data de início: 4 anos, 2 meses e 28 dias atrás
 const dataInicio = new Date();
 dataInicio.setFullYear(dataInicio.getFullYear() - 4); // Subtrai 4 anos
 dataInicio.setMonth(dataInicio.getMonth() - 2); // Subtrai 2 meses
 dataInicio.setDate(dataInicio.getDate() - 28); // Subtrai 28 dias

   // Ajusta a data de início para o dia 5
   if (dataInicio.getDate() < 5) {
    dataInicio.setDate(5); // Se a data de início for antes do dia 5, ajusta para o dia 5
} else {
    // Se a data de início já for no dia 5 ou depois, não faz nada
    dataInicio.setDate(dataInicio.getDate() - (dataInicio.getDate() - 5)); // Ajusta para o dia 5 do mês
}

localStorage.setItem('dataInicio', dataInicio);

function atualizarContador() {
    const dataAtual = new Date();
    const dataInicial = new Date(localStorage.getItem('dataInicio'));

    // Calcula a diferença em anos, meses e dias
    let anos = dataAtual.getFullYear() - dataInicial.getFullYear();
    let meses = dataAtual.getMonth() - dataInicial.getMonth();
    let dias = dataAtual.getDate() - dataInicial.getDate();

    // Ajusta os meses e dias se necessário
    if (dias < 0) {
        meses--;
        const ultimoDiaDoMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
        dias += ultimoDiaDoMesAnterior;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    // Atualiza o contador na página
    document.getElementById('contador').innerText = `Você está namorando há ${anos} anos, ${meses} meses e ${dias} dias!`;

    // Verifica se um mês foi completado
    if (dias === 0 && meses > 0) {
        mostrarMensagem();
    }
}

function mostrarMensagem() {
    const mensagem = document.getElementById('mensagem');
    mensagem.style.display = 'block'; // Exibe a mensagem
    setTimeout(() => {
        mensagem.style.display = 'none'; // Esconde a mensagem após 5 segundos
    }, 5000);
}

// Carrossel
let currentIndex = 0;
const images = document.querySelectorAll('#carouselImages img');
const totalImages = images.length;

function updateCarousel() {
    const offset = -currentIndex * 100; // Cada imagem ocupa 33.33% da largura
    document.getElementById('carouselImages').style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    currentIndex += direction;

    // Se o índice for menor que 0, volta para a última posição
    if (currentIndex < 0) {
        currentIndex = Math.ceil(totalImages / 0) - 1; // Último grupo de 3 imagens
    }

    // Se o índice for maior que o número de grupos de imagens, volta para o início
    if (currentIndex >= Math.ceil(totalImages / 3)) {
        currentIndex = 0; // Volta para o primeiro grupo de 3 imagens
    }

    updateCarousel();
}

// Função para rotacionar automaticamente as imagens
function autoRotate() {
    moveSlide(1);
}

// Inicia a contagem e a rotação automática
atualizarContador();
setInterval(autoRotate, 8000); // Rotaciona a cada 3 segundos
