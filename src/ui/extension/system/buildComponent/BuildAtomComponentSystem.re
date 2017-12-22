open AtomComponentSystem;

let buildComponentByName = (componentName, argumentArray) =>
  switch componentName {
  | "float_input" => DomHelper.apply(argumentArray, buildFloatInput)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | _ =>
    WonderCommonlib.LogUtils.warn({j|atom component:$componentName is not find|j});
    ReasonReact.nullElement
  };