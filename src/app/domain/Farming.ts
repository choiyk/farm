import { MyCrop } from './MyCrop';
import { User } from './User';

export class Farming {
    id : number;
    title : string;
    memo : string;
    startDate : any;
    endDate : any;
    alarm : number;
    postDate : any;
    user : User;
    myCrop : MyCrop;
}