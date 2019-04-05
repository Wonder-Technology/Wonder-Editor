let _disposeContainerGameObjectAllChild =
    (containerGameObject, inspectorEngineState) =>
  inspectorEngineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(containerGameObject)
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. inspectorEngineState, gameObject) =>
         inspectorEngineState
         |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
              gameObject,
            ),
       inspectorEngineState,
     );

let disposeInspectorEngineContainerGameObjectAllChild =
    ((editorState, inspectorEngineState)) => {
  let containerGameObject =
    ContainerGameObjectInspectorCanvasEditorService.getContainerGameObject(
      editorState,
    );

  switch (containerGameObject) {
  | None => ()
  | Some(gameObject) =>
    inspectorEngineState
    |> _disposeContainerGameObjectAllChild(gameObject)
    |> JobEngineService.execDisposeJob
    |> StateLogicService.refreshInspectorEngineState
    |> ignore
  };
};

let _getContainerGameObjectFirstChild = ((editorState, inspectorEngineState)) => {
  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

  inspectorEngineState
  |> HierarchyGameObjectEngineService.hasChildren(containerGameObject) ?
    (
      inspectorEngineState
      |> HierarchyGameObjectEngineService.getChildren(containerGameObject)
      |> ArrayService.unsafeGetFirst
    )
    ->Some :
    None;
};

let getMaterialSphere = _getContainerGameObjectFirstChild;

let getWDBGameObject = _getContainerGameObjectFirstChild;