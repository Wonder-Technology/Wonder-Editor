open EditorType;

open SceneViewType;

let unsafeGetTranslationWholeGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationWholeGizmo;

/* let setTranslationWholeGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationWholeGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetTranslationXAxisGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationXAxisGizmo;

/* let setTranslationXAxisGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationXAxisGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetTranslationYAxisGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationYAxisGizmo;

/* let setTranslationYAxisGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationYAxisGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetTranslationZAxisGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationZAxisGizmo;

/* let setTranslationZAxisGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationZAxisGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetTranslationXYPlaneGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationXYPlaneGizmo;

/* let setTranslationXYPlaneGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationXYPlaneGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetTranslationXZPlaneGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationXZPlaneGizmo;

/* let setTranslationXZPlaneGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationXZPlaneGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetTranslationYZPlaneGizmo = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    translationYZPlaneGizmo;

/* let setTranslationYZPlaneGizmo = (gameObject, editorState) => {
     ...editorState,
     sceneViewRecord: {
       ...editorState.sceneViewRecord,
       transformGizmoData:
         Some({
           ...
             RecordTransformGizmoSceneViewEditorService.unsafeGetData(
               editorState,
             ),
           translationGizmoData: {
             ...
               RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                 editorState,
               ),
             translationYZPlaneGizmo: gameObject,
           },
         }),
     },
   }; */

let unsafeGetCurrentSceneTreeNodeStartPoint = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentSceneTreeNodeStartPoint
  |> OptionService.unsafeGet;

let setCurrentSceneTreeNodeStartPoint =
    (currentSceneTreeNodeStartPoint, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        translationGizmoData: {
          ...
            RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          currentSceneTreeNodeStartPoint:
            Some(currentSceneTreeNodeStartPoint),
        },
      }),
  },
};

let unsafeGetCurrentSceneTreeNodeStartLocalPosition = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentSceneTreeNodeStartLocalPosition
  |> OptionService.unsafeGet;

let setCurrentSceneTreeNodeStartLocalPosition =
    (currentSceneTreeNodeStartLocalPosition, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        translationGizmoData: {
          ...
            RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          currentSceneTreeNodeStartLocalPosition:
            Some(currentSceneTreeNodeStartLocalPosition),
        },
      }),
  },
};