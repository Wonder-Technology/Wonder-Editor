open DomHelper;

open BuildAtomComponent;

let buildComponentByName =
    (atomName: string, argumentArray: Js.Array.t(option('a)))
    : ReasonReact.reactElement => {
  Js.log(argumentArray[0]);
  switch atomName {
  | "number_input" => apply(argumentArray, buildNumberInput)
  | "main_editor" => apply(argumentArray, buildMainEditor)
  | _ => buildErrText()
  }
};