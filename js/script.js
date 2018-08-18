/*Variaveis Globais*/
		//Variavel Qtd Tarefa
		var qtdtarefa = document.getElementById("vartarefa");
		//Id do "Caderno"
		var caderno = document.querySelector( '#caderno' );
		//ID do Conteudo
		var conteudo = document.getElementById("conteudo");
		//Seleciona a Tarefa Clicada
		var tarefaClick = document.querySelector("div");
		//Input do Título
		var inputTar = document.getElementById('tarinput');
		//Input da Descrição
		var inputDesc = document.getElementById('descinput');



/*Variavel de Tarefas Criadas salvas local*/
function numTarefas(){
	if (localStorage.qtdtarefa) {
	localStorage.qtdtarefa = Number(localStorage.qtdtarefa)+1;
	}else{localStorage.qtdtarefa = 1;}

}







//Assim que cria uma nova tarefa o JS Seleciona a Div do Título e Conteúdo com o ID Criado.	
function selecionaTarefa(){
//NOVA TAREFA TITULO
	var inputConteudo = document.getElementById(localStorage.qtdtarefa).innerHTML;
	inputTar.onkeyup = function(){
			document.getElementById(localStorage.qtdtarefa).innerHTML = inputTar.value;
		}
	document.getElementById('tarinput').value = inputConteudo; 
//NOVA TAREFA DESC
	var numero = localStorage.qtdtarefa;
		var descid = document.getElementById("desc" + numero + "").innerHTML;
		inputDesc.onkeyup = function(){
		document.getElementById("desc" + numero + "").innerHTML = inputDesc.value;
		}
		document.getElementById('descinput').value = descid;
//Salva
storestate();
}








//Quando clica no título da tarefa abre a Guia para Edição com o Conteúdo Préviamente adicionado no Input
function qual_tarefa(clicked_id){
	
    var tarefas = clicked_id;
	var inputConteudo = document.getElementById(clicked_id).childNodes[0].nodeValue;
	console.log(localStorage.qtdtarefa);
	
	/*Altera o Valor da Div Clicada pelo Valor Adicionado no Input*/
	inputTar.onkeyup = function(){
			document.getElementById(tarefas).childNodes[0].nodeValue = inputTar.value;
		}
	/*Muda o Valor do Input com a ID Clicada*/
	document.getElementById('tarinput').value = inputConteudo; 
	/*Abre a job para Edição*/
	openNav();
//Salva
storestate();
}






//Função para pegar a Descrição da tarefa e direcionar para o Segundo Input.
function pegaDesc(clicked_id){
	var numero = clicked_id
	var descid = document.getElementById("desc" + numero + "").innerHTML;
	
	/*Altera o Valor da Div Clicada pelo Valor Adicionado no Input*/
	inputDesc.onkeyup = function(){
	document.getElementById("desc" + numero + "").innerHTML = inputDesc.value;
	}
	/*Muda o Valor do Input com a ID Clicada*/
	document.getElementById('descinput').value = descid;
//Salva
storestate();
}
		
		
		
		

		
		
		
		
//Cria uma Nó novo do Título da Tarefa e Descrição na ID Selecionada
function novaTarefa() {
	
	//Título da Tarefa
		//Informa que o elemento é uma DIV
		var node = document.createElement("div");
		//Adiciona o Atributo id="Número da variavel tarefas"
		node.setAttribute("id", "" + localStorage.qtdtarefa + "");
		//Adiciona o Atributo onClick="para realizar as funções"
		node.setAttribute("onClick", "qual_tarefa(this.id);pegaDesc(this.id);");
		//Adiciona uma Classe job à div
		node.setAttribute("class", "job");
		node.setAttribute("draggable", "true");
		node.setAttribute("ondragstart", "drag(event)");
		node.setAttribute("ondrop", "return false");
		node.setAttribute("ondragover", "dntDrop(event)");
		node.focus();
		/*Cria uma Tarefa Nova*/
		var textnode = document.createTextNode('');
		node.appendChild(textnode);
		
	//Descrição da Tarefa
		var desc = document.createElement("div");
		desc.setAttribute("id", "desc" + localStorage.qtdtarefa + "");
		desc.setAttribute("class", "desctarefa");
		desc.setAttribute("draggable", "true");
		desc.focus();
		/*Cria uma Tarefa Nova*/
		var textnode = document.createTextNode('');
		desc.appendChild(textnode);

		
		/*Adiciona na ID #Caderno a div título e descrição */
		document.getElementById("listagem").appendChild(node);
		document.getElementById("listagem").appendChild(desc);
		
		/*Log do Número de Tarefas*/
		console.log(localStorage.qtdtarefa);
		//Salva
		storestate();
}
		
		
		
		
		
		
		
		
//SALVAR HISTÓRICO DE TAREFAS
document.addEventListener( 'DOMContentLoaded', retrievestate, false );
function storestate() {
	localStorage.caderno = caderno.innerHTML;
	localStorage.qtdtarefa = localStorage.qtdtarefa;
};

function retrievestate() {
	if ( localStorage.caderno ) {
	caderno.innerHTML = localStorage.caderno;
	localStorage.qtdtarefa = localStorage.qtdtarefa;
	//APAGAR HISTÓRICO DO JS
	localStorage.clear();
	
	}
};
		
		
		
		

		
	

/*Arrastar e Soltar Tarefas*/
/*Arrastar para dentro de uma tarefa para Criar Sub-Tarefas de uma Tarefa Mãe*/
/*Possibilidade de Criar Sub Tarefas de SubTarefas basta arrastar na ordem*/


//Impossibilita o Drop em outra área
	function dntDrop(e) {
    return false;
}
//Permite o drop de itens
	function allowDrop(e) {
    e.preventDefault();
}
//Função para arrastar o conteúdo e transferi-lo
function drag(e) {
    e.dataTransfer.setData("text/html", e.target.id);
}

//Função para soltar o conteúdo e criar um nó.
function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text/html");
    e.target.append(document.getElementById(data));
}
	
	
	
	/*Abrir e fechar job lateral*/
	function openNav() {
		//Checa a Largura da página
		//Se Igual ou menor que 1366
		if (window.matchMedia("(max-width: 990px)").matches) {
		caderno.style.width = "0vw";
		caderno.style.filter = "opacity(0)";
		caderno.style.display = "none";
		document.getElementById("addTarefa").style.width = "70vw";
		document.getElementById("addTarefa").style.margin = "20px 15vw";
		//Se Maior Que 1366
		}else if(window.matchMedia("(max-width: 1366px)").matches) {
		caderno.style.width = "30vw";
		document.getElementById("addTarefa").style.width = "62vw";
		document.getElementById("addTarefa").style.margin = "20px 2vw 0px 0px";
		}else{
		caderno.style.width = "53vw";
		document.getElementById("addTarefa").style.width = "41vw";
		document.getElementById("addTarefa").style.margin = "20px 2vw 0px 0px";
		}
		caderno.style.margin = "20px 0px 0px 2vw";
		conteudo.style.filter = "opacity(1)";
		conteudo.style.transition = "1s";
		caderno.style.transition = "1s";
		storestate();
	}

	function closeNav() {
		//Checa a Largura da página
		//Se Igual ou menor que 1366
		if (window.matchMedia("(max-width: 990px)").matches) {
			caderno.style.width = "70vw";
			caderno.style.filter = "opacity(1)";
			caderno.style.display = "inline-block";
			document.getElementById("addTarefa").style.width = "0vw";

		//Se Maior Que 1366
		}else if(window.matchMedia("(max-width: 1366px)").matches) {
			caderno.style.width = "70vw";
			caderno.style.filter = "opacity(1)";
			caderno.style.display = "inline-block";
			document.getElementById("addTarefa").style.width = "0vw";
		}else{
			caderno.style.width = "70vw";
			caderno.style.filter = "opacity(1)";
			caderno.style.display = "inline-block";
			document.getElementById("addTarefa").style.width = "0vw";
		}
		caderno.style.margin = "20px 0px 0px 15vw";
		conteudo.style.filter = "opacity(0)";
		conteudo.style.transition = "1s";
		caderno.style.transition = "3s";
		storestate();
	}
	


	
	
	
//Observa a Largura do Navegador
window.addEventListener("resize", function() {
	if (window.matchMedia("(max-width: 1366px)").matches) {
		console.log("A Tela é menor ou igual a 1366");
	} else {
		console.log("A Tela é maior que 1366");
	
	}
});	
	
	
	
	
	
	

