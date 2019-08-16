open WonderBsMost;

open Most;

let throwErrorWithString = errorMsg =>
  throwError(errorMsg |> ExnType.convertStringToJsExn) |> Obj.magic;

let callFunc = func => just(func) |> map(func => func());

let ignore = stream => stream |> Most.map(_ => ());

let callStreamFunc = func => just(func) |> flatMap(func => func());

let unsubscribeDomEventStream = [%raw
  domEventStreamSubscription => {|
  domEventStreamSubscription.unsubscribe();
|}
];

let subscribe =
    (
      ~stream,
      ~nextFunc=_ => (),
      ~errorFunc=_ => (),
      ~completeFunc=() => (),
      (),
    ) =>
  stream
  |> WonderBsMost.Most.subscribe({
       "next": () => (),
       "error": errMsg => errMsg |> ExnType.convertJsExnToString |> errorFunc,
       "complete": () => completeFunc(),
     });