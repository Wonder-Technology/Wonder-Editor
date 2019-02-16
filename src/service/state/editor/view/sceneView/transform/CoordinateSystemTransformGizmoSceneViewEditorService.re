open EditorType;

open SceneViewType;

let getCoordinateSystem = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(editorState).
    coordinateSystem;

let setCoordinateSystem = (coordinateSystem, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        coordinateSystem,
      }),
  },
};