var tela = document.getElementById("tela");
var c = tela.getContext("2d");
			
var telaX = 1200;//Tamanho da tela no eixo X.
var telaY = 700;//Tamanho da tela no eixo Y.
			
var raio = 40;//tamanho do raio do alvo.
var alvoX;//Posição do alvo em relação ao eixo X.
var alvoY;//Posição do alvo em relação ao eixo Y.

var restartScreen = new Image();
restartScreen.src = "http://i.imgur.com/hDMhppw.png?1";
			
var tempoAlvo = 300;//Variável responsável pela velocidade de mudança do alvo em (milisegundos).
var contClick = 0;

var cor = function(color){
	c.fillStyle = color;
};
			
var circulo = function(x,y,raio){
	c.beginPath();
	c.arc(x,y,raio,0,2*Math.PI);
	c.fill();
};
var desenhaTela = function(){
	cor("white");
	c.fillRect(0,0,telaX,telaY);
}			
var desenhaMoldura = function(){
	c.strokeRect(0,0,telaX,telaY);
}
			
var desenhaAlvo = function(x, y) {
    cor("white");
    circulo(x, y, raio);
    cor("red");
    circulo(x, y, raio-10);
    cor("white");
    circulo(x, y, raio-20);
    cor("red");
    circulo(x, y, raio-30);
};
		
var acerto = function(evento){
	var mouseX = evento.pageX - tela.offsetLeft;
	var mouseY = evento.pageY - tela.offsetTop;
	contClick++;

	if((mouseX > alvoX - raio) && (mouseX < alvoX + raio) && (mouseY > alvoY - raio) && (mouseY < alvoY + raio)){
		clearInterval(intervalId);
		alvoX = null;
		alvoY = null;
		limpa();
		desenhaTela();
		desenhaMoldura();
		alert("Parabéns, vc acertou o alvo!\nCliques até acertar: "+contClick+" clique(s).");
		c.drawImage(restartScreen,0,0,telaX,telaY);
		contClick = 0;
	}
};
			
var sorteia = function(reach){
	return Math.round(Math.random() * ((reach) - 1) + 1);
};

var limpa = function(){
	c.clearRect(0,0,telaX,telaY);
};
			
var desenha = function() {
	limpa();
	alvoX = sorteia(telaX);
	alvoY = sorteia(telaY);
	desenhaTela();
	desenhaAlvo(alvoX, alvoY);
	desenhaMoldura();
};

desenhaTela();			
desenhaMoldura();
var intervalId = setInterval(desenha, tempoAlvo);
tela.onclick = acerto;