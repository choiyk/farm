import { Board } from './Board';
import { User } from './User';

export class Content {
    id : number;
    title : string;
    content : string;
    like : number;
    dislike : number;
    postDate : any;
    user : User;
    board : Board;
}