const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const bannerImg = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startStopBt = document.querySelector('#start-pause')
const iconeCtaBt = document.querySelector('.app__card-primary-butto-icon')
const labelStartStopBt = document.querySelector('#start-pause span')
const displayTempo = document.getElementById('timer')

//musica fundo
const toggleMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop=true

//Som Start
const soundStart = new Audio('./sons/play.wav')
const soundFinish = new Audio('./sons/beep.mp3')
const soundPaused = new Audio('./sons/pause.mp3')


let tempoDecorridoEmSegundos = 1500
let intervaloId = null

toggleMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

})


function alterarContexto(contexto){
    mostrarTempo()

    botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    bannerImg.setAttribute('src',`./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            
            break
        case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break
        case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície.<br>
               <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            break
                
        default:
            
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //soundFinish.play()
        alert ('Tempo finalizado!')
        zerarTemporizador()
        tempoDecorridoEmSegundos = 5
        mostrarTempo()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostrarTempo()
    console.log('Temporizador' + tempoDecorridoEmSegundos)
}

startStopBt.addEventListener('click', () =>{
    temporizador()
})

function temporizador(){
    if(intervaloId){
        zerarTemporizador()
        soundPaused.play()
        labelStartStopBt.textContent = "Retomar"
        iconeCtaBt.setAttribute('src', `imagens/play_arrow.png`)

        return
    }
    soundStart.play()
    iconeCtaBt.setAttribute('src', `imagens/pause.png`)
    labelStartStopBt.textContent = "Pausar"

    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerarTemporizador(){
    clearInterval(intervaloId)
    labelStartStopBt.textContent = "Começar"
    intervaloId = null

}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    displayTempo.innerHTML = `${tempoFormatado}`
    console.log(tempoFormatado)
}

mostrarTempo()