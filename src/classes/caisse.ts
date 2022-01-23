import { IObserver } from "../interfaces/observer";
import { ISubject } from "../interfaces/subject";
import { Transaction } from "./transaction";


export class Caisse implements ISubject{
    private solde : number=0;
    private transactions : Transaction[]=[];
    private observer:IObserver[]=[];
    constructor(solde : number) {
        this.solde = solde;
        this.notifyObserver()
    }
    subscribeObserver(obs: IObserver) {
        this.observer.push(obs)
        console.log('subscribe');
    }
    unSubscribeObserver(obs: IObserver) {
        let index = this.observer.indexOf(obs)
        this.observer.splice(index,1)
        console.log(('unsubscribe'));
    }
    notifyObserver() {
        this.observer.forEach(obs=>obs.update(this))
        console.log('notify');
    }
    addTransac(transac: Transaction){
        this.transactions.push(transac);
        console.log('addtransaction');
        if (transac.getType() === 'debit') {
            this.solde -= transac.getSomme();
        }
        else{
            this.solde += transac.getSomme();
        }
    }
    getTransac(){
        return this.transactions;
    }
    
    getSolde(){
        return this.solde;
    }
    
   
}