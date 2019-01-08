let getBody = () => DomHelper.document##body |> EventType.bodyToEventTarget;

let bindEventInDidMount = (handleFunc, setFunc) => {
  let subscription =
    WonderBsMost.Most.fromEvent("click", getBody(), false)
    |> WonderBsMost.Most.tap(e => handleFunc(Obj.magic(e)))
    |> WonderBsMost.Most.subscribe({
         "next": _ => (),
         "error": e => (),
         "complete": () => (),
       });

  setFunc(subscription);
};

let unmountStreamSubscription = streamSubscription =>
  switch (streamSubscription) {
  | None => ()
  | Some(streamSubscription) =>
    MostUtils.unsubscribeDomEventStream(streamSubscription)
  };