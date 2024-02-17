

//Adicionar nova tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const btnLimparTarefa = document.getElementById('btn-remover-todas')

const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const txtAreaAdicionarTarefa = document.querySelector('.app__form-textarea')
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
const ulTarefas = document.querySelector('.app__section-task-list')

function listarItemTarefa (tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botaoEdit = document.createElement('button')
    botaoEdit.classList.add('app_button-edit')

    const imgBotaoEdit = document.createElement('img')
    imgBotaoEdit.setAttribute('src','./imagens/edit.png')
    botaoEdit.append(imgBotaoEdit)

    li.append(svg)
    li.append(paragrafo)
    li.append(botaoEdit)

    return li
}


btnLimparTarefa.addEventListener('click', () =>{
    localStorage.clear()
    
})

btnAdicionarTarefa.addEventListener('click', () =>{
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault()
    const tarefa = {
        descricao: txtAreaAdicionarTarefa.value
    }
    tarefas.push(tarefa)
    const itemLista = listarItemTarefa(tarefa)
    ulTarefas.append(itemLista)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    txtAreaAdicionarTarefa.value=''
    formAdicionarTarefa.classList.add('hidden')
})


tarefas.forEach(tarefa => {
    const itemLista = listarItemTarefa(tarefa)
    ulTarefas.append(itemLista)   
});