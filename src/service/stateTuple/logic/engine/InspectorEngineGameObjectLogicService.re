/* TODO refactor:rename to _disposeContainerGameObjectAllChildren */
let _disposeContainerGameObjectAllChildren =
    (containerGameObject, inspectorEngineState) =>
  inspectorEngineState
  /* TODO refactor: use getAllChildren and remove Js.Array.sliceFrom(1) */
  |> HierarchyGameObjectEngineService.getAllChildren(containerGameObject)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. inspectorEngineState, gameObject) =>
         inspectorEngineState
         /* TODO fix: use disposeGameObject
            TODO test: add "material component should be disposed"

            use GeometryToolEngine.isGeometryDisposed
            use LightMaterialToolEngine.isAlive

            */
         |> GameObjectEngineService.disposeGameObject(
              gameObject,
            ),
       inspectorEngineState,
     );

/* TODO refactor:rename to disposeInspectorEngineContainerGameObjectAllChildren */
/* TODO refactor: inject and return state */
let disposeInspectorEngineContainerGameObjectAllChildren =
    ((editorState, inspectorEngineState)) => {
  let containerGameObject =
    ContainerGameObjectInspectorCanvasEditorService.getContainerGameObject(
      editorState,
    );

  switch (containerGameObject) {
  | None => ()
  | Some(gameObject) =>
    inspectorEngineState
    |> _disposeContainerGameObjectAllChildren(gameObject)
    |> JobEngineService.execDisposeJob
    |> ignore
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