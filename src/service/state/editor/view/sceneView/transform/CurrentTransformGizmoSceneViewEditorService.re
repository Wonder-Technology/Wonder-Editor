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

let markTranslation = editorState => mark(Translation, editorState);

let markRotation = editorState => mark(Rotation, editorState);

let markScale = editorState => mark(Scale, editorState);

let getCurrentGizmoType = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentGizmoType;