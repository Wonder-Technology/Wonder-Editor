open BuildAtomComponent;

let buildComponentByName = (componentName, argumentArray) =>
  switch componentName {
  | "number_input" => DomHelper.apply(argumentArray, buildNumberInput)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|buildComponentByName:the $componentName is not find in component|j}
    )
  };