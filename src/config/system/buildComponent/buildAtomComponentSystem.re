open AtomComponent;

let buildComponentByName = (componentName, argumentArray) =>
  switch componentName {
  | "number_input" => DomHelper.apply(argumentArray, buildFloatInput)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|buildComponentByName:the $componentName is not find in component|j}
    )
  };