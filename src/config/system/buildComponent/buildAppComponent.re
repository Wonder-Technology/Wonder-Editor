open BuildAtomComponent;

open BuildMainEditorComposableComponent;

let buildComponentByName =
    (atomName: string, argumentArray: Js.Array.t(option('a)))
    : ReasonReact.reactElement =>
  switch atomName {
  | "main_editor" => DomHelper.apply(argumentArray, buildMainEditor)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|buildComponentByName:the $atomName is not find in component|j}
    )
  };