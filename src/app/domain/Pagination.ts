export class Pagination{
    ui: number; //userId
    bd: number; //게시판 id
    pg: number; //현재 게시판
    sz: number; //페이지 당 레코드 수
    sb: number; //search By
    ab: number; //alarm by

    constructor(ui: number, bd: number, pg: number, sz: number, sb:number, ab:number){
        this.ui = ui;
        this.bd = bd;
        this.pg = pg;
        this.sz = sz;
        this.sb = sb;
        this.ab = ab;
    }
}