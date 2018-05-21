export class Pagination{
    ui: number; //userId
    date: string; //날짜로 검색할 경우
    bd: number; //게시판 id
    pg: number; //현재 게시판
    sz: number; //페이지 당 레코드 수
    ci: number; //cropId
    sb: number; //search By
    ab: number; //alarm by

    constructor(ui: number, date: string, bd: number, pg: number, sz: number, ci: number, sb:number, ab:number){
        this.ui = ui;
        this.date = date;
        this.bd = bd;
        this.pg = pg;
        this.sz = sz;
        this.ci = ci;
        this.sb = sb;
        this.ab = ab;
    }
}