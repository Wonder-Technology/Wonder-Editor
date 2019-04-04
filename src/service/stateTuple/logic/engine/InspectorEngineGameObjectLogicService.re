let _disposeParentGameObjectAllChild =
    (parentGameObject, inspectorEngineState) =>
  inspectorEngineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(parentGameObject)
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. inspectorEngineState, gameObject) =>
         inspectorEngineState
         |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
              gameObject,
            ),
       inspectorEngineState,
     );

let disposeInspectorEngineParentGameObjectAllChild =
    ((editorState, inspectorEngineState)) => {
  let parentGameObject =
    ParentGameObjectInspectorCanvasEditorService.getParentGameObject(
      editorState,
    );

  switch (parentGameObject) {
  | None => ()
  | Some(gameObject) =>
    inspectorEngineState
    |> _disposeParentGameObjectAllChild(gameObject)
    |> JobEngineService.execDisposeJob
    |> StateLogicService.refreshInspectorEngineState
    |> ignore
  };
};

let _getParentGameObjectFirstChild = ((editorState, inspectorEngineState)) => {
  let parentGameObject =
    editorState
    |> ParentGameObjectInspectorCanvasEditorService.unsafeGetParentGameObject;

  inspectorEngineState
  |> HierarchyGameObjectEngineService.hasChildren(parentGameObject) ?
    (
      inspectorEngineState
      |> HierarchyGameObjectEngineService.getChildren(parentGameObject)
      |> ArrayService.unsafeGetFirst
    )
    ->Some :
    None;
};

let getMaterialSphere = _getParentGameObjectFirstChild;

let getWDBGameObject = _getParentGameObjectFirstChild;