const inputTarefas = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
};

function limpaInput(){
    inputTarefas.value='';
    inputTarefas.focus();
};

inputTarefas.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        if(!inputTarefas.value) return;
        criaTarefa(inputTarefas.value)
    }
})

btnTarefa.addEventListener('click', () => {
    if(!inputTarefas.value) return;
    criaTarefa(inputTarefas.value)
})

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput()
    btnApagar(li);
    salvaTarefas();

}

function btnApagar(li){
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    li.appendChild(btnApagar);
}

document.addEventListener('click', (e)=>{
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvaTarefas();
    }
}
)

function salvaTarefas() {
    const liTarefas = document.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let textoTarefas = tarefa.innerText;
        textoTarefas = textoTarefas.replace('Apagar', ' ').trim();
        listaDeTarefas.push(textoTarefas);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefa() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas) || [];

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefa()