const iptNovaTarefa = document.getElementById('texto-tarefa');
const btnCriarTarefa = document.getElementById('criar-tarefa');
const lstTarefas = document.getElementById('lista-tarefas');
const btnApagarTudo = document.getElementById('apaga-tudo');
const btnApagarFinalizados = document.getElementById('remover-finalizados');
const novasLi = ['Fazer exercícios do bloco 4','Segunda tarefa','Anotar dicas de JS'];
const btnSalvar = document.getElementById('salvar-tarefas');

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
        lista[i].classList.remove('selected');   
    }
}

function defineEvents(){
    lstTarefas.addEventListener('click', (event) => {
        unSelectAll();
        event.target.classList.add('selected');
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
        

        console.log(objetos)
        console.log(item);
        lstTarefas.append(li)
       // alert('');
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
        console.info(myArray)
    }

    if(localStorage.getItem('tasks')) {
        let objectJson = JSON.parse(localStorage.getItem('tasks'));
        console.info('Este eh o tasks salvo: ', objectJson);
        populaLista(objectJson);
    } else {
        console.info('Não tinha tasks salvo: ');
        populaLista(myArray);
        let stringJson = JSON.stringify(myArray);        
        salvar(stringJson);
    }

    let li = document.createElement('link');
    li.setAttribute('rel','stylesheet');
    li.setAttribute('href','style.css')
    
    document.getElementsByTagName('body')[0].append(li);
}