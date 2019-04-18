let showInspectorCanvas = () =>
  DomHelper.setDomDisplay(
    DomHelper.getElementById("inspectorCanvasParent"),
    true,
  );

let hideInspectorCanvas = () =>
  DomHelper.setDomDisplay(
    DomHelper.getElementById("inspectorCanvasParent"),
    false,
  );

let disposeContainerGameObjectAllChildren =
    ((editorState, inspectorEngineState)) =>
  (editorState, inspectorEngineState)
  |> InspectorEngineGameObjectLogicService.disposeInspectorEngineContainerGameObjectAllChildren
  |> JobEngineService.execDisposeJob;

let hideInspectorCanvasAndDisposeContainerGameObjectAllChildren = () => {
  hideInspectorCanvas();

  (
    StateEditorService.getState(),
    StateInspectorEngineService.unsafeGetState(),
  )
  |> disposeContainerGameObjectAllChildren
  |> StateInspectorEngineService.setState
  |> ignore;
};