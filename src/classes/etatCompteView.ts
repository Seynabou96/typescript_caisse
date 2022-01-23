import { IObserver } from "../interfaces/observer"
import { Caisse } from "./caisse"

export class etatCompte implements IObserver {
    private div:HTMLDivElement

    constructor() {
        this.div = document.querySelector('#etatCompte')
    }

    update(caisse: Caisse) {
        this.div.className='debit'
        let solde = caisse.getSolde()
        if(solde<0){
            this.div.className='debit'
            this.div.innerText='A découvert'
        }
        else{
            this.div.className='credit'
            this.div.innerText='A crédit'
        }
    }
}