open EditorType;

open ShapeType;

let _buildPlane =
    (coneAGameObject, coneBGameObject, wholeGameObject, engineState) =>
  PlaneShapeUtils.setFromCoplanarPoints(
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        coneAGameObject,
        engineState,
      ),
      engineState,
    ),
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        coneBGameObject,
        engineState,
      ),
      engineState,
    ),
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        wholeGameObject,
        engineState,
      ),
      engineState,
    ),
  );

let buildXZPlane = (editorState, engineState) =>
  _buildPlane(
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationXAxisGameObject(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationZAxisGameObject(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationWholeGameObject(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  _buildPlane(
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationYAxisGameObject(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationZAxisGameObject(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationWholeGameObject(
      editorState,
    ),
    engineState,
  );

let buildXYPlane = (editorState, engineState) =>
  _buildPlane(
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationXAxisGameObject(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationYAxisGameObject(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationWholeGameObject(
      editorState,
    ),
    engineState,
  );

let unsafeGetLastIntersectPointWithPlane = editorState =>
   RecordTransformGameObjectSceneViewEditorService.getData(
     editorState.sceneViewRecord,
   ).
     lastIntersectPointWithPlane
   |> OptionService.unsafeGet;

let getLastIntersectPointWithPlane = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    lastIntersectPointWithPlane;

let setLastIntersectPointWithPlane = (point, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        lastIntersectPointWithPlane: point,
      }),
  },
};

let clearLastIntersectPointWithPlane = editorState =>
  setLastIntersectPointWithPlane(None, editorState);

let getLastPlaneForCheckIntersect = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    lastPlaneForCheckIntersect;
/* |> OptionService.unsafeGet; */

let setLastPlaneForCheckIntersect = (plane, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        lastPlaneForCheckIntersect: plane,
      }),
  },
};