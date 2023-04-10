let qtd_cartas = Number (prompt('Com quantas cartas você deseja jogar? (de 4 a 14)'));

while(qtd_cartas%2 !== 0 || qtd_cartas > 14 || qtd_cartas < 4 || typeof(qtd_cartas) !== "number"){
qtd_cartas = Number (prompt('Com quantas cartas você deseja jogar? (de 4 a 14) (Números impares são inválidos!!)'));
}

const tipos_de_cartas = [
"<img src='./Imagens/bobrossparrot.gif' data-test='face-up-image' />", 
"<img src='./Imagens/explodyparrot.gif' data-test='face-up-image' />",
"<img src='./Imagens/fiestaparrot.gif' data-test='face-up-image' />",
"<img src='./Imagens/metalparrot.gif' data-test='face-up-image' />",
"<img src='./Imagens/revertitparrot.gif' data-test='face-up-image' />",
"<img src='./Imagens/tripletsparrot.gif' data-test='face-up-image' />",
"<img src='./Imagens/unicornparrot.gif' data-test='face-up-image' />",
];


const qtd_cartilhas = (qtd_cartas/2);
const cartas_aleatorias = [];

for(i=0;qtd_cartilhas > i;i++){
cartas_aleatorias.push(tipos_de_cartas [i]);
cartas_aleatorias.push(tipos_de_cartas [i]);
}

function comparador() { 
return Math.random() - 0.5; 
}
cartas_aleatorias.sort(comparador);


for(i=0;qtd_cartas > i;i++){

    const hub_inferior = document.querySelector(".hub-inferior");
    hub_inferior.innerHTML += `                
    <div onclick="virarCarta(this)" data-test="card" class="card">
        <div class="carta1 face">
            <img src="./Imagens/back.png" data-test="face-down-image" >
        </div>
        <div class="carta2 back-face face">
            ${cartas_aleatorias[i]}
        </div>
    </div>
`;
}

let cartavirada1 ;
let cartavirada2 ;
let contador = 0;
let cartas_certas = 0;

function desvirarCarta(carta) {

    const carta1 = carta.querySelector(".carta1");
    carta1.classList.remove("front");
    carta1.classList.remove("back-face");

    const carta2 = carta.querySelector(".carta2");
    carta2.classList.remove("back");
    carta2.classList.add("back-face");
}

function jogadaerrada () {

    desvirarCarta(cartavirada1);
    desvirarCarta(cartavirada2);

    cartavirada1 = null;
    cartavirada2 = null;
}

function alertfim (){
    alert (`Você ganhou em ${contador} jogadas!`);
    let playagain = prompt ('Gostaria de reiniciar a partida?');
    while (playagain !== "sim" && playagain !== "não"){
        prompt ('Gostaria de reiniciar a partida? (Responda com "sim" ou "não"');
        }
        if (playagain === "sim"){
        window.location.reload(true);
    }
}


function virarCarta(carta) {

    if (cartavirada2 || cartavirada1 === carta)
    return;

    const carta1 = carta.querySelector(".carta1");
    carta1.classList.add("front");
    carta1.classList.add("back-face");

    const carta2 = carta.querySelector(".carta2");
    carta2.classList.add("back");
    carta2.classList.remove("back-face");

    contador++;

    if (!cartavirada1){
    cartavirada1 = carta;
    return;
    }
    cartavirada2 = carta;
    
    if (cartavirada1.innerHTML !== cartavirada2.innerHTML){
    setTimeout (jogadaerrada,1000);
    }
    else {
    cartavirada1 = null;
    cartavirada2 = null;
    cartas_certas++;
    }

    

    if (cartas_certas === (qtd_cartas/2)){
        setTimeout (alertfim , 500);
    }
}
