import { IObserver } from "./observer";

export interface ISubject{
    subscribeObserver(obs:IObserver):any;
    unSubscribeObserver(obs:IObserver):any;
    notifyObserver():any
}