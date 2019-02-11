open EditorType;

open SceneViewType;

let unsafeGetScaleWholeGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleWholeGizmo;

let unsafeGetScaleXAxisGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleXAxisGizmo;

let unsafeGetScaleYAxisGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleYAxisGizmo;

let unsafeGetScaleZAxisGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleZAxisGizmo;

let unsafeGetScaleCenterBoxGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleCenterBoxGizmo;

let unsafeGetCurrentSceneTreeNodeStartLocalScale = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentSceneTreeNodeStartLocalScale
  |> OptionService.unsafeGet;

let setCurrentSceneTreeNodeStartLocalScale =
    (currentSceneTreeNodeStartLocalScale, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          currentSceneTreeNodeStartLocalScale:
            Some(currentSceneTreeNodeStartLocalScale),
        },
      }),
  },
};