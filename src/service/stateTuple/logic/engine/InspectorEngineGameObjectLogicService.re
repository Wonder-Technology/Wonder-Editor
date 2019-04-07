let _disposeContainerGameObjectAllChildren =
    (containerGameObject, inspectorEngineState) =>
  inspectorEngineState
  |> HierarchyGameObjectEngineService.getAllChildren(containerGameObject)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. inspectorEngineState, gameObject) =>
         inspectorEngineState
         |> GameObjectEngineService.disposeGameObject(gameObject),
       inspectorEngineState,
     );

let disposeInspectorEngineContainerGameObjectAllChildren =
    ((editorState, inspectorEngineState)) => {
  let containerGameObject =
    ContainerGameObjectInspectorCanvasEditorService.getContainerGameObject(
      editorState,
    );

  switch (containerGameObject) {
  | None => inspectorEngineState
  | Some(gameObject) =>
    inspectorEngineState |> _disposeContainerGameObjectAllChildren(gameObject)
  };
};

let _getContainerGameObjectFirstChild = ((editorState, inspectorEngineState)) => {
  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

  inspectorEngineState
  |> HierarchyGameObjectEngineService.getChildren(containerGameObject)
  |> ArrayService.getFirst;
};

let getMaterialSphere = _getContainerGameObjectFirstChild;

let getWDBGameObject = _getContainerGameObjectFirstChild;