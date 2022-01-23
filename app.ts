import { Caisse } from "./src/classes/caisse";
import { soldeView } from "./src/classes/soldeView";
import { Transaction } from "./src/classes/transaction";


//instanciation de la caisse(subject)
let caisse = new Caisse(10000);

//instanciation des views(observers)
let solde = new soldeView()

//inscription des views à la caisse
caisse.subscribeObserver(solde);

//Déclaration et Ecoute de l'événement sur le bouton ADD

let buttonADD = document.querySelector('#buttonSubmit') as HTMLButtonElement;

buttonADD.addEventListener('click',(e:Event)=>{
    e.preventDefault();

    //déclaration des différents champs du formulaire
    let name = document.querySelector('#name') as HTMLInputElement;
    let somme = document.querySelector('#somme') as HTMLButtonElement;
    let type = document.querySelector('#type') as HTMLSelectElement;
    let motif = document.querySelector('#motif') as HTMLInputElement;
    //instanciation de la transaction
    let transaction = new Transaction(
        name.value,
        parseInt(somme.value),
        type.value,
        motif.value
        )
    //  ajout de la transaction dans la caisse
    caisse.addTransac(transaction);
})

