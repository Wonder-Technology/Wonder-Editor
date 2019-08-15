open WonderBsMost;

open Most;

let callFunc = func => just(func) |> map(func => func());

let ignore = stream => stream |> Most.map(_ => ());

let callStreamFunc = func => just(func) |> flatMap(func => func());

let unsubscribeDomEventStream = [%raw
  domEventStreamSubscription => {|
  domEventStreamSubscription.unsubscribe();
|}
];