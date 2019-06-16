open EditorType;

let getMaterialSphereGameObjectInInspectorCanvas = editorState =>
  editorState.inspectorCanvasRecord.materialSphereGameObjectInInspectorCanvas;

let setMaterialSphereGameObjectInInspectorCanvas =
    (materialSphereGameObjectInInspectorCanvas, editorState) => {
  ...editorState,
  inspectorCanvasRecord: {
    ...editorState.inspectorCanvasRecord,
    materialSphereGameObjectInInspectorCanvas:
      Some(materialSphereGameObjectInInspectorCanvas),
  },
};

let removeMaterialSphereGameObjectInInspectorCanvas = editorState => {
  ...editorState,
  inspectorCanvasRecord: {
    ...editorState.inspectorCanvasRecord,
    materialSphereGameObjectInInspectorCanvas: None,
  },
};

let isExistInContainer = (editorState, inspectorEngineState) =>
  switch (getMaterialSphereGameObjectInInspectorCanvas(editorState)) {
  | None => false
  | Some(materialSphereGameObjectInInspectorCanvas) =>
    HierarchyGameObjectEngineService.findGameObjectByUid(
      materialSphereGameObjectInInspectorCanvas,
      ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject(
        editorState,
      ),
      inspectorEngineState,
    )
    |> Js.Option.isSome
  };