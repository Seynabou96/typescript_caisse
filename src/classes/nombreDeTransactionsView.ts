import { IObserver } from "../interfaces/observer"
import { Caisse } from "./caisse"

export class nombreDeTransactions implements IObserver {
    private td1:HTMLTableColElement
    private td2:HTMLTableColElement
    constructor() {
        this.td1= document.querySelector('#countDebit')
        this.td2= document.querySelector('#countCredit')
    }

    update(caisse: Caisse) {
        let transac = caisse.getTransac()
        let totaldebit = 0
        let totalcredit=0
        transac.forEach(trs=>{
            if(trs.getType()==='debit'){
                totaldebit++;
            }
            else{
                totalcredit++;
            }
        })
        this.td1.innerText=totaldebit.toString();
        this.td2.innerText=totalcredit.toString();
        console.log(totaldebit);
        
    }
}