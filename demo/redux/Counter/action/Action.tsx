export const CHANGE_COUNT:string = "CHANGE_COUNT";
export const UNDO_COUNT:string = "UNDO_COUNT";
export const REDO_COUNT:string = "REDO_COUNT";

export type Action = {
    type:string,
    counter?:number
}

export function changeCount(counter:number):Action{
    return {
        type:CHANGE_COUNT,
        counter
    }
}

export function undo():Action{
    return {
        type:UNDO_COUNT
    }
}

export function redo():Action{
    return {
        type:REDO_COUNT
    }
}
