const iptNovaTarefa = document.getElementById('texto-tarefa');
const btnCriarTarefa = document.getElementById('criar-tarefa');
const lstTarefas = document.getElementById('lista-tarefas');
const btnApagarTudo = document.getElementById('apaga-tudo');
const btnApagarFinalizados = document.getElementById('remover-finalizados');
let novasLi = ['Fazer exercícios do bloco 4','Segunda tarefa','Anotar dicas de JS'];
novasLi = [];
const btnSalvar = document.getElementById('salvar-tarefas');
const btnCima = document.getElementById('mover-cima');
const btnBaixo = document.getElementById('mover-baixo');
const btnMover = document.getElementById('mover');
const btnLiberar = document.getElementById('liberar-selecionado');
const btnRemover = document.getElementById('remover-selecionado');
let selecionado = null;


function redefinirLista(direcao,itemSelecionado) {
    let novaLista = [...lstTarefas.children];
    let i = itemSelecionado - 1;


    if(itemSelecionado >= 0 && itemSelecionado < lstTarefas.children.length){
        if(direcao == 'up') {
            if( itemSelecionado-1 != -1) {
                novaLista.splice(itemSelecionado-1,0,lstTarefas.children[itemSelecionado]);
                novaLista.splice(itemSelecionado+1,1);
                lstTarefas.children = novaLista;
                selecionado -= 1;
                populaLista(novaLista);
            }
        }else if(direcao == 'down') {
            novaLista.splice(itemSelecionado+2,0,lstTarefas.children[itemSelecionado]);
            novaLista.splice(itemSelecionado,1);
            lstTarefas.children = novaLista;
            selecionado += 1;
            populaLista(novaLista);
        }
    }
}

function getIndexOfSelectedItem() {
    for (let i=0; i < lstTarefas.children.length; i += 1) {     
        if( lstTarefas.children[i].classList.value.includes('selected') ){
            selecionado = i;
            return i;         
        }
    }
}

btnRemover.addEventListener('click', (evt) => {
    lstTarefas.children[selecionado].remove();
    selecionado = null;
});

btnLiberar.addEventListener('click', (evt) => {
    unSelectAll();
});

btnMover.addEventListener('click', (evt) => {
    console.log(evt.target.innerText);
    let direcao = 'nao definida';
    switch(evt.target.innerText) {
        case '⏫': direcao = 'up';break;
        case '⏬': direcao = 'down';
    }
    redefinirLista(direcao,getIndexOfSelectedItem());
});

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

let lstLi = lstTarefas.children;

function unSelectAll(){
    let lista = document.querySelectorAll('#lista-tarefas li');
    for (let i = 0; i < lista.length; i += 1){
        selecionado = null;
        lista[i].classList.remove('selected');   
    }
}



function defineEvents(){
    lstTarefas.addEventListener('click', (event) => {
        unSelectAll();
        event.target.classList.add('selected');
        selecionado = getIndexOfSelectedItem();
        
    }); 
    lstTarefas.addEventListener('dblclick', (event) => {
        event.target.classList.toggle('completed');
    });
}
defineEvents();


btnApagarTudo.addEventListener('click',() =>{
    lstTarefas.innerHTML = '';
});

btnApagarFinalizados.addEventListener('click',() =>{
    let tamanho = lstTarefas.childElementCount;
    let indices = [];

    for (let i=0; i < tamanho; i +=1) {        
        if (lstTarefas.children[i].classList.value != '') {
            if(lstTarefas.children[i].classList.value.includes('completed') ) {
                indices.push(i); 
             }
        }  
    }
   // console.info('meu aarray de i ',indices)
    let qtdRemovida = 0;
    indices.forEach((element,i) =>{
       // console.info('vou retirar o ',i)
         lstTarefas.children[element-qtdRemovida].remove();qtdRemovida +=1;
    });
});

btnSalvar.addEventListener('click', ()=>{
    let myArray = [];
    for (let i=0; i < lstTarefas.children.length; i += 1) {
        let newObject = {
            innerText: lstTarefas.children[i].innerText,
            classList: lstTarefas.children[i].classList.value
        }
        myArray.push(newObject);
        console.info(myArray)
    }
    let stringJson = JSON.stringify(myArray);        
    salvar(stringJson);

});

function salvar(stringJson){
    
    localStorage.setItem('tasks',stringJson);
}

function populaLista(objetos){
    lstTarefas.innerHTML = '';

    objetos.forEach(function(item,i){
        let li = document.createElement('li');
        li.innerText = item.innerText;
        li.setAttribute('class',item.classList);
        lstTarefas.apend(li);
        selecionado = getIndexOfSelectedItem();
    });
}
window.onload = () => {

    let myArray = [];
    for (let i=0; i < lstTarefas.children.length; i += 1) {
        let newObject = {
            innerText: lstTarefas.children[i].innerText,
            classList: lstTarefas.children[i].classList.value
        }
        myArray.push(newObject);
        //console.info(myArray)
    }

    if(localStorage.getItem('tasks')) {
        let objectJson = JSON.parse(localStorage.getItem('tasks'));
       // console.info('Este eh o tasks salvo: ', objectJson);
        populaLista(objectJson);
    } else {
       // console.info('Não tinha tasks salvo: ');
        populaLista(myArray);
        let stringJson = JSON.stringify(myArray);        
        salvar(stringJson);
    }

    let link = document.createElement('link');
    link.setAttribute('rel','stylesheet');
    link.setAttribute('href','style.css')
    
    document.getElementsByTagName('body')[0].append(link);
}