export const ADD:string = "ADD";
export const COMPLETE:string = "COMPLETE";
export const FILTER:string = "FILTER";

export const visibilyFilter = {
    SHOW_ALL:"SHOW_ALL",
    SHOW_COMPLETE:"SHOW_COMPLETE",
    SHOW_ACTIVE:"SHOW_ACTIVE"
}

export function add(text){
    return {
        type:ADD,
        text
    }
}

export function complete(index){
    return {
        type:COMPLETE,
        index
    }
}

export function filter(filter){
    return {
        type:FILTER,
        filter
    }
}
