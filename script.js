const iptNovaTarefa = document.getElementById('texto-tarefa');
const btnCriarTarefa = document.getElementById('criar-tarefa');
const lstTarefas = document.getElementById('lista-tarefas');
const novasLi = ['Fazer exercícios do bloco 4','Segunda tarefa','Anotar dicas de JS'];

btnCriarTarefa.addEventListener('click', () => {
    let novoElemento = document.createElement('li');
    novoElemento.textContent = iptNovaTarefa.value;

    (iptNovaTarefa.value) ? lstTarefas.append(novoElemento) : alert('Insira um valor válido!');

    iptNovaTarefa.value = '';
});

novasLi.forEach((item,index)=>{
    let li = document.createElement('li');
    li.innerText = item;
    lstTarefas.append(li)
});

console.log(lstTarefas.children)
let lstLi = lstTarefas.children;
console.log(lstLi)
console.log(novasLi)

function unSelectAll(){
    let lista = document.querySelectorAll('#lista-tarefas li');
    for (let i = 0; i < lista.length; i += 1){
        lista[i].classList.remove('selected');   
    }
}

for(let i=0; i < lstLi.length; i += 1) {
    lstLi[i].addEventListener('click',(event) =>{
        unSelectAll();
        event.target.classList.add('selected');
    });
}
