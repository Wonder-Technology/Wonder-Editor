type window;

[@bs.val] external window : Js.t({..}) = "";

let getIndexDb = () => window##indexedDB;


let getIDBTransaction = () => window##_IDBTransaction;