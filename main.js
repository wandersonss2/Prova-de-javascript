const apiKey = "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"
const imgs = document.getElementById('img');
const img = document.querySelectorAll('#img img');

let idx = 0;

function carrossel() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 625}px)`;
}
setInterval(carrossel, 1800)

 /*função que fiz para validar o envio e também o status de carregamento*/
function enviaMensagem(){
    var mensagem = document.getElementById('mensagem')
    if(!mensagem.value)
    {
        mensagem.style.border = '2px solid red'
        return
    }
    mensagem.style.border = 'none'
    
    var aguarde = document.getElementById('aguarde')
    aguarde.innerHTML = 'Espera que to procurando...'

    aguarde.style.display = 'block'

    /*Usei os padrões que são fornecidos na documentação do proprio gpt https://platform.openai.com/docs/models,
     não alterei isso pois fiquei com medo de mudar e dar caquinha*/
    fetch("https://api.openai.com/v1/completions",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: mensagem.value,
            max_tokens: 2048,
            temperature: 0.5
        })
    })
    .then((response) => response.json())
    .then((response) => {
        let resposta = (response.choices[0]['text'])
        aguarde.style.display = 'none'
        mostrarPesquisa(mensagem.value,resposta)
    })
    .catch((e) =>{
        console.log('Error -> ',e)
    })
}

function mostrarPesquisa(mensagem,resposta){

    var historico = document.getElementById('historico')
    
    // a pergunta que é feita para o chat 
    var minhaMensagem = document.createElement('div')
    minhaMensagem.className = 'minha-mensagem'

    var mensagens = document.createElement('p')
    mensagens.className = 'minhas-mensagens'
    mensagens.innerHTML = mensagem

    minhaMensagem.appendChild(mensagens)
    historico.appendChild(minhaMensagem)

    
    //resposta do chat mostrando no quadro que foi montado
    var respostadaMensagem = document.createElement('div')
    respostadaMensagem.className = 'resposta-da-mensagem'

    var respostadoChat = document.createElement('p')
    respostadoChat.className = 'resposta-do-chat'
    respostadoChat.innerHTML = resposta

    respostadaMensagem.appendChild(respostadoChat)
    historico.appendChild(respostadaMensagem)

    //coisa besta so leva o texto para baixo automaticamente
    historico.scrollTop = historico.scrollHeight
}