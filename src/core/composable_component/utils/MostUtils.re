open WonderBsMost;

open Most;

let callFunc = func => just(func) |> map(func => func());

let callStreamFunc = func => just(func) |> flatMap(func => func());