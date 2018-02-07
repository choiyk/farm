import { Content } from './Content';
import { User } from './User';

export class Comment {
    id : number;
    comment : string;
    postDate : any;
    del : number;
    user : User;
    content : Content;
    pcomment : Comment;
}