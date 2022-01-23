import { IObserver } from "../interfaces/observer"
import { Caisse } from "./caisse"

export class soldeView implements IObserver {
    private div:HTMLDivElement
    
    constructor() {
        this.div = document.querySelector('#divSolde')
      
    }

    update(caisse: Caisse) {
        let solde = caisse.getSolde()
        this.div.innerHTML=solde.toString()
    }
}