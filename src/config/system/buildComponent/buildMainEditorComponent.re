open BuildAtomComponent;

let buildComponentByName =
    (atomName: string, argumentArray: Js.Array.t(option('a)))
    : ReasonReact.reactElement =>
  switch atomName {
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|buildComponentByName:the $atomName is not find in component|j}
    )
  };