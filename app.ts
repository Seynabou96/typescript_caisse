import { Caisse } from "./src/classes/caisse";
import { etatCompte } from "./src/classes/etatCompteView";
import { listeTransactionView } from "./src/classes/listeTransactionView";
import { nombreDeTransactions } from "./src/classes/nombreDeTransactionsView";
import { personalArray } from "./src/classes/personalArray";
import { soldeView } from "./src/classes/soldeView";
import { Transaction } from "./src/classes/transaction";


//instanciation de la caisse(subject)
let caisse = new Caisse(10000);

//instanciation des views(observers)
let solde = new soldeView();
let listeTransaction = new listeTransactionView();
let nombreTransaction = new nombreDeTransactions();
let etat = new etatCompte();
let personnalAccount = new personalArray(); 

//inscription des views à la caisse
caisse.subscribeObserver(solde);
caisse.subscribeObserver(listeTransaction);
caisse.subscribeObserver(nombreTransaction);
caisse.subscribeObserver(etat);
caisse.subscribeObserver(personnalAccount);

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

