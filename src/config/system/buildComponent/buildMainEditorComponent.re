open BuildInspectorComposableComponent;

open BuildSceneTreeComposableComponent;

let buildComponentByName =
    (atomName: string, argumentArray: Js.Array.t(option('a)))
    : ReasonReact.reactElement =>
  switch atomName {
  /* | "inspector" => DomHelper.apply(argumentArray, buildInspector)
  | "sceneTree" => DomHelper.apply(argumentArray, buildSceneTree) */
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|buildComponentByName:the $atomName is not find in component|j}
    )
  };