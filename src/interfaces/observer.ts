import { Caisse } from "../classes/caisse";

export interface IObserver{
    update(caisse:Caisse):any
}