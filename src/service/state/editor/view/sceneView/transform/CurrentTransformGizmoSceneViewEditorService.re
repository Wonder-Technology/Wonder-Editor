open EditorType;

open SceneViewType;

let mark = (currentGizmoType, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        currentGizmoType,
      }),
  },
};

let markTranslation = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        currentGizmoType: Translation,
      }),
  },
};

let markRotation = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        currentGizmoType: Rotation,
      }),
  },
};

let getCurrentGizmoType = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentGizmoType;