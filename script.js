/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
let caselle= document.querySelectorAll(".checkbox");
aggiungiListener();
var conta=0;
var set= new Set();
function isClicked(event){
    if(event.currentTarget.getAttribute("src")=="images/checked.png"){
        conta--;
        event.currentTarget.src="images/unchecked.png";
       
        event.currentTarget.parentNode.style.removeProperty("background-color");
    }
    else{
    
   
     
     
     let padre= event.currentTarget.parentNode;
     let nonno= padre.parentNode;
     let attributo= nonno.getAttribute("id");
     
     let sezione=document.querySelectorAll("#"+attributo+" div .checkbox");
     for(let i=0;i<sezione.length;i++){
        if(sezione[i].getAttribute("src")=="images/checked.png"){
           conta--;
           sezione[i].setAttribute("src","images/unchecked.png");
         
           sezione[i].parentNode.style.removeProperty("background-color");
        }
     }
   

     event.currentTarget.parentNode.style.backgroundColor="#cfe3ff";
    
     event.currentTarget.src="images/checked.png"
     conta++;
    if(conta==3){
       generaRisposta();
       rimuoviListener();
    }
    }
      console.log("conta"+conta);
}




function rimuoviListener(){
    caselle.forEach(e=>{
        e.removeEventListener("click",isClicked);
    })
}



function aggiungiListener(){
    caselle.forEach(e=>{
        e.addEventListener("click", isClicked);
     })
}





 function generaRisposta(){
    
    let risultato;
    let griglie=document.querySelectorAll(".choice-grid");
    griglie.forEach(griglia=>{
        griglia.childNodes.forEach(e =>{
            if(e.nodeType!=Node.TEXT_NODE && e.style.backgroundColor){
                 if(set.size==0) //stiamo leggendo il primo elemento selezionato
                    risultato=RESULTS_MAP[e.dataset.choiceId]; //conserviamo il risultato corrispondente alla prima selezione in caso di pareggio
                 let flag= riempiSet(e.dataset.choiceId);
                 if(!flag){
                     risultato= RESULTS_MAP[e.dataset.choiceId]; //se flag è false significa che c'è un doppione e quindi sovrascriviamo *risultato* con il valore corrispondente al doppione
                     
                 }
               
            }
        })
    })
     stampaRisposta(risultato);
 }


 function riempiSet(elemento){
    if(set.has(elemento))
         return false;
    else
    set.add(elemento);
    return true;
    
 }

 function stampaRisposta(risultato){
    let titolo=document.createElement("p");
    titolo.innerHTML=risultato.title;
    let contenuto= document.createElement("div");
    contenuto.innerHTML=risultato.contents;
    let bottone= document.createElement("button");
    bottone.innerHTML="Ricomincia il quiz";
    bottone.addEventListener("click",ricaricaPagina);
    document.getElementById("spazio").appendChild(titolo);
    document.getElementById("spazio").appendChild(contenuto);
    document.getElementById("spazio").appendChild(bottone);
    
 }


 function ricaricaPagina(){
    let griglie=document.querySelectorAll(".choice-grid");
    griglie.forEach(griglia=>{
        griglia.childNodes.forEach(e =>{
            if(e.nodeType!=Node.TEXT_NODE)
              e.style.removeProperty("background-color");
        })
    })
    //
    let checkboxes= document.querySelectorAll(".checkbox");
    checkboxes.forEach(e=>{
         e.src="images/unchecked.png"
    })

    let spazio= document.querySelector("#spazio");
    while(spazio.hasChildNodes()){
        spazio.removeChild(spazio.firstChild);
    }
    conta=0;
    aggiungiListener();
 }


