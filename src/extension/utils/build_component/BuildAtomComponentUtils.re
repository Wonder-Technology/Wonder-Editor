open AtomComponentUtils;

let buildComponentByName = (componentName, argumentArray) =>
  switch componentName {
  | "float_input" => DomHelper.apply(argumentArray, buildFloatInput)
  | "button" => DomHelper.apply(argumentArray, buildButton)
  | "div" => DomHelper.apply(argumentArray, buildDiv)
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="buildComponentByName",
        ~description={j|the specific component: $componentName is not find|j},
        ~reason="",
        ~solution={j|check extension->panelExtension->render->name->$componentName should correct|j},
        ~params={j|componentName: $componentName|j}
      )
    );
    ReasonReact.null
  };