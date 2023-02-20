document.getElementById('criar-tarefa').addEventListener('click', () => {
    let novaTarefaHtml = document.getElementById('texto-tarefa');
    let novoElemento = document.createElement('li');
    novoElemento.textContent = novaTarefaHtml.value;

    (novaTarefaHtml.value) ? document.getElementById('lista-tarefas').append(novoElemento) : alert('Insira um valor válido!');

    novaTarefaHtml.value = '';
});