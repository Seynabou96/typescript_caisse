import { IObserver } from "../interfaces/observer";
import { Caisse } from "./caisse";

export class personalArray implements IObserver {
    private table: HTMLTableElement;

    constructor() {
        this.table = document.querySelector('#cumulesSommes')
    }

    update(caisse: Caisse) {
        let transac = caisse.getTransac();
        let personnesArray = [];
        transac.forEach(trs => {
            let db = personnesArray.filter(element => element.name === trs.getName()).length;
            if (db === 0) {
                let personne = {
                    name: trs.getName(),
                    debit: (trs.getType() === 'debit') ? trs.getSomme() : 0,
                    credit: (trs.getType() === 'credit') ? trs.getSomme() : 0
                };
                personnesArray.push(personne)
            }
            else {
                for (const ele of personnesArray) {
                    let index = personnesArray.findIndex(pers => pers.name === trs.getName())
                    if (trs.getType() === 'debit') {
                        personnesArray[index].debit += trs.getSomme();
                    }
                    else {
                        personnesArray[index].credit += trs.getSomme();
                    }
                }
            }
            this.table.innerHTML = `
            <table id="cumulesSommes">
                <thead>
                    <th>Personnel</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </thead>
            </table>`
            for (const personne of personnesArray) {
                let tr = document.createElement('tr')
                let td1 = document.createElement('td')
                let td2 = document.createElement('td')
                let td3 = document.createElement('td')
                td1.innerText = personne.name;
                td2.innerText = personne.debit.toString();
                td3.innerText = personne.credit.toString();
                this.table.append(tr)
                tr.append(td1)
                tr.append(td2)
                tr.append(td3)
            }
        })

    }
}