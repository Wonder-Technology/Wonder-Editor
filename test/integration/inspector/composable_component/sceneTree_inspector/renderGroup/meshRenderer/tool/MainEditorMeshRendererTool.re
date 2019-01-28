open Wonderjs;

open DrawModeType;

let _getFromArray = (array, index) =>
  WonderEditor.ArrayService.(unsafeGetNth(index, array));

let getDrawModeLineType = () => Lines |> drawModeToUint8;

let getDrawModePointType = () => Points |> drawModeToUint8;

let getDrawModeTriangleFanType = () => Triangle_fan |> drawModeToUint8;

let changeMode =
    (
      ~value,
      ~meshRenderer=GameObjectTool.getCurrentSceneTreeNodeMeshRenderer(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMeshRenderer.Method.changeMode(
    (uiState, dispatchFunc),
    meshRenderer,
    value,
  );