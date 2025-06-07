export interface INode {
    id: string;
    name: string;
    type: string;
    data: string;
    x: number;
    y: number;
    parent: string;
    headChild: string;
    prevSibling: string;
    nextSibling: string;
    order: string;
    ctime: number;
    utime: number;
}
