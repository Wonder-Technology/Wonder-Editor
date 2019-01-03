/* TODO test */
let setGeometryPoints =
    (geometry, points, setFunc, (editorState, engineState)) => (
  PickingEditorService.removeSphereShape(geometry, editorState),
  setFunc(geometry, points, engineState),
);