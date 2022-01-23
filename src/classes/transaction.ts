export class Transaction {
    public nomPersonne:string;
    public sommeTtransaction : number;
    public typeTransaction : string;
    public motifTransaction : string;

    constructor(nom:string,montant : number,type : string, motif : string) {
        this.nomPersonne=nom;
        this.sommeTtransaction = montant;
        this.typeTransaction = type;
        this.motifTransaction = motif;
    }
    getName(){
        return this.nomPersonne;
    }

    getType(){
        return this.typeTransaction;
    }

    getSomme(){
        return this.sommeTtransaction;
    }

    getMotif(){
        return this.motifTransaction;
    }
    setText(){
        return `${this.getSomme()} a été ${this.getType() === 'debit' ? 'retiré' : 'déposé'} par ${this.getName()} suite a ${this.getMotif()}`;
    }
}

