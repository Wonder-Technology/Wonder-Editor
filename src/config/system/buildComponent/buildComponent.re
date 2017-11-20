open DomHelper;

open BuildAtomComponent;

let buildComponentByName =
    (atomName: string, argumentArray: Js.Array.t(option('a)))
    : ReasonReact.reactElement => {
  switch atomName {
  | "number_input" => apply(argumentArray, buildNumberInput)
  | "main_editor" => apply(argumentArray, buildMainEditor)
  | "button" => apply(argumentArray, buildButton)
  | _ => buildErrText()
  }
};