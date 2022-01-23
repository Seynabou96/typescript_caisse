import { IObserver } from "../interfaces/observer";
import { Caisse } from "./caisse";

export class listeTransactionView implements IObserver {
    private ul: HTMLUListElement;
  
    constructor() {
        this.ul = document.querySelector('.ulListeTransac')
      
    }

    update(caisse: Caisse) {
        let transac = caisse.getTransac()
        this.ul.innerHTML=''
        transac.forEach(trsc => {
            let liHtml = document.createElement('li');
            let headHtml = document.createElement('h4');
            let paraHtml = document.createElement('p');
            liHtml.className = trsc.getType()
            headHtml.innerText = trsc.getType() === 'debit' ? 'Debit' : 'Credit';
            paraHtml.innerHTML = trsc.setText()
            this.ul.append(liHtml)
            liHtml.append(headHtml)
            liHtml.append(paraHtml)
        })

    }
}