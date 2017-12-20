open AtomComponentSystem;

let buildComponentByName = (componentName, argumentArray) =>
  switch componentName {
  | "float_input" => DomHelper.apply(argumentArray, buildFloatInput)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | _ =>
    /* ExcepetionHandleSystem.throwMessage(
         {j|buildComponentByName:the $componentName is not find out atom component|j}
       ) */
    WonderCommonlib.LogUtils.warn("wwww");
    ReasonReact.nullElement
  };