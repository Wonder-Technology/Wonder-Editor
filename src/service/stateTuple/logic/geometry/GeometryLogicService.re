let setGeometryPoints =
    (points, geometry, setFunc, (editorState, engineState)) => (
  PickingEditorService.removeSphereShape(geometry, editorState),
  setFunc(points, geometry, engineState),
);