import { IObserver } from "../interfaces/observer";
import { ISubject } from "../interfaces/subject";
import { Transaction } from "./transaction";


export class Caisse implements ISubject{
    private solde : number;
    private transactions : Transaction[]=[];
    private observers:IObserver[]=[];
    constructor(solde : number) {
        this.solde = solde;
        // this.notifyObserver()
    }
    subscribeObserver(obs: IObserver) {
        this.observers.push(obs);
        obs.update(this)
        console.log('subscribe');
    }
    unSubscribeObserver(obs: IObserver) {
        let index = this.observers.indexOf(obs)
        this.observers.splice(index,1)
        console.log(('unsubscribe'));
    }
    notifyObserver() {
        this.observers.forEach(obs=>obs.update(this))
        console.log('notify');
    }
    addTransac(transac: Transaction){
        this.transactions.push(transac);
        this.notifyObserver()
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